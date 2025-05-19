import TeacherCard from "./TeacherCard";

export default function TeacherList() {
  const teachers = [
    {
      name: 'Emma Smith',
      role: 'AI Coach',
      lesson: 'AI and deep learning',
      level: 'Beginner',
      date: '12.10.2023',
      time: '10:00-12:00'
    },
    {
      name: 'William Hall',
      role: 'Cybersecurity Trainer',
      lesson: 'Cybersecurity',
      level: 'Expert',
      date: '15.10.2023',
      time: '08:00-10:00'
    },
    {
      name: 'Sally Kelly',
      role: 'English teacher',
      lesson: 'English for IT',
      level: 'Intermediate',
      date: '18.10.2023',
      time: '13:00-15:00'
    },
    {
      name: 'Liam Lee',
      role: 'Web Developer',
      lesson: 'Web development',
      level: 'Beginner',
      date: '20.10.2023',
      time: '18:00-20:00'
    }
  ];

  return (
    <div className="min-h-screen bg-white py-4 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">Teacher Schedule</h1>
          <p className="mt-3 text-xl text-gray-500">Upcoming lessons and sessions</p>
        </div>
        
        {/* Updated header with 6 columns to accommodate the actions space */}
        <div className="hidden md:grid grid-cols-[2fr_2fr_1fr_1fr_1fr_40px] gap-2 p-4 rounded-lg mb-4">
          <div className=" text-gray-600 col-span-1">Teacher's Name</div>
          <div className=" text-gray-600 col-span-1">Lesson</div>
          <div className=" text-gray-600 col-span-1">Level</div>
          <div className=" text-gray-600 col-span-1">Date</div>
          <div className=" text-gray-600 col-span-1">Time</div>
          <div className=" text-gray-600 col-span-1"></div>
        </div>
        
        <div className="space-y-3">
          {teachers.map((teacher) => (
            <TeacherCard 
              key={teacher.id}
              teacher={teacher}
            />
          ))}
        </div>

        {teachers.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No teachers found. Add some to get started.</p>
          </div>
        )}
      </div>
    </div>
  );
}
