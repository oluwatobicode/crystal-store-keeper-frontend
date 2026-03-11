import {
  Search,
  Calendar,
  CreditCard,
  User,
  Eye,
  CircleCheckBig,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { useState, useMemo } from "react";
import { useSales } from "../../hooks/useSales";
import type { Sale } from "../../types/SalesRecord";
import SaleDetailsModal from "../../ui/SaleDetailsModal";
import { format } from "date-fns";

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
  }).format(amount);
};

const AllPayments = () => {
  const { allSales } = useSales();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSaleId, setSelectedSaleId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const sales = allSales.data?.data || [];
  const isLoading = allSales.isLoading;

  const filteredSales = useMemo(() => {
    if (!searchQuery.trim()) return sales;
    const term = searchQuery.toLowerCase();
    return sales.filter(
      (sale) =>
        sale.invoiceId.toLowerCase().includes(term) ||
        sale._id.toLowerCase().includes(term) ||
        sale.customerSnapshot.name.toLowerCase().includes(term) ||
        (sale.customerSnapshot.phone &&
          sale.customerSnapshot.phone.includes(term)),
    );
  }, [sales, searchQuery]);

  const handleViewDetails = (id: string) => {
    setSelectedSaleId(id);
    setIsModalOpen(true);
  };

  return (
    <div className="flex flex-col gap-[24px]">
      <div className="bg-white p-[20.5px] rounded-[12px] border border-[#E4E4E7]">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-400 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by Invoice ID, Transaction ID, or Customer"
            className="h-[43px] placeholder:text-[12px] bg-transparent w-full rounded-[11.31px] border border-[#E4E4E7] pl-10 pr-4 outline-none transition-colors focus:border-gray-400 text-[13px]"
          />
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-[12px] border border-[#E2E4E9]">
            <Loader2 className="animate-spin text-[#2474F5] mb-2" size={40} />
            <p className="text-[14px] text-[#71717A]">
              Fetching transactions...
            </p>
          </div>
        ) : filteredSales.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-[12px] border border-[#E2E4E9] text-center">
            <AlertCircle size={40} className="text-gray-300 mb-2" />
            <p className="text-[14px] text-[#71717A] font-medium">
              No transactions found
            </p>
            <p className="text-[12px] text-[#71717A]">
              Try adjusting your search criteria
            </p>
          </div>
        ) : (
          filteredSales.map((sale: Sale) => (
            <div
              key={sale._id}
              className="bg-white border border-[#E2E4E9] rounded-[12px] p-6 lg:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
            >
              <div className="flex flex-col gap-3 flex-1">
                <div className="flex items-center gap-4 flex-wrap">
                  <h3 className="text-black text-[18px]  tracking-tight">
                    {sale.invoiceId}
                  </h3>

                  <div
                    className={`flex items-center gap-1 border px-3 py-1 rounded-full text-[12px]  uppercase ${
                      sale.paymentStatus === "paid"
                        ? "bg-green-50 border-green-200 text-green-700"
                        : "bg-yellow-50 border-yellow-200 text-yellow-700"
                    }`}
                  >
                    <CircleCheckBig size={14} />
                    {sale.paymentStatus}
                  </div>
                </div>

                <h2 className="text-[#71717a] text-[16px] font-bold">
                  {sale.customerSnapshot.name}
                </h2>

                <div className="flex items-center gap-x-6 gap-y-2 flex-wrap mt-1">
                  <div className="flex items-center gap-2 text-[#71717A] text-[12px] font-medium">
                    <Calendar size={14} />
                    {format(new Date(sale.createdAt), "dd/MM/yyyy")}
                  </div>
                  <div className="flex items-center gap-2 text-[#71717A] text-[12px] font-medium uppercase">
                    <CreditCard size={14} />
                    {sale.payments
                      .map((p) => p.method.replace("_", " "))
                      .join(", ")}
                  </div>
                  <div className="flex items-center gap-2 text-[#71717A] text-[12px] font-medium">
                    <User size={14} />
                    {sale.salesPersonId.fullname}
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-end gap-4 w-full md:w-auto">
                <h2 className="text-[#000000] leading-none tracking-tight text-[22px]">
                  {formatCurrency(sale.grandTotal)}
                </h2>
                <button
                  onClick={() => handleViewDetails(sale._id)}
                  className="bg-[#F9FAFB] border border-[#E4E4E7] flex items-center justify-center gap-[10px] text-black px-4 py-2 rounded-[8px] text-[12px] font-bold cursor-pointer hover:bg-gray-100 transition-colors w-full md:w-auto"
                >
                  <Eye size={18} />
                  View Details
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <SaleDetailsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        saleId={selectedSaleId}
      />
    </div>
  );
};

export default AllPayments;
