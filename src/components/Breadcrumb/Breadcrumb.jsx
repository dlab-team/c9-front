import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Breadcrumb = ({ param } = null) => {
  const location = useLocation();

  const paths = [
    { name: 'Home', url: '/' },
    { name: 'Admin', url: '/admin/acceder' },
    { name: 'Publicaciones', url: '/admin/publications' },
  ];

  if (location.pathname.includes('new')) {
    paths.push({ name: 'Nueva', url: '/admin/publications/new' });
  }

  if (param !== null) {
    paths.push({ name: 'Editar', url: '/admin/publications/edit/' + param });
  }

  const filteredPaths = paths.filter((path) => location.pathname !== path.url);

  const items = [];
  const currentIndex = paths.findIndex(
    (path) => path.url === decodeURI(location.pathname)
  );

  filteredPaths.forEach((path, index) => {
    if (index < currentIndex) {
      items.push(
        <React.Fragment key={index}>
          <li className='hover:text-secondary'>
            <Link to={path.url}>{path.name}</Link>
          </li>
          <li>/</li>
        </React.Fragment>
      );
    }
  });

  items.push(
    <li key={currentIndex}>
      <span className='font-bold'>{paths[currentIndex].name}</span>
    </li>
  );

  return (
    <nav aria-label='Breadcrumb'>
      <ol className='flex items-center space-x-2'>{items}</ol>
    </nav>
  );
};

export default Breadcrumb;
