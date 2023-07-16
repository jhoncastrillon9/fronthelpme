import React, { useState } from 'react';
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
      <h1>Registrar nuevo Caso</h1>

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

const Home = (props) => {  
  const [description, setDescription] = useState('');
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [eventType, setEventType] = useState('');
  const [error, setError] = useState('');
  const [msj, setMsj] = useState('');


  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  const handleTimeChange = (event) => {
    setTime(event.target.value);
  };

  const handleEventTypeChange = (event) => {
    setEventType(event.target.value);
  };

  const handleSaveCase = async () => {
    setError('');

    if (!description) {
      setError('Ingrese una descripción para el caso.');
      return;
    }

    if (selectedLocation === null) {
      setError('Seleccione una ubicación en el mapa.');
      return;
    }

    if (!date || !time) {
      setError('Seleccione una fecha y hora para el caso.');
      return;
    }

    if (!eventType) {
      setError('Seleccione un tipo de evento para el caso.');
      return;
    }

    try {
      const fechaHora = `${date}T${time}`;

      const response = await axios.post('http://localhost:8080/casos', {
        descripcion: description,
        latitud: selectedLocation.lat,
        longitud: selectedLocation.lng,
        fechaHora: fechaHora,
        delito: eventType,
        usuarioId: props.userId
      });

      if (response.status === 201) {
        console.log('Caso creado exitosamente');
        setMsj('Caso Creado con exito');
        const updatedElements = [...props.elementos, response.data];
        props.setElementos(updatedElements);


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
      <Menu isAdmin={props.isAdmin}></Menu>

      <h1>Mis Casos</h1>
      <Map
        selectedLocation={selectedLocation}
        elements={props.elementos}
        setSelectedLocation={setSelectedLocation}
        containerElement={<div style={{ height: '400px', width: '100%' }} />}
        mapElement={<div style={{ height: '100%' }} />}
      />
      <br />
      <br />
      <br />
      <label>Descripción:</label>
      <br />
      <textarea value={description} onChange={handleDescriptionChange} />
      <br />
      <label>Fecha:</label>
      <br />
      <input type="date" value={date} onChange={handleDateChange} />
      <br />
      <label>Hora:</label>
      <br />
      <input type="time" value={time} onChange={handleTimeChange} />
      <br />
      <br />
      <label>Tipo de Evento:</label>
      <br />
      <select value={eventType} onChange={handleEventTypeChange}>
        <option value="">Seleccione un tipo de evento</option>
        <option value="Robo">Robo</option>
        <option value="Agresión">Agresión</option>
        <option value="Violación">Violación</option>
        <option value="Altercado">Altercado</option>
        <option value="Otro">Otro</option>
      </select>
      <br />
      <br />
      <br />
      <button onClick={handleSaveCase}>Guardar Caso</button>
      {error && <p>{error}</p>}
      {msj && <p>{msj}</p>}
    </div>
  );
};

export default Home;