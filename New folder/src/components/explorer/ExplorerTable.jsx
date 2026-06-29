import React, { useState } from 'react';
import { 
  FaFolder, 
  FaFileVideo, 
  FaYoutube, 
  FaFileImage, 
  FaFilePdf, 
  FaDatabase, 
  FaLink, 
  FaFileAlt, 
  FaFile, 
  FaCrown, 
  FaTimes,
  FaFolderOpen,
  FaBoxOpen,
  FaEye,
  FaInfoCircle // <-- Added Info icon
} from 'react-icons/fa';

export default function ExplorerTable({ data, typeFilter, onItemClick }) {
  const [expandedItem, setExpandedItem] = useState(null);

  // --- HELPERS ---
  const getFileIcon = (fileType) => {
    switch (fileType) {
      case 'VIDEO': return <FaFileVideo className="text-pink-500" />;
      case 'YOUTUBE': return <FaYoutube className="text-red-500" />;
      case 'IMAGE': return <FaFileImage className="text-purple-500" />;
      case 'PDF': return <FaFilePdf className="text-red-500" />;
      case 'SQL': return <FaDatabase className="text-emerald-500" />;
      case 'URL': return <FaLink className="text-indigo-500" />;
      case 'DOCUMENT': return <FaFileAlt className="text-blue-500" />;
      default: return <FaFile className="text-slate-400" />;
    }
  };

  const formatBytes = (bytes) => {
    if (!bytes) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleString();
  };

  const formatViews = (views) => {
    if (!views && views !== 0) return '0';
    if (views >= 1000) {
      return (views / 1000).toFixed(views % 1000 === 0 ? 0 : 1) + 'k';
    }
    return views.toLocaleString(); 
  };

  const toggleInfo = (e, uuid) => {
    e.stopPropagation(); 
    setExpandedItem((prev) => (prev === uuid ? null : uuid));
  };

  if (data.length === 0) {
    return (
      <div className="text-center py-16 text-slate-500 bg-white rounded-xl shadow-sm border border-slate-200">
        <div className="text-5xl mb-4 flex justify-center text-slate-300">
          {typeFilter === 'FOLDER' ? <FaFolderOpen /> : typeFilter === 'FILE' ? <FaFileAlt /> : <FaBoxOpen />}
        </div>
        No {typeFilter === 'FOLDER' ? "folders" : typeFilter === 'FILE' ? "files" : "items"} found.
      </div>
    );
  }

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
      
      {/* HEADER */}
      <div className="flex items-center bg-slate-50 border-b border-slate-200 px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
        <div className="flex-1">Name & Details</div>
        <div className="text-right">Attributes</div>
      </div>

      {/* ROWS */}
      <div className="divide-y divide-slate-100">
        {data.map((item) => (
          <div key={item.uuid} className="flex flex-col group">
            
            {/* MAIN ROW */}
            <div 
              onClick={() => onItemClick(item)} 
              className="flex items-center px-4 py-3 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              {/* LEFT SIDE: ICON + NAME + INFO */}
              <div className="flex-1 flex items-center min-w-0 pr-4">
                <span className="text-xl mr-3 group-hover:scale-110 transition-transform shrink-0">
                  {item.type === "FOLDER" ? <FaFolder className="text-blue-400" /> : getFileIcon(item.fileType)}
                </span>
                
                <span className="font-medium text-slate-800 truncate" title={item.name}>
                  {item.name}
                </span>

                <button
                  onClick={(e) => toggleInfo(e, item.uuid)}
                  className="ml-2 shrink-0 p-1.5 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors flex items-center justify-center"
                  title="Toggle Info"
                >
                  {/* Changed search icon to info circle */}
                  {expandedItem === item.uuid ? <FaTimes /> : <FaInfoCircle />}
                </button>
              </div>

              {/* RIGHT SIDE: TYPE + CROWN (Files Only) */}
              <div className="shrink-0 flex items-center justify-end space-x-3">
                {item.type === "FILE" && (
                  <>

                    {item.accessType === 'PAID' && (
                      <span className="text-amber-400 text-lg flex items-center" title="Paid Content">
                        <FaCrown />
                      </span>
                    )}

                    <span 
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-slate-50 text-slate-600 border border-slate-200 shadow-sm"
                      title={`${item.viewCount?.toLocaleString()} Views`}
                    >
                      <FaEye className="text-slate-400" />
                      {formatViews(item.viewCount)}
                    </span>
                    
                  </>
                )}
              </div>
            </div>

            {/* EXPANDED DETAILS PANEL */}
            {expandedItem === item.uuid && (
              <div className="bg-slate-50 border-t border-slate-100 p-4 text-sm text-slate-600 cursor-default">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-3">
                  
                  {/* FOLDER DETAILS */}
                  {item.type === 'FOLDER' ? (
                    <>
                      <div>
                        <span className="font-semibold text-slate-700">Created:</span> {formatDate(item.createdTime)}
                      </div>
                      <div>
                        <span className="font-semibold text-slate-700">Contains:</span> {item.noOfFiles || 0} Files, {item.noOfFolders || 0} Folders
                      </div>
                      {/* Added Views to Folder Info */}
                      <div>
                        <span className="font-semibold text-slate-700">Views:</span> {formatViews(item.viewCount)}
                      </div>
                    </>
                  ) : (
                  
                  /* FILE DETAILS */
                    <>
                      <div>
                        <span className="font-semibold text-slate-700">Created:</span> {formatDate(item.createdTime)}
                      </div>
                      <div>
                        <span className="font-semibold text-slate-700">Size:</span> {formatBytes(item.sizeInBytes)}
                      </div>
                      
                      {/* Added Download Count explicitly for DOCUMENT file type */}
                      {item.fileType === 'DOCUMENT' && (
                        <div>
                          <span className="font-semibold text-slate-700">Downloads:</span> {item.downloadCount?.toLocaleString() || '0'}
                        </div>
                      )}

                      {item.description && (
                        <div className="md:col-span-2">
                          <span className="font-semibold text-slate-700">Description:</span> {item.description}
                        </div>
                      )}
                      {item.url && (
                        <div className="md:col-span-2 truncate">
                          <span className="font-semibold text-slate-700">URL:</span>{' '}
                          <a 
                            href={item.url} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="text-blue-600 hover:text-blue-800 hover:underline"
                            onClick={(e) => e.stopPropagation()} 
                          >
                            {item.url}
                          </a>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            )}
            
          </div>
        ))}
      </div>
    </div>
  );
}