import React, { useEffect, useState } from "react";

const LoadingBar = () => {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const duration = 30000; // 10 seconds
    const interval = 100; // Update every 100ms
    const steps = duration / interval;
    const incrementValue = 100 / steps;

    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        const newProgress = prevProgress + incrementValue;
        if (newProgress >= 100) {
          clearInterval(timer);
          setIsComplete(true);
          return 100;
        }
        return newProgress;
      });
    }, interval);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-{500px} bg-transparent flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-xl shadow-lg p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-800">
              {isComplete ? "Loading Complete" : "Loading in Progress"}
            </h2>
            <span className="text-sm font-medium text-blue-600">
              {Math.round(progress)}%
            </span>
          </div>

          <div
            className="relative h-4 bg-gray-200 rounded-full overflow-hidden"
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin="0"
            aria-valuemax="100"
            aria-label="Loading progress"
          >
            <div
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-400 to-blue-600 transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute inset-0 bg-white/10 animate-shimmer"></div>
            </div>
          </div>

          <div className="text-sm text-gray-600">
            {isComplete
              ? "All recipes has been loaded successfully"
              : "Please wait while we load your recipes..."}
          </div>

          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <div className={`animate-pulse ${isComplete ? "hidden" : "block"}`}>
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            </div>
            <span>
              {isComplete
                ? "Ready to proceed"
                : "Loading resources and assets..."}
            </span>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </div>
  );
};

export default LoadingBar;
