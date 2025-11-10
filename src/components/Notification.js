import React, { useEffect } from "react";

const Notification = ({ message, type = "success", show, onClose }) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show) return null;

  return (
    <div
      className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-md shadow-md text-white text-sm transition-all duration-300 ${
        type === "success" ? "bg-green-600" : "bg-red-600"
      }`}
    >
      {message}
    </div>
  );
};

export default Notification;
