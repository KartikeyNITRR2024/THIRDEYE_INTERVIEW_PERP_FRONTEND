import { createContext, useState, useCallback } from "react";
import toast from "react-hot-toast";
import ApiCaller from "../properties/Apicaller";

export const FolderContext = createContext();
const api = new ApiCaller();

export function FolderProvider({ children }) {
  // Folder Browsing State
  const [currentData, setCurrentData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Global Search State
  const [searchData, setSearchData] = useState(null);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState(null);

  // Global Navigation Stack
  const [pathStack, setPathStack] = useState([]);

  const recordAction = useCallback((id, type = 'VIEW') => {
    if (!id) return;
    api.call(`interviewperp/action/${id}?type=${type}`, { method: 'POST' })
       .catch(err => console.error("Silent background tracking failed:", err));
  }, []);

  // Fetch Contents API
  const fetchContents = useCallback(async (folderId = null, page = 0, size = 20, typeFilter = 'ALL') => {
    setLoading(true);
    setError(null);
    
    // REMOVED: toast.loading() 
    // The page-level loading state (loading={true}) in your UI components
    // will now handle the visual feedback without conflict.

    try {
      let endpoint = folderId 
        ? `interviewperp/contents/${folderId}?page=${page}&size=${size}`
        : `interviewperp/root?page=${page}&size=${size}`;

      if (typeFilter !== 'ALL') {
        endpoint += `&typeFilter=${typeFilter}`;
      }

      const { response, data } = await api.call(endpoint);

      if (!response.ok) {
        throw new Error(data?.errorMessage || `Failed to fetch: ${response.statusText}`);
      }
      
      setCurrentData(data);
    } catch (err) {
      setError(err.message);
      toast.error(`Error: ${err.message}`); // Only toast on actual errors
    } finally {
      setLoading(false);
    }
  }, []);

  // Global Search API
  const searchGlobal = useCallback(async (query, page = 0, size = 20) => {
    if (!query || query.trim() === '') {
      setSearchData(null);
      return;
    }
    setSearchLoading(true);
    setSearchError(null);

    try {
      const endpoint = `interviewperp/search?page=${page}&size=${size}&query=${encodeURIComponent(query)}`;
      const { response, data } = await api.call(endpoint);
      
      if (!response.ok) {
        throw new Error(data?.errorMessage || `Search failed: ${response.statusText}`);
      }
      
      setSearchData(data);
    } catch (err) {
      setSearchError(err.message);
      toast.error(`Search failed: ${err.message}`);
    } finally {
      setSearchLoading(false);
    }
  }, []);

  return (
    <FolderContext.Provider value={{ 
      currentData, loading, error, fetchContents,
      searchData, searchLoading, searchError, searchGlobal,
      pathStack, setPathStack, recordAction 
    }}>
      {children}
    </FolderContext.Provider>
  );
}