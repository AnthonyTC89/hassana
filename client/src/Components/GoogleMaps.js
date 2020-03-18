import React from 'react';
import PropTypes from 'prop-types';
import { GoogleMap, withScriptjs, withGoogleMap, Marker } from 'react-google-maps';

const GoogleMaps = ({ map }) => {
  const { zoom, lat, lng } = map;
  return (
    <GoogleMap defaultZoom={zoom} defaultCenter={{ lat, lng }}>
      <Marker position={{ lat, lng }} />
    </GoogleMap>
  );
};

GoogleMaps.propTypes = {
  map: PropTypes.object.isRequired,
};

export default withScriptjs(withGoogleMap(GoogleMaps));
