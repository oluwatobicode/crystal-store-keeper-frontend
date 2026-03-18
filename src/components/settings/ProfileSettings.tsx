import { useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { User, Camera, Loader2, Lock } from "lucide-react";
import toast from "react-hot-toast";
import { useProfile } from "../../hooks/useProfile";
import { getInitials } from "../../utils/getInitials";
import { PasswordSchema, type PasswordFormData } from "../../types/Profile";
import { InfoRow } from "../../ui/InfoRow";
import { PasswordInput } from "../../ui/PasswordInput";

const ProfileSettings = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { getProfile, updateAvatar, updatePassword } = useProfile();
  const profile = getProfile.data?.data?.data;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<PasswordFormData>({
    resolver: zodResolver(PasswordSchema),
  });

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("avatar", file);

    try {
      await updateAvatar.mutateAsync(formData);
      toast.success("Profile picture updated!");
    } catch {
      toast.error("Failed to update profile picture");
    } finally {
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const onPasswordSubmit = async (data: PasswordFormData) => {
    try {
      await updatePassword.mutateAsync({
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      });
      toast.success("Password changed successfully");
      reset();
    } catch {
      toast.error("Failed to change password. Check your current password.");
    }
  };

  if (getProfile.isLoading) {
    return (
      <div className="flex items-center justify-center py-16">
        <Loader2 className="animate-spin text-[#71717A]" size={30} />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-[24px]">
      <div className="flex flex-col gap-[24px] bg-white w-full px-[24px] py-[24px] border border-[#E2E4E9] rounded-[12px]">
        <div className="flex flex-col gap-[8px]">
          <h1 className="font-medium flex items-center gap-2 uppercase text-black text-[15px] tracking-[0.9px] leading-tight">
            <User size={19} />
            Profile Information
          </h1>
          <p className="font-medium text-[#71717A] tracking-[0.9px] leading-tight text-[12px]">
            Your account details and profile picture
          </p>
        </div>

        <div className="flex  items-start gap-8">
          <div className="flex flex-col items-center gap-3 shrink-0">
            <div className="relative group">
              <div className="w-[96px] h-[96px] rounded-full overflow-hidden border-4 border-[#E4E4E7] group-hover:border-[#1A47FE] transition-colors">
                {profile?.avatarUrl ? (
                  <img
                    src={profile.avatarUrl}
                    alt={profile.fullName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-[#1A47FE] flex items-center justify-center text-white text-[28px] font-bold select-none">
                    {profile?.fullName ? (
                      getInitials(profile.fullName)
                    ) : (
                      <User size={36} />
                    )}
                  </div>
                )}
              </div>

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={updateAvatar.isPending}
                className="absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer disabled:cursor-not-allowed"
              >
                {updateAvatar.isPending ? (
                  <Loader2 size={20} className="text-white animate-spin" />
                ) : (
                  <Camera size={20} className="text-white" />
                )}
              </button>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarChange}
              />
            </div>

            <p className="text-[11px] text-[#71717A] font-medium text-center max-w-[100px] leading-snug">
              Hover & click to change photo
            </p>
          </div>

          <div className="flex-1 w-full grid grid-cols-2 gap-x-6 gap-y-4 min-w-0">
            <InfoRow label="Full Name" value={profile?.fullName} />
            <InfoRow label="Contact Number" value={profile?.contactNumber} />
            <InfoRow label="Role" value={profile?.role?.roleName} />
            <InfoRow
              label="Status"
              value={
                profile?.status
                  ? profile.status.charAt(0).toUpperCase() +
                    profile.status.slice(1)
                  : undefined
              }
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-[24px] bg-white w-full px-[24px] py-[24px] border border-[#E2E4E9] rounded-[12px]">
        <div className="flex flex-col gap-[8px]">
          <h1 className="font-medium flex items-center gap-2 uppercase text-black text-[15px] tracking-[0.9px] leading-tight">
            <Lock size={19} />
            Change Password
          </h1>
          <p className="font-medium text-[#71717A] tracking-[0.9px] leading-tight text-[12px]">
            Keep your account safe with a strong password
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onPasswordSubmit)}
          className="flex flex-col gap-[16px]"
        >
          <PasswordInput
            label="Current Password"
            error={errors.currentPassword?.message}
            {...register("currentPassword")}
          />

          <div className="flex gap-[19px]">
            <div className="flex-1">
              <PasswordInput
                label="New Password"
                error={errors.newPassword?.message}
                {...register("newPassword")}
              />
            </div>
            <div className="flex-1 hidden"></div>
          </div>

          <div className="pt-[6px] flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-[#1A47FE] text-white w-full max-w-[200px] h-[40px] rounded-[8px] font-medium text-[14px] tracking-[0.9px] hover:bg-blue-700 cursor-pointer transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin" size={16} />
                  Saving...
                </>
              ) : (
                "Change Password"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileSettings;
