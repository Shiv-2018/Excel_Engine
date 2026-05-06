import { useState } from "react";

export default function Cell({
  value,
  raw,
  onChange,
  selected,
  onSelect,
  isReferenced
}) {
  const [edit, setEdit] = useState(false);

  const isError = value === "#ERROR" || value === "#CIRCULAR";

  return (
    <td
      onClick={onSelect}
      className={`border relative cursor-pointer transition-all duration-150
        ${selected ? "bg-blue-50" : ""}
        ${isReferenced ? "bg-green-100" : ""}
        ${!selected && !isReferenced ? "hover:bg-gray-100" : ""}
      `}
    >
      {/* 🔵 Active Cell Border */}
      {selected && (
        <div className="absolute inset-0 border-2 border-blue-500 pointer-events-none"></div>
      )}

      {/* 🟢 Referenced Cell Border */}
      {isReferenced && !selected && (
        <div className="absolute inset-0 border-2 border-green-400 pointer-events-none"></div>
      )}

      <input
        className={`w-24 p-1 outline-none bg-transparent
          ${isError ? "text-red-500 font-bold" : ""}
        `}
        value={edit ? raw : value}
        onFocus={() => setEdit(true)}
        onBlur={() => setEdit(false)}
        onChange={(e) => onChange(e.target.value)}
      />
    </td>
  );
}