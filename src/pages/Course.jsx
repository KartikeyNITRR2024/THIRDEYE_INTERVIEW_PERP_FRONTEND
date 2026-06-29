import { useState, useContext, useEffect } from "react";
import { CourseContext } from "../context/CourseContext";
import toast from "react-hot-toast";

// Sub-components
import CourseHeader from "../components/course/CourseHeader";
import CourseForm from "../components/course/CourseForm";
import CourseStatusTracker from "../components/course/CourseStatusTracker";
import CourseErrorState from "../components/course/CourseErrorState";

export default function CoursePage() {
  const { createCourse, getCourseStatus } = useContext(CourseContext);
  
  // Process State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeCourseId, setActiveCourseId] = useState(null);
  const [currentStatus, setCurrentStatus] = useState(null); 

  const handleCourseSubmit = async (formData) => {
    setIsSubmitting(true);
    try {
      const createdCourse = await createCourse(formData);
      setActiveCourseId(createdCourse.id);
      setCurrentStatus("PROCESSING");
      toast.success("Course generation started!");
    } catch (err) {
      toast.error(err.message || "Failed to submit course request");
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setActiveCourseId(null);
    setCurrentStatus(null);
    setIsSubmitting(false);
  };

  // Polling Logic
  useEffect(() => {
    let intervalId;

    if (activeCourseId && currentStatus !== "MAILED_COMPLETED" && currentStatus !== "FAILED") {
      intervalId = setInterval(async () => {
        try {
          const status = await getCourseStatus(activeCourseId);
          setCurrentStatus(status);
          
          if (status === "MAILED_COMPLETED") {
            toast.success("Course successfully delivered!");
            setIsSubmitting(false);
          } else if (status === "FAILED") {
            toast.error("Course generation failed.");
            setIsSubmitting(false);
          }
        } catch (err) {
          console.error("Failed to poll status:", err);
        }
      }, 10000); // 10 seconds
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [activeCourseId, currentStatus, getCourseStatus]);

  return (
    <div className="max-w-3xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <CourseHeader />

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
        {/* Render Error State */}
        {activeCourseId && currentStatus === "FAILED" && (
          <CourseErrorState onReset={handleReset} />
        )}

        {/* Render Progress Tracker */}
        {activeCourseId && currentStatus !== "FAILED" && (
          <CourseStatusTracker currentStatus={currentStatus} />
        )}

        {/* Render Form (Hide if actively processing) */}
        {(!activeCourseId || currentStatus === "FAILED") && (
          <CourseForm onSubmit={handleCourseSubmit} isSubmitting={isSubmitting} />
        )}
      </div>
    </div>
  );
}