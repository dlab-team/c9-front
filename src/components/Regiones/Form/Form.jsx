import { useState, useEffect } from 'react';
import axios from 'axios';


const Form = ({ region }) => {
    const [name, setName] = useState('');

    useEffect(() => {
        if (region) {
            setName(region.name);
        }
    }, [region]);
    
    const handleSave = async (event) => {
        event.preventDefault();
    
        if (name === '') {
            alert('El campo de nombre es obligatorio');
            return;
        }
    
        const formData = {
            name: name
        };

        if (region) {
          // Realizar solicitud PUT para actualizar la región existente
            try {
                const response = await axios.put(
                `${process.env.REACT_APP_BACKEND_URL}/regions/${region.id}`,
                formData,
                );
                console.log(response.data);
                alert('Región actualizada exitosamente');
            } catch (error) {
                console.error(error);
                alert('Error al actualizar la región');
            }
            } else {
            // Realizar solicitud POST para crear una nueva región
            try {
                const response = await axios.post(
                `${process.env.REACT_APP_BACKEND_URL}/regions`,
                formData
                );
                console.log(response.data);
                alert('Región creada exitosamente');
            } catch (error) {
                console.error(error);
                alert('Error al crear la región');
            }
            }
        };
    
    const handleDeleteRegion= async () => {
        axios
            .delete(
            `${process.env.REACT_APP_BACKEND_URL}/regions/${region.id}`
            )
            .then((response) => {
                toast('Región eliminada correctamente', {
                    type: 'success',
                    autoClose: 3000,
                    onClose: () => {
                    setTimeout(() => {
                        navigate('/admin/regiones');
                    }, 3000);
                    },
                });
            })
            .catch((error) => {
                toast('Error al eliminar la región', {
                    type: 'error',
                    autoClose: 3000,
                });
            });
    };

    return (
        <form onSubmit={handleSave}>
        <div>
            <label>Nombre:</label>
            <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            />
        </div>
        <button type="submit">Guardar</button>
        {region && (
            <button type="button" onClick={handleDeleteRegion}>Eliminar</button>
        )}
    </form>
    );
};

export default Form;

