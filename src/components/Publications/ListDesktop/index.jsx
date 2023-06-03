import DataTable from 'react-data-table-component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare, faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { ButtonConfirmationModal } from '../../UI';
import { Link } from 'react-router-dom';
import { customStyles } from './customStyles';
import { useMemo } from 'react';

const ListDesktop = ({
  publications,
  handleDeletePublication,
  onSelectedRowsChange,
}) => {
  const columns = useMemo(
    () => [
      {
        name: 'Fecha',
        selector: (row) => row.publicationDate,
        minWidth: 'fit-content',
        maxWidth: '115px',
      },
      {
        name: 'Titulo',
        selector: (row) => row.name,
        wrap: true,
      },
      {
        name: 'Categoria',
        selector: (row) => row.category,
        width: '140px',
      },
      {
        name: 'Estado',
        width: '150px',
        cell: (row, index, column, id) => {
          return (
            <span
              className={`${
                row.published ? 'bg-secondary text-white' : 'bg-yellow'
              } rounded py-2 px-4 text-center `}
            >
              {row.published ? 'Publicada' : 'Sin Publicar'}
            </span>
          );
        },
      },
      {
        name: 'Opciones',
        width: '140px',
        cell: (row, index, column, id) => {
          return (
            <div className="flex gap-4 items-center">
              <Link
                to={`/noticias/${row.slug}`}
                className="flex items-center"
                target="_blank"
              >
                <FontAwesomeIcon
                  icon={faMagnifyingGlass}
                  className="h-5 self-center text-gray-700 cursor-pointer"
                />
              </Link>
              <Link
                to={`/admin/publications/edit/${row.slug}`}
                className="flex items-center"
              >
                <FontAwesomeIcon
                  icon={faPenToSquare}
                  className="h-5 text-gray-700 cursor-pointer "
                />
              </Link>
              <ButtonConfirmationModal
                title={'Eliminar publicación'}
                bodyText={'¿Está seguro que desea eliminar esta publicación?'}
                actionNameConfirm={'Eliminar'}
                actionFunctionConfirm={() => {
                  handleDeletePublication(row.slug);
                }}
                actionButtonClassName={'bg-red-500 hover:bg-red-700'}
                OpenButton={
                  <FontAwesomeIcon
                    icon={faTrashCan}
                    className="h-5 text-delete-button cursor-pointer"
                  />
                }
              />
            </div>
          );
        },
      },
    ],
    [publications]
  );

  const handleSelectedRowsChange = (state) => {
    onSelectedRowsChange(state.selectedRows);
  };

  return (
    <DataTable
      className=""
      columns={columns}
      data={publications}
      pagination
      paginationComponentOptions={{
        rowsPerPageText: 'Filas por página',
        rangeSeparatorText: 'de',
      }}
      paginationRowsPerPageOptions={[5, 10, 15, 20, 25, 30]}
      selectableRows
      selectableRowsNoSelectAll
      selectableRowsHighlight
      highlightOnHover
      onSelectedRowsChange={handleSelectedRowsChange}
      responsive
      customStyles={customStyles}
    />
  );
};

export default ListDesktop;
