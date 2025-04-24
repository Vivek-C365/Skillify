import React from "react";
import { useSelector } from "react-redux";
import { AvatarWithText } from "../../../components/common/AvatarGroup";

const UserProfileDetail = () => {
  const user = useSelector((state) => state.User.userDetails);

  const userEmail = user?.email || "guest@example.com";
  const userName = user?.displayName || "Guest User";
  const profilePic = user?.photoURL;

  const userProfilePic = profilePic ? (
    <img
      src={profilePic}
      alt="User avatar"
      className="w-12 h-12 rounded-lg object-cover"
    />
  ) : (
    <AvatarWithText useremail={userEmail} />
  );

  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      <div className="relative flex flex-col bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="relative h-48 sm:h-60 w-full overflow-hidden">
          <img
            src="/_next/image?url=%2Fimage%2Fdark-image.png&w=2048&q=75"
            alt="Profile cover"
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>

        <div className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-6">
            <div className="flex items-center gap-3">
              {userProfilePic}
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  {userName}
                </h2>
                <p className="text-sm text-gray-600">{userEmail}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {["Github", "Twitter", "Medium"].map((platform) => (
                <button
                  key={platform}
                  className="flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  type="button"
                >
                  <i className={`fab fa-${platform.toLowerCase()} text-base`}></i>
                  <span>{platform}</span>
                </button>
              ))}
            </div>
          </div>

          <p className="mt-6 text-sm text-gray-600">
            Passionate UI/UX designer focused on creating intuitive and engaging
            digital experiences. <br className="hidden sm:block" />
            Driven by design thinking, creativity, and a love for
            problem-solving.
          </p>
        </div>
      </div>
    </section>
  );
};

export default UserProfileDetail;
