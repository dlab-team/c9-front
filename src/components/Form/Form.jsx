import React, { useState } from 'react';
import styles from './Form.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

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
    <form onSubmit={handleSubmit}>
      <div className="container mx-auto p-6">
        <h2>Traducir noticia</h2>
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
            <div className={`${styles.element2} p-4 col-span-2 col-start-1 rounded flex justify-evenly`}>
              <h1>Texto Original</h1>
              <button className={styles.btn} type="submit">
              <FontAwesomeIcon icon={faArrowRight} style={{ color: 'yellow' }} />
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
  );
};

export default Form;
