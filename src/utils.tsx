

import DATA_DB from 'data.json';
import SENSORS_DB from 'sensors.json';
import { ISensor, IGroup, IMeasurement, IParamMeasurement } from 'types';

export function getAllSensors() : ISensor[] {
  return SENSORS_DB.data;
}

export function getSensorById(id: string) : ISensor {
  return SENSORS_DB.data.filter((s: ISensor) => s.id === id)[0];
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

export function getAllGroups() : IGroup[] {
  const groups = SENSORS_DB.data.filter((s: ISensor) => s.group_id !== "0").map(s => {
    return {
      id: s.group_id,
      name: s.group_name
    }
  });
  return removeDuplicatesById(groups);
}

export function getGroupById(id: string) : IGroup | undefined {
  const sensorsInGroup = getSensorsByGroupId(id);
  if (sensorsInGroup.length > 0) {
    let sensor = sensorsInGroup[0];
    return {
      id: sensor.group_id,
      name: sensor.group_name
    }
  }
}

function removeDuplicates<T>(arr : T[]) : T[] {
  return arr.filter((elem, index, self) => {
    return index === self.indexOf(elem);
  });
}

function removeDuplicatesById(arr : IGroup[]) : IGroup[] {
  return arr.filter((elem, index, self) =>
    index === self.findIndex((t) => {
      return t.id === elem.id
    })
  )
}