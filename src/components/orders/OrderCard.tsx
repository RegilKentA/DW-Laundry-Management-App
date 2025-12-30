import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { OrderStatusBadge } from "./OrderStatusBadge";
import { PaymentStatusBadge } from "./PaymentStatusBadge";
import { formatTime } from "@/src/utils/dateUtils";
import type { Order } from "@/src/types/order.types";

interface OrderCardProps {
  order: Order;
  onPress: () => void;
}

export const OrderCard: React.FC<OrderCardProps> = ({ order, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="bg-white rounded-2xl p-4 mb-3 shadow-sm active:bg-gray-50"
    >
      {/* Header */}
      <View className="flex-row justify-between items-start mb-3">
        <View className="flex-1">
          <Text className="text-lg font-bold text-gray-800">
            {order.orderNumber}
          </Text>
          <Text className="text-gray-600 mt-1">{order.customer.name}</Text>
          <Text className="text-gray-500 text-xs">
            {formatTime(order.createdAt)}
          </Text>
          {order.cashier && (
            <View className="flex-row items-center mt-1">
              <Ionicons name="person-circle" size={14} color="#9CA3AF" />
              <Text className="text-gray-400 text-xs ml-1">
                {order.cashier.name}
              </Text>
            </View>
          )}
        </View>
        <View className="items-end gap-2">
          <OrderStatusBadge status={order.status} />
          <PaymentStatusBadge
            isPaid={order.paymentStatus === "paid"}
            paymentMethod={order.paymentMethod}
          />
        </View>
      </View>

      {/* Footer */}
      <View className="flex-row justify-between items-center pt-3 border-t border-gray-100">
        <Text className="text-gray-600 font-medium">Total</Text>
        <Text className="text-blue-600 font-bold text-lg">
          ₱{order.totalAmount.toFixed(2)}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
