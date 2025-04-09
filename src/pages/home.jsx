import Navbar from '../components/navbar'
import ContentSection from '../components/ContentSection'
import Cards from '../components/common/card'
import { responsiveFlex } from '../styles/responsiveFlex'
import img1 from '../assets/img1.jpg'
import { responsiveImage } from '../components/common/responsiveImage'
import CourseSection2 from './CourseSection2'

import {
  responsiveTextH3,
  responsiveTextH6,
  responsiveTextBodyLarge,

} from '../styles/responsiveText'
import HeadingDescriptionText from '../components/common/HeadingDescriptionText'

import CoursesDisplay from "../components/coursesDisplay";
import SearchIcon from "../components/common/searchIcon"


const Home = () => {
  const CardContent = ({ tags }) => {
    return (
      <Cards className="max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl">
        <div className={responsiveFlex}>
          <div className="max-w-sm">
            <h3 className={responsiveTextH3}>{tags}</h3>
            <p className={responsiveTextBodyLarge}>
              Unlock your full potential with our personalized learning
              experience.
            </p>
          </div>
        </div>
      </Cards>
    );
  };

  const sections = [
    {
      leftContent:
        'Personalized recommendations for each student, based on their learning style and preferences.',
      biggerText: 'Simple',
      tags: [
        { icon: true, text: 'advantage', item: '#' },
        { icon: true, bgColor: 'transparent', item: '#' },
        {
          icon: true,
          item: '#',
          bgColor: 'transparent',
          iconColor: 'border border-white primary-text',
        },
      ],
    },
    {
      reverse: true,
      biggerText: 'Powerful',
      rightContent: <Cards>Card Content</Cards>,

    },
    {
      leftContent:
        'we offer the highest quality educational resources to make learning accessible',
      biggerText: 'EdTech',
      tags: [
        { text: 'Get started' },
        { icon: true, bgColor: 'transparent', item: <>&#8599;</> },
      ],
    },
    {
      reverse: true,
      leftContent: <Cards />,
      biggerText: 'Solutions',

    },
  ]

  const smallAboutus = [
    {
      text: '+80',
      description: 'Online Courses',
    },
    {
      text: '10',
      description: 'Years Experience',
    },
    {
      text: '77',
      description: 'Top Mentors',
    },
  ]

  // console.log(sections[3]);

  return (
    <div>
      <div className="lavender-background">
        <Navbar />

        {/* Main Top Content */}
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

      {/* About Us */}

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

      <div className={`text-black p-6  md:p-8 gap-4 md:gap-8`}>
        <div className="max-w-[1200px] flex flex-col md:gap-8 m-auto justify-center items-center ">
          <div>
            <p className={`${responsiveTextH3} text-center`}>
              {' '}
              Digital education is a key{' '}
            </p>
            <p className={`${responsiveTextH3} text-center`}>
              {' '}
              to your future success
            </p>
            <div className="text-center w-4 rounded-full h-1 bg-indigo-500 mx-auto mt-2 mb-2"></div>
            <HeadingDescriptionText>On our platform you will find the largest selection pf IT courses
              that will
              help you develop skills and gain new knowledge in this area.</HeadingDescriptionText>

            <div className={`w-[500px] h-[600px] mx-auto mb-[-100px]`}>
              <img
                className={`${responsiveImage}`}
                src={img1}
                alt="this is image 1"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
        <CourseSection2/>

    </div>
  )
}

export default Home
