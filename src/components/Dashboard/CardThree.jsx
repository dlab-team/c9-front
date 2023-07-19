import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faArrowUpFromBracket,
  } from '@fortawesome/free-solid-svg-icons';


const CardThree = () => {
    const [published, setPublished] = useState(0);

    useEffect(() => {
        const fetchTotalPublishedPub = async () => {
            const endpoint = `${process.env.REACT_APP_BACKEND_URL}/admin_publications?published=true`;
            try {
                const response = await axios.get(endpoint);
                const unpublishedPub = response.data.length;
                    setPublished(unpublishedPub)
                return unpublishedPub;

            } catch (error) {
                console.error(error);
            }
        };
    
        fetchTotalPublishedPub();
    }, []);


    return (
        <div className="rounded-md border border-gray-50 text-center bg-white py-6 shadow-xl">
        <div className="flex h-11 w-11 mx-auto items-center justify-center rounded-full bg-gray-100">
            <FontAwesomeIcon icon={faArrowUpFromBracket} className="h-4 text-blue-400 font-thin" />
        </div>

        <div className="mt-4">
            <div>
            <h4 className="text-xl font-bold text-primary">
                {published}
            </h4>
            <span className="text-sm font-light text-gray-600">Total noticias publicadas</span>
            </div>
        </div>
        </div>
    );
};

export default CardThree;
