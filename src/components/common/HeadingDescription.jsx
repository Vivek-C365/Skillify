

export default function HeadingDescription({children,contentPosition}) {
  return (
    <h3 className={`text-black text-3xl mx-auto  ${contentPosition==="center" ? "text-center" : "text-"} max-w-[40rem] mb-5`}>
      {children}
    </h3>
  )
}
