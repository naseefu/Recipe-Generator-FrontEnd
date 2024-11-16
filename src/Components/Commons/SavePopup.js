import React, { useState, useEffect, useRef } from "react";
import { FaTimes } from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";

const SavePopup = ({isOpen,setIsOpen}) => {
  
  const [progress, setProgress] = useState(100);
  const popupRef = useRef(null);
  const progressRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  useEffect(() => {
    let timer;
    if (isOpen) {
      setProgress(100);
      timer = setInterval(() => {
        setProgress((prev) => {
          if (prev <= 0) {
            clearInterval(timer);
            setIsOpen(false);
            return 0;
          }
          return prev - 2;
        });
      }, 100);
    }
    return () => clearInterval(timer);
  }, [isOpen]);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div className="flex items-center justify-center">
      {isOpen && (
        <div
          className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50"
          role="dialog"
          aria-modal="true"
          aria-labelledby="popup-title"
        >
          <div
            ref={popupRef}
            className="relative w-full max-w-md overflow-hidden rounded-lg bg-white shadow-xl transition-all animate-fade-in-up"
          >
            <div className="relative h-2 bg-gray-200">
              <div
                ref={progressRef}
                className="absolute top-0 left-0 h-full bg-green-500 transition-all duration-100"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="p-6 text-center">
              <button
                onClick={handleClose}
                className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full p-1"
                aria-label="Close popup"
              >
                <FaTimes className="w-5 h-5" />
              </button>

              <div className="mx-auto flex items-center justify-center w-12 h-12 rounded-full bg-green-100 mb-4">
                <FaCheckCircle className="w-6 h-6 text-green-600" />
              </div>

              <h2
                id="popup-title"
                className="text-xl font-semibold text-gray-900 mb-2"
              >
                Saved!
              </h2>
              <p className="text-gray-600">
                Item saved to favourites
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SavePopup;