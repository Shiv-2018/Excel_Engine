import { useState } from "react";

export default function Cell({ value, raw, onChange, selected, onSelect }) {
  const [edit, setEdit] = useState(false);

  const isError = value === "#ERROR" || value === "#CIRCULAR";

  return (
    <td
      className={`border relative ${
        selected ? "ring-2 ring-blue-500" : ""
      }`}
      onClick={onSelect}
    >
      <input
        className={`w-24 p-1 outline-none ${
          isError ? "text-red-500 font-bold" : ""
        }`}
        value={edit ? raw : value}
        onFocus={() => setEdit(true)}
        onBlur={() => setEdit(false)}
        onChange={(e) => onChange(e.target.value)}
      />
    </td>
  );
}