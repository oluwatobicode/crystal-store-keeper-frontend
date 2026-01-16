import UserRolesHeader from "../components/users/UserRolesHeader";
import UserRolesTabs from "../components/users/UserRolesTabs";

const UserRoles = () => {
  return (
    <div className="space-y-[24px] p-6">
      <UserRolesHeader />
      <UserRolesTabs />
    </div>
  );
};
export default UserRoles;
