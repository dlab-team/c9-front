import { createContext, useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';

export const AuthContext = createContext();

const token = localStorage.getItem('jwt');
const initialState = token ? { ...jwtDecode(token), token } : null;

function AuthContextProvider(props) {
  const [currentUser, setCurrentUser] = useState(initialState);

  const setUserLogin = token => {
    localStorage.setItem('jwt', token);
    setCurrentUser({
      ...jwtDecode(token),
      token
    });
  };

  const setUserLogout = () => {
    localStorage.removeItem('jwt');
    setCurrentUser(null);
  };

  useEffect(() => {
    if (currentUser && currentUser.exp * 1000 < Date.now()) {
      setUserLogout();
    }
  }, [currentUser]);


  return (
    <AuthContext.Provider value={{ currentUser, setUserLogin, setUserLogout }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
