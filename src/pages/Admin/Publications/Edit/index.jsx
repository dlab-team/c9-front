import { useParams } from 'react-router-dom';
import Breadcrumb from '../../../../components/Breadcrumb/Breadcrumb';
import { useEffect, useState } from 'react';
import axios from 'axios';

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
    <>
      <div className="container mx-auto">
        <h1 className="">
          Editar <b>{publication?.name}</b>
        </h1>
        <Breadcrumb param={slug} />
        <div>contenido</div>
      </div>
    </>
  );
};

export default EditOne;
