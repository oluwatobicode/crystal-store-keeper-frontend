import {
  X,
  Calendar,
  User,
  Receipt,
  CreditCard,
  Hash,
  Info,
  Loader2,
  LayoutDashboard,
} from "lucide-react";
import { useSaleById } from "../hooks/useSales";
import { format } from "date-fns";
import { jsPDF } from "jspdf";

interface SaleDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  saleId: string | null;
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
  }).format(amount);
};

const SaleDetailsModal = ({
  isOpen,
  onClose,
  saleId,
}: SaleDetailsModalProps) => {
  // const { useSaleById } = useSaleById();
  const { data: saleData, isLoading } = useSaleById(saleId);
  const sale = saleData?.data;

  const handleDownloadReceipt = () => {
    if (!sale) return;

    const doc = new jsPDF({ unit: "mm", format: "a5" });
    const pageW = doc.internal.pageSize.getWidth();
    let y = 20;

    const center = (text: string, yPos: number, size = 10) => {
      doc.setFontSize(size);
      doc.text(text, pageW / 2, yPos, { align: "center" });
    };

    const line = () => {
      doc.setDrawColor(220, 220, 220);
      doc.line(15, y, pageW - 15, y);
      y += 5;
    };

    // Header
    doc.setFont("helvetica", "bold");
    center("CRYSTAL STORE KEEPER", y, 14);
    y += 7;
    doc.setFont("helvetica", "normal");
    center("Official Receipt", y, 10);
    y += 5;
    center(format(new Date(sale.createdAt), "dd MMM yyyy, HH:mm"), y, 9);
    y += 8;
    line();

    // Invoice & Customer
    doc.setFontSize(9);
    doc.setFont("helvetica", "bold");
    doc.text("Invoice ID:", 15, y);
    doc.setFont("helvetica", "normal");
    doc.text(sale.invoiceId, 60, y);
    y += 5;

    doc.setFont("helvetica", "bold");
    doc.text("Customer:", 15, y);
    doc.setFont("helvetica", "normal");
    doc.text(
      `${sale.customerSnapshot.name} | ${sale.customerSnapshot.phone}`,
      60,
      y,
    );
    y += 5;

    doc.setFont("helvetica", "bold");
    doc.text("Sales Person:", 15, y);
    doc.setFont("helvetica", "normal");
    doc.text(sale.salesPersonId.fullname, 60, y);
    y += 8;
    line();

    // Items header
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.text("Product", 15, y);
    doc.text("Qty", 100, y);
    doc.text("Unit Price", 115, y);
    doc.text("Total", 150, y);
    y += 4;
    line();

    // Items rows
    doc.setFont("helvetica", "normal");
    sale.items.forEach((item) => {
      doc.text(item.productName, 15, y);
      doc.text(String(item.quantity), 100, y);
      doc.text(formatCurrency(item.unitPrice), 115, y);
      doc.text(formatCurrency(item.total), 150, y);
      y += 6;
    });
    y += 2;
    line();

    // Summary
    doc.text(`Subtotal:`, 100, y);
    doc.text(formatCurrency(sale.subTotal), 150, y);
    y += 5;

    if (sale.discountAmount > 0) {
      doc.text("Discount:", 100, y);
      doc.text(`-${formatCurrency(sale.discountAmount)}`, 150, y);
      y += 5;
    }

    doc.text(`VAT (${(sale.vatRate * 100).toFixed(1)}%):`, 100, y);
    doc.text(formatCurrency(sale.vatAmount), 150, y);
    y += 5;

    doc.setFont("helvetica", "bold");
    doc.text("Grand Total:", 100, y);
    doc.text(formatCurrency(sale.grandTotal), 150, y);
    y += 5;

    doc.setFont("helvetica", "normal");
    doc.text("Amount Paid:", 100, y);
    doc.text(formatCurrency(sale.amountPaid), 150, y);
    y += 5;

    if (sale.amountPaid < sale.grandTotal) {
      doc.text("Balance Due:", 100, y);
      doc.text(formatCurrency(sale.grandTotal - sale.amountPaid), 150, y);
      y += 5;
    }

    y += 3;
    line();

    // Payment methods
    doc.setFont("helvetica", "bold");
    doc.text("Payment Methods:", 15, y);
    y += 5;
    doc.setFont("helvetica", "normal");
    sale.payments.forEach((p) => {
      doc.text(
        `${p.method.replace("_", " ").toUpperCase()} — ${formatCurrency(p.amount)}${p.reference ? ` (Ref: ${p.reference})` : ""}`,
        15,
        y,
      );
      y += 5;
    });

    y += 5;
    doc.setFont("helvetica", "italic");
    center("Thank you for your business!", y, 9);

    doc.save(`Receipt-${sale.invoiceId}.pdf`);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-[800px] bg-white rounded-[12px] shadow-xl border border-gray-100 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-[24px] border-b border-[#F4F4F5] flex justify-between items-start">
          <div className="flex flex-col gap-1">
            <h1 className="text-[16px] font-bold uppercase tracking-[0.9px] text-[#1D1D1D]">
              Transaction Details
            </h1>
            <p className="text-[13px] text-[#71717A] font-medium">
              Complete breakdown of sale {sale?.invoiceId}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-[#71717A] cursor-pointer hover:text-black"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-[24px]">
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="animate-spin text-[#2474F5]" size={40} />
            </div>
          ) : !sale ? (
            <div className="text-center py-20 text-[#71717A]">
              Failed to load transaction details.
            </div>
          ) : (
            <div className="flex flex-col gap-[32px]">
              {/* Top Info Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-[24px]">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-[#71717A] text-[12px] uppercase font-bold tracking-wider">
                    <Receipt size={14} />
                    Invoice ID
                  </div>
                  <span className="text-[14px] font-bold text-[#1D1D1D]">
                    {sale.invoiceId}
                  </span>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-[#71717A] text-[12px] uppercase font-bold tracking-wider">
                    <Calendar size={14} />
                    Date
                  </div>
                  <span className="text-[14px] font-bold text-[#1D1D1D]">
                    {format(new Date(sale.createdAt), "dd MMM yyyy, HH:mm")}
                  </span>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-[#71717A] text-[12px] uppercase font-bold tracking-wider">
                    <User size={14} />
                    Customer
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[14px] font-bold text-[#1D1D1D]">
                      {sale.customerSnapshot.name}
                    </span>
                    <span className="text-[12px] text-[#71717A]">
                      {sale.customerSnapshot.phone}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-[#71717A] text-[12px] uppercase font-bold tracking-wider">
                    <LayoutDashboard size={14} />
                    Status
                  </div>
                  <div
                    className={`w-fit px-3 py-1 rounded-full text-[12px] font-medium uppercase border ${
                      sale.paymentStatus === "paid"
                        ? "bg-green-50 border-green-200 text-green-700"
                        : "bg-yellow-50 border-yellow-200 text-yellow-700"
                    }`}
                  >
                    {sale.paymentStatus}
                  </div>
                </div>
              </div>

              {/* Items Table */}
              <div className="border border-[#E2E4E9] rounded-[8px] overflow-hidden">
                <table className="w-full text-left text-[13px]">
                  <thead className="bg-[#F9FAFB] border-b border-[#E2E4E9]">
                    <tr>
                      <th className="py-3 px-4 font-bold text-[#1D1D1D]">
                        Product
                      </th>
                      <th className="py-3 px-4 font-bold text-[#1D1D1D] text-right">
                        Qty
                      </th>
                      <th className="py-3 px-4 font-bold text-[#1D1D1D] text-right">
                        Unit Price
                      </th>
                      <th className="py-3 px-4 font-bold text-[#1D1D1D] text-right">
                        Total
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E2E4E9]">
                    {sale.items.map((item, idx) => (
                      <tr key={idx}>
                        <td className="py-3 px-4 text-[#1D1D1D] font-medium">
                          {item.productName}
                        </td>
                        <td className="py-3 px-4 text-[#1D1D1D] text-right">
                          {item.quantity}
                        </td>
                        <td className="py-3 px-4 text-[#1D1D1D] text-right">
                          {formatCurrency(item.unitPrice)}
                        </td>
                        <td className="py-3 px-4 text-[#1D1D1D] text-right">
                          {formatCurrency(item.total)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Bottom Section: Payments & Summary */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-[32px]">
                {/* Payments */}
                <div className="flex flex-col gap-4">
                  <h3 className="text-[14px] font-bold text-[#1D1D1D]">
                    Payment Methods
                  </h3>
                  <div className="flex flex-col gap-3">
                    {sale.payments.map((p, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-3 bg-[#F9FAFB] rounded-[8px] border border-[#E2E4E9]"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center border border-[#E2E4E9]">
                            <CreditCard size={16} className="text-[#71717A]" />
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[13px] font-bold text-[#1D1D1D] uppercase">
                              {p.method.replace("_", " ")}
                            </span>
                            {p.reference && (
                              <span className="text-[11px] text-[#71717A]">
                                Ref: {p.reference}
                              </span>
                            )}
                          </div>
                        </div>
                        <span className="text-[14px] font-bold text-[#1D1D1D]">
                          {formatCurrency(p.amount)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Summary */}
                <div className="flex flex-col gap-3 p-4 bg-[#F9FAFB] rounded-[12px] border border-[#E2E4E9]">
                  <div className="flex justify-between text-[13px]">
                    <span className="text-[#71717A]">Subtotal</span>
                    <span className="font-medium text-[#1D1D1D]">
                      {formatCurrency(sale.subTotal)}
                    </span>
                  </div>
                  {sale.discountAmount > 0 && (
                    <div className="flex justify-between text-[13px]">
                      <span className="text-[#71717A]">Discount</span>
                      <span className="font-medium text-red-600">
                        -{formatCurrency(sale.discountAmount)}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between text-[13px]">
                    <span className="text-[#71717A]">
                      VAT ({(sale.vatRate * 100).toFixed(1)}%)
                    </span>
                    <span className="font-medium text-[#1D1D1D]">
                      {formatCurrency(sale.vatAmount)}
                    </span>
                  </div>
                  <div className="h-px bg-[#E2E4E9] my-1"></div>
                  <div className="flex justify-between text-[16px]">
                    <span className="font-bold text-[#1D1D1D]">
                      Grand Total
                    </span>
                    <span className="font-black text-[#2474F5]">
                      {formatCurrency(sale.grandTotal)}
                    </span>
                  </div>
                  <div className="flex justify-between text-[13px] mt-1">
                    <span className="text-[#71717A]">Amount Paid</span>
                    <span className="font-bold text-green-600">
                      {formatCurrency(sale.amountPaid)}
                    </span>
                  </div>
                  {sale.amountPaid < sale.grandTotal && (
                    <div className="flex justify-between text-[13px]">
                      <span className="text-[#71717A]">Balance Due</span>
                      <span className="font-bold text-red-600">
                        {formatCurrency(sale.grandTotal - sale.amountPaid)}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Extra Stuff */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-[24px] pt-4 border-t border-[#F4F4F5]">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2 text-[#71717A] text-[12px] uppercase font-bold tracking-wider">
                    <Hash size={14} />
                    Sales Person
                  </div>
                  <span className="text-[13px] text-[#1D1D1D] font-medium">
                    {sale.salesPersonId.fullname}
                  </span>
                </div>
                {sale.notes && (
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2 text-[#71717A] text-[12px] uppercase font-bold tracking-wider">
                      <Info size={14} />
                      Notes
                    </div>
                    <span className="text-[13px] text-[#1D1D1D]">
                      {sale.notes}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-[20px] bg-[#F9FAFB] border-t border-[#F4F4F5] flex justify-between rounded-b-[12px]">
          <button
            onClick={handleDownloadReceipt}
            disabled={!sale || isLoading}
            className="px-6 py-2 bg-[#1A47FE] text-white rounded-[8px] text-[13px] font-bold hover:bg-blue-700 transition-colors cursor-pointer disabled:opacity-50"
          >
            Download Receipt
          </button>
          <button
            onClick={onClose}
            className="px-6 py-2 bg-white border border-[#E2E4E9] rounded-[8px] text-[13px] font-bold text-[#1D1D1D] hover:bg-gray-50 transition-colors cursor-pointer"
          >
            Close Breakdown
          </button>
        </div>
      </div>
    </div>
  );
};

export default SaleDetailsModal;
