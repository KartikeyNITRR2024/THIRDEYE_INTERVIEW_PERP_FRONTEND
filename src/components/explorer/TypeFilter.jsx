import { Layers, Folder, FileText } from "lucide-react";
import { motion } from "framer-motion";

export default function TypeFilter({ currentFilter, onFilterChange }) {
  const filters = [
    { id: 'ALL', label: 'All', icon: Layers },
    { id: 'FOLDER', label: 'Folders', icon: Folder },
    { id: 'FILE', label: 'Files', icon: FileText },
  ];

  return (
    <div className="flex bg-slate-100/80 p-1 rounded-xl shrink-0 w-full sm:w-auto overflow-x-auto no-scrollbar">
      {filters.map((filter) => {
        const Icon = filter.icon;
        const isActive = currentFilter === filter.id;
        return (
          <button 
            key={filter.id}
            onClick={() => onFilterChange(filter.id)} 
            className={`relative flex-1 sm:flex-none flex items-center justify-center space-x-2 px-4 py-2 text-sm font-semibold rounded-lg transition-colors z-10 ${
              isActive ? 'text-indigo-700' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            {isActive && (
              <motion.div 
                layoutId="activeFilter" 
                className="absolute inset-0 bg-white shadow-sm rounded-lg -z-10"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
            <Icon className={`w-4 h-4 ${isActive ? 'stroke-[2.5px]' : ''}`} />
            <span>{filter.label}</span>
          </button>
        )
      })}
    </div>
  );
}