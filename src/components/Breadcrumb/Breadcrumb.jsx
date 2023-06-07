import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';

const Breadcrumb = ({ param } = null) => {
  const location = useLocation();

  const paths = [
    {
      name: <FontAwesomeIcon icon={faHome} />,
      url: '/',
    },
  ];

  if (location.pathname.includes('mi-perfil')) {
    paths.push({ name: 'Mi Perfil', url: '/mi-perfil' });
  }

  if (location.pathname.includes('admin')) {
    paths.push({ name: 'Administración', url: '/admin' });
  }

  if (location.pathname.includes('acerca-de')) {
    paths.push({ name: 'Acerca de', url: '/acerca-de' });
  }

  if (location.pathname.includes('users')) {
    paths.push({ name: 'Usuarios', url: '/admin/users' });

    if (location.pathname.includes('new')) {
      paths.push({ name: 'Nueva', url: '/admin/users/new' });
    }

    if (param !== null) {
      paths.push({ name: 'Editar', url: '/admin/users/edit/' + param });
    }
  }

  if (location.pathname.includes('publications')) {
    paths.push({ name: 'Publicaciones', url: '/admin/publications' });

    if (location.pathname.includes('new')) {
      paths.push({ name: 'Nueva', url: '/admin/publications/new' });
    }

    if (param !== null) {
      paths.push({ name: 'Editar', url: '/admin/publications/edit/' + param });
    }
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
          <li className="hover:text-secondary">
            <Link to={path.url}>{path.name}</Link>
          </li>
          <li>/</li>
        </React.Fragment>
      );
    }
  });

  items.push(
    <li key={currentIndex}>
      <span className="font-bold text-warning-500">
        {paths[currentIndex].name}
      </span>
    </li>
  );

  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">{items}</ol>
    </nav>
  );
};

export default Breadcrumb;
