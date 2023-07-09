import React from 'react';
import { GoogleMap, Marker } from 'react-google-maps';

const Map = () => {
  const handleMarkerClick = (marker) => {
    // Lógica para manejar el clic en el marcador
    console.log('Marcador clicado:', marker);
  };

  return (
    <div>
      <h1>Mapa de Google</h1>
      <GoogleMap
        defaultZoom={10}
        defaultCenter={{ lat: 37.7749, lng: -122.4194 }} // Coordenadas de San Francisco por defecto
      >
        {/* Marcador en una ubicación específica */}
        <Marker
          position={{ lat: 37.7749, lng: -122.4194 }} // Coordenadas de San Francisco por defecto
          onClick={() => handleMarkerClick('Marcador 1')}
        />
        {/* Otro marcador en una ubicación diferente */}
        <Marker
          position={{ lat: 37.774, lng: -122.408 }}
          onClick={() => handleMarkerClick('Marcador 2')}
        />
      </GoogleMap>
    </div>
  );
};

export default Map;

