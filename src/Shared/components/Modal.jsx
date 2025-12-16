import ReactDOM from "react-dom";
import { useImperativeHandle } from "react";

function Modal({ isModalOpen, setIsModalOpen, children }) {
  if (!isModalOpen) return null;
  const content = (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={() => setIsModalOpen(false)}
    >
      <div
        className={`fixed inset-0 bg-black/40 z-10 transition-opacity duration-500 ${
          isModalOpen ? "opacity-100" : "opacity-0"
        }`}
      ></div>
      <div
        className="relative z-10 w-full max-w-md rounded-xl bg-white p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {children ?? <h2 className="text-xl font-semibold">Sample Modal</h2>}
      </div>
    </div>
  );
  return (
    isModalOpen &&
    ReactDOM.createPortal(content, document.getElementById("modal-hook"))
  );
}

export default Modal;
