import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { Tooltip } from 'react-tippy';
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
          <div
            className="w-[70%] h-full bg-secondary border-l border-gray-600
            
            "
          >
            {/* Contenido del menu*/}
            <Link to="/acerca-de" className="flex items-center w-16 mt-6 ml-4">
              <Tooltip title="Acerca de InnovaXD" position="top" arrow={true}>
                <img src={logoYellowS} alt="Una imagen del Logo de Innova" />
              </Tooltip>
            </Link>
            <div className="py-4 px-6 text-white">
              {!currentUser && (
                <Link to="/acceso" className="flex items-center mt-2 ml-[-4px]">
                  <FontAwesomeIcon
                    className="h-8 mr-2 text-primary"
                    icon={faCircleUser}
                  />
                  Acceder
                </Link>
              )}
              {currentUser && (
                <>
                  <ul className="">
                    <li className="flex flex-col">
                      <span className="font-semibold text-primary">
                        {currentUser?.username}
                      </span>
                      <span className="font-light">{currentUser?.email}</span>
                      <Link
                        to="/mi-perfil"
                        className="block mt-2 hover:bg-gray-100  hover:text-black"
                      >
                        Mi Perfil
                      </Link>
                    </li>
                  </ul>
                  <hr className="my-4" />
                  <ul className={`${currentUser ? '' : 'hidden'}`}>
                    <span className="text-primary font-semibold text-sm">
                      Administración
                    </span>
                    <li>
                      <Link
                        to="/admin/publications"
                        className="block py-1  mt-1 hover:bg-gray-100 hover:text-black"
                      >
                        Publicaciones
                      </Link>
                    </li>
                    {currentUser?.isAdmin && (
                      <li>
                        <Link
                          to="/admin/users"
                          className="block py-1 hover:bg-gray-100  hover:text-black"
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
                    className="block w-full text-start text-base hover:bg-gray-100  hover:text-black"
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
