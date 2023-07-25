import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext/AuthContext';
import { useParams, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import Spinner from '../../components/UI/Spinner';

const LoginLinkedin = () => {
  // recibir el token y crear sesión
  const { setUserLogin } = useContext(AuthContext);
  const { token } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setUserLogin(token);
    navigate('/');
    toast.success('Te has logueado con éxito');
  }, [token]);

  // show loading while we are creating the session
  return (
    <>
      <ToastContainer></ToastContainer>
      {isLoading && (
        <div className="mt-14 flex items-center justify-center">
          <Spinner />
        </div>
      )}
    </>
  );
};
export default LoginLinkedin;
