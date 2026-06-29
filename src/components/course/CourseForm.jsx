import { useState } from "react";
import { Bot } from "lucide-react";

export default function CourseForm({ onSubmit, isSubmitting }) {
  const [formData, setFormData] = useState({
    email: "", yoe: "", company: "", jobDescription: "", jobUrl: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const inputClasses = "w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:ring-2 focus:ring-indigo-500 focus:border-transparent focus:bg-white transition-all outline-none text-base md:text-sm";
  const labelClasses = "block text-sm font-semibold text-slate-700 mb-1.5";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        <div className="md:col-span-3">
          <label className={labelClasses}>Delivery Email <span className="text-indigo-500">*</span></label>
          <input 
            type="email" name="email" required value={formData.email} onChange={handleChange}
            className={inputClasses} placeholder="architect@example.com"
          />
        </div>
        <div className="md:col-span-1">
          <label className={labelClasses}>Experience</label>
          <input 
            type="text" name="yoe" value={formData.yoe} onChange={handleChange}
            className={inputClasses} placeholder="e.g. 3 YOE"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className={labelClasses}>Target Company <span className="text-indigo-500">*</span></label>
          <input 
            type="text" name="company" required value={formData.company} onChange={handleChange}
            className={inputClasses} placeholder="e.g. Amazon, Google, Atlassian"
          />
        </div>
        <div>
          <label className={labelClasses}>Job URL <span className="text-indigo-500">*</span></label>
          <input 
            type="url" name="jobUrl" required value={formData.jobUrl} onChange={handleChange}
            className={inputClasses} placeholder="https://careers..."
          />
        </div>
      </div>

      <div>
        <label className={labelClasses}>Job Description / Tech Stack <span className="text-indigo-500">*</span></label>
        <textarea 
          name="jobDescription" rows="5" required value={formData.jobDescription} onChange={handleChange}
          className={`${inputClasses} font-mono text-sm resize-none`}
          placeholder="Paste requirements here (e.g., Java, Spring Boot, Microservices, Kafka...)"
        ></textarea>
      </div>

      <button 
        type="submit" 
        disabled={isSubmitting}
        className={`w-full font-bold py-4 px-4 rounded-xl transition-all flex items-center justify-center text-lg ${
          isSubmitting 
            ? "bg-indigo-300 text-white cursor-not-allowed" 
            : "bg-slate-900 text-white hover:bg-indigo-600 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
        }`}
      >
        {isSubmitting ? (
          <div className="flex items-center space-x-2">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            <span>AI Processing...</span>
          </div>
        ) : (
          <>
            <Bot className="mr-2 w-5 h-5" /> Generate AI Curriculum
          </>
        )}
      </button>
    </form>
  );
}