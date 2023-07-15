import React, { useState } from 'react';
import axios from 'axios';
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
var selectedLocation1 = null;



const Map = withGoogleMap((props) => {
  const [selectedLocation, setSelectedLocation] = useState(null);

  const handleMarkerClick = (marker) => {
    // Lógica para manejar el clic en el marcador
    console.log('Marcador clicado:', marker);
  };

  const handleMapClick = (event) => {
    const { latLng } = event;
    const lat = latLng.lat();
    const lng = latLng.lng();


    setSelectedLocation({ lat, lng });
    selectedLocation1 = {lat, lng};

    


  };

  return (
    <div>
      <h1>Mapa de Google</h1>
      <GoogleMap
        defaultZoom={10}
        defaultCenter={{ lat: 6.244203, lng: -75.581211  }} // Coordenadas de San Francisco por defecto
        onClick={handleMapClick}
      >
        {/* Marcador en una ubicación específica */}
        {selectedLocation && (
          <Marker
            position={{ lat: selectedLocation.lat, lng: selectedLocation.lng }}
            onClick={() => handleMarkerClick('Marcador 1')}
          />
        )}
      </GoogleMap>
    </div>
  );
});

const Home = () => {
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleSaveCase = async () => {
    setError('');
    //Muestra en consola el valor de lat e lng de punto en el mapa
    console.log('va a guardar lat'+selectedLocation1.lat+'lng '+selectedLocation1.lng);
    
    try {
      
      if (!description) {
        setError('Ingrese una descripción para el caso.');
        return;
      }
      if (selectedLocation1==null) {
        setError('Seleccione una ubicación en el mapa.');
        return;
      }

      const response = await axios.post('http://localhost:8080/casos', {
        descripcion: description,
        latitud: selectedLocation1.lat,
        longitud: selectedLocation1.lng
      });

      // Verificar la respuesta del servidor
      if (response.status === 201) {
        // Caso creado exitosamente
        console.log('Caso creado exitosamente');
      } else {
        setError('Error al crear el caso');
      }
    } catch (error) {
      console.log(error);
      setError('Error en el servidor');
    }
  };

  return (
    <div>
      <h1>Home</h1>
      <Map
        containerElement={<div style={{ height: '400px', width: '100%' }} />}
        mapElement={<div style={{ height: '100%' }} />}
      />
      <br /><br /><br /><br />
      <label>Descripción:</label>
      <br />
      <textarea value={description} onChange={handleDescriptionChange} />
      <br />
      
      <button onClick={handleSaveCase}>Guardar Caso</button>
      {error && <p>{error}</p>}
    </div>
  );
};

export default Home;