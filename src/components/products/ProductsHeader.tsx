import React from "react";

const ProductsHeader: React.FC = () => {
  return (
    <div className="flex flex-col gap-[12px]">
      <h1 className="text-[26px] font-bold leading-[31.2px] tracking-normal">
        Products & Inventory
      </h1>
      <p className="font-normal text-[14px] leading-[23.4px] tracking-normal text-[#71717A]">
        Browse and manage your product listings and inventory levels
      </p>
    </div>
  );
};

export default ProductsHeader;
