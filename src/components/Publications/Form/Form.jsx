import React, { useState, useRef } from 'react';
import styles from './Form.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import Breadcrumb from '../../../components/Breadcrumb/Breadcrumb';

const Form = () => {
  const API_KEY = process.env.REACT_APP_OPENAI_API_KEY;

  const [originalText, setOriginalText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const promptInput = useRef(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const customPrompt = promptInput.current.value;

    const options = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'text-davinci-003',
        temperature: 0,
        max_tokens: 2048,
        n: 1,
        prompt: `Analiza el texto delmitado por ''' ''',  y realiza las siguientes tareas.
        1) ${customPrompt}
        2) Retorna 5 preguntas separas por ; y sus respuestas
          '''${originalText}'''`,
      }),
    };

    try {
      const response = await fetch(
        'https://api.openai.com/v1/completions',
        options
      );
      const data = await response.json();
      setTranslatedText(data.choices[0].text);
    } catch (error) {
      console.error(error);
    }
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
              <h2>Traducir noticia</h2>
              <div className="grid grid-cols-2 gap-4">
                <p>Prompt Basico:</p>
                <input
                  className="p-4 col-span-2 col-start-1 border rounded w-full"
                  type="text"
                  placeholder=""
                  defaultValue="Convertir la noticia en una publicación para un niño de 6 años"
                  ref={promptInput}
                />
                <div className="grid grid-cols-2 gap-0 col-span-2">
                  <div
                    className={`${styles.element2} p-4 col-span-2 col-start-1 rounded flex justify-evenly items-center`}
                  >
                    <h3>Texto Original</h3>
                    <button className={styles.btn} type="submit">
                      <FontAwesomeIcon
                        icon={faArrowRight}
                        style={{ color: 'yellow' }}
                      />
                    </button>
                    <h3 className="mr-10">Texto GPT</h3>
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
      </div>
    </>
  );
};

export default Form;
