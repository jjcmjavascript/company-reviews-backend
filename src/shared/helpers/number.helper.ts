export const isNumber = (value: unknown): boolean => {
  if (typeof value === 'string' && value.trim() === '') return false;
  if (typeof value === 'object') return false;

  return !Number.isNaN(Number(value)) && Number.isFinite(Number(value));
};

export const isPositiveNumber = (value: unknown): boolean => {
  return isNumber(value) && Number(value) > -1;
};
