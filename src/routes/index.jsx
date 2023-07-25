import { Route, Routes } from 'react-router-dom';
import Layout from '../layout/Layout';
import AcercaDe from '../pages/AcercaDe';
import Admin from '../pages/Admin';
import AdminPublications from '../pages/Admin/Publications';
import EditOne from '../pages/Admin/Publications/Edit';
import AdminPublicationsNew from '../pages/Admin/Publications/new';
import AdminUsers from '../pages/Admin/Users';
import Home from '../pages/Home';
import Busqueda from '../pages/Busqueda';
import NotFound from '../pages/NotFound';
import Publication from '../pages/Publication';
import ProtectedRoute from './ProtectedRoute';
import Acceso from '../pages/Acceso';
import LoginLinkedin from '../pages/LoginLinkedin';
import Profile from '../pages/Profile';
import Confirm from '../pages/Admin/Users/Confirm';
import AdminRegiones from '../pages/Admin/Regiones';
import AdminComunas from '../pages/Admin/Comunas';
import Authors from '../pages/Admin/Authors';
import AdminAuthorEdit from '../pages/Admin/Authors/Edit';
import AdminAuthorNew from '../pages/Admin/Authors/New';
import SplashScreen from '../components/SplashScreen/SplashScreen';
import ByKeyword from '../pages/ByKeyword/byKeyword';
import EditUserView from '../pages/Admin/EditUser';

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        exact
        path="/splash"
        element={
          <Layout>
            <SplashScreen />
          </Layout>
        }
      />
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
      <Route exact path="/loginLinkedin/:token" element={<LoginLinkedin />} />
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
        path="/perfil/:username"
        element={
          <Layout>
            <Profile />
          </Layout>
        }
      />
      <Route
        exact
        path="/mi-perfil/:username"
        element={
          <Layout>
            <Profile />
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
      </Route>
      <Route element={<ProtectedRoute requiredAdminRole={true} />}>
        <Route
          exact
          path="admin/autores"
          element={
            <Layout>
              <Authors />
            </Layout>
          }
        />
        <Route
          exact
          path="admin/autores/new"
          element={
            <Layout>
              <AdminAuthorNew />
            </Layout>
          }
        />
        <Route
          exact
          path="admin/autores/edit/:id"
          element={
            <Layout>
              <AdminAuthorEdit />
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
        <Route
          exact
          path="admin/users/edit/:id"
          element={
            <Layout>
              <EditUserView />
            </Layout>
          }
        />
      </Route>

      <Route element={<ProtectedRoute requiredAdminRole={true} />}>
        <Route
          exact
          path="admin/regiones"
          element={
            <Layout>
              <AdminRegiones />
            </Layout>
          }
        />
        <Route
          exact
          path="admin/comunas"
          element={
            <Layout>
              <AdminComunas />
            </Layout>
          }
        />
      </Route>

      <Route
        exact
        path="/publications/keyword/:keyword"
        element={
          <Layout>
            <ByKeyword />
          </Layout>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
