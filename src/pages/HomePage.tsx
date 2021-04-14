import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import Heading from 'components/Heading';
import SimpleMap from 'components/SimpleMap';
import { ISensor, IGroup } from 'types';
import { getAllSensors, getAllGroups } from 'utils';

function HomePage() {
  const [sensors, setSensors] = useState<ISensor[] | []>();
  const [groups, setGroups] = useState<IGroup[] | []>();

  useEffect(() => {
    setSensors(getAllSensors())
    setGroups(getAllGroups());
  }, [])

  return (
    <div>
      <Heading title="Målepunkter" subtitle="Klikk på et målepunkt for mer informasjon" />
      <SimpleMap data={sensors}/>
      
      <Heading title="Grupper" subtitle="Klikk på en gruppe for mer informasjon" />
      {groups && groups.map((s: IGroup) => (
        <Link to={`/groups/${s.id}`} key={s.id}>
          {s.name}<br />
        </Link>
      ))}
    </div>
  )
}

export default HomePage;