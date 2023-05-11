import React, { useEffect } from 'react';
import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';


import { AuthContextProvider } from './context';

import Home from './pages/Home';
import {Header} from './components';

// import bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';

const App = () => {
  return (
    <div>
      <AuthContextProvider>
        <BrowserRouter>
          <Header isAdmin={false}/>
          <Routes>
            <Route exact path="/" element={<Home />} />
          </Routes>
        </BrowserRouter>
      </AuthContextProvider>
    </div>
    ); }; export default App;
