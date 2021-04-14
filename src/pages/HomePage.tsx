import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import Heading from 'components/Heading';
import SimpleMap from 'components/SimpleMap';
import { Grid, Button } from '@material-ui/core';
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
      <Grid 
        container
        spacing={3}
        direction="row"
        justify="flex-start"
        alignItems="center"
      >
        {groups && groups.map((s: IGroup) => (
          <Grid item key={s.id}>
            <Button component={ Link } to={`/groups/${s.id}`} variant="contained" color="primary">
              {s.name}
            </Button>
          </Grid>
        ))}
      </Grid>
    </div>
  )
}

export default HomePage;