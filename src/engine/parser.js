export const extractRefs = (formula) => {
  const singleRefs = formula.match(/[A-J]10|[A-J][1-9]/g) || [];

  const rangeMatches = formula.match(/[A-J][0-9]+:[A-J][0-9]+/g) || [];

  let rangeRefs = [];

  rangeMatches.forEach(range => {
    rangeRefs.push(...expandRange(range));
  });

  return [...new Set([...singleRefs, ...rangeRefs])];
};

export const expandRange = (range) => {
  const [start, end] = range.split(":");

  const colStart = start.charCodeAt(0);
  const rowStart = parseInt(start.slice(1));

  const colEnd = end.charCodeAt(0);
  const rowEnd = parseInt(end.slice(1));

  const cells = [];

  for (let c = colStart; c <= colEnd; c++) {
    for (let r = rowStart; r <= rowEnd; r++) {
      cells.push(String.fromCharCode(c) + r);
    }
  }

  return cells;
};