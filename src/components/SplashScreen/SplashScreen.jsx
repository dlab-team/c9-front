import React, { useEffect, useState } from 'react';
import logoInnova from '../../assets/images/logo_innova_yellow.png';


const SplashScreen = ({ onComplete }) => {
    const [showLogo, setShowLogo] = useState(true);

    useEffect(() => {
        // Ocultar el logo después de 1.5 segundos
        const timer = setTimeout(() => {
        setShowLogo(false);
        onComplete(); // Llamada a la función onComplete cuando termine la animación
        }, 2000);

        // Limpiar el timer cuando el componente se desmonte
        return () => clearTimeout(timer);
    }, [onComplete]);

    return (
        <div className={`fixed top-0 left-0 w-full h-full bg-blue-500 flex items-center justify-center z-50 ${showLogo ? 'animate-slideUp' : 'hidden'}`}>
        {showLogo && (
            <img
            src={logoInnova}
            alt="Logo de la app"
            className="animate-bounce w-52 h-auto lg:w-72 "
            />
        )}
        </div>
    );
};

export default SplashScreen;
