import React, { useState,useEffect  } from 'react';
import axios from 'axios';
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import Menu from './Menu';

const Map = withGoogleMap(({ selectedLocation, setSelectedLocation, elements }) => {

  const handleMarkerClick = (marker) => {
    // Lógica para manejar el clic en el marcador
    console.log('Marcador clicado:', marker);
  };

  const handleMapClick = (event) => {
    const { latLng } = event;
    const lat = latLng.lat();
    const lng = latLng.lng();

    setSelectedLocation({ lat, lng });
  };

  const handleMapUnmount = () => {
    setSelectedLocation(null);
    console.log('handleMapUnmount');
  };

  return (
  
    <div>     

      <GoogleMap
        defaultZoom={12}
        defaultCenter={{ lat: 6.244203, lng: -75.581211 }}
        onClick={handleMapClick}
        onUnmount={handleMapUnmount}
      >
        {/* Marcadores para cada objeto en "elements" */}
        {elements.map((element, index) => (
          <Marker
            key={element.id}
            position={{ lat: element.latitud, lng: element.longitud }}
            onClick={() => handleMarkerClick(`Marcador ${element.id}`)}
           
          />
        ))}     
        
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

const PublicHome = () => {    
  const [selectedLocation, setSelectedLocation] = useState(null);  
  const [error, setError] = useState('');  
  const [elements, setElements] = useState([]);

  useEffect(() => {
    fetchElements();
  }, []);


  const fetchElements = async () => {
    try {
      const response = await axios.get('http://localhost:8080/casos', {       
      });

      if (response.status === 200) {
        setElements(response.data);
      } else {
        setError('Error al obtener los casos');
      }
    } catch (error) {
      console.log(error);
      setError('Error en el servidor');
    }
  };



  return (
    <div>
      <Menu></Menu>

      <h1>Casos Publicos</h1>
      <Map
        selectedLocation={selectedLocation}
        elements={elements}
        setSelectedLocation={setSelectedLocation}
        containerElement={<div style={{ height: '400px', width: '100%' }} />}
        mapElement={<div style={{ height: '100%' }} />}
      />
      <br />
      
      {error && <p>{error}</p>}      
    </div>
  );
};

export default PublicHome;