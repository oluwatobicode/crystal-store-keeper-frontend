interface paymentMethodsFlow {
  method: string;
  transactions: number;
  amount: string;
  percentage: string;
}

const paymentMethods: paymentMethodsFlow[] = [
  {
    method: "Cash",
    transactions: 28,
    amount: "£2,456.80",
    percentage: "42.1% of total",
  },
  {
    method: "Card",
    transactions: 35,
    amount: "£2,890.45",
    percentage: "49.5% of total",
  },
  {
    method: "Transfer",
    transactions: 4,
    amount: "£489.30",
    percentage: "8.4% of total",
  },
];

const PaymentMethods = () => {
  const totalAmount = "£5,836.55";

  return (
    <div className="w-full bg-white p-[24px] h-auto">
      <h2 className="uppercase font-medium text-[20px] mb-8 tracking-[0.9px] leading-[16.2px] text-[#71717A]">
        Payment Method Analysis
      </h2>

      <div className="flex flex-col gap-[32px] items-start justify-center w-full">
        {paymentMethods.map((item, index) => (
          <div key={index} className="w-full flex items-start justify-between">
            <div className="flex items-start gap-4">
              <div className="w-4 h-4 rounded-full bg-[#E4E4E7] mt-1 shrink-0"></div>

              <div className="flex flex-col gap-1">
                <h3 className="text-[#1D1D1D] text-[14px] font-medium tracking-[0.9px] leading-[16.2px]">
                  {item.method}
                </h3>
                <p className="text-[#71717A] text-[12px] font-medium tracking-[0.9px] leading-[16.2px]">
                  {item.transactions} transactions
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-1 items-end">
              <h3 className="text-[#1D1D1D] text-[16px] font-medium tracking-[0.9px] leading-[16.2px]">
                {item.amount}
              </h3>
              <p className="text-[#71717A] text-[12px] font-medium tracking-[0.9px] leading-[16.2px]">
                {item.percentage}
              </p>
            </div>
          </div>
        ))}

        <div className="w-full border-t border-t-[#DEDEDE] pt-6 mt-2 flex items-center justify-between">
          <h3 className="text-[#71717A] text-[14px] font-medium tracking-wide">
            Total Payments
          </h3>
          <h2 className="text-[#71717A] text-[24px] font-medium tracking-tight">
            {totalAmount}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethods;
