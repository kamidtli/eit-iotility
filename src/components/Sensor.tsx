import { ISensor } from "types";

type SensorProps = {
  sensor: ISensor,
}

function Sensor(props: SensorProps) {

  return (
    <div>{props.sensor.name}</div>
  )

}

export default Sensor;