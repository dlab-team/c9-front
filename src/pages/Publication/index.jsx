import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { faArrowUp, faDownload } from '@fortawesome/free-solid-svg-icons';
import { faGlobeAmericas } from '@fortawesome/free-solid-svg-icons';
import { faTag } from '@fortawesome/free-solid-svg-icons';
import bgIzq from '../../assets/images/bg-izq.png';
import bgDer from '../../assets/images/bg-der.png';
import { Tab, initTE } from 'tw-elements';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { Spinner } from '../../components/UI';
import TextToSpeech from '../../components/TextToSpeach/TextToSpeach';
import { Tooltip } from 'react-tippy';
import 'react-tippy/dist/tippy.css';
import { getElementError } from '@testing-library/react';
import DetailDesktop from '../../components/Publications/DetailDesktop';
import DetailMobile from '../../components/Publications/DetailMobile';
import { Chatbox } from '../../components';

const Publication = () => {
  const [publication, setPublication] = useState();
  const [showButton, setShowButton] = useState(false);
  const [loading, setLoading] = useState(true);
  const carouselRef = useRef(null);
  const { slug } = useParams();
  const [activeIndex, setActiveIndex] = useState(null);
  const toggleQuestion = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };
  const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);

  const endpoint = `${process.env.REACT_APP_BACKEND_URL}/publications/${slug}`;
  const endpointVisit = `${process.env.REACT_APP_BACKEND_URL}/publication/${slug}/visit`;

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const setLocation = (location) => {
    let locationName = '';
    if (
      location === null ||
      (location?.region === null && location?.city === null)
    ) {
      locationName = 'Chile';
      return locationName;
    }

    if (location?.region?.name) {
      locationName = location.region.name;
    }

    if (location?.city) {
      locationName = `${locationName} / ${location.city.name}`;
    }

    return locationName;
  };

  const getPublicationData = async () => {
    try {
      const response = await axios.get(endpoint);
      const { publication } = response.data;
      setPublication(publication);

      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const increaseVisits = async () => {
    try {
      await axios.post(endpointVisit);
    } catch (error) {
      console.error('Error al aumentar las visitas:', error);
    }
  };

  useEffect(() => {
    getPublicationData();
    initTE({ Tab });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const isVisible = scrollTop > 100;
      setShowButton(isVisible);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const divContent = document.getElementById('content-text');
    divContent.innerHTML = publication?.finalContent;
    const divContentEN = document.getElementById('content-text_EN');
    divContentEN.innerHTML = publication?.finalContent_EN;

    if (carouselRef.current && publication) {
      const dots = document.querySelectorAll('.control-dots .dot');
      dots[0].click();
    }
  }, [publication, windowWidth]);

  useEffect(() => {
    increaseVisits();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const mobileBreakpoint = 640;

  function changeMetaTags(publication) {
    const imgTagTwitter = document
      .getElementById('meta-tag-img-twitter')
      .setAttribute('content', publication?.images[0]?.url);
    const imgTagFace = document
      .getElementById('meta-tag-img-face')
      .setAttribute('content', publication?.images[0]?.url);
    const titleTagFace = document
      .getElementById('meta-tittle-face')
      .setAttribute('content', publication?.name);
    const titleTagtitter = document
      .getElementById('meta-tittle-twitter')
      .setAttribute('content', publication?.name);
  }

  return (
    <>
      <Chatbox publicationContent={publication?.finalContent} />
      <div className={loading ? '' : 'hidden'}>
        <div className="w-full h-[20vh] sm:h-[60vh] flex justify-center items-center">
          <Spinner />
        </div>
      </div>
      <div id="pdf" className={loading ? 'hidden' : ''}>
        <div className="pb-5 pt-10 px-3 md:px-12 lg:px-40 2xl:px-96">
          <Link to="/">
            <button
              type="button"
              className="btn_back text-blue-800 text-sm py-2.5 text-center inline-flex items-center"
            >
              <FontAwesomeIcon icon={faChevronLeft} className="mr-2" />
              Volver
            </button>
          </Link>

          <div>
            <h1 className="innova-title pt-5">{publication?.name}</h1>
            {changeMetaTags(publication)}
            <Tooltip
              title="Escuchar titular"
              position="bottom"
              arrow={true}
              data-html2canvas-ignore="true"
            >
              <div data-html2canvas-ignore="true">
                <TextToSpeech
                  text={publication?.name}
                  data-html2canvas-ignore="true"
                />
              </div>
            </Tooltip>
          </div>
          <div className="mt-2 py-6 flex justify-between">
            <Link to={`/perfil/${publication?.author.username}`}>
              <div
                data-html2canvas-ignore="true"
                className="sm:inline-block hidden whitespace-nowrap rounded-full bg-secondary px-[0.65em] pb-[0.25em] pt-[0.35em] text-center align-baseline text-[0.85em] font-bold leading-none text-white hover:shadow-lg ease-in-out hover:scale-110"
              >
                <FontAwesomeIcon
                  icon={faCircleUser}
                  className="pe-2 text-white "
                />
                {publication?.author?.name}
              </div>
              <Link to={`/acerca-de`} data-html2canvas-ignore="true">
                <div className="ml-2 sm:inline-block hidden whitespace-nowrap rounded-full bg-secondary px-[0.65em] pb-[0.25em] pt-[0.35em] text-center align-baseline text-[0.85em] font-bold leading-none text-white hover:shadow-lg ease-in-out hover:scale-110">
                  🤖 IA
                </div>
              </Link>
            </Link>

            {/* Etiquetas de publicaciones  */}

            <div data-html2canvas-ignore="true" className="flex gap-1 mr-4">
              <a
                href="/"
                className="inline-block whitespace-nowrap rounded-full bg-neutral-100 px-[0.65em] pb-[0.25em] pt-[0.35em] text-center align-baseline text-[0.7em] md:text-[0.85em] font-bold leading-none text-warning-800 hover:shadow-lg ease-in-out hover:scale-110"
              >
                <FontAwesomeIcon
                  icon={faGlobeAmericas}
                  className="pe-2 text-gray-500 "
                />
                {setLocation(publication?.location)}
              </a>
              <a
                href="/"
                className="inline-block whitespace-nowrap rounded-full bg-green-50 px-[0.65em] pb-[0.25em] pt-[0.35em] text-center align-baseline text-[0.7em] md:text-[0.85em] font-bold leading-none text-neutral-600 hover:shadow-lg ease-in-out hover:scale-110"
              >
                <FontAwesomeIcon icon={faTag} className="pe-2 text-gray-500 " />
                {publication?.category?.name
                  ? publication.category.name
                  : 'Sin categoría'}
              </a>
            </div>
          </div>
        </div>
        <div className="flex mb-3 md:mb-8">
          {publication?.images?.length > 0 && (
            <img
              className="imgSingle mx-auto w-[98%] md:max-w-[87%] lg:max-w-[75%] 2xl:max-w-[60%] rounded-md shadow-lg shadow-gray-400"
              src={publication.images[0].url}
              alt="Imagen principal"
            />
          )}
        </div>
        <div className="md:hidden inline-block whitespace-nowrap ml-3 mb-4 rounded-full bg-secondary px-[0.65em] pb-[0.25em] pt-[0.35em] text-center align-baseline text-[0.85em] font-bold leading-none text-white hover:shadow-lg ease-in-out hover:scale-110">
          <Link to={`/perfil/${publication?.author.username}`}>
            <FontAwesomeIcon icon={faCircleUser} className="pe-2 text-white" />
            {publication?.author?.name}
          </Link>
        </div>
        <Link to={`/acerca-de`}>
          <div className="md:hidden inline-block whitespace-nowrap ml-2 mb-4 rounded-full bg-secondary px-[0.65em] pb-[0.25em] pt-[0.35em] text-center align-baseline text-[0.85em] font-bold leading-none text-white hover:shadow-lg ease-in-out hover:scale-110">
            🤖 IA
          </div>
        </Link>

        {/* <div>
					<ul
						className='lg:hidden ml-52 md:ml-96 flex list-none flex-row flex-nowrap md:flex-wrap pl-0 md:mr-14 mr-4'
						role='tablist'
						data-te-nav-ref
					>
						<li role='presentation' className='flex-grow text-center'>
							<a
								href='#tabs-home03'
								className='my-1 block border-x-0 border-b-2 border-t-0 border-transparent px-1 pb-1 pt-1 text-xs font-medium uppercase leading-tight text-neutral-500 hover:isolate hover:border-transparent hover:bg-neutral-100 focus:isolate focus:border-transparent data-[te-nav-active]:border-secondary data-[te-nav-active]:text-primary dark:text-neutral-400 dark:hover:bg-transparent dark:data-[te-nav-active]:border-primary-400 dark:data-[te-nav-active]:text-primary-400'
								data-te-toggle='pill'
								data-te-target='#tabs-home03'
								data-te-nav-active
								role='tab'
								aria-controls='tabs-home03'
								aria-selected='true'
							>
								Español
							</a>
						</li>
						<li role='presentation' className='flex-grow text-center'>
							<a
								href='#tabs-profile03'
								className='focus:border-transparent my-1 block border-x-0 border-b-2 border-t-0 border-transparent px-1 pb-1 pt-1 text-xs font-medium uppercase leading-tight text-neutral-500 hover:isolate hover:border-transparent hover:bg-neutral-100 focus:isolate data-[te-nav-active]:border-secondary data-[te-nav-active]:text-primary dark:text-neutral-400 dark:hover:bg-transparent dark:data-[te-nav-active]:border-primary-400 dark:data-[te-nav-active]:text-primary-400'
								data-te-toggle='pill'
								data-te-target='#tabs-profile03'
								role='tab'
								aria-controls='tabs-profile03'
								aria-selected='false'
							>
								Inglés
							</a>
						</li>
					</ul>
				</div> */}
        <div className="publication-content md:px-14 lg:px-40 relative">
          <div className="absolute right-0 w-[38%] md:w-[20%] lg:w-[16%] 2xl:w-[12%] opacity-40">
            <img src={bgDer} alt="Blob Derecho" />
          </div>

          <div className="absolute left-0 bottom-0 w-[48%] md:w-[24%] lg:w-[18%] 3xl:w-[14%] opacity-40">
            <img src={bgIzq} alt="Blob Izquierdo" />
          </div>

          <div>
            {windowWidth > mobileBreakpoint && (
              <DetailDesktop publication={publication} />
            )}
            {windowWidth <= mobileBreakpoint && (
              <DetailMobile publication={publication} />
            )}
          </div>

          <div className="relative innova-text container w-5/5 mx-auto py-5">
            <h2 className="pt-8 page-title">PREGUNTAS RELACIONADAS</h2>
            <div className="innova-text">
              {publication?.questions.map((item, index) => (
                <div key={index} className="p-2">
                  <div
                    className="bg-blue-100 flex justify-between items-center cursor-pointer p-3 rounded-lg"
                    onClick={() => toggleQuestion(index)}
                  >
                    <div className="p-2">{item.question}</div>
                    <svg
                      className={`w-5 h-5 transition-transform ${
                        activeIndex === index ? 'transform rotate-180' : ''
                      }`}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                  {activeIndex === index && (
                    <div className="p-4 bg-gray-100 bg-opacity-60 rounded mt-2">
                      {item.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {showButton && (
        <button
          className="fixed bottom-2 right-2 w-12 h-12 bg-gray-800 rounded-full text-white flex items-center justify-center hover:opacity-90"
          onClick={handleScrollToTop}
        >
          <FontAwesomeIcon icon={faArrowUp} className="text-2xl" />
        </button>
      )}
    </>
  );
};

export default Publication;
