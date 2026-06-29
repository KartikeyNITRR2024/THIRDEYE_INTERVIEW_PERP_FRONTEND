import { createContext, useCallback } from "react";
import ApiCaller from "../properties/Apicaller";

export const CourseContext = createContext();
const api = new ApiCaller();

export function CourseProvider({ children }) {
  
  // POST: Create the course
  const createCourse = useCallback(async (courseData) => {
    const { response, data } = await api.call(`tokenmanager/v1/courses`, {
      method: "POST",
      body: JSON.stringify(courseData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(data?.errorMessage || "Failed to create course");
    }
    return data; // Should return the CourseDto with the generated UUID
  }, []);

  // GET: Fetch course status
  const getCourseStatus = useCallback(async (id) => {
    // Note: If your API returns a plain string instead of JSON, you might need to adjust ApiCaller.
    const { response, data } = await api.call(`tokenmanager/v1/courses/status/${id}`);
    
    if (!response.ok) {
      throw new Error(data?.errorMessage || "Failed to fetch course status");
    }
    return data; // Expected to be one of the CourseStatus enum strings
  }, []);

  return (
    <CourseContext.Provider value={{ createCourse, getCourseStatus }}>
      {children}
    </CourseContext.Provider>
  );
}