import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { EditOutlined, LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

import { AvatarWithText } from "../../../components/common/AvatarGroup";
import Navbar from "../../../components/navbar/index";

import { useFirebase } from "../../../hooks/useFirebase";
import EditProfileModal from "./EditProfileModal";
import { handleError, handleSuccess } from "../../../utils/tostify";

const UserProfileDetail = () => {
  const reduxUser = useSelector((state) => state.user?.userDetails);

  const firebase = useFirebase();

  const [userData, setUserData] = useState({
    name: reduxUser?.username || "Guest User",
    email: reduxUser?.email || "guest@example.com",
    photoURL: reduxUser?.photoURL || null,
    about: "",
    skills: [],
    certificates: [],
    github: "",
    medium: "",
    twitter: "",
  });

  const [userDocId, setUserDocId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setIsLoading(true);
        if (!reduxUser?.email) {
          handleError("User not authenticated");
          return;
        }

        const userData = await firebase.readUserFromFirestore(
          "users",
          "data.email",
          reduxUser.email
        );
        if (userData && userData.length > 0) {
          const userDoc = userData[0];
          setUserDocId(userDoc.id);
          setUserData({
            name: userDoc.data.displayName || reduxUser.username,
            email: reduxUser.email,
            photoURL: userDoc.data.photoURL || reduxUser.photoURL,
            about: userDoc.data.about || "",
            skills: userDoc.data.skills || [],
            certificates: userDoc.data.certificates || [],
            github: userDoc.data.github || "",
            medium: userDoc.data.medium || "",
            twitter: userDoc.data.twitter || "",
          });
        } 
      } catch (error) {
        console.error("Error fetching user data:", error);
        handleError("Failed to fetch user data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [reduxUser, firebase]);

  const handleProfileUpdate = async (values) => {
    setIsUpdating(true);
    try {
      if (!userDocId) {
        throw new Error("User document not found");
      }

      // Validate URLs
      const validateUrl = (url) => {
        if (!url) return true;
        try {
          new URL(url);
          return true;
        } catch {
          return false;
        }
      };

      if (
        !validateUrl(values.github) ||
        !validateUrl(values.medium) ||
        !validateUrl(values.twitter)
      ) {
        throw new Error("Invalid URL format");
      }

      await firebase.UpdateUser("users", userDocId, {
        "data.displayName": values.name,
        "data.email": values.email,
        "data.about": values.about,
        "data.skills": values.skills,
        "data.certificates": values.certificates,
        "data.github": values.github,
        "data.medium": values.medium,
        "data.twitter": values.twitter,
        "data.updatedAt": new Date().toISOString(),
      });

      setUserData({
        ...userData,
        name: values.name,
        email: values.email,
        about: values.about,
        skills: values.skills,
        certificates: values.certificates,
        github: values.github,
        medium: values.medium,
        twitter: values.twitter,
      });
      handleSuccess("Profile updated successfully");
    } catch (error) {
      console.error("Error updating user profile:", error);
      handleError(error.message || "Failed to update profile");
    } finally {
      setIsUpdating(false);
      setIsModalOpen(false);
    }
  };

  const userProfilePic = userData.photoURL ? (
    <img
      src={userData.photoURL}
      alt={userData.name}
      className="w-12 h-12 rounded-lg object-cover"
    />
  ) : (
    <AvatarWithText useremail={userData.email} />
  );

  const SectionTitle = ({ title, className = "" }) => (
    <h2
      className={`m-0 text-sm font-medium tracking-wider uppercase ${className}`}
    >
      {title}
    </h2>
  );

  const TagSection = ({ title, tags, variant = "primary" }) => {
    const colors =
      variant === "primary"
        ? "text-violet-700 bg-violet-700 bg-opacity-10"
        : "text-violet-400 bg-violet-400 bg-opacity-10";
    return (
      <section className="flex flex-col gap-4">
        <SectionTitle title={title} className="text-violet-400" />
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className={`px-3 py-1.5 text-sm rounded-t-2xl rounded-bl-2xl text-white ${colors}`}
            >
              {tag}
            </span>
          ))}
        </div>
      </section>
    );
  };

  const ProfileCard = () => (
    <section className="p-4 sm:p-6 md:p-10 bg-white text-zinc-800">
      <div className="flex flex-col gap-6 md:gap-8 mx-auto">
        <header className="flex flex-col gap-2 text-center md:text-left">
          <h1 className="m-0 text-xl md:text-2xl font-semibold">
            Profile Information
          </h1>
        </header>
        <article className="flex flex-col gap-4 p-4 sm:p-6 bg-gray-50 rounded-lg ">
          <section className="flex flex-col gap-2">
            <SectionTitle title="About Me" className="text-violet-700" />
            <p className="m-0 text-sm md:text-base leading-relaxed text-zinc-600">
              {userData.about || "No description provided."}
            </p>
          </section>
          <TagSection title="Skills" tags={userData.skills} variant="primary" />
          <TagSection
            title="Certificates"
            tags={userData.certificates}
            variant="secondary"
          />
        </article>
      </div>
    </section>
  );

  const socialButtons = [
    { name: "Github", url: userData.github },
    { name: "Twitter", url: userData.twitter },
    { name: "Medium", url: userData.medium },
  ];

  const SocialButtonDisplay = () => {
    return (
      <>
        <div className="flex gap-2">
          {socialButtons.map(({ name, url }) => (
            <button
              key={name}
              disabled={!url}
              onClick={() => {
                if (url) window.open(url, "_blank", "noopener noreferrer");
              }}
              className={`flex gap-2 p-2 text-xs font-bold uppercase border rounded-lg transition ${
                url
                  ? "hover:bg-gray-50 text-gray-700 cursor-pointer"
                  : "bg-gray-200 text-gray-400 hidden cursor-not-allowed"
              }`}
            >
              <span>{name}</span>
            </button>
          ))}
        </div>
      </>
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <section className="container mx-auto px-4 pb-4 ">
        <div className="relative flex flex-col bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="relative md:h-60 w-full overflow-hidden">
            <img
              src="https://static.vecteezy.com/system/resources/previews/039/920/245/non_2x/artificial-intelligence-technology-facebook-cover-free-editor_template.jpeg"
              alt="Profile cover"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          <div className="p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div className="flex flex-wrap items-center gap-3 w-full">
                {userProfilePic}
                <div className="flex flex-1 min-w-0 flex-col gap-1">
                  <h2 className="text-lg font-semibold text-gray-900">
                    {userData.name}
                  </h2>
                  <p className="text-sm text-gray-600 break-words truncate">
                    {userData.email}
                  </p>
                </div>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="text-gray-500 hover:text-gray-700 transition ml-2"
                  disabled={isUpdating}
                >
                  <EditOutlined />
                </button>
              </div>

              <SocialButtonDisplay />
            </div>
          </div>
        </div>
      </section>

      <ProfileCard />

      <EditProfileModal
        isOpen={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onSubmit={handleProfileUpdate}
        initialValues={{
          name: userData.name,
          email: userData.email,
          about: userData.about,
          skills: userData.skills,
          certificates: userData.certificates,
          github: userData.github,
          medium: userData.medium,
          twitter: userData.twitter,
        }}
        loading={isUpdating}
      />
    </div>
  );
};

export default UserProfileDetail;
