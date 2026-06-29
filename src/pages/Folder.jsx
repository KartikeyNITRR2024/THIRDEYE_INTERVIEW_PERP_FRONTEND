import { useContext, useEffect, useState } from "react";
import { FolderContext } from "../context/FolderContext";
import { motion } from "framer-motion";
import ExplorerNav from "../components/explorer/ExplorerNav";
import TypeFilter from "../components/explorer/TypeFilter";
import ExplorerTable from "../components/explorer/ExplorerTable";
import Pagination from "../components/explorer/Pagination";
import { Loader2, AlertCircle, FolderKanban } from "lucide-react"; 
import { useNavigate } from "react-router-dom";

export default function Folder() {
  const { currentData, loading, error, fetchContents, pathStack, setPathStack, recordAction } = useContext(FolderContext);
  const [typeFilter, setTypeFilter] = useState('ALL');

  const currentFolder = pathStack.length > 0 ? pathStack[pathStack.length - 1] : null;
  const currentFolderId = currentFolder ? currentFolder.uuid : null;
  const navigate = useNavigate();

  useEffect(() => {
    fetchContents(currentFolderId, 0, 20, typeFilter);
  }, [currentFolderId, typeFilter, fetchContents]);

  const handleItemClick = (item) => {
    if (item.type === "FOLDER") {
      setPathStack([...pathStack, { uuid: item.uuid, name: item.name }]);
      setTypeFilter('ALL'); 
    } else if (item.type === "FILE") {
      if(item.fileType === "PDF" || item.fileType === "DOCUMENT" || item.fileType === "SQL" || item.fileType === "IMAGE" || item.fileType === "VIDEO")
      {
        navigate(`/view/${item.uuid}`, { state: { item } });
      }
      else
      {
        window.open(item.url, '_blank');
      }
    }
    try {
      if(item.uuid) recordAction(item.uuid);
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleNavigateUp = () => setPathStack(pathStack.slice(0, -1));
  const handleBreadcrumbClick = (index) => setPathStack(pathStack.slice(0, index + 1));
  const handleRootClick = () => setPathStack([]);
  const handlePageChange = (newPageNumber) => fetchContents(currentFolderId, newPageNumber, 20, typeFilter);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-5xl mx-auto py-6 px-4 sm:px-6 lg:px-8 mb-20 md:mb-0"
    >
      
      {/* Header Section */}
      <div className="text-center mb-8 md:mb-10">
        <div className="inline-flex items-center justify-center p-3 bg-indigo-50 rounded-2xl mb-4">
          <FolderKanban className="w-8 h-8 text-indigo-600" />
        </div>
        <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
          Resource <span className="bg-gradient-to-r from-indigo-600 to-purple-500 bg-clip-text text-transparent">Explorer</span>
        </h1>
        <p className="text-base md:text-lg text-slate-500 max-w-2xl mx-auto">
          Navigate through hierarchical folders to browse curated interview templates, architecture diagrams, and essential study materials.
        </p>
      </div>

      {/* Control Bar */}
      <div className="mb-6 sticky top-16 md:top-20 z-30 bg-slate-50/80 backdrop-blur-xl py-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:bg-transparent sm:backdrop-blur-none">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-white/70 backdrop-blur-md border border-slate-200/60 rounded-2xl p-2 shadow-sm gap-3">
          <ExplorerNav 
            pathStack={pathStack} 
            onNavigateUp={handleNavigateUp} 
            onRootClick={handleRootClick} 
            onBreadcrumbClick={handleBreadcrumbClick} 
          />
          <TypeFilter currentFilter={typeFilter} onFilterChange={setTypeFilter} />
        </div>
      </div>

      {/* Status States */}
      {loading && (
        <div className="flex flex-col justify-center items-center py-20 bg-white/50 backdrop-blur-md border border-slate-200 rounded-3xl shadow-sm">
          <Loader2 className="w-10 h-10 text-indigo-600 animate-spin mb-4" />
          <p className="text-slate-500 font-medium">Fetching materials...</p>
        </div>
      )}
      
      {error && (
        <div className="flex items-center gap-3 bg-red-50/80 text-red-700 p-5 rounded-2xl border border-red-100 shadow-sm">
          <AlertCircle className="w-6 h-6 shrink-0" />
          <p className="font-medium">Error: {error}</p>
        </div>
      )}

      {/* Main Data Render */}
      {!loading && !error && currentData && (
        <motion.div layout>
          <ExplorerTable data={currentData.content} typeFilter={typeFilter} onItemClick={handleItemClick} />
          <Pagination 
            isFirst={currentData.first} 
            isLast={currentData.last} 
            currentPage={currentData.number} 
            totalPages={currentData.totalPages} 
            onPageChange={handlePageChange} 
          />
        </motion.div>
      )}
    </motion.div>
  );
}