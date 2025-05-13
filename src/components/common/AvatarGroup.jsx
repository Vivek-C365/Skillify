import React from "react";
import { AntDesignOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Divider, Tooltip } from "antd";

export const AvatarGroup = () => (
  <div className="flex items-center">
    <img
      src="https://randomuser.me/api/portraits/women/44.jpg"
      alt="avatar1"
      className="w-10 h-10 rounded-full border-2 border-white object-cover z-30"
      style={{ marginLeft: 0 }}
    />
    <img
      src="https://randomuser.me/api/portraits/men/32.jpg"
      alt="avatar2"
      className="w-10 h-10 rounded-full border-2 border-white object-cover -ml-3 z-20"
    />
    <img
      src="https://randomuser.me/api/portraits/women/65.jpg"
      alt="avatar3"
      className="w-10 h-10 rounded-full border-2 border-white object-cover -ml-3 z-10"
    />
    <div className="w-10 h-10 rounded-full border-2 border-white bg-[#BAB2E7] flex items-center justify-center text-black text-xl font-bold -ml-3 z-0">
      +
    </div>
  </div>
);

export const AvatarWithText = ({ useremail }) => {
  const firstLetter = useremail.charAt(0).toUpperCase();
  return (
    <>
      <Avatar
        style={{
          filter: "invert(100%)",
        }}
      >
        {firstLetter}
      </Avatar>
    </>
  );
};
