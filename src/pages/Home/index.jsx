import React from 'react';
import { Gallery } from '../../components'
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext/AuthContext';
import Form from '../../components/Form/Form';

const Home = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <div>
      <main>
        <Form/>
      </main>
    </div>
  );
};

export default Home;
