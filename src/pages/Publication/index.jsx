import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import './index.css';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Importa los estilos del carrusel
import { Carousel } from 'react-responsive-carousel'; // Importa el componente de carrusel

import bgIzq from '../../assets/images/bg-izq.png';
import bgDer from '../../assets/images/bg-der.png';

const Publication = () => {
  const [publication, setPublication] = useState();
  const carouselRef = useRef(null);
  const { slug } = useParams();

  const [activeIndex, setActiveIndex] = useState(null);
  const toggleQuestion = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  const endpoint = `${process.env.REACT_APP_BACKEND_URL}/publications/${slug}`;

  const getPublicationData = async () => {
    try {
      const response = await axios.get(endpoint);
      const { publication } = response.data;

      setPublication(publication);

      // TODO: quitar cuando el form permita imagenes
      if (publication?.images.length === 0) {
        for (let i = 0; i < 3; i++) {
          const randomId = Math.floor(Math.random() * 1000) + 1;
          const imageUrl = `https://picsum.photos/1200/800?random=${randomId}`;
          publication.images.push({
            url: imageUrl,
          });
        }
      }

      if (carouselRef.current) {
        const dots = document.querySelectorAll('.control-dots .dot');
        dots[0].click();
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getPublicationData();
  }, []);

  return (
    <>
      <div className="container mx-auto py-7">
        <Link to="/">
          <button
            type="button"
            className="btn_back text-blue-800 text-sm py-2.5 text-center inline-flex items-center"
          >
            <FontAwesomeIcon icon={faChevronLeft} className="mr-2" />
            Volver
          </button>
        </Link>
        <h1 className="innova-title pt-5">{publication?.name}</h1>
      </div>
      <Carousel
        ref={carouselRef}
        showStatus={false}
        showThumbs={false}
        centerMode
        centerSlidePercentage={60}
        infiniteLoop
        className="pb-4 mt-4"
      >
        {publication?.images.map((img, index) => (
          <div key={`img_${index}`}>
            <img
              className="imgSlide w-full"
              src={img.url}
              alt={`Imagen ${index}`}
            />
          </div>
        ))}
      </Carousel>
      <div
        className="bg-no-repeat bg-right-top"
        style={{ backgroundImage: `url(${bgDer})`, backgroundSize: '200px' }}
      >
        <div className="container mx-auto">
          <div className="innova-text w-4/5 mx-auto py-4 whitespace-wrap">
            {publication?.finalContent}
          </div>
        </div>
        <div className="innova-text container w-5/5 mx-auto py-4">
          <h2 className="pt-8">PREGUNTAS RELACIONADAS</h2>
          <div className="innova-text">
            {publication?.questions.map((item, index) => (
              <div key={index} className="">
                <div
                  className="bg-gray-100 mb-2 flex justify-between items-center cursor-pointer py-2 border rounded-lg p-3"
                  onClick={() => toggleQuestion(index)}
                >
                  <div className="">{item.question}</div>
                  <svg
                    className={`w-5 h-5 transition-transform ${
                      activeIndex === index ? 'transform rotate-180' : ''
                    }`}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
                {activeIndex === index && (
                  <div className="py-2 pl-2 pb-8">{item.answer}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Publication;
