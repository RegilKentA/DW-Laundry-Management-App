import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { OrderStatusBadge } from "@/src/components/orders/OrderStatusBadge";
import { PaymentStatusBadge } from "@/src/components/orders/PaymentStatusBadge";
import type { Order } from "@/src/types/order.types";

interface OrderDetailHeaderProps {
  order: Order;
  onBack: () => void;
}

export const OrderDetailHeader: React.FC<OrderDetailHeaderProps> = ({
  order,
  onBack,
}) => {
  return (
    <View className="bg-blue-500 pt-10 pb-4 px-6">
      <View className="flex-row items-center mb-2">
        <TouchableOpacity onPress={onBack} className="mr-4">
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text className="text-white text-lg font-semibold flex-1">
          Order Details
        </Text>
      </View>

      <View className="bg-white/20 rounded-2xl p-4">
        <Text className="text-white text-2xl font-bold mb-2">
          {order.orderNumber}
        </Text>
        <View className="flex-row gap-2">
          <OrderStatusBadge status={order.status} />
          <PaymentStatusBadge
            isPaid={order.paymentStatus === "paid"}
            paymentMethod={order.paymentMethod}
          />
        </View>
      </View>
    </View>
  );
};
