// // FileViewer.jsx
// // Only ONE install needed:
// //   npm install react-pdf

// import { useEffect, useRef, useState, useCallback } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { ArrowLeft, Download, Maximize2, Minimize2, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
// import { Document, Page, pdfjs } from "react-pdf";
// import "react-pdf/dist/Page/AnnotationLayer.css";
// import "react-pdf/dist/Page/TextLayer.css";

// // ── Point pdfjs worker to the CDN build bundled with react-pdf ───────────────
// pdfjs.GlobalWorkerOptions.workerSrc = new URL(
//   "pdfjs-dist/build/pdf.worker.min.mjs",
//   import.meta.url
// ).toString();

// // ── Google Docs embed helper ──────────────────────────────────────────────────
// const googleDocsEmbedUrl = (url) =>
//   `https://docs.google.com/gview?url=${encodeURIComponent(url)}&embedded=true`;

// // ── Shared loading spinner ────────────────────────────────────────────────────
// function LoadingSpinner({ label = "Loading…" }) {
//   return (
//     <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-50 z-10 rounded-2xl gap-3">
//       <div className="w-12 h-12 rounded-full border-4 border-slate-200 border-t-indigo-500 animate-spin" />
//       <p className="text-sm text-slate-400 font-medium">{label}</p>
//     </div>
//   );
// }

// // ── PDF Viewer sub-component ──────────────────────────────────────────────────
// function PdfViewer({ url }) {
//   const [numPages, setNumPages] = useState(null);
//   const [pageNumber, setPageNumber] = useState(1);
//   const [containerWidth, setContainerWidth] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const wrapperRef = useRef(null);

//   // Measure container width for responsive page scaling
//   useEffect(() => {
//     if (!wrapperRef.current) return;
//     const observer = new ResizeObserver(([entry]) => {
//       setContainerWidth(entry.contentRect.width);
//     });
//     observer.observe(wrapperRef.current);
//     return () => observer.disconnect();
//   }, []);

//   const onDocumentLoadSuccess = ({ numPages }) => {
//     setNumPages(numPages);
//     setPageNumber(1);
//     setIsLoading(false);
//   };

//   return (
//     <div className="flex flex-col h-full">
//       {/* Scrollable page area */}
//       <div ref={wrapperRef} className="relative flex-1 overflow-auto flex flex-col items-center bg-slate-100 py-4 px-2">
//         {isLoading && <LoadingSpinner label="Loading PDF…" />}
//         <Document
//           file={url}
//           onLoadSuccess={onDocumentLoadSuccess}
//           loading={null}  // we handle loading ourselves
//           error={
//             <div className="flex flex-col items-center justify-center h-64 gap-3 text-slate-500">
//               <p>Failed to load PDF.</p>
//               <a href={url} target="_blank" rel="noopener noreferrer"
//                 className="text-indigo-600 underline text-sm">Open original</a>
//             </div>
//           }
//         >
//           <Page
//             pageNumber={pageNumber}
//             width={containerWidth ? Math.min(containerWidth - 16, 900) : undefined}
//             renderTextLayer={true}
//             renderAnnotationLayer={true}
//           />
//         </Document>
//       </div>

//       {/* Page controls */}
//       {numPages && numPages > 1 && (
//         <div className="flex items-center justify-center gap-4 py-3 border-t border-slate-100 bg-white shrink-0">
//           <button
//             onClick={() => setPageNumber((p) => Math.max(1, p - 1))}
//             disabled={pageNumber <= 1}
//             className="p-2 rounded-lg text-slate-500 hover:text-indigo-600 hover:bg-slate-100 disabled:opacity-30 transition-colors"
//           >
//             <ChevronLeft className="w-5 h-5" />
//           </button>
//           <span className="text-sm text-slate-600 font-medium">
//             Page {pageNumber} of {numPages}
//           </span>
//           <button
//             onClick={() => setPageNumber((p) => Math.min(numPages, p + 1))}
//             disabled={pageNumber >= numPages}
//             className="p-2 rounded-lg text-slate-500 hover:text-indigo-600 hover:bg-slate-100 disabled:opacity-30 transition-colors"
//           >
//             <ChevronRight className="w-5 h-5" />
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }

// // ── Main component ────────────────────────────────────────────────────────────
// export default function FileViewer() {
//   const { state } = useLocation();
//   const navigate = useNavigate();
//   const item = state?.item;

//   const containerRef = useRef(null);
//   const [isFullscreen, setIsFullscreen] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);

//   // Reset loader whenever item changes
//   useEffect(() => {
//     setIsLoading(true);
//   }, [item?.url]);

//   // Fullscreen toggle
//   const toggleFullscreen = async () => {
//     const el = containerRef.current;
//     if (!el) return;
//     if (!document.fullscreenElement) {
//       try {
//         if (el.requestFullscreen) await el.requestFullscreen();
//         else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen();
//       } catch (err) {
//         console.warn("Fullscreen request failed:", err);
//       }
//     } else {
//       if (document.exitFullscreen) await document.exitFullscreen();
//       else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
//     }
//   };

