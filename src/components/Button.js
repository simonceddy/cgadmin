function Button({ children, disabled = false, onClick }) {
  return (
    <button
      className={`border-2 border-black ${disabled ? '' : 'hover:border-cornflower-blue active:border-pastel-green'} p-2 rounded-md m-2 relative`}
      type="button"
      disabled={disabled}
      onClick={onClick}
    >
      {children}
      {disabled && <span className="absolute bg-white/50 top-0 left-0 w-full h-full rounded-md" />}
    </button>
  );
}

export default Button;
