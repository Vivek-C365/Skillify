import React, { useEffect, useState } from "react";
import { useFirebase } from "../hooks/useFirebase";
import Navbar from "../components/navbar";
import Footer from "../components/common/Footer";
import { Button } from "../components/common/button";
import { Skeleton } from "../components/common/Skeleton";
import { HeadingDescription } from "../components/common/HeadingDescriptionText";
import heroImg from "../assets/images/Platform2.jpg";
import { Carousel } from "antd";

const Masterclasses = () => {
  const [masterclasses, setMasterclasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const firebase = useFirebase();

  useEffect(() => {
    const fetchMasterclasses = async () => {
      try {
        setLoading(true);
        const masterclassData = await firebase.readData("MasterClass");
        setMasterclasses(masterclassData);
      } catch (error) {
        console.error("Error fetching masterclasses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMasterclasses();
  }, [firebase]);

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <HeadingDescription
            heading="All Masterclasses"
            description="Exclusive live sessions with industry experts"
            primaryColor="text-[var(--color-primary-blue)]"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="h-[400px]">
                <Skeleton />
              </div>
            ))}
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--color-background-light)]">
      <Navbar />
      <div className="flex flex-col md:flex-row items-center justify-between rounded-3xl bg-white shadow-lg my-8 mx-auto max-w-6xl overflow-hidden">
        <div className="flex-1 p-8 md:p-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[var(--color-charcol-black)]">
            Live{" "}
            <span className="text-[var(--color-primary-blue)]">
              FREE Classes
            </span>{" "}
            for Career Growth
          </h1>
          <p className="text-lg text-[var(--secondry-text-Lightblue)] mb-8">
            Unlock your potential. Learn key differences and real-world
            applications to advance your career with our FREE class.
          </p>
          <Button className="!bg-[var(--color-primary-blue)] hover:!bg-[var(--color-dark-lavender)] text-white text-lg px-8 py-3 rounded-xl mb-4">
            Explore Free Classes
          </Button>
          <div className="flex items-center gap-2 text-[var(--color-dark-lavender)] mt-2">
            <span className="material-icons text-base">call</span>
            <span className="text-base">
              For enquiries call:{" "}
              <span className="font-semibold">1800 210 2020</span>
            </span>
          </div>
        </div>
        <div className="flex-1 min-w-[300px] h-full flex items-center justify-center bg-[var(--color-light-lavender)]">
          <img
            src={
              heroImg ||
              "https://images.pexels.com/photos/1181355/pexels-photo-1181355.jpeg?auto=compress&w=600"
            }
            alt="Masterclass Hero"
            className="object-cover w-full h-full max-h-[350px] md:max-h-[400px] rounded-3xl"
          />
        </div>
      </div>

      <div className="w-full py-8 bg-white flex flex-col items-center">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-[var(--color-charcol-black)]">
          Webinars by Experts from Top Companies
        </h2>
        <div className="w-full max-w-7xl">
          <Carousel
            autoplay
            autoplaySpeed={2000}
            infinite
            speed={1200}
            slidesToShow={5}
            slidesToScroll={1}
            dots={false}
            responsive={[
              { breakpoint: 1200, settings: { slidesToShow: 5 } },
              { breakpoint: 900, settings: { slidesToShow: 4 } },
              { breakpoint: 600, settings: { slidesToShow: 2 } },
            ]}
            className="company-slider"
          >
            <div className="flex justify-center items-center">
              <img
                src="https://d2o2utebsixu4k.cloudfront.net/805%20X%202275%20(2)-5858b0c5b2a94b9f920b4908058f4102.svg"
                alt="Jio"
                className="h-10 md:h-12 object-contain mx-auto"
              />
            </div>
            <div className="flex justify-center items-center">
              <img
                src="https://d2o2utebsixu4k.cloudfront.net/805%20X%202275%20copy-486c419074b1447a8ef6eb7c364f5775.svg"
                alt="ThoughtSpot"
                className="h-8 md:h-10 object-contain mx-auto"
              />
            </div>
            <div className="flex justify-center items-center">
              <img
                src="https://d2o2utebsixu4k.cloudfront.net/Amazon_logo_1-7cbaf64a48674cdebfbd8211f8a12eba.svg"
                alt="Amazon"
                className="h-8 md:h-10 object-contain mx-auto"
              />
            </div>
            <div className="flex justify-center items-center">
              <img
                src="https://d2o2utebsixu4k.cloudfront.net/Microsoft_logo_1-3fb10f4605ba438595954bacf8449a56.svg"
                alt="Microsoft"
                className="h-8 md:h-10 object-contain mx-auto"
              />
            </div>
            <div className="flex justify-center items-center">
              <img
                src="https://d2o2utebsixu4k.cloudfront.net/805%20X%202275-01c3787376eb4f13ac493b72a661e24e.svg"
                alt="UXReactor"
                className="h-8 md:h-10 object-contain mx-auto"
              />
            </div>
            <div className="flex justify-center items-center">
              <img
                src="https://d2o2utebsixu4k.cloudfront.net/Accenture_Logo_1-80a88e45ed864b19b645c134b8ba68f3.svg"
                alt="Accenture"
                className="h-8 md:h-10 object-contain mx-auto"
              />
            </div>
            <div className="flex justify-center items-center">
              <img
                src="https://d2o2utebsixu4k.cloudfront.net/805%20X%202275%20(2)-5858b0c5b2a94b9f920b4908058f4102.svg"
                alt="Jio"
                className="h-10 md:h-12 object-contain mx-auto"
              />
            </div>
            <div className="flex justify-center items-center">
              <img
                src="https://d2o2utebsixu4k.cloudfront.net/805%20X%202275%20copy-486c419074b1447a8ef6eb7c364f5775.svg"
                alt="ThoughtSpot"
                className="h-8 md:h-10 object-contain mx-auto"
              />
            </div>
            <div className="flex justify-center items-center">
              <img
                src="https://d2o2utebsixu4k.cloudfront.net/Amazon_logo_1-7cbaf64a48674cdebfbd8211f8a12eba.svg"
                alt="Amazon"
                className="h-8 md:h-10 object-contain mx-auto"
              />
            </div>
            <div className="flex justify-center items-center">
              <img
                src="https://d2o2utebsixu4k.cloudfront.net/Microsoft_logo_1-3fb10f4605ba438595954bacf8449a56.svg"
                alt="Microsoft"
                className="h-8 md:h-10 object-contain mx-auto"
              />
            </div>
            <div className="flex justify-center items-center">
              <img
                src="https://d2o2utebsixu4k.cloudfront.net/805%20X%202275-01c3787376eb4f13ac493b72a661e24e.svg"
                alt="UXReactor"
                className="h-8 md:h-10 object-contain mx-auto"
              />
            </div>
            <div className="flex justify-center items-center">
              <img
                src="https://d2o2utebsixu4k.cloudfront.net/Accenture_Logo_1-80a88e45ed864b19b645c134b8ba68f3.svg"
                alt="Accenture"
                className="h-8 md:h-10 object-contain mx-auto"
              />
            </div>
          </Carousel>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <HeadingDescription
          heading="All Masterclasses"
          description="Exclusive live sessions with industry experts"
          primaryColor="text-[var(--color-primary-blue)]"
        />

        {masterclasses.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-xl text-gray-600">
              No masterclasses available at the moment
            </h3>
            <p className="mt-2 text-gray-500">
              Please check back later for upcoming sessions
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {masterclasses.map((masterclass) => (
              <MasterclassCard key={masterclass.id} masterclass={masterclass} />
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

const MasterclassCard = ({ masterclass }) => {
  const {
    masterclassTitle,
    name,
    description,
    day,
    date,
    time,
    duration,
    category,
    personExperience,
    url,
  } = masterclass.data || {};

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return "Date not specified";

    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return dateString;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-48">
        <img
          src={url || "https://via.placeholder.com/400x200?text=Masterclass"}
          alt={masterclassTitle}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-0 right-0 bg-indigo-600 text-white px-3 py-1 m-2 rounded-full text-xs font-semibold">
          {category || "General"}
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-center text-sm text-gray-500 mb-2">
          <span>
            {day || "Day"}, {formatDate(date)}
          </span>
          <span className="mx-2">•</span>
          <span>{time || "TBD"}</span>
          <span className="mx-2">•</span>
          <span>{duration || "1"} hour</span>
        </div>

        <h3 className="font-bold text-xl text-gray-800 mb-2 line-clamp-2">
          {masterclassTitle || "Masterclass Title"}
        </h3>

        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {description || "No description available for this masterclass."}
        </p>

        <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-800 font-semibold mr-3">
              {name ? name.charAt(0).toUpperCase() : "?"}
            </div>
            <div>
              <p className="font-medium text-gray-800">
               By {name || "Instructor"}
              </p>
              <p className="text-xs text-gray-500">
                {personExperience || "5+"} Years Experience
              </p>
            </div>
          </div>

          <Button className="!bg-indigo-600 hover:!bg-indigo-700 text-white text-sm">
            Register
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Masterclasses;
