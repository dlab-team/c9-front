const ButtonBase = ({ children, className, onClick }) => {
  return (
    <button
      className={`flex items-center rounded-md gap-2 px-4 py-1 text-sm sm:text-base font-medium w-fit ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default ButtonBase;
