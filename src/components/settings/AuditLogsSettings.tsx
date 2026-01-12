import { History, Download, ChevronDown } from "lucide-react";

// Data transcribed from your screenshot (ddd.jpg)
const auditLogsData = [
  {
    timestamp: "2024-01-15 14:30:25",
    user: "John Doe (Manager)",
    action: "Created Invoice",
    details: "Invoice JCC-20240115-0043 for ₦15,000",
    category: "Sales",
  },
  {
    timestamp: "2024-01-15 14:25:10",
    user: "Jane Smith (Attendant)",
    action: "Applied Discount",
    details: "15% discount approved by Manager...",
    category: "Sales",
  },
  {
    timestamp: "2024-01-15 13:45:00",
    user: "Mike Johnson (Inventory)",
    action: "Stock Adjustment",
    details: "Added 25 units of Emulsion Paint - White",
    category: "Inventory",
  },
  {
    timestamp: "2024-01-15 12:30:15",
    user: "Admin",
    action: "User Created",
    details: "New user account created for Sarah Wilson",
    category: "User Management",
  },
  {
    timestamp: "2024-01-15 10:15:30",
    user: "System",
    action: "Backup Created",
    details: "Scheduled daily backup completed ......",
    category: "System",
  },
];

const AuditLogsSettings = () => {
  return (
    <div className="flex flex-col gap-[26px] bg-white w-full h-auto px-[24px] py-[24px] border border-[#E2E4E9] rounded-[12px]">
      {/* --- HEADER SECTION --- */}
      <div className="flex flex-row items-start justify-between">
        {/* Left: Title & Subtitle */}
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

        {/* Right: Actions */}
        <div className="flex items-center gap-[12px]">
          {/* Category Dropdown */}
          <button className="flex items-center gap-2 h-[36px] px-3 bg-white border border-[#E2E4E9] rounded-[8px] text-[13px] font-medium text-[#1D1D1D] hover:bg-gray-50 transition-colors">
            All Categories
            <ChevronDown size={14} className="text-[#71717A]" />
          </button>

          {/* Export Button */}
          <button className="flex items-center gap-2 h-[36px] px-3 bg-white border border-[#E2E4E9] rounded-[8px] text-[13px] font-medium text-[#1D1D1D] hover:bg-gray-50 transition-colors">
            <Download size={14} className="text-[#71717A]" />
            Export Logs
          </button>
        </div>
      </div>

      {/* --- TABLE SECTION --- */}
      <div className="w-full overflow-x-auto">
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
                )
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E1E4EA]">
            {auditLogsData.map((log, index) => (
              <tr
                key={index}
                className="group hover:bg-[#FAFAFB] transition-colors"
              >
                {/* Timestamp */}
                <td className="py-4 pr-4 text-[13px] font-bold text-[#1D1D1D] tracking-normal whitespace-nowrap">
                  {log.timestamp}
                </td>

                {/* User */}
                <td className="py-4 pr-4 text-[13px] font-medium text-[#1D1D1D] tracking-normal">
                  {log.user}
                </td>

                {/* Action */}
                <td className="py-4 pr-4 text-[13px] font-bold text-[#1D1D1D] tracking-normal">
                  {log.action}
                </td>

                {/* Details */}
                <td className="py-4 pr-4 text-[13px] font-medium text-[#71717A] tracking-normal max-w-[300px] truncate">
                  {log.details}
                </td>

                {/* Category Badge */}
                <td className="py-4">
                  <span className="inline-flex items-center px-[12px] py-[4px] rounded-full border border-[#E4E4E7] bg-white text-[11px] font-medium text-[#71717A]">
                    {log.category}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AuditLogsSettings;
