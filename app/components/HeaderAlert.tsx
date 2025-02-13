"use client";
import { useState, useEffect } from "react";

export const HeaderAlert = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExiting(true);
      setTimeout(() => {
        setIsVisible(false);
      }, 300); // Match the transition duration
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center">
      <div
        className={`bg-[#AA00FF] transform ${
          isExiting ? "-translate-y-full" : "translate-y-0"
        } transition-transform duration-300 shadow-lg rounded-b-lg`}
      >
        <div className="flex items-center justify-between px-6 py-3 space-x-8">
          <div className="flex items-center space-x-2">
            <span className="text-white font-medium">🎉 New Feature:</span>
            <span className="text-white">
              Weekly sponsor spotlight is now live!
            </span>
          </div>
          <button
            onClick={() => {
              setIsExiting(true);
              setTimeout(() => {
                setIsVisible(false);
              }, 300);
            }}
            className="text-white hover:opacity-80 transition-opacity"
            aria-label="Close alert"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};
