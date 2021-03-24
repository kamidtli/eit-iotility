import { Card, CardContent, CardHeader } from '@material-ui/core';
import styled from 'styled-components';
import LineChart from './LineChart';

type Measurement = {
  date: Date,
  value: number
}

type ParamGraphProps = {
  title: string,
  data: Measurement[],
  id: number
}

function ParamGraph(props: ParamGraphProps) {

  return (
    <CustomCard>
      <CardContent>
        <CardHeader title={props.title} />
        <LineChart data={props.data} id={props.id} />
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