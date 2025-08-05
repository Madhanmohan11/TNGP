import React from "react";

const LanguageToggleButton = ({ lang, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      className="fixed top-4 right-4 z-50 bg-blue-500 text-white px-4 py-2 text-sm sm:text-base rounded shadow-md hover:bg-blue-600 transition-all"
    >
      {lang === "tamil" ? "English" : "தமிழ்"}
    </button>
  );
};

export default LanguageToggleButton;
