export interface Customer {
  _id: string;
  customerId: string;
  fullname: string;
  email: string;
  phone: string;
  address: string;
  customerType: string;
  creditLimit: number;
  currentBalance: number;
  totalSpent: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCustomerData {
  fullname: string;
  phone: string;
  email: string;
  address: string;
  customerType: string;
  creditLimit: number;
}
