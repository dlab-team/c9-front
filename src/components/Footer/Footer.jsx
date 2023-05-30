import React from 'react';
import { Link } from 'react-router-dom';
import LogoYellow from '../../assets/images/logo_innova_yellow.png';
import LogoMercurio from '../../assets/images/mercurio-logo.png';
import LogoMicrosoft from '../../assets/images/microsoft-logo.png';
import LogoAdl from '../../assets/images/adl-logo.png';

const Footer = () => {
  return (
    <Link to='./'>
      <footer className='flex items-center justify-between p-4 lg:text-left mt-8 bg-secondary'>
        <div className='flex items-center'>
          <img src={LogoMercurio} alt='Logo Innovacion' className='h-8' />
          <img src={LogoMicrosoft} alt='Logo Microsoft' className='h-16' />
        </div>
        <img src={LogoYellow} alt='LogoYellow' className='h-16 mr-16' />
        <div>
          <img src={LogoAdl} alt='Logo ADL' className='h-16 mr-20' />
        </div>
      </footer>
    </Link>
  );
};

export default Footer;
