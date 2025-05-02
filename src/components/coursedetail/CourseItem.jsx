export default function CourseItem({ icon, children, onClick, className = "" }){

  return (
  <li 
    className={`p-2 flex gap-1 items-baseline bg-[#FCCC41] text-[12px] md:rounded-xl md:text-[14px] ${className}`}
    onClick={onClick}
  >
    {icon && <span>{icon}</span>}
    {children}
  </li>
  );

}