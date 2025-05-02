import { useContext } from 'react'
import CourseContext from '../../context/CourseContext'

export default function CourseDuration() {
  const { data } = useContext(CourseContext);
  let topicDuration = 0;
  let topicHours = 0;
  let topicMins = 0;

  data.courses[0].modules.forEach((el1) => {
    el1.topics.forEach((el2) => {
      topicDuration += parseInt(el2.duration.split(' ')?.[0]);
    })
  })
 
  const topicShortDuration = (topicDuration / 60).toString().split('.')

  topicHours = topicShortDuration?.[0];
  topicMins = topicShortDuration?.[1].slice(0,2);
  

  return (
    <span>
      {topicHours}h {topicMins}min
    </span>
  )
}
