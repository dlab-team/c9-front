import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { AuthContext } from '../../../context/AuthContext/AuthContext';
import { Spinner } from '../../../components/UI/';
import { isValidName } from '../../../components/Users/Create/CreateUserForm';
import { useParams } from 'react-router-dom';

const editUserService = async (userId, name, email, tokenAdmin) => {
  const endPoint = `${process.env.REACT_APP_BACKEND_URL}/users/${userId}`;
  try {
    const { data } = await axios.put(
      endPoint,
      { email, name },
      { headers: { Authorization: `Bearer ${tokenAdmin}` } }
    );
    alert('usuario editado')
    return data;
  } catch (error) {
    throw new Error('Error al editar el usuario');
  }
};

const initialState = { email: '', name: '' };

const EditUserForm = ({ setIsSuccess, clearFormData }) => {
  const [errors, setErrors] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const { currentUser } = useContext(AuthContext);

  const { id } = useParams();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const endPoint = `${process.env.REACT_APP_BACKEND_URL}/users/${id}`;
        const { data } = await axios.get(endPoint, {
          headers: { Authorization: `Bearer ${currentUser.token}` }
        });
        setUserData(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUser();
  }, [id, currentUser.token]);

  const isEmailValid = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  useEffect(() => {
    const isNameValid = isValidName(formData.name);
    setErrors({
      email: isEmailValid ? '' : 'El email debe tener un formato válido',
      name: isNameValid ? '' : 'El nombre es requerido'
    });
  }, [formData]);

  useEffect(() => {
    setFormData(initialState);
    setErrors(initialState);
  }, [clearFormData]);

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      setIsLoading(true);
      await editUserService(id, formData.name, formData.email, currentUser.token);
      setFormData(initialState);
      setIsLoading(false);
      //setIsSuccess(true);
    } catch (error) {
      setIsLoading(false);
      toast(error.message, {
        type: 'error',
        autoClose: 3000
      });
    }
  };

  if (!userData) {
    return <div>Cargando...</div>; // O muestra un componente de carga personalizado
  }

  return (
    <div className="p-6 w-full h-[220px]">
      {isLoading ? (
        <div className="flex h-full justify-center items-center">
          <Spinner />
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <label htmlFor="inputName" className="block mb-2 text-sm font-medium text-primary">
            Nombre
          </label>
          <input
            type="text"
            required={true}
            className={` ${
              errors.name ? 'border-b-red-600 focus:border-red-600' : ''
            } block min-h-[auto] w-full rounded-md border-2 focus:border-blue-500 focus:outline-none bg-gray-200 px-3 py-[0.20rem] leading-[1.6]`}
            id="inputName"
            name="inputName"
            onChange={event => setFormData({ ...formData, name: event.target.value })}
            value={formData.name}
          />

          <label htmlFor="inputEmail" className="block mt-3 mb-2 text-sm font-medium text-primary">
            Email
          </label>
          <input
            type="email"
            className={`${
              errors.email ? 'border-b-red-600 focus:border-red-600' : ''
            } block min-h-[auto] w-full rounded-md border-2 focus:border-blue-500 focus:outline-none bg-gray-200 px-3 py-[0.20rem] leading-[1.6]`}
            id="inputEmail"
            name="inputEmail"
            value={formData.email}
            aria-describedby="email"
            placeholder="usuario@innova.cl"
            onChange={event => setFormData({ ...formData, email: event.target.value })}
          />
          {formData.email && errors.email && (
            <div className="text-red-400 text-sm">{errors.email}</div>
          )}
          <button id="editUserButtonSubmit" type="submit">
            Editar usuario
          </button>
        </form>
      )}
    </div>
  );
};

export default EditUserForm;

