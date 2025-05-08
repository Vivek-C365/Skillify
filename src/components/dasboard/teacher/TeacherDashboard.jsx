import React from "react";
import DashboardLayout from "../layout/Dashboard";

const TeacherDashboard = () => {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <h1 className="text-2xl md:text-4xl font-bold text-[var(--color-primary-blue)] mb-4">Welcome, Teacher!</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
            <span className="text-3xl font-bold text-[var(--color-dark-lavender)]">3</span>
            <span className="text-gray-500 mt-2">Courses Created</span>
          </div>
          <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
            <span className="text-3xl font-bold text-[var(--color-dark-lavender)]">120</span>
            <span className="text-gray-500 mt-2">Students</span>
          </div>
          <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
            <span className="text-3xl font-bold text-[var(--color-dark-lavender)]">4.8</span>
            <span className="text-gray-500 mt-2">Avg. Rating</span>
          </div>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4 text-[var(--color-primary-blue)]">Recent Courses Taught</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1,2,3].map((i) => (
              <div key={i} className="bg-white rounded-lg shadow p-4 flex flex-col">
                <span className="font-semibold text-[var(--color-dark-lavender)]">Course Title {i}</span>
                <span className="text-gray-500 text-sm mt-1">Enrolled: {30 + i*10}</span>
                <span className="text-xs text-gray-400 mt-2">Rating: {4.5 + i*0.1}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default TeacherDashboard; 