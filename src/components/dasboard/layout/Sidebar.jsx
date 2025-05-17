import React from "react";
import {
  BookOpen,
  Users,
  Award,
  LogOut,
  Home,
  BookMarked,
  GraduationCap,
  User,
  Bookmark,
  Tag,
  ChevronRight,
  Plus,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useLogout } from "../../../auth/pages/Logout";
import Logo from "../../../assets/images/eduaide_cube.png";

const Sidebar = () => {
  const reduxUser = useSelector((state) => state.user?.userDetails);
  const role = reduxUser.role;
  const location = useLocation();
  const handleLogout = useLogout();

  const navItems = [
    {
      title: "Dashboard",
      icon: <Home size={20} />,
      path: "/",
      roles: ["student"],
    },
    {
      title: "My Courses",
      icon: <BookOpen size={20} />,
      path: "/my-courses",
      roles: ["student"],
    },
    {
      title: "Bookmarks",
      icon: <Bookmark size={20} />,
      path: "/bookmarks",
      roles: ["student"],
    },
    {
      title: "Certificates",
      icon: <Award size={20} />,
      path: "/certificates",
      roles: ["student"],
    },
    {
      title: "My Profile",
      icon: <User size={20} />,
      path: "/profile",
      roles: ["student"],
    },
    {
      title: "Dashboard",
      icon: <Home size={20} />,
      path: "/teacher-dashboard",
      roles: ["teacher"],
    },
    {
      title: "My Courses",
      icon: <BookMarked size={20} />,
      path: "/manage-courses",
      roles: ["teacher"],
    },
    {
      title: "Create Course",
      icon: <Plus size={20} />,
      path: "/addCourse",
      roles: ["teacher"],
    },
    {
      title: "Students",
      icon: <GraduationCap size={20} />,
      path: "/students",
      roles: ["teacher"],
    },
    {
      title: "Dashboard",
      icon: <Home size={20} />,
      path: "/admin-dashboard",
      roles: ["admin"],
    },
    {
      title: "All Courses",
      icon: <BookOpen size={20} />,
      path: "/Allcourses",
      roles: ["admin"],
    },
    {
      title: "Masterclasses",
      icon: <GraduationCap size={20} />,
      path: "/Allmasterclasses",
      roles: ["admin"],
    },
    {
      title: "Instructors",
      icon: <Users size={20} />,
      path: "/instructors",
      roles: ["admin"],
    },
    {
      title: "Students",
      icon: <Users size={20} />,
      path: "/students",
      roles: ["admin"],
    },
    {
      title: "Categories",
      icon: <Tag size={20} />,
      path: "/categories",
      roles: ["admin"],
    },
  ];

  const filteredNavItems = navItems.filter((item) => item.roles.includes(role));

  return (
    <aside className="h-full w-64 bg-white border-r border-gray-200 shadow-md flex flex-col">
      {/* Logo Section */}
      <div className="flex items-center justify-center h-16 px-4 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
            <img src={Logo} alt="Logo" className="w-6 h-6" />
          </div>
          <span className="text-xl font-bold text-gray-900">Skillify</span>
        </div>
      </div>

      <div className="px-4 py-3 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
            <User className="w-6 h-6 text-gray-400" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">
              {reduxUser?.username || "User"}
            </p>
            <p className="text-xs text-gray-500 capitalize">{role}</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <ul className="space-y-1">
          {filteredNavItems.map((item, index) => {
            const isActive = location.pathname === item.path;
            return (
              <li key={index}>
                <Link
                  to={item.path}
                  className={`
                    group flex items-center justify-between px-4 py-2 rounded-lg transition-all duration-150
                    ${
                      isActive
                        ? "bg-gray-100 text-gray-900 font-semibold border-l-4 border-black shadow-sm"
                        : "text-gray-700 hover:bg-gray-50 hover:text-black"
                    }
                  `}
                >
                  <div className="flex items-center space-x-3">
                    <span
                      className={`${
                        isActive
                          ? "text-black"
                          : "text-gray-400 group-hover:text-black"
                      }`}
                    >
                      {item.icon}
                    </span>
                    <span>{item.title}</span>
                  </div>
                  <ChevronRight
                    className={`w-4 h-4 transition-transform duration-150 ${
                      isActive
                        ? "text-black rotate-90"
                        : "text-gray-300 group-hover:text-black"
                    }`}
                  />
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-4 border-t border-gray-200">
        <button
          onClick={handleLogout}
          className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-black rounded-lg transition-all duration-150 group border border-gray-200 shadow-sm"
        >
          <LogOut
            size={20}
            className="mr-3 text-gray-400 group-hover:text-black"
          />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
