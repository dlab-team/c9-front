import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import EditUserForm from './EditUserForm';
import { useState } from 'react';
import { faCirclePlus, faEnvelopeCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';

const EditUserModal = ({ userId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleOpenOrCloseModal = () => {
    setIsOpen(!isOpen);
    setIsSuccess(false);
  };

  const handleEditUser = (userId) => {
    const editUserButtonSubmit = document.getElementById('editUserButtonSubmit');
    editUserButtonSubmit.click();
  };

  return (
    <>
      <div className="w-fit flex justify-center items-center" onClick={handleOpenOrCloseModal}>
        <button className="flex gap-4 rounded bg-secondary text-white items-center max-w-fit h-10 px-4">
          <div className="grid place-content-center bg-white rounded-full w-5 h-5">
            <FontAwesomeIcon icon={faCirclePlus} className="h-7 text-primary" />
          </div>
          Editar
        </button>
      </div>

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
                className="text-xl  text-center  self-center font-medium leading-normal text-neutral-800 dark:text-neutral-200"
                id="exampleModalScrollableLabel"
              >
                Editar usuario
              </h5>
              {/*<!--Close button-->*/}
              <button
                type="button"
                onClick={handleOpenOrCloseModal}
                className="focus:outline-none float-right text-xl font-black leading-none text-neutral-700 dark:text-neutral-200"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>

            <EditUserForm userId={userId} setIsSuccess={setIsSuccess} clearFormData={handleOpenOrCloseModal} />

            {/*<!--Footer-->*/}
            <div className="flex justify-end items-center bg-neutral-50 dark:bg-neutral-900 p-4 rounded-b-md">
              {isSuccess ? (
                <div className="flex gap-2 items-center">
                  <FontAwesomeIcon icon={faEnvelopeCircleCheck} className="text-primary" />
                  <span className="text-primary">Usuario editado exitosamente</span>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={handleEditUser}
                  className="bg-primary py-2 px-4 text-neutral-50 rounded hover:bg-primary-dark transition duration-200"
                >
                                        <Link to={`/admin/users/edit/${user.id}`} onClick={() => handleEditUser(user.id)}>
  Guardar cambios
</Link>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditUserModal;