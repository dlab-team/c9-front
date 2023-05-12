import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Publication = () => {
  const [publication, setPublication] = useState();
  const { slug } = useParams();
  const endpoint = `${process.env.REACT_APP_BACKEND_URL}/publications/${slug}`;

  const getPublicationData = async () => {
    try {
      const response = await axios.get(endpoint);
      const data = response.data;

      setPublication(data);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getPublicationData();
  }, []);

  return (
    <div>
      <h1>{publication?.name}</h1>
    </div>
  );
};

export default Publication;
