import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext/AuthContext';
import logoBlue from '../../assets/images/logo_innova_blue.png';
import waves from '../../assets/images/wave-blue.png';
import googleIcon from '../../assets/images/google-icon.png';
import fondo from '../../assets/images/innovafondoazul.jpg';
import logoInnovacion from '../../assets/images/innovacion.png';
import nombreMercurio from '../../assets/images/nombre-mercurio.png';
import logoMicrosoft from '../../assets/images/microsoft_logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';


// Initialization for ES Users
import {
  Input,
  initTE,
} from "tw-elements";

initTE({ Input });


const Admin = () => {
  const { setCurrentUser } = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [contrasena, setContrasena] = useState('');

  // código preliminar
  const handleRegistrarme = (e) => {
    e.preventDefault()

    console.log('Email:', email);
    console.log('Contraseña:', contrasena);

    //Aqui va lógica para registrar al administrador
  };

  return (
    <div className="flex h-screen">
      <div className="hidden lg:flex lg:w-1/2 items-stretch justify-center">
        <img
            className="waves h-full w-full relative"
            style={{ backgroundImage: `url(${fondo})`}}
            src={waves}
            alt='background-waves'
          />
        <div className="h-full flex items-center pl-0 absolute">
        <img
            className='w-64 h-auto'
            src={logoBlue}
            alt='Una imagen del Logo de Innova'
          />
        </div>
      </div>
      <div className="mx-auto lg:w-1/2 lg:p-12">
        <div className="flex flex-col justify-center h-full md:shrink-0"> 
          <div>
            <h2 className="text-4xl md:text-5xl lg:text-4xl mt-8 font-bold text-center text-[#00235C] font-['Caveat_Brush'] leading-3 tracking-widest font-normal uppercase">Bienvenido!</h2>
            <form className="mt-24 mx-12 md:mx-auto lg:mx-28 lg:mt-20">
              
              <div className="relative mb-6" data-te-input-wrapper-init>
                <input
                  type="email"
                  className="peer block min-h-[auto] w-full rounded-md border-0 bg-gray-200 px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                  id="inputEmail"
                  aria-describedby="email"
                  placeholder="Email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label
                  htmlFor="inputEmail"
                  className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none"
                  >Email
                </label>
              </div>      
              <div className="relative mb-6" data-te-input-wrapper-init>
                <input
                  type="password"
                  className="peer block min-h-[auto] w-full rounded border-0 bg-gray-200 px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                  id="passwordInput"
                  placeholder="Contraseña"
                  value={contrasena}
                  onChange={(e) => setContrasena(e.target.value)}
                />
                <label
                  htmlFor="passwordInput"
                  className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-neutral-200"
                  >Contraseña
                </label>
              </div>
              <button
                onClick={handleRegistrarme}
                type="submit"
                className="inline-block w-full rounded-md bg-[#116CEF] hover:bg-[#FFE600] hover:text-[#00235C] px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out"
              >
                Ingresa
              </button>
              
              <section className='iniciaSesionCon text-center mb-16 md:m-20 lg:m-16 nowrap'>
                <p
                  className="text-2xl md:text-3xl lg:text-2xl mt-10 font-normal text-[#00235C] font-['Caveat'] italic leading-4 tracking-wide"
                >
                  Inicia sesión con
                </p>
                <div className='flex gap-8 lg:gap-6 mt-6 justify-center'>
                  <img 
                    src={googleIcon}
                    className='w-6 h-6 md:w-9 md:h-9 lg:w-6 lg:h-6'
                    alt="google-icon" 
                  />
                  <FontAwesomeIcon 
                    icon={faLinkedin} 
                    className='w-6 h-6 md:w-9 md:h-9 lg:w-6 lg:h-6'
                    style={{color: "#3b68b5"}} 
                  />
                  <FontAwesomeIcon 
                    icon={faFacebook}
                    className='w-6 h-7 md:w-9 md:h-9 lg:w-6 lg:h-6'
                    style={{color: "#3e74d0",}} 
                  />
                </div>
              </section>
            </form>
          </div>
          <section className='logos flex justify-between items-center md:shrink-0 mx-14 md:mx-12 lg:mx-28'>
            <img 
              className='h-6 w-26'
              src={logoMicrosoft} 
              alt="logo-microsoft" 
            />
            <div className="flex items-center nowrap">
              <img className="h-10 w-18 md:h-12 md:w-20 lg:h-10 lg:w-18 " src={logoInnovacion} alt="" />
              <img className="h-6 w-24 lg:w-32" src={nombreMercurio} alt="" />
            </div>
          </section>
        </div>
      </div>
    </div>
    
  );
};

export default Admin;






