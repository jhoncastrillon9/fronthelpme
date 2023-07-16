import React, { useState, useEffect } from "react";
import axios from "axios";
import Menu from './Menu';

const AdminUsers = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [editedUsuario, setEditedUsuario] = useState({
      nombre: "",
      contraseña: "",
      isAdmin: false
    });
    const [selectedUsuarioId, setSelectedUsuarioId] = useState(null);
  
    useEffect(() => {
      consultarUsuarios();
    }, []);
  
    const consultarUsuarios = async () => {
      try {
        const response = await axios.get("http://localhost:8080/usuarios");
        setUsuarios(response.data);
      } catch (error) {
        console.error("Error al consultar usuarios:", error);
      }
    };
  
    const cargarUsuarioParaEditar = (idUsuario) => {
      const usuario = usuarios.find((usuario) => usuario.id === idUsuario);
      if (usuario) {
        setEditedUsuario(usuario);
        setSelectedUsuarioId(idUsuario);
      }
    };
  
    const guardarUsuarioEditado = async () => {
      try {
            console.log('guardarUsuarioEditado');
            console.dir(editedUsuario);
            if(selectedUsuarioId){
                await axios.put("http://localhost:8080/usuarios",  {
                    id: selectedUsuarioId,
                    nombre: editedUsuario.nombre,
                    contraseña: editedUsuario.contraseña,     
                    isAdmin: editedUsuario.isAdmin       
                }  );        
            }

            if(selectedUsuarioId==null && editedUsuario.nombre !== '' && editedUsuario.contraseña !== ''){
                await axios.post("http://localhost:8080/usuarios",  {
                    id: 0,
                    nombre: editedUsuario.nombre,
                    contraseña: editedUsuario.contraseña,     
                    isAdmin: editedUsuario.isAdmin       
                }  );  
            }
     
         consultarUsuarios();
         limpiarFormulario();

      } catch (error) {
        console.error("Error al editar usuario:", error);
      }
    };
  
    const limpiarFormulario = () => {
      setEditedUsuario({
        nombre: "",
        contraseña: "",
        isAdmin: false
      });
      setSelectedUsuarioId(null);
    };
  
    const handleInputChange = (event) => {        
       
        const { name, value, type, checked } = event.target;
        
        const inputValue = type === "checkbox" ? checked : value;
        console.log(inputValue);
        setEditedUsuario((prevUsuario) => ({         
          ...prevUsuario,
          [name]: inputValue
        }));
      };
      console.log('handleInputChange');
      console.log(editedUsuario);
  
    return (
      <div>
         <Menu isAdmin={true}></Menu>
        <h2>Usuarios</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Contraseña</th>
              <th>Admin</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((usuario) => (
              <tr key={usuario.id}>
                <td>{usuario.id}</td>
                <td>{usuario.nombre}</td>
                <td>{usuario.contraseña}</td>
                <td>{usuario.isAdmin.toString()}</td>
                <td>
                  <button onClick={() => cargarUsuarioParaEditar(usuario.id)}>
                    Editar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
  
        <h2>Editar Usuario</h2>
        <form>
          <label>
            Nombre:
            <input
              type="text"
              name="nombre"
              value={editedUsuario.nombre}
              onChange={handleInputChange}
            />
          </label>
          <br />
          <label>
            Contraseña:
            <input
              type="password"
              name="contraseña"
              value={editedUsuario.contraseña}
              onChange={handleInputChange}
            />
          </label>
          <br />
          <label>
            Admin:
            <input
              type="checkbox"
              name="isAdmin"
              checked={editedUsuario.isAdmin}
              onChange={handleInputChange}
            />
          </label>
          <br />
          <button type="button" onClick={guardarUsuarioEditado}>Guardar</button>
          <button type="button" onClick={limpiarFormulario}>
            Cancelar
          </button>
        </form>
      </div>
    );
  };
  
  export default AdminUsers;

