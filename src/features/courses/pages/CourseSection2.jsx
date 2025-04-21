import Platform1 from "../../../assets/images/Platform1.jpg";
import Platform2 from "../../../assets/images/Platform2.jpg";
import CourseSection2Item from "../../../components/common/CourseSection2Item";
import {
  HeadingDescriptionText,
  HeadingDescription,
} from "../../../components/common/HeadingDescriptionText";
import TagSingle from "../../../components/common/TagSingle";
// import page_img1 from "../assets/page_img1.jpg";
// import page_img2 from "../assets/page_img2.jpg";

export default function CourseSection2() {
  const PLatformCard = ({ images, content, styleclass }) => {
    return (
      <div
        className={` ${styleclass} right-section flex flex-wrap  gap-5 justify-center items-center  m-5 `}
      >
        <div className=" relative max-w-72">
          <img
            className="w-full h-full object-cover rounded-2xl"
            src={images}
          />

          {content}
        </div>
      </div>
    );
  };

  return (
    <>
      {/* Platform Section */}
      <div className="flex flex-wrap items-center justify-evenly mx-auto">
        <div className="left-section max-w-[30rem] m-5 p-3 ">
          <HeadingDescription className="!text-[var(--color-primary-blue);] font-semibold">
            On our platform you will find a wide range of online courses
          </HeadingDescription>
          <h6 className="text-[1rem] text-[var(--secondry-text-Lightblue)] mt-6 mx-auto mr-2 text-justify mb-6">
            We offer the highest quality education resources an individual
            approach to each student and modern technologies to make learning
            accessible & effective
          </h6>
          <TagSingle textContent={"Learn More"} />
        </div>
        <div className="flex flex-wrap  gap-1 justify-center items-center  m-5 ">
          <PLatformCard
            images={Platform1}
            content={
              <div className="absolute bottom-3 p-2 bg-white left-3 rounded-2xl">
                <p className="text-[1rem] rounded-2xl">Business & Finance</p>
                <h6 className="text-[0.7rem] text-[var(--secordry-text-gray)] mt-1">Financial Literacy</h6>
              </div>
            }
          />
          <PLatformCard
            styleclass="!hidden sm:!block"
            images={Platform2}
            content={
              <div className="flex absolute flex-col gap-1.5 h-full justify-end bottom-5 left-2">
                <CourseSection2Item>Business & technology</CourseSection2Item>
                <CourseSection2Item>Science & Education</CourseSection2Item>
              </div>
            }
          />
        </div>
      </div>
    </>
  );
}
