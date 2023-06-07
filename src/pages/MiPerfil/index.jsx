import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTwitter,
  faInstagram,
  faGithub,
} from '@fortawesome/free-brands-svg-icons';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import { Link } from 'react-router-dom';

const MiPerfil = () => {
  const nombre = 'John Doe';
  const descripcion =
    'Periodista apasionada y curiosa con una pasión por contar historias y descubrir la verdad. Con una pluma ágil y una mente inquisitiva, se dedica a investigar y reportar noticias de manera objetiva y precisa. Siempre se esfuerza por obtener diferentes perspectivas y mantener altos estándares éticos en su trabajo.<br/><br/>Sofía tiene una gran habilidad para entrevistar a personas de diversos orígenes y escuchar atentamente sus testimonios. Su empatía y sensibilidad le permiten capturar las emociones y experiencias de sus fuentes de una manera auténtica y respetuosa.<br/><br/>Como periodista comprometida, Sofía está dispuesta a adentrarse en los temas más complejos y controvertidos de la sociedad. Le gusta investigar a fondo para desentrañar la verdad detrás de los eventos y compartir esas historias con el público, brindando una voz a aquellos que a menudo son ignorados.<br/><br/>Con una ética sólida y un sentido de responsabilidad, Sofía se esfuerza por informar con precisión y mantener la integridad en su trabajo periodístico. Cree en el poder de los medios de comunicación para generar un cambio positivo y es consciente de la responsabilidad que conlleva su rol como informadora de la sociedad.<br/><br/>En resumen, Sofía es una periodista apasionada, ética y comprometida, que busca descubrir y compartir la verdad a través de su trabajo periodístico, dando voz a las personas y temas importantes de nuestra sociedad.';
  const redesSociales = [
    {
      nombre: 'Twitter',
      icono: faTwitter,
      url: 'https://twitter.com/tuusuario',
    },
    {
      nombre: 'Instagram',
      icono: faInstagram,
      url: 'https://instagram.com/tuusuario',
    },
    { nombre: 'GitHub', icono: faGithub, url: 'https://github.com/tuusuario' },
  ];
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

  return (
    <div className="container mx-auto">
      <div className="my-5 float-right">
        <img
          src="https://cdn.icon-icons.com/icons2/1999/PNG/512/avatar_people_person_profile_user_woman_icon_123368.png"
          alt="foto de perfil"
          className="h-[120px] shadow-lg rounded border border-gray-300"
        />
      </div>
      <h1 className="my-3 breadcrumb-title">{nombre}</h1>
      <Breadcrumb />

      <div className="mt-5">
        <Link
          to="/mi-perfil"
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
        >
          Editar Perfil
        </Link>
      </div>

      <h2 className="mt-5 text-2xl font-bold">¿Quién soy?</h2>
      <p
        className="text-lg my-4"
        dangerouslySetInnerHTML={{ __html: descripcion }}
      ></p>

      <div className="mb-4 text-center">
        {redesSociales.map((redSocial) => (
          <a
            key={redSocial.nombre}
            href={redSocial.url}
            className="mr-4 text-xl text-blue-600 hover:text-blue-800"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={redSocial.icono} />
          </a>
        ))}
      </div>

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

export default MiPerfil;
