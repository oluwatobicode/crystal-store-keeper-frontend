const topSellingProduct = [
  {
    productName: "Premium White Paint 5L",
    quantity: 25,
    sales: "₦145,200.50",
    transactions: 42,
    avgValue: "₦3,457.15",
  },
  {
    productName: "Dulux Matte Finish 10L",
    quantity: 18,
    sales: "₦98,450.00",
    transactions: 28,
    avgValue: "₦3,516.07",
  },
  {
    productName: "Berger Gloss Enamel",
    quantity: 35,
    sales: "₦112,300.75",
    transactions: 55,
    avgValue: "₦2,041.83",
  },
  {
    productName: "Wall Primer 4L",
    quantity: 48,
    sales: "₦56,890.20",
    transactions: 60,
    avgValue: "₦948.17",
  },
  {
    productName: "Sandpaper Pack (Fine)",
    quantity: 120,
    sales: "₦24,600.00",
    transactions: 85,
    avgValue: "₦289.41",
  },
];

const ProductAnalysis = () => {
  return (
    <div className="bg-white w-full flex flex-col items-start justify-center h-auto p-[24px]">
      <h2 className="uppercase font-medium text-[20px] mb-5 tracking-[0.9px] leading-[16.2px] text-[#71717A]">
        Top selling products
      </h2>

      <table className="w-full text-left">
        <thead className="border-b border-[#E1E4EA]">
          <tr>
            {["Product", "Quantity", "Sales", "Transactions", "Avg Value"].map(
              (head) => (
                <th
                  key={head}
                  className="p-4 text-xs font-medium text-[#6C7788] tracking-wider"
                >
                  {head}
                </th>
              )
            )}
          </tr>
        </thead>

        <tbody className="bg-white divide-y divide-[#DEDEDE]">
          {topSellingProduct.map((row, index) => (
            <tr key={index}>
              <td className="p-4 text-xs font-medium text-[#000000] tracking-wider">
                {row.productName}
              </td>
              <td className="p-4 text-xs font-medium text-[#000000] tracking-wider">
                {row.quantity}
              </td>
              <td className="p-4 text-xs font-medium text-[#069F3E] tracking-wider">
                {row.sales}
              </td>
              <td className="p-4 text-xs font-medium text-[#000000] tracking-wider">
                {row.transactions}
              </td>
              <td className="p-4 text-xs font-medium text-[#000000] tracking-wider">
                {row.avgValue}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductAnalysis;
