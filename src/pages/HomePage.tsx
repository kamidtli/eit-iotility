import { Link } from "react-router-dom";
import Sensor from '../components/Sensor';
import Heading from '../components/Heading';

import sensorList from '../sensors.json';

function HomePage() {

  const sensors = sensorList.data;

  return (
    <div>
      <Heading title="Sensorkart" subtitle="Klikk på en sensor for mer informasjon" />
      {sensors.map(s => {
        return (
        <Link to={`/${s.id}`}>
          <Sensor id={s.id} latitude={s.latitude} longitude={s.longitude} />
        </Link>
        )
      })}
    </div>
  )
}

export default HomePage;