export interface Notification {
  _id: string;
  businessId: string;
  referenceId: string;
  userId: string;
  title: string;
  message: string;
  type: string;
  isDeleted: boolean;
  isRead: boolean;
  createdAt?: string;
  __v?: number;
}

export interface NotificationCountResponse {
  success: boolean;
  message: string;
  data: {
    count: number;
  };
}

export interface NotificationsResponse {
  success: boolean;
  message: string;
  data: Notification[];
}
