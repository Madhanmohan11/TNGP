import React from "react";

const ActionButton = ({ label, color = "blue", onClick }) => {
  const colorClass =
    color === "red"
      ? "text-red-600 hover:text-red-800"
      : color === "blue"
      ? "text-blue-600 hover:text-blue-800"
      : "";

  return (
    <button
      onClick={onClick}
      className={`font-medium ${colorClass} transition-colors duration-200`}
    >
      {label}
    </button>
  );
};

export default ActionButton;
