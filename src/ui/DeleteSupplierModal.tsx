import { Trash2, X, Loader2 } from "lucide-react";

interface DeleteSupplierModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  supplierName: string;
  isDeleting?: boolean;
}

const DeleteSupplierModal = ({
  isOpen,
  onClose,
  onConfirm,
  supplierName,
  isDeleting,
}: DeleteSupplierModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-[500px] bg-white rounded-[12px] shadow-xl border border-gray-100 flex flex-col">
        <div className="p-[24px] border-b border-[#F4F4F5] flex justify-between items-start">
          <div className="flex flex-col gap-1">
            <h1 className="text-[16px] font-bold uppercase tracking-[0.9px] text-[#1D1D1D]">
              Delete Supplier
            </h1>
          </div>
          <button onClick={onClose} className="text-[#71717A] cursor-pointer">
            <X size={20} />
          </button>
        </div>

        <div className="p-[24px] flex flex-col items-center gap-[20px] text-center">
          <div className="w-[48px] h-[48px] bg-red-50 rounded-full flex items-center justify-center text-red-500">
            <Trash2 size={24} />
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-[14px] font-medium text-[#1D1D1D]">
              Are you sure you want to delete{" "}
              <span className="font-bold text-red-600">{supplierName}</span>?
            </p>
            <p className="text-[12px] text-[#71717A]">
              This action cannot be undone. All data associated with this
              supplier will be permanently removed.
            </p>
          </div>
        </div>

        <div className="p-[24px] flex flex-col gap-[12px] bg-[#F9FAFB] rounded-b-[12px] border-t border-[#F4F4F5]">
          <button
            onClick={onConfirm}
            disabled={isDeleting}
            className="w-full h-[44px] cursor-pointer bg-red-500 hover:bg-red-600 transition-colors text-white rounded-[8px] text-[13px] font-medium flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isDeleting ? <Loader2 className="animate-spin" size={16} /> : null}
            Yes, Delete Supplier
          </button>
          <button
            onClick={onClose}
            disabled={isDeleting}
            className="w-full h-[44px] cursor-pointer bg-white border border-[#E2E4E9] rounded-[8px] text-[13px] font-medium text-[#1D1D1D] hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteSupplierModal;
