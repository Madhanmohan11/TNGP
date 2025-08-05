import React, { useState, useEffect } from "react";
import data from "../data/data.json";
import { IoIosAddCircleOutline } from "react-icons/io";

const Table_6 = ({ lang }) => {
  const [headers, setHeaders] = useState([]);
  const [members, setMembers] = useState([]);
  const [studentMembers, setStudentMembers] = useState([]);
  const [youthMembers, setYouthMembers] = useState([]);
  const [selectedStudentGroup, setSelectedStudentGroup] = useState("");
  const [selectedYouthGroup, setSelectedYouthGroup] = useState("");

  useEffect(() => {
    setHeaders(data.language[lang].headers);
    setMembers(data.membersTable5);

    setStudentMembers([
      ...data.membersTable5sub.map((m) => ({
        ...m,
        memberId: `${m.memberId}`,
      })),
    ]);
    setYouthMembers([
      ...data.membersTable5sub.map((m) => ({
        ...m,
        memberId: `${m.memberId}`,
      })),
    ]);
  }, [lang]);

  const handleEdit = (table, setTable, id) => {
    const index = table.findIndex((m) => m.memberId === id);
    if (index === -1) return;
    const newName = prompt("Enter new name:", table[index].name);
    if (!newName) return;
    const updated = [...table];
    updated[index].name = newName;
    setTable(updated);
  };

  const handleDelete = (table, setTable, id) => {
    if (!window.confirm("Are you sure you want to delete this member?")) return;
    setTable(table.filter((m) => m.memberId !== id));
  };

  const handleAddNew = (table, setTable) => {
    const role = prompt("Enter Role:");
    const name = prompt("Enter Name:");
    const phone = prompt("Enter Phone:");
    const voterId = prompt("Enter Voter ID:");
    const votes = prompt("Enter Votes:");
    const alias = prompt("Enter Alias:");

    if (!role || !name) return;

    const newMember = {
      role,
      memberId: Date.now().toString(),
      name,
      phone: phone || "-",
      voterId: voterId || "-",
      votes: votes || "0",
      alias: alias || "-",
    };

    setTable([...table, newMember]);
  };

  const handleDropdownSelect = (value, table, setTable, groupType) => {
    if (!value) return;
    const newMember = {
      role:
        value === "group1"
          ? lang === "tamil"
            ? `${groupType} பாசறை`
            : `${groupType} Group`
          : lang === "tamil"
          ? "பெண்கள் பாசறை"
          : "Women Group",
      memberId: Date.now().toString(),
      name: lang === "tamil" ? "புதிய உறுப்பினர்" : "New Member",
      phone: "-",
      voterId: "-",
      votes: "0",
      alias: "-",
    };
    setTable([...table, newMember]);
  };

  const renderTable = (tableData, setTableData) => (
    <div className="overflow-x-auto md:overflow-x-visible">
      <table className="w-full border border-gray-400 text-sm mt-2 min-w-[700px]">
        <thead>
          <tr className="bg-gray-200 text-left">
            {headers.map((head, idx) => (
              <th key={idx} className="border border-gray-300 p-2">
                {head}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableData.map((row) => (
            <tr key={row.memberId} className="bg-gray-100">
              <td className="border border-gray-300 p-2">{row.role}</td>
              <td className="border border-gray-300 p-2">{row.memberId}</td>
              <td className="border border-gray-300 p-2">{row.name}</td>
              <td className="border border-gray-300 p-2">{row.phone}</td>
              <td className="border border-gray-300 p-2">{row.voterId}</td>
              <td className="border border-gray-300 p-2">{row.votes}</td>
              <td className="border border-gray-300 p-2">{row.alias}</td>
              <td className="space-x-2 border border-gray-300 p-2">
                <button
                  onClick={() => handleEdit(tableData, setTableData, row.memberId)}
                  className="text-blue-600"
                >
                  {data.language[lang].edit}
                </button>
                <button
                  onClick={() => handleDelete(tableData, setTableData, row.memberId)}
                  className="text-red-600 ml-1"
                >
                  {data.language[lang].delete}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="mx-auto mt-6 max-w-6xl rounded border border-gray-300 bg-blue-50 p-4 shadow">
      {/* Main Table */}
      <h3 className="mb-2 font-bold text-gray-800">
        {lang === "tamil"
          ? "1. <வருவாய் மாவட்டம் பெயர்> <சட்டமன்ற தொகுதி பெயர்> <நிர்வாக மண்டலப் பொறுப்பாளர்கள்>"
          : "1. <Revenue District Name> <Assembly Constituency Name> Main Officers"}
      </h3>

      {renderTable(members, setMembers)}

      {/* Student Section */}
      <div className="mt-6 rounded border border-gray-300 bg-blue-50 p-4">
        <h4 className="font-bold mb-2 text-gray-700">
          {lang === "tamil"
            ? "பாசறைகளுக்கான மாவட்டப் பொறுப்பாளர்கள்"
            : "District Officers for Groups"}
        </h4>

        {/* Student Group Dropdown */}
        <div className="flex items-center space-x-2 mb-3">
          <IoIosAddCircleOutline size={36} className="text-gray-700" />
          <select
            value={selectedStudentGroup}
            onChange={(e) => {
              setSelectedStudentGroup(e.target.value);
              handleDropdownSelect(
                e.target.value,
                studentMembers,
                setStudentMembers,
                lang === "tamil" ? "மாணவர்" : "Student"
              );
            }}
            className="rounded border border-gray-400 bg-white p-2"
          >
            <option value="">
              {lang === "tamil" ? "பாசறையைத் தேர்ந்தெடு" : "Select Student Group"}
            </option>
            <option value="group1">
              {lang === "tamil" ? "மாணவர் பாசறை" : "Student Group"}
            </option>
            <option value="group2">
              {lang === "tamil" ? "பெண்கள் பாசறை" : "Women Group"}
            </option>
          </select>
        </div>

        <h5 className="mb-2 font-semibold text-gray-600">
          {lang === "tamil"
            ? "மாணவர் பாசறை மாவட்டப் பொறுப்பாளர்கள்"
            : "Student Group District Officers"}
        </h5>
        {renderTable(studentMembers, setStudentMembers)}

        {/* Youth Group Dropdown */}
        <div className="flex items-center space-x-2 mb-3 mt-6">
          <IoIosAddCircleOutline size={36} className="text-gray-700" />
          <select
            value={selectedYouthGroup}
            onChange={(e) => {
              setSelectedYouthGroup(e.target.value);
              handleDropdownSelect(
                e.target.value,
                youthMembers,
                setYouthMembers,
                lang === "tamil" ? "இளைஞர்" : "Youth"
              );
            }}
            className="rounded border border-gray-400 bg-white p-2"
          >
            <option value="">
              {lang === "tamil" ? "2.இளைஞர் பாசறை" : "Select Youth Group"}
            </option>
            <option value="group1">
              {lang === "tamil" ? "இளைஞர் பாசறை" : "Youth Group"}
            </option>
            <option value="group2">
              {lang === "tamil" ? "பெண்கள் பாசறை" : "Women Group"}
            </option>
          </select>
        </div>

        <h5 className="mb-2 font-semibold text-gray-600">
          {lang === "tamil"
            ? "இளைஞர் பாசறை மாவட்டப் பொறுப்பாளர்கள்"
            : "Youth Group District Officers"}
        </h5>
        {renderTable(youthMembers, setYouthMembers)}

        <div className="mb-3 flex items-center space-x-2 mt-4">
          <IoIosAddCircleOutline size={36} className="text-gray-700" />
        </div>
      </div>
    </div>
  );
};

export default Table_6;
