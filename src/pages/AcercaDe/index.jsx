import React from 'react';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import logoYellowS from '../../assets/images/logo_innova_yellow_s.png';
import logoOpenai from '../../assets/images/OpenAI_Logo.svg.png';
import imgEstudiantes from '../../assets/images/estudiantes.png';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import sebastian from '../../assets/images/seba.jpeg';
import javier from '../../assets/images/javier.jpeg';
import carlos from '../../assets/images/carlos.jpeg';
import carolina from '../../assets/images/carolina.jpeg';
import alfreddo from '../../assets/images/alfreddo.jpg';
import rene from '../../assets/images/rene.jpeg';
import santiago from '../../assets/images/cisneros.jpg';
import agustin from '../../assets/images/agustin.jpeg';
import sebavidal from '../../assets/images/sebavidal.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const teamMembers = [
  {
    name: 'Sebastián Arellano',
    role: 'Front-End',
    image: sebastian,
  },
  {
    name: 'Santiago Cisneros',
    role: 'Back-End',
    image: santiago,
  },
  {
    name: 'René Donaire',
    role: 'Back-End',
    image: rene,
  },
  {
    name: 'Javier Figueroa',
    role: 'Front-End',
    image: javier,
  },
  {
    name: 'Carlos García',
    role: 'Front-End',
    image: carlos,
  },
  {
    name: 'Carolina Mora',
    role: 'Front-End',
    image: carolina,
  },
  {
    name: 'Alfredo Villegas',
    role: 'Front-End',
    image: alfreddo,
  },
  {
    name: 'Agustín Zapata',
    role: 'Back-End',
    image: agustin,
  },
  {
    name: 'Sebastián Vidal',
    role: 'Tech Lead',
    image: sebavidal,
  },
];

const AcercaDe = () => {
  
  const PrevArrow = (props) => {
    const { onClick } = props;
  
    return (
      <button
        className="slick-arrow left-0 ml-2 top-1/2 transform -translate-y-1/2 absolute z-10 cursor-pointer"
        onClick={onClick}
      >
        <FontAwesomeIcon icon={faChevronLeft} style={{ color: "#314baf" }} />
      </button>
    );
  };
  
  const NextArrow = (props) => {
    const { onClick } = props;
  
    return (
      <button
        className="slick-arrow right-0 mr-2 top-1/2 transform -translate-y-1/2 absolute z-10 cursor-pointer"
        onClick={onClick}
      >
        <FontAwesomeIcon icon={faChevronRight} style={{ color: "#314baf" }} />
      </button>
    );
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };


  return (
    <div className="container mx-auto">
      <h1 className="my-3 breadcrumb-title">Bienvenid@s a Innova XD</h1>
      <Breadcrumb />

      <div className="my-20 text-zinc-600">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p>
              Como dice Rita Pierson,{' '}
              <b className='text-primary'>“every child needs a champion”.</b> Un referente que lo
              inspire, le abra horizontes de posibilidades y lo desafíe.
              Lamentablemente, en muchos sectores de nuestro país, esos
              referentes no siempre están a la mano de los alumnos o se perciben
              como inalcanzables.
            </p>
            <p className="mt-4">
              Pero existen, y prueba de ello son las páginas de publicaciones
              como <i>Innovación</i> del diario <i>"El Mercurio"</i>, que hace
              un esfuerzo constante para mostrar estos casos y, sobre todo, la
              forma en que resuelven problemas cotidianos a través de vías
              creativas, novedosas y, muchas veces, sin grandes recursos, más
              allá de la creatividad y la capacidad de innovar.{' '}
              <i>Innova XD</i> surge para conectar a los niños, niñas y jóvenes
              con estas historias. En este sitio, con el apoyo de la
              inteligencia artificial, encontrarás una selección de noticias que
              muestran estos referentes y estos procesos innovadores y, lo más
              importante, las "traducen" a un lenguaje accesible a todos.
            </p>
          </div>
          <div>
            <p>
              Al mezclar trabajo periodístico con inteligencia artificial,
              existe la certeza de que los contenidos tienen un alto estándar.
              Aquí podrás acceder a noticias atractivas, con experiencias
              cercanas de innovaciones que invitan a pensar en cómo, a través de
              la tecnología, puedes cambiar tu vida y la de tu comunidad.
              Además, para padres y profesores, este sitio también propone
              actividades que pueden trabajar en conjunto con sus hijos y
              alumnos, de una manera simple y didáctica.
            </p>
            <p className="mt-4">
              <b className="font-bold text-primary  text-[1.4rem] font-['Caveat_Brush']">¡Bienvenid@s a Innova XD!</b> Una alianza entre Innovación de
              El Mercurio, Microsoft, Desafío Latam y Fundación Kodea, que apunta
              a ampliar los horizontes de nuestros estudiantes y motivarlos a ser
              líderes que mejoren su entorno.
            </p>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <img
          src={imgEstudiantes}
          alt="Logo openAI"
          className="mb-4 w-full rounded shadow-xl"
        />
      </div>
      {/* Nueva sección para mostrar a los miembros del equipo */}
      <div className="my-24">
        <h2 className="text-2xl text-primary pb-8 mb-4 mx-8 text-center">Team desarrollo técnico - Incubadora Desafío Latam</h2>
        <Slider {...settings}> 
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="team-member text-center flex flex-col mx-2"
            >
              <div className="rounded-full w-32 h-32 mx-auto overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <h3 className="text-lg text-gray-700 mt-4">{member.name}</h3>
              <p className="text-sm text-gray-500">{member.role}</p>
            </div>
          ))}
        </Slider>
        
      </div>
    </div>
  );
};

export default AcercaDe;
