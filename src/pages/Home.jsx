import React from 'react';

import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Home = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <div>
      <h2>Home</h2>
      {currentUser ? 'Hay User' : 'No hay User'}
    </div>
  );
};

export default Home;
