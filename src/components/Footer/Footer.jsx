import React from 'react';
import { Link } from 'react-router-dom';
import LogoYellow from '../../assets/images/logo_innova_yellow.png';

const Footer = () => {
  return (
    <footer className='flex justify-center text-center lg:text-left mt-8 bg-secondary'>
      <div className='p-4 text-center'>
        <Link to='./'>
          <img src={LogoYellow} alt='Logo InnovaXD'></img>
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
