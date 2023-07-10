import React from 'react';
import AuthorForm from '../../../../components/Autores/Form/Form'
import { useParams } from 'react-router-dom';
import Breadcrumb from '../../../../components/Breadcrumb/Breadcrumb'
import { useEffect, useState } from 'react';
import axios from 'axios';



const AdminAuthorEdit = () => {
    const { id } = useParams();
    const endpoint = `${process.env.REACT_APP_BACKEND_URL}/regions/${id}`;
    const [autor, setAutor] = useState();

    const getAuthorData = async () => {
        try {
        const response = await axios.get(endpoint);
        const autor= response.data;

        setAutor(autor);
        } catch (error) {
        console.error(error);
        }
    };

    useEffect(() => {
        getAuthorData();
    }, []);

    return (
        <div>
        <main>
            <div className="container mx-auto">
            <h1 className="my-3">Editar</h1>
            <Breadcrumb param={id} />
            {autor ? (
                <AuthorForm autor={autor} />
            ) : (
                <span>Cargando...</span>
            )}
            </div>
        </main>
        </div>
    );
};


export default AdminAuthorEdit
