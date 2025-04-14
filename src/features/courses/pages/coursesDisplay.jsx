import Data from "../../../services/api/courseData.json";
import CardWithImage from "../../../components/common/CardWithImage";
import Sidebar from "../../../components/common/Sidebar";
import { Button } from "../../../components/common/button";
import HeartOutlined from "@ant-design/icons/HeartOutlined";
import SafetyCertificateFilled from "@ant-design/icons/SafetyCertificateFilled";
import CalendarOutlined from "@ant-design/icons/CalendarOutlined";

const CoursesDisplay = () => {
  const menuItems = Data.categories.map((course, index) => ({
    key: String(index + 1),
    label: course.title,
  }));

  const CourseLayout = (props) => {
    return (
      <div className="profile-card flex flex-col gap-3">
        <div className="flex justify-between items-center gap-2">
          <div className="flex items-center gap-2">
            <img
              className="w-12 rounded-full aspect-square object-cover"
              src="https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt={props.name}
            />
            <div>
              <div className="name font-semibold text-[16px]">{props.name}</div>
              <div className="lessons flex gap-2">
                <span>
                  <CalendarOutlined />
                </span>
                <span className="text-[--primary]">{props.lessons} Lessons</span>
              </div>
            </div>
          </div>
          <div className="flex gap-2 ">
            <SafetyCertificateFilled
              fill="#C3DEB7"
              className="cursor-pointer"
              style={{ fontSize: "20px" }}
            />
            <HeartOutlined
              className="cursor-pointer "
              style={{ fontSize: "20px" }}
            />
          </div>
        </div>
        <div className="languages text-[16px]">
          Speaks: {props.language}{" "}
          <span className="bg-[#C3DEB7] p-0.5 px-3 rounded-full">
            {props.proficiency}
          </span>{" "}
          <span className="bg-[#E2E1D9] p-0.5 px-3 rounded-full">
            +{props.additional_languages}
          </span>
        </div>
        <div className="bio">{props.description}</div>
        <div className="flex justify-between items-center">
          <div className="flex flex-col">
            Hourly rate from
            <span className="font-bold text-[16px]">{props.hourly_rate}</span>
          </div>
          <Button className="!bg-[#2C2928] text-[14px] w-fit px-5 py-2 !m-0  ">
            Book lesson
          </Button>
        </div>
      </div>
    );
  };

  const DetailCourse = Data.categories.map((course) =>
    course.courses.map((course, index) => (
      <CardWithImage
        key={index}
        image={course.image_url}
        imageStyle={"object-cover p-3 max-h-[13rem] "}
        children={<CourseLayout {...course} />}
      />
    ))
  );

  return (
    <div className="flex flex-col md:flex-row gap-4">
      <Sidebar menuItems={menuItems} />
      <div className="flex  flex-wrap justify-center  w-full md:flex-row gap-4 p-4 md:p-8">
        {DetailCourse}
      </div>
    </div>
  );
};

export default CoursesDisplay;
