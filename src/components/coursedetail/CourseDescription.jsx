import { useContext, useState } from 'react'
import CourseContext from '../../context/CourseContext'
import CourseButton from '../common/CourseButton'

const CourseDescription = () => {
  const { data } = useContext(CourseContext)
  const [activeTab, setActiveTab] = useState(1)
  const [visible, IsVisible] = useState(true) // Start with first tab active

  function handleCoursesDescription(buttonId) {
    setActiveTab(buttonId)
    IsVisible(!visible)
  }
  // Add error handling
  if (!data || !data.courses || data.courses.length === 0) {
    return <div>Loading course data...</div>
  }

  const allDescription = data.courses[0].description

  // Different data for each button
  const buttonData = [
    {
      id: 1,
      text: 'Description',
      content: allDescription.content || 'No description available',
      icon: '',
    },
    {
      id: 2,
      text: 'Home Work',
      content: allDescription?.homework || 'No homework assigned yet',
      icon: '',
    },
    {
      id: 3,
      text: 'Material',
      content:
        allDescription.actions || 'Course materials will be available soon',
      icon: '',
    },
  ]
  console.log(allDescription)
  return (
    <div className="course-tabs w-3.5/4 mx-auto md:w-full mt-[2rem]">
      <div className="flex mb-2 md:justify-start justify-center items-center gap-3 mt-2">
        {buttonData.map((button) => (
          <CourseButton
            key={button.id}
            active={activeTab === button.id}
            icon={button.icon}
            onClick={() => handleCoursesDescription(button.id)}
          >
            {button.text}
          </CourseButton>
        ))}
      </div>

      <div className="tab-content w-full p-4 text-justify">
        {buttonData.find((button) => button.id === activeTab)?.content}
      </div>
    </div>
  )
}

export default CourseDescription
