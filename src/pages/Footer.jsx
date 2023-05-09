import React from 'react';
import './main.css'
import LogoYellow from '../assets/images/logo_innova_yellow.png';

const Footer= () => {
  return (
    <footer class="text-center lg:text-left">
      <div class="p-4 text-center">
        <img src={LogoYellow}
          href="https://www.emol.com/" target="_blank" rel="noopener noreferrer" alt="Logo InnovaXD"
          ></img>
      </div>
    </footer>
  );
}

export default Footer;
