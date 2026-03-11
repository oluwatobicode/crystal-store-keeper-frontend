import {
  ChevronDown,
  EyeIcon,
  Loader2,
  PlusIcon,
  Search,
  SquarePen,
  Trash2,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import toast from "react-hot-toast";
import { getStatusColor } from "../../utils/getStatusColor";
import { useUsers } from "../../hooks/useUsers";
import type { AllUsersProps, UsersData } from "../../types/User";
import { formatDate } from "../../utils/formatDate";
import { formatUserId } from "../../utils/formatUserId";

const AllUsers = ({
  onAddUserClick,
  onEditClick,
  onDeleteClick,
  onViewClick,
}: AllUsersProps) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const { allUsers } = useUsers();
  const isLoading = allUsers?.isLoading;
  const userResponse = allUsers?.data?.data;
  const { data: allUser } = userResponse || {};

  const hasToasted = useRef(false);
  useEffect(() => {
    if (userResponse?.message && !hasToasted.current) {
      toast.success(userResponse.message);
      hasToasted.current = true;
    }
  }, [userResponse]);

  const filteredRoles = useMemo(() => {
    if (!allUser) return [];
    let result = allUser;

    if (statusFilter !== "all") {
      result = result.filter(
        (e: UsersData) => e.status?.toLowerCase() === statusFilter,
      );
    }

    if (searchQuery.trim()) {
      const term = searchQuery.toLowerCase();
      result = result.filter(
        (e: UsersData) =>
          e.fullname?.toLowerCase().includes(term) ||
          e.email?.toLowerCase().includes(term) ||
          e.username?.toLowerCase().includes(term) ||
          e.role.roleName.toLowerCase().includes(term),
      );
    }

    return result;
  }, [searchQuery, statusFilter, allUser]);

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
        <button
          onClick={onAddUserClick}
          className="px-[16px] py-[9px] cursor-pointer bg-[#2474F5] hover:bg-blue-600 transition-colors text-white tracking-[0.9px] rounded-[8px] text-[14px] font-medium flex items-center gap-2"
        >
          <PlusIcon size={16} />
          Add User
        </button>
      </div>

      <div className="flex flex-row items-center gap-4">
        <div className="relative w-full max-w-[348px]">
          <Search className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-400 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Users"
            className="h-[43px] bg-white w-full rounded-[11.31px] border border-[#E4E4E7] pl-10 pr-4 outline-none transition-colors focus:border-gray-400 text-[14px]"
          />
        </div>

        <div className="relative w-[170px]">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full h-[43px] bg-white rounded-[8px] border border-[#E4E4E7] px-4 pr-9 text-[14px] text-[#71717A] font-medium outline-none appearance-none cursor-pointer transition-colors focus:border-gray-400"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="suspended">Suspended</option>
          </select>
          <ChevronDown
            size={16}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#71717A] pointer-events-none"
          />
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
          {isLoading ? (
            <tr>
              <td
                colSpan={7}
                className="p-8 text-center text-sm text-[#6C7788]"
              >
                <div className="flex items-center justify-center py-16">
                  <Loader2 className="animate-spin text-[#71717A]" size={35} />
                </div>
              </td>
            </tr>
          ) : !allUser?.length ? (
            <tr>
              <td
                colSpan={7}
                className="p-8 text-center text-sm text-[#6C7788]"
              >
                No users found
              </td>
            </tr>
          ) : (
            filteredRoles.map((user: UsersData) => (
              <tr key={user._id}>
                <td className="p-4 text-xs font-medium text-[#1D1D1D] tracking-wider">
                  {formatUserId(user._id)}
                </td>
                <td className="p-4 text-xs font-medium text-[#1D1D1D] tracking-wider">
                  {user.fullname}
                </td>
                <td className="p-4 text-xs font-medium text-[#1D1D1D] tracking-wider">
                  {user.username}
                </td>
                <td className="p-4 text-xs font-medium text-[#1D1D1D] tracking-wider">
                  {user.role?.roleName}
                </td>
                <td
                  className={`p-4 text-xs font-medium tracking-wider ${getStatusColor(
                    user.status,
                  )}`}
                >
                  {user.status.toUpperCase()}
                </td>
                <td className="p-4 text-xs font-medium text-[#1D1D1D] tracking-wider">
                  {user.lastLogin
                    ? formatDate(user.lastLogin)
                    : "never logged in"}
                </td>
                <td className="flex items-center justify-start p-4 text-xs font-medium text-[#6c7788] tracking-wider">
                  <div className="flex items-center gap-4">
                    <SquarePen
                      size={18}
                      className="cursor-pointer hover:text-blue-600 transition-colors"
                      onClick={() => onEditClick(user)}
                    />
                    <EyeIcon
                      size={18}
                      className="cursor-pointer hover:text-blue-600 transition-colors"
                      onClick={() => onViewClick(user)}
                    />
                    <Trash2
                      size={18}
                      className="cursor-pointer text-[#FE1A1A] hover:text-red-700 transition-colors"
                      onClick={() => onDeleteClick(user)}
                    />
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AllUsers;
