import React, { useState, useRef, useEffect } from 'react';
import styles from './Form.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import spinner from '../../../assets/images/spinner.gif';
import spinnerQA from '../../../assets/images/spinner.gif';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import ReactQuill, { Quill } from 'react-quill';
import quillEmoji from 'react-quill-emoji';
import 'react-quill-emoji/dist/quill-emoji.css';
import 'react-quill/dist/quill.snow.css';
import ImagesUploader from './ImagesUploader';

Quill.register(
  {
    'formats/emoji': quillEmoji.EmojiBlot,
    'modules/emoji-toolbar': quillEmoji.ToolbarEmoji,
    'modules/emoji-textarea': quillEmoji.TextAreaEmoji,
    'modules/emoji-shortname': quillEmoji.ShortNameEmoji,
  },
  true
);

const Form = ({ publication } = null) => {
  const API_KEY = process.env.REACT_APP_OPENAI_API_KEY;
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingQA, setIsLoadingQA] = useState(false);
  const [originalText, setOriginalText] = useState(
    publication?.initialContent || ''
  );
  const [translatedText, setTranslatedText] = useState(
    publication?.finalContent || ''
  );
  const promptInput = useRef(null);
  const titleInput = useRef(null);
  const slugInput = useRef(null);

  const [QA, setQA] = useState('');
  const [preguntas, setPreguntas] = useState([]);
  const [count, setCount] = useState(5);

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

  const handleGetPreguntas = async () => {
    setIsLoadingQA(true);

    const optionsQA = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'text-davinci-003',
        temperature: 0,
        max_tokens: 2048,
        n: 15,
        prompt: `Analiza el texto delmitado por ''' ''',  y realiza las siguientes tareas.
        1) Determina  preguntas acerca del contenido y su respuesta por separado
  
          '''${translatedText}'''`,
      }),
    };

    console.log('1111');

    try {
      console.log('222');
      const response = await fetch(
        'https://api.openai.com/v1/completions',
        optionsQA
      );
      const data = await response.json();
      setQA(data.choices);
      setPreguntas(data.choices.filter((e) => e.index < 5));
      setIsLoadingQA(false);
    } catch (error) {
      console.error(error);
      setIsLoadingQA(false);
    }
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

  function handleRemove(index) {
    const newList = preguntas.filter((item) => item.index !== index);

    if (count < 14) {
      newList.push(QA[count]);
      setCount(count + 1);
      setPreguntas(newList);
    } else {
      setPreguntas(newList);
    }
  }

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
      <ToastContainer></ToastContainer>
      <div>
        <form onSubmit={handleSubmit}>
          <div className="container mx-auto py-6">
            <h2 className="page-title">Traducir noticia</h2>

            <div className="grid gap-4 grid-cols-2">
              <div>
                <p className="page-subtitle">Título:</p>
                <input
                  className="p-4 col-span-2 col-start-1 border rounded w-full border-primary"
                  type="text"
                  placeholder=""
                  ref={titleInput}
                  defaultValue={publication?.name}
                  onKeyUp={(e) => {
                    createSlug(e.target.value);
                  }}
                />
              </div>
              <div>
                <p className="page-subtitle">Url Amigable:</p>
                <input
                  className="p-4 col-span-2 col-start-1 border rounded w-full border-primary"
                  type="text"
                  placeholder=""
                  defaultValue={publication?.slug}
                  ref={slugInput}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 mt-4">
              <p className="page-subtitle">Prompt Basico:</p>
              <input
                className="p-4 col-span-2 col-start-1 border rounded w-full border-primary"
                type="text"
                placeholder=""
                defaultValue="Convertir la noticia en una publicación para un niño de 6 años"
                ref={promptInput}
              />
              <div className="grid grid-cols-2 gap-0 col-span-2 mt-2">
                <div
                  className={`${styles.element2} p-4 col-span-2 col-start-1 rounded flex justify-evenly items-center`}
                >
                  <h3 className="textarea-title">Texto Original</h3>
                  {isLoading ? (
                    <button
                      className="py-2 px-4 rounded-2xl bg-blue-900 text-white items-center flex"
                      type="button"
                    >
                      {' '}
                      Transformando
                      <img
                        src={spinner}
                        style={{ width: '20px' }}
                        className="ml-2"
                      />
                    </button>
                  ) : (
                    <button
                      className="py-2 px-4 rounded-2xl bg-blue-900 text-white items-center flex"
                      type="button"
                      onClick={transformContent}
                    >
                      {' '}
                      Transformar
                      <FontAwesomeIcon
                        icon={faArrowRight}
                        className="ml-2 text-yellow"
                      />
                    </button>
                  )}
                  <h3 className="mr-10 textarea-title">Texto GPT</h3>
                </div>
                <textarea
                  className="p-4 resize-none border rounded"
                  rows="3"
                  placeholder="Escribe o pega texto aqui..."
                  value={originalText}
                  onChange={handleOriginalTextChange}
                ></textarea>
                <div
                  style={{ border: '1px solid #00425a', borderWidth: '1px' }}
                  className="rounded"
                >
                  <ReactQuill
                    className="rounded"
                    value={translatedText}
                    onChange={setTranslatedText}
                    style={{ height: '275px' }}
                    modules={{
                      toolbar: {
                        container: [
                          [{ header: [1, 2, 3, 4, 5, 6, false] }],
                          ['bold', 'italic', 'underline', 'strike'],
                          [{ list: 'ordered' }, { list: 'bullet' }],
                          ['emoji', 'image'],
                          [{ color: [] }, { background: [] }],
                          [{ indent: '-1' }, { indent: '+1' }],
                          [{ align: [] }],
                        ],
                      },
                      'emoji-toolbar': true,
                      'emoji-textarea': false,
                      'emoji-shortname': true,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          <h2 className="my-4 text-[28px] text-primary font-principal">
            Agregar etiquetas
          </h2>
          <div className="grid grid-cols-4 gap-4">
            <div className="w-full text-base font-sora">
              <label className="flex h-5 w-5 mb-4">Region</label>
              <select
                className="w-full h-12 rounded-[8px] border-[2px] 
              border-[#00425A] bg-transparent px-3"
                name="region"
              >
                <option value={null}>Seleccione Region</option>
                {[1, 2, 3].map((item) => (
                  <option key={`${item}-region`} value={item}>
                    Opcion {item}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-full text-base font-sora">
              <label className="flex h-5 w-5 mb-4">Comuna</label>
              <select
                className="w-full h-12 rounded-[8px] border-[2px] 
              border-[#00425A] bg-transparent px-3"
                name="comuna"
              >
                <option value={null}>Seleccione comuna</option>
                {[1, 2, 3].map((item) => (
                  <option key={`${item}-comuna`} value={item}>
                    Opcion {item}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-full text-base font-sora">
              <label className="flex h-5 w-5 mb-4">Categoria</label>
              <select
                className="w-full h-12 rounded-[8px] border-[2px] 
              border-[#00425A] bg-transparent px-3"
                name="category"
              >
                <option value={null}>Seleccione categoria</option>
                {[1, 2, 3].map((item) => (
                  <option key={`${item}-category`} value={item}>
                    Opcion {item}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-full text-base font-sora">
              <label className="flex h-5 w-5 mb-4">Autor</label>
              <input
                className="w-full h-12 rounded-[8px] border-[2px] border-[#00425A] bg-transparent px-3"
                name="author"
                placeholder="Ingrese autor"
              />
            </div>
          </div>

          <h2 className="mt-6 text-[28px] text-primary font-principal">
            Agregar Fotos
          </h2>
          <ImagesUploader
            onImagesChange={(images) => console.log('selected images:', images)}
          />

          <h2 className="mt-6 mb-3 text-[28px] text-primary font-principal">
            Agregar Preguntas
          </h2>

          {isLoadingQA ? (
            <button
              className="py-2 px-4 rounded-2xl bg-blue-900 text-white items-center flex"
              type="button"
            >
              {' '}
              Cargando Preguntas
              <img src={spinnerQA} style={{ width: '20px' }} className="ml-2" />
            </button>
          ) : (
            <button
              className="py-4 text-lg px-4 rounded bg-blue-900 text-white items-center flex"
              type="button"
              onClick={() => handleGetPreguntas()}
            >
              {' '}
              Traer Preguntas
              <FontAwesomeIcon
                icon={faQuestionCircle}
                className="ml-2 text-yellow"
              />
            </button>
          )}

          <div>
            <ul className="my-3">
              {preguntas
                ? preguntas.map((item) => (
                    <li key={item.index} className="mt-2 mb-4">
                      <div className="flex justify-between">
                        <div className="rounded w-full border border-primary p-4">
                          {item.text}
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemove(item.index)}
                          className="rounded border border-primary ml-2 p-4"
                        >
                          <FontAwesomeIcon
                            icon={faTrashCan}
                            className="h-6 text-delete-button cursor-pointer"
                          />
                        </button>
                      </div>
                    </li>
                  ))
                : null}
            </ul>
          </div>

          <div className="mt-8 col-span-2 flex justify-end">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              type="submit"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Form;
