import { faPenToSquare, faTrashCan } from '@fortawesome/free-regular-svg-icons';
import {
  faAngleLeft,
  faAngleRight,
  faArrowUpFromBracket,
  faCirclePlus,
  faMagnifyingGlass,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import { ButtonBase, ButtonConfirmationModal } from '../UI';

const TABLE_HEAD = ['', 'Fecha', 'Titulo', 'Categoria', 'Estado', 'Opciones'];

const PublicationsTable = ({ publications }) => {
  const [itemsSelected, setItemsSelected] = useState([]);

  function onClickSelect(event, selectedItemId) {
    if (event.target.checked) {
      return setItemsSelected([...itemsSelected, selectedItemId]);
    } else {
      return setItemsSelected(
        itemsSelected.filter((itemId) => itemId !== selectedItemId)
      );
    }
  }

  const hasSelectedPublications = itemsSelected.length > 0;

  return (
    <>
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

        <div className="overflow-x-auto border border-gray-800 rounded h-full">
          <table className="w-full min-w-max table-auto text-left text-base">
            <thead>
              <tr className="border-b border-gray-800">
                {TABLE_HEAD.map((head, index) => (
                  <th key={`thead-${index}`} className="py-4 px-2 leading-none">
                    {head}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {publications.map((publication, index) => {
                const isSelected = itemsSelected.includes(publication.id);
                const classes = isSelected
                  ? 'bg-blue-300 py-3 px-3'
                  : 'py-3 px-3';
                const isLastPublication = index === publications.length - 1;

                return (
                  <tr
                    key={`publication-${publication.id}`}
                    className={`border-b border-gray-200 ${
                      isLastPublication ? 'border-gray-500' : ''
                    }`}
                  >
                    <td className={`${classes} pl-8 pr-1`}>
                      <input
                        type="checkbox"
                        className="rounded-md h-6 w-6 flex items-center"
                        onChange={(event) => {
                          onClickSelect(event, publication.id);
                        }}
                      />
                    </td>
                    <td className={classes}>{publication.publicationDate}</td>
                    <td className={classes}>{publication.name}</td>
                    <td className={classes}>{publication.category}</td>
                    <td className={classes}>
                      <span
                        className={`${
                          publication.isPublished
                            ? 'bg-blue-500 text-white'
                            : 'bg-yellow-200'
                        } rounded py-2 px-4 text-center `}
                      >
                        {publication.isPublished ? 'Publicada' : 'Sin Publicar'}
                      </span>
                    </td>
                    <td className={`${classes}`}>
                      <div className="flex gap-4 items-center">
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
                          className="flex items-center"
                        >
                          <FontAwesomeIcon
                            icon={faPenToSquare}
                            className="h-5 text-gray-700 cursor-pointer "
                          />
                        </Link>
                        <ButtonConfirmationModal
                          title={'Eliminar publicación'}
                          bodyText={
                            '¿Está seguro que desea eliminar esta publicación?'
                          }
                          actionNameConfirm={'Eliminar'}
                          actionFunctionConfirm={() => {
                            console.log('Eliminado');
                          }}
                          actionButtonClassName={'bg-red-500 hover:bg-red-700'}
                          OpenButton={
                            <FontAwesomeIcon
                              icon={faTrashCan}
                              className="h-5 text-red-500 cursor-pointer"
                            />
                          }
                        />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="flex justify-end gap-6 px-4 py-2 items-center">
            <span className="font-normal text-base">
              Pagina 1 de {publications.length / 10}
            </span>
            <div className="flex gap-6 text-gray-500 mr-4">
              <FontAwesomeIcon
                icon={faAngleLeft}
                className="h-6 self-center cursor-pointer"
              />
              <FontAwesomeIcon
                icon={faAngleRight}
                className="h-6 self-center cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PublicationsTable;
