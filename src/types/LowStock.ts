export interface LowStock {
  _id: string;
  name: string;
  daysLeft: number;
  currentStock: number;
  reorderLevel: number;
  suggestedOrder: number;
}
