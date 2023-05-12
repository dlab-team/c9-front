const ButtonBase = ({ children, className, onClick }) => {
  return (
    <button
      className={`flex items-center rounded-md gap-4 px-4 py-1 sm:text-lg font-medium w-fit ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default ButtonBase;
