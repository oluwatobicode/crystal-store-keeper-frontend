import {
  Loader2,
  PlusIcon,
  Search,
  SquarePen,
  Trash2,
  User,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";
import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import { useSuppliers } from "../../hooks/useSuppliers";
import type { Supplier } from "../../types/Supplier";
import SupplierModal from "../../ui/SupplierModal";
import DeleteSupplierModal from "../../ui/DeleteSupplierModal";

const AllSuppliers = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [supplierToEdit, setSupplierToEdit] = useState<Supplier | null>(null);
  const [supplierToDelete, setSupplierToDelete] = useState<Supplier | null>(
    null,
  );

  const { allSuppliers, deleteSupplier } = useSuppliers();
  const isLoading = allSuppliers?.isLoading;
  const filteredSuppliers = useMemo(() => {
    const sList: Supplier[] = allSuppliers?.data?.data?.data || [];
    if (searchQuery.trim()) {
      const term = searchQuery.toLowerCase();
      return sList.filter(
        (s) =>
          s.name?.toLowerCase().includes(term) ||
          s.contactPerson?.toLowerCase().includes(term) ||
          s.email?.toLowerCase().includes(term) ||
          s.phone?.toLowerCase().includes(term),
      );
    }
    return sList;
  }, [searchQuery, allSuppliers?.data?.data?.data]);

  const handleConfirmDelete = async () => {
    if (!supplierToDelete) return;
    try {
      await deleteSupplier.mutateAsync(supplierToDelete._id);
      toast.success("Supplier deleted successfully");
      setSupplierToDelete(null);
    } catch {
      toast.error("Failed to delete supplier");
    }
  };

  return (
    <div className="flex flex-col w-full gap-[24px] px-[24px] h-auto py-[24px] bg-white border border-[#E2E4E9] rounded-[12px]">
      <div className="flex flex-row w-full justify-between items-center">
        <div className="flex flex-col gap-[8px]">
          <h1 className="font-medium uppercase text-black text-[18px] tracking-[0.9px] leading-tight">
            Suppliers
          </h1>
          <p className="font-medium text-[#71717A] tracking-[0.9px] leading-tight text-[13px]">
            Manage your product suppliers and contact information
          </p>
        </div>
        <button
          onClick={() => {
            setSupplierToEdit(null);
            setIsModalOpen(true);
          }}
          className="px-[16px] py-[9px] cursor-pointer bg-[#2474F5] hover:bg-blue-600 transition-colors text-white tracking-[0.9px] rounded-[8px] text-[13px] font-medium flex items-center gap-2"
        >
          <PlusIcon size={16} />
          Add Supplier
        </button>
      </div>

      <div className="flex flex-row items-center gap-4">
        <div className="relative w-full max-w-[348px]">
          <Search className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-400 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search suppliers..."
            className="h-[43px] bg-white w-full rounded-[8px] border border-[#E2E4E9] pl-10 pr-4 outline-none transition-colors focus:border-gray-400 text-[13px]"
          />
        </div>
      </div>

      <div className="w-full overflow-x-auto">
        <table className="w-full text-left">
          <thead className="border-b border-[#E1E4EA]">
            <tr>
              {[
                "Supplier",
                "Contact Person",
                "Contact Info",
                "Address",
                "Actions",
              ].map((head) => (
                <th
                  key={head}
                  className="py-4 px-4 text-xs font-medium text-[#6C7788] tracking-wider uppercase"
                >
                  {head}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-[#E1E4EA]">
            {isLoading ? (
              <tr>
                <td colSpan={5} className="py-8 text-center">
                  <div className="flex items-center justify-center py-8">
                    <Loader2
                      className="animate-spin text-[#71717A]"
                      size={35}
                    />
                  </div>
                </td>
              </tr>
            ) : filteredSuppliers.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-12 text-center text-[#71717A]">
                  <div className="flex flex-col items-center gap-2">
                    <User size={40} className="opacity-20" />
                    <p className="text-[14px] font-medium">
                      No suppliers found
                    </p>
                    <p className="text-[12px]">Try adjusting your search</p>
                  </div>
                </td>
              </tr>
            ) : (
              filteredSuppliers.map((supplier: Supplier) => (
                <tr
                  key={supplier._id}
                  className="group hover:bg-[#FAFAFB] transition-colors"
                >
                  <td className="py-4 px-4">
                    <span className="text-[13px] font-bold text-[#1D1D1D]">
                      {supplier.name}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <User size={14} className="text-[#71717A]" />
                      <span className="text-[13px] font-medium text-[#1D1D1D]">
                        {supplier.contactPerson}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2 text-[12px] text-[#71717A]">
                        <Mail size={12} />
                        <span>{supplier.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-[12px] text-[#71717A]">
                        <Phone size={12} />
                        <span>{supplier.phone}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-start gap-2 max-w-[200px]">
                      <MapPin
                        size={14}
                        className="text-[#71717A] mt-0.5 shrink-0"
                      />
                      <span className="text-[12px] text-[#71717A] line-clamp-2">
                        {supplier.address}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => {
                          setSupplierToEdit(supplier);
                          setIsModalOpen(true);
                        }}
                        className="p-1 hover:text-blue-600 cursor-pointer transition-colors text-[#71717A]"
                      >
                        <SquarePen size={18} />
                      </button>
                      <button
                        onClick={() => setSupplierToDelete(supplier)}
                        className="p-1 hover:text-red-600 cursor-pointer transition-colors text-[#71717A]"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <SupplierModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSupplierToEdit(null);
        }}
        supplierToEdit={supplierToEdit}
      />

      <DeleteSupplierModal
        isOpen={!!supplierToDelete}
        onClose={() => setSupplierToDelete(null)}
        supplierName={supplierToDelete?.name || ""}
        isDeleting={deleteSupplier.isPending}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default AllSuppliers;
