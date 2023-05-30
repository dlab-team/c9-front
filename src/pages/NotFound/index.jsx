import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '60vh',
        textAlign: 'center',
      }}
    >
      <div>
        <img
          src="https://img.freepik.com/free-vector/404-error-with-landscape-concept-illustration_114360-7898.jpg"
          alt="404"
        />
        <h1 className="text-4xl font-bold mb-4">Página no encontrada</h1>
        <p className="mb-4">
          Lo sentimos, la página que estás buscando no existe.
        </p>
        <p>
          <Link
            className="inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            to="/"
          >
            Volver al inicio
          </Link>
        </p>
      </div>
    </div>
  );
};

export default NotFound;
