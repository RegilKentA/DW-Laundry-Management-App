import React from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface PaymentStatusBadgeProps {
  isPaid: boolean;
  paymentMethod?: "cash" | "gcash" | null;
}

export const PaymentStatusBadge: React.FC<PaymentStatusBadgeProps> = ({
  isPaid,
  paymentMethod,
}) => {
  if (!isPaid) {
    return (
      <View className="flex-row items-center bg-red-100 px-2 py-1 rounded">
        <Ionicons name="close-circle" size={14} color="#DC2626" />
        <Text className="text-red-700 text-xs font-semibold ml-1">Unpaid</Text>
      </View>
    );
  }

  return (
    <View className="flex-row items-center bg-green-100 px-2 py-1 rounded">
      <Ionicons name="checkmark-circle" size={14} color="#16A34A" />
      <Text className="text-green-700 text-xs font-semibold ml-1">
        Paid{" "}
        {paymentMethod && `(${paymentMethod === "cash" ? "Cash" : "GCash"})`}
      </Text>
    </View>
  );
};
