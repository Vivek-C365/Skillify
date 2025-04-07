import TagGroup from "./TagGroup"

export default function TagSingle({textContent,position}) {
  const tags = [
    { text: textContent, bgColor: 'bg-black', 
         textColor: 'text-white',},
    { icon: true, item: <>&#8599;</> },
  ]

  return (
    <TagGroup tags={tags} position={position} />
  )
}
