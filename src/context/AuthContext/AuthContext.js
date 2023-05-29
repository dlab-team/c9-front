import { createContext, useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';

export const AuthContext = createContext();

function AuthContextProvider(props) {
  const [currentUser, setCurrentUser] = useState();

  const setUserLogin = (token) => {
    localStorage.setItem('jwt', token)
    setCurrentUser({
      ...jwtDecode(token),
      token
    });
  }

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (token) {
      const decodedToken = jwtDecode(token);
      if (decodedToken.exp * 1000 < Date.now()) {
        localStorage.removeItem('jwt');
      } else {
        setCurrentUser({ ...decodedToken, token });
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, setUserLogin }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
