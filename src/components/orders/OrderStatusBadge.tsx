import React from "react";
import { View, Text } from "react-native";
import type { OrderStatus } from "@/src/types/order.types";

interface OrderStatusBadgeProps {
  status: OrderStatus;
}

export const OrderStatusBadge: React.FC<OrderStatusBadgeProps> = ({
  status,
}) => {
  const getStatusConfig = () => {
    switch (status) {
      case "not_picked_up":
        return {
          bg: "bg-yellow-100",
          text: "text-yellow-700",
          label: "Not Picked Up",
        };
      case "picked_up":
        return { bg: "bg-blue-100", text: "text-blue-700", label: "Picked Up" };
      case "completed":
        return {
          bg: "bg-green-100",
          text: "text-green-700",
          label: "Completed",
        };
    }
  };

  const config = getStatusConfig();

  return (
    <View className={`px-3 py-1 rounded-full ${config.bg}`}>
      <Text className={`text-xs font-semibold ${config.text}`}>
        {config.label}
      </Text>
    </View>
  );
};
