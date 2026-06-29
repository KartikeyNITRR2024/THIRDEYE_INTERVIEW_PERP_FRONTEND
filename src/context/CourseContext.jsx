import { createContext, useCallback, useState } from "react";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";
import ApiCaller from "../properties/Apicaller";

export const CourseContext = createContext();
const api = new ApiCaller();

export function CourseProvider({ children }) {
  // 1. Add loading state to prevent double-submissions
  const [isCreating, setIsCreating] = useState(false);

  const createCourse = useCallback(async (courseData) => {
    if (isCreating) return; // Prevent duplicate execution
    
    setIsCreating(true);
    const toastId = toast.loading(
      <div className="flex items-center">
        <span className="font-medium text-slate-700">Initializing AI engine...</span>
      </div>
    );

    try {
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
      
      toast.success("Course generation started!", { id: toastId });
      return data; 
    } catch (err) {
      toast.error(err.message, { id: toastId });
      throw err;
    } finally {
      setIsCreating(false); // Reset loading state
    }
  }, [isCreating]); // Dependency on isCreating ensures closure freshness

  const getCourseStatus = useCallback(async (id) => {
    try {
      const { response, data } = await api.call(`tokenmanager/v1/courses/status/${id}`);
      if (!response.ok) {
        throw new Error(data?.errorMessage || "Failed to fetch course status");
      }
      return data;
    } catch (err) {
      console.error("Status check failed:", err);
      throw err;
    }
  }, []);

  return (
    <CourseContext.Provider value={{ createCourse, getCourseStatus, isCreating }}>
      {children}
    </CourseContext.Provider>
  );
}