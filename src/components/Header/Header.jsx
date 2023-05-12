import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext/AuthContext';
import logoBlue from '../../assets/images/logo_innova_blue.png';
import styles from './Header.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';

const Header = ({ isAdmin }) => {
  const { currentUser } = useContext(AuthContext);

  return (
    <nav
      className={`${styles.navbar} relative flex w-full flex-wrap items-center justify-between bg-white-500 py-2 
    text-neutral-500 hover:text-neutral-700 focus:text-neutral-700 dark:bg-neutral-600 lg:py-4`}
    >
      <div>
        <Link to="/">
          <img
            className={styles.navImg}
            src={logoBlue}
            alt="Una imagen del Logo de Innova"
          />
        </Link>
        {isAdmin && (
          <FontAwesomeIcon className={styles.loginIcon} icon={faCircleUser} />
        )}
      </div>

      <div className={styles.divblue}>
        {!isAdmin && (
          <div className={styles.inputWrapper}>
            {' '}
            {/* Acá agregué el div inputWrapper para poder agrupar en ícono con el input, sino no me dejaba insertarlo */}
            <input
              className={styles.input}
              type="text"
              placeholder="ENCUENTRA"
            />
            <FontAwesomeIcon className={styles.icon} icon={faMagnifyingGlass} />
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;
