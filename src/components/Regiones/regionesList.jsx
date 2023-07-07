import { useState, useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { useMemo } from 'react';
import { ButtonConfirmationModal } from '../../components/UI';
import DataTable from 'react-data-table-component';
import { Link } from 'react-router-dom';
import { customStyles } from '../Publications/ListDesktop/customStyles';
import axios from 'axios';
import NewModal from './NewModal';
import EditModal from './EditModal';
import { Button } from 'react-bootstrap';
import { toast } from 'react-toastify';


const ListaRegiones = ({onSelectedRowsChange}) => {
  const [regiones, setRegiones] = useState([]);
  const endpoint = `${process.env.REACT_APP_BACKEND_URL}/regions`;
  const [selectedRegion, setSelectedRegion] = useState(null);


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

  const handleDeleteRegiones = (regionId) => {
    axios
        .delete(
            `${endpoint}/${regionId}`
        )
        .then((response) => {
            setRegiones(regiones => regiones.filter(region => region.id !== regionId));
            toast('Región eliminada correctamente', {
            type: 'success',
            autoClose: 3000,
            onClose: () => {
                setTimeout(() => {
                navigate('/admin/regiones');
                }, 3000);
            },
            });
        })
        .catch((error) => {
            toast('Error al eliminar la región', {
            type: 'error',
            autoClose: 3000,
            });
        });
    };

  const columns = useMemo(
    () => [
      {
        name: 'Región',
        cell: (row) => (
          <Link to={`admin/regiones/${row.id}`}>
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
              <Button
                  onClick={() => setSelectedRegion(row)}
                  className="flex items-center"
              >
                <FontAwesomeIcon
                  icon={faPenToSquare}
                  className="h-5 text-gray-700 cursor-pointer "
                />
              </Button>
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

  const handleCloseModal = () => {
    setSelectedRegion(null);
  };

  const handleSelectedRowsChange = (state) => {
    onSelectedRowsChange(state.selectedRows);
  };

  return (
    <div className="mt-4">
      <div className="flex justify-end mb-4">
        <NewModal />
      </div>
      <div className="flex justify-end mb-4">
        {selectedRegion && (
          <EditModal
            isOpen={selectedRegion !== null}
            onClose={() => setSelectedRegion(null)}
            region={selectedRegion}
            handleOpenOrCloseModal={handleCloseModal} 
          />
        )}
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
      handleSelectedRowsChange={handleSelectedRowsChange}
      responsive
      customStyles={customStyles}
    />
    </div>
  );
};

export default ListaRegiones;
