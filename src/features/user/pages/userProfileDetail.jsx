import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Modal, Input } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { useFormik } from "formik";
import * as Yup from "yup";
import { AvatarWithText } from "../../../components/common/AvatarGroup";
import Navbar from "../../../components/navbar";
import { useFirebase } from "../../../hooks/useFirebase";

const UserProfileDetail = () => {
  const reduxUser = useSelector((state) => state.User.userDetails);
  const firebase = useFirebase();

  const [userData, setUserData] = useState({
    name: reduxUser?.displayName || "Guest User",
    email: reduxUser?.email || "guest@example.com",
    photoURL: reduxUser?.photoURL || null,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!userData.email) return;
      try {
        const [userDoc] = await firebase.readUserFromFirestore(
          "users",
          "data.email",
          userData.email
        );
        const userDetail = userDoc?.data;
        if (userDetail) {
          setUserData((prev) => ({
            ...prev,
            name: userDetail.displayName || prev.name,
            photoURL: userDetail.photoURL || prev.photoURL,
          }));
        }
      } catch (error) {
        console.error("Error fetching user data from Firestore:", error);
      }
    };
    fetchUserData();
  }, [userData.email, firebase]);

  const formik = useFormik({
    initialValues: {
      name: userData.name,
      email: userData.email,
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
    }),
    onSubmit: (values) => {
      console.log("Updated values:", values);
      setIsModalOpen(false);
      // Optional: firebase.updateUserProfile(values)
    },
  });

  const userProfilePic = userData.photoURL ? (
    <img
      src={userData.photoURL}
      alt="User avatar"
      className="w-12 h-12 rounded-lg object-cover"
    />
  ) : (
    <AvatarWithText useremail={userData.email} />
  );

  const SectionTitle = ({ title, className = "" }) => (
    <h2 className={`m-0 text-sm font-medium tracking-wider uppercase ${className}`}>
      {title}
    </h2>
  );

  const TagSection = ({ title, tags, variant = "primary" }) => {
    const colors = variant === "primary"
      ? "text-violet-700 bg-violet-700 bg-opacity-10"
      : "text-violet-400 bg-violet-400 bg-opacity-10";
    return (
      <section className="flex flex-col gap-4">
        <SectionTitle title={title} className="text-violet-400" />
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className={`px-3 py-1.5 text-sm rounded-t-2xl rounded-bl-2xl text-white ${colors}`}
            >
              {tag}
            </span>
          ))}
        </div>
      </section>
    );
  };

  const ProfileCard = () => {
    const skills = ["Product Design", "User Experience", "User Research", "Wireframing"];
    const certificates = ["Google UX Designer", "Spring Board UX Design"];
    return (
      <section className="p-10 bg-white text-zinc-800">
        <div className="flex flex-col gap-8 mx-auto">
          <header className="flex flex-col gap-2">
            <h1 className="m-0 text-2xl font-medium">Profile Information</h1>
          </header>
          <article className="flex flex-col gap-6 p-6 bg-gray-50 rounded-lg border">
            <section className="flex flex-col gap-2">
              <SectionTitle title="About Me" className="text-violet-700" />
              <p className="m-0 text-sm leading-relaxed text-zinc-600">
                Passionate UI/UX designer focused on creating intuitive and engaging digital experiences.
              </p>
            </section>
            <TagSection title="Skills" tags={skills} variant="primary" />
            <TagSection title="Certificates" tags={certificates} variant="secondary" />
          </article>
        </div>
      </section>
    );
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />

      <section className="container mx-auto px-4 py-8">
        <div className="relative flex flex-col bg-white border rounded-2xl shadow-sm overflow-hidden">
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
              <div className="flex items-center gap-3">
                {userProfilePic}
                <div className="flex items-center gap-2">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">{userData.name}</h2>
                    <p className="text-sm text-gray-600">{userData.email}</p>
                  </div>
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="text-gray-500 hover:text-gray-700 transition"
                  >
                    <EditOutlined />
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {["Github", "Twitter", "Medium"].map((platform) => (
                  <button
                    key={platform}
                    className="flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase border rounded-lg hover:bg-gray-50 transition"
                  >
                    <i className={`fab fa-${platform.toLowerCase()} text-base`} />
                    <span>{platform}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <ProfileCard />

      {/* Modal for Editing Profile */}
      <Modal
        title="Edit Profile"
        open={isModalOpen}
        onOk={formik.handleSubmit}
        onCancel={() => setIsModalOpen(false)}
        okText="Update"
        cancelText="Cancel"
      >
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          {["name", "email"].map((field) => (
            <div key={field}>
              <label className="block text-sm font-medium text-gray-700 capitalize">{field}</label>
              <Input
                name={field}
                value={formik.values[field]}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder={`Enter your ${field}`}
              />
              {formik.touched[field] && formik.errors[field] && (
                <div className="text-red-500 text-xs mt-1">{formik.errors[field]}</div>
              )}
            </div>
          ))}
        </form>
      </Modal>
    </div>
  );
};

export default UserProfileDetail;
