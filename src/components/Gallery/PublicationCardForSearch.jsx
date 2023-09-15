import { useNavigate } from 'react-router-dom';
import { formatoFecha } from './PublicationCard';

const PublicationCardForSearch = ({ publication, className = '' }) => {
  const navigate = useNavigate();

  return (
    <div
      key={publication.id}
      className={`bg-gray-100 border p-3 my-3 rounded-lg shadow-lg flex 
        cursor-pointer hover:shadow-xl hover:shadow-black/20 duration-300 ${className}`}
      onClick={() => navigate(`/noticias/${publication.slug}`)}
    >
      <img
        className={`object-cover object-center rounded-lg w-[200px] transition duration-300 ease-in-out hover:opacity-60`}
        src={
          (publication?.images && publication?.images[0]?.url) ||
          `https://picsum.photos/1200/800?random=${
            Math.floor(Math.random() * 1000) + 1
          }`
        }
        alt={publication.name}
      />
      <div className="ms-5">
        <div>{formatoFecha(publication.publicationDate)}</div>
        <h1 className="text-xl font-bold">{publication.name}</h1>
        <div
          className="text-sm"
          dangerouslySetInnerHTML={{
            __html:
              publication.finalContent.split(' ').slice(0, 15).join(' ') + '...'
          }}
        ></div>
      </div>
    </div>
  );
};

export default PublicationCardForSearch;
