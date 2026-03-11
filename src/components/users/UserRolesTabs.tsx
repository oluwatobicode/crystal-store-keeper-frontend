import { useState } from "react";
import toast from "react-hot-toast";
import AllUsers from "./AllUsers";
import RolesPermission from "./RolesPermission";
import UserModal from "../../ui/UserModal";
import DeleteUserModal from "../../ui/DeleteUserModal";
import UserDetailsModal from "../../ui/UserDetailsModal";
import { useUsers } from "../../hooks/useUsers";
import type { UsersData } from "../../types/User";

const userSection = [
  { tab: "User Management" },
  { tab: "Roles & Permission" },
] as const;

type userTabType = (typeof userSection)[number]["tab"];

const UserRolesTabs = () => {
  const [currentTab, setCurrentTab] = useState<userTabType>("User Management");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // Delete modal state
  const [userToDelete, setUserToDelete] = useState<UsersData | null>(null);

  // View details modal state
  const [viewUser, setViewUser] = useState<UsersData | null>(null);

  const { deleteUser } = useUsers();

  const handleDeleteClick = (user: UsersData) => {
    setUserToDelete(user);
  };

  const handleConfirmDelete = async () => {
    if (!userToDelete) return;
    try {
      const response = await deleteUser.mutateAsync(userToDelete._id);
      toast.success(response?.message || "User deleted successfully");
      setUserToDelete(null);
    } catch {
      toast.error("Failed to delete user. Please try again.");
    }
  };

  const handleViewClick = (user: UsersData) => {
    setViewUser(user);
  };

  return (
    <div className="flex flex-col  gap-[24px]">
      <div className="w-full px-2 bg-[#EDEDE4]/20 bg-opacity-20 rounded-[12px] h-[41px] flex items-center gap-[25px]">
        {userSection.map((ele, index) => (
          <button
            onClick={() => setCurrentTab(ele.tab)}
            className={`flex-1 cursor-pointer transition-all duration-200 font-medium text-[12px] py-[4px] px-[3px] rounded-[8px] ${
              currentTab === ele.tab
                ? "bg-white text-[#1d1d1d]"
                : "text-[#71711a] hover:bg-white/50"
            }`}
            key={index}
          >
            {ele.tab}
          </button>
        ))}
      </div>

      {currentTab === "User Management" && (
        <AllUsers
          onAddUserClick={() => setIsModalOpen(true)}
          onDeleteClick={handleDeleteClick}
          onViewClick={handleViewClick}
        />
      )}
      {currentTab === "Roles & Permission" && <RolesPermission />}

      {isModalOpen && (
        <UserModal
          onClose={() => setIsModalOpen(false)}
          onSave={(data) => {
            console.log("Saved:", data);
          }}
        />
      )}

      <DeleteUserModal
        isOpen={!!userToDelete}
        onClose={() => setUserToDelete(null)}
        userName={userToDelete?.fullname || ""}
        isDeleting={deleteUser.isPending}
        onConfirm={handleConfirmDelete}
      />

      <UserDetailsModal
        isOpen={!!viewUser}
        onClose={() => setViewUser(null)}
        user={viewUser}
      />
    </div>
  );
};
export default UserRolesTabs;
