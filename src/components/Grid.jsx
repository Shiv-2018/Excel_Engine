import { useState } from "react";
import Cell from "./Cell";
import FormulaBar from "./FormulaBar";
import { evaluateFormula } from "../engine/evaluator";
import { extractRefs } from "../engine/parser";
import { detectCycle } from "../engine/dependencyGraph";



const cols = "ABCDEFGHIJ".split("");
const rows = Array.from({ length: 10 }, (_, i) => i + 1);

const initGrid = () => {
  const grid = {};
  cols.forEach((c) => {
    rows.forEach((r) => {
      const id = c + r;
      grid[id] = {
        value: "",
        computed: "",
        deps: new Set(),
        dependents: new Set(),
      };
    });
  });
  return grid;
};

export default function Grid() {
  const [cells, setCells] = useState(initGrid());
  const [selected, setSelected] = useState("A1");

  // Undo / Redo
  const [history, setHistory] = useState([]);
  const [future, setFuture] = useState([]);

  const saveHistory = (state) => {
    setHistory((prev) => [...prev, structuredClone(state)]);
    setFuture([]);
  };

  const undo = () => {
  if (!history.length) return;

  const prevState = history[history.length - 1];

  setFuture(f => [structuredClone(cells), ...f]);
  setCells(prevState);

  setHistory(h => h.slice(0, -1));
};

  const redo = () => {
  if (!future.length) return;

  const nextState = future[0];

  setHistory(h => [...h, structuredClone(cells)]);
  setCells(nextState);

  setFuture(f => f.slice(1));
};

  const compute = (id, value, newCells) => {
    newCells[id].value = value;

    if (value.startsWith("=")) {
      const refs = extractRefs(value);

      newCells[id].deps = new Set(refs);
      refs.forEach((ref) => newCells[ref]?.dependents.add(id));

      const cycle = detectCycle(id, newCells);

      if (cycle) {
        cycle.forEach((c) => {
          newCells[c].computed = "#CIRCULAR";
        });
        return;
      }

      newCells[id].computed = evaluateFormula(value, newCells);
    } else {
      newCells[id].computed = value;
    }

    // propagate
    const queue = [...newCells[id].dependents];
    while (queue.length) {
      const cur = queue.shift();
      const cell = newCells[cur];

      if (cell.value.startsWith("=")) {
        cell.computed = evaluateFormula(cell.value, newCells);
      }

      queue.push(...cell.dependents);
    }
  };

  const handleChange = (id, value) => {
  // ✅ Save current state BEFORE updating
  saveHistory(cells);

  setCells(prev => {
    const newCells = structuredClone(prev);
    compute(id, value, newCells);
    return newCells;
  });
};

  // Keyboard navigation
  const handleKey = (e) => {
    let col = selected.charCodeAt(0) - 65;
    let row = parseInt(selected.slice(1)) - 1;

    if (e.key === "ArrowRight") col++;
    if (e.key === "ArrowLeft") col--;
    if (e.key === "ArrowDown") row++;
    if (e.key === "ArrowUp") row--;

    if (col >= 0 && col < 10 && row >= 0 && row < 10) {
      setSelected(cols[col] + (row + 1));
    }
  };

  return (
    <div onKeyDown={handleKey} tabIndex={0}>
      {/* Formula Bar */}
      <FormulaBar
        selected={selected}
        value={cells[selected].value}
        onChange={(v) => handleChange(selected, v)}
      />

      <div className="overflow-auto bg-white shadow-lg rounded-xl">
        <table className="border-collapse">
          <thead className="sticky top-0 bg-gray-300">
            <tr>
              <th></th>
              {cols.map((c) => (
                <th key={c} className="border p-2">
                  {c}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {rows.map((r) => (
              <tr key={r}>
                <td className="border p-2 bg-gray-200">{r}</td>

                {cols.map((c) => {
                  const id = c + r;
                  const cell = cells[id];

                  return (
                    <Cell
                      key={id}
                      value={cell.computed}
                      raw={cell.value}
                      selected={selected === id}
                      onSelect={() => setSelected(id)}
                      onChange={(v) => handleChange(id, v)}
                    />
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Undo Redo */}
      <div className="mt-4 flex gap-3">
        <button
          onClick={undo}
          className="px-3 py-1 bg-blue-500 text-white rounded"
        >
          Undo
        </button>
        <button
          onClick={redo}
          className="px-3 py-1 bg-green-500 text-white rounded"
        >
          Redo
        </button>
      </div>
    </div>
  );
}
