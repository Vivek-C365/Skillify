import Data from "../services/courseData.json";
import CardWithImage from "../components/common/CardWithImage";
import Sidebar from "../components/common/Sidebar";

const CoursesDisplay = () => {
  const menuItems = Data.categories.map((course, index) => ({
    key: String(index + 1),
    label: course.title, 
  }));

  return (
    <div className="flex flex-col md:flex-row gap-4">
      <Sidebar menuItems={menuItems} />
      <div className="flex flex-col md:flex-row gap-4 p-4 md:p-8">
        <CardWithImage />
      </div>
    </div>
  );
};

export default CoursesDisplay;
