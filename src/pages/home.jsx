import Navbar from "../components/navbar";
import {responsiveFlex} from "../styles/responsiveFlex"
import {responsiveText} from "../styles/responsiveText";

const Home = () => {
  return (
    <div className="lavender-background min-h-screen">
      <Navbar />
      {/* Main Content */}
      <div className="p-4 md:p-8">
        {/* First Top content bar */}
        <div className={`flex ${responsiveFlex}`}>
          {/* First part */}
          <div className="text-center md:text-left">
            <div className="flex flex-wrap justify-center md:justify-start items-center gap-2">
              <div className="flex bg-white rounded-full p-1 gap-2 items-center">
                <p className="bg-black primary-text center-circle p-2">#</p>
                <p>advantage</p>
              </div>
              <p className="bg-white center-circle p-2">#</p>
              <p className="border border-white primary-text center-circle p-2">
                #
              </p>
            </div>
            <div className="mt-2 primary-text text-center md:text-left max-w-md">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Quisquam, totam?
            </div>
          </div>

          {/* Right Side */}
          <div className="flex flex-col items-center md:flex-row md:items-center gap-2">
            {/* Bigger Text */}
            <div className="flex flex-col items-center justify-center primary-text">
              <span className={responsiveText}>Simple</span>
            </div>

            <div>
              <span className="text-lg center-circle md:text-xl lg:text-2xl">explore</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
