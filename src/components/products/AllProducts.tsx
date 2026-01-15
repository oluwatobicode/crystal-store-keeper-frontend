// Data transcribed from your Figma screenshot
const productsData = [
  {
    id: 1,
    name: "PREMIUM WHITE PAINT 5L",
    status: "in stock",
    currentStock: 15,
    sku: "P001",
    brand: "Dulux",
    location: "A1-01",
    unit: "5L",
    reorderAt: 10,
    daysLeft: "~6",
    suggestedOrder: null,
  },
  {
    id: 2,
    name: "BLUE EMULSION 2.5L",
    status: "Critical",
    currentStock: 3,
    sku: "P002",
    brand: "Crown",
    location: "A1-02",
    unit: "2.5L",
    reorderAt: 8,
    daysLeft: "~3",
    suggestedOrder: 36,
  },
  {
    id: 3,
    name: "PAINT ROLLER SET",
    status: "in stock",
    currentStock: 25,
    sku: "P003",
    brand: "Harris",
    location: "B2-05",
    unit: "set",
    reorderAt: 15,
    daysLeft: "~8",
    suggestedOrder: null,
  },
  {
    id: 4,
    name: "PAINT THINNER 1L",
    status: "Critical",
    currentStock: 2,
    sku: "P004",
    brand: "Johnstone",
    location: "C1-03",
    unit: "1L",
    reorderAt: 8,
    daysLeft: "~3",
    suggestedOrder: 24,
  },
];

const AllProducts = () => {
  return (
    <div className="flex flex-col gap-[16px] w-full">
      {productsData.map((product) => (
        <div
          key={product.id}
          className="bg-white border border-[#E2E4E9] rounded-[12px] p-[24px] flex flex-col gap-[24px]"
        >
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-[12px]">
              <h2 className="text-[16px] font-medium text-[#1D1D1D] uppercase tracking-[0.5px]">
                {product.name}
              </h2>

              <span
                className={`px-[10px] py-[4px] rounded-full text-[11px] font-medium uppercase tracking-wide ${
                  product.status === "Critical"
                    ? "bg-[#FF3B30] text-white"
                    : "bg-[#1A47FE] text-white"
                }`}
              >
                {product.status}
              </span>
            </div>

            <div className="flex flex-col items-end">
              <span className="text-[24px] font-bold text-[#1D1D1D] leading-none">
                {product.currentStock}
              </span>
              <span className="text-[11px] font-medium text-[#71717A]">
                Current Stock
              </span>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-[20px] w-full max-w-[80%]">
            <div className="flex flex-col gap-[4px]">
              <span className="text-[11px] font-medium text-[#71717A] uppercase">
                SKU
              </span>
              <span className="text-[13px] font-medium text-[#1D1D1D]">
                {product.sku}
              </span>
            </div>
            <div className="flex flex-col gap-[4px]">
              <span className="text-[11px] font-medium text-[#71717A] uppercase">
                Brand
              </span>
              <span className="text-[13px] font-medium text-[#1D1D1D]">
                {product.brand}
              </span>
            </div>
            <div className="flex flex-col gap-[4px]">
              <span className="text-[11px] font-medium text-[#71717A] uppercase">
                Location
              </span>
              <span className="text-[13px] font-medium text-[#1D1D1D]">
                {product.location}
              </span>
            </div>
            <div className="flex flex-col gap-[4px]">
              <span className="text-[11px] font-medium text-[#71717A] uppercase">
                Unit
              </span>
              <span className="text-[13px] font-medium text-[#1D1D1D]">
                {product.unit}
              </span>
            </div>
          </div>

          <div className="flex justify-end mt-[-40px]">
            <div className="flex flex-col items-end gap-[4px]">
              <div className="flex flex-col items-end">
                <p className="text-[11px] text-[#71717A] font-medium">
                  Reorder at:{" "}
                  <span className="text-[#1D1D1D]">{product.reorderAt}</span>
                </p>
                <p className="text-[11px] text-[#71717A] font-bold">
                  Days left:{" "}
                  <span className="text-[#1D1D1D]">{product.daysLeft}</span>
                </p>
              </div>

              {product.suggestedOrder && (
                <p className="text-[11px] font-bold text-[#F59E0B] mt-1">
                  Sugg order: {product.suggestedOrder}
                </p>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllProducts;
