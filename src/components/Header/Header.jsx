import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext/AuthContext';
import logoBlue from '../../assets/images/logo_innova_blue.png';
import logoYellowS from '../../assets/images/logo_innova_yellow_s.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const Header = ({ isAdmin }) => {
  const { currentUser } = useContext(AuthContext);
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const isMobile = window.innerWidth < 640;

  // Renderizar estructura de header para la página de inicio
  const renderHomeHeader = () => (
    <nav
      style={{
        background: 'linear-gradient(to right, white 50%, #00235c 50%)',
      }}
    >
      <div className="header-container container mx-auto flex">
        <Link to="/">
          <img
            className="me-3 py-3"
            src={logoBlue}
            alt="Una imagen del Logo de Innova"
          />
        </Link>
        <div className="flex-1 bg-innova-blue nav-rounded flex justify-end">
          <div className="relative flex items-center">
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
              <FontAwesomeIcon icon={faSearch} className="text-blue-800" />
            </div>
            <input
              type="text"
              className="input-search pl-10 pr-3 py-1 rounded-full min-h-10 border border-yellow-500 text-blue-800 placeholder-blue-900"
              placeholder="Encontrar"
            />
          </div>
        </div>
        <Link
          to='/acceso'
          className='flex items-center justify-center mx-3 ms-5'
        >
          <FontAwesomeIcon
            className="text-5xl text-yellow-500 hover:text-yellow-800"
            icon={faCircleUser}
          />
        </Link>
      </div>
    </nav>
  );

  // Renderizar estructura de header para otras páginas en vistas móviles
  const renderOtherHeaderMobile = () => (
    <nav style={{ background: '#00235c' }}>
      <div className="header-container-two mx-auto flex justify-between">
        <Link to="/">
          <img
            className="me-3 py-3 ml-5"
            src={logoYellowS}
            alt="Una imagen del Logo de Innova"
          />
        </Link>
        <div className="container-flex-two relative flex items-center mr-5">
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
            <FontAwesomeIcon
              icon={faSearch}
              className="fa-search text-blue-800"
            />
          </div>
          <input
            type="text"
            className="input-search-two pl-10 pr-3 py-1 rounded-full min-h-10 border border-yellow-500 text-blue-800 placeholder-blue-900"
          />
        </div>
      </div>
    </nav>
  );

  return (
    <>
      {isHomePage || !isMobile ? renderHomeHeader() : renderOtherHeaderMobile()}
    </>
  );
};

export default Header;
