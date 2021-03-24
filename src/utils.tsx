

import DATA_DB from './data.json';
import SENSORS_DB from './sensors.json';

export function getAllSensors() {
  return SENSORS_DB.data;
}

export function getSensorById(id: string) {
  return SENSORS_DB.data.filter(sensor => sensor.id === id);
}

export function getAllSensorMeasurementsById(id: string) : IMeasurement[] {
  return DATA_DB.data.filter(measurement => measurement.id === id);
}

interface IMeasurement {
  id: string;
  group_id: string;
  latitude: number;
  longitude: number;
  timestamp: string;
  pH: number;
  temperature: number;
  conductivity: number;
  turbidity: number;
}

interface IParamMeasurement {
  timestamp: Date,
  parameter: string,
  value: string | number
}

export function getAllParamMeasurementsById(id: string, param: string) : IParamMeasurement[] {
  const measurements: IMeasurement[] = getAllSensorMeasurementsById(id);
  const paramMeasurements = measurements.map((m: IMeasurement) => {
    return {
      timestamp: new Date(m.timestamp),
      parameter: param,
      value: m[param as keyof IMeasurement]
    }
  });
  return paramMeasurements;
}

export default { 
  getAllSensors, 
  getSensorById, 
  getAllSensorMeasurementsById, 
  getAllParamMeasurementsById
};
