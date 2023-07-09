import React from 'react';
import { Link } from 'react-router-dom';
import AuthorList from '../../../components/Autores/AuthorsList';
import AuthorForm from '../../../components/Autores/Form/Form';

const Authors = () => {
    return (
      <div>
        <h1>Autores</h1>
        <nav>
          <ul>
            <li>
              <AuthorList/>
            </li>
            <li>
              <Link to="/autores/create">Crear Autor</Link>
            </li>
          </ul>
        </nav>
      </div>
    );
  };
export default Authors;