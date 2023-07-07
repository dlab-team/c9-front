import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import 'react-tippy/dist/tippy.css';
import logoYellowS from '../../assets/images/logo_innova_yellow_s.png';
import { AuthContext } from '../../context/AuthContext/AuthContext';

export const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { currentUser, setUserLogout } = useContext(AuthContext);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`sm:hidden ${isOpen ? 'relative' : ''}`}>
      <button
        className={`${
          !isOpen ? 'absolute' : ''
        } top-7 right-4 z-50 p-2 rounded-md focus:outline-none  
          ${
            isOpen
              ? 'text-white border-white fixed'
              : 'text-primary bg-gray-100 border-primary'
          }
          `}
        onClick={toggleMenu}
      >
        <svg
          className="w-6 h-6"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {isOpen ? (
            <path
              d="M6 18L18 6M6 6L18 18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ) : (
            <path
              d="M4 6h16M4 12h16M4 18h16"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          )}
        </svg>
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-40 flex items-center w-full justify-end 
          "
        >
          <div className="bg-black h-full w-[30%] opacity-60"></div>
          <div className="w-[70%] h-full bg-secondary border-l border-gray-600">
            {/* Contenido del menu*/}

            <div className="py-4 px-6 text-white">
              <Link
                to="/acerca-de"
                className="flex items-center mt-10 mb-3 ml-[-4px] hover:bg-blue-200/40 hover:text-primary"
              >
                <img src={logoYellowS} alt="Una imagen del Logo de Innova" />
                Acerca de Innova XD
              </Link>
              {!currentUser && (
                <Link
                  to="/acceso"
                  className="flex items-center mt-2 ml-[-4px] hover:bg-blue-200/40 hover:text-primary"
                >
                  <FontAwesomeIcon
                    className="h-8 mr-2 text-primary"
                    icon={faCircleUser}
                  />
                  Acceder
                </Link>
              )}
              {currentUser && (
                <>
                  <ul>
                    <li className="flex flex-col">
                      <span className="font-semibold text-yellow">
                        {currentUser?.username}
                      </span>
                      <span className="font-light text-gray-300">
                        {currentUser?.email}
                      </span>
                      <Link
                        to="/profile/{currentUser?.username}"
                        className="block mt-2 py-1 hover:bg-blue-200/40 hover:text-primary"
                      >
                        Mi Perfil
                      </Link>
                    </li>
                  </ul>
                  <hr className="my-4" />
                  <ul className={`${currentUser ? '' : 'hidden'}`}>
                    <span className="text-yellow font-semibold text-sm">
                      Administración
                    </span>
                    <li>
                      <Link
                        to="/admin/publications"
                        className="block py-1 mt-1 hover:bg-blue-200/40 hover:text-primary"
                      >
                        Publicaciones
                      </Link>
                    </li>
                    {currentUser?.isAdmin && (
                      <li>
                        <Link
                          to="/admin/users"
                          className="block py-1 hover:bg-blue-200/40 hover:text-primary"
                        >
                          Usuarios
                        </Link>
                      </li>
                    )}
                    <hr className="my-4" />
                  </ul>
                  <button
                    onClick={() => {
                      setUserLogout();
                    }}
                    className="block w-full py-2 text-start text-base hover:bg-blue-200/40 hover:text-primary"
                  >
                    Cerrar Sesión
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileMenu;
