import { useEffect, useState } from "react";
import {
  Link,
  useParams
} from "react-router-dom";
import styled from 'styled-components';
import { Grid, Button, CircularProgress } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { ISensor, IGroup, IMeasurement, IMultipleChartData } from 'types';
import { getAllSensorMeasurementsById, getSensorsByGroupId, getGroupById } from 'utils';
import Heading from 'components/Heading';
import Sensor from 'components/Sensor';
import ParamGraphMultiple from "components/ParamGraphMultiple";
import { chartColors } from "static";

interface SensorPageProps {
  id: string
}

function GroupPage() {

  const { id } = useParams<SensorPageProps>();
  const [sensors, setSensors] = useState<ISensor[] | []>();
  const [valueCounter, setValueCounter] = useState<number>(0);
  const [group, setGroup] = useState<IGroup>();

  useEffect(() => {
    const sensors: ISensor[] = getSensorsByGroupId(id);
    setSensors(sensors);
    setValueCounter(sensors.length);
    setGroup(getGroupById(id));
  }, [id])

  const getParam = (param: string) : IMultipleChartData[] => {
    let groupData:{ [timestamp: string]: { [value: string]: {}} } = {}
    sensors?.forEach((s: ISensor, index: number) => {
      const measurements: IMeasurement[] = getAllSensorMeasurementsById(s.id);
      measurements.forEach((m: IMeasurement) => {
        let currentTimestamp = m.timestamp;
        let valueString = "value" + (index + 1);
        if (groupData.hasOwnProperty(currentTimestamp)) {
          groupData[currentTimestamp][valueString] = m[param as keyof IMeasurement];
        } else {
          groupData[currentTimestamp] = { [valueString]: m[param as keyof IMeasurement] };
        }
      });
    });
    const finalData = [];
    for (let timestamp in groupData) {
      if (groupData.hasOwnProperty(timestamp)) {
        let tempObj = { date: new Date(timestamp) };
        let fullTempObj = Object.assign(tempObj, groupData[timestamp]);
        finalData.push(fullTempObj);
      }
    }
    return finalData;
  }

  return (
    <div>
      <Button component={ Link } to="/" startIcon={<ArrowBackIcon />}>
        Tilbake til sensorkart
      </Button>
      {sensors ?
        (
        <div>
          <Heading title={group && group.name} />
          <Grid container spacing={3}>
            <Grid item xs={12}>
              {sensors && sensors.map((s: ISensor, index: number) => {
                return (
                  <DotLink>
                    <ColorDot color={chartColors[index]} />
                    <Link to={`/sensors/${s.id}`} key={s.id}>
                      <Sensor sensor={s} />
                    </Link>
                  </DotLink>
                )
              })}
            </Grid>
            <Grid item xs={12} lg={6}>
              <ParamGraphMultiple title="pH" data={getParam("pH")} numOfValues={valueCounter} id={1}/>
            </Grid>
            <Grid item xs={12} lg={6}>
              <ParamGraphMultiple title="Turbiditet" data={getParam("turbidity")} numOfValues={valueCounter} id={2}/>
            </Grid>
            <Grid item xs={12} lg={6}>
              <ParamGraphMultiple title="Temperatur" data={getParam("temperature")} numOfValues={valueCounter} id={3}/>
            </Grid>
            <Grid item xs={12} lg={6}>
              <ParamGraphMultiple title="Konduktivitet" data={getParam("conductivity")} numOfValues={valueCounter} id={4}/>
            </Grid>
          </Grid>
        </div>
        ) : (
          <div>
            <Heading subtitle="Henter måledata..." />
            <CircularProgress />
          </div>
        )}
    </div>
  );
}

const DotLink = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const ColorDot = styled.div`
  margin-right: 10px;
  width: 16px;
  height: 16px;
  border-radius: 8px;
  background-color:${props => props.color};
`;

export default GroupPage;