export interface SaleRecord {
  invoiceId: string;
  paymentStatus: string;
  customerSnapshot?: { name: string };
  createdAt: string;
  grandTotal: number;
}
