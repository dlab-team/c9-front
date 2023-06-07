const ButtonBase = ({ children, className, onClick, type='button' }) => {
  return (
    <button
      type={type}
      className={`${className} flex items-center rounded-md gap-2 px-4 py-1 text-sm sm:text-base font-medium w-fit`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default ButtonBase;
