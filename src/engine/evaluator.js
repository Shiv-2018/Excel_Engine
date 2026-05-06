export function evaluateFormula(formula, cells) {
  let expr = formula.slice(1);

  expr = expr.replace(/[A-J]10|[A-J][1-9]/g, (ref) => {
    return cells[ref]?.computed || 0;
  });

  try {
    return eval(expr);
  } catch {
    return "#ERROR";
  }
}