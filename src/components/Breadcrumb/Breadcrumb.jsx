import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Breadcrumb = () => {
  const paths = [
    { name: 'Home', url: '/' },
    { name: 'Admin', url: '/admin' },
    { name: 'Publicaciones', url: '/admin/publications' },
    { name: 'Nueva', url: '/admin/publications/new' },
  ];

  const location = useLocation();

  const filteredPaths = paths.filter((path) => location.pathname !== path.url);

  const items = [];
  const currentIndex = paths.findIndex(
    (path) => path.url === location.pathname
  );

  filteredPaths.forEach((path, index) => {
    if (index < currentIndex) {
      items.push(
        <React.Fragment key={index}>
          <li className="hover:text-blue-700">
            <Link to={path.url}>{path.name}</Link>
          </li>
          <li>/</li>
        </React.Fragment>
      );
    }
  });

  items.push(
    <li key={currentIndex}>
      <span className="font-bold">{paths[currentIndex].name}</span>
    </li>
  );

  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2 mt-4">{items}</ol>
    </nav>
  );
};

export default Breadcrumb;
