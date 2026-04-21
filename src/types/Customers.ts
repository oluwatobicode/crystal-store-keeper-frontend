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

export interface CreditSale {
  invoiceId: string;
  grandTotal: number;
  balanceDue: number;
  paymentStatus: "paid" | "partial" | "pending";
  creditDueDate: string;
  createdAt: string;
}

export interface Repayment {
  amount: number;
  paymentMethod: "cash" | "bank_transfer";
  note?: string;
  reference?: string;
  createdAt: string;
}

export interface Transaction {
  invoiceId: string;
  grandTotal: number;
  amountPaid: number;
  balanceDue: number;
  paymentStatus: "paid" | "partial" | "pending";
  date: string;
}

export interface CustomerDetailResponse {
  customer: Customer;
  recentTransactions: Transaction[];
}

export interface AllCustomersProps {
  onEditClick: (customer: Customer) => void;
  onViewClick: (customer: Customer) => void;
}
