import { expandRange } from "./parser";

export function evaluateFormula(formula, cells) {
  let expr = formula.slice(1);

  try {
    // 🔥 Handle range functions
    expr = expr.replace(
      /(SUM|AVG|MIN|MAX)\(([A-J][0-9]+:[A-J][0-9]+)\)/g,
      (_, func, range) => {
        const refs = expandRange(range);

        const values = refs.map(ref => Number(cells[ref]?.computed) || 0);

        if (func === "SUM") {
          return values.reduce((a, b) => a + b, 0);
        }

        if (func === "AVG") {
          return values.length
            ? values.reduce((a, b) => a + b, 0) / values.length
            : 0;
        }

        if (func === "MIN") {
          return Math.min(...values);
        }

        if (func === "MAX") {
          return Math.max(...values);
        }

        return 0;
      }
    );

    // 🔁 Replace normal cell refs
    expr = expr.replace(/[A-J]10|[A-J][1-9]/g, (ref) => {
      return Number(cells[ref]?.computed) || 0;
    });

    return eval(expr);
  } catch {
    return "#ERROR";
  }
}