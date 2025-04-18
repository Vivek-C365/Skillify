import { useEffect, useRef } from "react";
import BiggerText from "./BiggerText";
import TagGroup from "./TagGroup";
import gsap from "gsap";

const ContentSection = ({
  reverse = false,
  leftContent,
  rightContent,
  biggerText,
  actionText = "explore",
  tags,
}) => {
  const circleRef = useRef(null);
  const leftContentRef = useRef(null);
  const biggerTextRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

    if (circleRef.current) {
      tl.from(circleRef.current, {
        x: 300,
        opacity: 0,
        scale: 0.5,
        duration: 0.8,
        rotate: 360,
      });
    }

    if (leftContentRef.current) {
      tl.from(
        leftContentRef.current,
        {
          x: reverse ? 50 : -50,
          opacity: 0,
          duration: 0.6,
        },
      );
    }

    if (biggerTextRef.current) {
      tl.from(
        biggerTextRef.current,
        {
          y: 30,
          opacity: 0,
          duration: 0.7,
        },
      );
    }

    return () => tl.kill();
  }, [reverse]);

  return (
    <div
      className={`flex flex-wrap ${reverse ? "!flex-row-reverse" : ""} items-center mb-3.5 justify-evenly`}
    >
      <div className="text-center md:text-left" ref={leftContentRef}>
        {tags && <TagGroup tags={tags} />}
        {leftContent && (
          <div className="hidden sm:block mt-2 primary-text text-center md:text-left max-w-md">
            {leftContent}
          </div>
        )}
      </div>

      <div className="flex flex-row-reverse items-center md:flex-row md:items-center">
        {biggerText && (
          <div
            className="flex flex-col items-center justify-center primary-text"
            ref={biggerTextRef}
          >
            <BiggerText text={biggerText} />
          </div>
        )}

        {rightContent || (
          <div>
            <span
              ref={circleRef}
              className="!hidden text-lg bg-white p-8 !h-auto center-circle sm:!inline-flex md:text-xl lg:text-2xl"
            >
              {actionText}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContentSection;