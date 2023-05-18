import React, { useState, useRef } from 'react';
import styles from './Form.module.css';
<<<<<<< HEAD
import { faArrowRight, faSave } from '@fortawesome/free-solid-svg-icons';
import Breadcrumb from '../../../components/Breadcrumb/Breadcrumb';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrashCan } from '@fortawesome/free-regular-svg-icons';
=======
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import spinner from '../../../assets/images/spinner.gif';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
>>>>>>> c8db8d387232a9a2e937e90ab8e43d0e07d05b74

const Form = ({ publication } = null) => {
  const API_KEY = process.env.REACT_APP_OPENAI_API_KEY;
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const [originalText, setOriginalText] = useState(
    publication?.initialContent || ''
  );
  const [translatedText, setTranslatedText] = useState(
    publication?.finalContent || ''
  );
  const promptInput = useRef(null);
  const titleInput = useRef(null);
  const slugInput = useRef(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // validar campos vacios
    const title = titleInput.current.value;
    const slug = slugInput.current.value;
    const initialContent = originalText;
    const finalContent = translatedText;

    if (
      title === '' ||
      slug === '' ||
      initialContent === '' ||
      finalContent === ''
    ) {
      toast('Todos los campos son obligatorios', {
        type: 'error',
        autoClose: 3000,
      });
      return;
    }

    const body = {
      name: title,
      slug,
      initialContent,
      finalContent,
      user_id: 1,
      images: '',
      category: 'Tecnología',
    };

    axios.post(`${process.env.REACT_APP_BACKEND_URL}/publications`, body).then(
      (response) => {
        toast('Publicación guardada correctamente', {
          type: 'success',
          autoClose: 3000,
          onClose: () => {
            setTimeout(() => {
              navigate('/admin/publications');
            }, 3000);
          },
        });
      },
      (error) => {
        toast('Error al guardar la publicación', {
          type: 'error',
          autoClose: 3000,
        });
      }
    );
  };

  const transformContent = async (event) => {
    setIsLoading(true);
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
        2) Retorna 5 preguntas separas por ; y sus respuestas y que se separen del resto del contenido con ------ al comienzo de la primera pregunta
          '''${originalText}'''`,
      }),
    };

    try {
      const response = await fetch(
        'https://api.openai.com/v1/completions',
        options
      );

      const resp = await response.json();
      const text = resp.choices[0].text;

      const aText = text.split('------');
      const content = aText[0].trim();

      // TODO: implementar preguntas
      // const allQuestions = aText[1].split('\n');
      // const aQuestions = [
      //   {
      //     question: allQuestions[2].split(';')[0],
      //     answer: allQuestions[2].split(';')[1],
      //   },
      //   {
      //     question: allQuestions[3].split(';')[0],
      //     answer: allQuestions[3].split(';')[1],
      //   },
      //   {
      //     question: allQuestions[4].split(';')[0],
      //     answer: allQuestions[4].split(';')[1],
      //   },
      //   {
      //     question: allQuestions[5].split(';')[0],
      //     answer: allQuestions[5].split(';')[1],
      //   },
      //   {
      //     question: allQuestions[6].split(';')[0],
      //     answer: allQuestions[6].split(';')[1],
      //   },
      // ];

      setTranslatedText(content);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toast('Error al traducir el texto', {
        type: 'error',
        autoClose: 3000,
      });
    }
  };

  const handleOriginalTextChange = (event) => {
    setOriginalText(event.target.value);
  };

  const createSlug = (title) => {
    const slug = title
      .toLowerCase()
      .replace(/ /g, '-')
      .replace(/[^\w-]+/g, '');
    slugInput.current.value = slug;
  };

  return (
    <>
<<<<<<< HEAD
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
=======
      <ToastContainer></ToastContainer>
      <div>
        <form onSubmit={handleSubmit}>
          <div className="container mx-auto py-6">
            <h2>Traducir noticia</h2>
            <div className="grid grid-cols-2 gap-4">
              <p>Título:</p>
              <input
                className="p-4 col-span-2 col-start-1 border rounded w-full"
                type="text"
                placeholder=""
                ref={titleInput}
                onKeyUp={(e) => {
                  createSlug(e.target.value);
                }}
              />
              <p>Url Amigable:</p>
              <input
                className="p-4 col-span-2 col-start-1 border rounded w-full"
                type="text"
                placeholder=""
                ref={slugInput}
              />
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
                  {isLoading ? (
                    <button className={styles.btn} type="button">
                      <img src={spinner} />
                    </button>
                  ) : (
                    <button
                      className={styles.btn}
                      type="button"
                      onClick={transformContent}
                    >
>>>>>>> c8db8d387232a9a2e937e90ab8e43d0e07d05b74
                      <FontAwesomeIcon
                        icon={faArrowRight}
                        style={{ color: 'yellow' }}
                      />
                    </button>
                  )}
                  <h3 className="mr-10">Texto GPT</h3>
                </div>
                <textarea
                  className="p-4 resize-none border rounded"
                  rows="3"
                  placeholder="Escribe o pega texto aqui..."
                  value={originalText}
                  onChange={handleOriginalTextChange}
                ></textarea>
                {/* <textarea
                  className="p-4 resize-none border rounded"
                  rows="3"
                  placeholder=""
                  defaultValue={translatedText}
                ></textarea> */}
                <div
                  style={{ border: '1px solid #00425a', borderWidth: '1px' }}
                  className="rounded"
                >
                  <ReactQuill
                    className="rounded"
                    value={translatedText}
                    style={{ height: '275px' }}
                  />
                </div>
              </div>
              <div className="col-span-2 flex justify-end">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  type="submit"
                >
                  Guardar
                </button>
              </div>
            </div>
<<<<<<< HEAD
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

=======
          </div>
        </form>
>>>>>>> c8db8d387232a9a2e937e90ab8e43d0e07d05b74
      </div>
    </>
  );
};

export default Form;
