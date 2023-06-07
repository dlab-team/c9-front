import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthContextProvider } from './context';
import AppRoutes from './routes';
import { ToastContainer } from 'react-toastify';
import './App.css';

const App = () => {
  return (
    <div>
      <AuthContextProvider>
        <BrowserRouter>
        <ToastContainer/>
          <AppRoutes />
        </BrowserRouter>
      </AuthContextProvider>
    </div>
  );
};
export default App;
