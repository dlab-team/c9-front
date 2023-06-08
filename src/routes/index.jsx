import { Route, Routes } from 'react-router-dom';
import Layout from '../layout/Layout';
import AcercaDe from '../pages/AcercaDe';
import Admin from '../pages/Admin';
import AdminPublications from '../pages/Admin/Publications';
import EditOne from '../pages/Admin/Publications/Edit';
import ViewOne from '../pages/Admin/Publications/View';
import AdminPublicationsNew from '../pages/Admin/Publications/new';
import AdminUsers from '../pages/Admin/Users';
import Home from '../pages/Home';
import Busqueda from '../pages/Busqueda';
import NotFound from '../pages/NotFound';
import Publication from '../pages/Publication';
import ProtectedRoute from './ProtectedRoute';
import Acceso from '../pages/Acceso';
import MiPerfil from '../pages/MiPerfil';
import Confirm from '../pages/Admin/Users/Confirm';

const AppRoutes = () => {
  return (
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
      <Route exact path="/acceso" element={<Acceso />} />
      <Route
        exact
        path="/busqueda/:searchValue"
        element={
          <Layout>
            <Busqueda />
          </Layout>
        }
      />
      <Route
        exact
        path="/acerca-de"
        element={
          <Layout>
            <AcercaDe />
          </Layout>
        }
      />
      <Route
        exact
        path="/mi-perfil"
        element={
          <Layout>
            <MiPerfil />
          </Layout>
        }
      />
      <Route
        path="/confirm"
        element={
          <Layout>
            <Confirm />
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

      <Route element={<ProtectedRoute />}>
        <Route
          exact
          path="admin"
          element={
            <Layout>
              <Admin />
            </Layout>
          }
        />
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
      </Route>

      <Route element={<ProtectedRoute requiredAdminRole={true} />}>
        <Route
          exact
          path="admin/users"
          element={
            <Layout>
              <AdminUsers />
            </Layout>
          }
        />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
