# 📊 Spreadsheet Engine with Formula Evaluation

A feature-rich **React-based spreadsheet engine** that replicates core Excel functionality, including formula parsing, dependency tracking, circular reference detection, and range-based computations.

---

## 🚀 Features

### 🧩 Core Spreadsheet Functionality

* ✅ 10×10 grid (A–J, 1–10)
* ✅ Editable cells supporting:

  * Numbers
  * Text
  * Formulas (`=A1+B1`, `=A1*2`, etc.)
* ✅ Real-time formula evaluation

---

## 🧮 Formula Engine

### Supported Operations

* Arithmetic: `+ - * /`
* Parentheses: `(A1 + B1) / 2`
* Multiple references in one formula

---

### 🔥 Range Functions (NEW)

Supports Excel-like range operations:

```text
=SUM(A1:A5)
=AVG(A1:A5)
=MIN(A1:A5)
=MAX(A1:A5)
```

### Example:

```text
A1 = 2
A2 = 3
A3 = 5

B1 = =SUM(A1:A3)
```

👉 Output:

```text
B1 = 10
```

---

## 🔁 Dependency Management

* Tracks relationships between cells using a graph structure
* Automatically updates dependent cells
* Efficient recalculation (only affected cells updated)

### Example:

```text
A1 → B1 → C1
```

Updating `A1` updates both `B1` and `C1`

---

## 🔄 Circular Reference Detection

* Detects cycles using DFS (graph traversal)
* Marks **all cells involved in the cycle**

### Example:

```text
A1 = =B1
B1 = =A1
```

👉 Output:

```text
A1 → #CIRCULAR
B1 → #CIRCULAR
```

---

## ⚠️ Error Handling

* Invalid formulas → `#ERROR`
* Circular dependencies → `#CIRCULAR`
* Empty cells treated as `0`
* App remains stable (no crashes)

---

## 💎 UI / UX Features

* ✨ Excel-like **Formula Bar**
* 🎯 Active cell highlighting (blue border)
* 🟢 Referenced cell highlighting (green)
* ⌨️ Keyboard navigation (arrow keys)
* 📌 Sticky headers (rows & columns)
* 🔴 Error cells highlighted
* 🖱️ Click-to-select interaction
* 🎨 Clean responsive UI (Tailwind CSS)

---

## 🔄 Undo / Redo System

* Full state history tracking
* Instant undo/redo (single-click)
* Fixed React state batching issues

---

## 🧠 Architecture

### Cell Structure

```js
{
  value: "",        // raw input
  computed: "",     // evaluated result
  deps: Set(),      // dependencies
  dependents: Set() // reverse dependencies
}
```

### Engine Modules

* **Parser** → Extract references & ranges
* **Evaluator** → Compute expressions & functions
* **Dependency Graph** → Manage relationships
* **Cycle Detection** → Prevent infinite loops

---

## ⚙️ Tech Stack

* React (Vite)
* Tailwind CSS
* JavaScript (ES6)
* Client-side only (no backend)

---

## 📦 Setup Instructions

```bash
# Clone repository
git clone "https://github.com/Shiv-2018/Excel_Engine"

# Navigate into project
cd spreadsheet-engine

# Install dependencies
npm install

# Run locally
npm run dev
```

---

## 🌐 Deployment

Deploy easily on:

* Vercel
* Netlify

```bash
npm run build
```

Upload the `dist/` folder or connect GitHub repo.

---

## 🎯 Bonus Features Implemented

✔ Formula bar (Excel-like UX)
✔ Keyboard navigation
✔ Undo / Redo functionality
✔ Sticky headers
✔ Optimized dependency updates
✔ Full circular reference detection (multi-cell)
✔ Referenced cell highlighting
✔ Range-based functions (`SUM`, `AVG`, `MIN`, `MAX`)
✔ Clean and responsive UI

---

## 🔥 Future Improvements

* Multiple range support (`SUM(A1:A5, B1:B5)`)
* Conditional formulas (`IF`)
* Copy-paste with relative references
* Drag-to-fill cells
* Persistent storage (localStorage / backend)

---

## 📌 Key Learnings

* Graph-based dependency resolution
* DFS cycle detection in directed graphs
* Formula parsing and evaluation
* Efficient state management in React
* Building interactive spreadsheet-like systems

---

## 🏁 Conclusion

This project demonstrates:

* Strong problem-solving skills
* Knowledge of data structures (graphs)
* Real-world UI/UX implementation
* Ability to build scalable frontend systems

---

**Built with focus on performance, correctness, and user experience.**
