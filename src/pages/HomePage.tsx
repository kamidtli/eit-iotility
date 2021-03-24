import { Link } from "react-router-dom";
import Sensor from '../components/Sensor';
import Heading from '../components/Heading';

import sensorList from '../sensors.json';

function HomePage() {

  const sensors = sensorList.data;
  const sensors_with_group = sensorList.data.filter(s => s.group_id != "0");
  const group_ids = sensors_with_group.map(s => s.group_id);
  const unique_group_ids = group_ids.filter((elem, index, self) => {
    return index === self.indexOf(elem);
  });

  return (
    <div>
      <Heading title="Sensorer" subtitle="Klikk på en sensor for mer informasjon" />
      {sensors.map(s => {
        return (
        <Link to={`/sensors/${s.id}`} key={s.id}>
          <Sensor id={s.id} latitude={s.latitude} longitude={s.longitude} />
        </Link>
        )
      })}
      <Heading title="Sensorgrupper" subtitle="Klikk på en gruppe for mer informasjon" />
      {unique_group_ids.map(s => {
        return (
        <Link to={`/groups/${s}`} key={s}>
          {s}
        </Link>
        )
      })}
    </div>
  )
}

export default HomePage;