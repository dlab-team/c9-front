import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PublicationsTable from '../../../components/PublicationsTable/PublicationsTable';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';

const AdminPublications = () => {
  const publications = [
    {
      id: 1,
      name: 'Titulo de noticia',
      category: 'Sin categoria',
      isPublished: true,
      publicationDate: '23/04/18'
    },
    {
      id: 2,
      name: 'Titulo de noticia',
      category: 'Sin categoria',
      isPublished: false,
      publicationDate: '23/04/18'
    },
    {
      id: 3,
      name: 'Titulo de noticia',
      category: 'Sin categoria',
      isPublished: true,
      publicationDate: '23/04/18'
    },
    {
      id: 4,
      name: 'Titulo de noticia',
      category: 'Sin categoria',
      isPublished: true,
      publicationDate: '23/04/18'
    },
    {
      id: 5,
      name: 'Titulo de noticia',
      category: 'Sin categoria',
      isPublished: true,
      publicationDate: '23/04/18'
    },
    {
      id: 6,
      name: 'Titulo de noticia',
      category: 'Sin categoria',
      isPublished: false,
      publicationDate: '04/10/21'
    }
  ];

  return (
    <>
      <div className="container py-5">
        <div className="flex justify-between">
          <h1 className="text-2xl mb-10 font-bold">Listado de noticias</h1>
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
