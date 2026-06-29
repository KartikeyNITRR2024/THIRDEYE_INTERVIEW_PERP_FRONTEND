import { FaGraduationCap } from "react-icons/fa";

export default function CourseHeader() {
  return (
    <div className="text-center mb-10">
      <h1 className="text-4xl font-extrabold text-slate-900 flex items-center justify-center mb-4">
        <FaGraduationCap className="mr-3 text-blue-600" /> Generate Course
      </h1>
      <p className="text-lg text-slate-600">
        Provide the job details below and we will extract the requirements to build a custom preparation course.
      </p>
    </div>
  );
}