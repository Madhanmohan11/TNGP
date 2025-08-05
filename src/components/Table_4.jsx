import React, { useState, useEffect } from "react";
import data from "../data/data.json";

const Table_4 = ({ lang }) => {
  const [districts, setDistricts] = useState([]);
  const [rowCount, setRowCount] = useState(10);

  useEffect(() => {
    setDistricts(data.districts);
  }, []);

  const handleSubdivisionChange = (id, value) => {
    setDistricts((prev) =>
      prev.map((row) =>
        row.id === id ? { ...row, subdivisionName: value } : row
      )
    );
  };

  const handleVoteChange = (id, value) => {
    const numericValue = parseInt(value) || 0;
    setDistricts((prev) =>
      prev.map((row) => (row.id === id ? { ...row, votes: numericValue } : row))
    );
  };

  const totalVotes = districts
    .slice(0, rowCount)
    .reduce((acc, row) => acc + row.votes, 0);

  return (
    <div className="mx-auto mt-6 max-w-6xl rounded border border-gray-300 bg-blue-50 p-4 shadow">
      {/* Title */}
      <h2 className="text-lg font-bold mb-4">
        {data.language[lang].districtTitle}
      </h2>

      {/* Top Inputs */}
      <div className="flex flex-wrap items-center gap-6 mb-4">
        <div className="flex items-center space-x-2">
          <label className="font-semibold">{data.language[lang].totalVotes}</label>
          <input
            type="text"
            value={totalVotes}
            readOnly
            className="border p-1 bg-white rounded w-20 text-center"
          />
        </div>
        <div className="flex items-center space-x-2">
          <label className="font-semibold">{data.language[lang].districtCount}</label>
          <input
            type="number"
            value={rowCount}
            min={1}
            max={districts.length}
            onChange={(e) => setRowCount(parseInt(e.target.value) || 1)}
            className="border p-1 bg-white rounded w-16 text-center"
          />
        </div>
      </div>

      {/* Dynamic Rows */}
      <div className="space-y-3">
        {districts.slice(0, rowCount).map((row, idx) => (
          <div
            key={row.id}
            className="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-2 md:space-y-0"
          >
            <span className="md:w-2/5 w-full font-medium">
              {idx + 1}. {lang === "tamil" ? row.districtNameTa : row.districtNameEn}
            </span>
            <input
              type="text"
              placeholder={data.language[lang].subdivisionPlaceholder}
              value={row.subdivisionName}
              onChange={(e) => handleSubdivisionChange(row.id, e.target.value)}
              className="border p-1 bg-white rounded md:w-2/5 w-full"
            />
            <div className="flex items-center space-x-1 md:w-1/5 w-full">
              <label>{data.language[lang].votesLabel}</label>
              <input
                type="number"
                value={row.votes}
                onChange={(e) => handleVoteChange(row.id, e.target.value)}
                className="border p-1 bg-white rounded w-16 text-center"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Table_4;
