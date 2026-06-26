import { useState } from "react";

export default function ExplorerNav({ pathStack, onNavigateUp, onRootClick, onBreadcrumbClick }) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const currentFolder = pathStack.length > 0 ? pathStack[pathStack.length - 1] : null;

  const handleBreadcrumb = (index) => {
    onBreadcrumbClick(index);
    setIsMobileOpen(false);
  };

  const handleRoot = () => {
    onRootClick();
    setIsMobileOpen(false);
  };

  return (
    <div className="flex items-center min-w-0">
      <button 
        onClick={onNavigateUp}
        disabled={pathStack.length === 0}
        className={`p-2 rounded-md transition-colors mr-2 shrink-0 ${pathStack.length === 0 ? "text-slate-300 cursor-not-allowed" : "text-slate-600 hover:bg-slate-100"}`}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
      </button>

      {/* Desktop Breadcrumbs */}
      <div className="hidden sm:flex items-center space-x-2 text-sm font-medium text-slate-600 overflow-x-auto whitespace-nowrap scrollbar-hide">
        <button onClick={handleRoot} className={`hover:bg-slate-100 px-2 py-1 rounded transition-colors ${pathStack.length === 0 ? "text-blue-600" : ""}`}>Root</button>
        {pathStack.map((folder, index) => (
          <div key={folder.uuid} className="flex items-center">
            <span className="text-slate-400 mx-1">›</span>
            <button onClick={() => handleBreadcrumb(index)} className={`hover:bg-slate-100 px-2 py-1 rounded transition-colors ${index === pathStack.length - 1 ? "text-blue-600" : ""}`}>{folder.name}</button>
          </div>
        ))}
      </div>

      {/* Mobile Breadcrumbs */}
      <div className="sm:hidden relative">
        <button onClick={() => setIsMobileOpen(!isMobileOpen)} className="flex items-center space-x-1 text-sm font-medium text-slate-700 bg-slate-50 hover:bg-slate-100 px-3 py-1.5 rounded-md border border-slate-200">
          <span className="truncate max-w-[120px]">{pathStack.length === 0 ? "Root" : currentFolder.name}</span>
          <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
        </button>
        {isMobileOpen && (
          <div className="absolute left-0 top-full mt-1 w-56 bg-white border border-slate-200 rounded-md shadow-lg py-1 z-20 max-h-60 overflow-y-auto">
            <button onClick={handleRoot} className={`w-full text-left px-4 py-2 text-sm transition-colors ${pathStack.length === 0 ? 'bg-blue-50 text-blue-600 font-semibold' : 'text-slate-700 hover:bg-slate-50'}`}>Root</button>
            {pathStack.map((folder, index) => (
              <button key={folder.uuid} onClick={() => handleBreadcrumb(index)} style={{ paddingLeft: `${(index + 1) * 1}rem` }} className={`w-full flex items-center text-left pr-4 py-2 text-sm transition-colors ${index === pathStack.length - 1 ? 'bg-blue-50 text-blue-600 font-semibold' : 'text-slate-700 hover:bg-slate-50'}`}>
                <span className="text-slate-400 mr-2 shrink-0">↳</span> <span className="truncate">{folder.name}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}