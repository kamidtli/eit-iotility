import React, { useEffect, useState } from "react";
import {
  Link,
  useParams
} from "react-router-dom";
import { Grid } from '@material-ui/core';
import Heading from '../components/Heading';
import ParamGraph from "../components/ParamGraph";

import sensorData from '../data.json';
import allSensors from '../sensors.json';

type Measurement = {
  date: Date,
  value: number
}

interface SensorPageProps {
  id: string
}

interface ISensorData {
  id: string,
  group_id: string,
  latitude: number,
  longitude: number,
  timestamp: string,
  pH: number,
  temperature: number,
  conductivity: number,
  turbidity: number
}

interface ISensors {
  id: string,
  group_id: string,
  latitude: number,
  longitude: number
}

function SensorPage() {

  const { id } = useParams<SensorPageProps>();
  const [data, setData] = useState<ISensorData[] | null>();
  const [groupSensors, setGroupSensors] = useState<ISensors[] | null>();

  useEffect(() => {
    const sensors: ISensors[] = fetchGroupSensors(id);
    // let test = [];
    // console.log(sensorData);
    // let multipleData = sensorData.map(measurement => () => {
    //   return {
    //     date: new Date(measurement.timestamp),
        
    //   }
    // });
    // let allData: ISensorData[] = [];
    // sensors.forEach((s) => {
    //   const sensorData = fetchSensorData(s.id);
    //   if (sensorData.length > 0) {
    //     allData = allData.concat(sensorData);
    //   }
    //   })
    // })
    // setGroupSensors(sensors);
    // setData(allData);
  }, [id])

  const fetchGroupSensors = (groupId: string) => {
    const filteredData = allSensors.data.filter(s => s.group_id === groupId);
    return filteredData;
  }

  const fetchSensorData = (sensorId: string) : ISensorData[] => {
    const filteredData: ISensorData[] = sensorData.data.filter(s => s.id === sensorId);
    return filteredData;
  }

  const getPh = () => {
    if (data) {
      const filteredData = data.map(obj => {
        const newObj: Measurement = {
          date: new Date(obj.timestamp),
          value: obj.pH
        };
        return newObj;
      });
      const sortedData = filteredData.sort((a, b) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      })
      return sortedData;
    } else {
      return []
    }
  }

  const getTurbidity = () => {
    if (data) {
      const filteredData = data.map(obj => {
        const newObj: Measurement = {
          date: new Date(obj.timestamp),
          value: obj.turbidity
        };
        return newObj;
      });
      const sortedData = filteredData.sort((a, b) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      })
      return sortedData;
    } else {
      return []
    }
  }
  
  const getTemperature = () => {
    if (data) {
      const filteredData = data.map(obj => {
        const newObj: Measurement = {
          date: new Date(obj.timestamp),
          value: obj.temperature
        };
        return newObj;
      });
      const sortedData = filteredData.sort((a, b) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      })
      return sortedData;
    } else {
      return []
    }
  }

  const getConductivity = () => {
    if (data) {
      const filteredData = data.map(obj => {
        const newObj: Measurement = {
          date: new Date(obj.timestamp),
          value: obj.conductivity
        };
        return newObj;
      });
      const sortedData = filteredData.sort((a, b) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      })
      return sortedData;
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
          <Heading title="Gruppeoversikt" subtitle={`Gruppe: ${id}`}/>
          <Grid container spacing={3}>
            {/* <Grid item xs={12} lg={6}>
              <ParamGraph title="pH" data={getPh()} id={1}/>
            </Grid>
            <Grid item xs={12} lg={6}>
              <ParamGraph title="Turbiditet" data={getTurbidity()} id={2}/>
            </Grid>
            <Grid item xs={12} lg={6}>
              <ParamGraph title="Temperatur" data={getTemperature()} id={3}/>
            </Grid>
            <Grid item xs={12} lg={6}>
              <ParamGraph title="Konduktivitet" data={getConductivity()} id={4}/>
            </Grid> */}
          </Grid>
        </div>
        ) : (
          <h1></h1>
        )}
    </div>
  );
}

export default SensorPage;