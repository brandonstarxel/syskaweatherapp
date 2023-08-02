import React from 'react'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '400px',
  height: '400px',
  margin: 'auto'
};

function Map(props) {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyA2yRQBgLZsUUJZEjyDn5W0TzDkvGaSphs"
  })

  const [map, setMap] = React.useState(null)

  const onLoad = React.useCallback(function callback(map) {
    const degreeIncrease = 0.1;

    let bounds = new window.google.maps.LatLngBounds();
    bounds.extend(new window.google.maps.LatLng(props.center.lat - degreeIncrease, props.center.lng - degreeIncrease));
    bounds.extend(new window.google.maps.LatLng(props.center.lat + degreeIncrease, props.center.lng + degreeIncrease));

    map.fitBounds(bounds);

    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  return isLoaded ? (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={props.center}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        <Marker 
          position={props.center} />
        <></>
      </GoogleMap>
  ) : <></>
}

export default React.memo(Map)