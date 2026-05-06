export default function FormulaBar({ selected, value, onChange }) {
  return (
    <div className="flex items-center gap-3 mb-3">
      <div className="px-3 py-1 bg-gray-200 rounded font-semibold">
        {selected}
      </div>

      <input
        className="flex-1 border p-2 rounded outline-none focus:ring-2 focus:ring-blue-400"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Enter value or formula (=A1+B1)"
      />
    </div>
  );
}