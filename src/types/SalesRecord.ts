export interface SaleItem {
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface SaleRecord {
  invoiceId: string;
  paymentStatus: string;
  createdAt: string;
  grandTotal: number;
  customerSnapshot: {
    name: string;
    phone: string;
  };
}

export interface PaymentMethod {
  method: "cash" | "pos" | "bank_transfer";
  amount: number;
  reference: string | null;
}

export interface Sale {
  _id: string;
  invoiceId: string;
  customerSnapshot: {
    name: string;
    phone: string;
  };
  salesPersonId: {
    _id: string;
    fullname: string;
  };
  customerId: {
    _id: string;
    fullname: string;
    email?: string;
    phone: string;
  } | null;
  items: SaleItem[];
  payments: PaymentMethod[];
  subTotal: number;
  discountAmount: number;
  vatRate: number;
  vatAmount: number;
  grandTotal: number;
  amountPaid: number;
  paymentStatus: "paid" | "partially_paid" | "unpaid";
  notes: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface SalesResponse {
  success: boolean;
  message: string;
  data: Sale[];
}

export interface SaleDetailResponse {
  success: boolean;
  message: string;
  data: Sale;
}
