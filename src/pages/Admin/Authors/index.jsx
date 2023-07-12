import axios from 'axios';
import { useEffect, useState } from 'react';
import Breadcrumb from '../../../components/Breadcrumb/Breadcrumb';
import { ToastContainer, toast } from 'react-toastify';
import AuthorList from '../../../components/Autores/AuthorsList';
import AuthorForm from '../../../components/Autores/Form/Form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faAt} from '@fortawesome/free-solid-svg-icons';


const getAutoresServices = async () => {
    const endpoint = `${process.env.REACT_APP_BACKEND_URL}/author`;
    try {
        const response = await axios.get(endpoint);
        const autores = response.data;
        return autores;  
    } catch (error) {
        console.error(error);
        return [];
    }
};

const Authors = () => {
    const [autores, setAutores] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const authors = await getAutoresServices();
            setAutores(authors);
        };
    
            fetchData();
    }, []);

    const updateAutores = (newAutores) =>
        setAutores(newAutores);

    const totalAutores = autores.length;

    return (
        <>
        <ToastContainer />
        <div className="container mx-auto">
            <h1 className="my-3 breadcrumb-title">
            <FontAwesomeIcon 
                icon={faAt} 
                size='lg'
                className='mr-3 text-primary'
            />
                Listado de Autores ({totalAutores})
            </h1>
            <Breadcrumb />
            <AuthorList
                autores={autores}
                updateAutores={updateAutores}
            />
        </div>
        </>
    );
}
export default Authors;