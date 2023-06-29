import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { faArrowUpFromBracket, faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ButtonBase, ButtonConfirmationModal, Spinner } from '../UI';
import ListDesktop from './ListDesktop';
import { AuthContext } from '../../context/AuthContext/AuthContext';
import ListMobile from './ListMobile';

const PublicationsTable = ({ publications, updatePublications }) => {
  const { currentUser } = useContext(AuthContext);
  const [itemsSelected, setItemsSelected] = useState([]);
  const [clearSelectionInDesktopList, setClearSelectionInDesktopList] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const hasSelectedPublications = itemsSelected.length > 0;

  const handleSelectedItems = itemsSelected => {
    setItemsSelected(itemsSelected);
  };

  const handleDeletePublication = publicationSlug => {
    setIsLoading(true);
    axios
      .delete(`${process.env.REACT_APP_BACKEND_URL}/publications/${publicationSlug}`, {
        headers: { Authorization: `Bearer ${currentUser.token}` }
      })
      .then(response => {
        setIsLoading(false);
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
      .catch(error => {
        setIsLoading(false);
        toast('Error al eliminar la publicación', {
          type: 'error',
          autoClose: 3000
        });
      });
  };

  const clearSelectedItems = () => {
    setClearSelectionInDesktopList(!clearSelectionInDesktopList);
    setItemsSelected([]);
  };

  const handlePublishOrUnpublish = isPublished => {
    setIsLoading(true);
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
        setIsLoading(false);
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
          autoClose: 3000
        });
      })
      .catch(error => {
        setIsLoading(false);
        toast('Error al actualizar las publicaciones', {
          type: 'error',
          autoClose: 3000
        });
      });
  };

  const handleBulkDelete = async () => {
    setIsLoading(true);
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
    setIsLoading(false);

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
    <div className="">
      <ToastContainer />

      {isLoading && (
        <div className="flex w-full h-full justify-center opacity-100 top-11 absolute  z-10">
          <Spinner />
        </div>
      )}
      <div className={`relative mt-2 w-full ${isLoading ? 'opacity-50' : ''} `}>
        <div className="flex mb-4 max-md:justify-center md:justify-end ">
          <div
            className={`${!hasSelectedPublications ? 'hidden' : ''} 
            max-md:fixed flex-wrap max-md:bg-white max-md:bottom-0 max-md:h-16 
            max-md:items-center max-md:justify-center gap-2 flex md:gap-4 md:flex-row w-full`}
          >
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
          <Link to="/admin/publications/new" className='h-10 bottom-16 mb-4 text-primary md:hidden fixed right-2'>
            <button className="flex gap-4 rounded items-center max-w-fit h-10 px-4">
              <div className="grid place-content-center bg-white rounded-full w-5 h-5">
                <FontAwesomeIcon icon={faCirclePlus} className="h-10 text-primary" />
              </div>
            </button>
          </Link>
          <Link to="/admin/publications/new" className='max-md:hidden'>
            <button className="flex gap-4 rounded bg-secondary text-white items-center max-w-fit h-10 px-4">
              <div className="grid place-content-center bg-white rounded-full w-5 h-5">
                <FontAwesomeIcon icon={faCirclePlus} className="h-7 text-primary" />
              </div>
              Agregar
            </button>
          </Link>
        </div>
        <div className='hidden lg:block'>
          <ListDesktop
            publications={publications}
            onSelectedRowsChange={handleSelectedItems}
            handleDeletePublication={handleDeletePublication}
            clearSelectedRows={clearSelectionInDesktopList}
          />
        </div>
        <div className='lg:hidden'>
          <ListMobile publications={publications} setSelectedItems={setItemsSelected} clearSelection={clearSelectionInDesktopList} />
        </div>
      </div>
    </div>
  );
};

export default PublicationsTable;
