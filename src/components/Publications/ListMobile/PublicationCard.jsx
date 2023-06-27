import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheck,
  faDotCircle,
  faMagnifyingGlass,
  faPenToSquare
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const PublicationCard = ({ publication, onSelect }) => {
  return (
    <div className="w-full h-fit flex flex-col gap-2 bg-zinc-200 rounded-lg py-2 px-4">
      <div className="flex justify-between gap-4">
        <span className="text-neutral-800 text-[14px] font-semibold leading-normal">
          {publication.name}
        </span>
        <div className="flex flex-col gap-2 ">
          <span className="text-neutral-800 min-w-fit text-[12px] self-end font-normal leading-normal">
            {publication.publicationDate}
          </span>
          <div className="self-end flex gap-2">
            <Link
              to={`/noticias/${publication.slug}`}
              className="flex items-center"
              target="_blank"
            >
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className="h-5 self-center text-gray-700 cursor-pointer"
              />
            </Link>
            <Link
              to={`/admin/publications/edit/${publication.slug}`}
              className="flex items-center self-end"
            >
              <FontAwesomeIcon
                icon={faPenToSquare}
                className="h-6 text-gray-700 cursor-pointer items-center"
              />
            </Link>
            <input
              type="checkbox"
              className="h-5 w-5 bg-red-200 self-end"
              onChange={(event) => onSelect(publication, event.target.checked)}
            />
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-neutral-800 text-[14px] font-normal leading-normal">
          {publication.category?.name || 'Sin categoria'}
        </span>
        <div className="flex gap-2 items-center">
          {publication.published ? (
            <div className="h-7 w-7 bg-secondary border-2 border-primary rounded-full flex items-center justify-center">
              <FontAwesomeIcon icon={faCheck} className="text-zinc-300" />
            </div>
          ) : (
            <FontAwesomeIcon
              icon={faDotCircle}
              className="h-6 text-yellow border-2  border-primary rounded-full"
            />
          )}
          <span className="text-neutral-800 text-[12px] font-normal leading-normal">
            {publication.published ? 'Publicado' : 'Sin publicar'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PublicationCard;
