import { useState } from "react";
import { FaPaperPlane } from "react-icons/fa";

export default function CourseForm({ onSubmit, isSubmitting }) {
  const [formData, setFormData] = useState({
    email: "",
    yoe: "",
    company: "",
    jobDescription: "",
    jobUrl: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 animate-in fade-in duration-300">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-3">
          <label className="block text-sm font-medium text-slate-700 mb-1">Email Address *</label>
          <input 
            type="email" 
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-slate-50 focus:bg-white"
            placeholder="where should we send the course?"
          />
        </div>
        <div className="md:col-span-1">
          <label className="block text-sm font-medium text-slate-700 mb-1">Years of Exp</label>
          <input 
            type="text" 
            name="yoe"
            value={formData.yoe}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-slate-50 focus:bg-white"
            placeholder="e.g. 3"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Company *</label>
          <input 
            type="text" 
            name="company"
            required
            value={formData.company}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-slate-50 focus:bg-white"
            placeholder="Company Name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Job URL *</label>
          <input 
            type="url" 
            name="jobUrl"
            required
            value={formData.jobUrl}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-slate-50 focus:bg-white"
            placeholder="https://..."
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Job Description *</label>
        <textarea 
          name="jobDescription"
          rows="6"
          required
          value={formData.jobDescription}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-slate-50 focus:bg-white resize-none"
          placeholder="Paste the full job description here..."
        ></textarea>
      </div>

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
            <FaPaperPlane className="mr-2" /> Generate Course
          </>
        )}
      </button>
    </form>
  );
}