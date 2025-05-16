import React, { useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { Users, BookOpen, UserPlus, GraduationCap, Tag, Plus } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "../../common/DashboardCard";
import { StatCard } from "../../common/StatCard";
import { Button } from "../../common/button";
import { AddInstructorForm } from "../../../features/teachers/pages/AddInstructorForm";
import ModalPage from "../../common/Modal";
import { useFirebase } from "../../../hooks/useFirebase";
import CountingNumber from "../../common/CountingNumber";
import AddMasterClassForm from "../../../features/teachers/pages/AddMasterClassForm";
import { useDispatch, useSelector } from "react-redux";
import {
  setDashboardData,
  setLoading,
  setError,
} from "../../../features/admin/admindashboadSlice";
import {
  StatCardSkeleton,
  CourseCardSkeleton,
  InstructorCardSkeleton,
} from "../../common/Skeleton";
import { handleError } from "../../../utils/tostify";
import { AddCategoryForm } from "../../../features/teachers/pages/AddCategoryForm";

export const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { users, courses, instructors, masterclasses, categories, loading } =
    useSelector((state) => state.dashboard);
  const [showAddInstructorModal, setShowAddInstructorModal] =
    React.useState(false);
  const [showAddMasterClassModal, setShowAddMasterClassModal] =
    React.useState(false);
  const [showAddCategoryModal, setShowAddCategoryModal] =
    React.useState(false);
    
  const firebase = useFirebase();

  const fetchDashboardData = useCallback(async () => {
    try {
      dispatch(setLoading(true));
      const [usersData, coursesData, instructorsData, masterclassesData, categoriesData] =
        await Promise.all([
          firebase.readData("users"),
          firebase.readData("CourseDetails"),
          firebase.readData("Instructor"),
          firebase.readData("MasterClass"),
          firebase.readData("Categories"),
        ]);

      dispatch(
        setDashboardData({
          users: usersData || [],
          courses: coursesData || [],
          instructors: instructorsData || [],
          masterclasses: masterclassesData || [],
          categories: categoriesData || [],
        })
      );
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error);
      dispatch(setError(error.message));
      handleError("Failed to load dashboard data");
    } finally {
      dispatch(setLoading(false));
    }
  }, [firebase, dispatch]);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  const handleCloseModal = () => {
    setShowAddInstructorModal(false);
    setShowAddMasterClassModal(false);
    setShowAddCategoryModal(false);
  };

  const handleSuccess = () => {
    handleCloseModal();
    fetchDashboardData();
  };

  const stats = [
    {
      title: "Total Students",
      value: users?.length || 0,
      icon: <Users size={24} />,
      variant: "primary",
      gradient: "from-[#4F46E5] to-[#7C3AED]",
      trend: "+12%",
      trendUp: true,
    },
    {
      title: "Total Instructors",
      value: instructors?.length || 0,
      icon: <Users size={24} />,
      variant: "success",
      gradient: "from-[#059669] to-[#10B981]",
      trend: "+8%",
      trendUp: true,
    },
    {
      title: "Active Courses",
      value: courses?.length || 0,
      icon: <BookOpen size={24} />,
      variant: "info",
      gradient: "from-[#7C3AED] to-[#EC4899]",
      trend: "+15%",
      trendUp: true,
      link: "/Allcourses",
    },
    {
      title: "Active Masterclasses",
      value: masterclasses?.length || 0,
      icon: <GraduationCap size={24} />,
      variant: "info",
      gradient: "from-[#3B82F6] to-[#2DD4BF]",
      trend: "+20%",
      trendUp: true,
      link: "/Allmasterclasses",
    },
    {
      title: "Categories",
      value: categories?.length || 0,
      icon: <Tag size={24} />,
      variant: "info",
      gradient: "from-[#F59E0B] to-[#EF4444]",
      trend: "+5%",
      trendUp: true,
      link: "/categories",
    },
  ];

  const renderTopCourses = () => {
    if (loading) {
      return (
        <>
          <CourseCardSkeleton />
          <CourseCardSkeleton />
          <CourseCardSkeleton />
          <CourseCardSkeleton />
          <CourseCardSkeleton />
        </>
      );
    }

    return courses?.slice(0, 5).map((course, index) => (
      <div key={course.id || index} className="flex items-center p-4 hover:bg-gray-50/50 transition-colors duration-150 group">
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
          <p className="font-medium text-gray-900 group-hover:text-[#4F46E5] transition-colors">{course?.data?.category || "N/A"}</p>
          <p className="text-sm text-gray-600">
            {course?.data?.courseTitle || "Unnamed Course"}
          </p>
        </div>
        <div className="text-right">
          <p className="font-medium text-gray-900">${course?.data?.price || 0}</p>
          <div className="text-sm text-gray-600">Course Price</div>
        </div>
      </div>
    ));
  };

  const renderTopInstructors = () => {
    if (loading) {
      return (
        <>
          <InstructorCardSkeleton />
          <InstructorCardSkeleton />
          <InstructorCardSkeleton />
          <InstructorCardSkeleton />
          <InstructorCardSkeleton />
        </>
      );
    }

    return instructors?.slice(0, 5).map((instructor, index) => (
      <div key={instructor.id || index} className="flex items-center p-4 hover:bg-gray-50/50 transition-colors duration-150 group">
        <div className="font-bold text-gray-500 mr-4 w-6 text-center group-hover:text-[#4F46E5] transition-colors">
          {index + 1}
        </div>
        <img
          src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
            instructor?.data?.name || "Instructor"
          )}&background=random`}
          alt={instructor?.data?.name}
          className="w-12 h-12 rounded-full mr-3 shadow-sm group-hover:shadow-md transition-shadow"
        />
        <div className="flex-1">
          <p className="font-medium text-gray-900 group-hover:text-[#4F46E5] transition-colors">{instructor?.data?.name || "N/A"}</p>
          <p className="text-sm text-gray-600">
            {instructor?.data?.expertise || "No specialization"}
          </p>
        </div>
        <div className="text-right">
          <p className="font-medium text-gray-900">
            {instructor?.data?.rating?.toFixed(1) || "N/A"} ★
          </p>
          <div className="flex items-center text-sm text-gray-600">
            <Users size={14} className="mr-1" />
            {instructor?.data?.experience || 0} Years
          </div>
        </div>
      </div>
    ));
  };

  if (loading && !users.length && !courses.length && !instructors.length) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <StatCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Modern Header Section */}
      <div className="bg-white border border-gray-200 shadow-sm rounded-2xl p-6 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Platform Overview</h1>
            <p className="text-gray-500">Welcome back! Here's what's happening with your platform.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              size="lg"
              onClick={() => setShowAddInstructorModal(true)}
              className="!text-gray-700 hover:bg-gray-100 border-gray-200 rounded-lg transition-all duration-150 shadow-sm"
            >
              <UserPlus size={16} className="mr-2" />
              Add Instructor
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => setShowAddMasterClassModal(true)}
              className="!text-gray-700 hover:bg-gray-100 border-gray-200 rounded-lg transition-all duration-150 shadow-sm"
            >
              <GraduationCap size={16} className="mr-2" />
              Add MasterClass
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => setShowAddCategoryModal(true)}
              className="!text-gray-700 hover:bg-gray-100 border-gray-200 rounded-lg transition-all duration-150 shadow-sm"
            >
              <Tag size={16} className="mr-2" />
              Add Categories
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, index) => {
          const card = (
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
          );

          return stat.link ? (
            <Link key={index} to={stat.link} className="block">
              {card}
            </Link>
          ) : (
            <div key={index}>{card}</div>
          );
        })}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="overflow-hidden border border-gray-200 bg-white shadow-sm rounded-xl">
          <CardHeader className="border-b border-gray-200 bg-gray-50">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">Top Performing Courses</h2>
              <Link
                to="/admin-dashboard/courses"
                className="text-gray-700 hover:text-black text-sm font-medium flex items-center"
              >
                View all
                <Plus size={16} className="ml-1" />
              </Link>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-gray-100">{renderTopCourses()}</div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden border border-gray-200 bg-white shadow-sm rounded-xl">
          <CardHeader className="border-b border-gray-200 bg-gray-50">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">Top Instructors</h2>
              <Link
                to="/admin-dashboard/instructors"
                className="text-gray-700 hover:text-black text-sm font-medium flex items-center"
              >
                View all
                <Plus size={16} className="ml-1" />
              </Link>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-gray-100">{renderTopInstructors()}</div>
          </CardContent>
        </Card>
      </div>

      {/* Modals */}
      {showAddInstructorModal && (
        <ModalPage
          title="Add New Instructor"
          open={showAddInstructorModal}
          onClose={handleCloseModal}
          onCancel={handleCloseModal}
        >
          <AddInstructorForm
            onSuccess={handleSuccess}
            onClose={handleCloseModal}
          />
        </ModalPage>
      )}

      {showAddMasterClassModal && (
        <ModalPage
          title="Add New Masterclass"
          open={showAddMasterClassModal}
          onClose={handleCloseModal}
          onCancel={handleCloseModal}
        >
          <AddMasterClassForm
            onSuccess={handleSuccess}
            onClose={handleCloseModal}
          />
        </ModalPage>
      )}

      {showAddCategoryModal && (
        <ModalPage
          title="Add New Category"
          open={showAddCategoryModal}
          onClose={handleCloseModal}
          onCancel={handleCloseModal}
        >
          <AddCategoryForm
            onSuccess={handleSuccess}
            onClose={handleCloseModal}
          />
        </ModalPage>
      )}
    </div>
  );
};
