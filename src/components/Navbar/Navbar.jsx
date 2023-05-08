import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import styles from "./Navbar.module.css";
import logo from "../../assets/images/logo.jpg";
import loginIcon from "../../assets/icons/Vector.png";

const Navbar = ({ isAdmin }) => {
  const { currentUser } = useContext(AuthContext);

  return (
    <nav
      className={`${styles.navbar} relative flex w-full flex-wrap items-center justify-between bg-red-500 py-2 text-neutral-500 hover:text-neutral-700 focus:text-neutral-700 dark:bg-neutral-600 lg:py-4`}
    >
      <div>
        <Link to="/">
          <img
            className={styles.navImg}
            src={logo}
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
