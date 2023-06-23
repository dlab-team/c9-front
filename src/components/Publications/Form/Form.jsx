import React, { useState, useRef, useEffect } from 'react';
import styles from './Form.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowRight,
  faArrowUpFromBracket,
} from '@fortawesome/free-solid-svg-icons';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { faSave, faTrashCan } from '@fortawesome/free-regular-svg-icons';
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
import ButtonBase from '../../UI/ButtonBase';

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
  const [imageFiles, setImageFiles] = useState(null);
  const [labels, setLabels] = useState({
    location: publication?.location || null,
    category: publication?.category || { id: null },
  });
  const promptInput = useRef(null);
  const titleInput = useRef(null);
  const slugInput = useRef(null);

  const [QA, setQA] = useState([]);
  const [preguntas, setPreguntas] = useState([]);
  const [count, setCount] = useState(5);

  const [categorias, setCategorias] = useState([]);
  const [regiones, setRegiones] = useState([]);
  const [currentRegion, setCurrentRegion] = useState(
    publication?.location?.region.id || null
  );
  const [currentComunas, setCurrentComunas] = useState('');

  const loadComunas = () => {
    const index = regiones.findIndex((region) => region.id === currentRegion);
    const comunas = regiones[index]?.cities;
    setCurrentComunas(comunas);
  };

  const getRegiones = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/regions`
    );
    const data = await response.json();
    setRegiones(data);
  };

  const getCategories = async () => {
    function capitalize(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    }
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/categories`
    );
    const data = await response.json();
    const dataCapitalized = data.map((item) => {
      item.name = capitalize(item.name);
      return item;
    });
    setCategorias(dataCapitalized);
  };

  useEffect(() => {
    getCategories();
    getRegiones();
  }, []);
  useEffect(() => {
    loadComunas();
  }, [currentRegion, regiones]);

  const handleSave = async (event, isPublished = false) => {
    event.preventDefault();

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

    const formData = new FormData();
    formData.append('name', title);
    formData.append('slug', slug);
    formData.append('initialContent', initialContent);
    formData.append('finalContent', finalContent);
    formData.append('published', isPublished);
    formData.append('location', JSON.stringify(labels.location));
    formData.append('category', JSON.stringify(labels.category));

    formData.append('questions', JSON.stringify(preguntas));

    if (imageFiles) {
      imageFiles.forEach((image) => {
        formData.append('images', image);
      });
    }

    if (publication) {
      return axios
        .put(
          `${process.env.REACT_APP_BACKEND_URL}/publications/${publication.slug}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('jwt')}`,
            },
          }
        )
        .then((response) => {
          toast('Publicación Actualizada correctamente', {
            type: 'success',
            autoClose: 3000,
            onClose: () => {
              setTimeout(() => {
                navigate('/admin/publications');
              }, 3000);
            },
          });
        });
    }

    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/publications`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        },
      })
      .then(
        (response) => {
          toast('Publicación guardada correctamente', {
            type: 'success',
            autoClose: 3000,
            // onClose: () => {
            //   setTimeout(() => {
            //     navigate('/admin/publications');
            //   }, 3000);
            // },
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

  const handleDeletePublication = (publicationSlug) => {
    axios
      .delete(
        `${process.env.REACT_APP_BACKEND_URL}/publications/${publicationSlug}`
      )
      .then((response) => {
        toast('Publicación eliminada correctamente', {
          type: 'success',
          autoClose: 3000,
          onClose: () => {
            setTimeout(() => {
              navigate('/admin/publications');
            }, 3000);
          },
        });
      })
      .catch((error) => {
        toast('Error al eliminar la publicación', {
          type: 'error',
          autoClose: 3000,
        });
      });
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
        temperature: 1,
        max_tokens: 2048,
        n: 15,
        prompt: `Analiza el texto delmitado por ''' ''',  y realiza las siguientes tareas.
        1) Determina 1 pregunta acerca del contenido y su respuesta por separado. Entrega la pregunta y la respuesta separadas por ;
  
          '''${translatedText}'''`,
      }),
    };

    try {
      const response = await fetch(
        'https://api.openai.com/v1/completions',
        optionsQA
      );
      const data = await response.json();

      const dataChoices = data.choices.map((item) => {
        const aText = item.text.split(';');
        // remove palabra Pregunta: y palabra Respuesta:
        const question = aText[0].replace('Pregunta:', '').trim();
        const answer = aText[1].replace('Respuesta:', '').trim();
        return {
          index: item.index,
          question,
          answer,
        };
      });

      setQA(dataChoices);
      setIsLoadingQA(false);
    } catch (error) {
      console.error(error);
      setIsLoadingQA(false);
    }
  };

  useEffect(() => {
    setPreguntas(QA.slice(0, 5));
  }, [QA]);

  useEffect(() => {
    if (publication) {
      const dataChoices = publication.questions.map((item, index) => {
        return {
          index,
          question: item.question,
          answer: item.answer,
        };
      });
      setQA(dataChoices);
    }
  }, []);

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
    setPreguntas(newList);
    // TODO: para que es esto?
    // if (count < 14) {
    //   newList.push(QA[count]);
    //   setCount(count + 1);
    //   setPreguntas(newList);
    // } else {
    //   setPreguntas(newList);
    // }
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

  const updateLocationLabels = (locationPartial) => {
    setLabels((oldStateLabels) => {
      return {
        ...oldStateLabels,
        location: { ...oldStateLabels.location, ...locationPartial },
      };
    });
  };

  return (
    <>
      <ToastContainer></ToastContainer>
      <div>
        <form onSubmit={(event) => event.preventDefault()}>
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
                    className="rounded h-96"
                    value={translatedText}
                    onChange={setTranslatedText}
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
                onChange={(event) => {
                  setCurrentRegion(Number(event.target.value) || null);
                  updateLocationLabels({
                    region: { id: Number(event.target.value) || null },
                  });
                }}
              >
                {publication?.location && (
                  <option value={publication.location.region.id}>
                    {publication.location.region.name}
                  </option>
                )}
                <option value={null}>Todas</option>
                {regiones.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
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
                onChange={(event) =>
                  updateLocationLabels({
                    city: { id: Number(event.target.value) || null },
                  })
                }
              >
                {publication?.location?.city && (
                  <option value={publication.location.city.id}>
                    {publication.location.city.name}
                  </option>
                )}
                <option value={'todas'}>Todas</option>
                {currentComunas &&
                  currentComunas.map((item, index) => (
                    <option key={`cmunnas-${index}`} value={item.id}>
                      {item.name}
                    </option>
                  ))}
              </select>
            </div>
            <div className="w-full text-base font-sora">
              <label className="flex h-5 w-5 mb-4">Categoría</label>
              <select
                className="w-full h-12 rounded-[8px] border-[2px] 
              border-[#00425A] bg-transparent px-3"
                name="category"
                onChange={(event) =>
                  setLabels((oldState) => {
                    return {
                      ...oldState,
                      category: { id: Number(event.target.value) || null },
                    };
                  })
                }
              >
                {publication?.category && (
                  <option value={publication.category.id}>
                    {publication.category.name}
                  </option>
                )}
                <option value={null}>Seleccione categoria</option>
                {categorias.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
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
            onImagesChange={(images) => setImageFiles(images)}
            imagesUrls={publication ? publication.images : null}
          />

          <h2 className="mt-6 mb-3 text-[28px] text-primary font-principal">
            Agregar Preguntas
          </h2>

          {isLoadingQA ? (
            <button
              className="py-4 text-lg px-4 rounded bg-blue-900 text-white items-center flex"
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
                          <input
                            type="text"
                            className="w-full"
                            value={item.question}
                          />
                          <input
                            type="text"
                            className="w-full"
                            value={item.answer}
                          />
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
          <div className="mt-10 sm:flex gap-4 h-10">
            <ButtonBase
              className={'bg-primary text-white px-6'}
              onClick={(event) => handleSave(event, true)}
              type="button"
            >
              <FontAwesomeIcon icon={faArrowUpFromBracket} className="h-5" />
              Publicar
            </ButtonBase>
            <ButtonBase
              className="bg-orange-button px-6"
              type="button"
              onClick={(event) =>
                handleSave(event, publication ? publication.published : false)
              }
            >
              <FontAwesomeIcon icon={faSave} className="text-black h-6" />
              Guardar
            </ButtonBase>
            <ButtonBase
              className="bg-secondary text-white px-6"
              type="button"
              onClick={(event) => handleSave(event, true)}
            >
              Guardar y Publicar
            </ButtonBase>
            {publication && (
              <ButtonBase
                onClick={() => handleDeletePublication(publication.slug)}
                type={'button'}
                className="border border-black px-6 hover:bg-delete-button"
              >
                <FontAwesomeIcon icon={faTrashCan} className="h-5" />
                Eliminar
              </ButtonBase>
            )}
          </div>
        </form>
      </div>
    </>
  );
};

export default Form;
