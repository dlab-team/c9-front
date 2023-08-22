import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useMediaQuery } from 'react-responsive';
import { useNavigate } from 'react-router-dom';
import { faStar } from '@fortawesome/free-solid-svg-icons';

export function formatoFecha(fecha) {
  const opciones = { day: '2-digit', month: 'long', year: 'numeric' };
  const fechaFormateada = new Date(fecha).toLocaleDateString('es-ES', opciones);

  const partesFecha = fechaFormateada.split(' de ');
  const dia = partesFecha[0];
  const mesYAnio = partesFecha[1] + ' ' + partesFecha[2];

  return dia + ' ' + mesYAnio;
}

const PublicationCard = ({ publication, className = '' }) => {
  const navigate = useNavigate();
  // Define el ancho máximo para considerar la pantalla como pequeña
  const isSmallScreen = useMediaQuery({ maxWidth: 640 });

  return (
    <div
      className={`cursor-pointer block max-h-100 rounded-2xl overflow-hidden border border-gray-200 mb-5 
      shadow-gray-200 shadow-xl duration-300 hover:shadow-xl hover:shadow-black/40 relative ${className}`}
      key={publication.id}
      onClick={() => navigate(`/noticias/${publication.slug}`)}
    >
      {publication.featured && (
        <div className="absolute right-0 z-[2]">
          <span className="inline-block bg-blue-500 text-white text-xs font-bold py-1 px-2 me-3 rounded-b">
            <FontAwesomeIcon icon={faStar} />
          </span>
        </div>
      )}
      <img
        className={`w-full ${
          isSmallScreen ? 'h-48' : 'max-h-96'
        } object-cover object-center rounded-t-lg transition duration-300 ease-in-out hover:opacity-60`}
        src={
          (publication?.images && publication?.images[0]?.url) ||
          `https://picsum.photos/1200/800?random=${
            Math.floor(Math.random() * 1000) + 1
          }`
        }
        alt={publication.name}
      />
      <div className={`px-4 py-2 text-left`}>
        <h1 className={`text-sm md:text-xl leading-[1.3]`}>
          {publication.name}
        </h1>
        {!isSmallScreen && ( // Condición para mostrar la fecha solo en pantallas grandes
          <p className={`card-date font-thin text-xs py-4`}>
            Creado el {formatoFecha(publication.publicationDate)}
          </p>
        )}
        {!isSmallScreen && ( // Condición para mostrar el contenido solo en pantallas grandes
          <p
            className={`text-[0.85rem] font-thin`}
            dangerouslySetInnerHTML={{
              __html:
                publication.finalContent.split(' ').slice(0, 15).join(' ') +
                '...'
            }}
          ></p>
        )}
      </div>
      <div className={`px-4 py-4`}>
        <p className={`text-xs`}>
          Por @{publication.author.username}, adaptada por 🤖 IA
        </p>
      </div>
    </div>
  );
};

export default PublicationCard;
