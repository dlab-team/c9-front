import React, { useState, useEffect } from 'react';
import { Gallery } from '../../components';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext/AuthContext';
import Searching from '../../components/Searching/Searching';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';

const Busqueda = () => {
  const { currentUser } = useContext(AuthContext);
  const [showButton, setShowButton] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const isVisible = scrollTop > 100;
      setShowButton(isVisible);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    //TODO: buscar mejora para obtener el parametro
    setSearchValue(window.location.pathname.split('/')[2]);
  }, []);

  return (
    <div className="container mx-auto">
      <main>
        <Gallery searchValue={searchValue} />
      </main>
      {showButton && (
        <button
          className="fixed bottom-2 right-2 w-12 h-12 bg-gray-800 rounded-full text-white flex items-center justify-center hover:opacity-90"
          onClick={handleScrollToTop}
        >
          <FontAwesomeIcon icon={faArrowUp} className="text-2xl" />
        </button>
      )}
    </div>
  );
};

export default Busqueda;
