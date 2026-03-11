import { History, Download, ChevronDown, Loader2 } from "lucide-react";
import { useState } from "react";
import { useLogs } from "../../hooks/useLogs";
import toast from "react-hot-toast";

interface AuditLog {
  _id: string;
  userSnapshot: string;
  action: string;
  details: string;
  category: string;
  timestamp: string;
}

const categoryColors: Record<string, string> = {
  users: "border-blue-200 text-blue-600 bg-blue-50",
  sales: "border-green-200 text-green-600 bg-green-50",
  customers: "border-purple-200 text-purple-600 bg-purple-50",
  inventory: "border-orange-200 text-orange-600 bg-orange-50",
  settings: "border-gray-200 text-gray-600 bg-gray-50",
};

const AuditLogsSettings = () => {
  const { allLogs, exportLogs } = useLogs();
  const logs: AuditLog[] = allLogs?.data?.data?.data || [];
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showDropdown, setShowDropdown] = useState(false);

  const categories = [
    "All",
    ...Array.from(new Set(logs.map((log) => log.category))),
  ];

  const filteredLogs =
    selectedCategory === "All"
      ? logs
      : logs.filter((log) => log.category === selectedCategory);

  const handleExport = async () => {
    try {
      await exportLogs();
      toast.success("Logs exported successfully");
    } catch {
      toast.error("Failed to export logs");
    }
  };

  const formatAction = (action: string) => {
    return action
      .split("_")
      .map((word) => word.charAt(0) + word.slice(1).toLowerCase())
      .join(" ");
  };

  if (allLogs.isLoading) {
    return (
      <div className="flex items-center justify-center py-16">
        <Loader2 className="animate-spin text-[#71717A]" size={30} />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-[26px] bg-white w-full h-auto px-[24px] py-[24px] border border-[#E2E4E9] rounded-[12px]">
      <div className="flex flex-row items-start justify-between">
        <div className="flex flex-col gap-[8px]">
          <h1 className="font-medium gap-[10px] flex flex-row items-center uppercase text-black text-[15px] tracking-[0.9px] leading-tight">
            <span>
              <History size={18} className="text-[#1D1D1D]" />
            </span>
            System Audit Logs
          </h1>
          <p className="font-medium text-[#71717A] tracking-[0.9px] leading-tight text-[12px]">
            Track system activity and user actions
          </p>
        </div>

        <div className="flex items-center gap-[12px]">
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex cursor-pointer items-center gap-2 h-[36px] px-3 bg-white border border-[#E2E4E9] rounded-[8px] text-[13px] font-medium text-[#1D1D1D] hover:bg-gray-50 transition-colors"
            >
              {selectedCategory === "All"
                ? "All Categories"
                : selectedCategory.charAt(0).toUpperCase() +
                  selectedCategory.slice(1)}
              <ChevronDown size={14} className="text-[#71717A]" />
            </button>

            {showDropdown && (
              <div className="absolute right-0 top-[40px] bg-white border border-[#E2E4E9] rounded-[8px] shadow-lg z-10 min-w-[160px]">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      setSelectedCategory(cat);
                      setShowDropdown(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-[13px] font-medium hover:bg-gray-50 transition-colors first:rounded-t-[8px] last:rounded-b-[8px] ${
                      selectedCategory === cat
                        ? "text-[#2474F5] bg-blue-50"
                        : "text-[#1D1D1D]"
                    }`}
                  >
                    {cat === "All"
                      ? "All Categories"
                      : cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={handleExport}
            className="flex cursor-pointer items-center gap-2 h-[36px] px-3 bg-white border border-[#E2E4E9] rounded-[8px] text-[13px] font-medium text-[#1D1D1D] hover:bg-gray-50 transition-colors"
          >
            <Download size={14} className="text-[#71717A]" />
            Export Logs
          </button>
        </div>
      </div>

      <div className="w-full overflow-x-auto">
        {filteredLogs.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-[#71717A]">
            <History size={40} className="mb-3 opacity-40" />
            <p className="text-[14px] font-medium">No audit logs found</p>
            <p className="text-[12px]">Activity will appear here</p>
          </div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#E1E4EA]">
                {["Timestamp", "User", "Action", "Details", "Category"].map(
                  (head) => (
                    <th
                      key={head}
                      className="py-4 text-xs font-medium text-[#71717A] tracking-wider uppercase"
                    >
                      {head}
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E1E4EA]">
              {filteredLogs.map((log) => (
                <tr
                  key={log._id}
                  className="group hover:bg-[#FAFAFB] transition-colors"
                >
                  <td className="py-4 pr-4 text-[13px] font-bold text-[#1D1D1D] tracking-normal whitespace-nowrap">
                    {new Date(log.timestamp).toLocaleString("en-GB", {
                      year: "numeric",
                      month: "short",
                      day: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>

                  <td className="py-4 pr-4 text-[13px] font-medium text-[#1D1D1D] tracking-normal">
                    {log.userSnapshot}
                  </td>

                  <td className="py-4 pr-4 text-[13px] font-bold text-[#1D1D1D] tracking-normal">
                    {formatAction(log.action)}
                  </td>

                  <td className="py-4 pr-4 text-[13px] font-medium text-[#71717A] tracking-normal max-w-[300px] truncate">
                    {log.details}
                  </td>

                  <td className="py-4">
                    <span
                      className={`inline-flex items-center px-[12px] py-[4px] rounded-full border text-[11px] font-medium capitalize ${
                        categoryColors[log.category] ||
                        "border-[#E4E4E7] bg-white text-[#71717A]"
                      }`}
                    >
                      {log.category}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AuditLogsSettings;
