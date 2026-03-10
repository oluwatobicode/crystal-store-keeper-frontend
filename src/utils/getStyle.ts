export const getStyle = (type: string) => {
  switch (type) {
    case "paid":
      return "bg-[#22C35D1A] text-[#22C35D]";
    case "Partial":
      return "bg-[#2474F51A] text-[#1A47FE]";
  }

  return "";
};
