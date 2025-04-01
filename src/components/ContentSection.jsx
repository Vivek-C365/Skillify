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
      className={`flex ${reverse ? "!flex-row-reverse" : ""} items-center  justify-evenly`}
    >
      <div className="text-center md:text-left">
        {tags && <TagGroup tags={tags} />}
        {leftContent && (
          <div className="mt-2 primary-text text-center md:text-left max-w-md">
            {leftContent}
          </div>
        )}
      </div>

      <div className="flex flex-col items-center md:flex-row md:items-center gap-9">
        {biggerText && (
          <div className="flex flex-col items-center justify-center primary-text">
            <BiggerText text={biggerText} />
          </div>
        )}

        {rightContent || (
          <div>
            <span className="text-lg bg-white p-8 !h-auto center-circle md:text-xl lg:text-2xl">
              {actionText}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContentSection;
