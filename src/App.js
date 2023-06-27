import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthContextProvider, FiltersContextProvider } from './context';
import axiosInterceptor from './interceptor/axiosInterceptor';
import AppRoutes from './routes';
import { ToastContainer } from 'react-toastify';
import './App.css';

const App = () => {
  useEffect(() => {
    axiosInterceptor();
  }, []);

  return (
    <div>
      <AuthContextProvider>
        <FiltersContextProvider>
          <BrowserRouter>
            <ToastContainer />
            <AppRoutes />
          </BrowserRouter>
        </FiltersContextProvider>
      </AuthContextProvider>
    </div>
  );
};
export default App;
