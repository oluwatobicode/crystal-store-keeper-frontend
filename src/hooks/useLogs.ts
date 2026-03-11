import { useQuery } from "@tanstack/react-query";
import api from "../api/api";

export const useLogs = () => {
  const allLogs = useQuery({
    queryKey: ["auditLogs"],
    queryFn: async () =>
      await api.get("/logs", {
        withCredentials: true,
      }),
  });

  const exportLogs = async () => {
    const response = await api.get("/logs/export-csv", {
      withCredentials: true,
      responseType: "blob",
    });

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "audit-logs.csv");
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
  };

  return { allLogs, exportLogs };
};