//   // Sync state with browser fullscreen events
//   useEffect(() => {
//     const handleChange = () => setIsFullscreen(!!document.fullscreenElement);
//     document.addEventListener("fullscreenchange", handleChange);
//     document.addEventListener("webkitfullscreenchange", handleChange);
//     return () => {
//       document.removeEventListener("fullscreenchange", handleChange);
//       document.removeEventListener("webkitfullscreenchange", handleChange);
//     };
//   }, []);

//   if (!item) {
//     return (
//       <div className="flex items-center justify-center h-screen text-slate-500">
//         File not found.
//       </div>
//     );
//   }

//   // Viewer switcher
//   const renderViewer = () => {
//     switch (item.fileType) {
//       case "PDF":
//         return <PdfViewer url={item.url} />;

//       case "DOCUMENT":
//       case "SQL":
//         return (
//           <div className="relative w-full h-full">
//             {isLoading && <LoadingSpinner label="Loading document…" />}
//             <iframe
//               src={googleDocsEmbedUrl(item.url)}
//               title={item.name}
//               className="w-full h-full border-0 rounded-2xl"
//               allow="fullscreen"
//               loading="lazy"
//               onLoad={() => setIsLoading(false)}
//             />
//           </div>
//         );

//       case "IMAGE":
//         return (
//           <div className="relative flex items-center justify-center w-full h-full bg-slate-50 rounded-2xl overflow-auto">
//             {isLoading && <LoadingSpinner label="Loading image…" />}
//             <img
//               src={item.url}
//               alt={item.name}
//               className="max-w-full max-h-full object-contain rounded-2xl"
//               onLoad={() => setIsLoading(false)}
//               onError={() => setIsLoading(false)}
//             />
//           </div>
//         );

//       case "VIDEO":
//         return (
//           <div className="relative w-full h-full">
//             {isLoading && <LoadingSpinner label="Loading video…" />}
//             <video
//               src={item.url}
//               controls
//               playsInline
//               className="w-full h-full rounded-2xl bg-black"
//               onCanPlay={() => setIsLoading(false)}
//               onError={() => setIsLoading(false)}
//             />
//           </div>
//         );

//       case "YOUTUBE": {
//         const embedUrl = item.url.includes("embed")
//           ? item.url
//           : item.url.replace("watch?v=", "embed/");
//         return (
//           <div className="relative w-full h-full">
//             {isLoading && <LoadingSpinner label="Loading video…" />}
//             <iframe
//               src={embedUrl}
//               title={item.name}
//               className="w-full h-full border-0 rounded-2xl"
//               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
//               allowFullScreen
//               onLoad={() => setIsLoading(false)}
//             />
//           </div>
//         );
//       }

//       default:
//         return (
//           <div className="flex flex-col items-center justify-center w-full h-full gap-4 text-slate-500">
//             <p>Preview not available for this file type.</p>
//             <a
//               href={item.url}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="inline-flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition-colors"
//             >
//               <ExternalLink className="w-4 h-4" />
//               Open in new tab
//             </a>
//           </div>
//         );
//     }
//   };

//   const fsContainerClass = isFullscreen
//     ? "fixed inset-0 z-[9999] bg-white flex flex-col"
//     : "relative bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col overflow-hidden";

//   const viewerHeight = isFullscreen ? "flex-1" : "h-[60vh] md:h-[70vh]";

//   return (
//     <div className="max-w-4xl mx-auto py-8 px-4">
//       {!isFullscreen && (
//         <button
//           onClick={() => navigate(-1)}
//           className="flex items-center text-slate-500 hover:text-indigo-600 mb-6 transition-colors"
//         >
//           <ArrowLeft className="w-5 h-5 mr-2" />
//           Back to Explorer
//         </button>
//       )}

//       <div ref={containerRef} className={fsContainerClass}>
//         {/* Header bar */}
//         <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 shrink-0">
//           {isFullscreen && (
//             <button
//               onClick={() => navigate(-1)}
//               className="flex items-center text-slate-500 hover:text-indigo-600 transition-colors mr-3"
//             >
//               <ArrowLeft className="w-5 h-5" />
//             </button>
//           )}
//           <div className="flex-1 min-w-0">
//             <h1 className="text-lg font-bold text-slate-900 truncate">{item.name}</h1>
//             {item.description && (
//               <p className="text-sm text-slate-500 truncate">{item.description}</p>
//             )}
//           </div>
//           <div className="flex items-center gap-2 ml-4 shrink-0">
//             <a
//               href={item.url}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="p-2 rounded-lg text-slate-500 hover:text-indigo-600 hover:bg-slate-100 transition-colors"
//               title="Open in new tab"
//             >
//               <ExternalLink className="w-5 h-5" />
//             </a>
//             <a
//               href={item.url}
//               download
//               className="p-2 rounded-lg text-slate-500 hover:text-indigo-600 hover:bg-slate-100 transition-colors"
//               title="Download"
//             >
//               <Download className="w-5 h-5" />
//             </a>
//             <button
//               onClick={toggleFullscreen}
//               className="p-2 rounded-lg text-slate-500 hover:text-indigo-600 hover:bg-slate-100 transition-colors"
//               title={isFullscreen ? "Exit fullscreen" : "Fullscreen"}
//             >
//               {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
//             </button>
//           </div>
//         </div>

