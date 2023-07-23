import React, { useEffect, useState } from 'react';
import logoInnova from '../../assets/images/logo_innova_yellow.png';


const SplashScreen = () => {
    const [showLogo, setShowLogo] = useState(true);

    useEffect(() => {
        // Ocultar el logo después de 1.5 segundos
        const timer = setTimeout(() => {
        setShowLogo(false);
        }, 2000);

        // Limpiar el timer cuando el componente se desmonte
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className={`flex items-center justify-center h-screen bg-blue-500 ${showLogo ? 'animate-slideUp' : ''}`}>
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
