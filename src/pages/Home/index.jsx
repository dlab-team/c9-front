import React from 'react';

import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext/AuthContext';
import { Footer } from '../../components';

const Home = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <div>
      <main>
        <div className="py-8 px-16">
          <h2>Home</h2>
          {currentUser ? 'Hay User' : 'No hay User'}
        </div>
      </main>
      <Footer />
    </div>

  );
};

export default Home;
