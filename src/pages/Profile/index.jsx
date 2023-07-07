import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTwitter,
  faInstagram,
  faGithub,
} from '@fortawesome/free-brands-svg-icons';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
// import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import { Link } from 'react-router-dom';

const Profile = () => {
  let { username } = useParams();
  const [currentProfile, setCurrentProfile] = useState({});

  const getProfile = async () => {
    if (username === undefined) {
      username = currentUser.username;
    }

    const endpoint = `${process.env.REACT_APP_BACKEND_URL}/author/${username}`;
    const response = await axios.get(endpoint);
    setCurrentProfile(response.data);
  };

  // TODO: leer publicaciones desde el backend
  const publicaciones = [
    {
      date: 'Ene 1',
      content:
        'Descubrimiento en el bosque encantado: hadas y duendes se reúnen para celebrar',
    },
    {
      date: 'May 3',
      content: 'El valiente perro Max salva el día en la playa',
    },
    {
      date: 'May 6',
      content:
        'Increíble hallazgo arqueológico: dinosaurios regresan a la vida en el museo',
    },
    {
      date: 'Jun 2',
      content:
        'El astronauta Amelia explora el espacio y encuentra nuevos planetas',
    },
    {
      date: 'Jun 7',
      content:
        'Los animales de la granja preparan una fiesta sorpresa para el granjero Juan',
    },
  ];

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <div className="container mx-auto">
      <div className="my-5 float-right">
        <img
          src="https://cdn.icon-icons.com/icons2/1999/PNG/512/avatar_people_person_profile_user_woman_icon_123368.png"
          alt="foto de perfil"
          className="h-[120px] shadow-lg rounded border border-gray-300"
        />
      </div>
      <h1 className="my-3 breadcrumb-title">{currentProfile.name}</h1>
      {/* <Breadcrumb /> */}

      {/* <div className="mt-5">
        <Link
          to="/mi-perfil"
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
        >
          Editar Perfil
        </Link>
      </div> */}

      <h2 className="mt-5 text-2xl font-bold">¿Quién soy?</h2>
      <p
        className="text-lg my-4"
        dangerouslySetInnerHTML={{ __html: currentProfile.description }}
      ></p>

      <h2 className="text-2xl font-bold mb-2">Mis publicaciones</h2>
      <ul className="list-disc ml-6">
        {publicaciones.map((publicacion) => (
          <li key={publicacion} className="mb-2">
            <FontAwesomeIcon icon={faCalendarAlt} className="mr-2" />
            {publicacion.date} - {publicacion.content}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Profile;
