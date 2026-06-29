// Mapping backend enums to polished UI text
const STATUS_DISPLAY_MAP = {
  PROCESSING: "Initializing Request",
  EXTRACT_COMPLETED: "Analyzing Requirements",
  COURSE_CREATION_COMPLETED: "Generating Curriculum",
  MAILED_COMPLETED: "Delivered to Inbox",
};

const STATUS_STEPS = Object.keys(STATUS_DISPLAY_MAP);

export default function CourseStatusTracker({ currentStatus }) {
  const getStepIndex = (status) => STATUS_STEPS.indexOf(status);
  const currentStepIndex = getStepIndex(currentStatus);

  return (
    <div className="mb-10 animate-in fade-in duration-300">
      <div className="relative">
        <div className="flex justify-between items-start w-full mb-2">
          {STATUS_STEPS.map((step, index) => {
            const isCompleted = currentStepIndex >= index;
            const isCurrent = currentStepIndex === index;
            
            return (
              <div key={step} className="flex flex-col items-center z-10 w-1/4">
                <div 
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-bold border-2 transition-colors ${
                    isCompleted 
                      ? "bg-blue-600 border-blue-600 text-white" 
                      : "bg-white border-slate-300 text-slate-400"
                  } ${isCurrent && currentStatus !== "MAILED_COMPLETED" ? "animate-pulse" : ""}`}
                >
                  {index + 1}
                </div>
                <span className={`text-xs mt-3 text-center font-medium px-1 ${
                  isCompleted ? "text-blue-700" : "text-slate-400"
                }`}>
                  {/* Using the polished dictionary wording here */}
                  {STATUS_DISPLAY_MAP[step]}
                </span>
              </div>
            );
          })}
        </div>
        
        {/* Connecting Background Line */}
        <div className="absolute top-4 left-[12%] right-[12%] h-1 bg-slate-200 -z-10 transform -translate-y-1/2">
          <div 
            className="h-full bg-blue-600 transition-all duration-500 ease-in-out" 
            style={{ 
              width: `${currentStepIndex >= 0 ? (currentStepIndex / (STATUS_STEPS.length - 1)) * 100 : 0}%` 
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}