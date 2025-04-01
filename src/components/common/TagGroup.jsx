const TagGroup = ({ tags }) => {
  return (
    <div className="flex flex-wrap justify-center md:justify-start items-center">
      {tags.map((tag, index) => (
        <div
          key={index}
          className={`flex ${
            tag.bgColor || "bg-white"
          } rounded-full p-1 items-center`}
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
          {tag.text && <p className="p-1 px-2">{tag.text}</p>}
        </div>
      ))}
    </div>
  );
};

export default TagGroup;
