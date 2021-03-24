export interface ISensor {
  id: string,
  group_id: string,
  latitude: number,
  longitude: number
}

export interface IMeasurement {
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

export interface IParamMeasurement {
  timestamp: Date,
  parameter: string,
  value: string | number
}

export interface IChartData {
  date: Date,
  value: number
}

export interface IMultipleChartData {
  date: Date,
  value1?: number,
  value2?: number,
  value3?: number
}