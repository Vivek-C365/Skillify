import data from '../services/api/data.json'
import CourseTitle from '../components/coursedetail/CourseTitle'
import CourseDetails from '../components/coursedetail/CourseDetails'
import CourseVedio from '../components/coursedetail/CourseVedio'
import CourseSidebar from '../components/coursedetail/CourseSidebar'
import CourseDescription from '../components/coursedetail/CourseDescription'

export default function Courses() {
  const courseData = data.courses[0]

  return (
    <div className="w-full bg-[#F7F7F5] p-2 md:p-4 overflow-hidden ">
      <div className="flex flex-col gap-4 p-4 mx-auto justify-center items-center md:flex-row md:justify-between md:p-6 lg:max-w-7xl">
        <CourseTitle />
        <CourseDetails />
      </div>

      <div className="flex flex-col gap-4 lg:flex-row lg:max-w-7xl lg:mx-auto">
        <div className="w-full lg:w-2/3 lg:pr-4">
          <div className="space-y-4">
            <CourseVedio />
            <CourseDescription />
          </div>
        </div>

        <div className="w-full lg:w-1/3">
          <CourseSidebar module={courseData.modules} />
        </div>
      </div>
    </div>
  )
}
