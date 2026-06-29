import { motion } from "framer-motion";
import { 
  Info, Code2, Search, Layers, ShieldCheck, 
  Mail, User2, Zap, ArrowUpRight
} from "lucide-react";
import { FaLinkedin } from "react-icons/fa";

export default function About() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6 lg:px-8 mb-20 md:mb-0">
      
      {/* Header Section */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center p-3 bg-indigo-50 rounded-2xl mb-4">
          <Info className="w-8 h-8 text-indigo-600" />
        </div>
        <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
          Behind the <span className="bg-gradient-to-r from-indigo-600 to-purple-500 bg-clip-text text-transparent">Platform</span>
        </h1>
        <p className="text-base md:text-lg text-slate-500 max-w-2xl mx-auto">
          Your ultimate command center for technical interview preparation, keeping code, concepts, and architectures in one searchable hub.
        </p>
      </div>

      {/* Bento Grid Layout */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6"
      >
        
        {/* Card 1: The Mission (Spans 2 columns on desktop) */}
        <motion.div variants={itemVariants} className="md:col-span-2 bg-white rounded-3xl p-8 border border-slate-200/60 shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
            <Code2 className="w-32 h-32" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center">
            <Zap className="w-6 h-6 mr-2 text-amber-500" /> The Mission
          </h2>
          <p className="text-slate-600 leading-relaxed text-lg relative z-10">
            Interview prep shouldn't mean losing track of PDFs, URLs, and notes scattered across desktop folders. This application engineers a centralized, highly-searchable file explorer interface specifically designed for software engineers targeting top-tier product companies.
          </p>
        </motion.div>

        {/* Card 2: Key Features */}
        <motion.div variants={itemVariants} className="bg-gradient-to-br from-indigo-600 to-violet-700 rounded-3xl p-8 shadow-sm text-white">
          <h3 className="text-xl font-bold mb-6">Core Engine</h3>
          <ul className="space-y-4">
            <li className="flex items-center bg-white/10 p-3 rounded-xl backdrop-blur-sm">
              <Search className="w-5 h-5 mr-3 text-indigo-200" />
              <span className="font-medium text-sm">Global Debounced Search</span>
            </li>
            <li className="flex items-center bg-white/10 p-3 rounded-xl backdrop-blur-sm">
              <Layers className="w-5 h-5 mr-3 text-indigo-200" />
              <span className="font-medium text-sm">Smart Type Filtering</span>
            </li>
            <li className="flex items-center bg-white/10 p-3 rounded-xl backdrop-blur-sm">
              <ShieldCheck className="w-5 h-5 mr-3 text-indigo-200" />
              <span className="font-medium text-sm">Pro Resource Gating</span>
            </li>
          </ul>
        </motion.div>

        {/* Card 3: The Creator (Spans full width, flex layout) */}
        <motion.div variants={itemVariants} className="md:col-span-3 bg-white rounded-3xl p-8 border border-slate-200/60 shadow-sm flex flex-col md:flex-row items-center md:items-start gap-8">
          
          <div className="shrink-0">
            <div className="w-24 h-24 md:w-32 md:h-32 bg-indigo-100 rounded-full flex items-center justify-center border-4 border-white shadow-lg">
              <User2 className="w-12 h-12 md:w-16 md:h-16 text-indigo-400" />
            </div>
          </div>
          
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-2xl font-bold text-slate-800">Kartikey Thawait</h2>
            <p className="text-indigo-600 font-semibold mb-4">Software Developer</p>
            <p className="text-slate-600 max-w-2xl mb-6">
              Passionate about building clean, efficient, and user-friendly web applications to solve real-world engineering bottlenecks.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <a 
                href="https://www.linkedin.com/in/kartikey-thawait-51583a221/" 
                target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-between bg-slate-50 hover:bg-[#0A66C2]/10 text-slate-700 hover:text-[#0A66C2] px-5 py-3 rounded-xl border border-slate-200 transition-all group"
              >
                <div className="flex items-center font-semibold text-sm">
                  <FaLinkedin className="w-5 h-5 mr-2" /> LinkedIn
                </div>
                <ArrowUpRight className="w-4 h-4 ml-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
              
              <a 
                href="mailto:kartikeythawait3007@gmail.com"
                className="flex items-center justify-between bg-slate-50 hover:bg-rose-50 text-slate-700 hover:text-rose-600 px-5 py-3 rounded-xl border border-slate-200 transition-all group"
              >
                <div className="flex items-center font-semibold text-sm">
                  <Mail className="w-5 h-5 mr-2" /> Email Me
                </div>
                <ArrowUpRight className="w-4 h-4 ml-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </div>
        </motion.div>

      </motion.div>
    </div>
  );
}