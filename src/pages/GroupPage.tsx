import { useEffect, useState } from "react";
import {
  Link,
  useParams
} from "react-router-dom";
import { Grid } from '@material-ui/core';
import { ISensor, IMeasurement, IMultipleChartData } from 'types';
import { getAllSensorMeasurementsById, getSensorsByGroupId } from 'utils';
import Heading from 'components/Heading';
import ParamGraphMultiple from "components/ParamGraphMultiple";

interface SensorPageProps {
  id: string
}

function GroupPage() {

  const { id } = useParams<SensorPageProps>();
  const [data, setData] = useState<IMultipleChartData[] | []>();

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
  }, [id])

  return (
    <div>
      <Link to="/">Tilbake til sensorkart</Link>
      {data ?
        (
        <div>
          <Heading title="Gruppeoversikt" subtitle={`Gruppe: ${id}`}/>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={6}>
              <ParamGraphMultiple title="pH" data={data} id={1}/>
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