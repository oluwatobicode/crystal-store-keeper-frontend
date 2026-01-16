import { useState } from "react";
import Cart from "../components/sales/Cart";
import NewSale from "../components/sales/NewSale";
import PaymentCheckout from "../components/sales/PaymentCheckout";

export interface Product {
  id: string;
  name: string;
  sku: string;
  price: number;
  stock: number;
}

export interface CartItem extends Product {
  quantity: number;
  discount: number;
}

const Sales = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // 1. Add Item Logic
  const addToCart = (product: Product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1, discount: 0 }];
    });
  };

  // 2. Quantity Logic
  const updateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newQty = Math.max(1, item.quantity + delta);
          return { ...item, quantity: newQty };
        }
        return item;
      })
    );
  };

  // 3. Remove Logic
  const removeItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  // 4. Discount Logic
  const updateDiscount = (id: string, discount: number) => {
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, discount } : item))
    );
  };

  return (
    <div className="grid grid-cols-3 h-screen bg-[#FAFAFA] overflow-hidden">
      <NewSale onAddToCart={addToCart} />

      <Cart
        items={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeItem}
        onUpdateDiscount={updateDiscount}
      />

      <PaymentCheckout />
    </div>
  );
};
export default Sales;
