import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PublicationsTable from '../../../components/Publications/list';
import Breadcrumb from '../../../components/Breadcrumb/Breadcrumb';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import axios from 'axios';

const getPublicationsServices = async () => {
  const endpoint = `${process.env.REACT_APP_BACKEND_URL}/publications`;
  try {
    const response = await axios.get(endpoint);
    const { publications } = response.data;
    return publications;
  } catch (error) {
    console.error(error);
  }
};

const AdminPublications = () => {
  const [publications, setPublications] = useState([]);

  useEffect(() => {
    getPublicationsServices().then(publications => setPublications(publications));
  }, []);

  const totalPublications = publications.length;

  return (
    <>
      <div className="container py-5">
        <div className="flex justify-between">
          <Breadcrumb />
          <h1 className="text-2xl mb-10 font-bold">Listado de noticias ({totalPublications})</h1>
          <button className="flex gap-4 rounded bg-blue-600 text-white items-center max-w-fit h-10 px-4">
            <div className="grid place-content-center bg-white rounded-full w-5 h-5">
              <FontAwesomeIcon icon={faCirclePlus} className="h-7 text-blue-900" />
            </div>
            Agregar
          </button>
        </div>
        <PublicationsTable publications={publications} />
      </div>
    </>
  );
};

export default AdminPublications;
