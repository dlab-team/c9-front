import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { useMemo } from 'react';
import { ButtonConfirmationModal } from '../../components/UI';
import { Link, useNavigate } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import { customStyles } from '../Publications/ListDesktop/customStyles';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { toast } from 'react-toastify';

const AuthorList = ({onSelectedRowsChange}) => {
    const navigate = useNavigate();
    const [autores, setAutores] = useState([]);
    const endpoint = `${process.env.REACT_APP_BACKEND_URL}/author`;
    const [selectedAutor, setSelectedAutor] = useState(null);

    useEffect(() => {
        // Obtener los autores desde el backend
        axios.get(endpoint)
        .then(response => {
            setAutores(response.data);
        })
        .catch(error => {
            console.error('Error al obtener los autores:', error);
        });
    }, []);

    
    const handleDeleteAuthor = (autorId) => {
        // TODO: eliminar solo si autor no tiene publicaciones asociadas
        axios
            .delete(
                `${endpoint}/${autorId}`
            )
            .then((response) => {
                setAutores(autrs => autrs.filter(autor => autor.id !== autorId));
                toast('Autor eliminado correctamente', {
                type: 'success',
                autoClose: 3000,
                onClose: () => {
                    setTimeout(() => {
                    navigate('/admin/autores');
                    }, 3000);
                },
                });
            })
            .catch((error) => {
                toast('Error al eliminar autor', {
                type: 'error',
                autoClose: 3000,
                });
            });
    };


    const columns = useMemo(
        () => [
        {
        name: 'Foto',
        cell: (row) => (     
            row.photo 
        ),
        },
        {
        name: 'Nombre',
        cell: (row) => (     
            row.name  
        ),
        },
        {
        name: 'Email',
        cell: (row) => (     
            row.email 
        ),
        },
        {
        name: 'Descripción',
        cell:(row) => (
            <span className="max-w-xs truncate">
                {row.description.length > 50
                    ? `${row.description.slice(0, 50)}...`
                    : row.description}
            </span>
        ),
        },     
        {
        name: 'Opciones',
        width: '130px',
        cell: (row, index, column, id) => {
            return (
            <div className="flex gap-4 items-center">
                <Link
                    to={`/admin/autores/edit/${row.id}`}
                    className="flex items-center"
                >
                <FontAwesomeIcon
                    icon={faPenToSquare}
                    className="h-5 text-gray-700 cursor-pointer "
                />
                </Link>
                <ButtonConfirmationModal
                title={'Eliminar autor'}
                bodyText={'¿Está seguro que desea eliminar este autor?'}
                actionNameConfirm={'Eliminar'}
                actionFunctionConfirm={() => {
                    handleDeleteAuthor(row.id);
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
            setSelectedAutor(null);
        };
        
        const handleSelectedRowsChange = (state) => {
            onSelectedRowsChange(state.selectedRows);
        };


      //const handleDeleteAutho = (authorId) => {
        //console.log('Eliminar autor:', authorId);
      //};
    
    return (
        <>
            <div className="flex mb-4 max-md:justify-center md:justify-end">
                
                <Link to="/admin/autores/new" className='h-10 bottom-16 mb-4 text-primary md:hidden fixed right-2'>
                    <button className="flex gap-4 rounded items-center max-w-fit h-10 px-4">
                    <div className="grid place-content-center bg-white rounded-full w-5 h-5">
                        <FontAwesomeIcon icon={faCirclePlus} className="h-10 text-primary" />
                    </div>
                    </button>
                </Link>
                <Link 
                    to="/admin/autores/new" 
                    className='max-md:hidden'
                >
                    <button 
                        className="flex gap-4 rounded bg-secondary text-white items-center max-w-fit h-10 px-4"
                    >
                    <div className="grid place-content-center bg-white rounded-full w-5 h-5">
                        <FontAwesomeIcon 
                            icon={faCirclePlus} 
                            className="h-7 text-primary" 
                        />
                    </div>
                    Agregar
                    </button>
                </Link>
            </div>

            <DataTable
                className=""
                columns={columns}
                data={autores}
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
        </>
    );
};   

export default AuthorList;