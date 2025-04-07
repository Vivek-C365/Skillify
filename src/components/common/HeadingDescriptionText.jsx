
export default function HeadingDescriptionText({children, textCase}) {
  
  return (
    <h3 className={`text-gray-500 mx-auto text-center max-w-[530px] ${textCase=="upper" ? "uppercase" : "normal-case"} mb-6`}>
      {children}
    </h3>
  )
}
