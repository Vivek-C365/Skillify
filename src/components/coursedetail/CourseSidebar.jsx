import CourseList from '../common/CourseList'

export default function CourseSidebar({ module }) {
  return (
    <div
      className="border border-[#787874] border-solid rounded-2xl bg-white shadow-sm 
                    md:border-[#242422] lg:sticky lg:top-4 lg:self-start lg:max-h-[calc(100vh-2rem)] lg:overflow-y-auto"
    >
      <div className="divide-y divide-[#787874]/30 md:divide-[#242422]/30">
        {module.map((modul, index) => (
          <CourseList
            title={modul.title}
            key={modul.id}
            topics={modul.topics}
            index={index}
          />
        ))}
      </div>
    </div>
  )
}
