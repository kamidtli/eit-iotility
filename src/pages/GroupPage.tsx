import { useEffect, useState } from "react";
import {
  Link,
  useParams
} from "react-router-dom";
import { Grid } from '@material-ui/core';
import { ISensor, IGroup, IMeasurement, IMultipleChartData } from 'types';
import { getAllSensorMeasurementsById, getSensorsByGroupId, getGroupById } from 'utils';
import Heading from 'components/Heading';
import Sensor from 'components/Sensor';
import ParamGraphMultiple from "components/ParamGraphMultiple";

interface SensorPageProps {
  id: string
}

function GroupPage() {

  const { id } = useParams<SensorPageProps>();
  const [data, setData] = useState<IMultipleChartData[] | []>();
  const [sensors, setSensors] = useState<ISensor[] | []>();
  const [valueCounter, setValueCounter] = useState<number>(0);
  const [group, setGroup] = useState<IGroup>();

  useEffect(() => {
    let groupData:{ [timestamp: string]: { [value: string]: {}} } = {}
    const sensors: ISensor[] = getSensorsByGroupId(id);
    sensors.forEach((s: ISensor, index: number) => {
      const measurements: IMeasurement[] = getAllSensorMeasurementsById(s.id);
      measurements.forEach((m: IMeasurement) => {
        let currentTimestamp = m.timestamp;
        let valueString = "value" + (index + 1);
        if (groupData.hasOwnProperty(currentTimestamp)) {
          groupData[currentTimestamp][valueString] = m.pH;
        } else {
          groupData[currentTimestamp] = { [valueString]: m.pH };
        }
      });
    });
    const finalData = []
    for (let timestamp in groupData) {
      if (groupData.hasOwnProperty(timestamp)) {
        let tempObj = { date: new Date(timestamp) };
        let fullTempObj = Object.assign(tempObj, groupData[timestamp]);
        finalData.push(fullTempObj);
      }
    }
    setData(finalData);
    setSensors(sensors);
    setValueCounter(sensors.length);
    setGroup(getGroupById(id));
  }, [id])

  return (
    <div>
      <Link to="/">Tilbake til sensorkart</Link>
      {data ?
        (
        <div>
          <Heading title={group && group.name} />
          <Grid container spacing={3}>
            <Grid item xs={12} lg={6}>
              <ParamGraphMultiple title="pH" data={data} numOfValues={valueCounter} id={1}/>
            </Grid>
            <Grid item xs={12}>
              <Heading subtitle="Sensorer i denne gruppen" />
              {sensors && sensors.map((s: ISensor) => {
                return (
                  <Link to={`/sensors/${s.id}`} key={s.id}>
                    <Sensor sensor={s} />
                  </Link>
                )
              })}
            </Grid>
          </Grid>
        </div>
        ) : (
          <h1>Fant ikke noe data for denne gruppen.</h1>
        )}
    </div>
  );
}

export default GroupPage;