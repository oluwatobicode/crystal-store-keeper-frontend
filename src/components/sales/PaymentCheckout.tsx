import {
  Receipt,
  ChevronDown,
  ChevronUp,
  Banknote,
  CreditCard,
  Smartphone,
  FileCheck,
  X,
} from "lucide-react";
import { useState } from "react";
import { useSale } from "../../contexts/SaleContext";
import { useSales } from "../../hooks/useSales";
import { toast } from "react-hot-toast";
import type { PaymentMethod } from "../../types/SalesRecord";

const PaymentCheckout = () => {
  const {
    subtotal,
    grandTotal,
    discountAmount,
    setGlobalDiscount,
    cartItems,
    selectedCustomer,
    payments,
    addPayment,
    removePayment,
    clearSale,
    vatRate,
    vatAmount,
  } = useSale();

  const { createSale } = useSales();

  // --- STATE MANAGEMENT ---
  const [paymentMode, setPaymentMode] = useState<"quick" | "split">("quick");
  const [quickMethod, setQuickMethod] = useState<"cash" | "pos" | "transfer">(
    "cash",
  );
  const [reference, setReference] = useState("");
  const [splitMethod, setSplitMethod] = useState<
    "cash" | "pos" | "bank_transfer"
  >("cash");
  const [splitAmount, setSplitAmount] = useState("");

  // The grandTotal from context already accounts for discount.

  const handleQuickPay = () => {
    const methodMap: Record<string, "cash" | "pos" | "bank_transfer"> = {
      cash: "cash",
      pos: "pos",
      transfer: "bank_transfer",
    };

    const payment: PaymentMethod = {
      method: methodMap[quickMethod],
      amount: grandTotal,
      reference: quickMethod === "cash" ? null : reference,
    };

    submitSale([payment]);
  };

  const handleAddSplitPayment = () => {
    const amount = parseFloat(splitAmount);
    if (isNaN(amount) || amount <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    const currentPaid = payments.reduce((sum, p) => sum + p.amount, 0);
    if (currentPaid + amount > grandTotal + 0.01) {
      // Small buffer for float precision
      toast.error("Total payments cannot exceed grand total");
      return;
    }

    addPayment({
      method: splitMethod,
      amount: amount,
      reference: reference || null,
    });

    setSplitAmount("");
    setReference("");
  };

  const submitSale = async (finalPayments: PaymentMethod[]) => {
    if (cartItems.length === 0) {
      toast.error("Cart is empty");
      return;
    }

    const totalPaid = finalPayments.reduce((sum, p) => sum + p.amount, 0);
    if (totalPaid < grandTotal - 0.01) {
      toast.error("Payment incomplete");
      return;
    }

    const payload = {
      items: cartItems.map((item) => ({
        productId: item._id,
        quantity: item.quantity,
      })),
      payments: finalPayments.map((p) => ({
        method: p.method,
        amount: p.amount,
        reference: p.reference,
      })),
      discountAmount: discountAmount,
      customerId: selectedCustomer?._id || null,
      vatRate: vatRate,
      vatAmount: vatAmount,
    };

    try {
      await createSale.mutateAsync(payload);
      toast.success("Sale completed successfully!");
      clearSale();
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to create sale");
    }
  };

  return (
    <div className="p-[20px] h-full flex flex-col gap-[16px] overflow-y-auto pb-10">
      <h1 className="text-[16px] font-medium leading-[16.2px] -tracking-[0.1px]">
        Payment & Checkout
      </h1>

      {/* --- 1. ORDER SUMMARY CARD --- */}
      <div className="p-[16px] flex flex-col rounded-[12px] bg-white gap-[16px] w-full border border-[#E4E4E7]">
        <h1 className="text-[16px] font-medium leading-[16.2px] -tracking-[0.1px]">
          Order Summary
        </h1>
        <div className="flex flex-col gap-[12px]">
          <div className="flex justify-between">
            <span className="text-[14px] text-[#1D1D1D]">Subtotal</span>
            <span className="text-[14px] font-medium">
              ₦{subtotal.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-[14px] text-[#1D1D1D]">Discount</span>
            <span className="text-[14px] font-medium text-red-500">
              -₦
              {(
                subtotal -
                (subtotal -
                  subtotal * (discountAmount / 100) -
                  cartItems.reduce(
                    (s, i) =>
                      s + i.sellingPrice * i.quantity * (i.discount / 100),
                    0,
                  ))
              ).toLocaleString()}
            </span>
          </div>
          {vatRate > 0 && (
            <div className="flex justify-between">
              <span className="text-[14px] text-[#1D1D1D]">
                VAT ({vatRate}%)
              </span>
              <span className="text-[14px] font-medium">
                ₦{vatAmount.toLocaleString()}
              </span>
            </div>
          )}
        </div>

        <div className="border-t border-[#E4E4E7] mt-2 pt-[10px] flex justify-between">
          <span className="text-[16px] font-bold text-[#1D1D1D]">Total</span>
          <span className="text-[16px] font-bold text-[#1D1D1D]">
            ₦{grandTotal.toLocaleString()}
          </span>
        </div>
      </div>

      {/* --- 2. GLOBAL DISCOUNT --- */}
      <div className="p-[16px] flex flex-col rounded-[12px] bg-white gap-[8px] w-full border border-[#E4E4E7]">
        <h3 className="text-[12px] font-medium tracking-[0.9px] text-[#1D1D1D]">
          Global Order Discount
        </h3>
        <div className="relative w-full max-w-[150px]">
          <input
            type="number"
            placeholder="0"
            value={discountAmount}
            onChange={(e) => setGlobalDiscount(Number(e.target.value))}
            className="w-full text-[13px] h-[40px] rounded-[8px] border border-[#E4E4E7] px-[12px] outline-none focus:border-[#1A47FE] transition-colors bg-[#FAFAFB]"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#71717A] text-[12px]">
            %
          </span>
        </div>
      </div>

      {/* --- 3. QUICK PAY ACCORDION --- */}
      <div
        className={`rounded-[12px] border transition-all duration-200 ${paymentMode === "quick" ? "bg-[#2474F50D] border-[#2474F533]" : "bg-white border-[#E4E4E7]"}`}
      >
        <button
          onClick={() => setPaymentMode("quick")}
          className="w-full p-[16px] flex justify-between items-start text-left"
        >
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <FileCheck size={16} className="text-[#1D1D1D]" />
              <h1 className="text-[14px] font-bold text-[#1D1D1D]">
                Quick Pay (Full Amount)
              </h1>
            </div>
            <span className="text-[11px] text-[#71717A]">
              Pay ₦{grandTotal.toLocaleString()} in one click
            </span>
          </div>
          {paymentMode === "quick" ? (
            <ChevronUp size={16} />
          ) : (
            <ChevronDown size={16} />
          )}
        </button>

        {paymentMode === "quick" && (
          <div className="px-[16px] pb-[16px] flex flex-col gap-[16px]">
            <div className="grid grid-cols-3 gap-[10px]">
              <button
                onClick={() => setQuickMethod("cash")}
                className={`h-[70px] rounded-[10px] flex flex-col items-center justify-center gap-1 border transition-all ${
                  quickMethod === "cash"
                    ? "bg-[#16A34A] border border-[#16A34A] text-white"
                    : "bg-white border-[#E4E4E7] text-[#1D1D1D] hover:bg-gray-50"
                }`}
              >
                <Banknote size={20} />
                <span className="text-[11px] font-bold">Cash</span>
              </button>

              <button
                onClick={() => setQuickMethod("pos")}
                className={`h-[70px] rounded-[10px] flex flex-col items-center justify-center gap-1 border transition-all ${
                  quickMethod === "pos"
                    ? "bg-[#1A47FE] border-[#1A47FE] text-white"
                    : "bg-white border-[#E4E4E7] text-[#1D1D1D] hover:bg-gray-50"
                }`}
              >
                <CreditCard size={20} />
                <span className="text-[11px] font-bold">POS</span>
              </button>

              <button
                onClick={() => setQuickMethod("transfer")}
                className={`h-[70px] rounded-[10px] flex flex-col items-center justify-center gap-1 border transition-all ${
                  quickMethod === "transfer"
                    ? "bg-[#1A47FE] border-[#1A47FE] text-white"
                    : "bg-white border-[#E4E4E7] text-[#1D1D1D] hover:bg-gray-50"
                }`}
              >
                <Smartphone size={20} />
                <span className="text-[11px] font-bold">Transfer</span>
              </button>
            </div>

            {quickMethod !== "cash" && (
              <div className="bg-white p-[12px] rounded-[8px] border border-[#E4E4E7]">
                <label className="text-[11px] font-bold text-[#1D1D1D] mb-2 block">
                  Enter {quickMethod.toUpperCase()} Reference
                </label>
                <input
                  type="text"
                  value={reference}
                  onChange={(e) => setReference(e.target.value)}
                  placeholder="Reference number..."
                  className="w-full h-[40px] bg-[#FAFAFB] border border-[#E4E4E7] rounded-[8px] px-3 text-[13px] outline-none focus:border-[#1A47FE]"
                />
              </div>
            )}
          </div>
        )}
      </div>

      {/* --- 4. SPLIT PAYMENT ACCORDION --- */}
      <div
        className={`rounded-[12px] border transition-all duration-200 ${paymentMode === "split" ? "bg-[#F0F9FF] border-[#B9E6FE]" : "bg-white border-[#E4E4E7]"}`}
      >
        <button
          onClick={() => setPaymentMode("split")}
          className="w-full p-[16px] flex justify-between items-center text-left"
        >
          <div className="flex flex-col gap-1">
            <h1 className="text-[14px] font-bold text-[#1D1D1D]">
              Split Payment
            </h1>
            <span className="text-[11px] text-[#71717A]">
              Paid: ₦
              {payments.reduce((sum, p) => sum + p.amount, 0).toLocaleString()}{" "}
              / ₦{grandTotal.toLocaleString()}
            </span>
          </div>
          {paymentMode === "split" ? (
            <ChevronUp size={16} />
          ) : (
            <ChevronDown size={16} />
          )}
        </button>

        {paymentMode === "split" && (
          <div className="px-[16px] pb-[16px] flex flex-col gap-[16px]">
            {/* Method Tabs */}
            <div className="flex gap-2 p-1 bg-[#FAFAFB] rounded-[8px] border border-[#E4E4E7]">
              {(["cash", "pos", "bank_transfer"] as const).map((m) => (
                <button
                  key={m}
                  onClick={() => setSplitMethod(m)}
                  className={`flex-1 py-1.5 text-[11px] font-bold rounded transition-all ${
                    splitMethod === m
                      ? "bg-white shadow-sm text-[#1D1D1D]"
                      : "text-[#71717A]"
                  }`}
                >
                  {m.replace("_", " ").toUpperCase()}
                </button>
              ))}
            </div>

            {/* Inputs */}
            <div className="flex flex-col gap-3">
              <div>
                <label className="text-[11px] font-bold text-[#1D1D1D] block mb-1">
                  Amount
                </label>
                <input
                  type="number"
                  value={splitAmount}
                  onChange={(e) => setSplitAmount(e.target.value)}
                  placeholder={`Remaining: ₦${(grandTotal - payments.reduce((sum, p) => sum + p.amount, 0)).toFixed(2)}`}
                  className="w-full h-[40px] bg-white border border-[#E4E4E7] rounded-[8px] px-3 text-[13px]"
                />
              </div>
              {splitMethod !== "cash" && (
                <div>
                  <label className="text-[11px] font-bold text-[#1D1D1D] block mb-1">
                    Reference
                  </label>
                  <input
                    type="text"
                    value={reference}
                    onChange={(e) => setReference(e.target.value)}
                    placeholder="Ref number..."
                    className="w-full h-[40px] bg-white border border-[#E4E4E7] rounded-[8px] px-3 text-[13px]"
                  />
                </div>
              )}
            </div>

            <button
              onClick={handleAddSplitPayment}
              className="w-full h-[40px] bg-[#D1E0FF] text-[#1A47FE] font-bold text-[12px] rounded-[8px] hover:bg-[#bed2ff]"
            >
              Add Payment
            </button>

            {/* List of added payments */}
            <div className="mt-2 flex flex-col gap-2">
              {payments.map((p, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center p-2 bg-white rounded border border-[#E4E4E7] text-[12px]"
                >
                  <span>
                    {p.method.toUpperCase()} - ₦{p.amount.toLocaleString()}
                  </span>
                  <X
                    size={14}
                    className="text-red-500 cursor-pointer"
                    onClick={() => removePayment(i)}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* --- 5. ACTION BUTTONS --- */}
      <div className="mt-auto flex flex-col gap-[12px]">
        <button
          onClick={
            paymentMode === "quick"
              ? handleQuickPay
              : () => submitSale(payments)
          }
          disabled={createSale.isPending}
          className="w-full flex items-center justify-center gap-[10px] h-[48px] rounded-[8px] cursor-pointer bg-[#1A47FE] hover:bg-blue-700 transition-colors text-white font-medium disabled:opacity-50"
        >
          {createSale.isPending ? (
            <span>Processing...</span>
          ) : (
            <>
              <Receipt size={18} />
              <span>Complete Sale - ₦{grandTotal.toLocaleString()}</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default PaymentCheckout;
