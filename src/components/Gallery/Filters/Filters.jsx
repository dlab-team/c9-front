import { useState } from 'react';
import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';

const Filters = () => {
  const [isRegionActive, setIsRegionActive] = useState(
    localStorage.getItem('isRegionActive') === 'true' || false
  );
  const [isComunaActive, setIsComunaActive] = useState(
    localStorage.getItem('isComunaActive') === 'true' || false
  );
  const [isCategoriaActive, setIsCategoriaActive] = useState(
    localStorage.getItem('isCategoriaActive') === 'true' || false
  );

  useEffect(() => {
    localStorage.setItem('isRegionActive', isRegionActive);
    localStorage.setItem('isComunaActive', isComunaActive);
    localStorage.setItem('isCategoriaActive', isCategoriaActive);
  }, [isRegionActive, isComunaActive, isCategoriaActive]);

  const toggleRegionDropdown = () => {
    setIsRegionActive(!isRegionActive);
  };

  const toggleComunaDropdown = () => {
    setIsComunaActive(!isComunaActive);
  };

  const toggleCategoriaDropdown = () => {
    setIsCategoriaActive(!isCategoriaActive);
  };

  const handleRegionMouseEnter = () => {
    setIsRegionActive(true);
  };

  const handleRegionMouseLeave = () => {
    setIsRegionActive(false);
  };

  const handleComunaMouseEnter = () => {
    setIsComunaActive(true);
  };

  const handleComunaMouseLeave = () => {
    setIsComunaActive(false);
  };

  const handleCategoriaMouseEnter = () => {
    setIsCategoriaActive(true);
  };

  const handleCategoriaMouseLeave = () => {
    setIsCategoriaActive(false);
  };


  return (
    <div className="filter-container container flex flex-wrap justify-center md:justify-end mt-3 md:mr-0 md:gap-x-5 md:my-4 md:bg-white py-5">
      <div className={`relative inline-block ${isRegionActive ? 'open' : ''}`}
        data-te-dropdown-ref
        onMouseEnter={handleRegionMouseEnter}
        onMouseLeave={handleRegionMouseLeave}
      >
        <button
          className="filter-name md:flex sm:border-white md:bg-white whitespace-nowrap rounded-lg px-3 pb-2 pt-2.5 text-md font-normal leading-normal text-left bg-transparent md:border-2 md:border-primary
          "
          type="button"
          onClick={toggleRegionDropdown}
          id="dropdownMenuButton3"
          data-te-dropdown-toggle-ref
          aria-expanded={isRegionActive}
        >
          Región
          <span className="lg:ml-20 w-2 sm:ml-6 hidden sm:block">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-5 w-5"
            >
              <path
                fillRule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </button>
        <ul
          className={`absolute z-[1000] float-left m-0 transition-max-height duration-300 ease-in-out overflow-hidden ${
            isRegionActive ? 'max-h-[200px]' : 'max-h-0'
          } rounded-lg bg-white text-left shadow-lg min-w-max lg:w-40 border border-grey-50 sm:w-14 list-none bg-clip-padding text-base`}
          aria-labelledby="dropdownMenuButton3"
          data-te-dropdown-menu-ref
        >
          <li>
            <a
              className="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-neutral-600"
              href="*"
              data-te-dropdown-item-ref
            >
              Región I
            </a>
          </li>
          <li>
            <a
              className="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-neutral-600"
              href="*"
              data-te-dropdown-item-ref
            >
              Región II
            </a>
          </li>
          <li>
            <a
              className="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400"
              href="*"
              data-te-dropdown-item-ref
            >
              Región III
            </a>
          </li>
        </ul>
      </div>
      <div className={`relative inline-block ${isComunaActive ? 'open' : ''}`}
        data-te-dropdown-ref
        onMouseEnter={handleComunaMouseEnter}
        onMouseLeave={handleComunaMouseLeave}
      >
        <button
          className="filter-name md:flex sm: border-white 
          md:bg-white whitespace-nowrap rounded-lg px-3 pb-2 pt-2.5 text-md font-normal leading-normal text-left bg-transparent md:border-2 md:border-primary"
          type="button"
          onClick={toggleComunaDropdown}
          id="dropdownMenuButton3"
          data-te-dropdown-toggle-ref
          aria-expanded={isComunaActive}
        >
          Comuna
          <span className="lg:ml-16 w-2 sm:ml-6 hidden sm:block">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-5 w-5"
            >
              <path
                fillRule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </button>
        <ul
          className={`absolute z-[1000] float-left m-0 transition-max-height duration-300 ease-in-out overflow-hidden ${
            isComunaActive ? 'max-h-[200px]' : 'max-h-0'
          } rounded-lg bg-white text-left shadow-lg min-w-max lg:w-40 border border-grey-50 sm:w-14 list-none bg-clip-padding text-base`}
          aria-labelledby="dropdownMenuButton3"
          data-te-dropdown-menu-ref
        >
          <li>
            <a
              className="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200"
              href="*"
              data-te-dropdown-item-ref
            >
              Comuna I
            </a>
          </li>
          <li>
            <a
              className="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent"
              href="*"
              data-te-dropdown-item-ref
            >
              Comuna II
            </a>
          </li>
          <li>
            <a
              className="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400"
              href="*"
              data-te-dropdown-item-ref
            >
              Comuna III
            </a>
          </li>
        </ul>
      </div>

      <div className={`relative inline-block ${isCategoriaActive ? 'open' : ''}`}
        data-te-dropdown-ref
        onMouseEnter={handleCategoriaMouseEnter}
        onMouseLeave={handleCategoriaMouseLeave}
      >
        <button
          className="filter-name md:flex whitespace-nowrap rounded-lg px-3 pb-2 pt-2.5 text-md font-normal leading-normal text-left bg-transparent md:border-2 border-primary
          sm:border-0
          "
          type="button"
          onClick={toggleCategoriaDropdown}
          id="dropdownMenuButton3"
          data-te-dropdown-toggle-ref
          aria-expanded={isCategoriaActive}
        >
          Categoría
          <span className="lg:ml-16 w-2 sm:ml-6 hidden sm:block">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-5 w-5"
            >
              <path
                fillRule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </button>
        <ul
          className={`absolute z-[1000] float-left m-0 transition-max-height duration-300 ease-in-out overflow-hidden ${
            isCategoriaActive ? 'max-h-[200px]' : 'max-h-0'
          } rounded-lg bg-white text-left shadow-lg min-w-max lg:w-40 border border-grey-50 sm:w-14 list-none bg-clip-padding text-base`}
          aria-labelledby="dropdownMenuButton3"
          data-te-dropdown-menu-ref
        >
          <li>
            <a
              className="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-neutral-600"
              href="*"
              data-te-dropdown-item-ref
            >
              Categoría I
            </a>
          </li>
          <li>
            <a
              className="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-neutral-600"
              href="*"
              data-te-dropdown-item-ref
            >
              Categoría II
            </a>
          </li>
          <li>
            <a
              className="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-neutral-600"
              href="*"
              data-te-dropdown-item-ref
            >
              Categoría III
            </a>
          </li>
        </ul>
      </div>

      <button
        type="button"
        className={`inline-block bg-secondary rounded lg:px-10 pb-2 pt-2.5 text-md text-white hover:bg-yellow hover:text-primary transition duration-150 ease-in-out sm:px-4 sm:block`}
      >
        Filtrar
      </button>
      <button type="button" className="md:hidden">
        <FontAwesomeIcon
          icon={faFilter}
          className="pt-4 text-lg text-white sm:px-4 absolute left-16 top-24"
        />
      </button>
    </div>
  );
};

export default Filters;
