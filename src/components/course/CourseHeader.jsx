import { Sparkles } from "lucide-react";

export default function CourseHeader() {
  return (
    <div className="text-center mb-8 md:mb-12">
      <div className="inline-flex items-center justify-center p-3 bg-indigo-50 rounded-2xl mb-4">
        <Sparkles className="w-8 h-8 text-indigo-600" />
      </div>
      <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
        AI Pathway <span className="bg-gradient-to-r from-indigo-600 to-violet-500 bg-clip-text text-transparent">Generator</span>
      </h1>
      <p className="text-base md:text-lg text-slate-500 max-w-xl mx-auto">
        Input the target role details. Our AI will analyze the requirements and engineer a high-yield study curriculum.
      </p>
    </div>
  );
}