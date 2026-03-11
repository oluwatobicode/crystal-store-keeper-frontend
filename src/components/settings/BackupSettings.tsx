import {
  Database,
  FileDown,
  Shield,
  Clock,
  AlertTriangle,
  Info,
  Loader2,
} from "lucide-react";
import { useSettings } from "../../hooks/useSettings";
import api from "../../api/api";
import toast from "react-hot-toast";

const exportCsv = async (endpoint: string, filename: string) => {
  try {
    const response = await api.get(endpoint, {
      withCredentials: true,
      responseType: "blob",
    });
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
    toast.success(`${filename} exported successfully`);
  } catch {
    toast.error("Failed to export data");
  }
};

const BackupSettings = () => {
  const { getSettings, updateSettings } = useSettings();
  const settingsData = getSettings?.data?.data?.data;
  const backup = settingsData?.backup;

  const handleToggleAutoBackup = async () => {
    try {
      await updateSettings.mutateAsync({
        backup: {
          scheduleEnabled: !backup?.scheduleEnabled,
        },
      });
      toast.success(
        backup?.scheduleEnabled
          ? "Automatic backups disabled"
          : "Automatic backups enabled",
      );
    } catch {
      toast.error("Failed to update backup settings");
    }
  };

  if (getSettings.isLoading) {
    return (
      <div className="flex items-center justify-center py-16">
        <Loader2 className="animate-spin text-[#71717A]" size={30} />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-[24px]">
      <div className="grid grid-cols-2 gap-[24px]">
        <div className="bg-white border border-[#E2E4E9] rounded-[12px] p-[24px] flex flex-col gap-[24px]">
          <div className="flex flex-col gap-[8px]">
            <div className="flex items-center gap-[10px]">
              <Database size={18} className="text-[#1D1D1D]" />
              <h2 className="text-[16px] font-medium text-[#1D1D1D] uppercase tracking-[0.9px]">
                Backup & Restore
              </h2>
            </div>
            <p className="text-[12px] text-[#71717A] font-medium tracking-[0.9px]">
              Secure your data with regular backups
            </p>
          </div>

          <div className="flex flex-col gap-[16px]">
            {backup?.lastBackupAt && (
              <p className="text-[12px] text-[#71717A] font-medium">
                Last backup:{" "}
                {new Date(backup.lastBackupAt).toLocaleDateString()}
              </p>
            )}

            <button className="flex cursor-pointer items-center gap-2 w-fit px-4 py-2 border border-[#E2E4E9] rounded-[8px] text-[12px] font-medium text-[#1D1D1D] hover:bg-gray-50 transition-colors">
              <Shield size={14} />
              Request Approval
            </button>

            <div className="flex flex-col gap-[8px]">
              <label className="text-[13px] font-medium text-[#1D1D1D] tracking-[0.9px]">
                Restore from Backup
              </label>
              <div className="flex gap-[12px]">
                <div className="flex-1 bg-[#FAFAFB] border border-[#E2E4E9] rounded-[8px] h-[40px] flex items-center px-3 text-[13px] text-[#71717A]">
                  No file chosen
                </div>
                <button className="flex cursor-pointer items-center gap-2 px-4 h-[40px] bg-white border border-[#E2E4E9] rounded-[8px] text-[12px] font-medium text-[#1D1D1D] hover:bg-gray-50 transition-colors">
                  <Shield size={14} />
                  Request Approval
                </button>
              </div>
            </div>

            <div className="bg-[#FFF8EB] border border-[#FEEDCB] rounded-[8px] p-[12px] flex items-start gap-3">
              <AlertTriangle
                size={16}
                className="text-[#B54708] mt-0.5 shrink-0"
              />
              <p className="text-[11px] text-[#B54708] font-medium leading-[16px]">
                Warning: Restoring will overwrite all current data. Create a
                backup before restoring.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-[#E2E4E9] rounded-[12px] p-[24px] flex flex-col justify-between">
          <div className="flex flex-col gap-[8px]">
            <div className="flex items-center gap-[10px]">
              <FileDown size={18} className="text-[#1D1D1D]" />
              <h2 className="text-[16px] font-medium text-[#1D1D1D] uppercase tracking-[0.9px]">
                Data Exports
              </h2>
            </div>
            <p className="text-[12px] text-[#71717A] font-medium tracking-[0.9px]">
              Download your system records manually
            </p>
          </div>

          <div className="flex flex-col gap-[12px] mt-6">
            <button
              onClick={() =>
                exportCsv("/backups/sales/export-csv", "sales.csv")
              }
              className="w-full cursor-pointer bg-[#FAFAFB] border border-[#E2E4E9] rounded-[8px] h-[40px] text-[13px] font-medium text-[#1D1D1D] hover:bg-gray-100 transition-colors"
            >
              Export Sales (CSV)
            </button>
            <button
              onClick={() =>
                exportCsv("/backups/customers/export-csv", "customers.csv")
              }
              className="w-full cursor-pointer bg-[#FAFAFB] border border-[#E2E4E9] rounded-[8px] h-[40px] text-[13px] font-medium text-[#1D1D1D] hover:bg-gray-100 transition-colors"
            >
              Export Customers (CSV)
            </button>
            <button
              onClick={() =>
                exportCsv("/backups/inventory/export-csv", "inventory.csv")
              }
              className="w-full cursor-pointer bg-[#FAFAFB] border border-[#E2E4E9] rounded-[8px] h-[40px] text-[13px] font-medium text-[#1D1D1D] hover:bg-gray-100 transition-colors"
            >
              Export Inventory (CSV)
            </button>
          </div>

          <div className="bg-[#EFF8FF] border border-[#D1E9FF] rounded-[8px] p-[12px] flex items-start gap-3 mt-4">
            <Info size={16} className="text-[#175CD3] mt-0.5 shrink-0" />
            <p className="text-[11px] text-[#175CD3] font-medium leading-[16px]">
              Note: Exporting large datasets may take a few moments. You will be
              notified when the download is ready.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white border border-[#E2E4E9] rounded-[12px] p-[24px] flex flex-col gap-[24px]">
        <div className="flex flex-col gap-[8px]">
          <div className="flex items-center gap-[10px]">
            <Clock size={18} className="text-[#1D1D1D]" />
            <h2 className="text-[16px] font-medium text-[#1D1D1D] uppercase tracking-[0.9px]">
              Scheduled Backups
            </h2>
          </div>
          <p className="text-[12px] text-[#71717A] font-medium tracking-[0.9px]">
            Configure automatic backup schedule
          </p>
        </div>

        <div className="flex flex-col gap-[24px] px-2">
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-1">
              <h3 className="text-[14px] font-medium text-[#1D1D1D]">
                Enable Automatic Backups
              </h3>
              <p className="text-[12px] text-[#71717A]">
                System will create a backup snapshot daily at 00:00
              </p>
            </div>

            <button
              onClick={handleToggleAutoBackup}
              className={`w-[44px] h-[24px] rounded-full cursor-pointer p-1 transition-colors duration-200 ease-in-out ${
                backup?.scheduleEnabled ? "bg-[#2474F5]" : "bg-[#E4E4E7]"
              }`}
            >
              <div
                className={`w-[16px] h-[16px] bg-white cursor-pointer rounded-full transition-transform duration-200 ease-in-out ${
                  backup?.scheduleEnabled
                    ? "translate-x-[20px]"
                    : "translate-x-0"
                }`}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BackupSettings;
