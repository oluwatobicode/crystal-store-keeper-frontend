import { Loader2, MapPin, Phone, Search, Users } from "lucide-react";
import { useMemo, useState } from "react";
import { MdEmail } from "react-icons/md";
import { useCustomers } from "../../hooks/useCustomers";
import type { AllCustomersProps, Customer } from "../../types/Customers";
import { formatCurrency } from "../../utils/formatCurrency";
import { formatDate } from "../../utils/formatDate";

const AllCustomers = ({ onEditClick, onViewClick }: AllCustomersProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const { allCustomers } = useCustomers();
  const isLoading = allCustomers?.isLoading;
  const customersResponse = allCustomers?.data?.data;
  const { data: customers } = customersResponse || {};

  const filteredCustomers = useMemo(() => {
    if (!customers) return [];
    let results = customers;

    if (statusFilter !== "all") {
      results = results.filter(
        (e: Customer) =>
          e.customerType.toLowerCase() === statusFilter.toLowerCase(),
      );
    }

    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      results = results.filter(
        (c: Customer) =>
          c.fullname?.toLowerCase().includes(term) ||
          c.email?.toLowerCase().includes(term) ||
          c.phone?.toLowerCase().includes(term) ||
          c.address?.toLowerCase().includes(term) ||
          c.customerId?.toLowerCase().includes(term),
      );
    }

    return results;
  }, [customers, searchTerm, statusFilter]);

  return (
    <div className="flex flex-col gap-[13px] px-0 py-0">
      <div className="flex flex-row items-center justify-between">
        <div className="relative w-full max-w-[898px]">
          <Search className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Search by name, email, phone, or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="h-[43px] bg-white w-full rounded-[11.31px] border border-[#E4E4E7] pl-10 pr-4 outline-none transition-colors focus:border-gray-400"
          />
        </div>

        <div className="w-[170px] h-[43px] bg-white flex items-center justify-center rounded-[8px] text-[14px] text-[#71717A]">
          <select
            className="w-full h-[43px] bg-white rounded-[8px] border border-[#E4E4E7] px-4 pr-9 text-[14px] text-[#71717A] font-medium outline-none appearance-none cursor-pointer transition-colors focus:border-gray-400"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="individual">Individual</option>
            <option value="business">Business</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-[40px]">
        {isLoading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="animate-spin text-[#71717A]" size={32} />
          </div>
        ) : filteredCustomers.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 gap-3">
            <Users className="text-[#71717A]" size={36} />
            <p className="text-[14px] text-[#71717A] font-medium">
              {searchTerm.trim()
                ? "No matching customers"
                : "No customers found"}
            </p>
          </div>
        ) : (
          filteredCustomers.map((el: Customer) => (
            <div
              className="w-full h-auto p-[24px]  border border-[#E4E4E7] bg-white flex flex-col gap-4"
              key={el.customerId}
            >
              <h3 className="text-[#000000] text-[18px] font-medium tracking-tight">
                {el.fullname}
              </h3>

              <div className="flex flex-row items-end justify-between">
                <div className="flex flex-row items-end gap-[100px] flex-1">
                  <div className="flex flex-col gap-[8px] min-w-[300px]">
                    <div className="flex items-center gap-[10px]">
                      <MdEmail className="text-black" size={16} />
                      <p className="text-[13px] text-[#000000] font-medium">
                        {el.email || "N/A"}
                      </p>
                    </div>
                    <div className="flex items-center gap-[10px]">
                      <Phone className="text-black" size={14} />
                      <p className="text-[13px] text-[#000000] font-medium">
                        {el.phone || "N/A"}
                      </p>
                    </div>
                    <div className="flex items-center gap-[10px]">
                      <MapPin className="text-black" size={14} />
                      <p className="text-[13px] text-[#000000] font-medium">
                        {el.address || "N/A"}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-[16px]">
                    <div className="flex flex-col">
                      <h4 className="text-[#71717A] text-[15px] font-medium uppercase tracking-[0.9px] leading-[16.2px]">
                        Customer Id
                      </h4>
                      <p className="text-black font-medium text-[14px]">
                        {el.customerId}
                      </p>
                    </div>
                    <div className="flex flex-col">
                      <h4 className="text-[#71717A] text-[15px] font-medium uppercase tracking-[0.9px] leading-[16.2px]">
                        Total Spent
                      </h4>
                      <p className="text-[#098236] font-medium text-[14px] ">
                        {formatCurrency(el.totalSpent)}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-[16px]">
                    <div className="flex flex-col">
                      <h4 className="text-[#71717A] text-[15px] font-medium uppercase tracking-[0.9px] leading-[16.2px]">
                        Customer Type
                      </h4>
                      <p className="text-black font-medium text-[14px]">
                        {el.customerType}
                      </p>
                    </div>
                    <div className="flex flex-col">
                      <h4 className="text-[#71717A] text-[15px] font-medium uppercase tracking-[0.9px] leading-[16.2px]">
                        Created
                      </h4>
                      <p className="text-[#71717A] font-medium text-[14px]">
                        {formatDate(el.createdAt)}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-[12px] shrink-0 ml-10">
                  <button
                    onClick={() => onViewClick(el)}
                    className="bg-[#1A47FE] cursor-pointer text-white text-[12px] font-medium px-6 py-2 rounded-[8px]"
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => onEditClick(el)}
                    className="bg-[#F8F8F8] cursor-pointer text-[#71717A] text-[12px] font-medium px-6 py-2 rounded-[8px]"
                  >
                    Edit
                  </button>
                  <button className="bg-[#F8F8F8] cursor-pointer text-[#71717A] text-[12px] font-medium px-6 py-2 rounded-[8px]">
                    Create Sale
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AllCustomers;
