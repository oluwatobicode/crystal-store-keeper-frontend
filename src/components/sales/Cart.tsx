import { Trash2, Minus, Plus } from "lucide-react";
import { type CartItem } from "../../Pages/Sales";

interface CartProps {
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onUpdateDiscount: (id: string, discount: number) => void;
}

const Cart = ({
  items,
  onUpdateQuantity,
  onRemoveItem,
  onUpdateDiscount,
}: CartProps) => {
  if (items.length === 0) {
    return (
      <div className="p-[20px] h-full border-r border-[#E4E4E7] flex flex-col gap-[16px]">
        <h1 className="text-[16px] font-medium leading-[16.2px] -tracking-[0.1px]">
          Cart
        </h1>
        <div className="h-full flex items-center justify-center">
          <p className="text-[#71717A] text-center font-medium text-[12px] tracking-[0.9px] leading-[16.2px]">
            Cart is empty <br /> Start adding products to create a sale
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-[20px] h-full border-r border-[#E4E4E7] flex flex-col gap-[24px] overflow-y-auto">
      <h1 className="text-[16px] font-medium leading-[16.2px] -tracking-[0.1px]">
        Cart ({items.length})
      </h1>

      <div className="flex flex-col gap-[16px]">
        {items.map((item) => {
          const subtotal = item.price * item.quantity;
          const discountAmount = subtotal * (item.discount / 100);
          const total = subtotal - discountAmount;

          return (
            <div
              key={item.id}
              className="bg-white border border-[#E4E4E7] rounded-[8px] p-[16px] flex flex-col gap-[16px]"
            >
              <div className="flex justify-between items-start">
                <h3 className="text-[13px] font-bold text-[#1D1D1D] uppercase max-w-[80%]">
                  {item.name}
                </h3>
                <button
                  onClick={() => onRemoveItem(item.id)}
                  className="text-[#EF4444] hover:bg-red-50 p-1 rounded transition-colors"
                >
                  <Trash2 size={14} />
                </button>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => onUpdateQuantity(item.id, -1)}
                    className="w-[24px] h-[24px] border border-[#E4E4E7] rounded-[4px] flex items-center justify-center hover:bg-gray-50"
                  >
                    <Minus size={12} />
                  </button>
                  <span className="text-[13px] font-bold w-[20px] text-center">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => onUpdateQuantity(item.id, 1)}
                    className="w-[24px] h-[24px] border border-[#E4E4E7] rounded-[4px] flex items-center justify-center hover:bg-gray-50"
                  >
                    <Plus size={12} />
                  </button>
                </div>

                <span className="text-[11px] font-medium text-[#71717A] uppercase">
                  ₦{item.price.toFixed(2)} EACH
                </span>
              </div>

              <div className="h-[1px] bg-[#F4F4F5] w-full" />

              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-[#71717A]">Discount:</span>
                  <div className="relative">
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={item.discount}
                      onChange={(e) =>
                        onUpdateDiscount(item.id, Number(e.target.value))
                      }
                      className="w-[40px] h-[24px] bg-[#F4F4F5] rounded-[4px] text-center text-[11px] outline-none focus:ring-1 ring-[#1A47FE]"
                    />
                    <span className="absolute right-[-12px] top-1/2 -translate-y-1/2 text-[11px] text-[#71717A]">
                      %
                    </span>
                  </div>
                </div>

                <span className="text-[14px] font-bold text-[#1D1D1D]">
                  ₦{total.toFixed(2)}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Cart;
