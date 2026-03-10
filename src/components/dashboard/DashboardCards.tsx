import { useDashboard } from "../../hooks/useDashboard";
import { CardSkeleton } from "../../ui/CardSkeleton";
import { formatCurrency } from "../../utils/formatCurrency";

const DashboardCards = () => {
  const formattedDate = new Intl.DateTimeFormat("en-GB", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date());

  const {
    stats: { data, isLoading, error },
  } = useDashboard();

  const stats = data?.data?.data;

  const mainStats = [
    {
      title: "TODAY'S SALES",
      value: formatCurrency(stats?.todaySales ?? 0),
      sub: "Transactions",
    },
    {
      title: "Cash in Register",
      value: formatCurrency(stats?.cashInRegister ?? 0),
      sub: "Notes & coins",
    },
    {
      title: "Pending Payments",
      value: `${stats?.pendingPaymentsCount ?? 0}`,
      sub: "Awaiting payment",
    },
    {
      title: "Low Stock Items",
      value: `${stats?.lowStockCount ?? 0}`,
      sub: "Need reorder",
    },
  ];

  return (
    <div className="w-full max-w-[1090.3px]">
      <div className="mx-auto flex max-w-screen-2xl flex-col gap-6 px-0 py-[10px]">
        <div className="flex flex-col gap-[12px]">
          <h1 className="text-[26px] font-bold leading-[21.6px] tracking-normal">
            Dashboard
          </h1>
          <p className="font-regular text-[14px] leading-[23.4px] tracking-normal text-[#71717A]">
            Here's your Crystal Stock Keeper dashboard for {formattedDate}
          </p>
        </div>

        <div className="flex flex-col gap-[22.3px]">
          <div className="grid grid-cols-4 gap-[22.3px]">
            {isLoading ? (
              Array.from({ length: 4 }).map((_, i) => <CardSkeleton key={i} />)
            ) : error ? (
              <p className="col-span-4 text-center text-sm text-red-500">
                Failed to load dashboard stats
              </p>
            ) : (
              mainStats.map((ele, index) => (
                <div
                  className="flex w-full flex-col gap-[24px] rounded-xl border border-[#E2E4E9] bg-white px-8 py-[22px]"
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
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardCards;
