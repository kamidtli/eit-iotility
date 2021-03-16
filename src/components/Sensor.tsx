type SensorProps = {
  id: string,
  latitude: number,
  longitude: number
}

function Sensor(props: SensorProps) {

  return (
    <div>({parseFloat(props.latitude.toFixed(4))}, {parseFloat(props.longitude.toFixed(4))})</div>
  )

}

export default Sensor;