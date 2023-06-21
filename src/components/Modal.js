function Modal({ children, onClose }) {
  return (
    <div
      className="w-full h-full absolute top-0 left-0 col justify-center items-center bg-cornflower-blue/30 z-30"
      role="presentation"
      onClick={onClose}
    >
      {children}
    </div>
  );
}

export default Modal;
