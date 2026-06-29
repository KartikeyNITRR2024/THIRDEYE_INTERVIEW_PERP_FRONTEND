import { useState } from "react";
import { FaHandshake, FaPaperclip, FaLink, FaPaperPlane, FaCheckCircle } from "react-icons/fa";

export default function Connect() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    topic: "",
    resourceType: "LINK",
    url: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate an API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      // Reset form after 3 seconds
      setTimeout(() => {
        setSubmitted(false);
        setFormData({ name: "", email: "", topic: "", resourceType: "LINK", url: "", description: "" });
      }, 3000);
    }, 1500);
  };

  return (
    <div className="max-w-3xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      
      {/* Header Section */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-slate-900 flex items-center justify-center mb-4">
          <FaHandshake className="mr-3 text-blue-600" /> Connect & Contribute
        </h1>
        <p className="text-lg text-slate-600">
          Have a great interview question, a helpful document, or a resource link? Submit a topic below to help grow the platform.
        </p>
      </div>

      {/* Form Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
        
        {submitted ? (
          <div className="text-center py-12 animate-in fade-in zoom-in duration-300">
            <FaCheckCircle className="text-6xl text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Thank you for contributing!</h2>
            <p className="text-slate-600">Your resource has been submitted successfully and is under review.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Name & Email Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Your Name</label>
                <input 
                  type="text" 
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors bg-slate-50 focus:bg-white"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                <input 
                  type="email" 
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors bg-slate-50 focus:bg-white"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            {/* Topic Row */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Topic / Subject</label>
              <input 
                type="text" 
                name="topic"
                required
                value={formData.topic}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors bg-slate-50 focus:bg-white"
                placeholder="e.g., Advanced React Patterns, System Design Basics..."
              />
            </div>

            {/* Resource Type & URL Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="col-span-1">
                <label className="block text-sm font-medium text-slate-700 mb-1">Resource Type</label>
                <select 
                  name="resourceType"
                  value={formData.resourceType}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-slate-50 focus:bg-white"
                >
                  <option value="LINK">🔗 URL / Web Link</option>
                  <option value="VIDEO">🎥 YouTube Video</option>
                  <option value="DOCUMENT">📄 Document / PDF</option>
                  <option value="OTHER">💡 General Suggestion</option>
                </select>
              </div>
              
              <div className="col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  <FaLink className="inline mr-1 text-slate-400" /> Resource URL
                </label>
                <input 
                  type="url" 
                  name="url"
                  value={formData.url}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors bg-slate-50 focus:bg-white"
                  placeholder="https://..."
                />
              </div>
            </div>

            {/* File Attachment */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Attach Documents (Optional)</label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-300 border-dashed rounded-lg hover:bg-slate-50 hover:border-blue-400 transition-colors cursor-pointer group">
                <div className="space-y-1 text-center">
                  <FaPaperclip className="mx-auto h-8 w-8 text-slate-400 group-hover:text-blue-500 transition-colors" />
                  <div className="flex text-sm text-slate-600 justify-center">
                    <label htmlFor="file-upload" className="relative cursor-pointer bg-transparent rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                      <span>Upload a file</span>
                      <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-slate-500">PDF, DOCX, SQL up to 10MB</p>
                </div>
              </div>
            </div>

            {/* Description Area */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Description / Notes</label>
              <textarea 
                name="description"
                rows="4"
                required
                value={formData.description}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors bg-slate-50 focus:bg-white resize-none"
                placeholder="Tell us a bit about this resource and why it's helpful..."
              ></textarea>
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              disabled={isSubmitting}
              className={`w-full font-bold py-3 px-4 rounded-lg transition-all flex items-center justify-center ${
                isSubmitting 
                  ? "bg-blue-400 text-white cursor-not-allowed" 
                  : "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-md"
              }`}
            >
              {isSubmitting ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                <>
                  <FaPaperPlane className="mr-2" /> Submit Contribution
                </>
              )}
            </button>
            
          </form>
        )}
      </div>
    </div>
  );
}