import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-400 shadow">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <img className="h-8 w-auto" src="https://via.placeholder.com/150" alt="Logo" />
          <p className="py-2 text-gray-500 sm:py-0">Todos los derechos reservados</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
