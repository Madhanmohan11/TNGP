import React, { useState } from "react";

const Header = ({ lang = "tamil" }) => {
  const [district, setDistrict] = useState("");
  const [constituency, setConstituency] = useState("");

  const year = new Date().getFullYear();

  const options = {
    districts: {
      ta: ["வருவாய் மாவட்டம்", "சென்னை", "மதுரை", "திருச்சி"],
      en: ["Select District", "Chennai", "Madurai", "Trichy"],
    },
    constituencies: {
      ta: ["சட்டமன்ற தொகுதி", "அண்ணா நகர்", "திருவள்ளுவர்", "மதுரை தெற்கு"],
      en: ["Select Constituency", "Anna Nagar", "Thiruvalluvar", "Madurai South"],
    },
  };

  const langKey = lang === "tamil" ? "ta" : "en";

  const getValue = (item, placeholder) => (item === placeholder ? "" : item);

  const handleReset = () => {
    setDistrict("");
    setConstituency("");
  };

  return (
    <div className="w-full flex flex-col items-center mt-4 mb-6 px-2">
      {/* Dropdowns */}
      <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-3 sm:space-y-0 mb-4 w-full max-w-md">
        <select
          value={district}
          onChange={(e) => setDistrict(e.target.value)}
          className="border border-gray-400 rounded p-2 bg-gray-100 w-full focus:ring-2 focus:ring-blue-300"
        >
          {options.districts[langKey].map((item, idx) => (
            <option
              key={idx}
              value={getValue(item, options.districts[langKey][0])}
            >
              {item}
            </option>
          ))}
        </select>

        <select
          value={constituency}
          onChange={(e) => setConstituency(e.target.value)}
          className="border border-gray-400 rounded p-2 bg-gray-100 w-full focus:ring-2 focus:ring-blue-300"
        >
          {options.constituencies[langKey].map((item, idx) => (
            <option
              key={idx}
              value={getValue(item, options.constituencies[langKey][0])}
            >
              {item}
            </option>
          ))}
        </select>
      </div>

      {/* Reset Button */}
      {(district || constituency) && (
        <button
          onClick={handleReset}
          className="mb-3 text-sm text-blue-600 underline hover:text-blue-800"
        >
          {lang === "tamil" ? "மீட்டமை" : "Reset Selection"}
        </button>
      )}

      {/* Dynamic Title */}
      <div
        className={`text-center text-gray-700 font-medium text-sm sm:text-base px-2 transition-all duration-300 ${
          !district && !constituency ? "opacity-50" : "opacity-100"
        }`}
      >
        {lang === "tamil"
          ? `${district || "<வருவாய் மாவட்டம் பெயர்>"} ${
              constituency || "<சட்டமன்ற தொகுதி பெயர்>"
            } மண்டலப் பொறுப்பாளர்கள் பட்டியல் ${year}`
          : `${district || "<Revenue District Name>"} ${
              constituency || "<Assembly Constituency Name>"
            } District Officers List ${year}`}
      </div>
    </div>
  );
};

export default Header;
