import { Ionicons } from "@expo/vector-icons";
export type OrderStatus = "not_picked_up" | "picked_up" | "completed";
export type OrderFilterType =
  | "all"
  | "today"
  | "paid"
  | "unpaid"
  | "not_picked_up"
  | "picked_up"
  | "completed";

export interface Customer {
  id: number;
  name: string;
  phone: string;
}

export interface Service {
  id: number;
  name: string;
  price: number;
  icon: keyof typeof Ionicons.glyphMap;
}

export interface ServiceItem extends Service {
  quantity: number;
}

export interface Order {
  id: number;
  orderNumber: string;
  customer: {
    id: number;
    name: string;
    phone: string;
  };
  services: Array<{
    id: number;
    name: string;
    price: number;
    quantity: number;
  }>;
  totalAmount: number;
  paymentStatus: "paid" | "unpaid";
  paymentMethod: "cash" | "gcash" | null;
  amountPaid: number;
  change: number;
  status: OrderStatus;
  createdAt: string;
  updatedAt?: string;
}

export interface GroupedOrders {
  [date: string]: Order[];
}
