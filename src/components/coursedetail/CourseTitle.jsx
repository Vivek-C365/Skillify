import { useContext } from 'react'
import CourseContext from '../../context/CourseContext'

export default function CourseTitle() {
  const { data } = useContext(CourseContext)

  return <h3 className="text-2xl font-medium">{data.courses[0].name}</h3>
}
