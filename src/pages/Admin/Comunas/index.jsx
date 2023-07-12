import axios from 'axios';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import Breadcrumb from '../../../components/Breadcrumb/Breadcrumb';
import MunicipalitiesList from '../../../components/Comunas/comunasList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapLocationDot } from '@fortawesome/free-solid-svg-icons';

const getComunasServices = async () => {
  const endpoint = `${process.env.REACT_APP_BACKEND_URL}/regions`;
  try {
    const response = await axios.get(endpoint);
    const comunas = response.data;
    return comunas;
  } catch (error) {
    console.error(error);
  }
};

const adminComunas = () => {
  const [comunas, setComunas] = useState([]);

  useEffect(() => {
    getComunasServices().then((comunas) => setComunas(comunas));
  }, []);

  const updateComunas = (newComunas) => setRegiones(newComunas);

  const totalComunas = comunas?.length || 0;

  return (
    <>
      <ToastContainer />
      <div className="container mx-auto">
        <h1 className="my-3 breadcrumb-title">
          <FontAwesomeIcon
            icon={faMapLocationDot}
            size="lg"
            className="mr-3 text-primary"
          />
          Listado de comunas ({totalComunas})
        </h1>
        <Breadcrumb />
        <MunicipalitiesList comunas={comunas} updateComunas={updateComunas} />
      </div>
    </>
  );
};

export default adminComunas;
