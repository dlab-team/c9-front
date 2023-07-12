import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Spinner } from '../../UI';
import { AuthContext } from '../../../context/AuthContext/AuthContext';

const EditRegion = async (regionId, regionName, token) => {
  const endPoint = `${process.env.REACT_APP_BACKEND_URL}/region/${regionId}`;
  try {
    const { data } = await axios.put(
      endPoint,
      { id: regionId, name: regionName },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return data;
  } catch (error) {
    throw new Error('Error al editar la región');
  }
};

const isValidName = (name) => {
  return name.length >= 1;
};

const Editar = ({ regionId, regionName, setIsSuccess, clearFormData }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ id: regionId, name: regionName });
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    setFormData({ id: regionId, name: regionName });
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setIsLoading(true);
      await EditRegion(regionId, formData.name, currentUser.token);
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
    <div className="p-10 w-full h-[150px]">
      {isLoading ? (
        <div className="flex h-full justify-center items-center">
          <Spinner />
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <label
            htmlFor="inputName"
            className="block mb-2 text-sm font-medium text-primary"
          >
            Nombre
          </label>
          <input
            type="text"
            required={true}
            className={`block min-h-[auto] w-full rounded-md border-2 focus:border-blue-500 focus:outline-none bg-gray-200 px-3 py-[0.20rem] leading-[1.6]`}
            id="inputName"
            name="inputName"
            onChange={(event) =>
              setFormData({ ...formData, name: event.target.value })
            }
            value={formData.name}
          />
          <button id="editRegionButtonSubmit" type="submit" className="hidden">
            Actualizar
          </button>
        </form>
      )}
    </div>
  );
};

export default Editar;
