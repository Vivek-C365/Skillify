import React from "react";
import DashboardLayout from "../layout/Dashboard";

const StudentDashboard = () => {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <h1 className="text-2xl md:text-4xl font-bold text-[var(--color-primary-blue)] mb-4">Welcome, Student!</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
            <span className="text-3xl font-bold text-[var(--color-dark-lavender)]">5</span>
            <span className="text-gray-500 mt-2">Enrolled Courses</span>
          </div>
          <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
            <span className="text-3xl font-bold text-[var(--color-dark-lavender)]">2</span>
            <span className="text-gray-500 mt-2">Certificates</span>
          </div>
          <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
            <span className="text-3xl font-bold text-[var(--color-dark-lavender)]">80%</span>
            <span className="text-gray-500 mt-2">Progress</span>
          </div>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4 text-[var(--color-primary-blue)]">Recent Courses</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1,2,3].map((i) => (
              <div key={i} className="bg-white rounded-lg shadow p-4 flex flex-col">
                <span className="font-semibold text-[var(--color-dark-lavender)]">Course Title {i}</span>
                <span className="text-gray-500 text-sm mt-1">Instructor Name</span>
                <span className="text-xs text-gray-400 mt-2">Progress: {60 + i*10}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default StudentDashboard; 