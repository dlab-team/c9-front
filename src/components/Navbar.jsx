import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import logoBlue from '../assets/images/logo_innova_blue.png';
import loginIcon from '../assets/images/loginIcon.svg';
import styles from "./Navbar.module.css";

const Navbar = ({ isAdmin }) => {
  const { currentUser } = useContext(AuthContext);

  return (
    <nav 
    className={`${styles.navbar} relative flex w-full flex-wrap items-center justify-between bg-white-500 py-2 
    text-neutral-500 shadow-lg hover:text-neutral-700 focus:text-neutral-700 dark:bg-neutral-600 lg:py-4`}
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
          <img
            className={styles.loginIcon}
            src={loginIcon}
            alt="Icono de inicio de sesión"
          />
        )}
      </div>
      <div className={styles.divblue}>
        {!isAdmin && (
          <input className={styles.input} type="text" placeholder="ENCUENTRA" />
        )}
      </div>
    </nav>
  );
};

export default Navbar;