import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthContextProvider, FiltersContextProvider } from './context';
import AppRoutes from './routes';
import { ToastContainer } from 'react-toastify';
import './App.css';

const App = () => {
  return (
    <div>
      <AuthContextProvider>
      <FiltersContextProvider>
        <BrowserRouter>
        <ToastContainer/>
          <AppRoutes />
        </BrowserRouter>
      </FiltersContextProvider>
      </AuthContextProvider>
    </div>
  );
};
export default App;
