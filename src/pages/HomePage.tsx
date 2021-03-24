import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import Sensor from 'components/Sensor';
import Heading from 'components/Heading';
import { ISensor } from 'types';
import { getAllSensors, getAllGroupIds } from 'utils';

function HomePage() {
  const [sensors, setSensors] = useState<ISensor[] | []>();
  const [groups, setGroups] = useState<string[] | []>();

  useEffect(() => {
    setSensors(getAllSensors())
    setGroups(getAllGroupIds());
  }, [])

  return (
    <div>
      <Heading title="Sensorer" subtitle="Klikk på en sensor for mer informasjon" />
      {sensors && sensors.map((s: ISensor) => (
        <Link to={`/sensors/${s.id}`} key={s.id}>
          <Sensor id={s.id} latitude={s.latitude} longitude={s.longitude} />
        </Link>
      ))}
      <Heading title="Sensorgrupper" subtitle="Klikk på en gruppe for mer informasjon" />
      {groups && groups.map((s: string) => (
        <Link to={`/groups/${s}`} key={s}>
          {s}
        </Link>
      ))}
    </div>
  )
}

export default HomePage;