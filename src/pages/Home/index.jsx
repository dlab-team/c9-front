import React from 'react';
import { Gallery } from '../../components';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext/AuthContext';
import Searching from '../../components/Searching/Searching';

const Home = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="container mx-auto">
      <main>
        <Gallery />
      </main>
    </div>
  );
};

export default Home;
