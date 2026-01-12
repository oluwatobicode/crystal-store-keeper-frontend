const customerTotal = [
  {
    title: "Total Customers",
    value: 4,
  },
  {
    title: "Business Customers",
    value: 1,
  },
  {
    title: "Individual Customers",
    value: 3,
  },
  {
    title: "Total Revenue",
    value: "₦21,246.75",
  },
];

const CustomerAnalytics = () => {
  return (
    <div className="w-full max-w-[1090.5px]">
      <div className="mx-auto flex max-w-screen-2xl flex-col gap-6 px-0 py-0">
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-col gap-[12px]">
            <h1 className="text-[26px] font-bold leading-[21.6px] tracking-normal">
              Customer Management
            </h1>
            <p className="font-regular text-[14px] leading-[23.4px] tracking-normal text-[#71717A]">
              Manage customer relationships and accounts
            </p>
          </div>

          <button className="rounded-[8px] px-3 py-[12px] font-medium text-[12px] text-[#71717A]  leading-[16.2px] tracking-[0.9px] bg-white cursor-pointer">
            Add Customer
          </button>
        </div>

        <div className="flex flex-col gap-[22.3px]">
          <div className="grid grid-cols-4 gap-[22.3px]">
            {customerTotal.map((ele, index) => (
              <div
                key={index}
                className="flex flex-col  border border-[#E4E4E7] w-full gap-[12px] rounded-[9px] bg-white px-8 py-[22px]"
              >
                <p className="text-[12px] font-medium leading-[16.2px] tracking-[0.9px] uppercase text-[#71717A]">
                  {ele.title}
                </p>

                <h2 className="mb-1 text-[18.9px] font-bold leading-[28.8px] tracking-normal text-[#1D1D1D]">
                  {ele.value}
                </h2>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default CustomerAnalytics;
