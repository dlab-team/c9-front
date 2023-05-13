import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Breadcrumb = ({ paths }) => {
  const location = useLocation();

  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2 mt-4">
        {paths.map((path, index) => (
          <li key={index}>
            {index === paths.length - 1 ? (
              <span className="text-gray-500">{path.name}</span>
            ) : (
              <Link
                to={path.url}
                className={`text-black-500 hover:text-blue-700 ${
                  location.pathname === path.url ? 'bg-yellow-200 px-3 py-2 rounded-lg' : ''
                }`}
              >
                {path.name}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
