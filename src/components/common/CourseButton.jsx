

export default function CourseButton({children,active=false,icon,onClick}) {
  return (
    <button className="p-1.5 md:p-2 text-black border-1 rounded-xl text-[12px] md:text-[14px]" onClick={onClick}  style={{
      background: active ?  "black"  : "white",
      color: active ? "white" : "black",
    }}>
      {icon && <span>{icon}</span>} <span>{children}</span>
    </button>
  )
}
