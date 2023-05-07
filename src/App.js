import React, { useEffect } from 'react';
import { Datepicker, Input, initTE } from "tw-elements";
import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';


import AuthContextProvider from './context/AuthContext';

import Home from './pages/Home';

import Navbar from './components/Navbar';

// import bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';

const App = () => {
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
    ); }; export default App;
{/* function App() {
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

export default App; */}
