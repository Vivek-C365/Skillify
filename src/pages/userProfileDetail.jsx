import React from "react";

const UserProfileDetail = () => {
  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      <div className="relative flex flex-col bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        {/* Cover Image */}
        <div className="relative h-48 sm:h-60 w-full overflow-hidden">
          <img
            src="/_next/image?url=%2Fimage%2Fdark-image.png&w=2048&q=75"
            alt="Profile cover"
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>

        {/* Profile Content */}
        <div className="p-4 sm:p-6">
          {/* Profile Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-6">
            <div className="flex items-center gap-3">
              <img
                src="/img/avatar1.jpg"
                alt="User avatar"
                className="w-12 h-12 rounded-lg object-cover"
              />
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Emma Roberts</h2>
                <p className="text-sm text-gray-600">emma.roberts@mail.com</p>
              </div>
            </div>

            {/* Social Buttons */}
            <div className="flex flex-wrap gap-2">
              <button
                className="flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                type="button"
              >
                <i className="fab fa-github text-base"></i>
                <span>Github</span>
              </button>
              <button
                className="flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                type="button"
              >
                <i className="fab fa-twitter text-base"></i>
                <span>Twitter</span>
              </button>
              <button
                className="flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                type="button"
              >
                <i className="fab fa-medium text-base"></i>
                <span>Medium</span>
              </button>
            </div>
          </div>

          {/* Bio */}
          <p className="mt-6 text-sm text-gray-600">
            Passionate UI/UX designer focused on creating intuitive and engaging
            digital experiences. <br className="hidden sm:block" />
            Driven by design thinking, creativity, and a love for problem-solving.
          </p>
        </div>
      </div>
    </section>
  );
};

export default UserProfileDetail;