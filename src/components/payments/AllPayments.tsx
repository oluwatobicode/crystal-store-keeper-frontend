import {
  Search,
  Calendar,
  CreditCard,
  Link,
  User,
  CheckCircle2,
} from "lucide-react";

const paymentsHistory = [
  {
    invoiceNo: "INV-2024-001",
    company: "Smith Construction",
    date: "16/08/2024",
    method: "CARD",
    pos: "POS-001234",
    amount: "₦234.50",
    attendant: "Cashier User",
  },
  {
    invoiceNo: "INV-2024-002",
    company: "DIY Home Ltd",
    date: "16/08/2024",
    method: "CASH",
    pos: null,
    amount: "₦89.99",
    attendant: "Cashier User",
  },
  // --- New Data Entries ---
  {
    invoiceNo: "INV-2024-003",
    company: "Nexus Tech Solutions",
    date: "17/08/2024",
    method: "TRANSFER",
    pos: null,
    amount: "₦1,250.00",
    attendant: "Admin User",
  },
  {
    invoiceNo: "INV-2024-004",
    company: "Sarah Johnson",
    date: "17/08/2024",
    method: "CASH",
    pos: null,
    amount: "₦45.00",
    attendant: "Cashier User",
  },
  {
    invoiceNo: "INV-2024-005",
    company: "Premium Paint Supplies",
    date: "18/08/2024",
    method: "CARD",
    pos: "POS-005678",
    amount: "₦3,120.75",
    attendant: "Cashier User",
  },
  {
    invoiceNo: "INV-2024-006",
    company: "Build-It Better Co.",
    date: "19/08/2024",
    method: "CARD",
    pos: "POS-009012",
    amount: "₦15,400.00",
    attendant: "Admin User",
  },
  {
    invoiceNo: "INV-2024-007",
    company: "Urban Decor",
    date: "20/08/2024",
    method: "TRANSFER",
    pos: null,
    amount: "₦670.20",
    attendant: "Cashier User",
  },
];

const AllPayments = () => {
  return (
    <div className="flex flex-col gap-[24px]">
      <div className="bg-white p-[20.5px]">
        <div className="relative w-full max-w-[1014px]">
          <Search className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Search Payments & Transactions"
            className="h-[43px] placeholder:text-[12px] bg-transparent w-full rounded-[11.31px] border border-[#E4E4E7] pl-10 pr-4 outline-none transition-colors focus:border-gray-400"
          />
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {paymentsHistory.map((item, index) => (
          <div
            key={index}
            className="bg-white p-8 flex flex-row justify-between items-center"
          >
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-4">
                <h3 className="text-[#71717A] text-[18px] font-medium tracking-tight">
                  {item.invoiceNo}
                </h3>

                <div className="flex items-center gap-1 bg-[#C6F6D5] text-[#2F855A] px-3 py-1 rounded-full text-[12px] font-bold">
                  <CheckCircle2 size={14} />
                  Paid
                </div>
              </div>

              <h2 className="text-[#1D1D1D] text-[16px] font-semibold">
                {item.company}
              </h2>

              <div className="flex items-center gap-6 mt-1">
                <div className="flex items-center gap-2 text-[#71717A] text-[12px]">
                  <Calendar size={14} />
                  {item.date}
                </div>
                <div className="flex items-center gap-2 text-[#71717A] text-[12px] uppercase">
                  <CreditCard size={14} />
                  {item.method}
                </div>
                {item.pos && (
                  <div className="flex items-center gap-2 text-[#71717A] text-[12px]">
                    <Link size={14} />
                    {item.pos}
                  </div>
                )}
                <div className="flex items-center gap-2 text-[#71717A] text-[12px]">
                  <User size={14} />
                  {item.attendant}
                </div>
              </div>
            </div>

            <div className="flex flex-col items-end gap-4">
              <h2 className="text-[#71717A] leading-[16.2px] tracking-[0.9px] text-[18px] font-medium">
                {item.amount}
              </h2>
              <button className="bg-[#1A47FE] text-white px-8 py-2.5 rounded-[8px] text-[12px] font-medium cursor-pointer hover:bg-blue-700 transition-colors">
                View details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllPayments;
