import React, { createContext, useContext, useState, useMemo } from "react";
import type { Products as Product } from "../types/Products";
import type { Customer } from "../types/Customers";
import type { PaymentMethod } from "../types/SalesRecord";
import { useSettings } from "../hooks/useSettings";

export interface CartItem extends Product {
  quantity: number;
  discount: number;
}

export type DiscountPermission = "none" | "small" | "large";

interface SaleContextType {
  cartItems: CartItem[];
  selectedCustomer: Customer | null;
  globalDiscountPercent: number;
  payments: PaymentMethod[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, delta: number) => void;
  updateItemDiscount: (productId: string, discount: number) => void;
  setCustomer: (customer: Customer | null) => void;
  setGlobalDiscount: (discount: number) => void;
  addPayment: (payment: PaymentMethod) => void;
  removePayment: (index: number) => void;
  clearSale: () => void;
  subtotal: number;
  totalDiscount: number;
  vatRate: number;
  vatAmount: number;
  grandTotal: number;
  maxDiscountPercent: number;
  discountPermission: DiscountPermission;
}

const SaleContext = createContext<SaleContextType | undefined>(undefined);

export const SaleProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { getSettings } = useSettings();
  const settings = getSettings?.data?.data?.data;
  const vatRate = settings?.system?.vatEnabled ? settings.system.vatRate : 0;
  const discountPermission: DiscountPermission =
    settings?.pos?.discountPermission ?? "none";
  const maxDiscountPercent: number = settings?.pos?.maxDiscountPercent ?? 0;

  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null,
  );
  const [globalDiscountPercent, setGlobalDiscountPercent] = useState<number>(0);
  const [payments, setPayments] = useState<PaymentMethod[]>([]);

  const clampDiscount = (value: number) =>
    Math.min(Math.max(value || 0, 0), maxDiscountPercent);

  const addToCart = (product: Product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item._id === product._id);
      if (existing) {
        return prev.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...prev, { ...product, quantity: 1, discount: 0 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item._id !== productId));
  };

  const updateQuantity = (productId: string, delta: number) => {
    setCartItems((prev) =>
      prev.map((item) => {
        if (item._id === productId) {
          const newQty = Math.max(1, item.quantity + delta);
          return { ...item, quantity: newQty };
        }
        return item;
      }),
    );
  };

  const updateItemDiscount = (productId: string, discount: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item._id === productId
          ? { ...item, discount: clampDiscount(discount) }
          : item,
      ),
    );
  };

  const setCustomer = (customer: Customer | null) => {
    setSelectedCustomer(customer);
  };

  const setGlobalDiscount = (discount: number) => {
    setGlobalDiscountPercent(clampDiscount(discount));
  };

  const addPayment = (payment: PaymentMethod) => {
    setPayments((prev) => [...prev, payment]);
  };

  const removePayment = (index: number) => {
    setPayments((prev) => prev.filter((_, i) => i !== index));
  };

  const clearSale = () => {
    setCartItems([]);
    setSelectedCustomer(null);
    setGlobalDiscountPercent(0);
    setPayments([]);
  };

  const subtotal = useMemo(() => {
    return cartItems.reduce(
      (sum, item) => sum + item.sellingPrice * item.quantity,
      0,
    );
  }, [cartItems]);

  const totalDiscount = useMemo(() => {
    const itemDiscount = cartItems.reduce(
      (sum, item) =>
        sum + item.sellingPrice * item.quantity * (item.discount / 100),
      0,
    );
    const afterItemDiscounts = subtotal - itemDiscount;
    const globalDiscount = afterItemDiscounts * (globalDiscountPercent / 100);
    return itemDiscount + globalDiscount;
  }, [cartItems, subtotal, globalDiscountPercent]);

  const afterDiscount = subtotal - totalDiscount;
  const vatAmount = afterDiscount * (vatRate / 100);
  const grandTotal = afterDiscount + vatAmount;

  return (
    <SaleContext.Provider
      value={{
        cartItems,
        selectedCustomer,
        globalDiscountPercent,
        payments,
        addToCart,
        removeFromCart,
        updateQuantity,
        updateItemDiscount,
        setCustomer,
        setGlobalDiscount,
        addPayment,
        removePayment,
        clearSale,
        subtotal,
        totalDiscount,
        vatRate,
        vatAmount,
        grandTotal,
        maxDiscountPercent,
        discountPermission,
      }}
    >
      {children}
    </SaleContext.Provider>
  );
};

export const useSale = () => {
  const context = useContext(SaleContext);
  if (context === undefined) {
    throw new Error("useSale must be used within a SaleProvider");
  }
  return context;
};
