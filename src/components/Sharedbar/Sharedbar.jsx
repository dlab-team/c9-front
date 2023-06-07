import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { faShareAlt, faClose } from '@fortawesome/free-solid-svg-icons';

const Sharedbar = () => {
  const [showIcons, setShowIcons] = useState(false);

  const toggleIcons = () => {
    setShowIcons(!showIcons);
  };

  return (
    <div className="fixed right-0 top-1/2 transform -translate-y-1/2 mr-2">
      <div className="flex gap-1 flex-col items-center">
        {showIcons ? (
          <button
            onClick={toggleIcons}
            className="p-1 rounded-full bg-gray-500 text-white w-12 h-12 flex items-center justify-center shadow-md hover:opacity-75"
          >
            <FontAwesomeIcon icon={faClose} />
          </button>
        ) : (
          <button
            onClick={toggleIcons}
            className="p-1 rounded-full bg-secondary text-white w-12 h-12 flex items-center justify-center shadow-md hover:opacity-75"
          >
            <FontAwesomeIcon icon={faShareAlt} />
          </button>
        )}

        {showIcons && (
          <div className="flex flex-col space-y-1">
            <a
              href="#"
              className="p-1 rounded-full bg-blue-500 text-white w-12 h-12 flex items-center justify-center shadow-md hover:opacity-75"
            >
              <FontAwesomeIcon icon={faFacebookF} className="text-3xl" />
            </a>
            <a
              href="#"
              className="p-1 my-1 rounded-full bg-red-500 text-white w-12 h-12 flex items-center justify-center shadow-md hover:opacity-75"
            >
              <FontAwesomeIcon icon={faEnvelope} className="text-3xl" />
            </a>
            <a
              href="#"
              className="p-1 rounded-full bg-green-500 text-white w-12 h-12 flex items-center justify-center shadow-md hover:opacity-75"
            >
              <FontAwesomeIcon icon={faWhatsapp} className="text-3xl" />
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sharedbar;
