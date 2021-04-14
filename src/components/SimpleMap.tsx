import { Link } from "react-router-dom";
import styled from 'styled-components';
import GoogleMapReact from 'google-map-react';
import { ISensor } from 'types';
 
const Marker = (props: {id: string, lat: number, lng: number}) => {
  return (
    <Link to={`/sensors/${props.id}`} key={props.id}>
      <Circle />
    </Link>
  );
}

function SimpleMap(props: {data: ISensor[] | [] | undefined, center?: {lat: number, lng: number}}) {

  const api_key = process.env.MAPS_API_KEY;

  return (
    // Important! Always set the container height explicitly
    <div style={{ height: '70vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: api_key ? api_key : ""}}
        defaultCenter={props.center ? props.center : {
          lat: 63.390911,
          lng: 10.445938
        }}
        defaultZoom={11}
      >
        {props.data && props.data.map((s: ISensor) => (
          <Marker
            id={s.id}
            lat={s.latitude}
            lng={s.longitude}
            key={s.id}
          />
        ))}
      </GoogleMapReact>
    </div>
  );
}
 
const Circle = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color: blue;
`

export default SimpleMap;