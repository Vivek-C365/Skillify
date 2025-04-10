import BiggerText from "./common/BiggerText";
import TagGroup from "./common/TagGroup";

const ContentSection = ({
  reverse = false,
  leftContent,
  rightContent,
  biggerText,
  actionText = "explore",
  
  tags,
}) => {
  return (
    <div
      className={`flex flex-wrap ${reverse ? "!flex-row-reverse" : ""} items-center mb-3.5  justify-evenly`}
    >
      <div className="text-center md:text-left">
        {tags && <TagGroup tags={tags} />}
        {leftContent && (
          <div className="hidden   sm:block mt-2 primary-text text-center md:text-left max-w-md">
            {leftContent}
          </div>
        )}
      </div>

      <div className="flex flex-row-reverse  items-center md:flex-row md:items-center ">
        {biggerText && (
          <div className="flex flex-col items-center justify-center primary-text">
            <BiggerText text={biggerText} />
          </div>
        )}

        {rightContent || (
          <div>
            <span className=" !hidden text-lg bg-white p-8 !h-auto center-circle sm:!inline-flex  md:text-xl lg:text-2xl">
              {actionText}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContentSection;
