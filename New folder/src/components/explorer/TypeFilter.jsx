import { FaList, FaFolder, FaFileAlt } from "react-icons/fa";

export default function TypeFilter({ currentFilter, onFilterChange }) {
  const filters = [
    { id: 'ALL', label: 'All', icon: <FaList /> },
    { id: 'FOLDER', label: 'Folders', icon: <FaFolder /> },
    { id: 'FILE', label: 'Files', icon: <FaFileAlt /> },
  ];

  return (
    <div className="flex bg-slate-100 p-1 rounded-md shrink-0">
      {filters.map((filter) => (
        <button 
          key={filter.id}
          onClick={() => onFilterChange(filter.id)} 
          className={`flex items-center space-x-1.5 px-3 py-1.5 text-xs font-medium rounded-sm transition-all duration-200 ${
            currentFilter === filter.id 
              ? 'bg-white shadow-sm text-blue-600' 
              : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'
          }`}
        >
          <span>{filter.icon}</span>
          <span>{filter.label}</span>
        </button>
      ))}
    </div>
  );
}