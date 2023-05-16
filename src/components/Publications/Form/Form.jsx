import React, { useState } from 'react';
import styles from './Form.module.css';
import { faArrowRight, faSave } from '@fortawesome/free-solid-svg-icons';
import Breadcrumb from '../../../components/Breadcrumb/Breadcrumb';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrashCan } from '@fortawesome/free-regular-svg-icons';

const Form = () => {
  const [originalText, setOriginalText] = useState('');
  const [translatedText, setTranslatedText] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    setTranslatedText(originalText);
  };

  const handleOriginalTextChange = (event) => {
    setOriginalText(event.target.value);
  };

  return (
    <>
      <div className="container mx-auto">
        <h1 className="">Nueva</h1>
        <Breadcrumb />
        <div>
          <form onSubmit={handleSubmit}>
            <div className="container mx-auto py-6">
              <div className="flex items-center">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex-shrink-0 flex items-center justify-center">
                  <span className="text-white text-xs">1</span>
                </div>
                <h2 className="ml-2">Traducir noticia</h2>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <p>Prompt Basico:</p>
                <input
                  className="p-4 col-span-2 col-start-1 border rounded"
                  type="text"
                  placeholder=""
                  value="Convertir la noticia en una publicación para un niño de 6 años"
                  readOnly
                />
                <div className="grid grid-cols-2 gap-0 col-span-2">
                  <div
                    className={`${styles.element2} p-4 col-span-2 col-start-1 rounded flex justify-evenly`}
                  >
                    <h1>Texto Original</h1>
                    <button className={styles.btn} type="submit">
                      <FontAwesomeIcon
                        icon={faArrowRight}
                        style={{ color: 'yellow' }}
                      />
                    </button>
                    <h1 className="mr-10">Texto GPT</h1>
                  </div>
                  <textarea
                    className="p-4 resize-none border rounded"
                    rows="3"
                    placeholder="Escribe o pega texto aqui..."
                    value={originalText}
                    onChange={handleOriginalTextChange}
                  ></textarea>
                  <textarea
                    className="p-4 resize-none border rounded"
                    rows="3"
                    placeholder=""
                    value={translatedText}
                    readOnly
                  ></textarea>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div className="flex justify-start p-4 space-x-2">
          <button className="flex gap-5 rounded bg-blue-800 text-gray-800 items-center max-w-fit h-8 px-4">
            Publicar
          </button>
          <button className="flex gap-5 rounded bg-orange-500 text-gray-800 items-center max-w-fit h-8 px-4">
            <div className="grid">
                                        <FontAwesomeIcon
                              icon={faSave}
                              className="h-5 text-black cursor-pointer"
                            /> 
            </div>
            Guardar
          </button>
          <button className="flex gap-5 rounded bg-white text-gray-800 items-center max-w-fit h-8 px-4 border border-black">
            <div className="grid place-content-center bg-white rounded-full w-5 h-5">
                                          <FontAwesomeIcon
                              icon={faTrashCan}
                              className="h-5 text-black cursor-pointer"
                            />
            </div>
            Eliminar
          </button>
        </div>

      </div>
    </>
  );
};

export default Form;
