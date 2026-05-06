export function detectCycle(start, cells) {
  const visited = new Set();
  const stack = new Set();

  function dfs(node) {
    if (stack.has(node)) {
      return [node]; // start of cycle
    }

    if (visited.has(node)) return null;

    visited.add(node);
    stack.add(node);

    for (let dep of cells[node].deps) {
      const result = dfs(dep);
      if (result) {
        // build full cycle path
        if (!result.includes(node)) {
          result.push(node);
          return result;
        } else {
          return result;
        }
      }
    }

    stack.delete(node);
    return null;
  }

  return dfs(start);
}