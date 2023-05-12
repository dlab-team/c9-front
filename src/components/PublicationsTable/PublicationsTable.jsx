import { faPenToSquare, faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { faArrowUpFromBracket, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { ButtonBase } from '../UI';

const TABLE_HEAD = ['', 'Fecha', 'Titulo', 'Categoria', 'Estado', ''];

const PublicationsTable = ({ publications }) => {
  const [itemsSelected, setItemsSelected] = useState([]);

  function onClickSelect(event, selectedItemId) {
    if (event.target.checked) {
      return setItemsSelected([...itemsSelected, selectedItemId]);
    } else {
      return setItemsSelected(itemsSelected.filter(itemId => itemId !== selectedItemId));
    }
  }

  return (
    <>
      <div className="overflow-x-auto border border-solid border-gray-800 rounded-3xl h-full w-full pb-8">
        <table className="w-full min-w-max table-auto text-left md:text-lg">
          <thead className="md:text-2xl">
            <tr className="border-b border-solid border-gray-800">
              {TABLE_HEAD.map((head, index) => (
                <th key={`thead-${index}`} className="py-5 px-2">
                  <p className="font-normal leading-none opacity-70 ">{head}</p>
                </th>
              ))}
            </tr>
            <tr>
              <th colSpan={6}>
                <div className="flex flex-col gap-2 my-4 mx-4 md:my-8 md:gap-8 md:flex-row md:mx-20">
                  <div className="flex md:flex-row gap-2 md:gap-8 ">
                    <ButtonBase className={'bg-blue-900 text-white'}>
                      <FontAwesomeIcon icon={faArrowUpFromBracket} />
                      Publicar
                    </ButtonBase>
                    <ButtonBase className={'bg-orange-500'}>
                      <FontAwesomeIcon icon={faArrowUpFromBracket} className="rotate-180" />
                      Despublicar
                    </ButtonBase>
                  </div>
                  <ButtonBase className={'border border-black'}>
                    <FontAwesomeIcon icon={faTrashCan} />
                    Eliminar
                  </ButtonBase>
                </div>
              </th>
            </tr>
          </thead>

          <tbody>
            {publications.map((publication, index) => {
              const isSelected = itemsSelected.includes(publication.id);
              const classes = isSelected ? 'bg-blue-300 py-3 px-4' : 'py-3 px-4';

              return (
                <tr key={`publication-${publication.id}`} className="border-b border-blue-gray-50">
                  <td className={` md:pl-12 md:pr-0 ${classes}`}>
                    <input
                      type="checkbox"
                      className="rounded-md h-6 w-6 flex items-center"
                      onChange={event => {
                        onClickSelect(event, publication.id);
                      }}
                    />
                  </td>
                  <td className={classes}>
                    <p>{publication.publicationDate}</p>
                  </td>
                  <td className={classes}>
                    <p>{publication.name}</p>
                  </td>
                  <td className={classes}>
                    <p>{publication.category}</p>
                  </td>
                  <td className={classes}>
                    <p
                      className={`${
                        publication.isPublished ? 'bg-blue-500 text-white' : 'bg-yellow-200'
                      } rounded-2xl py-2 text-center text-lg w-32`}
                    >
                      {publication.isPublished ? 'Publicada' : 'Sin Publicar'}
                    </p>
                  </td>
                  <td className={`md:pr-6 ${classes}`}>
                    <div className="flex gap-4 items-center">
                      <FontAwesomeIcon icon={faMagnifyingGlass} className="h-6 font-light text-gray-700" />
                      <FontAwesomeIcon icon={faPenToSquare} className="h-7 text-gray-700" />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default PublicationsTable;
