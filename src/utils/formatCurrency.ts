export const formatCurrency = (value: number) =>
  value.toLocaleString("en-NG", { style: "currency", currency: "NGN" });
