import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserAlt, faNewspaper, faSliders, faAt } from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from '../../context/AuthContext/AuthContext';
import {
  Collapse,
  Ripple,
  initTE,
} from "tw-elements";



import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';

const Admin = () => {
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    initTE({ Collapse, Ripple })
  },[])

  return (
    <div className="container mx-auto">
      <h1 className="my-3 breadcrumb-title">Panel de administración</h1>
      <Breadcrumb />
      <ul className="mt-6">
        <li>
          <Link to="/admin/publications" className="hover:text-blue-700">
            <button className="flex gap-4 my-3">
              <FontAwesomeIcon
                icon={faNewspaper}
                className="h-5 text-blue-900"
              />
              Publicaciones
            </button>
          </Link>
        </li>

        {currentUser && currentUser.isAdmin && (
          <>
          <li>
            <Link to="/admin/users" className="hover:text-blue-700">
              <button className="flex gap-4 my-3">
                <FontAwesomeIcon 
                  icon={faUserAlt} 
                  className="h-5 text-blue-900" 
                />
                Usuarios
              </button>
            </Link>
          </li>
          <li className="relative hover:text-blue-700" data-te-dropdown-ref>
            
              <button 
                className="flex gap-4 my-3 whitespace-nowrap transition duration-150 ease-in-out hover:text-blue-700 motion-reduce:transition-none"
                data-te-collapse-init
                data-te-ripple-init
                data-te-ripple-color="light"
                data-te-target="#collapseExample"
                aria-expanded="false"
                aria-controls="collapseExample"
              >
              <FontAwesomeIcon 
                icon={faSliders} 
                className="h-5 text-blue-900" 
              />
              Filtros
              <span className="ml-2 w-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-5 w-5">
                  <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                    clipRule="evenodd" />
                </svg>
              </span>
              </button>
              
              <ul className="!visible hidden text-blue-900 text-sm ml-5 w-60" id="collapseExample" data-te-collapse-item>
              <Link to="/admin/regiones" className="hover:text-blue-700">
                <li
                  className="block rounded-lg bg-white p-3 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] hover:bg-blue-50"
                >
                  Regiones 
                </li>
                </Link>
                <Link to="/admin/comunas" className="hover:text-blue-700">
                <li
                  className="block rounded-lg bg-white p-3 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] hover:bg-blue-50"
                >
                  Comunas 
                </li>
                </Link>
              </ul>
          </li>
          </>
        )}
        <li>
          <Link to="/admin/autores" className="hover:text-blue-700">
            <button className="flex gap-4 my-3">
            <FontAwesomeIcon 
              icon={faAt} 
              className="h-5 text-blue-900"
            />
            Autores
            </button>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Admin;
