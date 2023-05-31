import React from 'react';
import { Link } from 'react-router-dom';
import LogoYellow from '../../assets/images/logo_innova_yellow.png';
import LogoMercurio from '../../assets/images/logo-elmercurio.png';
import LogoMicrosoft from '../../assets/images/logo-microsoft.png';
import LogoAdl from '../../assets/images/logo-adl.png';

const Footer = () => {
  return (
    <Link to="./">
      <footer className="p-4 lg:text-left mt-8 bg-secondary">
        <div className="flex justify-center items-center">
          <img src={LogoYellow} alt="LogoYellow" className="h-24" />
        </div>
        <div className="flex justify-center my-3">
          <Link to="">
            <img
              src={LogoMercurio}
              alt="Logo Innovacion"
              className="h-16 rounded-full border border-white border-1"
            />
          </Link>
          <Link to="">
            <img
              src={LogoMicrosoft}
              alt="Logo Microsoft"
              className="h-16 mx-8 rounded-full border border-white border-1"
            />
          </Link>
          <Link to="">
            <img
              src={LogoAdl}
              alt="Logo ADL"
              className="h-16 rounded-full border border-white border-1"
            />
          </Link>
        </div>
      </footer>
    </Link>
  );
};

export default Footer;
