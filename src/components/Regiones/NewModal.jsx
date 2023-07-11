import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Crear from './Form/Crear';
import { useState } from 'react';
import {
    faCirclePlus,
    faEnvelopeCircleCheck,
} from '@fortawesome/free-solid-svg-icons';

const NewModal = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleOpenOrCloseModal = () => {
        setIsOpen(!isOpen);
        setIsSuccess(false);

        if(isSuccess){
        location.reload();
        }
    };

    const handleCreateRegion = () => {
        const createRegionButtonSubmit = document.getElementById(
        'createRegionButtonSubmit'
        );
        createRegionButtonSubmit.click();
    };

    return (
        <>
        <div
            className="w-fit flex justify-center items-center"
            onClick={handleOpenOrCloseModal}
        >
            <button className="flex gap-4 rounded bg-secondary text-white items-center max-w-fit h-10 px-4">
            <div className="grid place-content-center bg-white rounded-full w-5 h-5">
                <FontAwesomeIcon icon={faCirclePlus} className="h-7 text-primary" />
            </div>
            Agregar
            </button>
        </div>

        {/*<!--Verically centered modal-->*/}
        <div
            className={`${
            !isOpen ? 'hidden' : ''
            } fixed left-0 top-0 z-[1055] h-full w-full overflow-y-auto
            overflow-x-hidden outline-none bg-gray-700 bg-opacity-70 cursor-pointer`}
            aria-modal="true"
            role="dialog"
        >
            <div
            className={`pointer-events-none relative flex 
                justify-center items-center transition-all duration-1000 ease-in-out w-ful h-full`}
            >
            <div
                className="pointer-events-auto relative flex sm:w-[600px] flex-col rounded-md border-none bg-white 
                bg-clip-padding text-current shadow-lg outline-none"
            >
                <div
                className="z-50 flex items-center justify-between rounded-t-md border-b-2
                border-neutral-100 border-opacity-100 p-4"
                >
                {/*<!--Modal title-->*/}
                <h5
                    className="text-xl text-center self-center font-medium leading-normal text-neutral-800 dark:text-neutral-200"
                    id="exampleModalScrollableLabel"
                >
                    Crear nueva región
                </h5>
                {/*<!--Close button-->*/}
                <button
                    type="button"
                    onClick={handleOpenOrCloseModal}
                    className="box-content rounded-none border-none hover:no-underline hover:opacity-75 
                    focus:opacity-100 focus:shadow-none focus:outline-none"
                    aria-label="Close"
                >
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-6 w-6"
                    >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                    />
                    </svg>
                </button>
                </div>

                {/*<!--Modal body-->*/}
                {!isSuccess && (
                <Crear
                    clearFormData={isOpen}
                    setIsSuccess={setIsSuccess}
                />
                )}
                {isSuccess && (
                <div className="relative text-center p-6 w-full h-[300px]">
                    <h3 className="text-xl font-bold">Registrado Correctamente</h3>
                    <div className="flex justify-center m-4">
                    <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center">
                        <FontAwesomeIcon
                        icon={faEnvelopeCircleCheck}
                        className="ml-3 text-green-600 w-20 h-20"
                        />
                    </div>
                    </div>
                </div>
                )}

                {/*<!--Modal footer--> */}
                <div
                className="flex flex-shrink-0 flex-wrap items-center justify-center sm:justify-end 
                    rounded-b-md border-t-2 border-neutral-100 border-opacity-100 p-4 gap-2"
                >
                <button
                    onClick={handleOpenOrCloseModal}
                    type="button"
                    className="inline-block border border-gray-300 rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal 
                    text-primary-700 hover:bg-gray-300 focus:bg-gray-300 focus:outline-none focus:ring-0"
                >
                    {isSuccess ? 'Cerrar' : 'Cancelar'}
                </button>
                <button
                    type="button"
                    className={`${
                    isSuccess ? 'hidden' : ''
                    } ml-1 inline-block rounded bg-secondary px-6 pb-2 pt-2.5 text-xs font-medium uppercase 
                    leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca]
                    focus:outline-none focus:ring-0 hover:bg-primary focus:bg-primary`}
                    onClick={handleCreateRegion}
                >
                    Crear región
                </button>
                </div>
            </div>
            </div>
        </div>
        </>
    );
};

export default NewModal;
