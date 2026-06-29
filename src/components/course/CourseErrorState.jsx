import { FaTimesCircle } from "react-icons/fa";

export default function CourseErrorState({ onReset }) {
  return (
    <div className="text-center p-6 bg-red-50 border border-red-200 rounded-lg animate-in fade-in duration-300">
      <FaTimesCircle className="text-4xl text-red-500 mx-auto mb-2" />
      <h3 className="text-lg font-bold text-red-700">Process Failed</h3>
      <p className="text-red-600 mb-4">We encountered an error while generating your course. Please review your details and try again.</p>
      <button 
        onClick={onReset}
        className="px-6 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors"
      >
        Reset Form
      </button>
    </div>
  );
}