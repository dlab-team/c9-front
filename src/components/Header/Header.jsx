import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext/AuthContext';
import logoBlue from '../../assets/images/logo_innova_blue.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import './Header.css';

const Header = ({ isAdmin }) => {
  const { currentUser } = useContext(AuthContext);

  return (
    <nav
      style={{
        background: 'linear-gradient(to right, white 50%, #00235c 50%)',
      }}
    >
      <div className="container mx-auto flex">
        <Link to="/">
          <img
            className="me-3 py-3"
            src={logoBlue}
            alt="Una imagen del Logo de Innova"
          />
        </Link>
        <div className="flex-1 bg-innova-blue nav-rounded flex justify-end">
          <div className="relative flex items-center">
            <div className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400">
              <FontAwesomeIcon icon={faSearch} className="text-blue-800" />
            </div>
            <input
              type="text"
              className="input-search pl-8 pr-3 py-1 rounded-full min-h-10 border border-yellow-500 text-blue-800 placeholder-blue-900"
              placeholder="Encontrar"
            />
          </div>
        </div>
        <Link to="/admin" className="flex items-center justify-center mx-3 ms-5">
          <FontAwesomeIcon
            className="text-5xl text-yellow-500 hover:text-yellow-800"
            icon={faCircleUser}
          />
        </Link>
      </div>
    </nav>
  );
};

export default Header;
