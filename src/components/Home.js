import React, { useState } from 'react';
import { GoogleMap, Marker, InfoWindow } from 'react-google-maps';

const Home = () => {
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [description, setDescription] = useState('');

  const handleMarkerClick = (marker) => {
    setSelectedMarker(marker);
  };

  const handleMapClick = (event) => {
    const { latLng } = event;
    const lat = latLng.lat();
    const lng = latLng.lng();
    // Aquí puedes guardar la ubicación seleccionada en el backend
    console.log('Latitud:', lat);
    console.log('Longitud:', lng);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleSaveDescription = () => {
    // Aquí puedes enviar la descripción al backend utilizando axios o fetch
    console.log('Descripción:', description);
  };

  return (
    <div>
      <h1>Mapa de Google</h1>
      <GoogleMap
        onClick={handleMapClick}
        defaultZoom={10}
        defaultCenter={{ lat: 37.7749, lng: -122.4194 }} // Coordenadas de San Francisco por defecto
      >
        {selectedMarker && (
          <InfoWindow
            position={{ lat: selectedMarker.lat, lng: selectedMarker.lng }}
            onCloseClick={() => setSelectedMarker(null)}
          >
            <div>
              <p>Latitud: {selectedMarker.lat}</p>
              <p>Longitud: {selectedMarker.lng}</p>
              <textarea
                value={description}
                onChange={handleDescriptionChange}
                placeholder="Ingrese una descripción..."
              ></textarea>
              <button onClick={handleSaveDescription}>Guardar Descripción</button>
            </div>
          </InfoWindow>
        )}
        {/* Marcador para la ubicación seleccionada */}
        {selectedMarker && (
          <Marker
            position={{ lat: selectedMarker.lat, lng: selectedMarker.lng }}
            onClick={() => handleMarkerClick(selectedMarker)}
          />
        )}
      </GoogleMap>
    </div>
  );
};

export default Home;