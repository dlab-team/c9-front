import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r from-white to-navbar-blue">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4 md:justify-start md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <Link to="/">Home
              <img className="h-8 w-auto sm:h-10" src="../assets/images/logo_innova_blue.png" alt="Logo" />
            </Link>
          </div>
          <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
            <div className="relative w-full max-w-xs">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
                <svg className="h-5 w-5 text-gray-500" viewBox="0 0 24 24" fill="none">
                  <path d="M21 21L15.5 15.5M15.5 15.5C17.1569 13.8431 18 11.5786 18 9.25C18 4.80558 14.1944 1 9.75 1C5.30558 1 1.5 4.80558 1.5 9.25C1.5 13.6944 5.30558 17.5 9.75 17.5C11.5786 17.5 13.3431 16.8431 14.75 15.75L20.25 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <input className="block w-full bg-gray-100 border border-gray-300 rounded-lg py-2 pl-10 pr-3 text-sm placeholder-gray-500 focus:outline-none focus:bg-white focus:border-gray-500 focus:placeholder-gray-400 focus:text-gray-900 sm:text-sm" type="text" placeholder="Buscar" />
            </div>
          </div>
        </div>
      </div>
      <div className="bg-navbar-blue h-8 rounded-xl -mt-4"></div>
    </nav>
  );
};

export default Navbar;

/* const Navbar = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <nav>
      <Link to="/">Home</Link>
    </nav>
  );
};

export default Navbar; */
