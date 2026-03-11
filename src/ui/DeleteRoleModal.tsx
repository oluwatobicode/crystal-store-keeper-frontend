import { AlertTriangle, Loader2, X } from "lucide-react";

interface DeleteRoleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isDeleting: boolean;
  roleName: string;
}

const DeleteRoleModal = ({
  isOpen,
  onClose,
  onConfirm,
  isDeleting,
  roleName,
}: DeleteRoleModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-[500px] bg-white rounded-[12px] shadow-xl border border-gray-100 flex flex-col p-[24px] gap-[20px]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center">
              <AlertTriangle size={20} className="text-[#FE1A1A]" />
            </div>
            <div className="flex flex-col gap-0.5">
              <h1 className="text-[16px] font-bold uppercase tracking-[0.9px] text-[#1D1D1D]">
                Delete Role?
              </h1>
              <p className="text-[13px] text-[#71717A] font-medium">
                This action cannot be undone
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-[#71717A] cursor-pointer hover:text-black transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <p className="text-[13px] text-[#71717A] font-medium">
          Are you sure you want to delete the role{" "}
          <span className="font-bold text-[#1D1D1D]">"{roleName}"</span>? All
          users assigned to this role will lose their permissions.
        </p>

        <div className="flex justify-end gap-[12px]">
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
            {isDeleting ? <Loader2 className="animate-spin" size={16} /> : null}
            {isDeleting ? "Deleting..." : "Delete Role"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteRoleModal;
