import { AlertCircle, RotateCcw } from "lucide-react";

export default function CourseErrorState({ onReset }) {
  return (
    <div className="text-center p-8 bg-red-50/50 backdrop-blur-sm border border-red-100 rounded-2xl">
      <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <AlertCircle className="w-8 h-8 text-red-500" />
      </div>
      <h3 className="text-xl font-bold text-red-900 mb-2">Generation Failed</h3>
      <p className="text-red-600 mb-6 max-w-sm mx-auto">
        The AI encountered an anomaly while processing the requirements. Please verify the URL and description.
      </p>
      <button 
        onClick={onReset}
        className="inline-flex items-center px-6 py-3 bg-red-600 text-white font-semibold rounded-xl hover:bg-red-700 transition-colors"
      >
        <RotateCcw className="w-4 h-4 mr-2" /> Reset & Try Again
      </button>
    </div>
  );
}