import { Card, CardContent, CardHeader } from '@material-ui/core';
import styled from 'styled-components';
import LineChart from 'components/LineChart';
import { IParamMeasurement, IChartData } from 'types';

interface ParamGraphProps {
  title: string,
  data: IParamMeasurement[],
  id: number
}

const processData = (data : IParamMeasurement[]) : IChartData[] => {
  return data.map(measurement => {
    const processed : IChartData = {
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
        <CardHeader title={props.title} subheader={props.data.length > 0 ? `Siste måling: ${props.data[0].value}` : ""}/>
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