import { useState } from "react";
import { Alert } from "react-native";
import type { Order, OrderStatus } from "@/src/types/order.types";

export const useOrderDetail = (initialOrder: Order) => {
  const [order, setOrder] = useState<Order>(initialOrder);

  const updatePaymentStatus = () => {
    const newStatus = order.paymentStatus === "paid" ? "unpaid" : "paid";

    Alert.alert(
      `Mark as ${newStatus === "paid" ? "Paid" : "Unpaid"}`,
      `Are you sure you want to mark this order as ${newStatus}?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Confirm",
          onPress: () => {
            setOrder({
              ...order,
              paymentStatus: newStatus,
              paymentMethod: newStatus === "paid" ? "cash" : null,
              amountPaid: newStatus === "paid" ? order.totalAmount : 0,
              change: 0,
            });

            // TODO: Update in database/API
            console.log("Payment status updated:", newStatus);
          },
        },
      ]
    );
  };

  const updateOrderStatus = (newStatus: OrderStatus) => {
    const statusLabels = {
      not_picked_up: "Not Picked Up",
      picked_up: "Picked Up",
      completed: "Completed",
    };

    Alert.alert(
      "Update Status",
      `Change order status to "${statusLabels[newStatus]}"?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Confirm",
          onPress: () => {
            setOrder({
              ...order,
              status: newStatus,
            });

            // TODO: Update in database/API
            console.log("Order status updated:", newStatus);

            if (newStatus === "completed") {
              Alert.alert("Success", "Order marked as completed!");
            }
          },
        },
      ]
    );
  };

  const deleteOrder = (onSuccess: () => void) => {
    Alert.alert(
      "Delete Order",
      "Are you sure you want to delete this order? This action cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            // TODO: Delete from database/API
            console.log("Order deleted:", order.id);
            Alert.alert("Success", "Order deleted successfully", [
              { text: "OK", onPress: onSuccess },
            ]);
          },
        },
      ]
    );
  };

  return {
    order,
    updatePaymentStatus,
    updateOrderStatus,
    deleteOrder,
  };
};
