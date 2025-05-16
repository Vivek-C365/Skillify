import React from "react";
import { User, X, AlignLeft, Settings, LogOut } from "lucide-react";
import { Button } from "../../common/button";
import { Badge } from "../../common/Badge";
import { useSelector } from "react-redux";
import { useFirebase } from "../../../hooks/useFirebase";
import DropDown from "../../common/DropDown";

const Header = ({ onToggleSidebar, sidebarOpen }) => {
  const reduxUser = useSelector((state) => state.user?.userDetails);
  const role = reduxUser?.role || "user";
  const firebase = useFirebase();

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

  const getRoleBadgeVariant = () => {
    switch (role) {
      case "student":
        return "primary";
      case "teacher":
        return "success";
      case "admin":
        return "warning";
      default:
        return "secondary";
    }
  };

  const handleLogout = async () => {
    try {
      await firebase.logout();
      window.location.href = "/";
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const dropdownItems = [
    {
      key: "profile",
      label: "Profile",
      icon: <User className="w-4 h-4 mr-2" />,
    },
    {
      key: "settings",
      label: "Settings",
      icon: <Settings className="w-4 h-4 mr-2" />,
    },
    {
      type: "divider",
    },
    {
      key: "logout",
      label: "Logout",
      icon: <LogOut className="w-4 h-4 mr-2" />,
      danger: true,
    },
  ];

  const handleDropdownSelect = (key) => {
    switch (key) {
      case "profile":
        // Add profile navigation logic
        break;
      case "settings":
        // Add settings navigation logic
        break;
      case "logout":
        handleLogout();
        break;
      default:
        break;
    }
  };

  return (
    <header className="h-16 bg-white border-b border-gray-200 shadow-sm px-6 flex items-center justify-between sticky top-0 z-50">
      {/* Left Section */}
      <div className="flex items-center space-x-4">
        {/* Mobile Menu Button */}
        <Button
          variant="outline"
          size="icon"
          className="lg:hidden !text-gray-700 rounded-lg hover:bg-gray-100 border-gray-200"
          onClick={onToggleSidebar}
          aria-label="Toggle menu"
        >
          {sidebarOpen ? <X size={20} /> : <AlignLeft size={20} />}
        </Button>

        {/* Title */}
        <div className="hidden sm:block">
          <h1 className="text-xl font-semibold text-gray-900">
            {getHeaderTitle()}
          </h1>
          <p className="text-sm text-gray-500">Welcome back, {reduxUser?.username || "User"}</p>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-4">
        {/* User Profile Dropdown */}
        <DropDown
          items={dropdownItems}
          onSelect={handleDropdownSelect}
          triggerContent={
            <div className="flex items-center space-x-3 bg-gray-100 hover:bg-gray-200 rounded-lg px-3 py-2 transition-all duration-150 border border-gray-200 shadow-sm">
              <div className="text-right hidden md:block">
                <div className="flex items-center justify-end">
                  <Badge variant={getRoleBadgeVariant()}>
                    {role.charAt(0).toUpperCase() + role.slice(1)}
                  </Badge>
                </div>
              </div>
              <div className="w-8 h-8 rounded-lg bg-gray-200 flex items-center justify-center text-gray-500">
                <User className="w-5 h-5" />
              </div>
            </div>
          }
        />
      </div>
    </header>
  );
};

export default Header;
