import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Folder, Film, MonitorPlay, Image as ImageIcon, 
  FileText, Database, Link as LinkIcon, File, 
  Crown, ChevronDown, Eye, Calendar, HardDrive, Download
} from 'lucide-react';

export default function ExplorerTable({ data, typeFilter, onItemClick }) {
  const [expandedItem, setExpandedItem] = useState(null);

  const getFileIcon = (fileType) => {
    switch (fileType) {
      case 'VIDEO': return <Film className="w-6 h-6 text-pink-500" />;
      case 'YOUTUBE': return <MonitorPlay className="w-6 h-6 text-red-500" />;
      case 'IMAGE': return <ImageIcon className="w-6 h-6 text-purple-500" />;
      case 'PDF': return <FileText className="w-6 h-6 text-red-500" />;
      case 'SQL': return <Database className="w-6 h-6 text-emerald-500" />;
      case 'URL': return <LinkIcon className="w-6 h-6 text-indigo-500" />;
      case 'DOCUMENT': return <FileText className="w-6 h-6 text-blue-500" />;
      default: return <File className="w-6 h-6 text-slate-400" />;
    }
  };

  const formatBytes = (bytes) => {
    if (!bytes) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  const formatViews = (views) => {
    if (!views) return '0';
    return views >= 1000 ? (views / 1000).toFixed(1) + 'k' : views.toLocaleString(); 
  };

  const toggleInfo = (e, uuid) => {
    e.stopPropagation(); 
    setExpandedItem((prev) => (prev === uuid ? null : uuid));
  };

  if (data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-slate-500 bg-white/50 backdrop-blur-sm rounded-3xl border border-slate-100 shadow-sm">
        <Folder className="w-16 h-16 text-slate-200 mb-4 stroke-[1.5px]" />
        <p className="text-lg font-medium">No items found</p>
      </div>
    );
  }

  return (
    <div className="bg-white/60 backdrop-blur-lg border border-slate-200/60 rounded-2xl shadow-sm overflow-hidden">
      <div className="divide-y divide-slate-100">
        {data.map((item) => (
          <div key={item.uuid} className="flex flex-col">
            
            {/* MAIN ROW */}
            <div 
              onClick={() => onItemClick(item)} 
              className="flex items-center px-4 py-4 hover:bg-slate-50/80 transition-colors cursor-pointer group min-h-[72px]"
            >
              <div className="flex-1 flex items-center min-w-0 pr-4">
                <div className="mr-4 p-2 bg-slate-100/50 rounded-xl group-hover:scale-110 transition-transform">
                  {item.type === "FOLDER" ? <Folder className="w-6 h-6 text-blue-500 fill-blue-100" /> : getFileIcon(item.fileType)}
                </div>
                
                <div className="flex flex-col min-w-0">
                  <span className="font-semibold text-slate-800 truncate text-base">{item.name}</span>
                  {/* Subtle context below name for mobile */}
                  <span className="text-xs text-slate-400 mt-0.5 truncate">
                    {item.type === 'FOLDER' ? `${item.noOfFiles || 0} Files` : formatBytes(item.sizeInBytes)}
                  </span>
                </div>
              </div>

              <div className="shrink-0 flex items-center space-x-2">
                {item.type === "FILE" && item.accessType === 'PAID' && (
                  <Crown className="w-5 h-5 text-amber-400 fill-amber-100" />
                )}
                
                <button
                  onClick={(e) => toggleInfo(e, item.uuid)}
                  className={`p-2 rounded-full transition-all ${expandedItem === item.uuid ? 'bg-indigo-100 text-indigo-600 rotate-180' : 'text-slate-400 hover:bg-slate-100'}`}
                >
                  <ChevronDown className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* EXPANDED ACCORDION */}
            <AnimatePresence>
              {expandedItem === item.uuid && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden bg-slate-50/50 border-t border-slate-100"
                >
                  <div className="p-5 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm cursor-default">
                    <div className="flex flex-col space-y-1">
                      <span className="text-slate-400 flex items-center text-xs uppercase tracking-wider font-semibold"><Calendar className="w-3 h-3 mr-1"/> Added</span>
                      <span className="text-slate-700 font-medium">{new Date(item.createdTime).toLocaleDateString()}</span>
                    </div>
                    
                    {item.type === 'FOLDER' ? (
                      <div className="flex flex-col space-y-1">
                        <span className="text-slate-400 flex items-center text-xs uppercase tracking-wider font-semibold"><Folder className="w-3 h-3 mr-1"/> Contents</span>
                        <span className="text-slate-700 font-medium">{item.noOfFolders || 0} Fld / {item.noOfFiles || 0} File</span>
                      </div>
                    ) : (
                      <div className="flex flex-col space-y-1">
                        <span className="text-slate-400 flex items-center text-xs uppercase tracking-wider font-semibold"><HardDrive className="w-3 h-3 mr-1"/> Size</span>
                        <span className="text-slate-700 font-medium">{formatBytes(item.sizeInBytes)}</span>
                      </div>
                    )}

                    <div className="flex flex-col space-y-1">
                      <span className="text-slate-400 flex items-center text-xs uppercase tracking-wider font-semibold"><Eye className="w-3 h-3 mr-1"/> Views</span>
                      <span className="text-slate-700 font-medium">{formatViews(item.viewCount)}</span>
                    </div>

                    {item.fileType === 'DOCUMENT' && (
                      <div className="flex flex-col space-y-1">
                        <span className="text-slate-400 flex items-center text-xs uppercase tracking-wider font-semibold"><Download className="w-3 h-3 mr-1"/> Downloads</span>
                        <span className="text-slate-700 font-medium">{item.downloadCount?.toLocaleString() || '0'}</span>
                      </div>
                    )}

                    {(item.description || item.url) && (
                      <div className="col-span-2 md:col-span-4 mt-2 pt-4 border-t border-slate-200/60 flex flex-col space-y-2">
                        {item.description && <p className="text-slate-600">{item.description}</p>}
                        {item.url && (
                          <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-indigo-600 font-medium hover:underline truncate inline-block w-full">
                            {item.url}
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            
          </div>
        ))}
      </div>
    </div>
  );
}