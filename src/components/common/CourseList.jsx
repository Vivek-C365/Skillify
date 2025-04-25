import { useState } from 'react'
import { DownOutlined } from '@ant-design/icons'
import CourseTopicList from '../coursedetail/CourseTopicList'

export default function CourseList({ title, topics, index }) {
  const [isOpenTopics, setIsOpenTopics] = useState(false)
  const courseTopic = topics
  const len = courseTopic.length

 

  return (
    <>
      <div
        className="flex justify-between mt-1 p-3 border-gray-500"
        onClick={() => setIsOpenTopics(!isOpenTopics)}
      >
        <span className="text-[14px] font-medium font-sans md:text-[18px] max-w-[60%]">
          {index < 10 ? `0${index + 1}  ` : `${index}  `}
          {title}
        </span>
        <div className="flex items-baseline gap-2">
          <span className="text-[12px] md:text-[15px] w-max font-medium">
            40 min
          </span>
          <span
            className="text-[12px] md:text-[15px]"
            onClick={() => setIsOpenTopics(!isOpenTopics)}
          >
             <DownOutlined />
          </span>
        </div>
      </div>
      {isOpenTopics && (
        <div
          className={`bg-[#F1F0EA] ${
            index != len
              ? 'border-t-[#636360] border-b-[#636360] border-[1px]'
              : 'border-t-[#636360] border-t-[1px] rounded-b-2xl'
          } border-l-0 border-r-0 p-1`}
        >
          {courseTopic.map((topic) => (
            <CourseTopicList topic={topic} />
          ))}
        </div>
      )}
    </>
  )
}
