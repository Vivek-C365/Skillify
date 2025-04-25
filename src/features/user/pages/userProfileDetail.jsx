import React from "react";
import { useSelector } from "react-redux";
import { AvatarWithText } from "../../../components/common/AvatarGroup";
import Navbar from "../../../components/navbar";

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

  // Profile Information Component
  function ProfileHeader({ name }) {
    return (
      <header className="flex flex-col gap-2">
        <h1 className="m-0 text-2xl font-medium">{name}</h1>
      </header>
    );
  }

  // About Section Component
  function AboutSection({ title, description }) {
    return (
      <section className="flex flex-col gap-2">
        <h2 className="m-0 text-sm font-medium tracking-wider text-violet-700 uppercase">
          {title}
        </h2>
        <p className="m-0 text-sm leading-relaxed text-zinc-600">
          {description}
        </p>
      </section>
    );
  }

  // Tag Section Component
  function TagSection({ title, tags, variant = "primary" }) {
    // Define styles based on variant
    const titleColorClass =
      variant === "primary" ? "text-violet-400" : "text-violet-400";
    const tagColorClass =
      variant === "primary"
        ? "text-violet-700 bg-violet-700 bg-opacity-10"
        : "text-violet-400 bg-violet-400 bg-opacity-10";

    return (
      <section className="flex flex-col gap-4">
        <h2
          className={`m-0 text-sm font-medium tracking-wider uppercase ${titleColorClass}`}
        >
          {title}
        </h2>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              className={`px-3 py-1.5 text-sm rounded ${tagColorClass}`}
              key={tag}
            >
              {tag}
            </span>
          ))}
        </div>
      </section>
    );
  }

  // Main Profile Card Component
  function ProfileCard() {
    const connectTags = ["Finance", "Real estate", "Technology"];
    const blacklistedTags = [
      "Coaching / Mentoring",
      "Toys and Games",
      "Building network",
    ];

    return (
      <section className="p-10 min-h-screen bg-white text-zinc-800">
        <div className="flex flex-col gap-8 mx-auto my-0 max-w-[800px]">
          <ProfileHeader name="Profile Information" />
          <article className="flex flex-col gap-6 p-6 bg-gray-50 rounded-lg border border-gray-200 border-solid">
            <AboutSection
              title="About Me"
              description="Passionate UI/UX designer focused on creating intuitive and
              engaging digital experiences.
              Driven by design thinking, creativity, and a love for
              problem-solving."
            />
            <TagSection
              title="Looking to connect with"
              tags={connectTags}
              variant="primary"
            />
            <TagSection
              title="Looking to get from Blacklisted"
              tags={blacklistedTags}
              variant="secondary"
            />
          </article>
        </div>
      </section>
    );
  }

  return (
    <div className="bg-gray-100 ">
      <Navbar />
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="relative flex flex-col bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="relative  md:h-60 w-full overflow-hidden">
            <img
              src="https://static.vecteezy.com/system/resources/previews/039/920/245/non_2x/artificial-intelligence-technology-facebook-cover-free-editor_template.jpeg"
              alt="Profile cover"
              className="w-full h-full object-cover "
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
                    <i
                      className={`fab fa-${platform.toLowerCase()} text-base`}
                    ></i>
                    <span>{platform}</span>
                  </button>
                ))}
              </div>
            </div>

            <p className="mt-6 text-sm text-gray-600"></p>
          </div>
        </div>
      </section>

      <ProfileCard />
    </div>
  );
};

export default UserProfileDetail;
