import React, { useState, useEffect } from 'react';
import data from '../data/data.json';
import ActionButton from './ActionButton';
import { IoIosAddCircleOutline } from 'react-icons/io';

const Table_2 = ({ lang }) => {
  const [headers, setHeaders] = useState([]);
  const [membersTable1, setMembersTable1] = useState([]);
  const [membersTable2, setMembersTable2] = useState([]);
  const [selectedGroup1, setSelectedGroup1] = useState('');
  const [selectedGroup2, setSelectedGroup2] = useState('');

  useEffect(() => {
    setHeaders(data.language[lang].headers);
    setMembersTable1(data.members);
    setMembersTable2(data.members);
  }, [lang]);

  const handleEdit = (table, id) => {
    const setMembers = table === 1 ? setMembersTable1 : setMembersTable2;
    const members = table === 1 ? membersTable1 : membersTable2;

    const memberIndex = members.findIndex((m) => m.memberId === id);
    if (memberIndex === -1) return;

    const newName = prompt('Enter new name:', members[memberIndex].name);
    if (!newName) return;

    const updatedMembers = [...members];
    updatedMembers[memberIndex] = {
      ...updatedMembers[memberIndex],
      name: newName,
    };

    setMembers(updatedMembers);
  };

  const handleDelete = (table, id) => {
    const setMembers = table === 1 ? setMembersTable1 : setMembersTable2;
    const members = table === 1 ? membersTable1 : membersTable2;

    if (!window.confirm('Are you sure you want to delete this member?')) return;
    const updatedMembers = members.filter((m) => m.memberId !== id);
    setMembers(updatedMembers);
  };

  const handleAddNew = (table) => {
    const setMembers = table === 1 ? setMembersTable1 : setMembersTable2;
    const members = table === 1 ? membersTable1 : membersTable2;

    const role = prompt('Enter Role:');
    const name = prompt('Enter Name:');
    const phone = prompt('Enter Phone:');
    const voterId = prompt('Enter Voter ID:');
    const votes = prompt('Enter Votes:');
    const alias = prompt('Enter Alias:');

    if (!role || !name) return;

    const newMember = {
      role,
      memberId: members.length + 1,
      name,
      phone: phone || '-',
      voterId: voterId || '-',
      votes: votes || '0',
      alias: alias || '-',
    };

    setMembers([...members, newMember]);
  };

  const handleDropdownSelect = (table, event) => {
    const value = event.target.value;
    if (table === 1) setSelectedGroup1(value);
    else setSelectedGroup2(value);

    if (value) {
      const newMember = {
        role:
          value === 'group1'
            ? lang === 'tamil'
              ? 'இளைஞர் பாசறை'
              : 'Youth Group'
            : lang === 'tamil'
              ? 'பெண்கள் பாசறை'
              : 'Women Group',
        memberId: Date.now(),
        name: lang === 'tamil' ? 'புதிய உறுப்பினர்' : 'New Member',
        phone: '-',
        voterId: '-',
        votes: '0',
        alias: '-',
      };

      if (table === 1) setMembersTable1([...membersTable1, newMember]);
      else setMembersTable2([...membersTable2, newMember]);
    }
  };

  const renderTable = (members, tableNumber, title) => (
    <div className="mb-6">
      {/* Plus Button + Dropdown */}
      <div className="mb-3 flex items-center space-x-2">
        <IoIosAddCircleOutline size={36} className="text-gray-700" />
        <select
          value={tableNumber === 1 ? selectedGroup1 : selectedGroup2}
          onChange={(e) => handleDropdownSelect(tableNumber, e)}
          className="rounded border border-gray-400 bg-white p-2"
        >
          <option value="">
            {tableNumber === 1
              ? lang === 'tamil'
                ? 'பாசறையைத் தேர்ந்தெடு'
                : 'Select Group'
              : lang === 'tamil'
                ? '2.இளைஞர் பாசறை'
                : 'Select Group'}
          </option>
          <option value="group1">
            {lang === 'tamil' ? 'இளைஞர் பாசறை' : 'Youth Group'}
          </option>
          <option value="group2">
            {lang === 'tamil' ? 'பெண்கள் பாசறை' : 'Women Group'}
          </option>
        </select>
      </div>

      <h3 className="mb-2 text-lg font-semibold text-gray-700">{title}</h3>

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
            {members.map((row) => (
              <tr key={row.memberId} className="bg-gray-100">
                <td className="border border-gray-300 p-2 break-words">{row.role}</td>
                <td className="border border-gray-300 p-2 break-words">{row.memberId}</td>
                <td className="border border-gray-300 p-2 break-words">{row.name}</td>
                <td className="border border-gray-300 p-2 break-words">{row.phone}</td>
                <td className="border border-gray-300 p-2 break-words">{row.voterId}</td>
                <td className="border border-gray-300 p-2 break-words">{row.votes}</td>
                <td className="border border-gray-300 p-2 break-words">{row.alias}</td>
                <td className="border border-gray-300 p-2 space-x-2 break-words">
                  <ActionButton
                    label={data.language[lang].edit}
                    color="blue"
                    onClick={() => handleEdit(tableNumber, row.memberId)}
                  />
                  <ActionButton
                    label={data.language[lang].delete}
                    color="red"
                    onClick={() => handleDelete(tableNumber, row.memberId)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add New Button */}
      <div className="mt-4 flex items-center space-x-4">
        <button
          onClick={() => handleAddNew(tableNumber)}
          className="rounded bg-gray-800 px-4 py-2 text-white hover:bg-gray-900"
        >
          {data.language[lang].addNew}
        </button>
      </div>
    </div>
  );

  return (
    <div className="mx-auto mt-16 max-w-6xl rounded border border-gray-300 bg-blue-50 p-4 shadow">
      <h2 className="mb-4 text-xl font-bold">{data.language[lang].title2}</h2>

      {renderTable(
        membersTable1,
        1,
        lang === 'tamil'
          ? 'மாணவர் பாசறை மாவட்டப் பொறுப்பாளர்கள்'
          : 'Student Wing District Officers'
      )}

      {renderTable(
        membersTable2,
        2,
        lang === 'tamil'
          ? 'இளைஞர் பாசறை மாவட்டப் பொறுப்பாளர்கள்'
          : 'Youth Wing District Officers'
      )}

      <div className="mb-3 flex items-center space-x-2">
        <IoIosAddCircleOutline size={36} className="text-gray-700" />
      </div>
    </div>
  );
};

export default Table_2;
