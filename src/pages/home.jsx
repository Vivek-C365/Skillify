import Navbar from "../components/navbar";
import ContentSection from "../components/ContentSection";
import Cards from "../components/common/card";
import { responsiveFlex } from "../styles/responsiveFlex";
import {
  responsiveTextH3,
  responsiveTextH6,
  responsiveTextBodyLarge,
} from "../styles/responsiveText";

const Home = () => {
  const sections = [
    {
      leftContent:
        "Personalized recommendations for each student, based on their learning style and preferences.",
      biggerText: "Simple",
      tags: [
        { icon: true, text: "advantage", item: "#" },
        { icon: true, bgColor: "transparent", item: "#" },
        {
          icon: true,
          item: "#",
          bgColor: "transparent",
          iconColor: "border border-white primary-text",
        },
      ],
    },
    {
      reverse: true,
      biggerText: "Powerful",
      rightContent: <Cards />,
    },
    {
      leftContent:
        "we offer the highest quality educational resources to make learning accessible",
      biggerText: "EdTech",
      tags: [
        { text: "Get started" },
        { icon: true, bgColor: "transparent", item: <>&#8599;</> },
      ],
    },
    {
      reverse: true,
      leftContent: <Cards />,
      biggerText: "Solutions",
    },
  ];

  const smallAboutus = [
    {
      text: "+80",
      description: "Online Courses",
    },
    {
      text: "10",
      description: "Years Experience",
    },
    {
      text: "77",
      description: "Top Mentors",
    },
  ];

  return (
    <div>
      <div className="lavender-background">
        <Navbar />

        <div className="p-4 md:p-8">
          {sections.map((section, index) => (
            <ContentSection
              key={index}
              reverse={section.reverse}
              leftContent={section.leftContent}
              rightContent={section.rightContent}
              biggerText={section.biggerText}
              tags={section.tags}
            />
          ))}
        </div>
      </div>

      <div
        className={` ${responsiveFlex} bg-[var(--color-charcol-black);] text-white p-6  md:p-8 gap-4 md:gap-8`}
      >
        <div className="w-full md:w-1/2 flex flex-col gap-4 md:gap-8">
          <div>
            <h1 className={responsiveTextH3}>About us</h1>
          </div>
          <div className={` ${responsiveFlex}`}>
            <div className={`${responsiveFlex} !flex-row gap-10`}>
              {smallAboutus.map((item, index) => (
                <div key={index}>
                  <span
                    className={` ${responsiveTextH6} text-[var(--color-dark-lavender)]  `}
                  >
                    {item.text}
                  </span>
                  <p className="">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/2">
          <p className={responsiveTextBodyLarge}>
            At skillify, we offer comprehensive English language courses
            tailored to your personal and professional growth. Whether you're a
            beginner or seeking advanced fluency. our dynamic lessons will help
            you speak, write, and understand English with confidence.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
