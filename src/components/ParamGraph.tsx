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
    <div>
      <h3>
        {props.title}
      </h3>
      <LineChart data={props.data} id={props.id} />
    </div>
  )
}

export default ParamGraph;
