import { FaInfoCircle, FaLinkedin, FaEnvelope, FaUserCircle, FaCode } from "react-icons/fa";

export default function About() {
  return (
    <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-slate-900 flex items-center justify-center mb-4">
          <FaInfoCircle className="mr-3 text-blue-600" /> About This Platform
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Your ultimate tool for organizing technical interview preparation, keeping all your important documents, code snippets, and resources in one accessible place.
        </p>
      </div>

      {/* Two Column Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Project Info Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 hover:shadow-md transition-shadow">
          <div className="flex items-center mb-6">
            <FaCode className="text-2xl mr-3 text-blue-600" />
            <h2 className="text-2xl font-bold text-slate-800">The Project</h2>
          </div>
          <p className="text-slate-600 mb-6 leading-relaxed">
            This platform was built to streamline the interview preparation process. Instead of losing track of various PDFs, URLs, and text notes scattered across different folders, this application provides a centralized, highly-searchable file explorer interface.
          </p>
          <div className="bg-slate-50 rounded-lg p-5 border border-slate-100">
            <h3 className="font-semibold text-slate-700 mb-3">Key Features:</h3>
            <ul className="space-y-2 text-slate-600 list-disc list-inside text-sm">
              <li>Global debounced search across all files</li>
              <li>Filter by file types (PDFs, Videos, SQL, etc.)</li>
              <li>Hierarchical folder navigation with breadcrumbs</li>
              <li>Clear separation of Free and Paid resources</li>
            </ul>
          </div>
        </div>

        {/* Creator Info Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 hover:shadow-md transition-shadow">
          <div className="flex items-center mb-6">
            <FaUserCircle className="text-2xl mr-3 text-blue-600" />
            <h2 className="text-2xl font-bold text-slate-800">The Creator</h2>
          </div>
          
          <div className="space-y-4">
            <div>
              <h3 className="text-2xl font-bold text-slate-800 mb-1">Kartikey Thawait</h3>
              <p className="text-slate-500 font-medium mb-6">Software Developer</p>
            </div>
            
            <p className="text-slate-600 mb-8 leading-relaxed">
              Passionate about building clean, efficient, and user-friendly web applications to solve real-world problems.
            </p>
            
            {/* Contact Links */}
            <div className="flex flex-col space-y-3">
              <a 
                href="https://www.linkedin.com/in/kartikey-thawait-51583a221/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center text-slate-700 hover:text-blue-700 transition-all bg-slate-50 p-4 rounded-xl border border-slate-200 hover:border-blue-300 hover:bg-blue-50 group"
              >
                <FaLinkedin className="text-2xl mr-4 text-[#0A66C2] group-hover:scale-110 transition-transform" />
                <div className="flex flex-col">
                  <span className="font-bold text-sm">Connect on LinkedIn</span>
                  <span className="text-xs text-slate-500">kartikey-thawait-51583a221</span>
                </div>
              </a>
              
              <a 
                href="mailto:kartikeythawait3007@gmail.com"
                className="flex items-center text-slate-700 hover:text-blue-700 transition-all bg-slate-50 p-4 rounded-xl border border-slate-200 hover:border-blue-300 hover:bg-blue-50 group"
              >
                <FaEnvelope className="text-2xl mr-4 text-red-500 group-hover:scale-110 transition-transform" />
                <div className="flex flex-col">
                  <span className="font-bold text-sm">Send an Email</span>
                  <span className="text-xs text-slate-500">kartikeythawait3007@gmail.com</span>
                </div>
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}