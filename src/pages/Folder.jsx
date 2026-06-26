import { useContext, useEffect, useState } from "react";
import { FolderContext } from "../context/FolderContext";
import ExplorerNav from "../components/explorer/ExplorerNav";
import TypeFilter from "../components/explorer/TypeFilter";
import ExplorerTable from "../components/explorer/ExplorerTable";
import Pagination from "../components/explorer/Pagination";
import { FaFolderOpen } from "react-icons/fa";


export default function Folder() {
  const { currentData, loading, error, fetchContents, pathStack, setPathStack, recordAction } = useContext(FolderContext);
  const [typeFilter, setTypeFilter] = useState('ALL');

  const currentFolder = pathStack.length > 0 ? pathStack[pathStack.length - 1] : null;
  const currentFolderId = currentFolder ? currentFolder.uuid : null;

  // Fetch data on load, folder change, or filter change
  useEffect(() => {
    fetchContents(currentFolderId, 0, 20, typeFilter);
  }, [currentFolderId, typeFilter, fetchContents]);

  // Handlers
  const handleItemClick = (item) => {
    if (item.type === "FOLDER") {
      setPathStack([...pathStack, { uuid: item.uuid, name: item.name }]);
      setTypeFilter('ALL'); 
    } else if (item.type === "FILE") {
      window.open(item.url, '_blank');
    }
    try
    {
      if(item.uuid)
      {
        recordAction(item.uuid)
      }
    }
    catch (err) {
      console.log(err.message);
    }
  };

  const handleNavigateUp = () => setPathStack(pathStack.slice(0, -1));
  const handleBreadcrumbClick = (index) => setPathStack(pathStack.slice(0, index + 1));
  const handleRootClick = () => setPathStack([]);
  const handlePageChange = (newPageNumber) => fetchContents(currentFolderId, newPageNumber, 20, typeFilter);

  return (
    <div>

      {/* Control Bar */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-white border border-slate-300 rounded-lg p-2 shadow-sm gap-4 sm:gap-0">
          <ExplorerNav 
            pathStack={pathStack} 
            onNavigateUp={handleNavigateUp} 
            onRootClick={handleRootClick} 
            onBreadcrumbClick={handleBreadcrumbClick} 
          />
          <TypeFilter 
            currentFilter={typeFilter} 
            onFilterChange={setTypeFilter} 
          />
        </div>
      </div>

      {/* Status States */}
      {loading && (
        <div className="flex justify-center items-center py-12 bg-white border border-slate-200 rounded-xl shadow-sm">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
        </div>
      )}
      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg border border-red-200 shadow-sm">
          Error: {error}
        </div>
      )}

      {/* Main Data Render */}
      {!loading && !error && currentData && (
        <>
          <ExplorerTable 
            data={currentData.content} 
            typeFilter={typeFilter} 
            onItemClick={handleItemClick} 
          />
          
          <Pagination 
            isFirst={currentData.first} 
            isLast={currentData.last} 
            currentPage={currentData.number} 
            totalPages={currentData.totalPages} 
            onPageChange={handlePageChange} 
          />
        </>
      )}
    </div>
  );
}