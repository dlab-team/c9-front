import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const AuthorForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = id !== undefined;

  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [avatar, setAvatar] = useState('');

  useEffect(() => {
    if (isEditing) {
      // Obtener los datos del autor para editar
      axios.get(`http://api.example.com/autores/${id}`)
        .then(response => {
          const author = response.data;
          setNombre(author.nombre);
          setEmail(author.email);
          setDescripcion(author.descripcion);
          setAvatar(author.avatar);
        })
        .catch(error => {
          console.error('Error al obtener los datos del autor:', error);
        });
    }
  }, [id, isEditing]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('nombre', nombre);
    formData.append('email', email);
    formData.append('descripcion', descripcion);
    formData.append('avatar', avatar);

    if (isEditing) {
      // Actualizar un autor existente
      axios.put(`http://api.example.com/autores/${id}`, formData)
        .then(response => {
          navigate('/admin/autores');
        })
        .catch(error => {
          console.error('Error al actualizar el autor:', error);
        });
    } else {
      // Crear un nuevo autor
      axios.post('http://api.example.com/autores', formData)
        .then(response => {
          navigate('/admin/autores');
        })
        .catch(error => {
          console.error('Error al crear el autor:', error);
        });
    }
  };

  return (
    <div>
      <h1>{isEditing ? 'Editar Autor' : 'Crear Autor'}</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nombre">Nombre:</label>
          <input
            type="text"
            id="nombre"
            value={nombre}
            onChange={(event) => setNombre(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="descripcion">Descripción:</label>
          <textarea
            id="descripcion"
            value={descripcion}
            onChange={(event) => setDescripcion(event.target.value)}
          ></textarea>
        </div>
        <div>
          <label htmlFor="avatar">Avatar:</label>
          <input
            type="file"
            id="avatar"
            accept="image/jpeg, image/png"
            onChange={(event) => setAvatar(event.target.files[0])}
          />
        </div>
        <button type="submit">{isEditing ? 'Actualizar' : 'Crear'}</button>
      </form>
    </div>
  );
};

export default AuthorForm;