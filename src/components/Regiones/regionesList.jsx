import { useState, useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { useMemo } from 'react';
import { ButtonConfirmationModal } from '../../components/UI';
import DataTable from 'react-data-table-component';
import { Link } from 'react-router-dom';
import { customStyles } from '../Publications/ListDesktop/customStyles';
import axios from 'axios';
import NewRegionModal from './NewRegionModal';


const ListaRegiones = (
  handleDeleteRegiones,
  onSelectedRowsChange,) => {
  const [regiones, setRegiones] = useState([]);
  const endpoint = `${process.env.REACT_APP_BACKEND_URL}/regions`;

  useEffect(() => {
    // Hacer la solicitud al backend 
    axios.get(endpoint)
      .then(response => {
        setRegiones(response.data);
      })
      .catch(error => {
        console.error('Error al obtener las regiones:', error);
      });
  }, []);

  const columns = useMemo(
    () => [
      {
        name: 'Región',
        cell: (row) => (
          <Link to={`admin/regiones/${row.id}`}>
            <FontAwesomeIcon icon={faMapMarkerAlt} size="md" />
            {` ${row.name}`}
          </Link>
        ),
      },
      {
        name: 'Opciones',
        width: '180px',
        cell: (row, index, column, id) => {
          return (
            <div className="flex gap-4 items-center">
              <Link
                to={`/admin/regiones/edit/${row.id}`}
                className="flex items-center"
              >
                <FontAwesomeIcon
                  icon={faPenToSquare}
                  className="h-5 text-gray-700 cursor-pointer "
                />
              </Link>
              <ButtonConfirmationModal
                title={'Eliminar región'}
                bodyText={'¿Está seguro que desea eliminar esta región?'}
                actionNameConfirm={'Eliminar'}
                actionFunctionConfirm={() => {
                  handleDeleteRegiones(row.id);
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
    []
  );

  const handleSelectedRowsChange = (state) => {
    onSelectedRowsChange(state.selectedRows);
  };

  return (
    <div className="mt-4">
      <div className="flex justify-end mb-4">
        <NewRegionModal />
      </div>
      
      <DataTable
      className=""
      columns={columns}
      data={regiones}
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
      responsive
      customStyles={customStyles}
    />
    </div>
  );
};

export default ListaRegiones;
