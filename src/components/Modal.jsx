import React from "react";

const Modal = ({
  modalId,
  modalText,
  modalTitle,
  modalConfirmText,
  modalConfirmFunction,
}) => {
  const showModal = () => {
    const dialog = document.getElementById(modalId);
    if (dialog) {
      dialog.showModal();
    }
  };

  return (
    <>
      <button onClick={showModal}>
        <div className="flex items-center gap-2 rounded-md hover:bg-emerald-100 w-full">
          {modalText}
        </div>
      </button>
      <dialog id={modalId} className="modal modal-bottom sm:modal-middle">
        <div className="md:w-2/4 w-3/4 bg-white py-6 px-2 rounded-lg absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <p className="text-center">{modalTitle}</p>
          <div className="modal-action">
            <form
              method="dialog"
              className="flex items-center justify-evenly w-full"
            >
              <button
                className="border border-primary rounded-md py-2 px-8 max-w-fit"
                onClick={() => document.getElementById(modalId).close()}
              >
                Close
              </button>
              <button
                className="bg-primary text-white rounded-md py-2 px-8 max-w-fit"
                onClick={modalConfirmFunction}
              >
                {modalConfirmText}
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default Modal;
