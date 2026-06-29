import { Check, Loader2 } from "lucide-react";

const STATUS_DISPLAY_MAP = {
  PROCESSING: "Initializing AI Engine",
  EXTRACT_COMPLETED: "Parsing JD & Stack",
  COURSE_CREATION_COMPLETED: "Compiling Curriculum",
  MAILED_COMPLETED: "Delivered to Inbox",
};
const STATUS_STEPS = Object.keys(STATUS_DISPLAY_MAP);

export default function CourseStatusTracker({ currentStatus }) {
  const currentStepIndex = STATUS_STEPS.indexOf(currentStatus);

  return (
    <div className="py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center relative gap-6 md:gap-0">
        
        {/* Desktop Connecting Line */}
        <div className="hidden md:block absolute top-6 left-10 right-10 h-1 bg-slate-100 -z-10">
          <div 
            className="h-full bg-indigo-600 transition-all duration-700 ease-in-out" 
            style={{ width: `${currentStepIndex >= 0 ? (currentStepIndex / (STATUS_STEPS.length - 1)) * 100 : 0}%` }}
          />
        </div>

        {/* Mobile Connecting Line */}
        <div className="block md:hidden absolute left-[1.35rem] top-4 bottom-4 w-1 bg-slate-100 -z-10">
           <div 
            className="w-full bg-indigo-600 transition-all duration-700 ease-in-out" 
            style={{ height: `${currentStepIndex >= 0 ? (currentStepIndex / (STATUS_STEPS.length - 1)) * 100 : 0}%` }}
          />
        </div>

        {STATUS_STEPS.map((step, index) => {
          const isCompleted = currentStepIndex > index || currentStatus === "MAILED_COMPLETED";
          const isCurrent = currentStepIndex === index && currentStatus !== "MAILED_COMPLETED";
          
          return (
            <div key={step} className="flex flex-row md:flex-col items-center w-full md:w-1/4 gap-4 md:gap-0 z-10">
              <div 
                className={`w-12 h-12 rounded-full flex items-center justify-center border-4 transition-all duration-300 ${
                  isCompleted ? "bg-indigo-600 border-indigo-100 text-white" : 
                  isCurrent ? "bg-white border-indigo-500 text-indigo-600 shadow-[0_0_15px_rgba(99,102,241,0.5)]" : 
                  "bg-white border-slate-100 text-slate-300"
                }`}
              >
                {isCompleted ? <Check className="w-5 h-5" /> : 
                 isCurrent ? <Loader2 className="w-5 h-5 animate-spin" /> : 
                 <span className="font-bold">{index + 1}</span>}
              </div>
              <span className={`text-sm md:mt-4 font-semibold ${
                isCompleted || isCurrent ? "text-slate-900" : "text-slate-400"
              }`}>
                {STATUS_DISPLAY_MAP[step]}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}