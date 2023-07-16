import { useState } from 'react';
import { toast } from 'react-toastify';

const LanguageTabs = ({ onChange, isDisabled }) => {
  const [activeTab, setActiveTab] = useState('es');

  const changeLanguage = (lenguage) => {
    if (isDisabled && lenguage === 'en') {
      return toast.warning(
        'Transforma la noticia para poder traducir al inglés',
        {
          autoClose: 3000
        }
      );
    }
    setActiveTab(lenguage);
    onChange(lenguage);
  };

  const activeClass = 'bg-white';
  return (
    <div Name="w-[50%] mt-[-1px]">
      <ul
        className={`h-10 bg-[#116cef4d] border-[#00425a] border-r border-l border-b 
			flex items-center justify-center list-none flex-wrap rounded-b-lg px-2`}
        data-tabs="tabs"
        role="list"
      >
        <li className="z-30 flex-auto text-center ">
          <button
            className={`${
              activeTab === 'es' ? activeClass : ''
            } z-30 h-7 text-base
			  mb-0 flex w-full cursor-pointer items-center justify-center rounded-lg
			  border-0 bg-inherit px-0 py-1 transition-all ease-in-out`}
            role="tab"
            aria-selected="true"
            onClick={() => changeLanguage('es')}
          >
            <span className="ml-1">Español</span>
          </button>
        </li>
        <li className="z-30 flex-auto text-center">
          <button
            className={`${
              activeTab !== 'es' ? activeClass : ''
            } z-30 h-7 mb-0 text-base
			    flex w-full cursor-pointer items-center justify-center rounded-lg border-0
				bg-inherit px-0 py-1 transition-all ease-in-out`}
            role="tab"
            aria-selected="true"
            onClick={() => changeLanguage('en')}
          >
            <span className="ml-1">Ingles</span>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default LanguageTabs;
