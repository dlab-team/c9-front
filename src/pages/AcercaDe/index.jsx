import React from 'react';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import logoYellowS from '../../assets/images/logo_innova_yellow_s.png';
import logoOpenai from '../../assets/images/OpenAI_Logo.svg.png';
import imgEstudiantes from '../../assets/images/estudiantes.png';

const AcercaDe = () => {
  return (
    <div className="container mx-auto">
      <h1 className="my-3 breadcrumb-title">Bienvenid@s a Innova XD</h1>
      <Breadcrumb />
      <div className="my-4">
        <p>
          Como dice Rita Pierson, <b>“every child needs a champion”.</b> Un
          referente que lo inspire, le abra horizontes de posibilidades y lo
          desafíe. Lamentablemente, en muchos sectores de nuestro país, esos
          referentes no siempre están a la mano de los alumnos o se perciben
          como inalcanzables. <br />
        </p>
        <p className="mt-4">
          Pero existen, y prueba de ello son las páginas de publicaciones como{' '}
          <i>Innovación</i> del diario <i>"El Mercurio"</i>, que hace un
          esfuerzo constante para mostrar estos casos y, sobre todo, la forma en
          que resuelven problemas cotidianos a través de vías creativas,
          novedosas y, muchas veces, sin grandes recursos, más allá de la
          creatividad y la capacidad de innovar. <i>Innova XD</i> surge para
          conectar a los niños, niñas y jóvenes con estas historias. En este
          sitio, con el apoyo de la inteligencia artificial, encontrarás una
          selección de noticias que muestran estos referentes y estos procesos
          innovadores y, lo más importante, las "traducen" a un lenguaje
          accesible a todos.
        </p>
      </div>

      <div className="mb-4">
        <img
          src={logoOpenai}
          alt="Logo openAI"
          className="py-3 mb-1 w-[130px]"
        />
        <p>
          Al mezclar trabajo periodístico con inteligencia artificial, existe la
          certeza de que los contenidos tienen un alto estándar. Aquí podrás
          acceder a noticias atractivas, con experiencias cercanas de
          innovaciones que invitan a pensar en cómo, a través de la tecnología,
          puedes cambiar tu vida y la de tu comunidad. Además, para padres y
          profesores, este sitio también propone actividades que pueden trabajar
          en conjunto con sus hijos y alumnos, de una manera simple y didáctica.{' '}
        </p>
        <p className="mt-4">
          <b>¡Bienvenid@s a Innova XD!</b> Una alianza entre Innovación de El
          Mercurio, Microsoft, Desafío Latam y Fundación Kodea, que apunta a
          ampliar los horizontes de nuestros estudiantes y motivarlos a ser
          líderes que mejoren su entorno.
        </p>
      </div>

      <div className="mb-4">
        <img
          src={imgEstudiantes}
          alt="Logo openAI"
          className=" mb-4 w-full rounded shadow-lg"
        />
      </div>
    </div>
  );
};

export default AcercaDe;
