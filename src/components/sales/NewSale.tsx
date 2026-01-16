import { zodResolver } from "@hookform/resolvers/zod";
import { Scan, Search, User } from "lucide-react";
import { useForm, type SubmitHandler } from "react-hook-form";
import z from "zod";
import { type Product } from "../../Pages/Sales";

const newSaleSchema = z.object({
  customerName: z.string().min(1, "Customer name is required"),
  customerPhone: z.string().min(10, "Invalid phone number").optional(),
  customerAddress: z
    .string()
    .min(5, "Address must be at least 5 chars")
    .optional(),
});

type NewSaleFormData = z.infer<typeof newSaleSchema>;

const searchResults: Product[] = [
  {
    id: "P001",
    name: "PREMIUM WHITE PAINT 5L",
    sku: "P001 • 5L",
    price: 45.99,
    stock: 15,
  },
  {
    id: "P002",
    name: "BLUE EMULSION 2.5L",
    sku: "P002 • 2.5L",
    price: 20.99,
    stock: 22,
  },
];

interface NewSaleProps {
  onAddToCart: (product: Product) => void;
}

const NewSale = ({ onAddToCart }: NewSaleProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewSaleFormData>({
    resolver: zodResolver(newSaleSchema),
  });

  const onSubmit: SubmitHandler<NewSaleFormData> = (data) => {
    console.log(data);
  };

  return (
    <div className="p-[20px] h-full flex flex-col space-y-[24px] overflow-y-auto pb-10 border-r border-[#E4E4E7]">
      <div className="flex justify-between items-center bg-white p-[16px] rounded-[8px] border border-[#E4E4E7]">
        <div className="flex flex-col gap-[4px]">
          <h1 className="text-[16px] font-medium text-black tracking-[-0.1px] leading-[16.2px]">
            New Sale
          </h1>
          <p className="text-[#71717A] text-left font-medium text-[12px] tracking-[0.9px] leading-[16.2px] uppercase">
            Invoice #JCC-20250817-0001
          </p>
        </div>
        <span className="bg-[#FAFAFB] text-[#71717A] text-[10px] font-bold px-2 py-1 rounded border border-[#E4E4E7]">
          New Sale
        </span>
      </div>

      <div className="flex flex-col space-y-[24px] bg-white p-[24px] rounded-[8px] border border-[#E4E4E7]">
        <div className="flex gap-[8px] items-center">
          <User className="text-[#1D1D1D]" size={20} />
          <h2 className="text-[18px] font-medium text-[#71717A] tracking-[-0.1px]">
            Customer Information
          </h2>
        </div>

        <form
          className="flex flex-col gap-[16px]"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="w-full">
            <label className="text-black text-[12px] font-semibold tracking-[-0.1px] block">
              Customer Name *
            </label>

            <input
              type="text"
              placeholder="Enter customer name"
              className="w-full outline-none text-[13px] h-[40px] rounded-[8px] border border-[#E4E4E7] mt-[8px] px-[12px] placeholder:text-[#A1A1AA] focus:border-[#1A47FE] transition-colors"
              {...register("customerName")}
            />
            {errors.customerName && (
              <p className="text-red-500 text-[11px] mt-1">
                {errors.customerName.message}
              </p>
            )}
          </div>

          <div className="w-full">
            <label className="text-black text-[12px] font-semibold tracking-[-0.1px] block">
              Phone Number
            </label>
            <input
              type="text"
              placeholder="Optional phone number"
              className="w-full outline-none text-[13px] h-[40px] rounded-[8px] border border-[#E4E4E7] mt-[8px] px-[12px] placeholder:text-[#A1A1AA] focus:border-[#1A47FE] transition-colors"
              {...register("customerPhone")}
            />
            {errors.customerPhone && (
              <p className="text-red-500 text-[11px] mt-1">
                {errors.customerPhone.message}
              </p>
            )}
          </div>

          <div className="w-full">
            <label className="text-black text-[12px] font-semibold tracking-[-0.1px] block">
              Address
            </label>
            <input
              type="text"
              placeholder="Optional address"
              className="w-full outline-none text-[13px] h-[40px] rounded-[8px] border border-[#E4E4E7] mt-[8px] px-[12px] placeholder:text-[#A1A1AA] focus:border-[#1A47FE] transition-colors"
              {...register("customerAddress")}
            />
            {errors.customerAddress && (
              <p className="text-red-500 text-[11px] mt-1">
                {errors.customerAddress.message}
              </p>
            )}
          </div>
        </form>
      </div>

      <div className="flex flex-col space-y-[24px] bg-white p-[24px] rounded-[8px] border border-[#E4E4E7]">
        <div>
          <h2 className="text-[18px] font-medium text-[#71717A] tracking-[-0.1px]">
            Search for Products
          </h2>
        </div>

        <div className="flex flex-col gap-[16px]">
          <div>
            <label className="text-black text-[12px] font-semibold tracking-[-0.1px]">
              Search Products
            </label>
            <div className="mt-[8px] relative">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A1A1AA]"
                size={16}
              />
              <input
                type="text"
                className="w-full outline-none pl-10 text-[13px] h-[40px] rounded-[8px] border border-[#E4E4E7] focus:border-[#1A47FE] transition-colors"
                placeholder="Search products or SKU..."
              />
            </div>
          </div>

          <div>
            <label className="text-black text-[12px] font-semibold tracking-[-0.1px]">
              Barcode Scanner
            </label>
            <div className="mt-[8px] relative flex gap-[8px]">
              <div className="relative w-full">
                <Scan
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A1A1AA]"
                  size={16}
                />
                <input
                  type="text"
                  className="w-full outline-none pl-10 text-[13px] h-[40px] rounded-[8px] border border-[#E4E4E7] focus:border-[#1A47FE] transition-colors"
                  placeholder="Scan barcode..."
                />
              </div>
              <button className="bg-[#1A47FE] hover:bg-blue-700 text-white text-[12px] font-medium px-4 h-[40px] rounded-[8px] transition-colors">
                Add
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-[12px]">
        {searchResults.map((item) => (
          <div
            key={item.id}
            onClick={() => onAddToCart(item)}
            className="w-full p-[20px] bg-white border border-[#E4E4E7] rounded-[8px] flex items-start justify-between hover:border-[#1A47FE] cursor-pointer transition-colors group"
          >
            <div className="flex flex-col gap-[4px]">
              <h3 className="text-[13px] font-bold text-[#1D1D1D] uppercase tracking-[-0.1px]">
                {item.name}
              </h3>
              <p className="text-[#71717A] text-[11px] tracking-[0.5px]">
                {item.sku}
              </p>
              <p className="text-[#22C55E] text-[13px] font-bold tracking-[-0.1px] pt-1">
                ₦{item.price.toFixed(2)}
              </p>
            </div>

            <div className="flex flex-col items-end gap-1">
              <span className="text-[10px] uppercase font-bold text-[#71717A]">
                Stock
              </span>
              <span className="text-[13px] font-bold text-[#22C55E]">
                {item.stock}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewSale;
