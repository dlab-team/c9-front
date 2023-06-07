import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import Breadcrumb from '../../../components/Breadcrumb/Breadcrumb';
import { Spinner } from '../../../components/UI';
import UserList from '../../../components/Users/List';
import { AuthContext } from '../../../context/AuthContext/AuthContext';
import { ToastContainer, toast } from 'react-toastify';

const getUsersAllService = async token => {
  const endpoint = `${process.env.REACT_APP_BACKEND_URL}/users`;
  try {
    const response = await axios.get(endpoint, { headers: { Authorization: `Bearer ${token}` } });
    if (response.status !== 200) {
      throw new Error('Error al obtener los usuarios');
    }
    return response.data;
  } catch (error) {
    throw new Error('Error al obtener los usuarios');
  }
};

const AdminUsers = () => {
  const { currentUser } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getUsers = async () => {
      const users = await getUsersAllService(currentUser.token);
      setUsers(users);
      setIsLoading(false);
    };

    getUsers().catch(error => {
      setIsLoading(false);
      return toast(error.message, {
        type: 'error',
        autoClose: 3000
      });
    });
  }, []);

  return (
    <>
      <ToastContainer />
      <div className="container mx-auto">
        <h1 className="my-3 breadcrumb-title">Listado de usuarios ({users.length})</h1>
        <Breadcrumb />
        <div className={`h-96 flex items-center justify-center ${isLoading ? 'block' : 'hidden'}`}>
          <Spinner />
        </div>
        <div className={`${isLoading ? 'hidden' : 'block'}`}>
          <UserList className="hidden" users={users} />
        </div>
      </div>
    </>
  );
};

export default AdminUsers;
