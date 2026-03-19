/**
 * Creates a query string by merging new parameters with existing ones.
 * If a value is null, the parameter is removed.
 */
export const createQueryString = (
  params: Record<string, string | null>,
  currentSearchParams: string
): string => {
  const newParams = new URLSearchParams(currentSearchParams);
  
  Object.entries(params).forEach(([key, value]) => {
    if (value === null) {
      newParams.delete(key);
    } else {
      newParams.set(key, value);
    }
  });

  return newParams.toString();
};
