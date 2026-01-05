import { MapPin, Phone, Search } from "lucide-react";
import { MdEmail } from "react-icons/md";

const allCustomers = [
  {
    name: "Smith Construction Ltd",
    email: "orders@smithconstruction.co.uk",
    number: "01234 567890",
    location: "123 Builder Street, Construction City, CC1 2AB",
    customerId: "C001",
    lastPurchase: "15/01/2024",
    totalSpent: "₦5,420.50",
    transactions: "28",
  },
  {
    name: "Nexus Tech Solutions",
    email: "support@nexustech.ng",
    number: "0809 123 4567",
    location: "42 Silicon Avenue, Yaba, Lagos",
    customerId: "C002",
    lastPurchase: "02/02/2024",
    totalSpent: "₦250,000.00",
    transactions: "12",
  },
  {
    name: "Sarah Johnson",
    email: "sarah.johnson@gmail.com",
    number: "07123 456789",
    location: "12 Residential Road, Home Town, HT7 8GH",
    customerId: "C004",
    lastPurchase: "12/01/2024",
    totalSpent: "₦40,185.30",
    transactions: "6",
  },
];

const AllCustomers = () => {
  return (
    <div className="flex flex-col gap-[13px] px-0 py-0">
      <div className="flex flex-row items-center justify-between">
        <div className="relative w-full max-w-[898px]">
          <Search className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Type to search"
            className="h-[43px] bg-white w-full rounded-[11.31px] border border-[#E4E4E7] pl-10 pr-4 outline-none transition-colors focus:border-gray-400"
          />
        </div>

        <div className="w-[170px] h-[43px] bg-white flex items-center justify-center rounded-[8px] text-[14px] text-[#71717A]">
          <h2>All Customer Types</h2>
        </div>
      </div>

      <div className="flex flex-col gap-[40px]">
        {allCustomers.map((el) => (
          <div
            className="w-full h-auto p-[24px] bg-white flex flex-col gap-4"
            key={el.customerId}
          >
            <h3 className="text-[#71717A] text-[18px] font-medium tracking-tight">
              {el.name}
            </h3>

            <div className="flex flex-row items-end justify-between">
              <div className="flex flex-row items-end gap-[100px] flex-1">
                <div className="flex flex-col gap-[8px] min-w-[300px]">
                  <div className="flex items-center gap-[10px]">
                    <MdEmail className="text-black" size={16} />
                    <p className="text-[13px] text-[#71717A] font-medium">
                      {el.email}
                    </p>
                  </div>
                  <div className="flex items-center gap-[10px]">
                    <Phone className="text-black" size={14} />
                    <p className="text-[13px] text-[#71717A] font-medium">
                      {el.number}
                    </p>
                  </div>
                  <div className="flex items-center gap-[10px]">
                    <MapPin className="text-black" size={14} />
                    <p className="text-[13px] text-[#71717A] font-medium">
                      {el.location}
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
                      {el.totalSpent}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-[16px]">
                  <div className="flex flex-col">
                    <h4 className="text-[#71717A] text-[15px] font-medium uppercase tracking-[0.9px] leading-[16.2px]">
                      Last Purchase
                    </h4>
                    <p className="text-black font-medium text-[14px]">
                      {el.lastPurchase}
                    </p>
                  </div>
                  <div className="flex flex-col">
                    <h4 className="text-[#71717A] text-[15px] font-medium uppercase tracking-[0.9px] leading-[16.2px]">
                      Transactions
                    </h4>
                    <p className="text-[#71717A] font-medium text-[14px]">
                      {el.transactions}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-[12px] shrink-0 ml-10">
                <button className="bg-[#1A47FE] cursor-pointer text-white text-[12px] font-medium px-6 py-2 rounded-[8px]">
                  View Details
                </button>
                <button className="bg-[#F8F8F8] cursor-pointer text-[#71717A] text-[12px] font-medium px-6 py-2 rounded-[8px]">
                  Edit
                </button>
                <button className="bg-[#F8F8F8] cursor-pointer text-[#71717A] text-[12px] font-medium px-6 py-2 rounded-[8px]">
                  Create Sale
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllCustomers;
