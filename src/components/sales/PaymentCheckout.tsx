import {
  Receipt,
  ChevronDown,
  ChevronUp,
  Banknote,
  CreditCard,
  Smartphone,
  Save,
  FileCheck,
} from "lucide-react";
import { useState } from "react";

interface PaymentCheckoutProps {
  subtotal?: number;
  total?: number;
  onCompleteSale?: () => void;
}

const PaymentCheckout = ({
  subtotal = 0,
  total = 0,
  onCompleteSale,
}: PaymentCheckoutProps) => {
  // --- STATE MANAGEMENT ---

  // 1. Accordion State: 'quick' or 'split'
  const [paymentMode, setPaymentMode] = useState<"quick" | "split">("quick");

  // 2. Quick Pay Method State: 'cash' | 'pos' | 'transfer'
  const [quickMethod, setQuickMethod] = useState<"cash" | "pos" | "transfer">(
    "cash",
  );

  const tax = subtotal * 0.2; // 20% VAT example

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
              ₦{subtotal.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-[14px] text-[#1D1D1D]">VAT (20%)</span>
            <span className="text-[14px] font-medium">₦{tax.toFixed(2)}</span>
          </div>
        </div>

        <div className="border-t border-[#E4E4E7] mt-2 pt-[10px] flex justify-between">
          <span className="text-[16px] font-bold text-[#1D1D1D]">Total</span>
          <span className="text-[16px] font-bold text-[#1D1D1D]">
            ₦{total.toFixed(2)}
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
        {/* Header (Click to Expand) */}
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
              Pay ₦{total.toFixed(2)} in one click
            </span>
          </div>
          {paymentMode === "quick" ? (
            <ChevronUp size={16} />
          ) : (
            <ChevronDown size={16} />
          )}
        </button>

        {/* Content (Visible only if 'quick') */}
        {paymentMode === "quick" && (
          <div className="px-[16px] pb-[16px] flex flex-col gap-[16px]">
            {/* Payment Method Buttons (Frame 27 Style) */}
            <div className="grid grid-cols-3 gap-[10px]">
              {/* CASH */}
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
                {quickMethod === "cash" && (
                  <span className="text-[10px]">₦{total.toFixed(2)}</span>
                )}
              </button>

              {/* POS */}
              <button
                onClick={() => setQuickMethod("pos")}
                className={`h-[70px] rounded-[10px] flex flex-col items-center justify-center gap-1 border transition-all ${
                  quickMethod === "pos"
                    ? "bg-[#1A47FE] border-[#1A47FE] text-white" // Blue for selected POS
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

            {/* DYNAMIC INPUTS BASED ON SELECTION */}

            {/* POS Input (Frame 197) */}
            {quickMethod === "pos" && (
              <div className="bg-white p-[12px] rounded-[8px] border border-[#E4E4E7]">
                <label className="text-[11px] font-bold text-[#1D1D1D] mb-2 block">
                  Enter POS Slip Reference
                </label>
                <input
                  type="text"
                  placeholder="POS slip number..."
                  className="w-full h-[40px] bg-[#FAFAFB] border border-[#E4E4E7] rounded-[8px] px-3 text-[13px] outline-none focus:border-[#1A47FE]"
                />
              </div>
            )}

            {/* Transfer Input (Frame 198) */}
            {quickMethod === "transfer" && (
              <div className="bg-white p-[12px] rounded-[8px] border border-[#E4E4E7]">
                <label className="text-[11px] font-bold text-[#1D1D1D] mb-2 block">
                  Enter Bank Transfer Reference
                </label>
                <input
                  type="text"
                  placeholder="Bank reference..."
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
              Need to split across multiple methods?
            </span>
          </div>
          {paymentMode === "split" ? (
            <ChevronUp size={16} />
          ) : (
            <ChevronDown size={16} />
          )}
        </button>

        {/* Content (Frame 196) */}
        {paymentMode === "split" && (
          <div className="px-[16px] pb-[16px] flex flex-col gap-[16px]">
            {/* Method Tabs */}
            <div className="flex gap-2 p-1 bg-[#FAFAFB] rounded-[8px] border border-[#E4E4E7]">
              <button className="flex-1 py-1.5 text-[11px] font-bold bg-white shadow-sm rounded text-[#1D1D1D]">
                Cash
              </button>
              <button className="flex-1 py-1.5 text-[11px] font-medium text-[#71717A]">
                POS
              </button>
              <button className="flex-1 py-1.5 text-[11px] font-medium text-[#71717A]">
                Transfer
              </button>
            </div>

            {/* Amount Input */}
            <div className="flex flex-col gap-2">
              <label className="text-[11px] font-bold text-[#1D1D1D]">
                Amount
              </label>
              <input
                type="text"
                placeholder={`Max: ₦${total.toFixed(2)}`}
                className="w-full h-[40px] bg-white border border-[#E4E4E7] rounded-[8px] px-3 text-[13px]"
              />
            </div>

            <button className="w-full h-[40px] bg-[#D1E0FF] text-[#1A47FE] font-bold text-[12px] rounded-[8px] hover:bg-[#bed2ff]">
              Add Payment
            </button>
          </div>
        )}
      </div>

      {/* --- 5. ACTION BUTTONS --- */}
      <div className="mt-auto flex flex-col gap-[12px]">
        {/* Complete Sale Button */}
        <button
          onClick={onCompleteSale}
          className="w-full flex items-center justify-center gap-[10px] h-[48px] rounded-[8px] cursor-pointer bg-[#1A47FE] hover:bg-blue-700 transition-colors text-white font-medium"
        >
          <Receipt size={18} />
          <span>Complete Sale - ₦{total.toFixed(2)}</span>
        </button>

        {/* Secondary Actions */}
        <div className="grid grid-cols-2 gap-[12px]">
          <button className="h-[40px] flex items-center justify-center gap-2 rounded-[8px] border border-[#E4E4E7] bg-white hover:bg-gray-50 text-[12px] font-medium text-[#1D1D1D]">
            <Save size={14} /> Save Draft
          </button>
          <button className="h-[40px] flex items-center justify-center gap-2 rounded-[8px] border border-[#E4E4E7] bg-white hover:bg-gray-50 text-[12px] font-medium text-[#1D1D1D]">
            <FileCheck size={14} /> Request Approval
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentCheckout;
