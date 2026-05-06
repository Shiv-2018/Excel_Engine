export const extractRefs = (formula) => {
  return formula.match(/[A-J]10|[A-J][1-9]/g) || [];
};