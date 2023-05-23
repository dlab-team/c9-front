import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import {
  faArrowUpFromBracket,
  faCirclePlus
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ButtonBase } from '../UI';
import ListDesktop from './ListDesktop';


const PublicationsTable = ({ publications, updatePublications }) => {
  const [itemsSelected, setItemsSelected] = useState([]);
  const navigate = useNavigate();

  const hasSelectedPublications = itemsSelected.length > 0;

  const handleSelectedItems = itemsSelected => {
    setItemsSelected(itemsSelected);
  };
  
  const handleDeletePublication = (publicationSlug) => {
    axios
      .delete(
        `${process.env.REACT_APP_BACKEND_URL}/publications/${publicationSlug}`
      )
      .then((response) => {
        toast('Publicación eliminada correctamente', {
          type: 'success',
          autoClose: 3000,
          onClose: () => {
            const newPublicationsState = publications.filter(
              publication => publication.slug !== publicationSlug
            );
            updatePublications(newPublicationsState);
          }
        });
      })
      .catch((error) => {
        toast('Error al eliminar la publicación', {
          type: 'error',
          autoClose: 3000,
        });
      });
  };

  return (
    <>
      <ToastContainer />
      <div className="mt-2 w-full">
        <div className="flex justify-end mb-4">
          <div
            className={`${!hasSelectedPublications ? 'hidden' : ''} 
        flex flex-col gap-2 mx-4 md:gap-4 md:flex-row w-full`}
          >
            <div className="flex md:flex-row gap-2 md:gap-4">
              <ButtonBase className={'bg-blue-900 text-white'}>
                <FontAwesomeIcon icon={faArrowUpFromBracket} />
                Publicar
              </ButtonBase>
              <ButtonBase className={'bg-orange-500'}>
                <FontAwesomeIcon
                  icon={faArrowUpFromBracket}
                  className="rotate-180"
                />
                Despublicar
              </ButtonBase>
            </div>
            <ButtonBase className={'border border-black'}>
              <FontAwesomeIcon icon={faTrashCan} />
              Eliminar
            </ButtonBase>
          </div>

          <Link to="/admin/publications/new">
            <button className="flex gap-4 rounded bg-blue-600 text-white items-center max-w-fit h-10 px-4">
              <div className="grid place-content-center bg-white rounded-full w-5 h-5">
                <FontAwesomeIcon
                  icon={faCirclePlus}
                  className="h-7 text-blue-900"
                />
              </div>
              Agregar
            </button>
          </Link>
        </div>

        <ListDesktop
          publications={publications}
          onSelectedRowsChange={handleSelectedItems}
          handleDeletePublication={handleDeletePublication}
        />
      </div>
    </>
  );
};

export default PublicationsTable;