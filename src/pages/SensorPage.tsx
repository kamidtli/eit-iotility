import { useEffect, useState } from "react";
import {
  Link,
  useParams
} from "react-router-dom";
import { Button, CircularProgress, Grid } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Heading from 'components/Heading';
import SimpleMap from 'components/SimpleMap';
import ParamGraph from "components/ParamGraph";
import { ISensor, IMeasurement, IParamMeasurement } from 'types';
import { getSensorById, getAllSensorMeasurementsById } from "utils";

interface SensorPageProps {
  id: string
}

function SensorPage() {

  const { id } = useParams<SensorPageProps>();
  const [sensor, setSensor] = useState<ISensor>();
  const [data, setData] = useState<IMeasurement[] | null>();

  useEffect(() => {
    const sensor = getSensorById(id);
    setSensor(sensor);
    const allData = getAllSensorMeasurementsById(id);
    if (allData.length > 0) {
      setData(allData);
    }
  }, [id])

  const sortParamMeasurementsByDate = (data: IParamMeasurement[]) => {
    return data.sort((a, b) => {
      return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
    });
  }

  const getParam = (param: string) => {
    if (data) {
      const paramMeasurements = data.map((m) => {
        return {
          timestamp: new Date(m.timestamp),
          parameter: param,
          value: m[param as keyof IMeasurement]
        }
      });
      return sortParamMeasurementsByDate(paramMeasurements);
    } else {
      return []
    }
  }

  return (
    <div>
      <Button component={ Link } to="/" startIcon={<ArrowBackIcon />}>
        Tilbake til sensorkart
      </Button>
      {data ?
        (
        <div>
          <Heading title={sensor?.name} subtitle={`Koordinater: ${sensor?.latitude.toFixed(4)}, ${sensor?.longitude.toFixed(4)}`}/>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={6}>
              <ParamGraph title="pH" data={getParam("pH")} id={1}/>
            </Grid>
            <Grid item xs={12} lg={6}>
              <ParamGraph title="Turbiditet" data={getParam("turbidity")} id={2}/>
            </Grid>
            <Grid item xs={12} lg={6}>
              <ParamGraph title="Temperatur" data={getParam("temperature")} id={3}/>
            </Grid>
            <Grid item xs={12} lg={6}>
              <ParamGraph title="Konduktivitet" data={getParam("conductivity")} id={4}/>
            </Grid>
            <Grid item xs={12}>
              {sensor && 
                <SimpleMap 
                data={[sensor]}
                center={{
                  lat: sensor.latitude,
                  lng: sensor.longitude
                }}
                />
              }
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

export default SensorPage;