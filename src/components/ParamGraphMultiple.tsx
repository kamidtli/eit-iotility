import { Card, CardContent, CardHeader } from '@material-ui/core';
import styled from 'styled-components';
import MultipleLineChart from 'components/MultipleLineChart';
import { IMultipleChartData } from 'types';

interface ParamGraphProps {
  title: string,
  data: IMultipleChartData[],
  id: number
}

function ParamGraph(props: ParamGraphProps) {

  return (
    <CustomCard>
      <CardContent>
        <CardHeader title={props.title} />
        <MultipleLineChart data={props.data} id={props.id} />
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