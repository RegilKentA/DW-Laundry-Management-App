import React from "react";
import { View, Text } from "react-native";
import { OrderCard } from "./OrderCard";
import { formatDate } from "@/src/utils/dateUtils";
import type { Order } from "@/src/types/order.types";

interface DateSectionProps {
  dateKey: string;
  orders: Order[];
  onOrderPress: (order: Order) => void;
}

export const DateSection: React.FC<DateSectionProps> = ({
  dateKey,
  orders,
  onOrderPress,
}) => {
  const firstOrder = orders[0];

  return (
    <View className="mb-4">
      {/* Date Header */}
      <View className="bg-gray-100 px-4 py-2 mb-3">
        <Text className="text-gray-700 font-bold text-sm">
          {formatDate(firstOrder.createdAt)}
        </Text>
      </View>

      {/* Orders */}
      <View className="px-4">
        {orders.map((order) => (
          <OrderCard
            key={order.id}
            order={order}
            onPress={() => onOrderPress(order)}
          />
        ))}
      </View>
    </View>
  );
};
