import React, { useState, useEffect } from "react";
import data from "../data/data.json";
import ActionButton from "./ActionButton";

const Table_1 = ({ lang }) => {
  const [headers, setHeaders] = useState([]);
  const [members, setMembers] = useState([]);

  useEffect(() => {
    setHeaders(data.language[lang].headers);
    setMembers(data.members);
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
    const name = prompt("Enter Name:");
    const phone = prompt("Enter Phone:");
    const voterId = prompt("Enter Voter ID:");
    const votes = prompt("Enter Votes:");
    const Surname = prompt("Enter Surname:");

    if (!role || !name) return;

    const newMember = {
      role,
      memberId: members.length + 1,
      name,
      phone: phone || "-",
      voterId: voterId || "-",
      votes: votes || "0",
      Surname: Surname || "-",
    };

    setMembers([...members, newMember]);
  };

  return (
    <div className="p-4 border border-gray-300 max-w-6xl mx-auto bg-blue-50 rounded shadow mt-16">
      <h2 className="text-xl font-bold mb-4">{data.language[lang].title}</h2>

      {/* Table wrapper */}
      <div className="overflow-x-auto md:overflow-x-visible max-w-full">
        <table className="w-full border border-gray-400 text-sm">
          <thead>
            <tr className="bg-gray-200 text-left">
              {headers.map((head, idx) => (
                <th
                  key={idx}
                  className="p-2 border border-gray-300 break-words text-xs sm:text-sm"
                >
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {members.map((row) => (
              <tr key={row.memberId} className="bg-gray-100">
                <td className="p-2 border border-gray-300 break-words">{row.role}</td>
                <td className="p-2 border border-gray-300 break-words">{row.memberId}</td>
                <td className="p-2 border border-gray-300 break-words">{row.name}</td>
                <td className="p-2 border border-gray-300 break-words">{row.phone}</td>
                <td className="p-2 border border-gray-300 break-words">{row.voterId}</td>
                <td className="p-2 border border-gray-300 break-words">{row.votes}</td>
                <td className="p-2 border border-gray-300 break-words">{row.alias}</td>
                <td className="p-2 border border-gray-300 space-x-2">
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
      <div className="mt-4 flex justify-left">
        <button
          onClick={handleAddNew}
          className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900"
        >
          {data.language[lang].addNew}
        </button>
      </div>
    </div>
  );
};

export default Table_1;
