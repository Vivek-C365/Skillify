function Button({ children, className }) {
  return (
    <button
      className={` ${className} bg-black text-white text-[10px] mt-8 p-3 w-[6rem] hover:cursor-pointer hover:transition duration-500 ease-in-out  rounded-3xl `}
    >
      {children}
    </button>
  );
}

export { Button };
