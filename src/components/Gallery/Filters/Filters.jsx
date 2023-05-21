import { useState } from 'react';
import styles from './Filters.module.css';
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

  return (
<<<<<<< HEAD
    <div className="container flex flex-wrap justify-center md:justify-end mt-3 md:mr-0 md:gap-x-5 md:my-4 md:bg-white py-5">
=======
    <div className="container flex flex-wrap justify-center md:justify-end my-6 md:mr-0 md:gap-x-5 md:bg-white">
>>>>>>> c8db8d387232a9a2e937e90ab8e43d0e07d05b74
      <div className="relative inline-block" data-te-dropdown-ref>
        <button
          className="md:flex sm:border-white 
          md:bg-white whitespace-nowrap rounded-lg px-3 pb-2 pt-2.5 text-md font-normal leading-normal text-left bg-transparent md:border-2 md:border-blue-950
          "
          type="button"
          onClick={toggleRegionDropdown}
          id="dropdownMenuButton3"
          data-te-dropdown-toggle-ref
          aria-expanded={isRegionActive}
        >
          Región
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
          className={`absolute z-[1000] float-left m-0 ${isRegionActive ? '' : 'hidden'
            } min-w-max lg:w-40 sm:w-14 list-none overflow-hidden rounded-lg-lg border-none bg-white bg-clip-padding text-left text-base shadow-lg [&[data-te-dropdown-show]]:block`}
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
      <div className="relative inline-block" data-te-dropdown-ref>
        <button
          className="md:flex sm: border-white 
          md:bg-white whitespace-nowrap rounded-lg px-3 pb-2 pt-2.5 text-md font-normal leading-normal text-left bg-transparent md:border-2 md:border-blue-950"
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
          className={`absolute z-[1000] float-left m-0 ${isComunaActive ? '' : 'hidden'
            } min-w-max lg:w-40 sm:w-14 list-none overflow-hidden rounded-lg-lg border-none bg-white bg-clip-padding text-left text-base shadow-lg [&[data-te-dropdown-show]]:block`}
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

      <div className="relative inline-block" data-te-dropdown-ref>
        <button
          className="md:flex whitespace-nowrap rounded-lg px-3 pb-2 pt-2.5 text-md font-normal leading-normal text-left bg-transparent md:border-2 border-blue-950
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
          className={`absolute z-[1000] float-left m-0 ${isCategoriaActive ? '' : 'hidden'
            } min-w-max lg:w-40 sm:w-14 list-none overflow-hidden rounded-lg border-none bg-white bg-clip-padding text-left text-base shadow-lg [&[data-te-dropdown-show]]:block`}
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
        className={`${styles.filterButton} inline-block bg-primary rounded lg:px-10 pb-2 pt-2.5 text-md text-white sm:px-4 sm:block`}
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
