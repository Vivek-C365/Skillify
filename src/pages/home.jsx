import { useRef } from "react";
import Navbar from "../components/navbar/index";
import ContentSection from "../components/common/ContentSection";
import Cards from "../components/common/card";
import { responsiveFlex } from "../styles/responsiveFlex";
import { Suspense, lazy } from "react";
const CourseSection2 = lazy(() =>
  import("../features/courses/pages/CourseSection2")
);
const CoursesDisplay = lazy(() =>
  import("../features/courses/pages/coursesDisplay")
);
const Testimonials = lazy(() => import("../components/common/Testimonials"));
import Footer from "../components/common/Footer";

import {
  responsiveTextH6,
  responsiveTextBodyLarge,
  responsiveTextH1,
} from "../styles/responsiveText";
import ProgressBar from "../components/common/ProgressBar";
import { AvatarGroup } from "../components/common/AvatarGroup";
import CountingNumber from "../components/common/CountingNumber";
import { StatCardSkeleton } from "../components/common/Skeleton";

const Home = () => {
  const sectionRef = useRef(null);

  const handleScroll = () => {
    sectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

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
      rightContent: (
        <div className="hidden sm:flex items-center justify-center w-full h-full">
          <div
            className="relative flex items-center"
            style={{ minWidth: "320px", minHeight: "80px" }}
          >
            <div className="bg-white rounded-2xl shadow-md flex flex-col justify-center px-6 py-15 w-[260px] h-[90px] relative z-10">
              <div className="relative aspect-square  w-6 h-6 bg-black flex items-center justify-center rounded-full shadow text-white text-xs">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10 14V6M10 6L6 10M10 6L14 10"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-black text-lg font-medium">
                  Active Now
                </span>
                <span className="text-black text-base font-semibold">47%</span>
              </div>
              <div className="flex items-center w-full">
                <div className="w-full bg-[#E5D8FF] rounded-full h-1.5">
                  <div
                    className="bg-[#BAB2E7] h-1.5 rounded-full transition-all duration-300"
                    style={{ width: "47%" }}
                  ></div>
                </div>
              </div>
            </div>
            <div className="absolute -right-12 top-1/2 -translate-y-1/2 z-20">
              <AvatarGroup />
            </div>
          </div>
        </div>
      ),
    },
    {
      leftContent:
        "we offer the highest quality educational resources to make learning accessible",
      biggerText: "EdTech",
      tags: [
        { text: "Get started", onClick: handleScroll },
        {
          icon: true,
          bgColor: "transparent",
          rotate: "rotate-90",
          item: <>&#8599;</>,
        },
      ],
    },
    {
      reverse: true,
      leftContent: (
        <Cards
          children={
            <>
              <div className="flex">
                <div className="w-full h-full">
                  <img
                    src="https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80"
                    alt="work"
                  />
                </div>
                <div className="p-4 flex flex-col h-full">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-[var(--color-light-lavender)] text-[var(--color-dark-lavender)] text-xs font-semibold px-2 py-1 rounded-full">
                      E-COURSES
                    </span>
                  </div>
                  <h3 className="font-semibold text-[var(--color-charcol-black)] text-base mb-2 leading-tight">
                    Professional development, project management
                  </h3>
                  <div className="flex items-center gap-2 mt-auto text-xs text-[var(--secondry-text-Lightblue)]">
                    <span className="inline-block w-4 h-4 rounded-full bg-[var(--color-light-lavender)] flex items-center justify-center">
                      <svg
                        width="12"
                        height="12"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                      </svg>
                    </span>
                    36 hours
                  </div>
                </div>
              </div>
            </>
          }
        />
      ),
      biggerText: "Solutions",
      actionText: <>&#8618;</>,
    },
  ];

  const smallAboutus = [
    {
      text: (
        <div className="flex items-center">
          +<CountingNumber maxnumber={80} timer={20} />
        </div>
      ),
      description: "Online Courses",
    },
    {
      text: <CountingNumber maxnumber={10} timer={100} />,
      description: "Years Experience",
    },
    {
      text: <CountingNumber maxnumber={77} timer={20} />,
      description: "Top Mentors",
    },
  ];
  const achieveData = [
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/e13888bfb8ff08a67b95eba8721ce071e86065d8c550324be1f8e29697d2a586?apiKey=c0bca91966db4095b1e1b5a08f720e3b&",
      title: "Learn latest skills",
      description:
        "Learn new skills like Project management, AWS, Security or anything that matters to you in your industry. New skills translate to new opportunities.",
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/dadc5fed5ab197a2a006bfe7ff4adff495f7aa0fa76bc36478d2b47884aa3ace?apiKey=c0bca91966db4095b1e1b5a08f720e3b&",
      title: "Upgrade your skills",
      description:
        "Upskill your current skillsets to the latest trends, developments or new versions. Stay at fore-front, current and relevant in the ever changing world of skills.",
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/54ecde977ac2e1733aa3a7c80783b77c22b9fa098996ce3882be83159defd4a7?apiKey=c0bca91966db4095b1e1b5a08f720e3b&",
      title: "Further your career",
      description:
        "Don't let your previous skills become the bottleneck of your career growth in today's fast-changing skill demands. Upgrade your skills today.",
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/d998ce4a1565c48cb9d7f2c33948f0574978643c665ed8c55d69172b6177fbec?apiKey=c0bca91966db4095b1e1b5a08f720e3b&",
      title: "Upskill your team",
      description:
        "With our tailored training approaches, give your team the latest skillsets needed for the optimum productivity; stay ahead of the competition.",
    },
  ];

  return (
    <div>
      <div className="lavender-background">
        <Navbar />
        <div>
          <div className="p-4 md:p-8 ">
            {sections.map((section, index) => (
              <ContentSection
                key={index}
                reverse={section.reverse}
                leftContent={section.leftContent}
                rightContent={section.rightContent}
                biggerText={section.biggerText}
                tags={section.tags}
                actionText={section.actionText}
              />
            ))}
          </div>
        </div>
      </div>

      <div
        className={` ${responsiveFlex}  bg-[var(--color-charcol-black);] text-white p-6  md:p-8 gap-4 md:gap-8`}
      >
        <div className="w-full md:w-1/2 flex flex-col gap-4 md:gap-8">
          <div>
            <h1 className={` text-3xl ${responsiveTextH1} sm:!text-5xl `}>
              About us
            </h1>
          </div>
          <div className={` ${responsiveFlex}`}>
            <div className={`${responsiveFlex} !flex-row gap-10`}>
              {smallAboutus.map((item, index) => (
                <div className="flex flex-col items-center" key={index}>
                  <span
                    className={` !text-2xl  ${responsiveTextH6} text-[var(--color-dark-lavender)]  `}
                  >
                    {item.text}
                  </span>
                  <p className="flex text-[13px] sm:text-[18px] text-center">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/2">
          <p
            className={`  ${responsiveTextBodyLarge} text-center sm:text-left `}
          >
            At skillify, we offer comprehensive English language courses
            tailored to your personal and professional growth. Whether you're a
            beginner or seeking advanced fluency. our dynamic lessons will help
            you speak, write, and understand English with confidence.
          </p>
        </div>
      </div>

      <section className="achieve_section my-4">
        <div className="content_wrapper">
          <div className="title_wrapper">
            <h2 className="title flex gap-2 ">
              <span className="title-primary text-3xl sm:text-5xl text-[var(--color-primary-blue);]">
                Achieve with{" "}
              </span>
              <span className="title-secondary text-3xl sm:text-5xl text-[var(--color-dark-lavender)]">
                {" "}
                Skillify
              </span>
            </h2>
          </div>
          <div className="achieve_items_wrapper">
            {achieveData?.map((item, index) => (
              <div className="achieve_item" key={index}>
                <div className="icon_wrapper">
                  <img src={item.icon} alt="" />
                </div>
                <h3 className="achieve_title text-[var(--color-primary-blue);]">
                  {item.title}
                </h3>
                <p className="achieve_description  text-[var(--secondry-text-Lightblue)]">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider"></div>

      <CourseSection2 />

      <Suspense fallback={<StatCardSkeleton />}>
        <div className="CourseDisplay" ref={sectionRef}>
          <CoursesDisplay />
        </div>

        <Testimonials />
      </Suspense>

      <Footer />
    </div>
  );
};

export default Home;
