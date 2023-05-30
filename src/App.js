import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthContextProvider } from './context';
import Layout from './layout/Layout';
import Home from './pages/Home';
import Admin from './pages/Admin';
import AdminPublications from './pages/Admin/Publications';
import AdminPublicationsNew from './pages/Admin/Publications/new';
import Publication from './pages/Publication';
import EditOne from './pages/Admin/Publications/Edit';
import ViewOne from './pages/Admin/Publications/View';
import NotFound from './pages/NotFound';

import './App.css';

const App = () => {
  return (
    <div>
      <AuthContextProvider>
        <BrowserRouter>
          <Routes>
            <Route
              exact
              path="/"
              element={
                <Layout>
                  <Home />
                </Layout>
              }
            />
            <Route
              exact
              path="/noticias/:slug"
              element={
                <Layout>
                  <Publication />
                </Layout>
              }
            />
            <Route exact path="/acceso" element={<Admin />} />
            <Route
              exact
              path="admin/publications"
              element={
                <Layout>
                  <AdminPublications />
                </Layout>
              }
            />
            <Route
              exact
              path="admin/publications/new"
              element={
                <Layout>
                  <AdminPublicationsNew />
                </Layout>
              }
            />
            <Route
              exact
              path="admin/publications/edit/:slug"
              element={
                <Layout>
                  <EditOne />
                </Layout>
              }
            />
            <Route
              exact
              path="admin/publications/:slug"
              element={
                <Layout>
                  <ViewOne />
                </Layout>
              }
            />
            <Route
              path="*"
              element={
                <Layout>
                  <NotFound />
                </Layout>
              }
            />
          </Routes>
        </BrowserRouter>
      </AuthContextProvider>
    </div>
  );
};
export default App;
