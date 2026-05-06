# 📊 Spreadsheet Engine with Formula Evaluation

A React-based mini spreadsheet application that replicates core Excel-like functionality, including formula parsing, dependency tracking, and real-time updates.

---

## 🚀 Features

### 🧩 Core Features

* ✅ 10×10 spreadsheet grid (A–J, 1–10)
* ✅ Editable cells supporting:

  * Numeric values
  * Text values
  * Formulas (`=A1+B1`, `=A1*2`, etc.)
* ✅ Formula parsing with:

  * Arithmetic operators: `+ - * /`
  * Multiple cell references
  * Parentheses support
* ✅ Automatic recalculation of dependent cells
* ✅ Dependency graph for efficient updates

---

### 🔁 Dependency Management

* Tracks relationships between cells
* Propagates updates only to affected cells (optimized)
* Handles chained dependencies:

  ```
  A1 → B1 → C1
  ```

---

### 🔄 Circular Reference Detection

* Detects cycles using DFS traversal
* Marks **all cells involved in the cycle**
* Prevents infinite loops

**Example:**

```
A1 = =B1
B1 = =A1
```

👉 Output:

```
A1 → #CIRCULAR
B1 → #CIRCULAR
```

---

### ⚠️ Error Handling

* Invalid formulas → `#ERROR`
* Circular references → `#CIRCULAR`
* Empty references treated as `0`
* App remains stable (no crashes)

---

## 💎 UI / UX Enhancements

* ✨ Excel-like **Formula Bar**
* 🎯 Active cell highlighting
* ⌨️ Keyboard navigation (Arrow keys)
* 📌 Sticky headers for rows & columns
* 🎨 Clean UI using Tailwind CSS
* 🔴 Error cells highlighted in red
* 🖱️ Click-to-select cells

---

## 🔄 Undo / Redo System

* Supports full state history
* Instant undo/redo without lag
* Fixed React state batching issue (single-click working)

---

## 🧠 Architecture

### State Structure

Each cell maintains:

```js
{
  value: "",        // raw input
  computed: "",     // evaluated result
  deps: Set(),      // dependencies
  dependents: Set() // reverse dependencies
}
```

### Engine Components

* **Parser** → Extract cell references
* **Evaluator** → Compute formula result
* **Dependency Graph** → Manage relationships
* **Cycle Detector** → Prevent loops

---

## ⚙️ Tech Stack

* React (Vite)
* Tailwind CSS
* JavaScript (ES6)
* No backend (client-side only)

---

## 📦 Installation & Setup

```bash
# Clone repo
git clone <your-repo-url>

# Navigate
cd spreadsheet-engine

# Install dependencies
npm install

# Run app
npm run dev
```

---

## 🌐 Deployment

You can deploy easily on:

* Vercel
* Netlify

```bash
npm run build
```

Upload the `dist/` folder.

---

## 🎯 Bonus Features Implemented

✔ Undo / Redo functionality
✔ Keyboard navigation (Arrow keys)
✔ Formula bar (Excel-like UX)
✔ Sticky headers
✔ Optimized recalculation (only affected cells)
✔ Full circular dependency marking (not just one cell)
✔ Error highlighting UI
✔ Clean and responsive design

---

## 🔥 Future Improvements

* Range formulas (`=SUM(A1:A5)`)
* Drag-to-fill functionality
* Copy-paste support
* Larger/dynamic grid
* Backend persistence

---

## 📌 Key Learnings

* Graph-based dependency resolution
* DFS cycle detection in directed graphs
* Efficient state management in React
* Handling formula parsing and evaluation
* Avoiding infinite loops in reactive systems

---

## 🏁 Conclusion

This project demonstrates a strong understanding of:

* Data structures (graphs)
* React state management
* System design for real-time updates

---

**Built with focus on correctness, performance, and usability.**
