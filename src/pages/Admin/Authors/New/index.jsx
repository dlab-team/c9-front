import React from 'react';
import Form from './../../../../components/Autores/Form/Form'
import Breadcrumb from '../../../../components/Breadcrumb/Breadcrumb';

const AdminAuthorNew = () => {
    return (
        <div>
        <main>
            <div className="container mx-auto">
            <h1 className="my-3 breadcrumb-title">Nuevo</h1>
            <Breadcrumb />
            <Form />
            </div>
        </main>
        </div>
    );
};

export default AdminAuthorNew;