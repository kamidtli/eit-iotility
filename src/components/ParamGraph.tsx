import { Card, CardContent, CardHeader } from '@material-ui/core';
import styled from 'styled-components';
import LineChart from './LineChart';

type ParamGraphProps = {
  title: string,
  data: IParamMeasurement[],
  id: number
}

interface IParamMeasurement {
  timestamp: Date,
  parameter: string,
  value: string | number
}

interface ChartData {
  date: Date,
  value: number
}

const processData = (data : IParamMeasurement[]) : ChartData[] => {
  return data.map(measurement => {
    const processed : ChartData = {
      date: measurement.timestamp,
      value: measurement.value as number
    }
    return processed;
  })
}

function ParamGraph(props: ParamGraphProps) {

  return (
    <CustomCard>
      <CardContent>
        <CardHeader title={props.title} />
        <LineChart data={processData(props.data)} id={props.id} />
      </CardContent>
    </CustomCard>
  )
}

export default ParamGraph;

const CustomCard = styled(Card)`
  padding: 0.5rem;
  border-radius: 4px;
  box-shadow: 0 2px 15px 2px rgba(0, 0, 0, 0.2);
`;