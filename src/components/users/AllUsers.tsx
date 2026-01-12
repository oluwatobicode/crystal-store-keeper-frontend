import { EyeIcon, PlusIcon, Search, SquarePen, Trash2 } from "lucide-react";

const allUsers = [
  {
    userId: "U-1023",
    fullName: "Sarah Jenkins",
    username: "s.jenkins",
    role: "Admin",
    status: "Active",
    lastLogin: "2024-01-15 08:30 AM",
  },
  {
    userId: "U-1024",
    fullName: "Michael Ojo",
    username: "m.ojo",
    role: "Manager",
    status: "Active",
    lastLogin: "2024-01-15 09:15 AM",
  },
  {
    userId: "U-1025",
    fullName: "David Chen",
    username: "d.chen88",
    role: "Accountant",
    status: "Active",
    lastLogin: "2024-01-14 04:45 PM",
  },
  {
    userId: "U-1026",
    fullName: "Jessica Brown",
    username: "j.brown",
    role: "Inventory Clerk",
    status: "Inactive",
    lastLogin: "2023-12-20 11:00 AM",
  },
  {
    userId: "U-1027",
    fullName: "Amanda Lewis",
    username: "a.lewis",
    role: "Inventory Clerk",
    status: "Active",
    lastLogin: "2024-01-15 07:55 AM",
  },
  {
    userId: "U-1028",
    fullName: "Robert Wilson",
    username: "r.wilson",
    role: "Manager",
    status: "Suspended",
    lastLogin: "2024-01-10 02:20 PM",
  },
];

const AllUsers = () => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "text-green-600";
      case "Inactive":
        return "text-gray-400";
      case "Suspended":
        return "text-red-500";
      default:
        return "text-[#6c7788]";
    }
  };

  return (
    <div className="flex flex-col w-full gap-[17px] px-[24px] h-auto py-[24px] bg-white">
      <div className="flex flex-row w-full justify-between items-center py-[16px]">
        <div className="flex flex-col gap-[8px]">
          <h1 className="font-medium uppercase text-black text-[20px] tracking-[0.9px] leading-tight">
            Users
          </h1>
          <p className="font-medium text-[#71717A] tracking-[0.9px] leading-tight text-[14px]">
            Manage user accounts and access
          </p>
        </div>
        <button className="px-[16px] py-[9px] cursor-pointer bg-[#2474F5] hover:bg-blue-600 transition-colors text-white tracking-[0.9px] rounded-[8px] text-[14px] font-medium flex items-center gap-2">
          <PlusIcon size={16} />
          Add User
        </button>
      </div>

      <div className="flex flex-row items-center gap-4">
        <div className="relative w-full max-w-[348px]">
          <Search className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Search Users"
            className="h-[43px] bg-white w-full rounded-[11.31px] border border-[#E4E4E7] pl-10 pr-4 outline-none transition-colors focus:border-gray-400 text-[14px]"
          />
        </div>

        <div className="w-[170px] h-[43px] bg-white flex items-center justify-center rounded-[8px] border border-[#E4E4E7] cursor-pointer hover:bg-gray-50 text-[14px] text-[#71717A] font-medium">
          <h2>All Status</h2>
        </div>
      </div>

      <table className="w-full text-left mt-4">
        <thead className="border-b border-[#E1E4EA]">
          <tr>
            {[
              "User ID",
              "Full Name",
              "Username",
              "Role",
              "Status",
              "Last Login",
              "Actions",
            ].map((head) => (
              <th
                key={head}
                className="p-4 text-xs font-medium text-[#6C7788] tracking-wider uppercase"
              >
                {head}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="bg-white divide-y divide-[#e1e4ea]">
          {allUsers.map((user) => (
            <tr key={user.userId}>
              <td className="p-4 text-xs font-medium text-[#1D1D1D]   tracking-wider">
                {user.userId}
              </td>
              <td className="p-4 text-xs font-medium text-[#1D1D1D] tracking-wider">
                {user.fullName}
              </td>
              <td className="p-4 text-xs font-medium text-[#1D1D1D]  tracking-wider">
                {user.username}
              </td>
              <td className="p-4 text-xs font-medium text-[#1D1D1D]  tracking-wider">
                {user.role}
              </td>
              <td
                className={`p-4 text-xs font-medium tracking-wider ${getStatusColor(
                  user.status
                )}`}
              >
                {user.status}
              </td>
              <td className="p-4 text-xs font-medium text-[#1D1D1D] tracking-wider">
                {user.lastLogin}
              </td>
              <td className="flex items-center justify-start p-4 text-xs font-medium text-[#6c7788] tracking-wider">
                <div className="flex items-center gap-4">
                  <SquarePen
                    size={18}
                    className="cursor-pointer hover:text-blue-600 transition-colors"
                  />
                  <EyeIcon
                    size={18}
                    className="cursor-pointer hover:text-blue-600 transition-colors"
                  />
                  <Trash2
                    size={18}
                    className="cursor-pointer text-[#FE1A1A] hover:text-red-700 transition-colors"
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllUsers;
