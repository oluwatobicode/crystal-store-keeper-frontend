export const getStatusColor = (status: string) => {
  switch (status) {
    case "active":
      return "text-green-600";
    case "inactive":
      return "text-gray-400";
    case "suspended":
      return "text-red-500";
    default:
      return "text-[#6c7788]";
  }
};
