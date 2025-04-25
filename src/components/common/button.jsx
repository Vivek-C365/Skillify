function Button({ children, className  , onClick}) {
  return (
    <button
      onClick={onClick}
      className={` ${className} bg-black text-white text-[10px]  p-3 w-[6rem] hover:cursor-pointer hover:transition duration-500 ease-in-out  rounded-3xl `}
    >
      {children}
    </button>
  );
}

export { Button };
