import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

import axios from 'axios';


const AuthorForm = () => {
  const navigate = useNavigate();
  const { id= '' } = useParams();
  const isEditing = id !== undefined;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');
  
  const [image, setImage] = useState(null);

  const emailInput = useRef(null);
  const nameInput = useRef(null);
  const descriptionInput = useRef(null);

    // formData = new FormData();
    //formData.append('name', name);
    //formData.append('email', email);
    //formData.append('description', description);
    //formData.append('image', image);

  const endpoint = `${process.env.REACT_APP_BACKEND_URL}/regions`


  useEffect(() => {
    if (isEditing) {
      // Obtener los datos del autor para editar
        axios.get(`${endpoint}/${id}`)
          .then(response => {
            const author = response.data;
            setName(author.name);
            //setEmail(author.email);
            //setDescription(author.description);
            //setPhoto(author.photo);
          })
          .catch(error => {
            console.error('Error al obtener los datos del autor:', error);
          });
      }
  }, [id, isEditing]);
   


  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('nombre', name);
    //formData.append('email', email);
    //formData.append('descripción', description);
    //formData.append('avatar', photo);

    if (isEditing) {
      console.log('Actualizar autor:', formData);
      navigate('/admin/autores');
    } else {
      console.log('Crear autor:', formData);
      navigate('/admin/autores');
    }
  };

  return (
    <div>
       <ToastContainer></ToastContainer>
      <h1>{isEditing ? 'Editar Autor' : 'Crear Autor'}</h1>
      <form onSubmit={handleSubmit}>
        <div className='container mx-auto py-6'>
      
        
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="description">Descripción:</label>
          <textarea
            id="descripton"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          ></textarea>
        </div>
        <div>
          <label htmlFor="avatar">Avatar:</label>
          <input
            type="file"
            id="avatar"
            accept="image/jpeg, image/png"
            onChange={(event) => setPhoto(event.target.files[0])}
          />
        </div>
        <button type="submit">{isEditing ? 'Actualizar' : 'Crear'}</button>
      </form>
    </div>
  );
};

export default AuthorForm;