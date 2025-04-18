import { useState } from "react";
import Data from "../../../services/api/courseData.json";
import CardWithImage from "../../../components/common/CardWithImage";
import { Button } from "../../../components/common/button";
import HeartOutlined from "@ant-design/icons/HeartOutlined";
import SafetyCertificateFilled from "@ant-design/icons/SafetyCertificateFilled";
import CalendarOutlined from "@ant-design/icons/CalendarOutlined";
import SearchIcon from "../../../components/common/searchIcon";
import DropDown from "../../../components/common/DropDown";
import ActiveLink from "../../../components/common/ActiveLink";
import PaginationLaoyut from "../../../components/common/Pagination";
import CarouselLayout from "../../../components/common/carousel ";
import ModalPage from "../../../components/common/Modal";

const CoursesDisplay = () => {
  const [courseSelect, setCourseSelect] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(3);

  const menuItems = Data.categories.map((item) => {
    return item;
  });

  const FilterCourse = (menuItems) => {
    if (!courseSelect || courseSelect === "All") return menuItems;
    return menuItems.filter((item) => {
      return item.title === courseSelect;
    });
  };

  const lastCourse = currentPage * postsPerPage;
  const firstCourse = lastCourse - postsPerPage;

  const allFilteredCourses = FilterCourse(menuItems).flatMap(
    (item) => item.courses
  );

  const currentCourse = allFilteredCourses.slice(firstCourse, lastCourse);

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
                <span className="text-[--primary]">
                  {props.lessons} Lessons
                </span>
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
          <Button className="!bg-[#2C2928] text-[14px] w-fit px-5 py-2 !m-0 hover:!bg-[#181817]  ">
            Book lesson
          </Button>
        </div>
      </div>
    );
  };

  const DetailCourse = currentCourse.map((course, index) => (
    <CardWithImage
      key={index}
      image={course.image_url}
      imageStyle={"object-cover p-3 max-h-[13rem] "}
      children={<CourseLayout {...course} />}
    />
  ));

  return (
    <div className="flex flex-col gap-4 bg-[#F8F8F6]">
      <div className="flex flex-col sm:flex-row items-center gap-5 p-5 sm:px-15 justify-between">
        <h1 className=" text-4xl sm:text-5xl text-[var(--color-primary-blue)] font-semibold">
          Find your own Way
        </h1>

        <div className="flex justify-center items-center gap-3">
          <DropDown
            items={menuItems.map((item) => ({
              key: item.title,
              label: item.title,
            }))}
            onSelect={(value) => [setCourseSelect(value), setCurrentPage(1)]}
            triggerContent={courseSelect ? courseSelect : "Select Your Course"}
            className="cursor-pointer bg-white sm:hidden text-gray-500 text-sm font-semibold  border border-gray-300 rounded-full p-2 hover:bg-gray-100 hover:text-gray-900 transition-colors duration-300"
          />
          <ModalPage icon={"Search"} />
        </div>
      </div>
      <div className="flex sm:p-7">
        <div className="sidenav rounded-2xl bg-white  p-3 gap-4 w-full  hidden sm:flex sm:flex-col max-w-max">
          {menuItems.map((item, index) => (
            <ActiveLink
              key={index}
              to={item.link}
              activeClassName="bg-[#e9e3fc]"
              className=" text-[14px] sm:text-[18px] w-full  py-2 px-4 rounded-2xl hover:bg-[var(--color-medium-green)]"
              onClick={() => [setCourseSelect(item.title), setCurrentPage(1)]}
            >
              {item.title}
            </ActiveLink>
          ))}
        </div>

        <div className="flex flex-col w-full gap-8">
          <div className="flex flex-wrap justify-center sm:hidden  w-full md:flex-row gap-4 p-4 pt-0 md:p-8 md:pt-0">
            <CarouselLayout contentList={DetailCourse} />
          </div>
          <div className=" hidden sm:flex  flex-wrap justify-start  w-full md:flex-row gap-4 p-4 pt-0 md:p-8 md:pt-0">
            {DetailCourse}
          </div>
          <div className="flex justify-center sm:justify-end mb-3">
            <PaginationLaoyut
              totalitems={allFilteredCourses.length}
              itemsPerPage={postsPerPage}
              pageSize={postsPerPage}
              onChange={(page) => setCurrentPage(page)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursesDisplay;
