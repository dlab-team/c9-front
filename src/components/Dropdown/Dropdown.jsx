import { useState, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext/AuthContext';

const Dropdown = ({ isAdmin }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { currentUser, setUserLogout } = useContext(AuthContext);
  const username = currentUser.username;
  const email = currentUser.email;

  // set the dropdown menu element
  const $targetEl = document.getElementById('dropdownMenu');

  // set the element that trigger the dropdown menu on click
  const $triggerEl = document.getElementById('dropdownButton');

  // options with default values
  const options = {
    placement: 'bottom',
    triggerType: 'click',
    offsetSkidding: 0,
    offsetDistance: 10,
    delay: 300,
    onHide: () => {
      setIsOpen(false);
      console.log('dropdown has been hidden');
    },
    onShow: () => {
      setIsOpen(true);
      console.log('dropdown has been shown');
    },
    onToggle: () => {
      setIsOpen((prevState) => !prevState);
      console.log('dropdown has been toggled');
    },
  };

  const handleLogout = () => {
    setUserLogout();
  };

  return (
    <div className="relative flex items-center">
      <button
        id="dropdownButton"
        data-dropdown-toggle="dropdownMenu"
        className="flex mx-3 text-sm rounded-full md:mr-0"
        type="button"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="sr-only">Open user menu</span>
        <FontAwesomeIcon className="text-4xl text-yellow" icon={faCircleUser} />
      </button>

      <div
        id="dropdownMenu"
        className={`absolute z-50 ${
          isOpen ? '' : 'hidden'
        } bg-white divide-y divide-gray-200 rounded-lg shadow-lg w-44`}
        style={{
          top: '100%',
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      >
        <div className="px-4 py-3 text-sm text-primary dark:text-white">
          <div className="font-bold">{username}</div>
          <div className="font-medium truncate">{email}</div>
        </div>
        <ul
          className="py-2 text-sm text-gray-700 dark:text-gray-200"
          aria-labelledby="dropdownUserAvatarButton"
        >
          <li>
            <Link
              to="/mi-perfil"
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              Mi Perfil
            </Link>
          </li>
          <li>
            <Link
              to="/admin/publications"
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              Publicaciones
            </Link>
          </li>
          {isAdmin && (
            <li>
              <Link
                to="/admin/users"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Usuarios
              </Link>
            </li>
          )}
        </ul>
        <div className="py-2">
          <button
            onClick={handleLogout}
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
          >
            Cerrar Sesión
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
