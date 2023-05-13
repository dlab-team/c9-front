import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthContextProvider } from './context';
import Layout from './layout/Layout';
import Home from './pages/Home';
import Admin from './pages/Admin';
import AdminPublications from './pages/Admin/Publications';
import Publication from './pages/Publication';

import './App.css';

const App = () => {
  return (
    <div>
      <AuthContextProvider>
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/noticias/:slug" element={<Publication />} />
              <Route exact path="/admin" element={<Admin />} />
              <Route
                exact
                path="admin/publications"
                element={<AdminPublications />}
              />
            </Routes>
          </Layout>
        </BrowserRouter>
      </AuthContextProvider>
    </div>
  );
};
export default App;
