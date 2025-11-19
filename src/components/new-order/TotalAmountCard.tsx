import React from "react";
import { View, Text } from "react-native";
import { formatCurrency, pluralize } from "@/src/utils/formatters";

interface TotalAmountCardProps {
  totalAmount: number;
  totalItems: number;
  servicesCount: number;
}

export const TotalAmountCard: React.FC<TotalAmountCardProps> = ({
  totalAmount,
  totalItems,
  servicesCount,
}) => {
  return (
    <View className="bg-white/20 rounded-xl p-4 mb-4">
      <Text className="text-white/80 text-xs font-medium mb-1">
        Total Amount
      </Text>
      <Text className="text-white text-3xl font-bold">
        {formatCurrency(totalAmount)}
      </Text>
      <Text className="text-white/70 text-xs mt-1">
        {totalItems} {pluralize(totalItems, "item")} • {servicesCount}{" "}
        {pluralize(servicesCount, "service")}
      </Text>
    </View>
  );
};
