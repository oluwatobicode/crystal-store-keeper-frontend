export const formatUserId = (text: string): string => {
  const suffix = text.slice(-4);
  return `U-${suffix}`;
};
