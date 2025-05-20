import { CalendarDays, Clock, Ellipsis } from 'lucide-react'
import { useState } from 'react'
import DropDown from '../../common/DropDown'

const TeacherCard = ({ teacher, onDelete, onUpdate }) => {
  const [isOpen, setIsOpen] = useState(false)

  const items = [
    {
      key: 'update',
      label: 'Update',
    },
    {
      key: 'delete',
      label: 'Delete',
      danger: true, // This makes the text red
    },
  ]

  const handleMenuClick = (key) => {
    console.log(`Selected ${key} for ${teacher.name}`)
    // Add your update/delete logic here
  }

  return (
    <div className="bg-[#ECEEE6] shadow overflow-hidden md:rounded-full transition-all duration-200 hover:shadow-lg relative">
      {/* Mobile view */}
      <div className="md:hidden p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
              {teacher.name
                .split(' ')
                .map((n) => n[0])
                .join('')}
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-900">
                {teacher.name}
              </h3>
              <p className="text-sm text-gray-500">{teacher.role}</p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-1 rounded-full hover:bg-gray-100 focus:outline-none"
          >
            <Ellipsis className="h-5 w-5 text-gray-500" />
          </button>
        </div>

      
          <DropDown
            key={items}
            items={items}
            onSelect={handleMenuClick}
            triggerContent={
              <span className="text-gray-500 hover:text-gray-700">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="1" />
                  <circle cx="12" cy="5" r="1" />
                  <circle cx="12" cy="19" r="1" />
                </svg>
              </span>
            }
          />

        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <p className="text-xs font-medium text-gray-500 uppercase">
              Lesson
            </p>
            <p className="text-sm font-medium">{teacher.lesson}</p>
          </div>
          <div>
            <p className="text-xs font-medium text-gray-500 uppercase">Level</p>
            <p className="text-sm font-medium">
              <span
                className={`px-2 py-1 rounded-full text-xs ${
                  teacher.level === 'Beginner'
                    ? 'bg-green-100 text-green-800'
                    : teacher.level === 'Intermediate'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-red-100 text-red-800'
                }`}
              >
                {teacher.level}
              </span>
            </p>
          </div>
          <div className="flex items-center gap-2">
            <CalendarDays color="#4b4949" size={15} />
            <div>
              <p className="text-xs font-medium text-gray-500 uppercase">
                Date
              </p>
              <p className="text-sm font-medium">{teacher.date}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Clock color="#4b4949" size={15} />
            <div>
              <p className="text-xs font-medium text-gray-500 uppercase">
                Time
              </p>
              <p className="text-sm font-medium">{teacher.time}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop view - updated to 6 columns */}
      <div className="hidden md:grid grid-cols-[2fr_2fr_1fr_1fr_1fr_40px] gap-2 p-2 items-center bg-[#ECEEE6] relative">
        <div className="flex items-center col-span-1">
          <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold mr-3">
            {teacher.name
              .split(' ')
              .map((n) => n[0])
              .join('')}
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-900">
              {teacher.name}
            </h3>
            <p className="text-xs text-gray-500">{teacher.role}</p>
          </div>
        </div>

        <div className="text-sm text-[#191819] col-span-1">
          {teacher.lesson}
        </div>

        <div className="col-span-1">
          <span
            className={`px-2 py-1 rounded-full text-xs ${
              teacher.level === 'Beginner'
                ? 'bg-green-100 text-green-800'
                : teacher.level === 'Intermediate'
                ? 'bg-yellow-100 text-yellow-800'
                : 'bg-red-100 text-red-800'
            }`}
          >
            {teacher.level}
          </span>
        </div>

        <div className="text-sm text-[#191819] flex gap-2 items-center col-span-1">
          <CalendarDays color="#4b4949" size={15} />
          <span>{teacher.date}</span>
        </div>

        <div className="text-sm text-[#191819] flex gap-2 items-center col-span-1">
          <Clock color="#4b4949" size={15} />
          <span>{teacher.time}</span>
        </div>

        {/* Actions column */}
        <div className="flex col-span-1 pr-2">
          {/* {isOpen && (
            <DropDown
            items={items}
            onSelect={handleMenuClick}
           />
          )} */}
          <DropDown
            items={items}
            triggerContent={<Ellipsis
              className="h-5 w-5 text-gray-500"
            />}
            icon: null
          />
        </div>
      </div>
    </div>
  )
}

export default TeacherCard
