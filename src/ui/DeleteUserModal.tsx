import { Loader2, AlertTriangle, X } from "lucide-react";

interface DeleteUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  userName: string;
  isDeleting: boolean;
  onConfirm: () => void;
}

const DeleteUserModal = ({
  isOpen,
  onClose,
  userName,
  isDeleting,
  onConfirm,
}: DeleteUserModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-[500px] bg-white rounded-[12px] shadow-xl border border-gray-100 flex flex-col">
        <div className="p-[24px] flex justify-between items-start">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center">
              <AlertTriangle size={20} className="text-[#FE1A1A]" />
            </div>
            <div className="flex flex-col gap-0.5">
              <h1 className="text-[16px] font-bold uppercase tracking-[0.9px] text-[#1D1D1D]">
                Delete User ?
              </h1>
              <p className="text-[13px] text-[#71717A] font-medium">
                This action cannot be undone
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-[#71717A] cursor-pointer hover:text-black"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-[24px] flex flex-col gap-[16px]">
          <p className="text-[14px] text-[#1D1D1D] font-medium leading-[22px]">
            Are you sure you want to delete{" "}
            <span className="font-bold">{userName}</span>? This will permanently
            remove their account and all associated data.
          </p>

          <div className="flex justify-end gap-[12px] mt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={isDeleting}
              className="h-[40px] cursor-pointer px-6 rounded-[8px] border border-[#E2E4E9] text-[13px] font-medium text-[#1D1D1D] hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={onConfirm}
              disabled={isDeleting}
              className="h-[40px] cursor-pointer px-6 rounded-[8px] bg-[#FE1A1A] text-[13px] font-medium text-white hover:bg-red-700 transition-colors flex items-center gap-2 disabled:opacity-50"
            >
              {isDeleting ? (
                <Loader2 className="animate-spin" size={16} />
              ) : null}
              {isDeleting ? "Deleting..." : "Delete User"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteUserModal;
