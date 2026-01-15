import { useState } from "react";
import { Plus, Search, ChevronDown, Trash2, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const ReceiveStockSchema = z.object({
  supplierId: z.string().min(1, "Please select a supplier"),
  invoiceRef: z.string().min(1, "Invoice reference is required"),
});

type ReceiveStockFormData = z.infer<typeof ReceiveStockSchema>;

interface StockItem {
  id: string;
  productName: string;
  quantity: number;
  cost: number;
}

const ReceiveStock = () => {
  const [items, setItems] = useState<StockItem[]>([]);
  const [newItem, setNewItem] = useState({ name: "", qty: "", cost: "" });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ReceiveStockFormData>({
    resolver: zodResolver(ReceiveStockSchema),
  });

  const handleAddItem = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent form submit
    if (!newItem.name || !newItem.qty || !newItem.cost) return;

    const item: StockItem = {
      id: Math.random().toString(36).substr(2, 9),
      productName: newItem.name,
      quantity: parseInt(newItem.qty),
      cost: parseFloat(newItem.cost),
    };

    setItems([...items, item]);
    setNewItem({ name: "", qty: "", cost: "" });
  };

  const handleRemoveItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };

  // 3. Final Submission (Axios)
  const onSubmit = async (data: ReceiveStockFormData) => {
    if (items.length === 0) {
      alert("Please add at least one product to the list.");
      return;
    }

    try {
      // Construct the final payload
      const payload = {
        ...data, // supplierId, invoiceRef
        items: items, // The array of products
        totalValue: items.reduce(
          (acc, curr) => acc + curr.quantity * curr.cost,
          0
        ),
      };

      console.log("Submitting Payload:", payload);

      // Real Axios call (Commented out for demo)
      await new Promise((resolve) => setTimeout(resolve, 2000));

      reset();
      setItems([]);
    } catch (error) {
      console.error("Submission error:", error);
      alert("Failed to save stock.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white border border-[#E2E4E9] rounded-[12px] p-[24px] flex flex-col gap-[32px]"
    >
      <div className="flex flex-col gap-[4px]">
        <h2 className="text-[16px] font-bold text-[#1D1D1D] uppercase tracking-[0.9px]">
          Receive New Stock
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-[24px]">
        <div className="flex flex-col gap-[8px]">
          <label className="text-[13px] font-medium text-[#1D1D1D] tracking-[0.5px]">
            Supplier
          </label>
          <div className="relative w-full">
            <select
              {...register("supplierId")}
              className="w-full h-[44px] bg-[#FAFAFB] border border-[#E2E4E9] rounded-[8px] px-3 text-[13px] text-[#71717A] appearance-none outline-none  transition-colors cursor-pointer"
            >
              <option value="">Select supplier</option>
              <option value="s1">Dulux Paints Ltd</option>
              <option value="s2">Crown Supplies</option>
            </select>
            <ChevronDown
              size={16}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#71717A] pointer-events-none"
            />
          </div>
          {errors.supplierId && (
            <span className="text-red-500 text-[11px]">
              {errors.supplierId.message}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-[8px]">
          <label className="text-[13px] font-medium text-[#1D1D1D] tracking-[0.5px]">
            Supplier Invoice Ref
          </label>
          <input
            type="text"
            placeholder="INV-2024-001"
            {...register("invoiceRef")}
            className="w-full h-[44px] bg-[#FAFAFB] border border-[#E2E4E9] rounded-[8px] px-3 text-[13px] outline-none  transition-colors placeholder:text-[#A1A1AA]"
          />
          {errors.invoiceRef && (
            <span className="text-red-500 text-[11px]">
              {errors.invoiceRef.message}
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-[8px]">
        <label className="text-[13px] font-medium text-[#1D1D1D] tracking-[0.5px]">
          Add Products
        </label>
        <div className="flex items-end gap-[16px]">
          <div className="flex-1 relative">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A1A1AA]"
            />
            <input
              type="text"
              value={newItem.name}
              onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
              placeholder="Search product..."
              className="w-full h-[44px] bg-white border border-[#E2E4E9] rounded-[8px] pl-9 pr-3 text-[13px] outline-none transition-colors"
            />
          </div>

          <div className="w-[120px]">
            <input
              type="number"
              value={newItem.qty}
              onChange={(e) => setNewItem({ ...newItem, qty: e.target.value })}
              placeholder="Quantity"
              className="w-full h-[44px] bg-white border border-[#E2E4E9] rounded-[8px] px-3 text-[13px] outline-none transition-colors"
            />
          </div>

          <div className="w-[140px]">
            <input
              type="number"
              value={newItem.cost}
              onChange={(e) => setNewItem({ ...newItem, cost: e.target.value })}
              placeholder="Purchase cost"
              className="w-full h-[44px] bg-white border border-[#E2E4E9] rounded-[8px] px-3 text-[13px] outline-none transition-colors"
            />
          </div>

          <button
            type="button"
            onClick={handleAddItem}
            className="h-[44px] cursor-pointer px-6 bg-[#1A47FE] hover:bg-blue-700 text-white rounded-[8px] text-[13px] font-medium transition-colors flex items-center justify-center shrink-0"
          >
            <Plus size={16} className="mr-2" />
            Add Item
          </button>
        </div>
      </div>

      {items.length === 0 ? (
        <div className="w-full h-[200px] border-t border-[#E2E4E9]  flex flex-col items-center justify-center gap-[12px]">
          <div className="text-center">
            <p className="text-[13px] font-medium text-[#1D1D1D]">
              No items added yet
            </p>
            <p className="text-[12px] text-[#71717A]">
              Search and add products to receive stock
            </p>
          </div>
        </div>
      ) : (
        <div className="w-full overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#E1E4EA]">
                {["Product", "Qty", "Cost", "Total", "Action"].map((head) => (
                  <th
                    key={head}
                    className="py-4 text-xs font-medium text-[#71717A] tracking-wider uppercase"
                  >
                    {head}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E4E9]">
              {items.map((item) => (
                <tr
                  key={item.id}
                  className="group hover:bg-[#FAFAFB] transition-colors"
                >
                  <td className="py-4 pr-4 text-[13px] font-medium text-[#1D1D1D] tracking-normal">
                    {item.productName}
                  </td>
                  <td className="py-4 pr-4 text-[13px] font-medium text-[#1D1D1D] tracking-normal">
                    {item.quantity}
                  </td>
                  <td className="py-4 pr-4 text-[13px] font-medium text-[#1D1D1D] tracking-normal">
                    ₦{item.cost.toLocaleString()}
                  </td>
                  <td className="py-4 pr-4 text-[13px] font-medium text-[#1D1D1D] tracking-normal">
                    ₦{(item.quantity * item.cost).toLocaleString()}
                  </td>
                  <td className="px-4 py-3">
                    <button
                      type="button"
                      onClick={() => handleRemoveItem(item.id)}
                      className="text-red-500 cursor-pointer hover:text-red-700"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="flex justify-end gap-[12px] mt-4 pt-4 border-t border-[#F4F4F5]">
        <button
          type="button"
          className="h-[40px] px-6 cursor-pointer bg-white border border-[#E2E4E9] rounded-[8px] text-[13px] font-medium text-[#1D1D1D] hover:bg-gray-50 transition-colors"
        >
          Save Draft
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="h-[40px] px-6 cursor-pointer bg-[#2474F5] text-white rounded-[8px] text-[13px] font-medium transition-colors flex items-center gap-2 disabled:opacity-50"
        >
          {isSubmitting ? <Loader2 className="animate-spin" size={16} /> : null}
          Complete Delivery
        </button>
      </div>
    </form>
  );
};

export default ReceiveStock;
