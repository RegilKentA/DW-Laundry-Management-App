export const formatCurrency = (amount: number): string => {
  return `₱${amount.toFixed(2)}`;
};

export const getInitials = (name: string): string => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("");
};

export const pluralize = (count: number, singular: string): string => {
  return count === 1 ? singular : `${singular}s`;
};
