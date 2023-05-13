import React from 'react';
import { Link } from 'react-router-dom';

const Admin = () => {
  return (
    <div className="container py-5">
      <h1 className="text-2xl mb-10 font-bold">Panel de administración</h1>

      <ul>
        <li>
          {/* link to admin /publications */}
          <Link to="/admin/users" className="button">- Usuarios</Link>
        </li>
        <li>
          <Link to="/admin/publications">- Publicaciones</Link>
        </li>
      </ul>
    </div>
  );
};

export default Admin;
