import { useState, useMemo } from "react";
import { Search, User, Scan, X } from "lucide-react";
import { useProducts } from "../../hooks/useProducts";
import { useCustomers } from "../../hooks/useCustomers";
import { useSale } from "../../contexts/SaleContext";
import type { Products as Product } from "../../types/Products";
import type { Customer } from "../../types/Customers";

const NewSale = () => {
  const { addToCart, setCustomer, selectedCustomer } = useSale();
  const { allProducts } = useProducts();
  const { allCustomers } = useCustomers();

  const [productSearch, setProductSearch] = useState("");
  const [customerSearch, setCustomerSearch] = useState("");
  const [showCustomerResults, setShowCustomerResults] = useState(false);

  // --- Filtering Logic ---
  const products = useMemo(
    () => allProducts?.data?.data?.data || [],
    [allProducts],
  );
  const customers = useMemo(
    () => allCustomers?.data?.data?.data || [],
    [allCustomers],
  );

  const filteredProducts = useMemo(() => {
    if (!productSearch) return products?.slice(0, 4); // Show some defaults
    const search = productSearch.toLowerCase();
    return products.filter(
      (p: Product) =>
        p.name.toLowerCase().includes(search) ||
        p.SKU.toLowerCase().includes(search),
    );
  }, [products, productSearch]);

  const filteredCustomers = useMemo(() => {
    if (!customerSearch) return [];
    const search = customerSearch.toLowerCase();
    return customers.filter(
      (c: Customer) =>
        c.fullname.toLowerCase().includes(search) || c.phone.includes(search),
    );
  }, [customers, customerSearch]);

  return (
    <div className="p-[20px] h-full flex flex-col space-y-[24px] overflow-y-auto pb-10 border-r border-[#E4E4E7]">
      {/* Header */}
      <div className="flex justify-between items-center bg-white p-[16px] rounded-[8px] border border-[#E4E4E7]">
        <div className="flex flex-col gap-[4px]">
          <h1 className="text-[16px] font-medium text-black tracking-[-0.1px] leading-[16.2px]">
            New Sale
          </h1>
          <p className="text-[#71717A] text-left font-medium text-[12px] tracking-[0.9px] leading-[16.2px] uppercase">
            Invoice #JCC-
            {new Date().toISOString().slice(0, 10).replace(/-/g, "")}
          </p>
        </div>
        <span className="bg-[#FAFAFB] text-[#71717A] text-[10px] font-bold px-2 py-1 rounded border border-[#E4E4E7]">
          New Sale
        </span>
      </div>

      {/* Customer Selection */}
      <div className="flex flex-col space-y-[24px] bg-white p-[24px] rounded-[8px] border border-[#E4E4E7]">
        <div className="flex justify-between items-center">
          <div className="flex gap-[8px] items-center">
            <User className="text-[#1D1D1D]" size={20} />
            <h2 className="text-[18px] font-medium text-[#71717A] tracking-[-0.1px]">
              Customer Information
            </h2>
          </div>
          {selectedCustomer && (
            <button
              onClick={() => setCustomer(null)}
              className="text-[#EF4444] text-[12px] font-medium flex items-center gap-1"
            >
              <X size={14} /> Clear
            </button>
          )}
        </div>

        {selectedCustomer ? (
          <div className="p-4 bg-[#FAFAFB] rounded-lg border border-[#E4E4E7] flex justify-between items-center">
            <div>
              <p className="text-[14px] font-bold text-[#1D1D1D] uppercase">
                {selectedCustomer.fullname}
              </p>
              <p className="text-[12px] text-[#71717A]">
                {selectedCustomer.phone}
              </p>
            </div>
            <span className="text-[10px] font-bold bg-blue-50 text-blue-600 px-2 py-1 rounded uppercase">
              {selectedCustomer.customerType}
            </span>
          </div>
        ) : (
          <div className="relative">
            <label className="text-black text-[12px] font-semibold tracking-[-0.1px] block mb-2">
              Find Existing Customer
            </label>
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A1A1AA]"
                size={16}
              />
              <input
                type="text"
                placeholder="Search by name or phone..."
                value={customerSearch}
                onFocus={() => setShowCustomerResults(true)}
                onChange={(e) => setCustomerSearch(e.target.value)}
                className="w-full outline-none pl-10 text-[13px] h-[40px] rounded-[8px] border border-[#E4E4E7] focus:border-[#1A47FE] transition-colors"
              />
            </div>

            {showCustomerResults && filteredCustomers.length > 0 && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-[#E4E4E7] rounded-lg shadow-lg max-h-[200px] overflow-y-auto">
                {filteredCustomers.map((c: Customer) => (
                  <div
                    key={c._id}
                    onClick={() => {
                      setCustomer(c);
                      setCustomerSearch("");
                      setShowCustomerResults(false);
                    }}
                    className="p-3 hover:bg-gray-50 cursor-pointer border-b last:border-0"
                  >
                    <p className="text-[13px] font-bold text-[#1D1D1D]">
                      {c.fullname}
                    </p>
                    <p className="text-[11px] text-[#71717A]">{c.phone}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Product Search */}
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
                value={productSearch}
                onChange={(e) => setProductSearch(e.target.value)}
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

      {/* Product Results */}
      <div className="flex flex-col gap-[12px]">
        {filteredProducts.map((item: Product) => (
          <div
            key={item._id}
            onClick={() => addToCart(item)}
            className="w-full p-[16px] bg-white border border-[#E4E4E7] rounded-[8px] flex items-start justify-between hover:border-[#1A47FE] cursor-pointer transition-colors group"
          >
            <div className="flex flex-col gap-[4px]">
              <h3 className="text-[13px] font-bold text-[#1D1D1D] uppercase tracking-[-0.1px]">
                {item.name}
              </h3>
              <p className="text-[#71717A] text-[11px] tracking-[0.5px]">
                {item.SKU}
              </p>
              <p className="text-[#22C55E] text-[13px] font-bold tracking-[-0.1px] pt-1">
                ₦{item.sellingPrice.toLocaleString()}
              </p>
            </div>

            <div className="flex flex-col items-end gap-1">
              <span className="text-[10px] uppercase font-bold text-[#71717A]">
                Stock
              </span>
              <span
                className={`text-[13px] font-bold ${
                  item.currentStock > 0 ? "text-[#22C55E]" : "text-red-500"
                }`}
              >
                {item.currentStock}
              </span>
            </div>
          </div>
        ))}
        {filteredProducts.length === 0 && (
          <p className="text-center text-[12px] text-[#71717A] py-4">
            No products found matching "{productSearch}"
          </p>
        )}
      </div>
    </div>
  );
};

export default NewSale;
