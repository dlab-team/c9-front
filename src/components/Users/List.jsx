import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext, useMemo } from 'react';
import DataTable from 'react-data-table-component';
import { Link } from 'react-router-dom';
import { customStyles } from '../Publications/ListDesktop/customStyles';
import NewUserModal from './Create/NewUserModal';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { Tooltip } from 'react-tippy';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext/AuthContext';
import { toast } from 'react-toastify';

async function updateUserService(authToken, { userId, enabled }) {
  const url = `${process.env.REACT_APP_BACKEND_URL}/users/${userId}`;
  const { data } = await axios.put(
    url,
    { enabled },
    {
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    }
  );
  return data;
}

const UserList = ({ users, setIsLoading, setUsers }) => {
  const { currentUser } = useContext(AuthContext);
  const handleEnableOrDisableUser = async (userId, enabled) => {
    try {
      setIsLoading(true);
      await updateUserService(currentUser.token, { userId, enabled });
      setUsers((prevState) => {
        return prevState.map((user) => {
          if (user.id === userId) {
            user.enabled = enabled;
          }
          return user;
        });
      });
      setIsLoading(false);
      toast.success('Usuario actualizado', {
        autoClose: 3000
      });
    } catch (error) {
      setIsLoading(false);
      toast(error.message, {
        type: 'error',
        autoClose: 3000
      });
    }
  };
 
  const columns = useMemo(
    () => [
      {
        width: '10px',
      },
      {
        name: 'Email',
        selector: (row) => row.email,
        minWidth: '200px',
        maxWidth: '350px',
        wrap: true,
      },
      {
        name: 'Nombre',
        selector: (row) => row.name,
        wrap: true,
      },
      {
        name: 'Username',
        selector: (row) => row.username,
        wrap: true,
      },
      {
        name: 'Estado',
        width: '160px',
        cell: (row, index, column, id) => {
          return (
            <span
              className={`${
                row.enabled ? 'bg-secondary text-white' : 'bg-yellow'
              } rounded py-2 px-4 text-center `}
            >
              {row.enabled ? 'Activado' : 'Desactivado'}
            </span>
          );
        },
      },
      {
        name: 'Opciones',
        width: '140px',
        style: {
          display: 'flex',
          'justify-content': 'center',
        },
        cell: (row, index, column, id) => {
          return (
            <div className="flex gap-4 items-center justify-end">
              <Link
                to={`/admin/users/edit/${row.id}`}
                className="flex items-center"
              >
                <FontAwesomeIcon
                  icon={faPenToSquare}
                  className="h-5 text-gray-700 cursor-pointer "
                />
              </Link>
              <Tooltip
                title={`${row.enabled ? 'Desactivar' : 'Activar'} usuario`}
                position="top"
                arrow={true}
              >
                <button
                  className={`cursor-pointer`}
                  onClick={() =>
                    handleEnableOrDisableUser(row.id, !row.enabled)
                  }
                >
                  <FontAwesomeIcon
                    icon={faUser}
                    className={`h-5 hover:scale-125 ${
                      row.enabled
                        ? 'text-secondary hover:text-red-500'
                        : 'text-red-500 hover:text-secondary'
                    } `}
                  />
                </button>
              </Tooltip>
            </div>
          );
        },
      },
    ],
    [users]
  );

  return (
    <div className="mt-4">
      <div className="flex justify-end mb-4">
        <NewUserModal />
      </div>

      <DataTable
        className=""
        columns={columns}
        data={users}
        pagination
        paginationComponentOptions={{
          rowsPerPageText: 'Filas por página',
          rangeSeparatorText: 'de',
        }}
        paginationRowsPerPageOptions={[5, 10, 15, 20, 25, 30]}
        highlightOnHover
        responsive
        customStyles={customStyles}
      />
    </div>
  );
};

export default UserList;
