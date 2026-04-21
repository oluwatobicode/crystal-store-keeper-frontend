import {
  X,
  Mail,
  Phone,
  MapPin,
  Loader2,
  Plus,
  History,
  Receipt,
} from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import type {
  Customer,
  CreditSale,
  Repayment,
  Transaction,
} from "../types/Customers";
import { formatCurrency } from "../utils/formatCurrency";
import { useCredit } from "../hooks/useCredit";
import { useCustomer } from "../hooks/useCustomers";
import { formatDate } from "../utils/formatDate";

interface CustomerDetailsProps {
  isOpen: boolean;
  onClose: () => void;
  customer: Customer | null;
}

type TabType = "overview" | "credit" | "transactions";

const CustomerModalDetails = ({
  isOpen,
  onClose,
  customer: initialCustomer,
}: CustomerDetailsProps) => {
  const [activeTab, setActiveTab] = useState<TabType>("overview");
  const [showRepaymentForm, setShowRepaymentForm] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<
    "cash" | "bank_transfer"
  >("cash");

  const customerId = initialCustomer?._id;
  const { data: fullCustomerResponse, isLoading: isLoadingCustomer } =
    useCustomer(customerId || "");
  const { creditHistory, recordRepayment } = useCredit(customerId);

  if (!isOpen || !initialCustomer) return null;

  const fullData = fullCustomerResponse?.data?.data;
  const customer = fullData?.customer || initialCustomer;
  const recentTransactions = fullData?.recentTransactions || [];
  const creditData = creditHistory.data?.data;

  const handleRecordRepayment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const amount = Number(formData.get("amount"));
    const paymentMethod = formData.get("paymentMethod") as
      | "cash"
      | "bank_transfer";
    const reference = formData.get("reference") as string;
    const note = formData.get("note") as string;

    if (!amount || amount <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    if (paymentMethod !== "cash" && !reference) {
      toast.error(
        `Reference is required for ${paymentMethod.replace("_", " ")}`,
      );
      return;
    }

    try {
      await recordRepayment.mutateAsync({
        customerId: customer._id,
        amount,
        paymentMethod,
        reference,
        note,
      });
      setShowRepaymentForm(false);
      setSelectedPaymentMethod("cash");
    } catch (error) {
      console.log(error);
      // Error is handled in the hook
    }
  };

  const availableCredit =
    (customer.creditLimit || 0) - (customer.currentBalance || 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-[850px] max-h-[90vh] overflow-hidden rounded-[12px] shadow-xl bg-[#FAFAFB] border border-gray-100 flex flex-col">
        {/* Header */}
        <div className="p-[24px] border-b border-[#F4F4F5] flex justify-between items-start bg-white">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-3">
              <h1 className="text-[18px] font-bold uppercase tracking-[0.9px] text-[#1D1D1D]">
                {customer.fullname}
              </h1>
              <span className="bg-[#1A47FE] text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                {customer.customerType}
              </span>
            </div>
            <p className="text-[13px] text-[#71717A] font-medium">
              Customer ID: {customer.customerId}
            </p>
          </div>
          <div className="flex items-center gap-4">
            {isLoadingCustomer && (
              <Loader2 size={20} className="animate-spin text-[#1A47FE]" />
            )}
            <button
              onClick={onClose}
              className="text-[#71717A] cursor-pointer hover:text-black transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex px-[24px] bg-white border-b border-[#F4F4F5]">
          {(["overview", "credit", "transactions"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-4 px-6 text-[13px] font-bold uppercase tracking-wider transition-all border-b-2 relative ${
                activeTab === tab
                  ? "border-[#1A47FE] text-[#1A47FE]"
                  : "border-transparent text-[#71717A] hover:text-[#1D1D1D]"
              }`}
            >
              {tab === "credit" ? "Credit History" : tab}
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto p-[24px]">
          {activeTab === "overview" && (
            <div className="flex flex-col gap-[24px]">
              <div className="grid grid-cols-2 gap-[24px]">
                <div className="bg-white p-[20px] rounded-[12px] border border-[#E4E4E7] flex flex-col gap-[16px]">
                  <h3 className="text-[14px] font-bold text-[#1D1D1D] uppercase tracking-wide">
                    Contact Information
                  </h3>
                  <div className="flex flex-col gap-[12px]">
                    <div className="flex items-center gap-3 text-[#1D1D1D] text-[13px] font-medium">
                      <div className="w-8 h-8 rounded-full bg-[#FAFAFB] flex items-center justify-center">
                        <Mail size={14} className="text-[#71717A]" />
                      </div>
                      {customer.email || "N/A"}
                    </div>
                    <div className="flex items-center gap-3 text-[#1D1D1D] text-[13px] font-medium">
                      <div className="w-8 h-8 rounded-full bg-[#FAFAFB] flex items-center justify-center">
                        <Phone size={14} className="text-[#71717A]" />
                      </div>
                      {customer.phone || "N/A"}
                    </div>
                    <div className="flex items-start gap-3 text-[#1D1D1D] text-[13px] font-medium">
                      <div className="w-8 h-8 rounded-full bg-[#FAFAFB] flex items-center justify-center shrink-0">
                        <MapPin size={14} className="text-[#71717A]" />
                      </div>
                      <span className="mt-1">{customer.address || "N/A"}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-[20px] rounded-[12px] border border-[#E4E4E7] flex flex-col gap-[16px]">
                  <h3 className="text-[14px] font-bold text-[#1D1D1D] uppercase tracking-wide">
                    Account Summary
                  </h3>
                  <div className="flex flex-col gap-[12px]">
                    <div className="flex justify-between text-[13px]">
                      <span className="text-[#71717A] font-medium">
                        Total Spent
                      </span>
                      <span className="text-[#1D1D1D] font-bold">
                        {formatCurrency(customer.totalSpent)}
                      </span>
                    </div>
                    <div className="flex justify-between text-[13px]">
                      <span className="text-[#71717A] font-medium">
                        Customer Type
                      </span>
                      <span className="text-[#1D1D1D] font-bold capitalize">
                        {customer.customerType}
                      </span>
                    </div>
                    <div className="flex justify-between text-[13px]">
                      <span className="text-[#71717A] font-medium">
                        Credit Limit
                      </span>
                      <span className="text-[#1D1D1D] font-bold">
                        {formatCurrency(customer.creditLimit)}
                      </span>
                    </div>
                    <div className="h-[1px] bg-[#F4F4F5] my-1" />
                    <div className="flex justify-between text-[14px]">
                      <span className="text-[#1D1D1D] font-bold">
                        Current Balance
                      </span>
                      <span
                        className={`font-bold ${customer.currentBalance > 0 ? "text-red-500" : "text-green-600"}`}
                      >
                        {formatCurrency(customer.currentBalance)}
                      </span>
                    </div>
                    <div className="flex justify-between text-[13px]">
                      <span className="text-[#71717A] font-medium">
                        Available Credit
                      </span>
                      <span className="text-[#1D1D1D] font-bold">
                        {formatCurrency(availableCredit)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "credit" && (
            <div className="flex flex-col gap-[24px]">
              {/* Credit Stats */}
              <div className="grid grid-cols-3 gap-[16px]">
                <div className="bg-white p-[16px] rounded-[12px] border border-[#E4E4E7]">
                  <p className="text-[11px] text-[#71717A] font-bold uppercase tracking-wider mb-1">
                    Credit Limit
                  </p>
                  <p className="text-[18px] font-bold text-[#1D1D1D]">
                    {formatCurrency(
                      creditData?.creditLimit || customer.creditLimit,
                    )}
                  </p>
                </div>
                <div className="bg-white p-[16px] rounded-[12px] border border-[#E4E4E7]">
                  <p className="text-[11px] text-[#71717A] font-bold uppercase tracking-wider mb-1">
                    Current Balance
                  </p>
                  <p
                    className={`text-[18px] font-bold ${customer.currentBalance > 0 ? "text-red-500" : "text-green-600"}`}
                  >
                    {formatCurrency(
                      creditData?.currentBalance || customer.currentBalance,
                    )}
                  </p>
                </div>
                <div className="bg-white p-[16px] rounded-[12px] border border-[#E4E4E7]">
                  <p className="text-[11px] text-[#71717A] font-bold uppercase tracking-wider mb-1">
                    Available Credit
                  </p>
                  <p className="text-[18px] font-bold text-[#1D1D1D]">
                    {formatCurrency(availableCredit)}
                  </p>
                </div>
              </div>

              {/* Record Repayment Button */}
              {customer.currentBalance > 0 && (
                <div className="flex justify-end">
                  <button
                    onClick={() => setShowRepaymentForm(!showRepaymentForm)}
                    className="flex items-center gap-2 px-4 py-2 bg-[#1A47FE] text-white rounded-[8px] text-[13px] font-bold hover:bg-blue-700 transition-colors"
                  >
                    <Plus size={16} />
                    {showRepaymentForm
                      ? "Cancel Recording"
                      : "Record Repayment"}
                  </button>
                </div>
              )}

              {/* Repayment Form */}
              {showRepaymentForm && (
                <form
                  onSubmit={handleRecordRepayment}
                  className="bg-white p-[20px] rounded-[12px] border-2 border-[#1A47FE]/20 flex flex-col gap-[16px] animate-in slide-in-from-top-2 duration-200"
                >
                  <h3 className="text-[14px] font-bold text-[#1D1D1D] uppercase">
                    Record New Repayment
                  </h3>
                  <div className="grid grid-cols-2 gap-[16px]">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[12px] font-bold text-[#71717A]">
                        Amount
                      </label>
                      <input
                        name="amount"
                        type="number"
                        step="0.01"
                        required
                        max={customer.currentBalance}
                        placeholder="0.00"
                        className="h-[40px] px-3 bg-[#FAFAFB] border border-[#E4E4E7] rounded-[8px] text-[13px] outline-none focus:border-[#1A47FE]"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[12px] font-bold text-[#71717A]">
                        Payment Method
                      </label>
                      <select
                        name="paymentMethod"
                        required
                        value={selectedPaymentMethod}
                        onChange={(e) =>
                          setSelectedPaymentMethod(
                            e.target.value as "cash" | "bank_transfer",
                          )
                        }
                        className="h-[40px] px-3 bg-[#FAFAFB] border border-[#E4E4E7] rounded-[8px] text-[13px] outline-none focus:border-[#1A47FE] cursor-pointer"
                      >
                        <option value="cash">Cash</option>
                        <option value="bank_transfer">Bank Transfer</option>
                      </select>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[12px] font-bold text-[#71717A]">
                        Reference{" "}
                        {selectedPaymentMethod !== "cash" && (
                          <span className="text-red-500">*</span>
                        )}
                      </label>
                      <input
                        name="reference"
                        required={selectedPaymentMethod !== "cash"}
                        placeholder={
                          selectedPaymentMethod === "cash"
                            ? "Transaction ref (Optional)"
                            : "Transaction ref (Required)"
                        }
                        className="h-[40px] px-3 bg-[#FAFAFB] border border-[#E4E4E7] rounded-[8px] text-[13px] outline-none focus:border-[#1A47FE]"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[12px] font-bold text-[#71717A]">
                        Note (Optional)
                      </label>
                      <input
                        name="note"
                        placeholder="Additional details"
                        className="h-[40px] px-3 bg-[#FAFAFB] border border-[#E4E4E7] rounded-[8px] text-[13px] outline-none focus:border-[#1A47FE]"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end mt-2">
                    <button
                      type="submit"
                      disabled={recordRepayment.isPending}
                      className="px-6 py-2 bg-[#1A47FE] text-white rounded-[8px] text-[13px] font-bold hover:bg-blue-700 transition-colors flex items-center gap-2 disabled:opacity-50"
                    >
                      {recordRepayment.isPending && (
                        <Loader2 size={16} className="animate-spin" />
                      )}
                      Submit Repayment
                    </button>
                  </div>
                </form>
              )}

              {/* Credit Sales Table */}
              <div className="flex flex-col gap-[12px]">
                <div className="flex items-center gap-2">
                  <History size={16} className="text-[#1A47FE]" />
                  <h3 className="text-[14px] font-bold text-[#1D1D1D] uppercase tracking-wide">
                    Credit Sales
                  </h3>
                </div>
                <div className="bg-white rounded-[12px] border border-[#E4E4E7] overflow-hidden">
                  <table className="w-full text-left border-collapse">
                    <thead className="bg-[#FAFAFB] border-b border-[#E4E4E7]">
                      <tr>
                        <th className="px-4 py-3 text-[11px] font-bold text-[#71717A] uppercase">
                          Invoice ID
                        </th>
                        <th className="px-4 py-3 text-[11px] font-bold text-[#71717A] uppercase">
                          Total
                        </th>
                        <th className="px-4 py-3 text-[11px] font-bold text-[#71717A] uppercase">
                          Balance
                        </th>
                        <th className="px-4 py-3 text-[11px] font-bold text-[#71717A] uppercase">
                          Due Date
                        </th>
                        <th className="px-4 py-3 text-[11px] font-bold text-[#71717A] uppercase">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#F4F4F5]">
                      {creditData?.creditSales?.length > 0 ? (
                        creditData.creditSales.map((sale: CreditSale) => (
                          <tr
                            key={sale.invoiceId}
                            className="hover:bg-gray-50 transition-colors"
                          >
                            <td className="px-4 py-3 text-[12px] font-bold text-[#1A47FE]">
                              {sale.invoiceId}
                            </td>
                            <td className="px-4 py-3 text-[12px] font-medium">
                              {formatCurrency(sale.grandTotal)}
                            </td>
                            <td className="px-4 py-3 text-[12px] font-bold text-red-500">
                              {formatCurrency(sale.balanceDue)}
                            </td>
                            <td className="px-4 py-3 text-[12px] text-[#71717A] font-medium">
                              {formatDate(sale.creditDueDate)}
                            </td>
                            <td className="px-4 py-3">
                              <span
                                className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                                  sale.paymentStatus === "paid"
                                    ? "bg-green-100 text-green-700"
                                    : sale.paymentStatus === "partial"
                                      ? "bg-orange-100 text-orange-700"
                                      : "bg-red-100 text-red-700"
                                }`}
                              >
                                {sale.paymentStatus}
                              </span>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td
                            colSpan={5}
                            className="px-4 py-8 text-center text-[13px] text-[#71717A]"
                          >
                            No credit sales found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Repayments Table */}
              <div className="flex flex-col gap-[12px]">
                <div className="flex items-center gap-2">
                  <Receipt size={16} className="text-[#1A47FE]" />
                  <h3 className="text-[14px] font-bold text-[#1D1D1D] uppercase tracking-wide">
                    Repayments
                  </h3>
                </div>
                <div className="bg-white rounded-[12px] border border-[#E4E4E7] overflow-hidden">
                  <table className="w-full text-left border-collapse">
                    <thead className="bg-[#FAFAFB] border-b border-[#E4E4E7]">
                      <tr>
                        <th className="px-4 py-3 text-[11px] font-bold text-[#71717A] uppercase">
                          Date
                        </th>
                        <th className="px-4 py-3 text-[11px] font-bold text-[#71717A] uppercase">
                          Amount
                        </th>
                        <th className="px-4 py-3 text-[11px] font-bold text-[#71717A] uppercase">
                          Method
                        </th>
                        <th className="px-4 py-3 text-[11px] font-bold text-[#71717A] uppercase">
                          Note
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#F4F4F5]">
                      {creditData?.repayments?.length > 0 ? (
                        creditData.repayments.map(
                          (repayment: Repayment, idx: number) => (
                            <tr
                              key={idx}
                              className="hover:bg-gray-50 transition-colors"
                            >
                              <td className="px-4 py-3 text-[12px] text-[#71717A] font-medium">
                                {formatDate(repayment.createdAt)}
                              </td>
                              <td className="px-4 py-3 text-[12px] font-bold text-green-600">
                                {formatCurrency(repayment.amount)}
                              </td>
                              <td className="px-4 py-3 text-[12px] capitalize font-medium">
                                {repayment.paymentMethod.replace("_", " ")}
                              </td>
                              <td className="px-4 py-3 text-[12px] text-[#71717A]">
                                {repayment.note || "-"}
                              </td>
                            </tr>
                          ),
                        )
                      ) : (
                        <tr>
                          <td
                            colSpan={4}
                            className="px-4 py-8 text-center text-[13px] text-[#71717A]"
                          >
                            No repayments recorded
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === "transactions" && (
            <div className="flex flex-col gap-[16px]">
              <div className="flex items-center gap-2">
                <History size={16} className="text-[#1A47FE]" />
                <h3 className="text-[14px] font-bold text-[#1D1D1D] uppercase tracking-wide">
                  Transactions History
                </h3>
              </div>
              <div className="bg-white rounded-[12px] border border-[#E4E4E7] overflow-hidden">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-[#FAFAFB] border-b border-[#E4E4E7]">
                    <tr>
                      <th className="px-4 py-3 text-[11px] font-bold text-[#71717A] uppercase">
                        Invoice ID
                      </th>
                      <th className="px-4 py-3 text-[11px] font-bold text-[#71717A] uppercase">
                        Date
                      </th>
                      <th className="px-4 py-3 text-[11px] font-bold text-[#71717A] uppercase">
                        Total
                      </th>
                      <th className="px-4 py-3 text-[11px] font-bold text-[#71717A] uppercase">
                        Amount Paid
                      </th>
                      <th className="px-4 py-3 text-[11px] font-bold text-[#71717A] uppercase">
                        Balance
                      </th>
                      <th className="px-4 py-3 text-[11px] font-bold text-[#71717A] uppercase">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F4F4F5]">
                    {recentTransactions?.length > 0 ? (
                      recentTransactions.map((sale: Transaction) => (
                        <tr
                          key={sale.invoiceId}
                          className="hover:bg-gray-50 transition-colors"
                        >
                          <td className="px-4 py-3 text-[12px] font-bold text-[#1A47FE]">
                            {sale.invoiceId}
                          </td>
                          <td className="px-4 py-3 text-[12px] text-[#71717A] font-medium">
                            {formatDate(sale.date)}
                          </td>
                          <td className="px-4 py-3 text-[12px] font-bold text-[#1D1D1D]">
                            {formatCurrency(sale.grandTotal)}
                          </td>
                          <td className="px-4 py-3 text-[12px] font-medium text-green-600">
                            {formatCurrency(sale.amountPaid)}
                          </td>
                          <td className="px-4 py-3 text-[12px] font-medium text-red-500">
                            {formatCurrency(sale.balanceDue)}
                          </td>
                          <td className="px-4 py-3">
                            <span
                              className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                                sale.paymentStatus === "paid"
                                  ? "bg-green-100 text-green-700"
                                  : sale.paymentStatus === "partial"
                                    ? "bg-orange-100 text-orange-700"
                                    : "bg-red-100 text-red-700"
                              }`}
                            >
                              {sale.paymentStatus}
                            </span>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan={6}
                          className="px-4 py-8 text-center text-[13px] text-[#71717A]"
                        >
                          No transactions found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomerModalDetails;
