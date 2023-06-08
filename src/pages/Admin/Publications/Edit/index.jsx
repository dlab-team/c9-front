import { useParams } from 'react-router-dom';
import Breadcrumb from '../../../../components/Breadcrumb/Breadcrumb';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Form from './../../../../components/Publications/Form/Form';

const EditOne = () => {
  const { slug } = useParams();
  const endpoint = `${process.env.REACT_APP_BACKEND_URL}/publications/${slug}`;
  const [publication, setPublication] = useState();

  const getPublicationData = async () => {
    try {
      const response = await axios.get(endpoint);
      const { publication } = response.data;

      setPublication(publication);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getPublicationData();
  }, []);

  return (
    <div>
      <main>
        <div className="container mx-auto">
          <h1 className="my-3">Editar</h1>
          <Breadcrumb param={slug} />
          {publication ? (
            <Form publication={publication} />
          ) : (
            <span>Cargando...</span>
          )}
        </div>
      </main>
    </div>
  );
};

export default EditOne;
