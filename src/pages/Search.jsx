import { useState, useContext, useEffect } from "react";
import { FolderContext } from "../context/FolderContext";
import { motion } from "framer-motion";
import { Sparkles, Loader2, Search as SearchIcon, AlertCircle } from "lucide-react";

import SearchBar from "../components/explorer/SearchBar"; // Adjust path if needed
import ExplorerTable from "../components/explorer/ExplorerTable";
import Pagination from "../components/explorer/Pagination"; 
import { useNavigate } from "react-router-dom";// Added for paginated search results

export default function SearchPage() {
  const { 
    searchData, 
    searchLoading, 
    searchError, 
    searchGlobal, 
    recordAction 
  } = useContext(FolderContext);
  
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const navigate = useNavigate();

  // 1. Debounce the search input to prevent API spam while typing
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 400); // Waits 400ms after the user stops typing

    return () => {
      clearTimeout(handler);
    };
  }, [query]);

  // 2. Trigger the global search context when the debounced query changes
  useEffect(() => {
    if (debouncedQuery.trim() !== "") {
      searchGlobal(debouncedQuery, 0); // Start at page 0
    } else {
      searchGlobal(""); // Clears context data if empty
    }
  }, [debouncedQuery, searchGlobal]);

  // 3. Handlers
  const handleClear = () => {
    setQuery("");
    setDebouncedQuery("");
  };

  const handlePageChange = (newPageNumber) => {
    searchGlobal(debouncedQuery, newPageNumber);
  };

  const handleItemClick = (item) => {
    if (item.type === "FILE" && item.url) {
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
      console.error(err.message);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8 mb-20 md:mb-0 min-h-[80vh] flex flex-col"
    >
      {/* Header Area */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center p-3 bg-indigo-50 rounded-2xl mb-4">
          <SearchIcon className="w-8 h-8 text-indigo-600" />
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
          Global <span className="bg-gradient-to-r from-indigo-600 to-purple-500 bg-clip-text text-transparent">Search</span>
        </h1>
        <p className="text-slate-500 max-w-lg mx-auto">
          Find system design diagrams, algorithms, and interview templates instantly across your entire material hub.
        </p>
      </div>

      {/* The Search Bar Component */}
      <div className="mb-10 relative z-20">
        <SearchBar 
          value={query} 
          onChange={setQuery} // Updates local state, debounce handles the API trigger
          onClear={handleClear} 
        />
      </div>

      {/* Error State */}
      {searchError && (
        <div className="mb-6 flex items-center gap-3 bg-red-50/80 text-red-700 p-5 rounded-2xl border border-red-100 shadow-sm">
          <AlertCircle className="w-6 h-6 shrink-0" />
          <p className="font-medium">Search Error: {searchError}</p>
        </div>
      )}

      {/* Results Area */}
      <div className="flex-1">
        {searchLoading ? (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="relative">
              <div className="absolute inset-0 bg-indigo-500 blur-xl opacity-20 rounded-full"></div>
              <Loader2 className="w-10 h-10 text-indigo-600 animate-spin relative z-10" />
            </div>
            <p className="text-slate-500 font-medium mt-4 flex items-center">
              <Sparkles className="w-4 h-4 mr-2 text-indigo-400" /> AI is scanning your hub...
            </p>
          </div>
        ) : searchData && searchData.content ? (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center justify-between mb-4 px-2">
              <h3 className="font-bold text-slate-800 text-lg">
                Results for "<span className="text-indigo-600">{debouncedQuery}</span>"
              </h3>
              <span className="bg-indigo-50 text-indigo-700 text-xs font-bold px-2.5 py-1 rounded-full">
                {searchData.totalElements || searchData.content.length} found
              </span>
            </div>
            
            <ExplorerTable 
              data={searchData.content} 
              typeFilter="ALL" 
              onItemClick={handleItemClick} 
            />

            {/* Added Pagination for Search Results */}
            <Pagination 
              isFirst={searchData.first} 
              isLast={searchData.last} 
              currentPage={searchData.number} 
              totalPages={searchData.totalPages} 
              onPageChange={handlePageChange} 
            />
          </motion.div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center opacity-50 py-16">
            <SearchIcon className="w-16 h-16 text-slate-300 mb-4 stroke-[1px]" />
            <p className="text-lg text-slate-400 font-medium text-center">
              Start typing to search <br className="md:hidden"/> folders and documents
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
}