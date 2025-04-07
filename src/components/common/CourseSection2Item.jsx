

export default function CourseSection2Item({children}) {
  return (
    <p className="flex z-1 bottom-8 left-0.5 text-black w-[11rem] bg-gray-100 items-center rounded-3xl gap-2 text-[12px]" >
      <div className="w-4 bg-black rounded-full text-white p-3 h-[0.5rem] text-center flex justify-center items-center text-[1rem]">#</div>
      {children}
    </p>
  );
}