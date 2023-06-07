import React from 'react';
import { Link } from 'react-router-dom';
import LogoYellow from '../../assets/images/logo_innova_yellow.png';
import LogoMercurio from '../../assets/images/logo-elmercurio.png';
import LogoMicrosoft from '../../assets/images/logo-microsoft.png';
import LogoAdl from '../../assets/images/logo-adl.png';
import LogoKodea from '../../assets/images/logo-kodea.png';

const Footer = () => {
  return (
    <footer className="p-4 lg:text-left mt-8 bg-secondary">
      <div className="container mx-auto grid grid-cols-2">
        <div className="text-left">
          <Link to="/">
            <img
              src={LogoYellow}
              alt="LogoYellow"
              className="h-18 rounded-lg"
            />
          </Link>
        </div>
        <div className="text-right flex gap-2">
          <Link to="">
            <img
              src={LogoMercurio}
              alt="Logo Innovacion"
              className="h-16 rounded-lg border border-white border-1"
            />
          </Link>
          <Link to="">
            <img
              src={LogoMicrosoft}
              alt="Logo Microsoft"
              className="h-16 rounded-lg border border-white border-1"
            />
          </Link>
          <Link to="">
            <img
              src={LogoAdl}
              alt="Logo ADL"
              className="h-16 rounded-lg border border-white border-1"
            />
          </Link>
          <Link to="">
            <img
              src={LogoKodea}
              alt="Logo de Kodea"
              className="h-16 border rounded-lg border-white border-1 bg-white p-1"
            />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
