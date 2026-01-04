import { ArrowUp } from "lucide-react";

const mainStats = [
  {
    title: "TODAY'S SALES",
    value: "₦1,247.80",
    sub: "12 TRANSACTIONS",
    tag: "+8.2% vs yesterday",
  },
  {
    title: "Cash in Register",
    value: "₦345.20",
    sub: "Notes & coins",
  },
  {
    title: "Pending Payments",
    value: "₦89.50",
    sub: "2 transfers",
  },
  {
    title: "Low Stock Items",
    value: "3",
    sub: "Need reorder",
  },
];

const DashboardCards = () => {
  const formattedDate = new Intl.DateTimeFormat("en-GB", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date());

  return (
    <div className="w-full max-w-[1090.3px]">
      <div className="mx-auto flex max-w-screen-2xl flex-col gap-6 px-0 py-[10px]">
        <div className="flex flex-col gap-[12px]">
          <h1 className="text-[26px] font-bold leading-[21.6px] tracking-normal">
            Dashboard
          </h1>
          <p className="font-regular text-[14px] leading-[23.4px] tracking-normal text-[#71717A]">
            Here’s your Crystal Stock Keeper dashboard for {formattedDate}
          </p>
        </div>

        <div className="flex flex-col gap-[22.3px]">
          <div className="grid grid-cols-4 gap-[22.3px]">
            {mainStats.map((ele, index) => (
              <div
                className="flex w-full flex-col gap-[24px] rounded-xl border border-gray-100 bg-white px-8 py-[22px]"
                key={index}
              >
                <h2 className="text-[12px] font-medium leading-tight uppercase text-[#71717A]">
                  {ele.title}
                </h2>

                <div className="flex flex-col gap-[2px]">
                  <h2 className="mb-1 text-[18.9px] font-bold leading-[28.8px] tracking-normal text-[#1D1D1D]">
                    {ele.value}
                  </h2>
                  <p className="text-[10px] leading-[16.2px] uppercase tracking-[0.9px] text-[#71717A]">
                    {ele.sub}
                  </p>

                  {ele.tag && (
                    <p className="text-[11.7px] flex items-center gap-[3px] font-medium leading-[18.9px] uppercase tracking-[0.9px] text-[#22C55E]">
                      {ele.tag}
                      <ArrowUp size={11} />
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardCards;
