import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { Spinner } from '../../../components/UI';

const confirmUserService = async (password, tokenConfirm) => {
  const endPoint = `${process.env.REACT_APP_BACKEND_URL}/users/confirm`;
  try {
    const { data } = await axios.post(endPoint, { password, token: tokenConfirm });
    return data;
  } catch (error) {
    throw new Error('Error al confirmar el usuario');
  }
};

const validatePassword = password => {
  return password.length >= 8;
};
const validateConfirmationPasword = (password, passwordConfirmation) => {
  return password === passwordConfirmation;
};

const initialState = { password: '', passwordConfirmation: '' };
const Confirm = () => {
  const [errors, setErrors] = useState(initialState);
  const [formData, setFormData] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSucces] = useState(false);
  const [searchParams] = useSearchParams();
  const tokenConfirm = searchParams.get('token');

  useEffect(() => {
    const isPasswordValid = validatePassword(formData.password);
    const isConfirmationPaswordValid = validateConfirmationPasword(
      formData.password,
      formData.passwordConfirmation
    );
    setErrors({
      password: isPasswordValid ? '' : 'La contraseña debe tener al menos 8 caracteres',
      passwordConfirmation: isConfirmationPaswordValid ? '' : 'Las contraseñas no coinciden'
    });
  }, [formData]);

  const handleSubmit = async event => {
    event.preventDefault();
    console.log('submit');
    if (errors.password.length > 0 || errors.passwordConfirmation.length > 0) {
      return toast.error('Completa los campos requeridos');
    }

    try {
      setIsLoading(true);
      const { message } = await confirmUserService(formData.password, tokenConfirm);
      setIsLoading(false);
      setIsSucces(true);
      toast(message, {
        type: 'success'
      });
    } catch (error) {
      setIsLoading(false);
      toast(error.message, {
        type: 'error'
      });
    }
  };

  return (
    <div className="w-full h-full mt-6 sm:mt-32 grid place-items-center">
      <ToastContainer />
      <div className="">
        <h2
          className="text-lg sm:text-3xl font-bold text-center 
            text-primary font-['Caveat_Brush'] leading-3 tracking-widest uppercase"
        >
          ¡Bienvenido a Innova XD!
        </h2>
        <p className="text-center text-base sm:text-lg text-gray-500 m-6">
          Configura tu contraseña para poder iniciar sesión
        </p>

        {!isSuccess && (
          <form
            onSubmit={event => handleSubmit(event)}
            className={`px-6 sm:px-0 w-full relative ${isLoading ? 'opacity-50' : ''}`}
          >
            {isLoading && (
              <div className="flex left-0 w-full h-full justify-center items-center absolute ">
                <Spinner />
              </div>
            )}
            <label htmlFor="inputPassword" className="block mb-2 text-sm font-medium text-primary">
              Contraseña
            </label>
            <input
              type="password"
              required={true}
              className={` ${
                errors.password ? 'border-b-red-600 focus:border-red-600' : ''
              } block min-h-[auto] w-full rounded-md border-2 focus:border-blue-500 focus:outline-none bg-gray-200 px-3 py-[0.20rem] leading-[1.6]`}
              id="inputPassword"
              name="inputPassword"
              onChange={event => setFormData({ ...formData, password: event.target.value })}
              value={formData.password}
            />
            {formData.password && errors.password && (
              <div className="text-red-500 text-sm">{errors.password}</div>
            )}

            <label
              htmlFor="inputConfirm"
              className="block mt-3 mb-2 text-sm font-medium text-primary"
            >
              Confirmar Contraseña
            </label>
            <input
              type="password"
              className={`${
                errors.email ? 'border-b-red-600 focus:border-red-600' : ''
              } block min-h-[auto] w-full rounded-md border-2 focus:border-blue-500 focus:outline-none bg-gray-200 px-3 py-[0.20rem] leading-[1.6]`}
              id="inputConfirm"
              name="inputConfirm"
              value={formData.passwordConfirmation}
              placeholder=""
              onChange={event =>
                setFormData({ ...formData, passwordConfirmation: event.target.value })
              }
            />
            {formData.passwordConfirmation && errors.passwordConfirmation && (
              <div className="text-red-500 text-sm">{errors.passwordConfirmation}</div>
            )}

            <button
              type="submit"
              className={`w-full mt-4 rounded bg-secondary px-6 pb-2 pt-2.5 text-xs 
      font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca]
      focus:outline-none focus:ring-0 hover:bg-yellow hover:text-black`}
            >
              Completar registro
            </button>
          </form>
        )}

        {isSuccess && (
          <div className="relative text-center w-full h-[300px]">
            <h3 className="text-xl font-bold">Registrado Correctamente</h3>
            <div className="flex justify-center mt-4 mb-6">
              <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center">
                <FontAwesomeIcon icon={faCheck} className="ml-1 text-green-600 w-20 h-20" />
              </div>
            </div>
            <Link
              className="text-base bg-secondary hover:text-black hover:bg-yellow
             px-4 py-2 rounded w-full block font-medium  leading-normal text-white 
             shadow-[0_4px_9px_-4px_#3b71ca]"
              to={'/acceso'}
            >
              Ingresar
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Confirm;
