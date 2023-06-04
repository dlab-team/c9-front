import React from 'react';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import logoYellowS from '../../assets/images/logo_innova_yellow_s.png';
import logoOpenai from '../../assets/images/OpenAI_Logo.svg.png';
import imgEstudiantes from '../../assets/images/estudiantes.png';

const AcercaDe = () => {
  return (
    <div className="container mx-auto">
      <h1 className="my-3 breadcrumb-title">
        InnovaXD
        <br />
        Las tecnologías al servicio de la información
      </h1>
      <Breadcrumb />
      <div class="my-4">
        <p>
          <b>InnovaXD</b> es un proyecto innovador que utiliza una integración
          de OpenAI para transformar noticias tradicionales en contenido
          adecuado para niños de 6 años. Esta integración aprovecha la potencia
          de la tecnología de ChatGPT para adaptar el lenguaje y la complejidad
          de las noticias, de modo que sean comprensibles y atractivas para los
          niños más pequeños.
        </p>
      </div>

      <div class="mb-4">
        <img
          src={logoOpenai}
          alt="Logo openAI"
          className="py-3 mb-4 w-[180px]"
        />
        <p>
          Mediante la integración de OpenAI, InnovaXD puede generar versiones
          simplificadas y adaptadas de las noticias, utilizando un lenguaje más
          sencillo y ejemplos visuales para hacer que la información sea más
          accesible. Esta tecnología permite mantener la esencia y veracidad de
          las noticias originales mientras se ajusta el nivel de complejidad
          para adaptarlo al público objetivo.
        </p>
      </div>

      <div class="mb-4">
        <img
          src={imgEstudiantes}
          alt="Logo openAI"
          className="py-3 mb-4 w-full"
        />
        <p>
          Es importante tener en cuenta que el presente texto es solo un ejemplo
          y no representa el contenido definitivo de InnovaXD. El proyecto se
          basa en la integración de OpenAI y se apoya en una amplia variedad de
          fuentes confiables y actualizadas para proporcionar a los niños
          información precisa y relevante en un formato adaptado a su edad y
          nivel de comprensión. InnovaXD se esfuerza por ofrecer una experiencia
          enriquecedora y segura, fomentando el aprendizaje y la curiosidad de
          los niños a través de noticias adecuadas para su desarrollo cognitivo.
        </p>
      </div>
    </div>
  );
};

export default AcercaDe;
