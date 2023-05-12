import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './Gallery.module.css';
import { Filters } from '../../components';
import axios from 'axios';

const Gallery = () => {
  const [news, setNews] = useState([]);
  const navigate = useNavigate();
  const endpoint = `${process.env.REACT_APP_BACKEND_URL}/publications`;

  const getPublicationsData = async () => {
    try {
      const response = await axios.get(endpoint);
      const data = response.data;

      setNews(data);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  // TODO: cuando se devuelvan imagenes desde el back, eliminar esta linea
  const getRandomId = () => Math.floor(Math.random() * 1000);
  const getRandomHeight = () => Math.floor(Math.random() * 300) + 200;

  useEffect(() => {
    getPublicationsData();
  }, []);

  return (
    <>
      <Filters />
      <div
        className={`${styles.gallery} columns-1 md:columns-3 lg:columns-3`}
        style={{ columnGap: '1px' }}
      >
        {news.map((n) => (
          <div
            className="cursor-pointer block max-h-100 max-w-sm rounded-2xl overflow-hidden border border-gray-200 mb-3 mr-1 bg-white shadow-gray-200 shadow-xl duration-300 hover:shadow-xl hover:shadow-black/20"
            key={n.id}
            onClick={() => navigate(`/noticias/${n.slug}`)}
          >
            <div
              className="relative overflow-hidden bg-cover bg-no-repeat"
              data-te-ripple-init
              data-te-ripple-color="light"
            >
              <img
                className="max-w-full h-full object-cover rounded-t-lg transition duration-300 ease-in-out hover:opacity-70"
                // src={n.imagen}
                src={`https://picsum.photos/id/${getRandomId()}/400/${getRandomHeight()}`}
                alt={n.name}
              />
            </div>
            <div className="px-4 py-3 leading-normal text-left">
              <h1 className="text-md font-bold pb-3">{n.titulo}</h1>
              <p className="card-date font-thin text-xs pb-2">
                Creado {n.fecha}
              </p>
              <p className={`${styles.cardText} text-xs font-thin`}>
                {n.noticia}
              </p>
            </div>
            <div className="px-4 py-3">
              <p className="text-sm leading-normal">@{n.usuario}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Gallery;
