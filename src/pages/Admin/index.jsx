import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserAlt } from '@fortawesome/free-solid-svg-icons';
import { faNewspaper } from '@fortawesome/free-solid-svg-icons';

import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';

const Admin = () => {
  return (
    <div className="container py-5">
      <h1 className="text-2xl mb-10 font-bold">Panel de administración</h1>
      <Breadcrumb />
      <ul className="mt-6">
        <li>
          <Link to="/admin/users" className="hover:text-blue-700">
            <button className="flex gap-4 my-3">
              <FontAwesomeIcon icon={faUserAlt} className="h-5 text-blue-900" />
              Usuarios
            </button>
          </Link>
        </li>
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
      </ul>
    </div>
  );
};

export default Admin;
