import { useEffect, useRef } from "react";
import type { ReactNode } from "react";
import { X, Bell, CheckCheck, Trash2, AlertTriangle } from "lucide-react";
import { useNotifications } from "../hooks/useNotification";
import { type Notification } from "../types/Notification";

interface NotificationDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

const typeStyles: Record<string, { bg: string; icon: ReactNode }> = {
  warning: {
    bg: "bg-amber-50",
    icon: <AlertTriangle size={16} className="text-amber-500" />,
  },
  info: {
    bg: "bg-blue-50",
    icon: <Bell size={16} className="text-blue-500" />,
  },
  error: {
    bg: "bg-red-50",
    icon: <AlertTriangle size={16} className="text-red-500" />,
  },
};

const getTypeStyle = (type: string) => typeStyles[type] ?? typeStyles["info"];

const NotificationDropdown = ({
  isOpen,
  onClose,
}: NotificationDropdownProps) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  const {
    getNotifications,
    markAllNotificationsRead,
    markNotificationRead,
    deleteNotifications,
  } = useNotifications();

  const notifications: Notification[] = getNotifications.data?.data?.data ?? [];

  const hasUnread = notifications.some((n) => !n.isRead);

  // Close on outside click
  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={dropdownRef}
      className="absolute right-0 top-[calc(100%+12px)] z-50 w-[380px] rounded-[14px] bg-white shadow-2xl border border-[#E4E4E7] flex flex-col overflow-hidden"
      style={{ maxHeight: "480px" }}
    >
      <div className="flex items-center justify-between px-5 py-4 border-b border-[#E4E4E7] shrink-0">
        <div className="flex items-center gap-2">
          <Bell size={18} className="text-[#1D1D1D]" />
          <h2 className="text-[15px] font-semibold text-[#1D1D1D]">
            Notifications
          </h2>
          {hasUnread && (
            <span className="text-[11px] font-semibold bg-[#14532D] text-white rounded-full px-2 py-0.5">
              {notifications.filter((n) => !n.isRead).length} new
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {hasUnread && (
            <button
              onClick={() => markAllNotificationsRead.mutate()}
              disabled={markAllNotificationsRead.isPending}
              title="Mark all as read"
              className="text-[12px] font-medium text-[#14532D] flex items-center gap-1 hover:opacity-70 transition-opacity disabled:opacity-40 cursor-pointer"
            >
              <CheckCheck size={14} />
              Mark all read
            </button>
          )}
          <button
            onClick={onClose}
            className="text-[#71717A] hover:text-black transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="overflow-y-auto flex-1">
        {getNotifications.isLoading ? (
          <div className="flex flex-col gap-3 p-5">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-[70px] rounded-[10px] bg-gray-100 animate-pulse"
              />
            ))}
          </div>
        ) : notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 gap-3 text-[#71717A]">
            <Bell size={32} className="opacity-30" />
            <p className="text-[13px] font-medium">You're all caught up!</p>
          </div>
        ) : (
          <ul className="divide-y divide-[#F4F4F5]">
            {notifications.map((notification) => {
              const style = getTypeStyle(notification.type);
              return (
                <li
                  key={notification._id}
                  className={`flex items-start gap-3 px-5 py-4 transition-colors hover:bg-gray-50 ${
                    !notification.isRead ? "bg-[#F0FDF4]" : ""
                  }`}
                >
                  {/* Icon */}
                  <div
                    className={`mt-0.5 shrink-0 w-8 h-8 rounded-full ${style.bg} flex items-center justify-center`}
                  >
                    {style.icon}
                  </div>

                  {/* Content */}
                  <div
                    className="flex-1 min-w-0 cursor-pointer"
                    onClick={() => {
                      if (!notification.isRead) {
                        markNotificationRead.mutate(notification._id);
                      }
                    }}
                  >
                    <p className="text-[13px] font-semibold text-[#1D1D1D] leading-snug">
                      {notification.title}
                    </p>
                    <p className="text-[12px] text-[#71717A] mt-0.5 leading-relaxed line-clamp-2">
                      {notification.message}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col items-end gap-2 shrink-0">
                    {!notification.isRead && (
                      <span className="w-2 h-2 rounded-full bg-[#14532D] mt-1" />
                    )}
                    <button
                      onClick={() =>
                        deleteNotifications.mutate(notification._id)
                      }
                      className="text-[#71717A] hover:text-red-500 transition-colors cursor-pointer"
                      title="Delete notification"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {/* Footer */}
      {notifications.length > 0 && (
        <div className="border-t border-[#E4E4E7] px-5 py-3 shrink-0">
          <p className="text-[11px] text-center text-[#71717A]">
            {notifications.length} notification
            {notifications.length !== 1 ? "s" : ""}
          </p>
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;