//         {/* Viewer area */}
//         <div className={`${viewerHeight} w-full overflow-hidden`}>
//           {renderViewer()}
//         </div>
//       </div>
//     </div>
//   );
// }

import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, Download, Maximize2, Minimize2, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

// ── Correct Worker Setup ──────────────────────────────────────────────────────
pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const googleDocsEmbedUrl = (url) =>
  `https://docs.google.com/gview?url=${encodeURIComponent(url)}&embedded=true`;

function LoadingSpinner({ label = "Loading…" }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-50 z-10 rounded-2xl gap-3">
      <div className="w-12 h-12 rounded-full border-4 border-slate-200 border-t-indigo-500 animate-spin" />
      <p className="text-sm text-slate-400 font-medium">{label}</p>
    </div>
  );
}

function PdfViewer({ url }) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [containerWidth, setContainerWidth] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const wrapperRef = useRef(null);

  useEffect(() => {
    if (!wrapperRef.current) return;
    const observer = new ResizeObserver(([entry]) => {
      setContainerWidth(entry.contentRect.width);
    });
    observer.observe(wrapperRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="flex flex-col h-full">
      <div ref={wrapperRef} className="relative flex-1 overflow-auto flex flex-col items-center bg-slate-100 py-4 px-2">
        {isLoading && <LoadingSpinner label="Loading PDF…" />}
        <Document
          file={url}
          onLoadSuccess={({ numPages }) => {
            setNumPages(numPages);
            setIsLoading(false);
          }}
          onLoadError={() => setIsLoading(false)}
          error={
            <div className="p-8 text-center text-slate-500">
              <p>Failed to load PDF.</p>
              <a href={url} target="_blank" rel="noopener noreferrer" className="text-indigo-600 underline">Open in new tab</a>
            </div>
          }
        >
          <Page
            pageNumber={pageNumber}
            width={containerWidth ? Math.min(containerWidth - 16, 900) : undefined}
            renderTextLayer={true}
            renderAnnotationLayer={true}
          />
        </Document>
      </div>

      {numPages && (
        <div className="flex items-center justify-center gap-4 py-3 border-t border-slate-100 bg-white shrink-0">
          <button onClick={() => setPageNumber(p => Math.max(1, p - 1))} disabled={pageNumber <= 1} className="p-2 hover:bg-slate-100 rounded disabled:opacity-30">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="text-sm font-medium">Page {pageNumber} of {numPages}</span>
          <button onClick={() => setPageNumber(p => Math.min(numPages, p + 1))} disabled={pageNumber >= numPages} className="p-2 hover:bg-slate-100 rounded disabled:opacity-30">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
}

export default function FileViewer() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const item = state?.item;
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef(null);

  // Safety fallback
  if (!item) {
    return (
      <div className="flex flex-col items-center justify-center h-screen gap-4">
        <p>File information not found.</p>
        <button onClick={() => navigate(-1)} className="text-indigo-600 underline">Go Back</button>
      </div>
    );
  }

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) containerRef.current?.requestFullscreen();
    else document.exitFullscreen();
  };

  useEffect(() => {
    const handleFS = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", handleFS);
    return () => document.removeEventListener("fullscreenchange", handleFS);
  }, []);

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 h-screen flex flex-col">
      {!isFullscreen && (
        <button onClick={() => navigate(-1)} className="flex items-center text-slate-500 mb-6 hover:text-indigo-600">
          <ArrowLeft className="w-5 h-5 mr-2" /> Back to Explorer
        </button>
      )}

      <div ref={containerRef} className="flex-1 bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
          <h1 className="font-bold truncate">{item.name}</h1>
          <div className="flex gap-2">
            <a href={item.url} target="_blank" rel="noopener noreferrer" className="p-2 hover:bg-slate-100 rounded"><ExternalLink className="w-5 h-5" /></a>
            <button onClick={toggleFullscreen} className="p-2 hover:bg-slate-100 rounded">{isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}</button>
          </div>
        </div>

        <div className="flex-1 overflow-hidden">
          {item.fileType === "PDF" ? <PdfViewer url={item.url} /> : <iframe src={googleDocsEmbedUrl(item.url)} className="w-full h-full border-0" title={item.name} />}
        </div>
      </div>
    </div>
  );
}