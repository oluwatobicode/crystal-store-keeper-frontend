export interface DailyBreakdown {
  totalSale: number;
  totalTransactions: number;
  averageTransactionsValue: number;
  date: string;
}

export interface ProductAnalysis {
  productName: string;
  totalQuantitySold: number;
  totalTransactions: number;
  totalRevenue: number;
  avgValue: number;
}

export interface PaymentMethod {
  totalAmount: number;
  totalTransactions: number;
  method: string;
  percentage: number;
}

export interface StockMovementByType {
  totalMovements: number;
  totalQuantityChange: number;
  movementType: string;
}

export interface StockMovementByProduct {
  productName: string;
  totalMovements: number;
  totalReceived: number;
  totalDeducted: number;
  netChange: number;
}
