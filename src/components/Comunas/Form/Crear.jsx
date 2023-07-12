import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Spinner } from '../../UI';
import { AuthContext } from '../../../context/AuthContext/AuthContext';

const CreateComuna = async (dataFo, token) => {
  const endPoint = `${process.env.REACT_APP_BACKEND_URL}/comunas`;
  try {
    const { data } = await axios.post(
      endPoint,
      { name: dataFo.name, region: dataFo.regionId },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return data;
  } catch (error) {
    console.log(error);
    throw new Error('Error al crear la comuna');
  }
};

const isValidName = (name) => {
  return name.length >= 1;
};

const initialState = { name: '', regionId: '' };
const Crear = ({ setIsSuccess, clearFormData }) => {
  const [errors, setErrors] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const { currentUser } = useContext(AuthContext);
  const [tokenAdmin, setTokenAdmin] = useState('');
  const [regions, setRegions] = useState([]);

  useEffect(() => {
    if (currentUser && currentUser.token) {
      setTokenAdmin(currentUser.token);
    }
  }, [currentUser]);

  useEffect(() => {
    const isNameValid = isValidName(formData.name);
    setErrors({
      name: isNameValid ? '' : 'El nombre es requerido',
    });
  }, [formData]);

  //   useEffect(() => {
  //     setFormData({ ...formData, regionId: regions[0].id });
  //     setErrors(initialState);
  //   }, [clearFormData]);

  useEffect(() => {
    const endPointRegions = `${process.env.REACT_APP_BACKEND_URL}/regions`;
    axios.get(endPointRegions).then((response) => {
      setRegions(response.data);
    });
  }, []);

  const handleSubmitForm = async (event) => {
    event.preventDefault();
    try {
      setIsLoading(true);
      await CreateComuna(formData, tokenAdmin);
      setFormData(initialState);
      setIsLoading(false);
      setIsSuccess(true);
    } catch (error) {
      setIsLoading(false);
      toast(error.message, {
        type: 'error',
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="p-10 w-full h-[220px]">
      {isLoading ? (
        <div className="flex h-full justify-center items-center">
          <Spinner />
        </div>
      ) : (
        <form onSubmit={handleSubmitForm}>
          <label
            htmlFor="inputRegionId"
            className="block mb-2 text-sm font-medium text-primary"
          >
            Región
          </label>
          <select
            required={true}
            className={` ${
              errors.name ? 'border-red-600 focus:border-red-600' : ''
            } block min-h-[auto] w-full rounded-md border-2 focus:border-blue-500 focus:outline-none bg-gray-200 px-3 py-[0.20rem] leading-[1.6]`}
            id="inputRegionId"
            name="inputRegionId"
            onChange={(event) =>
              setFormData({ ...formData, regionId: event.target.value })
            }
            value={formData.regionId}
          >
            {regions.map((region) => (
              <option key={region.id} value={region.id}>
                {region.name}
              </option>
            ))}
          </select>

          <label
            htmlFor="inputName"
            className="block mb-2 text-sm font-medium text-primary mt-5"
          >
            Nombre
          </label>
          <input
            type="text"
            required={true}
            className={` ${
              errors.name ? 'border-red-600 focus:border-red-600' : ''
            } block min-h-[auto] w-full rounded-md border-2 focus:border-blue-500 focus:outline-none bg-gray-200 px-3 py-[0.20rem] leading-[1.6]`}
            id="inputName"
            name="inputName"
            onChange={(event) =>
              setFormData({ ...formData, name: event.target.value })
            }
            value={formData.name}
          />
          <button id="createMuniButtonSubmit" type="submit" className="hidden">
            Crear
          </button>
        </form>
      )}
    </div>
  );
};

export default Crear;
