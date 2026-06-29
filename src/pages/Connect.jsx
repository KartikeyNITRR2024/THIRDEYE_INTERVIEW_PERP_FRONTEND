import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Share2, Paperclip, Link as LinkIcon, Send, 
  CheckCircle2, FileText, Lightbulb, Loader2
} from "lucide-react";
import { FaYoutube } from "react-icons/fa";

export default function Connect() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "", email: "", topic: "", resourceType: "LINK", url: "", description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTypeSelect = (type) => {
    setFormData((prev) => ({ ...prev, resourceType: type }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({ name: "", email: "", topic: "", resourceType: "LINK", url: "", description: "" });
      }, 4000);
    }, 1500);
  };

  const resourceTypes = [
    { id: "LINK", label: "Web Link", icon: LinkIcon },
    { id: "VIDEO", label: "Video", icon: FaYoutube },
    { id: "DOCUMENT", label: "Document", icon: FileText },
    { id: "OTHER", label: "Idea", icon: Lightbulb },
  ];

  const inputClasses = "w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:ring-2 focus:ring-indigo-500 focus:border-transparent focus:bg-white transition-all outline-none text-base md:text-sm";
  const labelClasses = "block text-sm font-semibold text-slate-700 mb-1.5";

  return (
    <div className="max-w-3xl mx-auto py-8 px-4 sm:px-6 lg:px-8 mb-20 md:mb-0">
      
      {/* Header Section */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center p-3 bg-indigo-50 rounded-2xl mb-4">
          <Share2 className="w-8 h-8 text-indigo-600" />
        </div>
        <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
          Contribute <span className="bg-gradient-to-r from-indigo-600 to-purple-500 bg-clip-text text-transparent">Resources</span>
        </h1>
        <p className="text-base md:text-lg text-slate-500 max-w-xl mx-auto">
          Have a great system design article or algorithm video? Submit it below to help grow the platform's intelligence.
        </p>
      </div>

      {/* Form Container */}
      <div className="bg-white/60 backdrop-blur-xl rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 p-6 md:p-10 relative overflow-hidden">
        
        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div 
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="text-center py-16"
            >
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-10 h-10 text-green-600" />
              </div>
              <h2 className="text-3xl font-bold text-slate-800 mb-3">Resource Captured!</h2>
              <p className="text-slate-500 text-lg">Thank you. The AI is reviewing your submission for inclusion in the hub.</p>
            </motion.div>
          ) : (
            <motion.form 
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onSubmit={handleSubmit} 
              className="space-y-6"
            >
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className={labelClasses}>Your Name</label>
                  <input type="text" name="name" required value={formData.name} onChange={handleChange} className={inputClasses} placeholder="Alex Chen" />
                </div>
                <div>
                  <label className={labelClasses}>Email Address</label>
                  <input type="email" name="email" required value={formData.email} onChange={handleChange} className={inputClasses} placeholder="alex@example.com" />
                </div>
              </div>

              <div>
                <label className={labelClasses}>Topic / Subject</label>
                <input type="text" name="topic" required value={formData.topic} onChange={handleChange} className={inputClasses} placeholder="e.g., Advanced React Patterns..." />
              </div>

              {/* Touch-Friendly Resource Type Chips */}
              <div>
                <label className={labelClasses}>Resource Type</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {resourceTypes.map((type) => {
                    const Icon = type.icon;
                    const isActive = formData.resourceType === type.id;
                    return (
                      <button
                        key={type.id}
                        type="button"
                        onClick={() => handleTypeSelect(type.id)}
                        className={`flex flex-col items-center justify-center py-3 px-2 rounded-xl border-2 transition-all ${
                          isActive 
                            ? "border-indigo-600 bg-indigo-50 text-indigo-700" 
                            : "border-slate-100 bg-slate-50 text-slate-500 hover:border-slate-200"
                        }`}
                      >
                        <Icon className={`w-5 h-5 mb-1.5 ${isActive ? "stroke-[2.5px]" : ""}`} />
                        <span className="text-xs font-bold">{type.label}</span>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Conditional URL Field based on type */}
              {formData.resourceType !== 'DOCUMENT' && (
                <div>
                  <label className={labelClasses}>Resource URL</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                      <LinkIcon className="w-5 h-5 text-slate-400" />
                    </div>
                    <input type="url" name="url" required={formData.resourceType !== 'OTHER'} value={formData.url} onChange={handleChange} className={`${inputClasses} pl-11`} placeholder="https://..." />
                  </div>
                </div>
              )}

              {/* Modern File Upload Zone */}
              {formData.resourceType === 'DOCUMENT' && (
                <div>
                  <label className={labelClasses}>Attach Document</label>
                  <label className="mt-1 flex flex-col items-center justify-center w-full h-32 px-4 transition bg-slate-50 border-2 border-slate-200 border-dashed rounded-xl appearance-none cursor-pointer hover:border-indigo-400 hover:bg-indigo-50/50 focus:outline-none">
                    <span className="flex items-center space-x-2">
                      <Paperclip className="w-6 h-6 text-slate-400" />
                      <span className="font-medium text-slate-600">
                        Drop file here or <span className="text-indigo-600 underline">browse</span>
                      </span>
                    </span>
                    <input type="file" name="file_upload" className="hidden" />
                  </label>
                </div>
              )}

              <div>
                <label className={labelClasses}>Context / Notes</label>
                <textarea name="description" rows="3" required value={formData.description} onChange={handleChange} className={`${inputClasses} resize-none`} placeholder="Why is this resource valuable?"></textarea>
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className={`w-full font-bold py-4 px-4 rounded-xl transition-all flex items-center justify-center text-lg ${
                  isSubmitting 
                    ? "bg-indigo-300 text-white cursor-not-allowed" 
                    : "bg-slate-900 text-white hover:bg-indigo-600 hover:shadow-lg active:scale-[0.98]"
                }`}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" /> Transmitting...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" /> Submit Contribution
                  </>
                )}
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}