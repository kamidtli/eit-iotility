import { useEffect, useState } from "react";
import {
  Link,
  useParams
} from "react-router-dom";
import { Grid } from '@material-ui/core';
import Heading from 'components/Heading';
import ParamGraph from "components/ParamGraph";
import { IMeasurement, IParamMeasurement } from 'types';
import { getAllSensorMeasurementsById } from "utils";

interface SensorPageProps {
  id: string
}

function SensorPage() {

  const { id } = useParams<SensorPageProps>();
  const [latitude, setLatitude] = useState<number>(0);
  const [longitude, setLongitude] = useState<number>(0);
  const [data, setData] = useState<IMeasurement[] | null>();

  useEffect(() => {
    const allData = getAllSensorMeasurementsById(id);
    if (allData.length > 0) {
      setLatitude(parseFloat(allData[0].latitude.toFixed(4)));
      setLongitude(parseFloat(allData[0].longitude.toFixed(4)));
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
      <Link to="/">Tilbake til sensorkart</Link>
      {data ?
        (
        <div>
          <Heading title="Sensornavn" subtitle={`Koordinater: ${latitude}, ${longitude}`}/>
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
          </Grid>
        </div>
        ) : (
          <h1>Fant ikke noe data for denne sensoren.</h1>
        )}
    </div>
  );
}

export default SensorPage;