import React, { useState, useEffect } from "react";
import data from "../data/data.json";

const Table_7 = ({ lang = "tamil" }) => {
  const [members, setMembers] = useState([]);
  const [texts, setTexts] = useState({});
  const [initialMembers, setInitialMembers] = useState([]);

  useEffect(() => {
    const membersData = data.membersTable7 || [];
    setMembers(membersData);
    setInitialMembers(membersData);
    setTexts(data.language[lang]);
  }, [lang]);

  const handleInputChange = (index, value) => {
    const updated = [...members];
    updated[index].inputValue = value;
    setMembers(updated);
  };

  const handleSave = () => {
    console.log("Saved Members Data:", members);
    alert("Data Saved!");
     
  };

  const handleCancel = () => {
    setMembers(initialMembers);  
    alert("Changes Discarded");
  };

  const handleSubmitApproval = () => {
    alert("Submitted for Approval");
   
  };

  return (
    <div className="mx-auto mt-6 max-w-6xl rounded border border-gray-300 bg-blue-50 p-4 shadow">
      <h2 className="mb-4 text-xl font-bold">{texts.table6Title}</h2>

      {/* Responsive Table */}
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300 bg-blue-50 text-sm min-w-[600px]">
          <tbody>
            {members.map((member, index) => (
              <tr key={index} className="border-b border-gray-200">
                {/* Left Column - Role */}
                <td className="w-1/3 border-r border-gray-200 p-2 font-semibold text-gray-700">
                  {member.role}
                </td>

                {/* Middle Column - Input */}
                <td className="w-1/3 border-r border-gray-200 p-2 text-center">
                  <input
                    type="text"
                    value={member.inputValue}
                    onChange={(e) => handleInputChange(index, e.target.value)}
                    className="w-40 rounded border border-gray-400 bg-white p-1 text-center"
                  />
                </td>

                {/* Right Column - Description */}
                <td className="w-1/3 p-2 text-gray-700">{member.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Action Buttons */}
      <div className="mt-6 flex justify-between flex-wrap gap-2">
        <button
          onClick={handleSubmitApproval}
          className="rounded bg-blue-600 px-4 py-2 text-white"
        >
          {texts.submitApproval}
        </button>

        <div className="space-x-3">
          <button
            onClick={handleCancel}
            className="rounded bg-red-500 px-4 py-2 text-white "
          >
            {texts.cancel}
          </button>
          <button
            onClick={handleSave}
            className="rounded bg-green-600 px-4 py-2 text-white "
          >
            {texts.save}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Table_7;
