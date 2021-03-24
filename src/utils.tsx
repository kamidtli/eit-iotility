

import DATA_DB from 'data.json';
import SENSORS_DB from 'sensors.json';
import { IMeasurement, IParamMeasurement } from 'types';

export function getAllSensors() {
  return SENSORS_DB.data;
}

export function getSensorById(id: string) {
  return SENSORS_DB.data.filter(sensor => sensor.id === id);
}

export function getAllSensorMeasurementsById(id: string) : IMeasurement[] {
  return DATA_DB.data.filter(measurement => measurement.id === id);
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

export function getAllGroupIds() : string[] {
  const groupIds = SENSORS_DB.data.filter(s => s.group_id !== "0").map(s => s.group_id)
  return removeDuplicates(groupIds);
}

function removeDuplicates<T>(arr : T[]) : T[] {
  return arr.filter((elem, index, self) => {
    return index === self.indexOf(elem);
  });
}