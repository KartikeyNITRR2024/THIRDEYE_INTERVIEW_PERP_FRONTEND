import { Search, X, Sparkles } from "lucide-react";

export default function SearchBar({ value, onChange, onClear, placeholder = "Search algorithms, system design..." }) {
  // Example AI Chips to guide the user
  const aiSuggestions = ["System Design", "React Hooks", "Kafka", "Dynamic Programming"];

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col space-y-4">
      <div className="relative group">
        {/* Glow effect behind search bar */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
        
        <div className="relative flex items-center bg-white rounded-2xl shadow-sm">
          <div className="absolute inset-y-0 left-0 flex items-center pl-5 pointer-events-none">
            <Search className="w-6 h-6 text-indigo-400" />
          </div>
          
          <input
            type="text"
            autoFocus
            className="block w-full py-5 pl-14 pr-12 text-lg text-slate-900 bg-transparent rounded-2xl focus:ring-0 outline-none placeholder-slate-400"
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
          />
          
          {value && (
            <button 
              onClick={onClear}
              className="absolute inset-y-0 right-0 flex items-center pr-5 text-slate-400 hover:text-slate-700 transition-colors"
            >
              <X className="w-6 h-6 bg-slate-100 rounded-full p-1" />
            </button>
          )}
        </div>
      </div>

      {/* AI Suggested Chips - Only show when search is empty */}
      {!value && (
        <div className="flex flex-wrap gap-2 px-1">
          <div className="flex items-center text-xs font-bold text-slate-400 uppercase tracking-wider mr-2">
            <Sparkles className="w-4 h-4 mr-1 text-indigo-400" /> Trending
          </div>
          {aiSuggestions.map((term) => (
            <button 
              key={term}
              onClick={() => onChange(term)}
              className="px-3 py-1.5 bg-indigo-50/50 text-indigo-700 hover:bg-indigo-100 text-sm font-medium rounded-full transition-colors border border-indigo-100"
            >
              {term}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}