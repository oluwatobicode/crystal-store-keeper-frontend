import {
  Database,
  FileDown,
  Shield,
  Clock,
  AlertTriangle,
  Info,
} from "lucide-react";
import { useState } from "react";

const BackupSettings = () => {
  const [autoBackup, setAutoBackup] = useState(false);
  const [cloudSync, setCloudSync] = useState(false);

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
          {/* Header */}
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
            <button className="w-full cursor-pointer bg-[#FAFAFB] border border-[#E2E4E9] rounded-[8px] h-[40px] text-[13px] font-medium text-[#1D1D1D] hover:bg-gray-100 transition-colors">
              Export Sales (CSV)
            </button>
            <button className="w-full cursor-pointer bg-[#FAFAFB] border border-[#E2E4E9] rounded-[8px] h-[40px] text-[13px] font-medium text-[#1D1D1D] hover:bg-gray-100 transition-colors">
              Export Customers (CSV)
            </button>
            <button className="w-full cursor-pointer bg-[#FAFAFB] border border-[#E2E4E9] rounded-[8px] h-[40px] text-[13px] font-medium text-[#1D1D1D] hover:bg-gray-100 transition-colors">
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

      <div
        className="bg-white border border-[#E2E4E9] rounded-[12px] p-[24px] flex flex-col gap-[24px]
      
        "
      >
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
              onClick={() => setAutoBackup(!autoBackup)}
              className={`w-[44px] h-[24px] rounded-full cursor-pointer p-1 transition-colors duration-200 ease-in-out ${
                autoBackup ? "bg-[#2474F5]" : "bg-[#E4E4E7]"
              }`}
            >
              <div
                className={`w-[16px] h-[16px] bg-white cursor-pointer rounded-full  transition-transform duration-200 ease-in-out ${
                  autoBackup ? "translate-x-[20px]" : "translate-x-0"
                }`}
              />
            </button>
          </div>

          <div className="h-[1px] w-full bg-[#F4F4F5]"></div>

          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-1">
              <h3 className="text-[14px] font-medium text-[#1D1D1D]">
                Cloud Sync
              </h3>
              <p className="text-[12px] text-[#71717A]">
                Automatically upload encrypted backups to cloud storage
              </p>
            </div>

            <button
              onClick={() => setCloudSync(!cloudSync)}
              className={`w-[44px] h-[24px] rounded-full cursor-pointer p-1 transition-colors duration-200 ease-in-out ${
                cloudSync ? "bg-[#2474F5]" : "bg-[#E4E4E7]"
              }`}
            >
              <div
                className={`w-[16px] h-[16px] bg-white cursor-pointer rounded-full  transition-transform duration-200 ease-in-out ${
                  cloudSync ? "translate-x-[20px]" : "translate-x-0"
                }`}
              />
            </button>
          </div>
        </div>

        <div className="mt-2">
          <button className="w-full cursor-pointer bg-[#FAFAFB] border border-[#E2E4E9] rounded-[8px] h-[48px] text-[14px] font-medium text-[#1D1D1D] hover:bg-gray-100 transition-colors">
            Configure Schedule
          </button>
        </div>
      </div>
    </div>
  );
};

export default BackupSettings;
