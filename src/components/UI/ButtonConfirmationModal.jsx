import { useState } from 'react';

const ButtonConfirmationModal = ({
  OpenButton,
  actionNameConfirm,
  actionButtonClassName,
  title,
  bodyText,
  actionFunctionConfirm,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const onClick = () => setIsOpen(!isOpen);

  const onConfirm = () => {
    setIsOpen(false);
    actionFunctionConfirm();
  };

  return (
    <>
      <div className="w-fit flex justify-center items-center" onClick={onClick}>
        {OpenButton}
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
            className="pointer-events-auto relative flex sm:w-96  flex-col rounded-md border-none bg-white 
            bg-clip-padding text-current shadow-lg outline-none"
          >
            <div
              className="z-50 flex items-center justify-between rounded-t-md border-b-2
             border-neutral-100 border-opacity-100 p-4"
            >
              {/*<!--Modal title-->*/}
              <h5
                className="text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-200"
                id="exampleModalScrollableLabel"
              >
                {title ? title : 'Modal title'}
              </h5>
              {/*<!--Close button-->*/}
              <button
                type="button"
                onClick={onClick}
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
            <div className="relative p-4">
              <p>{bodyText ? bodyText : 'text body'}</p>
            </div>

            {/*<!--Modal footer--> */}
            <div
              className="flex flex-shrink-0 flex-wrap items-center justify-center sm:justify-end 
              rounded-b-md border-t-2 border-neutral-100 border-opacity-100 p-4 gap-2"
            >
              <button
                onClick={onClick}
                type="button"
                className="inline-block rounded bg-primary-100 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal 
                text-primary-700 hover:bg-primary-accent-100 focus:bg-primary-accent-100 focus:outline-none focus:ring-0
                active:bg-primary-accent-200"
              >
                Cancelar
              </button>
              <button
                type="button"
                className={`ml-1 inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase 
                leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca]hover:bg-primary-600 
                focus:outline-none focus:ring-0 ${actionButtonClassName}`}
                onClick={onConfirm}
              >
                {actionNameConfirm ? actionNameConfirm : 'Confirmar'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ButtonConfirmationModal;
