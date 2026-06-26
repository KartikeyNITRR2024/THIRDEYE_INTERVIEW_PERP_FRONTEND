export default function Pagination({ isFirst, isLast, currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-between items-center mt-6 bg-white p-4 rounded-lg shadow-sm border border-slate-200">
      <button 
        disabled={isFirst} 
        onClick={() => onPageChange(currentPage - 1)} 
        className={`px-4 py-2 rounded-md font-medium transition-colors ${isFirst ? "bg-slate-100 text-slate-400 cursor-not-allowed" : "bg-blue-50 text-blue-600 hover:bg-blue-100"}`}
      >
        ← Previous
      </button>
      <span className="text-slate-600 text-sm font-medium">Page {currentPage + 1} of {totalPages}</span>
      <button 
        disabled={isLast} 
        onClick={() => onPageChange(currentPage + 1)} 
        className={`px-4 py-2 rounded-md font-medium transition-colors ${isLast ? "bg-slate-100 text-slate-400 cursor-not-allowed" : "bg-blue-50 text-blue-600 hover:bg-blue-100"}`}
      >
        Next →
      </button>
    </div>
  );
}