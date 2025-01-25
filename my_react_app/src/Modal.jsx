import canselImage from './assets/cancel.svg'

const Modal = ({ children, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg relative">
        <img
          src={canselImage}
          alt="cansel"
          className="absolute top-1 right-1 cursor-pointer hover:bg-gray-100 rounded p-1 transition duration-700"
          onClick={onClose}
        />
        {children}
      </div>
    </div>
  );
};

export default Modal;
