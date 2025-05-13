import { HeadingDescription } from "../../../components/common/HeadingDescriptionText";
import TagSingle from "../../../components/common/TagSingle";
import CardWithImage from "../../../components/common/CardWithImage";
import { Button } from "../../../components/common/button";
import LaptopOutlined from "@ant-design/icons/LaptopOutlined";
import { useEffect, useState } from "react";
import { useFirebase } from "../../../hooks/useFirebase";
import { Skeleton } from "../../../components/common/Skeleton";
import { Link } from "react-router-dom";

export default function CourseSection2() {
  const [isLoading, setIsLoading] = useState(true); // Start with true since we're loading initially
  const [masterclass, setMasterClass] = useState(null); // Initialize as null
  const firebase = useFirebase();

  useEffect(() => {
    const fetchMasterClassData = async () => {
      try {
        setIsLoading(true);
        const masterclassData = await firebase.readData("MasterClass");
        setMasterClass(masterclassData);
      } catch (error) {
        console.error(`Error loading masterclass data: ${error}`);
        setMasterClass(null); // Explicitly set to null on error
      } finally {
        setIsLoading(false);
      }
    };
    fetchMasterClassData();
  }, [firebase]);

  // Handle loading state
  if (isLoading) {
    return <Skeleton />;
  }

  // Handle case where data couldn't be loaded
  if (!masterclass || masterclass.length === 0) {
    return <div>No masterclass data available</div>;
  }

  // Safely extract data
  const currentMasterclass = masterclass[0]?.data || {};
  console.log(currentMasterclass);
  const { day, date, name, masterclassTitle, time, url, personExperience } =
    currentMasterclass;

  // Safely handle date
  function getMonthName(monthNumber) {
    const date = new Date();
    date.setMonth(monthNumber - 1);

    return date.toLocaleString("en-US", {
      month: "long",
    });
  }

  let dateDisplay = "";
  if (date) {
    try {
      const dateParts = date.split("-");
      const monthString = getMonthName(dateParts[1]);
      if (dateParts.length >= 3) {
        dateDisplay = `${dateParts[2]} ${monthString}`;
      }
    } catch (e) {
      console.error("Error parsing date:", e);
    }
  }

  let timeDisplay = "";
  if (time) {
    try {
      const timeParts = time.split(":");
      if (timeParts[0] >= 12) {
        let timeHours = timeParts[0] - 12;
        timeDisplay = `${timeHours < 9 ? "0" : ""}${timeHours}:${timeParts[1]}`;
        timeDisplay += " PM";
      } else {
        timeDisplay = `${timeParts[0] < 9 ? "0" : ""}${timeParts[0]}:${
          timeParts[1]
        }`;
        timeDisplay += " AM";
      }
    } catch (e) {
      console.error("Error in time pparsing:", e);
    }
  }

  const MasterClass = () => {
    return (
      <div className="flex flex-col gap-3 p-2">
        <div>
          <h3 className="font-semibold text-[var(--color-dark-lavender)]">
            {day || "Day not specified"}, {dateDisplay || "Date not specified"}{" "}
            at {timeDisplay}
          </h3>
        </div>
        <div>
          <p className="text-[var(--color-charcol-black)] font-semibold text-[1.2rem]">
            {masterclassTitle || "Title is not specified for masterclass"}
          </p>
        </div>
        <div className="flex justify-between gap-2">
          <div className="flex  gap-2">
            <span>
              <LaptopOutlined />
            </span>
            <div>
              <h1>By Dr. {masterclass[0]?.data?.name} </h1>
              <p>{`${personExperience} Years`} | IIIT Bangalore</p>
            </div>
          </div>
          <img
            src={
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTdMfGt8m2fOLQt3OZb5AgoKzHbWwjTCditg&s"
            }
            alt="IIT"
            className=" h-[2rem] w-[2rem]"
          />
        </div>
        <div className="flex gap-2 justify-center items-center">
          <Button className=" w-full bg-transparent !text-black border-1 text-[12px]">
            View Masterclass
          </Button>

          <Button className="w-full !bg-black text-[12px]">Register Now</Button>
        </div>
      </div>
    );
  };
  return (
    <>
      {/* Platform Section */}
      <div className="flex flex-wrap md:flex-nowrap gap-7 items-center justify-evenly mx-auto">
        <div className="left-section max-w-[30rem] m-5 p-3  ">
          <HeadingDescription className="!text-[var(--color-primary-blue);]  text-center xl:w-max sm:text-left font-semibold ">
            Attend{" "}
            <span className="text-[var(--color-dark-lavender)]">
              free masterclasses
            </span>{" "}
            by industry experts
          </HeadingDescription>
          <h6 className="text-[1rem] text-[var(--secondry-text-Lightblue)] mt-6 mx-auto mr-2 text-justify mb-6">
            We offer the highest quality education resources an individual
            approach to each student and modern technologies to make learning
            accessible & effective
          </h6>
          <Link to="/masterclasses">
            <TagSingle textContent={"View All Masterclass"} />
          </Link>
        </div>
        <div className="flex flex-wrap max-w-[25rem] gap-1 justify-center items-center  m-5 ">
          <CardWithImage
            image="https://www.upgrad.com/_ww3-next/image/?url=%20https%3A%2F%2Fd2o2utebsixu4k.cloudfront.net%2F400x200-2%20copy-4110e9d107c44fb98fe2c9e346185889.webp&w=1200&q=75"
            imageStyle={"object-cover  max-h-[13rem] "}
            children={<MasterClass />}
            className="flex-col !shadow-xl !border-none"
          />
        </div>
      </div>
    </>
  );
}
