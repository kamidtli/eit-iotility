import { ISensor } from "types";

type SensorProps = {
  sensor: ISensor,
}

function Sensor(props: SensorProps) {

  return (
    <div>{props.sensor.name} ({parseFloat(props.sensor.latitude.toFixed(4))}, {parseFloat(props.sensor.longitude.toFixed(4))})</div>
  )

}

export default Sensor;