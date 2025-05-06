import { useState } from "react";
import Data from "../../../services/api/courseData.json";
import CardWithImage from "../../../components/common/CardWithImage";
import { Button } from "../../../components/common/button";
import HeartOutlined from "@ant-design/icons/HeartOutlined";
import SafetyCertificateFilled from "@ant-design/icons/SafetyCertificateFilled";
import CalendarOutlined from "@ant-design/icons/CalendarOutlined";
import DropDown from "../../../components/common/DropDown";
import ActiveLink from "../../../components/common/ActiveLink";
import PaginationLaoyut from "../../../components/common/Pagination";
import ModalPage from "../../../components/common/Modal";
import SearchOutlined from "@ant-design/icons/SearchOutlined";

const CoursesDisplay = () => {
  const [courseSelect, setCourseSelect] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(15);

  const menuItems = Data.categories.map((item) => {
    return item;
  });

  const FilterCourse = (menuItems) => {
    if (!courseSelect || courseSelect === "All") return menuItems;
    return menuItems.filter((item) => {
      return item.title === courseSelect;
    });
  };

  const allFilteredCourses = FilterCourse(menuItems).flatMap(
    (item) => item.courses
  );

  const lastCourse = currentPage * postsPerPage;
  const firstCourse = lastCourse - postsPerPage;

  const currentCourse = allFilteredCourses.slice(firstCourse, lastCourse);

  const CourseLayout = (props) => {
    return (
      <div className="profile-cardc max-w-[18rem] flex flex-col gap-2">
        <div className="flex justify-between items-center gap-2">
          <div className="flex items-center gap-2">
            <img
              className="w-12 hidden sm:block rounded-full aspect-square object-cover"
              src="https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt={props.name}
            />
            <div className="flex sm:flex-col   max-sm:gap-4">
              <div className="name font-semibold max-sm:text-[13px]">
                {props.name}
              </div>
              <div className="lessons  max-sm:text-[10px] flex  jusqtify-center items-center gap-1 text-[var(--secordry-text-gray)]">
                <span>
                  <CalendarOutlined />
                </span>
                <span>{props.lessons} Lessons</span>
              </div>
            </div>
          </div>
          <div className=" gap-2 hidden sm:flex">
            <SafetyCertificateFilled
              fill="#C3DEB7"
              className="cursor-pointer "
              style={{ fontSize: "20px" }}
            />
            <HeartOutlined
              className="cursor-pointer "
              style={{ fontSize: "20px" }}
            />
          </div>
        </div>
        <div className="languages max-sm:text-[10px] text-[16px]">
          Speaks: {props.language}{" "}
          <span className="bg-[#C3DEB7] p-0.5 px-3 rounded-full">
            {props.proficiency}
          </span>{" "}
          <span className="bg-[#E2E1D9] p-0.5 px-3 rounded-full">
            +{props.additional_languages}
          </span>
        </div>
        <div className="bio max-sm:text-[11px] text-[14px] text-[var(--secordry-text-gray)]">
          {props.description}
        </div>
        <div className="flex justify-between items-center ">
          <div className="flex flex-col max-sm:text-[10px] text-[var(--secordry-text-gray)]">
            Hourly rate from:
            <span className="font-bold  max-sm:text-[10px] text-black text-[16px]">
              {props.hourly_rate}
            </span>
          </div>
          <Button className="!bg-[#2C2928] text-[14px] max-sm:rounded-[5px] w-fit max-sm:p-1 px-5 py-2 !m-0 hover:!bg-[#181817] max-sm:text-[11px]  ">
            View Course
          </Button>
        </div>
      </div>
    );
  };

  const DetailCourse = currentCourse.map((course, index) => (
    <CardWithImage
      key={index}
      cardColor={"#ECF5E9"}
      image={course.image_url}
      imageStyle={
        "object-cover   p-3 max-h-[13rem] h-[100%] max-sm:p-1.5 max-sm:max-w-[10rem]  !rounded-2xl "
      }
      children={<CourseLayout {...course} />}
    />
  ));

  const SearchLayout = () => {
    return (
      <div className="">
        <div className="">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for actions, people, instruments"
              className="w-full pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
            <svg
              className="absolute left-3 top-2.5 h-4 w-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </div>
          <p className="text-xs text-gray-500 mt-2 ml-1">I'm looking for...</p>

          <div className="flex mt-3">
            <button className="text-sm font-medium text-gray-800 px-3 py-1 bg-gray-100 rounded-md mr-2">
              Reactions
            </button>
            <button className="text-sm font-medium text-gray-500 px-3 py-1 rounded-md mr-2">
              People
            </button>
            <button className="text-sm font-medium text-gray-500 px-3 py-1 rounded-md">
              Companies
            </button>
          </div>
        </div>

        <div className="">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-medium text-gray-500">
              Last search
            </span>
            <span className="text-xs font-medium text-gray-500">3</span>
          </div>

          <ul className="space-y-3">
            <li className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-800">
                  Jason Woodheart
                </p>
                <p className="text-xs text-gray-500">jason@dribbble.com</p>
              </div>
            </li>

            <li className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-800">Rob Miller</p>
                <p className="text-xs text-gray-500">rob@icloud.com</p>
              </div>
            </li>

            <li className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-800">
                  Hannah Steward
                </p>
                <p className="text-xs text-gray-500">replied in thread</p>
              </div>
            </li>
          </ul>

          <div className="mt-4">
            <p className="text-xs font-medium text-gray-500 mb-2">
              Quick actions
            </p>
            <ul className="space-y-1">
              <li className="flex items-center text-sm text-gray-800 py-1 pl-2 rounded hover:bg-gray-50">
                <svg
                  className="w-4 h-4 mr-2 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 4v16m8-8H4"
                  ></path>
                </svg>
                Create new task
              </li>
              <li className="flex items-center text-sm text-gray-800 py-1 pl-2 rounded hover:bg-gray-50">
                <svg
                  className="w-4 h-4 mr-2 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 4v16m8-8H4"
                  ></path>
                </svg>
                Create note
              </li>
              <li className="flex items-center text-sm text-gray-800 py-1 pl-2 rounded hover:bg-gray-50">
                <svg
                  className="w-4 h-4 mr-2 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 4v16m8-8H4"
                  ></path>
                </svg>
                Add member
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-4 bg-[#F8F8F6]">
      <div className="flex flex-col sm:flex-row items-center gap-5 p-5 sm:px-15 justify-between">
        <h1 className=" text-3xl sm:text-5xl text-[var(--color-primary-blue)] font-semibold">
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
            className="cursor-pointer  bg-white sm:hidden text-gray-500 text-sm font-semibold  border border-gray-300 rounded-full p-2 hover:bg-gray-100 hover:text-gray-900 transition-colors duration-300"
          />
          <ModalPage icon={<SearchOutlined />} children={<SearchLayout />} />
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
          <div className="flex items-center  flex-wrap !justify-center sm:justify-start  w-full md:flex-row gap-4 p-4 pt-0 md:p-8 md:pt-0">
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
