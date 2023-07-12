import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Spinner } from '../../UI';
import { AuthContext } from '../../../context/AuthContext/AuthContext';

const EditComuna = async (fData, token) => {
  const { comunaId, name, regionId } = fData;
  const endPoint = `${process.env.REACT_APP_BACKEND_URL}/comunas/${comunaId}`;
  try {
    const { data } = await axios.put(
      endPoint,
      { name, region: regionId },
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

const Editar = ({
  comunaId,
  comunaName,
  regionId,
  setIsSuccess,
  clearFormData,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    comunaId: comunaId,
    name: comunaName,
    regionId: regionId,
  });
  const { currentUser } = useContext(AuthContext);
  const [regions, setRegions] = useState([]);
  const [currentRegion, setCurrentRegion] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setIsLoading(true);
      await EditComuna(formData, currentUser.token);
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

  useEffect(() => {
    const endPointRegions = `${process.env.REACT_APP_BACKEND_URL}/regions`;
    axios.get(endPointRegions).then((response) => {
      setRegions(response.data);
    });
  }, []);

  return (
    <div className="p-10 w-full h-[220px]">
      {isLoading ? (
        <div className="flex h-full justify-center items-center">
          <Spinner />
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <label
            htmlFor="inputRegionId"
            className="block mb-2 text-sm font-medium text-primary"
          >
            Región
          </label>
          <select
            required={true}
            className={`block min-h-[auto] w-full rounded-md border-2 focus:border-blue-500 focus:outline-none bg-gray-200 px-3 py-[0.20rem] leading-[1.6]`}
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
            className={`block min-h-[auto] w-full rounded-md border-2 focus:border-blue-500 focus:outline-none bg-gray-200 px-3 py-[0.20rem] leading-[1.6]`}
            id="inputName"
            name="inputName"
            onChange={(event) =>
              setFormData({ ...formData, name: event.target.value })
            }
            value={formData.name}
          />
          <button id="editMuniButtonSubmit" type="submit" className="hidden">
            Actualizar
          </button>
        </form>
      )}
    </div>
  );
};

export default Editar;
