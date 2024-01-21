import React, { useState, useRef, useEffect, useContext } from 'react';
import styles from './Form.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowRight,
  faArrowUpFromBracket,
  faInfoCircle,
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
import { AuthContext } from '../../../context/AuthContext/AuthContext.js';
import Select from 'react-select';
import LanguageTabs from './LanguageTabs';
import Information from '../../Information/Information';
import CreatableSelect from 'react-select/creatable';

Quill.register(
  {
    'formats/emoji': quillEmoji.EmojiBlot,
    'modules/emoji-toolbar': quillEmoji.ToolbarEmoji,
    'modules/emoji-textarea': quillEmoji.TextAreaEmoji,
    'modules/emoji-shortname': quillEmoji.ShortNameEmoji,
  },
  true
);

const customStyles = {
  control: (provided, state) => ({
    ...provided,
    minHeight: '47px', // Establece una altura mínima deseada
    height: state.selectProps.menuIsOpen ? 'auto' : 'auto', // Ajusta la altura según el estado del menú
    borderRadius: '8px',
    border: '2px solid #00425A',
    backgroundColor: 'transparent',
    boxShadow: state.isFocused ? '0 0 0 1px #00425A' : 'none',
    '&:hover': {
      borderColor: state.isFocused ? '#00425A' : 'lightgray',
    },
  }),
  placeholder: (provided) => ({
    ...provided,
    color: '#00425A',
  }),
};

const createOption = (label) => ({
  label,
  value: label,
});

