import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Users,
  BookOpen,
  GraduationCap,
  Plus,
  Star,
  TrendingUp,
} from "lucide-react";
import { Card, CardContent, CardHeader } from "../../common/DashboardCard";
import { StatCard } from "../../common/StatCard";
import { Button } from "../../common/button";
import CountingNumber from "../../common/CountingNumber";

const TeacherDashboard = () => {
  const loading = false;

  const [dashboardData] = useState({
    courses: [],
    students: [],
    ratings: [],
  });

  const stats = [
    {
      title: "Total Courses",
      value: dashboardData.courses?.length || 0,
      icon: <BookOpen size={24} />,
      variant: "primary",
      gradient: "from-[#4F46E5] to-[#7C3AED]",
      trend: "+12%",
      trendUp: true,
    },
    {
      title: "Total Students",
      value: dashboardData.students?.length || 0,
      icon: <Users size={24} />,
      variant: "success",
      gradient: "from-[#059669] to-[#10B981]",
      trend: "+8%",
      trendUp: true,
    },
    {
      title: "Average Rating",
      value: dashboardData.ratings?.length
        ? (
            dashboardData.ratings.reduce((a, b) => a + b, 0) /
            dashboardData.ratings.length
          ).toFixed(1)
        : 0,
      icon: <Star size={24} />,
      variant: "info",
      gradient: "from-[#7C3AED] to-[#EC4899]",
      trend: "+15%",
      trendUp: true,
    },
  ];

  const renderTopCourses = () => {
    if (loading) {
      return (
        <>
          <div className="animate-pulse p-4">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </>
      );
    }

    return dashboardData.courses?.slice(0, 5).map((course, index) => (
      <div
        key={course.id || index}
        className="flex items-center p-4 hover:bg-gray-50/50 transition-colors duration-150 group"
      >
        <div className="font-bold text-gray-500 mr-4 w-6 text-center group-hover:text-[#4F46E5] transition-colors">
          {index + 1}
        </div>
        <img
          src={
            course?.data?.image ||
            "https://www.anglofone.co.in/static/media/foundation%20course.7e6169c6cb93cdb42fb4.png"
          }
          alt="Course"
          className="w-12 h-12 object-cover rounded-lg mr-3 shadow-sm group-hover:shadow-md transition-shadow"
        />
        <div className="flex-1">
          <p className="font-medium text-gray-900 group-hover:text-[#4F46E5] transition-colors">
            {course?.data?.courseTitle || "N/A"}
          </p>
          <p className="text-sm text-gray-600">
            {course?.data?.category || "Unnamed Course"}
          </p>
        </div>
        <div className="text-right">
          <p className="font-medium text-gray-900">
            {course?.data?.rating || 0} ★
          </p>
          <div className="text-sm text-gray-600">
            {course?.data?.enrolledStudents?.length || 0} Students
          </div>
        </div>
      </div>
    ));
  };

  return (
      <div className="space-y-6">
        {/* Modern Header Section */}
        <div className="bg-white border border-gray-200 shadow-sm rounded-2xl p-6 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="space-y-1">
              <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
                Teacher Dashboard
              </h1>
              <p className="text-gray-500">
                Welcome back! Here's an overview of your teaching activities.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Link to="/addCourse">
                <Button
                  variant="outline"
                  size="lg"
                  className="!text-gray-700 hover:bg-gray-100 border-gray-200 rounded-lg transition-all duration-150 shadow-sm"
                >
                  <Plus size={16} className="mr-2" />
                  Create Course
                </Button>
              </Link>
            </div>
          </div>
        </div>
        {/* Teacher Profile Card Link */}
        <div className="flex flex-col md:flex-row gap-6 mb-6">
          <div className="flex-1">
            <div className="bg-white rounded-2xl shadow p-6 flex flex-col md:flex-row items-center gap-6 hover:shadow-lg transition-shadow">
              {/* Static teacher profile data */}
              <div className="flex flex-col items-center md:items-start md:w-1/3">
                <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center mb-2">
                  {/* Placeholder for profile image */}
                  <svg
                    className="w-16 h-16 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 14c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
                    />
                  </svg>
                </div>
                <div className="text-center md:text-left">
                  <div className="font-bold text-lg">Salena Quintanilla</div>
                  <div className="text-gray-500 text-sm">Advertising</div>
                </div>
              </div>
              <div className="flex-1 grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
                <div>
                  <span className="font-semibold text-gray-600">Username</span>
                  <br />
                  Salena Quintanilla
                </div>
                <div>
                  <span className="font-semibold text-gray-600">Name</span>
                  <br />
                  Salena Quintanilla
                </div>
                <div>
                  <span className="font-semibold text-gray-600">Email</span>
                  <br />
                  blacklistedteam@theblacklistedapp.com
                </div>
                <div>
                  <span className="font-semibold text-gray-600">Phone Number</span>
                  <br />
                  NA
                </div>
                <div>
                  <span className="font-semibold text-gray-600">State</span>
                  <br />
                  Alabama
                </div>
                <div>
                  <span className="font-semibold text-gray-600">City</span>
                  <br />
                  Alexander City
                </div>
                <div>
                  <span className="font-semibold text-gray-600">Job Title</span>
                  <br />
                  UI/UX Designer
                </div>
                <div>
                  <span className="font-semibold text-gray-600">Business Owner</span>
                  <br />
                  NA
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              title={stat.title}
              value={
                stat.value > 0 ? (
                  <CountingNumber maxnumber={stat.value} timer={20} />
                ) : (
                  0
                )
              }
              icon={stat.icon}
              variant={stat.variant}
              gradient={stat.gradient}
              trend={stat.trend}
              trendUp={stat.trendUp}
              className="bg-white border border-gray-200 shadow-sm rounded-xl p-4"
              titleClassName="text-gray-500"
              valueClassName="text-gray-900"
            />
          ))}
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="overflow-hidden border border-gray-200 bg-white shadow-sm rounded-xl">
            <CardHeader className="border-b border-gray-200 bg-gray-50">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">
                  Top Performing Courses
                </h2>
                <Link
                  to="/manage-courses"
                  className="text-gray-700 hover:text-black text-sm font-medium flex items-center"
                >
                  View all
                  <Plus size={16} className="ml-1" />
                </Link>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-gray-100">
                {renderTopCourses()}
              </div>
            </CardContent>
          </Card>

          <Card className="overflow-hidden border border-gray-200 bg-white shadow-sm rounded-xl">
            <CardHeader className="border-b border-gray-200 bg-gray-50">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">
                  Recent Activity
                </h2>
                <Link
                  to="/students"
                  className="text-gray-700 hover:text-black text-sm font-medium flex items-center"
                >
                  View all
                  <Plus size={16} className="ml-1" />
                </Link>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="flex items-center p-3 hover:bg-gray-50/50 rounded-lg transition-colors"
                  >
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                      <TrendingUp size={20} className="text-gray-500" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">
                        New Student Enrollment
                      </p>
                      <p className="text-sm text-gray-600">
                        Student {i} enrolled in your course
                      </p>
                    </div>
                    <span className="text-sm text-gray-500">2h ago</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
  );
};

export default TeacherDashboard;
