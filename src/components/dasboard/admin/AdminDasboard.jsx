import React, { useEffect, useState, useCallback, useMemo } from "react";
import { Link } from "react-router-dom";
import { Users, BookOpen, UserPlus, GraduationCap } from "lucide-react";

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
import { useDispatch } from "react-redux";
import { setCoursesData } from "../../../features/admin/admindashboadSlice";
import {
  StatCardSkeleton,
  CourseCardSkeleton,
  InstructorCardSkeleton,
} from "../../common/Skeleton";
import { handleError } from "../../../utils/tostify";

export const AdminDashboard = () => {
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [masterclasses, setMasterclasses] = useState([]);
  const [topInstructors, setTopInstructors] = useState([]);
  const [showAddInstructorModal, setShowAddInstructorModal] = useState(false);
  const [showAddMasterClassModal, setShowAddMasterClassModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const firebase = useFirebase();

  const fetchDashboardData = useCallback(async () => {
    try {
      setIsLoading(true);
      const [usersData, coursesData, instructorsData, masterclassesData] =
        await Promise.all([
          firebase.readData("users"),
          firebase.readData("CouseDetails"),
          firebase.readData("Instructor"),
          firebase.readData("MasterClass"),
        ]);

      dispatch(setCoursesData(coursesData));
      setUsers(usersData || []);
      setCourses(coursesData || []);
      setTopInstructors(instructorsData || []);
      setMasterclasses(masterclassesData || []);
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error);
      handleError("Failed to load dashboard data");
    } finally {
      setIsLoading(false);
    }
  }, [firebase, dispatch]);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  const handleAddInstructor = useCallback(() => {
    setShowAddInstructorModal(true);
  }, []);

  const handleAddMasterClass = useCallback(() => {
    setShowAddMasterClassModal(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setShowAddInstructorModal(false);
    setShowAddMasterClassModal(false);
    fetchDashboardData();
  }, [fetchDashboardData]);

  const stats = useMemo(
    () => [
      {
        title: "Total Students",
        value: users.length,
        icon: <Users size={24} />,
        variant: "primary",
      },
      {
        title: "Total Instructors",
        value: topInstructors.length,
        icon: <Users size={24} />,
        variant: "success",
      },
      {
        title: "Active Courses",
        value: courses.length,
        icon: <BookOpen size={24} />,
        variant: "info",
        link: "/Allcourses",
      },
      {
        title: "Active Masterclasses",
        value: masterclasses.length,
        icon: <GraduationCap size={24} />,
        variant: "info",
        link: "/masterclasses",
      },
    ],
    [users.length, topInstructors.length, courses.length, masterclasses.length]
  );

  const renderTopCourses = useCallback(() => {
    if (isLoading) {
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

    return courses.slice(0, 5).map((course, index) => (
      <div key={course.id || index} className="flex items-center p-4">
        <div className="font-bold text-gray-500 mr-4 w-6 text-center">
          {index + 1}
        </div>
        <img
          src={
            course?.data?.image ||
            "https://www.anglofone.co.in/static/media/foundation%20course.7e6169c6cb93cdb42fb4.png"
          }
          alt="Course"
          className="w-12 h-12 object-cover rounded mr-3"
        />
        <div className="flex-1">
          <p className="font-medium">{course?.data?.category || "N/A"}</p>
          <p className="text-sm text-gray-600">
            {course?.data?.name || "Unnamed Course"}
          </p>
        </div>
        <div className="text-right">
          <p className="font-medium">${course?.data?.hourly_rate || 0}</p>
          <div className="text-sm text-gray-600">Hourly rate</div>
        </div>
      </div>
    ));
  }, [courses, isLoading]);

  const renderTopInstructors = useCallback(() => {
    if (isLoading) {
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

    return topInstructors.slice(0, 5).map((instructor, index) => (
      <div key={instructor.id || index} className="flex items-center p-4">
        <div className="font-bold text-gray-500 mr-4 w-6 text-center">
          {index + 1}
        </div>
        <img
          src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
            instructor?.data?.name || "Instructor"
          )}&background=random`}
          alt={instructor?.data?.name}
          className="w-12 h-12 rounded-full mr-3"
        />
        <div className="flex-1">
          <p className="font-medium">{instructor?.data?.name || "N/A"}</p>
          <p className="text-sm text-gray-600">
            {instructor?.data?.expertise || "No expertise"}
          </p>
        </div>
        <div className="text-right">
          <p className="font-medium">{instructor?.totalCourses || 0} Courses</p>
          <div className="flex items-center text-sm text-gray-600">
            <Users size={14} className="mr-1" />
            {instructor?.students || 0} Students
          </div>
        </div>
      </div>
    ));
  }, [topInstructors, isLoading]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Platform Overview</h1>
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="!text-black"
            size="lg"
            leftIcon={<UserPlus size={16} />}
            onClick={handleAddInstructor}
          >
            Add Instructor
          </Button>
          <Button
            variant="outline"
            className="!text-black"
            size="lg"
            leftIcon={<UserPlus size={16} />}
            onClick={handleAddMasterClass}
          >
            Add MasterClass
          </Button>
          <Button leftIcon={<BookOpen size={16} />}>Add Categories</Button>
        </div>
      </div>

      {showAddInstructorModal && (
        <ModalPage open={showAddInstructorModal} onCancel={handleCloseModal}>
          <AddInstructorForm onClose={handleCloseModal} />
        </ModalPage>
      )}

      {showAddMasterClassModal && (
        <ModalPage open={showAddMasterClassModal} onCancel={handleCloseModal}>
          <AddMasterClassForm onClose={handleCloseModal} />
        </ModalPage>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {isLoading ? (
          <>
            <StatCardSkeleton />
            <StatCardSkeleton />
            <StatCardSkeleton />
            <StatCardSkeleton />
          </>
        ) : (
          stats.map((stat, index) => {
            const card = (
              <StatCard
                key={index}
                title={stat.title}
                value={
                  stat.value > 0 ? <CountingNumber maxnumber={stat.value} /> : 0
                }
                icon={stat.icon}
                variant={stat.variant}
              />
            );

            return stat.link ? (
              <Link key={index} to={stat.link}>
                {card}
              </Link>
            ) : (
              <div key={index}>{card}</div>
            );
          })
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="border-b">
            <h2 className="text-xl font-semibold">Top Performing Courses</h2>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y">{renderTopCourses()}</div>
          </CardContent>
          <CardFooter className="border-t">
            <Link
              to="/Allcourses"
              className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
            >
              View all courses
            </Link>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="border-b">
            <h2 className="text-xl font-semibold">Top Instructors</h2>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y">{renderTopInstructors()}</div>
          </CardContent>
          <CardFooter className="border-t">
            <Link
              to="/instructors"
              className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
            >
              View all instructors
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};
