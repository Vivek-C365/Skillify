import React from "react";
import { X, AlignLeft } from "lucide-react";
import { Button } from "../../common/button";
import { useSelector } from "react-redux";

const Header = ({ onToggleSidebar, sidebarOpen }) => {
  const reduxUser = useSelector((state) => state.user?.userDetails);
  const role = reduxUser?.role || "user";

  const getHeaderTitle = () => {
    switch (role) {
      case "student":
        return "Student Dashboard";
      case "teacher":
        return "Teacher Dashboard";
      case "admin":
        return "Admin Dashboard";
      default:
        return "Dashboard";
    }
  };

  return (
    <header className="h-16 bg-white border-b border-gray-200 shadow-sm px-6 flex items-center justify-between sticky top-0 z-50">
      <div className="flex items-center space-x-4">
        <Button
          variant="outline"
          size="icon"
          className="lg:hidden !text-gray-700 rounded-lg hover:bg-gray-100 border-gray-200"
          onClick={onToggleSidebar}
          aria-label="Toggle menu"
        >
          {sidebarOpen ? <X size={20} /> : <AlignLeft size={20} />}
        </Button>

        <div className="hidden sm:block">
          <h1 className="text-xl font-semibold text-gray-900">
            {getHeaderTitle()}
          </h1>
          <p className="text-sm text-gray-500">
            Welcome back, {reduxUser?.username || "User"}
          </p>
        </div>
      </div>
    </header>
  );
};

export default Header;
