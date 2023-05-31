import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';

const Sharedbar = () => {
  return (
    <div className="fixed right-0 top-1/2 transform -translate-y-1/2 mr-2">
      <div className="flex flex-col items-center">
        <a
          href="#"
          className="p-1 rounded bg-blue-500 text-white w-12 h-12 flex items-center justify-center shadow-md hover:opacity-75"
        >
          <FontAwesomeIcon icon={faFacebookF} className="text-3xl" />
        </a>
        <a
          href="#"
          className="p-1 my-1 rounded bg-red-500 text-white w-12 h-12 flex items-center justify-center shadow-md hover:opacity-75"
        >
          <FontAwesomeIcon icon={faEnvelope} className="text-3xl" />
        </a>
        <a
          href="#"
          className="p-1 rounded bg-green-500 text-white w-12 h-12 flex items-center justify-center shadow-md hover:opacity-75"
        >
          <FontAwesomeIcon icon={faWhatsapp} className="text-3xl" />
        </a>
      </div>
    </div>
  );
};

export default Sharedbar;
