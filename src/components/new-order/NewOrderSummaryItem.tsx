import React from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { QuantityControl } from "./QuantityControl";
import { formatCurrency } from "@/src/utils/formatters";
import { COLORS } from "@/src/constants/ui.constants";
import type { ServiceItem } from "@/src/types/order.types";

interface NewOrderSummaryItemProps {
  service: ServiceItem;
  onAdd: () => void;
  onRemove: () => void;
  isLast: boolean;
}

export const OrderSummaryItem: React.FC<NewOrderSummaryItemProps> = ({
  service,
  onAdd,
  onRemove,
  isLast,
}) => {
  return (
    <View
      className={`flex-row justify-between items-center py-3 ${
        !isLast ? "border-b border-gray-100" : ""
      }`}
    >
      <View className="flex-row items-center flex-1">
        <View className="w-8 h-8 rounded-full bg-blue-50 items-center justify-center mr-3">
          <Ionicons name={service.icon} size={16} color={COLORS.primary} />
        </View>
        <View className="flex-1">
          <Text className="text-gray-800 font-medium">{service.name}</Text>
          <Text className="text-gray-500 text-xs">
            {formatCurrency(service.price)} × {service.quantity}
          </Text>
        </View>
      </View>
      <View className="flex-row items-center gap-3">
        <Text className="text-blue-600 font-bold mr-3">
          {formatCurrency(service.price * service.quantity)}
        </Text>
        <QuantityControl
          quantity={service.quantity}
          onIncrease={onAdd}
          onDecrease={onRemove}
          size="small"
        />
      </View>
    </View>
  );
};
