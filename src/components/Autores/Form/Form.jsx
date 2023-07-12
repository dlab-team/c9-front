import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';

const AuthorForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = id !== undefined;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');
  const [photo, setPhoto] = useState(null);

  const emailInput = useRef(null);
  const nameInput = useRef(null);
  const descriptionInput = useRef(null);

  const endpoint = `${process.env.REACT_APP_BACKEND_URL}/author`;

  useEffect(() => {
    if (isEditing) {
      // Obtener los datos del autor para editar
      axios
        .get(`${endpoint}/${id}`)
        .then((response) => {
          const author = response.data;
          setName(author.name);
          setEmail(author.email);
          setDescription(author.description);
          setPhoto(author.photo);
        })
        .catch((error) => {
          console.error('Error al obtener los datos del autor:', error);
        });
    }
  }, [id, isEditing]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!name || !email || !description) {
      toast.error('Todos los campos son obligatorios');
      return;
    }

    if (description.length < 100) {
      toast.error('La descripción debe tener al menos 100 caracteres');
      return;
    }

    if (!validateEmail(email)) {
      toast.error('El email ingresado no es válido');
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('description', description);
    formData.append('photo', photo);

    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
      },
    };

    if (isEditing) {
      axios
        .put(`${endpoint}/${id}`, formData, config)
        .then((response) => {
          toast('Autor actualizado correctamente', {
            type: 'success',
            autoClose: 3000,
            onClose: () => {
              setTimeout(() => {
                navigate('/admin/autores');
              }, 3000);
            },
          });
        })
        .catch((error) => {
          toast('Error al guardar el autor', {
            type: 'error',
            autoClose: 3000,
          });
        });
    } else {
      axios
        .post(endpoint, formData, config)
        .then((response) => {
          toast('Autor creado correctamente', {
            type: 'success',
            autoClose: 3000,
            onClose: () => {
              setTimeout(() => {
                navigate('/admin/autores');
              }, 3000);
            },
          });
        })
        .catch((error) => {
          console.error('Error al crear el autor:', error);
        });
    }
  };

  const validateEmail = (email) => {
    // Expresión regular para validar el formato del email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow-lg text-primary">
      <ToastContainer></ToastContainer>
      <h1 className="text-2xl mb-6 page-title">
        {isEditing ? 'Editar Autor' : 'Crear Autor'}
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="nombre"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Nombre:
          </label>
          <input
            type="text"
            id="nombre"
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Email:
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="descripcion"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Descripción:
          </label>
          <textarea
            id="descripcion"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2 w-full"
          ></textarea>
        </div>
        <div className="mb-4">
          <label
            htmlFor="avatar"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Foto de perfil:
          </label>
          <input
            type="file"
            id="avatar"
            accept="image/jpeg, image/png"
            onChange={(event) => setPhoto(event.target.files[0])}
            className="border-2 border-dashed border-sky-500 rounded-md px-4 py-2 w-full"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          {isEditing ? 'Actualizar' : 'Crear'}
        </button>
      </form>
    </div>
  );
};

export default AuthorForm;
