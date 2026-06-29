import { ChevronRight, Home, CornerLeftUp } from "lucide-react";

export default function ExplorerNav({ pathStack, onNavigateUp, onRootClick, onBreadcrumbClick }) {
  return (
    <div className="flex items-center w-full sm:w-auto min-w-0 overflow-hidden">
      <button 
        onClick={onNavigateUp}
        disabled={pathStack.length === 0}
        className={`p-2.5 rounded-xl transition-colors mr-2 shrink-0 ${
          pathStack.length === 0 ? "text-slate-300 cursor-not-allowed" : "text-slate-700 bg-slate-100 hover:bg-slate-200"
        }`}
      >
        <CornerLeftUp className="w-5 h-5" />
      </button>

      {/* Horizontally scrollable breadcrumbs */}
      <div className="flex items-center space-x-1 overflow-x-auto no-scrollbar scroll-smooth w-full pr-4 pb-1">
        <button 
          onClick={onRootClick} 
          className={`flex items-center px-3 py-1.5 rounded-lg text-sm font-medium transition-colors shrink-0 ${
            pathStack.length === 0 ? "bg-indigo-50 text-indigo-700" : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          <Home className="w-4 h-4 mr-1.5" /> Root
        </button>
        
        {pathStack.map((folder, index) => (
          <div key={folder.uuid} className="flex items-center shrink-0">
            <ChevronRight className="w-4 h-4 text-slate-400 mx-0.5" />
            <button 
              onClick={() => onBreadcrumbClick(index)} 
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors max-w-[120px] truncate ${
                index === pathStack.length - 1 ? "bg-indigo-50 text-indigo-700" : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              {folder.name}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}