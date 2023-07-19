import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faNewspaper } from '@fortawesome/free-solid-svg-icons';




const CardTwo = () => {
  const [totalPublications, setTotalPublications] = useState(0);

  useEffect(() => {
    const fetchTotalPublications = async () => {
      const endpoint = `${process.env.REACT_APP_BACKEND_URL}/admin_publications`;
      try {
        const response = await axios.get(endpoint);
        const publications = response.data;
        setTotalPublications(publications.length);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTotalPublications();
  }, []);

    return (
      <div className="rounded-md border border-gray-50 text-center bg-white py-6 shadow-xl">
        <div className="flex h-12 w-12 mx-auto items-center justify-center rounded-full bg-gray-100">
        <FontAwesomeIcon
                icon={faNewspaper}
                className="fa-md text-blue-400 font-thin"
              />
        </div>
  
        <div className="mt-4">
          <div>
            <h4 className="text-xl font-bold text-black dark:text-white">
              {totalPublications}
            </h4>
            <span className="text-sm font-light text-gray-600">Total de Noticias</span>
          </div>
        </div>
      </div>
    );
  };
  
  export default CardTwo;
  