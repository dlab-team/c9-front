import { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';

const Filters = () => {
  const [isRegionOpen, setIsRegionOpen] = useState(false);
  const [isComunaOpen, setIsComunaOpen] = useState(false);
  const [isCategoriaOpen, setIsCategoriaOpen] = useState(false);

  const regionDropdownRef = useRef(null);
  const comunaDropdownRef = useRef(null);
  const categoriaDropdownRef = useRef(null);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event) => {
    if (
      regionDropdownRef.current &&
      !regionDropdownRef.current.contains(event.target)
    ) {
      setIsRegionOpen(false);
    }
    if (
      comunaDropdownRef.current &&
      !comunaDropdownRef.current.contains(event.target)
    ) {
      setIsComunaOpen(false);
    }
    if (
      categoriaDropdownRef.current &&
      !categoriaDropdownRef.current.contains(event.target)
    ) {
      setIsCategoriaOpen(false);
    }
  };

  const toggleRegionDropdown = () => {
    setIsRegionOpen(!isRegionOpen);
  };

  const toggleComunaDropdown = () => {
    setIsComunaOpen(!isComunaOpen);
  };

  const toggleCategoriaDropdown = () => {
    setIsCategoriaOpen(!isCategoriaOpen);
  };


  return (
    <div className="mb-[2em] p-0 sm:gap-4 container flex flex-wrap justify-center md:justify-end mt-3 md:mr-0 md:gap-x-5 md:my-4 md:bg-white py-5">
      <button type="button" className="sm:hidden flex items-center mr-2">
        <FontAwesomeIcon
          icon={faFilter}
          className='text-secondary h-6'
        />
      </button>
      <div 
        className="relative inline-block"
        ref={regionDropdownRef}
        data-te-dropdown-ref     
      >
        <button
          className="filter-name md:flex sm:border-white md:bg-white whitespace-nowrap rounded-lg px-3 pb-2 pt-2.5 text-md font-normal leading-normal text-left bg-transparent md:border-2 md:border-primary"
          type="button"
          onClick={toggleRegionDropdown}
          id="dropdownMenuButton3"
          data-te-dropdown-toggle-ref
          aria-expanded={isRegionOpen ? 'true' : 'false'}
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
        {isRegionOpen && (
        <ul
          className={`absolute z-[1000] float-left m-0 transition-max-h duration-100 ease-in-out overflow-hidden rounded-lg bg-white text-left shadow-lg min-w-max lg:w-40 border border-grey-50 sm:w-14 ${
            isRegionOpen ? 'max-h-[500px]' : 'max-h-0'}`}
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
        )}
      </div>
      <div 
        className="relative inline-block"
        ref={comunaDropdownRef}
        data-te-dropdown-ref
      >
        <button
          className="filter-name md:flex sm: border-white 
          md:bg-white whitespace-nowrap rounded-lg px-3 pb-2 pt-2.5 text-md font-normal leading-normal text-left bg-transparent md:border-2 md:border-primary"
          type="button"
          onClick={toggleComunaDropdown}
          id="dropdownMenuButton3"
          data-te-dropdown-toggle-ref
          aria-expanded={isComunaOpen ? 'true' : 'false'}
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
        {isComunaOpen && (
        <ul
          className={`absolute z-[1000] float-left m-0 transition-max-h duration-300 ease-in-out overflow-hidden rounded-lg bg-white text-left shadow-lg min-w-max lg:w-40 border border-grey-50 sm:w-14 ${
            isComunaOpen ? 'max-h-[500px]' : 'max-h-0'}`}
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
        )}
      </div>

      <div 
        className="relative inline-block"
        ref={categoriaDropdownRef}
        data-te-dropdown-ref 
      >
        <button
          className="filter-name md:flex whitespace-nowrap rounded-lg px-3 pb-2 pt-2.5 text-md font-normal leading-normal text-left bg-transparent md:border-2 border-primary
          sm:border-0
          "
          type="button"
          onClick={toggleCategoriaDropdown}
          id="dropdownMenuButton3"
          data-te-dropdown-toggle-ref
          aria-expanded={isCategoriaOpen ? 'true' : 'false'}
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
        {isCategoriaOpen && (
        <ul
        className={`absolute z-[1000] float-left m-0 transition-max-h duration-300 ease-in-out overflow-hidden rounded-lg bg-white text-left shadow-lg min-w-max lg:w-40 border border-grey-50 sm:w-14 ${
          isCategoriaOpen ? 'max-h-[500px]' : 'max-h-0'}`}
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
        )}
      </div>

      <button
        type="button"
        className={`hidden sm:ml-4 md:ml-0 sm:block bg-secondary rounded lg:px-10 pb-2 pt-2.5 text-md text-white hover:bg-yellow hover:text-primary transition duration-150 ease-in-out sm:px-4`}
      >
        Filtrar
      </button>
      
    </div>
  );
};

export default Filters;
