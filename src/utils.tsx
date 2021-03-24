

import DATA_DB from 'data.json';
import SENSORS_DB from 'sensors.json';
import { ISensor, IMeasurement, IParamMeasurement } from 'types';

export function getAllSensors() : ISensor[] {
  return SENSORS_DB.data;
}

export function getSensorById(id: string) : ISensor[] {
  return SENSORS_DB.data.filter((s: ISensor) => s.id === id);
}

export function getSensorsByGroupId(groupId: string) : ISensor[] {
  return SENSORS_DB.data.filter((s: ISensor) => s.group_id === groupId);
}

export function getAllSensorMeasurementsById(id: string) : IMeasurement[] {
  return DATA_DB.data.filter((m: IMeasurement) => m.id === id);
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
  const groupIds = SENSORS_DB.data.filter((s: ISensor) => s.group_id !== "0").map(s => s.group_id)
  return removeDuplicates(groupIds);
}

function removeDuplicates<T>(arr : T[]) : T[] {
  return arr.filter((elem, index, self) => {
    return index === self.indexOf(elem);
  });
}