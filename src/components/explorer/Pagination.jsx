import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({ isFirst, isLast, currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-between items-center mt-6 bg-white/60 backdrop-blur-md p-3 sm:p-4 rounded-2xl shadow-sm border border-slate-200/60">
      <button 
        disabled={isFirst} 
        onClick={() => onPageChange(currentPage - 1)} 
        className={`flex items-center px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
          isFirst 
            ? "bg-slate-50 text-slate-400 cursor-not-allowed" 
            : "bg-indigo-50 text-indigo-700 hover:bg-indigo-100 active:scale-95"
        }`}
      >
        <ChevronLeft className="w-4 h-4 mr-1" />
        <span className="hidden sm:inline">Previous</span>
      </button>

      <div className="flex items-center space-x-1">
        <span className="text-slate-500 text-sm font-medium">Page</span>
        <span className="bg-white px-3 py-1 rounded-lg border border-slate-200 text-slate-800 font-bold text-sm shadow-sm">
          {currentPage + 1}
        </span>
        <span className="text-slate-500 text-sm font-medium">of {totalPages}</span>
      </div>

      <button 
        disabled={isLast} 
        onClick={() => onPageChange(currentPage + 1)} 
        className={`flex items-center px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
          isLast 
            ? "bg-slate-50 text-slate-400 cursor-not-allowed" 
            : "bg-indigo-50 text-indigo-700 hover:bg-indigo-100 active:scale-95"
        }`}
      >
        <span className="hidden sm:inline">Next</span>
        <ChevronRight className="w-4 h-4 ml-1" />
      </button>
    </div>
  );
}