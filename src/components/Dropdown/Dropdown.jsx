import { useState, useEffect, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser, faUsers } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext/AuthContext';

const Dropdown = ({ isAdmin }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { currentUser, setUserLogout } = useContext(AuthContext);
  const username = currentUser.username;
  const email = currentUser.email;

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    setUserLogout();
  };

  return (
    <div className="relative hidden sm:flex items-center mr-5">
      <button
        id="dropdownButton"
        data-dropdown-toggle="dropdownMenu"
        className="flex mx-3 text-sm rounded-full md:mr-0"
        type="button"
        onClick={handleToggle}
      >
        <span className="sr-only">Open user menu</span>
        <FontAwesomeIcon className="text-4xl text-yellow" icon={faCircleUser} />
        <span className="w-2 my-auto xs:hidden md:block">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-5 w-5 text-yellow"
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </span>
      </button>

      <div
        id="dropdownMenu"
        className={`absolute z-50 ${
          isOpen ? '' : 'hidden'
        } bg-neutral-50 divide-y divide-gray-200 border border-gray-200 rounded-lg shadow-2xl w-44`}
        style={{
          top: '100%',
          left: '50%',
          transform: 'translateX(-60%)',
        }}
      >
        <div className="px-4 py-3 text-sm text-primary text-center dark:text-white">
          <div className="font-bold">{username}</div>
          <div className="font-medium truncate">{email}</div>
        </div>
        <ul
          className="py-2 text-sm text-gray-700 dark:text-gray-200 transition duration-300"
          aria-labelledby="dropdownUserAvatarButton"
        >
          <li>
            <Link
              to={`/mi-perfil/${username}`}
              className="block px-4 py-2 hover:bg-blue-100 dark:hover:bg-gray-600 dark:hover:text-white transition duration-300"
            >
              <FontAwesomeIcon
                className="pr-2 text-gray-700"
                icon={faCircleUser}
              />
              Mi Perfil
            </Link>
          </li>
          <li>
            <Link
              to="/admin/publications"
              className="block px-4 py-2 hover:bg-blue-100 dark:hover:bg-gray-600 dark:hover:text-white transition duration-300"
            >
              <FontAwesomeIcon
                icon={faPenToSquare}
                className="h-4 pr-2 text-gray-700"
              />
              Publicaciones
            </Link>
          </li>
          {isAdmin && (
            <li>
              <Link
                to="/admin/users"
                className="block px-4 py-2 hover:bg-blue-100 dark:hover:bg-gray-600 dark:hover:text-white transition duration-300"
              >
                <FontAwesomeIcon className="pr-2" icon={faUsers} />
                Usuarios
              </Link>
            </li>
          )}
        </ul>
        <div className="py-2">
          <button
            onClick={handleLogout}
            className="block w-full py-2 text-sm text-gray-700 hover:bg-blue-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white transition duration-300"
          >
            Cerrar Sesión
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
