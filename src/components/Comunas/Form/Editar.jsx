import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Spinner } from '../../UI';
import { AuthContext } from '../../../context/AuthContext/AuthContext';


const EditRegion = async (regionId, name, token) => {
    const endPoint = `${process.env.REACT_APP_BACKEND_URL}/regions/${regionId}`;
    try {
        const { data } = await axios.put(
        endPoint,
        { name },
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

const initialState = { name: '' };
const Editar = ({ setIsSuccess, clearFormData }) => {
    const [errors, setErrors] = useState(initialState);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState(initialState);
    const { currentUser } = useContext(AuthContext);


    useEffect(() => {
        const isNameValid = isValidName(formData.name);
        setErrors({
        name: isNameValid ? '' : 'El nombre es requerido',
        });
    }, [formData]);

    useEffect(() => {
        setFormData(initialState);
        setErrors(initialState);
    }, [clearFormData]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
        setIsLoading(true);
        await EditRegion(formData.name, currentUser.token);
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
            <button id="editMuniButtonSubmit" type="submit" className="hidden">
                Actualizar 
            </button>
            </form>
        )}
        </div>
    );
};

export default Editar;
