import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faShareAlt, faClose } from '@fortawesome/free-solid-svg-icons';

const Sharedbar = () => {
  const [showIcons, setShowIcons] = useState(false);
  const toggleIcons = () => {
    setShowIcons(!showIcons);
  };
  const description = 'InnovaXD del diario "El Mercurio"';
  const url = window.location.href;

  return (
    <div className='fixed right-0 top-1/2 transform -translate-y-1/2 mr-2'>
      <div className='flex gap-1 flex-col items-center'>
        {showIcons ? (
          <button
            onClick={toggleIcons}
            className='p-1 rounded-full bg-gray-500 text-white w-12 h-12 flex items-center justify-center shadow-md hover:opacity-75'
          >
            <FontAwesomeIcon icon={faClose} />
          </button>
        ) : (
          <button
            onClick={toggleIcons}
            className='p-1 rounded-full bg-secondary text-white w-12 h-12 flex items-center justify-center shadow-md hover:opacity-75'
          >
            <FontAwesomeIcon icon={faShareAlt} />
          </button>
        )}

        {showIcons && (
          <div className='flex flex-col space-y-1'>
            {/* Facebook */}
            <a
              href={`https://www.facebook.com/dialog/share?app_&href=${url}&display=popup`}
              target='_blank'
              className='p-1 rounded-full bg-blue-500 text-white w-12 h-12 flex items-center justify-center shadow-md hover:opacity-75'
            >
              <FontAwesomeIcon icon={faFacebookF} className='text-3xl' />
            </a>
            {/* Email  */}
            <a
              href={`mailto:?&subject= Tienes que ver esto!&cc=&bcc=&body=Tienes que ver esto ${url}%0D%0A%0D%0A${encodeURI(
                description
              )}`}
              target='_blank'
              className='p-1 my-1 rounded-full bg-red-500 text-white w-12 h-12 flex items-center justify-center shadow-md hover:opacity-75'
            >
              <FontAwesomeIcon icon={faEnvelope} className='text-3xl' />
            </a>
            {/* Whatsapp */}
            <a
              href={`https://api.whatsapp.com/send/?text=${url}&type=custom_url&app_absent=0`}
              target='_blank'
              className='p-1 rounded-full bg-green-500 text-white w-12 h-12 flex items-center justify-center shadow-md hover:opacity-75'
            >
              <FontAwesomeIcon icon={faWhatsapp} className='text-3xl' />
            </a>
            {/* Twitter  */}
            <a
              href={`https://twitter.com/intent/tweet?url=${url}&text=${encodeURI(
                description
              )}`}
              className='p-1 rounded-full bg-blue-500 text-white w-12 h-12 flex items-center justify-center shadow-md hover:opacity-75'
              target='_blank'
              img='logo192.png'
            >
              <FontAwesomeIcon icon={faTwitter} className='text-3xl' />
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sharedbar;
