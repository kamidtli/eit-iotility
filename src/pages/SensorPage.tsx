import { useEffect, useState } from "react";
import {
  Link,
  useParams
} from "react-router-dom";
import Heading from '../components/Heading';
import ParamGraph from "../components/ParamGraph";

import sensorData from '../data.json';

type Measurement = {
  date: Date,
  value: number
}

interface SensorPageProps {
  id: string
}

interface ISensorData {
  id: string,
  latitude: number,
  longitude: number,
  timestamp: string,
  pH: number,
  temperature: number,
  conductivity: number,
  turbidity: number
}

function SensorPage() {

  const { id } = useParams<SensorPageProps>();
  const [latitude, setLatitude] = useState<number>(0);
  const [longitude, setLongitude] = useState<number>(0);
  const [data, setData] = useState<ISensorData[] | null>();

  useEffect(() => {
    const allData = fetchSensorData(id);
    if (allData.length > 0) {
      setLatitude(parseFloat(allData[0].latitude.toFixed(4)));
      setLongitude(parseFloat(allData[0].longitude.toFixed(4)));
      setData(allData);
    }
  }, [id])

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

  return (
    <div>
      <Link to="/">Tilbake til sensorkart</Link>
      {data ?
        (
        <div>
          <Heading title="Sensornavn" subtitle={`Koordinater: ${latitude}, ${longitude}`}/>
          <ParamGraph title="pH" data={getPh()} id={1}/>
          <ParamGraph title="Turbiditet" data={getTurbidity()} id={2}/>
          <ParamGraph title="Temperatur" data={getTemperature()} id={3}/>
        </div>
        ) : (
          <h1></h1>
        )}
    </div>
  );
}

export default SensorPage;