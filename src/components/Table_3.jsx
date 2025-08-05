import React, { useState, useEffect } from "react";
import data from "../data/data.json";
import ActionButton from "./ActionButton";

const Table_3 = ({ lang }) => {
  const [headers, setHeaders] = useState([]);
  const [members, setMembers] = useState([]);
  const [districtTitle, setDistrictTitle] = useState("");

  useEffect(() => {
    setHeaders(data.language[lang].headers);
    setMembers(data.membersTable3);

    if (data.districts.length > 0) {
      setDistrictTitle(
        lang === "tamil"
          ? data.districts[0].districtNameTa
          : data.districts[0].districtNameEn
      );
    }
  }, [lang]);

  const handleEdit = (id) => {
    const memberIndex = members.findIndex((m) => m.memberId === id);
    if (memberIndex === -1) return;

    const newName = prompt("Enter new name:", members[memberIndex].name);
    if (!newName) return;

    const updatedMembers = [...members];
    updatedMembers[memberIndex] = {
      ...updatedMembers[memberIndex],
      name: newName,
    };

    setMembers(updatedMembers);
  };

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this member?")) return;
    const updatedMembers = members.filter((m) => m.memberId !== id);
    setMembers(updatedMembers);
  };

  const handleAddNew = () => {
    const role = prompt("Enter Role:");
    const memberId = prompt("Enter Member ID:");
    const name = prompt("Enter Name:");
    const phone = prompt("Enter Phone Number:");
    const voterId = prompt("Enter Voter ID:");
    const votes = prompt("Enter Votes:");
    const alias = prompt("Enter Alias:");

    if (!role || !memberId || !name) return;

    const newMember = {
      role,
      memberId,
      name,
      phone: phone || "-",
      voterId: voterId || "-",
      votes: votes || "0",
      alias: alias || "-",
    };

    setMembers([...members, newMember]);
  };

  return (
    <div className="mx-auto mt-6 max-w-6xl rounded border border-gray-300 bg-blue-50 p-4 shadow">
      <h3 className="mb-4 text-left font-semibold text-gray-800">
        {districtTitle}{" "}
        {lang === "tamil" ? "மண்டலப் பொறுப்பாளர்கள்" : "District Officers"}
      </h3>

      {/* Responsive Table Wrapper */}
      <div className="overflow-x-auto md:overflow-x-visible max-w-full">
        <table className="w-full border border-gray-400 text-sm">
          <thead>
            <tr className="bg-gray-200 text-left">
              {headers.map((head, idx) => (
                <th key={idx} className="border border-gray-300 p-2 break-words">
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {members.map((row, idx) => (
              <tr key={idx} className="bg-gray-100">
                <td className="border border-gray-300 p-2 break-words">{row.role}</td>
                <td className="border border-gray-300 p-2 break-words">{row.memberId}</td>
                <td className="border border-gray-300 p-2 break-words">{row.name}</td>
                <td className="border border-gray-300 p-2 break-words">{row.phone}</td>
                <td className="border border-gray-300 p-2 break-words">{row.voterId}</td>
                <td className="border border-gray-300 p-2 break-words">{row.votes}</td>
                <td className="border border-gray-300 p-2 break-words">{row.alias}</td>
                <td className="space-x-2 border border-gray-300 p-2 break-words">
                  <ActionButton
                    label={data.language[lang].edit}
                    color="blue"
                    onClick={() => handleEdit(row.memberId)}
                  />
                  <ActionButton
                    label={data.language[lang].delete}
                    color="red"
                    onClick={() => handleDelete(row.memberId)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add New Button */}
      <div className="mt-4 flex justify-start">
        <button
          onClick={handleAddNew}
          className="rounded bg-gray-800 px-4 py-2 text-white hover:bg-gray-900"
        >
          {data.language[lang].addNew}
        </button>
      </div>
    </div>
  );
};

export default Table_3;
