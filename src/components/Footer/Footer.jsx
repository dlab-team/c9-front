import React from 'react';
import { Link } from 'react-router-dom';
import './footer.css'
import LogoYellow from '../../assets/images/logo_innova_yellow.png';

const Footer= () => {
  return (
    <footer className="text-center lg:text-left">
      <div className="p-4 text-center">
        <Link to="https://www.emol.com/" target="_blank" rel="noopener noreferrer">
          <img src={LogoYellow} alt="Logo InnovaXD"
          ></img>
        </Link>
      </div>
    </footer>
  );
}

export default Footer;
