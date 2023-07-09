import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const AuthorList = () => {
    const [autores, setAutores] = useState([]);

    const authors=[
        {
        "id": 1,
        "nombre": "Autor 1",
        "email": "autor1@example.com",
        "descripcion": "Descripción del Autor 1",
        "avatar": "avatar1.jpg"
        },
        {
        "id": 2,
        "nombre": "Autor 2",
        "email": "autor2@example.com",
        "descripcion": "Descripción del Autor 2",
        "avatar": "avatar2.jpg"
        },
        {
        "id": 3,
        "nombre": "Autor 3",
        "email": "autor3@example.com",
        "descripcion": "Descripción del Autor 3",
        "avatar": "avatar3.jpg"
        }
    ]
        

  useEffect(() => {
    // Obtener los autores desde el backend
    axios.get(authors)
      .then(response => {
        setAutores(response.data);
      })
      .catch(error => {
        console.error('Error al obtener los autores:', error);
      });
  }, []);

  const handleDeleteAuthor = (authorId) => {
    // Eliminar un autor
    axios.delete(`http://api.example.com/autores/${authorId}`)
      .then(response => {
        // Actualizar la lista de autores
        setAutores(autores.filter(author => author.id !== authorId));
      })
      .catch(error => {
        console.error('Error al eliminar el autor:', error);
      });
  };

  return (
    <div>
      <h1>Lista de Autores</h1>
      <ul>
        {autores.map(author => (
          <li key={author.id}>
            <Link to={`/autores/${author.id}`}>
              {author.nombre}
            </Link>
            <button onClick={() => handleDeleteAuthor(author.id)}>
              Eliminar
            </button>
          </li>
        ))}
      </ul>
      <Link to="/autores/create">Crear Autor</Link>
    </div>
  );
};

export default AuthorList;