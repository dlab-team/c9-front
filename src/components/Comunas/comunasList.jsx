import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { useMemo } from 'react';
import { ButtonConfirmationModal } from '../UI';
import DataTable from 'react-data-table-component';
import { Link, useNavigate } from 'react-router-dom';
import { customStyles } from '../Publications/ListDesktop/customStyles';
import axios from 'axios';
import NewModal from './NewModal';
import EditModal from './EditModal';
import { Button } from 'react-bootstrap';
import { toast } from 'react-toastify';

const MunicipalitiesList = ({ onSelectedRowsChange }) => {
  const [municipalities, setMunicipalities] = useState([]);
  const endpoint = `${process.env.REACT_APP_BACKEND_URL}/comunas`;
  const [selectedMuni, setSelectedMuni] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Hacer la solicitud al backend
    axios
      .get(endpoint)
      .then((response) => {
        setMunicipalities(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener las comunas:', error);
      });
  }, []);

  const handleDeleteMunicipalities = (MuniId) => {
    axios
      .delete(`${endpoint}/${MuniId}`)
      .then((response) => {
        setMunicipalities((comunas) =>
          comunas.filter((comuna) => comuna.id !== MuniId)
        );
        toast('Comuna eliminada correctamente', {
          type: 'success',
          autoClose: 3000,
          onClose: () => {
            setTimeout(() => {
              navigate('/admin/comunas');
            }, 3000);
          },
        });
      })
      .catch((error) => {
        toast('Error al eliminar la comuna', {
          type: 'error',
          autoClose: 3000,
        });
      });
  };

  const columns = useMemo(
    () => [
      {
        name: 'Nombre',
        cell: (row) => row.name,
      },
      {
        name: 'Región',
        cell: (row) => row.region.name,
      },

      {
        name: 'Opciones',
        width: '130px',
        cell: (row, index, column, id) => {
          return (
            <div className="flex gap-4 items-center">
              <Button
                onClick={() => setSelectedMuni(row)}
                className="flex items-center"
              >
                <FontAwesomeIcon
                  icon={faPenToSquare}
                  className="h-5 text-gray-700 cursor-pointer "
                />
              </Button>
              <ButtonConfirmationModal
                title={'Eliminar comuna'}
                bodyText={'¿Está seguro que desea eliminar esta comuna?'}
                actionNameConfirm={'Eliminar'}
                actionFunctionConfirm={() => {
                  handleDeleteMunicipalities(row.id);
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
    setSelectedMuni(null);
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
        {selectedMuni && (
          <EditModal
            isOpen={selectedMuni !== null}
            onClose={() => setSelectedMuni(null)}
            comuna={selectedMuni}
            handleOpenOrCloseModal={handleCloseModal}
          />
        )}
      </div>

      <DataTable
        className=""
        columns={columns}
        data={municipalities}
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

export default MunicipalitiesList;
