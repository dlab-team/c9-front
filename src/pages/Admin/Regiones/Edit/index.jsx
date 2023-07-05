import { useParams } from 'react-router-dom';
import Breadcrumb from '../../../../components/Breadcrumb/Breadcrumb';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Form from '../../../../components/Regiones/Form/Form';

const EditRegion = () => {
    const { id } = useParams();
    const endpoint = `${process.env.REACT_APP_BACKEND_URL}/regions/${id}`;
    console.log(endpoint)
    const [region, setRegion] = useState();

    const getRegionData = async () => {
        try {
        const response = await axios.get(endpoint);
        const { region } = response.data;

        setRegion(region);
        } catch (error) {
        console.error(error);
        }
    };

    useEffect(() => {
        getRegionData();
    }, []);

    return (
        <div>
        <main>
            <div className="container mx-auto">
            <h1 className="my-3">Editar</h1>
            <Breadcrumb param={id} />
            {region ? (
                <Form region={region} />
            ) : (
                <span>Cargando...</span>
            )}
            </div>
        </main>
        </div>
    );
};

export default EditRegion;
