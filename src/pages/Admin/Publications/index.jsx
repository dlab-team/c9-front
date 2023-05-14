import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PublicationsTable from '../../../components/Publications/list';
import Breadcrumb from '../../../components/Breadcrumb/Breadcrumb';

const AdminPublications = () => {
  const publications = [];

  return (
    <>
      <div className="container py-5">
        <h1 className="text-2xl mb-10 font-bold">Listado de noticias</h1>
        <Breadcrumb />
        <PublicationsTable publications={publications} />
      </div>
    </>
  );
};

export default AdminPublications;
