import React from 'react';
import Header from './../../../components/Header/Header';
import Form from './../../../components/Publications/Form/Form';
import Breadcrumb from '../../../components/Breadcrumb/Breadcrumb';

const AdminPublicationsNew = () => {
  return (
    <div>
      <main>
        <div className="container mx-auto">
          <h1 className="my-3 breadcrumb-title">Nueva</h1>
          <Breadcrumb />
          <Form />
        </div>
      </main>
    </div>
  );
};

export default AdminPublicationsNew;

