import React, { useState, useEffect } from 'react';
import { Gallery } from '../../components';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext/AuthContext';
import Searching from '../../components/Searching/Searching';

const Home = () => {
  const { currentUser } = useContext(AuthContext);
  const [showButton, setShowButton] = useState(false);

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const isVisible = scrollTop > 100;
      setShowButton(isVisible);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="container mx-auto">
      <main>
        <Gallery />
      </main>
      {showButton && (
        <button
          className="fixed bottom-6 right-6 w-12 h-12 bg-gray-800 rounded-full text-white flex items-center justify-center"
          onClick={handleScrollToTop}
        >
          ↑
        </button>
      )}
    </div>
  );
};

export default Home;
