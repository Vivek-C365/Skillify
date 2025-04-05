const TagGroup = ({ tags, position }) => {
  return (
    <div className={`flex flex-wrap ${position=="center" ? "justify-center" : ""} md:${position == "center" ? "justify-center" : "justify-start"} items-center mb-5`}>
      {tags.map((tag, index) => (
        <div
          key={index}
          className={`flex ${
            tag.bgColor || "bg-white"
          } ${tag.textColor || "text-black"} rounded-full p-1 items-center`}
        >
          {tag.icon && (
            <>
              <p
                className={`${
                  tag.iconColor || "bg-black primary-text"
                } center-circle p-2`}
              >
                {tag.item}
              </p>
            </>
          )}
          {tag.text && <p className='p-1 px-2'>{tag.text}</p>}
        </div>
      ))}
    </div>
  );
};

export default TagGroup;
