import desc_img1 from '../assets/desc_img1.jpg'
import desc_img2 from '../assets/desc_img2.jpg'
import CourseSection2Item from '../components/common/CourseSection2Item'
import HeadingDescription from '../components/common/HeadingDescription'
import HeadingDescriptionText from '../components/common/HeadingDescriptionText'
import TagSingle from '../components/common/TagSingle'
import page_img1 from "../assets/page_img1.jpg"
import page_img2 from "../assets/page_img2.jpg"

export default function CourseSection2() {
  return (
    <>
      <div
        className={`max-w-[80rem] max-h-[50rem] flex flex-row justify-evenly mx-auto`}
      >
        <div className="left-section max-w-[25rem] m-5 p-12 ">
          <HeadingDescription>
            On our platform you will find a wide range of online courses
          </HeadingDescription>
          <h6 className="text-[1rem] mt-6 mx-auto mr-2 text-justify mb-6">
            We offer the highest quality education resources an individual
            approach to each student and modern technologies to make learning
            accessible & effective
          </h6>
          <TagSingle textContent={'Learn More'} />
        </div>
        <div className="right-section max-w-[40rem] flex flex-row p-12">
          <div className="div-img1 w-[20rem] h-[20rem] relative">
            <img
              className="w-full h-full object-cover rounded-3xl"
              src={desc_img1}
            />
            <div className="absolute bottom-3 p-2 bg-white left-3 rounded-2xl">
              <p className="text-[1rem] rounded-2xl">Business & Finance</p>
              <h6 className="text-[0.7rem] mt-1">Financial Literacy</h6>
            </div>
          </div>
          <div className="div-img2 w-[20rem] h-[20rem] bg-emerald-100 flex items-center rounded-3xl relative">
            <div className="w-[12rem] h-[12rem] m-auto rounded-3xl">
              <img
                className="w-full h-[12rem] object-cover items-center rounded-3xl"
                src={desc_img2}
              />
            </div>
            <div className="flex absolute flex-col gap-1.5 h-full justify-end bottom-5 left-2">
              <CourseSection2Item>Business & technology</CourseSection2Item>
              <CourseSection2Item>Science & Education</CourseSection2Item>
            </div>
          </div>
        </div>
      </div>

      <HeadingDescriptionText textCase="upper">
        This is just a small overview
      </HeadingDescriptionText>
      <div className=" relative max-w-[50rem] mx-auto ">
        <div className='absolute w-[5rem] h-[3rem] right-2 top-[-2.2rem] z-[1] rounded-2xl'>
         <img className='w-full h-full object-cover rounded-xl' src={page_img1} />
        </div>
        <div className='absolute w-[5rem] h-[3rem] bottom-2 left-2  rounded-2xl'>
          <img  className="w-full h-full object-cover rounded-xl" src={page_img2} alt='this is page2' />
        </div>
        <HeadingDescription contentPosition="center">
          You will find many more interesting and relevant courses that will
          help you develop skills and gain knowledge in areas that interest you
        </HeadingDescription>
        <TagSingle textContent={'Go to Courses'} position={'center'} />
      </div>
    </>
  )
}
