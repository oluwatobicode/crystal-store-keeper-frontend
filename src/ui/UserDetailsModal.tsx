import { X, Mail, Phone, User } from "lucide-react";
import type { UsersData } from "../types/User";
import { formatDate } from "../utils/formatDate";
import { formatUserId } from "../utils/formatUserId";
import { getStatusColor } from "../utils/getStatusColor";

interface UserDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UsersData | null;
}

const UserDetailsModal = ({ isOpen, onClose, user }: UserDetailsModalProps) => {
  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-[700px] max-h-[90vh] overflow-y-auto rounded-[12px] shadow-xl bg-[#FAFAFB] border border-gray-100 flex flex-col">
        <div className="p-[24px] flex justify-between items-start">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-3">
              <h1 className="text-[18px] font-bold uppercase tracking-[0.9px] text-[#1D1D1D]">
                {user.fullname}
              </h1>
              <span className="bg-[#1A47FE] text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                {user.role.roleName}
              </span>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${getStatusColor(user.status)} ${
                  user.status === "active" ? "bg-green-50" : "bg-red-50"
                }`}
              >
                {user.status}
              </span>
            </div>
            <p className="text-[13px] text-[#71717A] font-medium">
              User ID: {formatUserId(user._id)}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-[#71717A] cursor-pointer hover:text-black"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-[24px] flex flex-col gap-[24px] bg-[#FAFAFB]">
          <div className="grid grid-cols-2 gap-[24px]">
            <div className="bg-white p-[20px] rounded-[12px] border border-[#E4E4E7] flex flex-col gap-[16px]">
              <h3 className="text-[14px] font-bold text-[#1D1D1D]">
                Contact Information
              </h3>
              <div className="flex flex-col gap-[12px]">
                <div className="flex items-center gap-3 text-[#1D1D1D] text-[13px] font-medium">
                  <Mail size={16} className="text-[#71717A]" />
                  {user.email}
                </div>
                <div className="flex items-center gap-3 text-[#1D1D1D] text-[13px] font-medium">
                  <Phone size={16} className="text-[#71717A]" />
                  {user.contactNumber || "N/A"}
                </div>
                <div className="flex items-center gap-3 text-[#1D1D1D] text-[13px] font-medium">
                  <User size={16} className="text-[#71717A]" />@{user.username}
                </div>
              </div>
            </div>

            <div className="bg-white p-[20px] rounded-[12px] border border-[#E4E4E7] flex flex-col gap-[16px]">
              <h3 className="text-[14px] font-bold text-[#1D1D1D]">
                Account Information
              </h3>
              <div className="flex flex-col gap-[12px]">
                <div className="flex justify-between text-[13px]">
                  <span className="text-[#71717A] font-medium">Last Login</span>
                  <span className="text-[#1D1D1D] font-bold">
                    {user.lastLogin ? formatDate(user.lastLogin) : "never"}
                  </span>
                </div>
                <div className="flex justify-between text-[13px]">
                  <span className="text-[#71717A] font-medium">Created</span>
                  <span className="text-[#1D1D1D] font-bold">
                    {formatDate(user.createdAt)}
                  </span>
                </div>
                <div className="flex justify-between text-[13px]">
                  <span className="text-[#71717A] font-medium">Verified</span>
                  <span className="flex items-center gap-1">
                    <span className="text-[#1D1D1D] font-bold text-[13px]">
                      {user.isVerified ? "Yes" : "No"}
                    </span>
                  </span>
                </div>
                <div className="flex justify-between text-[13px]">
                  <span className="text-[#71717A] font-medium">
                    Must Change Password
                  </span>
                  <span className="text-[#1D1D1D] font-bold">
                    {user.mustChangePassword ? "Yes" : "No"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-[16px]">
            <div className="bg-white p-[16px] rounded-[12px] border border-[#E4E4E7] flex flex-col items-center justify-center gap-2">
              <span className="text-[11px] text-[#71717A] font-medium uppercase">
                Role
              </span>
              <span className="text-[14px] text-[#1D1D1D] font-bold">
                {user.role.roleName}
              </span>
            </div>
            <div className="bg-white p-[16px] rounded-[12px] border border-[#E4E4E7] flex flex-col items-center justify-center gap-2">
              <span className="text-[11px] text-[#71717A] font-medium uppercase">
                Last Login
              </span>
              <span className="text-[14px] text-[#1D1D1D] font-bold">
                {user.lastLogin ? formatDate(user.lastLogin) : "Never"}
              </span>
            </div>
            <div className="bg-white p-[16px] rounded-[12px] border border-[#E4E4E7] flex flex-col items-center justify-center gap-2">
              <span className="text-[11px] text-[#71717A] font-medium uppercase">
                Verification
              </span>
              <span className="text-[14px] text-[#1D1D1D] font-bold">
                {user.isVerified ? "Verified" : "Unverified"}
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-[12px]">
            <h3 className="text-[14px] font-bold text-[#1D1D1D]">
              Permissions
            </h3>
            <div className="bg-white rounded-[12px] border border-[#E4E4E7] p-[20px]">
              <p className="text-[12px] text-[#71717A] font-medium mb-3">
                {user.role.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {user.role.permissions.map((perm) => (
                  <span
                    key={perm}
                    className="bg-[#F4F4F5] text-[#1D1D1D] text-[11px] font-medium px-2.5 py-1 rounded-[6px]"
                  >
                    {perm}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetailsModal;
