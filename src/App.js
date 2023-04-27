import React from 'react';
import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';

import AuthContextProvider from './context/AuthContext';

import Home from './pages/Home';

import Navbar from './components/Navbar';

// import bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';

function App() {
  return (
    <div>
      <AuthContextProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route exact path="/" element={<Home />} />
          </Routes>
        </BrowserRouter>
      </AuthContextProvider>
    </div>
  );
}

export default App;
