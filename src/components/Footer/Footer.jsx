import React from 'react';
import { Link } from 'react-router-dom';
import LogoYellow from '../../assets/images/logo_innova_yellow.png';
import LogoMercurio from '../../assets/images/innovacion_blanco.png';
import LogoMicrosoft from '../../assets/images/microsoft_blanco.png';
import LogoAdl from '../../assets/images/desafio_blanco.png';
import LogoKodea from '../../assets/images/kodea_blanco.png';

const Footer = () => {
  return (
    <footer className='px-4 lg:text-left py-8 bg-secondary mt-6'>
      <div className='container gap-2 mx-auto flex flex-col md:flex-row md:justify-between'>
        <div className='flex justify-center md:justify-start'>
          <Link to='/' className=''>
            <img
              src={LogoYellow}
              alt='LogoYellow'
              className='h-16 md:h-20 rounded-lg'
            />
          </Link>
        </div>
        <div className='flex md:w-[50%] justify-end place-items-center place-self-center gap-2 md:gap-2'>
          <Link
            to='https://www.instagram.com/innovacion_elmercurio/?hl=es'
            target='_blank'
          >
            <img
              src={LogoMercurio}
              alt='Logo Innovacion'
              className='w-18 md:w-36'
            />
          </Link>
          <Link
            to='https://www.linkedin.com/company/microsoft/'
            target='_blank'
          >
            <img
              src={LogoMicrosoft}
              alt='Logo Microsoft'
              className='w-18 md:w-40'
            />
          </Link>
          <Link to='https://desafiolatam.com' target='blank'>
            <img src={LogoAdl} alt='Logo ADL' className='w-18 md:w-28' />
          </Link>
          <Link to='https://kodea.org' target='_blank'>
            <img src={LogoKodea} alt='Logo de Kodea' className='w-18 md:w-24' />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
