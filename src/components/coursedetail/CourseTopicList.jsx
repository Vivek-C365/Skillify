import React from 'react'
import { CaretRightOutlined } from '@ant-design/icons'    

export default function CourseTopicList({ topic }) {
  console.log(topic)
  return (
    <div className="p-3 flex justify-between">
      <div className="flex gap-2 items-baseline">
        <span className="text-[13px]">
        <CaretRightOutlined />
        </span>
        <span className="text-[14px] md:text-[16px]">{topic.title}</span>
      </div>
      <span className="text-[12px] md:text-[14px]">{topic.duration}</span>
    </div>
  )
}
