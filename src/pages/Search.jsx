import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FolderContext } from "../context/FolderContext";
import SearchBar from "../components/explorer/SearchBar";
import ExplorerTable from "../components/explorer/ExplorerTable";
import Pagination from "../components/explorer/Pagination";
import { FaSearch, FaKeyboard } from "react-icons/fa";

export default function Search() {
  const { searchData, searchLoading, searchError, searchGlobal, setPathStack, recordAction } = useContext(FolderContext);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  // Debounced Search Effect
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      searchGlobal(searchQuery, 0, 20);
    }, 400);
    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery, searchGlobal]);

  // Handlers
  const handleItemClick = (item) => {
    if (item.type === "FOLDER") {
      setPathStack([{ uuid: item.uuid, name: item.name }]);
      navigate("/");
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

  const handlePageChange = (newPageNumber) => {
    searchGlobal(searchQuery, newPageNumber, 20);
  };

  return (
    <div>
      {/* Header & Search Bar */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800 mb-6 flex items-center">
          <FaSearch className="mr-3 text-blue-600" /> Global Search
        </h1>
        <SearchBar 
          value={searchQuery} 
          onChange={setSearchQuery} 
          onClear={() => setSearchQuery('')} 
          placeholder="Search across all files and folders..."
        />
      </div>

      {/* Loading & Error States */}
      {searchLoading && (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
        </div>
      )}
      {searchError && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg border border-red-200 shadow-sm">
          Error: {searchError}
        </div>
      )}

      {/* Default State (Empty Input) */}
      {!searchQuery && !searchLoading && !searchData && (
        <div className="text-center py-20 text-slate-500 bg-white rounded-xl shadow-sm border border-slate-200 border-dashed">
          <div className="text-5xl mb-4 flex justify-center text-slate-300">
            <FaKeyboard />
          </div>
          <h3 className="text-lg font-medium text-slate-700">Start typing to search</h3>
          <p className="text-sm mt-1">Find documents, PDFs, SQL scripts, and folders instantly.</p>
        </div>
      )}

      {/* Results State */}
      {!searchLoading && !searchError && searchData && (
        <>
          <ExplorerTable 
            data={searchData.content} 
            typeFilter="ALL" 
            onItemClick={handleItemClick} 
          />

          <Pagination 
            isFirst={searchData.first} 
            isLast={searchData.last} 
            currentPage={searchData.number} 
            totalPages={searchData.totalPages} 
            onPageChange={handlePageChange} 
          />
        </>
      )}
    </div>
  );
}