const Form = ({ publication } = null) => {
  const { currentUser } = useContext(AuthContext);
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
  const [finalContent_en, setFinalContent_en] = useState(
    publication?.finalContent_EN || ''
  );
  const [contentLanguage, setContentLanguage] = useState('es');

  const [imageFiles, setImageFiles] = useState(null);
  const [labels, setLabels] = useState({
    location: publication?.location || [],
    category: publication?.category || [],
    city: publication?.location?.city || [],
  });
  const promptInput = useRef(null);
  const titleInput = useRef(null);
  const slugInput = useRef(null);

  const [QA, setQA] = useState([]);
  const [preguntas, setPreguntas] = useState(
    publication
      ? publication?.questions.map((item, index) => {
          return {
            index,
            question: item.question,
            answer: item.answer,
          };
        })
      : []
  );
  const [count, setCount] = useState(5);

  const [categorias, setCategorias] = useState([]);

  const [autores, setAutores] = useState([]);
  const [regiones, setRegiones] = useState([]);
  const [selectedComuna, setSelectedComuna] = useState([]);
  const [currentRegion, setCurrentRegion] = useState(
    publication ? publication.location?.region.id : null
  );
  const [currentComuna, setCurrentComuna] = useState(
    publication && publication.location?.city
      ? {
          value: publication.location?.city.id,
          label: publication.location?.city.name,
        }
      : null
  );
  const [currentAutor, setCurrentAutor] = useState(publication?.author || null);
  const [currentComunas, setCurrentComunas] = useState([]);
  const [currentRegionLabel, setCurrentRegionLabel] = useState(
    publication ? publication.location?.region.name : ''
  );

  const [keywords, setKeywords] = useState(
    publication
      ? publication.keywords.map((item) => ({
          value: item,
          label: item,
        }))
      : []
  );
  const [keywordInputValue, setKeywordInputValue] = useState('');

  const publicationDateInput = useRef(null);
  const featuredInput = useRef(null);

  const [selectedOption, setSelectedOption] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');

  const loadComunas = () => {
    const index = regiones.findIndex((region) => region.id === currentRegion);
    const comunas =
      regiones[index]?.cities.map((comuna) => ({
        value: comuna.id,
        label: comuna.name,
      })) || [];
    setCurrentComunas(comunas);
    // setLabels((oldState) => ({
    //   ...oldState,
    //   location: {
    //     ...oldState.location,
    //     city: [],
    //   },
    // }));
  };

  const getComunaLabel = (comunaId) => {
    const comuna = currentComunas.find((comuna) => comuna.id === comunaId);
    return comuna ? comuna.name : '';
  };

  const getRegiones = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/regions`
    );
    const data = await response.json();
    setRegiones(data);
  };

  const getAutores = async () => {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/author`);
    const data = await response.json();
    setAutores(data);
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

  const categoriasOptions = categorias.map((item) => ({
    value: item.id,
    label: item.name,
  }));

  useEffect(() => {
    getCategories();
    getRegiones();
    getAutores();
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

    const inputDate = new Date(
      publicationDateInput.current.value || new Date()
    );
    const selectedPublicationDate = new Date(
      inputDate.getUTCFullYear(),
      inputDate.getUTCMonth(),
      inputDate.getUTCDate()
    );

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
    formData.append('finalContent_en', finalContent_en);
    formData.append('published', isPublished);
    formData.append(
      'location',
      JSON.stringify({
        region: {
          id: currentRegion,
          name: currentRegionLabel,
        },
        city: {
          id: currentComuna?.value,
          name: currentComuna?.label,
        },
      })
    );

    formData.append('author', JSON.stringify(currentAutor));
    formData.append('category', JSON.stringify(labels.category));
    formData.append('fecha_publicacion', selectedPublicationDate);
    formData.append('featured', featuredInput.current.checked);
    formData.append(
      'keywords',
      JSON.stringify(keywords.map((item) => item.value))
    );

    formData.append('questions', JSON.stringify(preguntas));

    const userId = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/users/email/${currentUser.email}`
    );

    formData.append('user', userId.data.id);

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
      // body: JSON.stringify({
      //   model: 'gpt-3.5-turbo',
      //   temperature: 1,
      //   max_tokens: 8000,
      //   n: 15,
      //   messages: [
      //     {
      //       role: 'user',
      //       content: `Analiza el texto delmitado por ''' ''',  y realiza las siguientes tareas.
      //   1) Determina 1 pregunta acerca del contenido y su respuesta por separado. Entrega la pregunta y la respuesta separadas por ;

      //     '''${translatedText}'''`,
      //     },
      //   ],
      // }),
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        temperature: 1,
        max_tokens: 4096,
        n: 15,
        message: `Analiza el texto delmitado por ''' ''',  y realiza las siguientes tareas. 1) Determina 1 pregunta acerca del contenido y su respuesta por separado. Entrega la pregunta y la respuesta separadas por ; '''${translatedText}'''`,
      }),
    };

    try {
      const response = await fetch(
         //'https://api.openai.com/v1/chat/completions',
        `${process.env.REACT_APP_BACKEND_URL}/turbo`,
        optionsQA
      );
      const data = await response.json();

      const dataChoices = data.choices.map((item) => {
         const aText = item.message.content.split(';');
        //const aText = item.text.split(';');
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
      setPreguntas(dataChoices.slice(0, 5));
      setIsLoadingQA(false);
    } catch (error) {
      console.error(error);
      setIsLoadingQA(false);
    }
  };

  // useEffect(() => {
  //   setPreguntas(QA.slice(0, 5));
  // }, [QA]);

  // useEffect(() => {
  //   if (publication) {
  //     const dataChoices = publication.questions.map((item, index) => {
  //       return {
  //         index,
  //         question: item.question,
  //         answer: item.answer,
  //       };
  //     });
  //     console.log(dataChoices);
  //     // setQA(dataChoices);
  //   }
  // }, []);

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
        model: 'gpt-3.5-turbo',
        temperature: 0,
        max_tokens: 4096,
        n: 1,
        message: `Analiza el texto delmitado por ''' ''',  y realiza las siguientes tareas.
        1) ${customPrompt}
          '''${originalText}'''`,
      }),
      // body: JSON.stringify({
      //   model: 'gpt-3.5-turbo',
      //   temperature: 0,
      //   max_tokens: 8000,
      //   n: 1,
      //   messages: [
      //     {
      //       role: 'user',
      //       content: `Analiza el texto delmitado por ''' ''',  y realiza las siguientes tareas.
      //   1) ${customPrompt}
      //     '''${originalText}'''`,
      //     },
      //   ],
      // }),
    };

    try {
      const response = await fetch(
        //'https://api.openai.com/v1/chat/completions',
        `${process.env.REACT_APP_BACKEND_URL}/turbo`,
        options
      );

      const resp = await response.json();
       const text = resp.choices[0].message.content;
      //const text = resp.choices[0].text;

      const aText = text.split('------');
      const content = aText[0].trim();

      setTranslatedText(content);
      setFinalContent_en('');
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

    if (QA.length > 0 && count < 14) {
      newList.push(QA[count]);
      setCount(count + 1);
    }

    setPreguntas(newList);
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

  const translateTextToEnglishGptService = async () => {
    setIsLoading(true);
    const options = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
      // body: JSON.stringify({
      //   model: 'gpt-3.5-turbo',
      //   temperature: 0,
      //   max_tokens: 8000,
      //   n: 1,
      //   messages: [
      //     {
      //       role: 'user',
      //       content: `Traduce en ingles el siguiente texto manteniendo las etiquetas HTML, estilos, emojis y saltos de lineas,
      //   texto: '''${translatedText}'''`,
      //     },
      //   ],
      // }),
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        temperature: 0,
        max_tokens: 4096,
        n: 1,
        message: `Traduce en ingles el siguiente texto manteniendo las etiquetas HTML, estilos, emojis y saltos de lineas,
      //   texto: '''${translatedText}'''`,
      }),
    };

    try {
      const response = await fetch(
        // 'https://api.openai.com/v1/chat/completions',
        `${process.env.REACT_APP_BACKEND_URL}/turbo`,
        options
      );
      const data = await response.json();
      const dataChoices = data.choices;
      setIsLoading(false);
      //sacar el texto en ingles
       return dataChoices[0].message.content;
      //return dataChoices[0].text;
    } catch (error) {
      setIsLoading(false);
      toast('Error al traducir el texto', {
        type: 'error',
        autoClose: 3000,
      });
    }
  };

  const handleTabChange = async (language) => {
    setContentLanguage(language);
    if (language === 'en' && finalContent_en.length < 15) {
      const text_en = await translateTextToEnglishGptService();
      setFinalContent_en(text_en);
    }
  };

  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value);
    promptInput.current.value = e.target.value;
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleKeyDownInKeywordsInput = (event) => {
    if (!keywordInputValue) return;
    switch (event.key) {
      case 'Enter':
      case 'Tab':
        setKeywords((prev) => [...prev, createOption(keywordInputValue)]);
        setKeywordInputValue('');
        event.preventDefault();
    }
  };

  return (
    <>
      <ToastContainer></ToastContainer>
      {isModalOpen && (
        <Information onClose={handleCloseModal}>{modalContent}</Information>
      )}
      <div className="mb-8">
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
              <p className="page-subtitle">
                Prompt Sugeridos: {/* ejemplo para implementar informacion 2 */}
                <FontAwesomeIcon
                  icon={faInfoCircle}
                  className="text-blue-500 cursor-pointer"
                  onClick={() => {
                    setIsModalOpen(true);
                    setModalContent('El prompt sugerido serve para tener algunas sugerencias de texto que podria ser utilizado para la traduccion de la noticia y son totalmente editables');
                  }}
                />
              </p>
              <select
                className="p-4 col-span-2 col-start-1 border rounded w-full border-primary"
                value={selectedOption}
                onChange={handleSelectChange}
              >
                <option value="">Seleccione una opción</option>
                <option value="Convierte el Texto en una noticia comprensible para un niño de x años, con una extensión de x caracteres, en un texto de tipo expositivo">
                Convierte el Texto en una noticia comprensible para un niño de x años, con una extensión de x caracteres, en un texto de tipo expositivo.
                </option>
                <option
                  value="Adapta esta noticia a una formato de conversación entre un abuelo y su hijo, termina con una enseñanza, y que su extensión sean 3 párrafos.
                  "
                >
                  Adapta esta noticia a una formato de conversación entre un abuelo y su hijo de tres parrafos.

                </option>
                <option
                  value="Analiza esta entrevista, mantiene el formato pero simplifica el lenguaje teniendo como publico objetivo adolescentes de 16 años, elimina el contenido que no sea apto para menores de 18 años como violencia y palabras disonantes.
                  "
                >
                 Analiza esta entrevista, mantiene el formato pero simplifica el lenguaje teniendo como publico objetivo adolescentes de 16 años.

                </option>
              </select>
              <p className="page-subtitle">
                Prompt Basico: {/* ejemplo para implementar informacion 1 */}
                <FontAwesomeIcon
                  icon={faInfoCircle}
                  className="text-blue-500 cursor-pointer"
                  onClick={() => {
                    setIsModalOpen(true);
                    setModalContent('El prompt basico serve para traducir la noticia y es totalmente editable');
                  }}
                />
              </p>
              <input
                className="p-4 col-span-2 col-start-1 border rounded w-full border-primary"
                type="text"
                placeholder=""
                defaultValue="Convertir la noticia en una publicación para un niño de 9 años, simplificando el contenido y cambiando palabras técnicas por descripciones que se entiendan con ejemplos, agrega emojis para resaltar algunas emociones."
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
                    className={`rounded h-[27rem] xl:h-[28.3rem] ${
                      contentLanguage !== 'es' ? 'hidden' : ''
                    }`}
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
                  {isLoading && contentLanguage === 'en' && (
                    <div className="flex h-full justify-center items-center">
                      <img src={spinner} className="w-16" />
                    </div>
                  )}
                  <ReactQuill
                    className={`rounded h-[27rem] xl:h-[28.3rem] ${
                      contentLanguage !== 'en' || isLoading ? 'hidden' : ''
                    }`}
                    value={finalContent_en}
                    onChange={setFinalContent_en}
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
                <div className="col-end-3 flex justify-end">
                  <LanguageTabs
                    onChange={handleTabChange}
                    isDisabled={translatedText.length < 15}
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
              <Select
                className="w-full"
                options={regiones.map((item) => ({
                  value: item.id,
                  label: item.name,
                }))}
                value={
                  currentRegion
                    ? { value: currentRegion, label: currentRegionLabel }
                    : { value: regiones[0]?.id, label: regiones[0]?.name }
                }
                onChange={(selectedOption) => {
                  setCurrentRegion(selectedOption?.value || null);
                  setCurrentRegionLabel(selectedOption?.label || '');
                  setCurrentComuna({
                    value: regiones.find(
                      (region) => region.id === selectedOption?.value
                    )?.cities[0]?.id,
                    label: regiones.find(
                      (region) => region.id === selectedOption?.value
                    )?.cities[0]?.name,
                  });
                  // updateLocationLabels({
                  //   region: {
                  //     id: selectedOption?.value || null,
                  //     name: selectedOption?.label || '',
                  //   },
                  // });
                }}
                placeholder="Seleccione región"
                styles={customStyles}
              />
            </div>
            <div className="w-full text-base font-sora">
              <label className="flex h-5 w-5 mb-4">Comuna</label>
              <Select
                className="w-full"
                options={currentComunas}
                value={
                  currentComuna
                    ? {
                        label: currentComuna.label,
                        value: currentComuna.value,
                      }
                    : {
                        label: regiones[0]?.cities[0]?.name,
                        value: regiones[0]?.cities[0]?.id,
                      }
                }
                // isMulti
                // getOptionLabel={(option) => getComunaLabel(option.id)} // Agregar esta línea
                // onChange={
                // setLabels((oldState) => ({
                //   ...oldState,
                //   location: {
                //     ...oldState.location,
                //     city: selectedOptions.map((option) => option.id),
                //   },
                // }))
                // }
                onChange={(selectedOption) => {
                  setCurrentComuna(selectedOption || null);
                }}
                placeholder="Seleccione comunas"
                styles={customStyles}
              />
            </div>
            <div className="w-full text-base font-sora">
              <label className="flex h-5 w-5 mb-4">Categoría</label>
              <Select
                className="w-full"
                options={categoriasOptions}
                // value={categoriasOptions.filter(
                //   (option) => null
                //   // TODO: fix this!
                //   // labels.category.includes(option.value)
                // )}
                // value={categoriasOptions.filter((option) =>
                //   // labels.category.includes(option.value)
                // )}
                value={
                  publication
                    ? {
                        value: publication.category.id,
                        label: publication.category.name,
                      }
                    : []
                }
                isMulti
                onChange={(selectedOptions) =>
                  setLabels((oldState) => ({
                    ...oldState,
                    category: selectedOptions.map((option) => option.value),
                  }))
                }
                placeholder="Seleccione categorías"
                styles={customStyles}
              />
            </div>
            <div className="w-full text-base font-sora">
              <label className="flex h-5 w-5 mb-4">Autor</label>
              <Select
                className="w-full"
                options={autores.map((item) => ({
                  value: item.id,
                  label: item.name,
                }))}
                value={
                  currentAutor != null
                    ? { value: currentAutor.id, label: currentAutor.name }
                    : { value: autores[0]?.id, label: autores[0]?.name }
                }
                onChange={(selectedOption) =>
                  setCurrentAutor({
                    id: selectedOption?.value || null,
                    name: selectedOption?.label || '',
                  })
                }
                placeholder="Seleccione autor"
                styles={customStyles}
              />
            </div>
            <div className="w-full text-base font-sora">
              <label className="flex h-5 mb-3 mt-2">Palabras clave</label>
              <CreatableSelect
                components={{ DropdownIndicator: null }}
                inputValue={keywordInputValue}
                isClearable
                isMulti
                menuIsOpen={false}
                onChange={(newValue) => setKeywords(newValue)}
                onInputChange={(newValue) => setKeywordInputValue(newValue)}
                onKeyDown={handleKeyDownInKeywordsInput}
                placeholder="Escribe una y presiona enter..."
                value={keywords}
                styles={customStyles}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="publicationDate" className="mt-2">
                Fecha de publicacion
              </label>
              <input
                type="date"
                id="publicationDate"
                className="appearance-none text-lg border-2 w-full border-[#00425A] px-3 py-2 rounded-lg inline-block"
                ref={publicationDateInput}
                defaultValue={
                  publication
                    ? publication.publicationDate.split('/').join('-')
                    : undefined
                }
              />
            </div>
            <div className="mt-10">
              <label className="flex items-center gap-2 w-full h-12  px-3 py-2">
                <input
                  type="checkbox"
                  defaultChecked={publication?.featured}
                  ref={featuredInput}
                  className="h-9 w-9"
                />
                <span className="">Marcar como destacada</span>
              </label>
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
          <section>
            <div className="group flex items-center">
              {isLoadingQA ? (
                <button
                  className="py-4 text-lg px-4 rounded bg-blue-900 text-white items-center flex"
                  type="button"
                >
                  Cargando Preguntas
                  <img
                    src={spinnerQA}
                    style={{ width: '20px' }}
                    className="ml-2"
                  />
                </button>
              ) : (
                <button
                  className="py-4 text-lg px-4 rounded bg-blue-900 text-white items-center flex"
                  type="button"
                  onClick={() => handleGetPreguntas()}
                >
                  Traer Preguntas
                  <FontAwesomeIcon
                    icon={faQuestionCircle}
                    className="ml-2 text-yellow"
                  />
                </button>
              )}
              <p className="opacity-0 px-4 text-red-600 group-hover:opacity-80">
                {' '}
                Puedes eliminar una pregunta para traer una nueva (hasta 10
                veces)
              </p>
            </div>
          </section>

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
                          {item.index}
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
          <div className="mt-10 mb-4 flex flex-wrap gap-4 h-10">
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
