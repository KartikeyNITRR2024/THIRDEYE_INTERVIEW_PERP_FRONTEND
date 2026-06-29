import { useState, useContext, useEffect } from "react";
import { CourseContext } from "../context/CourseContext";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

import CourseHeader from "../components/course/CourseHeader";
import CourseForm from "../components/course/CourseForm";
import CourseStatusTracker from "../components/course/CourseStatusTracker";
import CourseErrorState from "../components/course/CourseErrorState";

export default function CoursePage() {
  const { createCourse, getCourseStatus } = useContext(CourseContext);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeCourseId, setActiveCourseId] = useState(null);
  const [currentStatus, setCurrentStatus] = useState(null); 

  const handleCourseSubmit = async (formData) => {
    setIsSubmitting(true);
    try {
      const createdCourse = await createCourse(formData);
      setActiveCourseId(createdCourse.id);
      setCurrentStatus("PROCESSING");
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

  useEffect(() => {
    let intervalId;
    if (activeCourseId && currentStatus !== "MAILED_COMPLETED" && currentStatus !== "FAILED") {
      intervalId = setInterval(async () => {
        try {
          const status = await getCourseStatus(activeCourseId);
          setCurrentStatus(status);
          
          if (status === "MAILED_COMPLETED") {
            toast.success("Curriculum delivered to your inbox!");
            setIsSubmitting(false);
          } else if (status === "FAILED") {
            toast.error("Generation failed. Please try again.");
            setIsSubmitting(false);
          }
        } catch (err) {
          console.error("Failed to poll status:", err);
        }
      }, 10000); 
    }
    return () => { if (intervalId) clearInterval(intervalId); };
  }, [activeCourseId, currentStatus, getCourseStatus]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8 mb-20 md:mb-0" // mb-20 for mobile bottom nav
    >
      <CourseHeader />

      <div className="bg-white/60 backdrop-blur-xl rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 p-6 md:p-10 relative overflow-hidden">
        {/* Subtle background glow effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-32 bg-indigo-50/50 blur-3xl -z-10 rounded-full" />

        {activeCourseId && currentStatus === "FAILED" && (
          <CourseErrorState onReset={handleReset} />
        )}

        {activeCourseId && currentStatus !== "FAILED" && (
          <CourseStatusTracker currentStatus={currentStatus} />
        )}

        {(!activeCourseId || currentStatus === "FAILED") && (
          <CourseForm onSubmit={handleCourseSubmit} isSubmitting={isSubmitting} />
        )}
      </div>
    </motion.div>
  );
}