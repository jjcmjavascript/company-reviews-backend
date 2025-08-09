export const isEmpty = (value: unknown): boolean => {
  if (value === null || value === undefined) return true;

  if (typeof value === 'string' && value.trim() === '') return true;

  if (typeof value === 'object') {
    if (Array.isArray(value)) return value.length === 0;

    if (value instanceof Map || value instanceof Set) return value.size === 0;

    if (value instanceof WeakMap || value instanceof WeakSet) return false;

    return Object.keys(value).length === 0;
  }

  return false;
};
