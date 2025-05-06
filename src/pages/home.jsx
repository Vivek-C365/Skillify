import { useRef } from "react";
import Navbar from "../components/navbar/index";
import ContentSection from "../components/common/ContentSection";
import Cards from "../components/common/card";
import { responsiveFlex } from "../styles/responsiveFlex";
import { Suspense, lazy } from "react";
const CourseSection2 = lazy(() => import("../features/courses/pages/CourseSection2"));
const CoursesDisplay = lazy(() => import("../features/courses/pages/coursesDisplay"));
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
        <div className="hidden sm:block bg-white rounded-2xl shadow-lg p-4  flex-col max-w-[260px] w-full min-w-[180px] sm:min-w-[220px] relative">
     
            <span className="w-6 h-6 bg-black rounded-full flex items-center justify-center mr-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M12 17V7M12 7L7 12M12 7L17 12" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </span>
          <div className="flex items-center mb-2 relative">
            <span className="text-lg font-medium text-black">Active Now</span>
            <span className="ml-auto text-base font-semibold text-black">47%</span>
          </div>
      
          <div className="w-full h-1 bg-gray-200 rounded-full mt-2 mb-2 overflow-hidden">
            <div className="h-full bg-[#bab2e7] rounded-full" style={{ width: '47%' }}></div>
          </div>
         
          <div className="absolute -right-8 top-1/2 -translate-y-1/2 flex z-20">
            <img src="https://randomuser.me/api/portraits/women/1.jpg" className="w-8 h-8 rounded-full border-2 border-white -ml-2 first:ml-0" alt="avatar1" />
            <img src="https://randomuser.me/api/portraits/men/2.jpg" className="w-8 h-8 rounded-full border-2 border-white -ml-2" alt="avatar2" />
            <img src="https://randomuser.me/api/portraits/women/3.jpg" className="w-8 h-8 rounded-full border-2 border-white -ml-2" alt="avatar3" />
            <div className="w-8 h-8 rounded-full bg-white border-2 border-white -ml-2 flex items-center justify-center text-lg font-bold text-gray-400">+</div>
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
      leftContent: null,
      rightContent: (
        <div className="hidden sm:block bg-white rounded-2xl shadow-lg p-4 flex flex-col max-w-xs w-full min-w-[220px] relative">
          <div className="flex" style={{ gap: '10px' }}>
            <div>
              <div className="rounded-xl overflow-hidden mb-3 w-full flex items-center justify-center bg-gray-100" style={{ height: '28vh', margin: 0 }}>
                <img
                  src="https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=facearea&w=400&q=80"
                  alt="Professional development, project management"
                  className="object-cover w-full h-full min-h-[96px]"
                />
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-bold text-gray-500 tracking-widest flex items-center gap-1">
                  <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><rect width="16" height="16" rx="4" fill="#F3F3F3" /><circle cx="8" cy="8" r="2" fill="#BAB2E7" /><circle cx="12" cy="8" r="2" fill="#BAB2E7" /><circle cx="8" cy="12" r="2" fill="#BAB2E7" /><circle cx="12" cy="12" r="2" fill="#BAB2E7" /></svg>
                  E-COURSES
                </span>
              </div>
              <div className="flex-1">
                <h3 className="text-base font-semibold text-gray-900 mb-1 leading-tight">
                  Professional development, project management
                </h3>
              </div>
              <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><path fill="currentColor" d="M12 8a1 1 0 0 1 1 1v3.28l2.4 1.44a1 1 0 1 1-1 1.72l-2.8-1.68A1 1 0 0 1 11 13V9a1 1 0 0 1 1-1Z" /><path fill="currentColor" fillRule="evenodd" d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10Zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z" clipRule="evenodd" /></svg>
                <span>36 hours</span>
              </div>
              <button className="absolute w-6 h-6 rounded-full bg-white border border-gray-200 flex items-center justify-center text-lg font-bold text-gray-400 shadow hover:bg-gray-100 transition" style={{ left: '21px', bottom: '20px' }}>+</button>
            </div>
          </div>
        </div>
      ),
      biggerText: (
        <span className="flex items-center gap-4">
          <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="32" cy="32" r="30" stroke="#E4F1E8" strokeWidth="4" />
            <path d="M24 32H40M40 32L34 26M40 32L34 38" stroke="#E4F1E8" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Solutions
        </span>
      ),
      actionText: <></>,
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
    <div >
      <div className="lavender-background">
        <Navbar />


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

      <Suspense fallback={<div>Loading courses...</div>}>
        <CourseSection2 />
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
