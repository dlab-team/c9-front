import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import {
  faArrowUpFromBracket,
  faCirclePlus,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ButtonBase, ButtonConfirmationModal } from '../UI';
import ListDesktop from './ListDesktop';
import { AuthContext } from '../../context/AuthContext/AuthContext';

const PublicationsTable = ({ publications, updatePublications }) => {
  const { currentUser } = useContext(AuthContext);
  const [itemsSelected, setItemsSelected] = useState([]);
  const [clearSelectionInDesktopList, setClearSelectionInDesktopList] = useState(true);

  const hasSelectedPublications = itemsSelected.length > 0;

  const handleSelectedItems = itemsSelected => {
    setItemsSelected(itemsSelected);
  };

  const handleDeletePublication = publicationSlug => {
    axios
      .delete(`${process.env.REACT_APP_BACKEND_URL}/publications/${publicationSlug}`, {
        headers: { Authorization: `Bearer ${currentUser.token}` }
      })
      .then(response => {
        toast('Publicación eliminada correctamente', {
          type: 'success',
          autoClose: 3000,
          onClose: () => {
            const newPublicationsState = publications.filter(
              (publication) => publication.slug !== publicationSlug
            );
            updatePublications(newPublicationsState);
          },
        });
      })
      .catch((error) => {
        toast('Error al eliminar la publicación', {
          type: 'error',
          autoClose: 3000,
        });
      });
  };

  const clearSelectedItems = () => {
    setClearSelectionInDesktopList(!clearSelectionInDesktopList);
    setItemsSelected([]);
  };

  const handlePublishOrUnpublish = isPublished => {
    const publicationsIdsToUpdate = itemsSelected.map(publication => {
      return publication.id;
    });
    axios
      .put(
        `${process.env.REACT_APP_BACKEND_URL}/publications/published`,
        {
          publicationsIdsToUpdate,
          isPublished
        },
        { headers: { Authorization: `Bearer ${currentUser.token}` } }
      )
      .then(response => {
        const newPublicationsState = publications.map(publication => {
          if (publicationsIdsToUpdate.includes(publication.id)) {
            return { ...publication, published: isPublished };
          }
          return publication;
        });
        updatePublications(newPublicationsState);
        clearSelectedItems();
        toast('Publicaciones actualizadas correctamente', {
          type: 'success',
          autoClose: 3000,
        });
      })
      .catch(error => {
        toast('Error al actualizar las publicaciones', {
          type: 'error',
          autoClose: 3000
        });
      });
  };

  const handleBulkDelete = async () => {
    const undeletedPublicationsIds = [];
    const deletedPublicationsIds = [];

    const requests = itemsSelected.map(publication => {
      return axios
        .delete(`${process.env.REACT_APP_BACKEND_URL}/publications/${publication.slug}`, {
          headers: { Authorization: `Bearer ${currentUser.token}` }
        })
        .then(response => {
          deletedPublicationsIds.push(publication.id);
        })
        .catch(error => {
          undeletedPublicationsIds.push(publication);
        });
    });
    await Promise.all(requests);

    const newPublicationsState = publications.filter(
      publication => !deletedPublicationsIds.includes(publication.id)
    );
    updatePublications(newPublicationsState);
    clearSelectedItems();

    if (undeletedPublicationsIds.length > 0) {
      return toast('Algunas publicaciones no se lograron eliminar', {
        type: 'warning',
        autoClose: 3000
      });
    }

    return toast('Publicaciones eliminadas correctamente', {
      type: 'success',
      autoClose: 3000
    });
  };

  return (
    <>
      <ToastContainer />
      <div className='mt-2 w-full'>
        <div className='flex justify-end mb-4'>
          <div
            className={`${!hasSelectedPublications ? 'hidden' : ''} 
        flex flex-col gap-2 mx-4 md:gap-4 md:flex-row w-full`}
          >
            <div className='flex md:flex-row gap-2 md:gap-4'>
              <ButtonBase
                className={'bg-primary text-white'}
                onClick={() => handlePublishOrUnpublish(true)}
              >
                <FontAwesomeIcon icon={faArrowUpFromBracket} />
                Publicar
              </ButtonBase>
              <ButtonBase
                className={'bg-orange-button'}
                onClick={() => handlePublishOrUnpublish(false)}
              >
                <FontAwesomeIcon icon={faArrowUpFromBracket} className="rotate-180" />
                Despublicar
              </ButtonBase>
            </div>
            <ButtonConfirmationModal
              title={'Eliminar publicaciones seleccionadas'}
              bodyText={'¿Está seguro que desea eliminar las publicaciones seleccionadas?'}
              actionNameConfirm={'Eliminar'}
              actionFunctionConfirm={() => {
                handleBulkDelete()
              }}
              actionButtonClassName={'bg-red-500 hover:bg-red-700'}
              OpenButton={
                <ButtonBase className={'border border-black'}>
                  <FontAwesomeIcon icon={faTrashCan} />
                  Eliminar
                </ButtonBase>
              }
            />
          </div>

          <Link to="/admin/publications/new">
            <button className="flex gap-4 rounded bg-secondary text-white items-center max-w-fit h-10 px-4">
              <div className="grid place-content-center bg-white rounded-full w-5 h-5">
                <FontAwesomeIcon icon={faCirclePlus} className="h-7 text-primary" />
              </div>
              Agregar
            </button>
          </Link>
        </div>

        <ListDesktop
          publications={publications}
          onSelectedRowsChange={handleSelectedItems}
          handleDeletePublication={handleDeletePublication}
          clearSelectedRows={clearSelectionInDesktopList}
        />
      </div>
    </>
  );
};

export default PublicationsTable;
