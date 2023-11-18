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
        <div className="modal-box bg-white p-10">
          <p className="text-center">{modalTitle}</p>
          <div className="modal-action">
            <form
              method="dialog"
              className="flex items-center justify-evenly w-full"
            >
              <button
                className="border border-primary rounded-md py-2 px-8 w-fit"
                onClick={() => document.getElementById(modalId).close()}
              >
                Close
              </button>
              <button
                className="bg-primary text-white rounded-md py-2 px-8 w-fit"
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
