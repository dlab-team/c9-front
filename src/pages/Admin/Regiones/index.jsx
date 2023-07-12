import axios from 'axios';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import Breadcrumb from '../../../components/Breadcrumb/Breadcrumb';
import RegionesList from '../../../components/Regiones/regionesList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faMapLocationDot
} from '@fortawesome/free-solid-svg-icons';

const getRegionesServices = async () => {
    const endpoint = `${process.env.REACT_APP_BACKEND_URL}/region`;
    try {
        const response = await axios.get(endpoint);
        const regiones = response.data;
        return regiones;  
    } catch (error) {
        console.error(error);
    }
};

const adminRegiones = () => {
    const [regiones, setRegiones] = useState([]);

    useEffect(() => {
        getRegionesServices().then((regiones) =>
            setRegiones(regiones),
        );
    }, []);

    const updateRegiones = (newRegiones) =>
        setRegiones(newRegiones);

    const totalRegiones = regiones?.length || 0;


    return (
        <>
        <ToastContainer />
        <div className="container mx-auto">
            <h1 className="my-3 breadcrumb-title">
            <FontAwesomeIcon 
                icon={faMapLocationDot} 
                size='lg'
                className='mr-3 text-primary'
            />
                Listado de regiones ({totalRegiones})
            </h1>
            <Breadcrumb />
            <RegionesList
            regiones={regiones}
            updateRegiones={updateRegiones}
            />
        </div>
        </>
    );
};

export default adminRegiones;
