import { useState, useMemo } from "react";
import type {
  Order,
  OrderFilterType,
  GroupedOrders,
} from "@/src/types/order.types";
import { getDateKey, isToday } from "@/src/utils/dateUtils";

// Mock data - replace with API call
const MOCK_ORDERS: Order[] = [
  {
    id: 1,
    orderNumber: "ORD-001",
    customer: { id: 1, name: "John Smith", phone: "(555) 123-4567" },
    services: [
      { id: 1, name: "Haircut", price: 25, quantity: 1 },
      { id: 2, name: "Beard Trim", price: 15, quantity: 1 },
    ],
    totalAmount: 40,
    paymentStatus: "paid",
    paymentMethod: "cash",
    amountPaid: 50,
    change: 10,
    status: "completed",
    cashier: { id: 1, name: "Maria Santos" },
    createdAt: new Date().toISOString(),
  },
  {
    id: 2,
    orderNumber: "ORD-002",
    customer: { id: 2, name: "Sarah Johnson", phone: "(555) 987-6543" },
    services: [{ id: 3, name: "Hair Coloring", price: 80, quantity: 1 }],
    totalAmount: 80,
    paymentStatus: "unpaid",
    paymentMethod: null,
    amountPaid: 0,
    change: 0,
    status: "not_picked_up",
    cashier: { id: 2, name: "Juan Dela Cruz" },
    createdAt: new Date(Date.now() - 86400000).toISOString(), // Yesterday
  },
  {
    id: 3,
    orderNumber: "ORD-003",
    customer: { id: 3, name: "Mike Davis", phone: "(555) 456-7890" },
    services: [
      { id: 4, name: "Manicure", price: 35, quantity: 1 },
      { id: 5, name: "Pedicure", price: 45, quantity: 1 },
    ],
    totalAmount: 80,
    paymentStatus: "paid",
    paymentMethod: "gcash",
    amountPaid: 80,
    change: 0,
    status: "picked_up",
    cashier: { id: 1, name: "Maria Santos" },
    createdAt: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
  },
];

export const useOrders = () => {
  const [orders, setOrders] = useState<Order[]>(MOCK_ORDERS);
  const [filter, setFilter] = useState<OrderFilterType>("all");

  // Filter orders
  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      switch (filter) {
        case "today":
          return isToday(order.createdAt);
        case "paid":
          return order.paymentStatus === "paid";
        case "unpaid":
          return order.paymentStatus === "unpaid";
        case "not_picked_up":
          return order.status === "not_picked_up";
        case "picked_up":
          return order.status === "picked_up";
        case "completed":
          return order.status === "completed";
        default:
          return true;
      }
    });
  }, [orders, filter]);

  // Group orders by date
  const groupedOrders = useMemo(() => {
    const grouped: GroupedOrders = {};

    // Sort by date (newest first)
    const sorted = [...filteredOrders].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    sorted.forEach((order) => {
      const dateKey = getDateKey(order.createdAt);
      if (!grouped[dateKey]) {
        grouped[dateKey] = [];
      }
      grouped[dateKey].push(order);
    });

    return grouped;
  }, [filteredOrders]);

  return {
    orders,
    filteredOrders,
    groupedOrders,
    filter,
    setFilter,
  };
};
