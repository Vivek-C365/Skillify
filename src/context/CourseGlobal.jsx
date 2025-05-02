import CourseContext from "./CourseContext";
import data from "../services/api/data.json";

export const CourseContextProvider = ({ children }) => {
  return (
    <CourseContext.Provider value={{ data }}>{children}</CourseContext.Provider>
  );
};
