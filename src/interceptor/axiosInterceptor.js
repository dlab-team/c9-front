import axios from 'axios';
import { toast } from 'react-toastify';

const axiosInterceptor = () => {
  // Interceptor de solicitud
  axios.interceptors.request.use(
    (config) => {
      // Aquí puedes realizar modificaciones en la configuración de la solicitud antes de que se envíe
      return config;
    },
    (error) => {
      // Aquí puedes manejar errores de solicitud
      return Promise.reject(error);
    }
  );

  // Interceptor de respuesta
  axios.interceptors.response.use(
    (response) => {
      // Aquí puedes realizar modificaciones en la respuesta antes de que se resuelva
      return response;
    },
    (error) => {
      // Aquí puedes manejar errores de respuesta

      // Si hay un 401
      if (error.response.status === 401) {
        toast.error('No autorizado');
        localStorage.removeItem('jwt');
        setTimeout(() => {
          window.location.href = '/';
        }, 3000);
      } else {
        toast.error(error.response.data.message, {
          type: 'error',
          autoClose: 3000,
        });
      }
      return Promise.reject(error);
    }
  );
};

export default axiosInterceptor;
