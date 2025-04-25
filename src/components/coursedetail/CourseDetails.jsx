import { useContext, useState } from 'react'
import { UnorderedListOutlined } from '@ant-design/icons'
import { ClockCircleOutlined } from '@ant-design/icons'
import { StarFilled, StarOutlined } from '@ant-design/icons'
import CourseContext from '../../context/CourseContext'
import CourseDuration from '../common/CourseDuration'
import CourseItem from './CourseItem'

export default function CourseDetails() {
  const { data } = useContext(CourseContext)
  const [isFavorite, setIsFavorite] = useState(false)

  // Error handling for missing data
  if (!data?.courses) return null

  const totalCourses = data.courses.length
  const detailItems = [
    {
      id: 1,
      icon: <UnorderedListOutlined />,
      content: `${totalCourses} lessons`,
    },
    {
      id: 2,
      icon: <ClockCircleOutlined />,
      content: <CourseDuration />,
    },
    {
      id: 3,
      icon: isFavorite ? <StarFilled /> : <StarOutlined />,
      content: 'Favourite',
      onClick: () => setIsFavorite(!isFavorite),
      className: 'cursor-pointer',
    },
  ]

  return (
    <ul className="flex gap-3 flex-row">
      {detailItems.map((item) => (
        <CourseItem
          key={item.id}
          icon={item.icon}
          onClick={item.onClick}
          className={item.className}
        >
          {item.content}
        </CourseItem>
      ))}
    </ul>
  )
}
