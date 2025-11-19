import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { QuantityControl } from "./QuantityControl";
import { formatCurrency } from "@/src/utils/formatters";
import { COLORS } from "@/src/constants/ui.constants";
import type { Service } from "@/src/types/order.types";

interface ServiceItemProps {
  service: Service;
  quantity: number;
  onAdd: () => void;
  onRemove: () => void;
  isLast: boolean;
}

export const ServiceItem: React.FC<ServiceItemProps> = React.memo(
  ({ service, quantity, onAdd, onRemove, isLast }) => {
    const isSelected = quantity > 0;

    return (
      <View
        className={`flex-row items-center px-5 py-4 ${
          !isLast ? "border-b border-gray-100" : ""
        } ${isSelected ? "bg-blue-50" : "bg-white"}`}
      >
        <View
          className={`w-12 h-12 rounded-xl items-center justify-center mr-4 ${
            isSelected ? "bg-blue-500" : "bg-gray-100"
          }`}
        >
          <Ionicons
            name={service.icon}
            size={24}
            color={isSelected ? COLORS.white : COLORS.gray}
          />
        </View>
        <View className="flex-1">
          <Text
            className={`font-semibold ${
              isSelected ? "text-blue-700" : "text-gray-800"
            }`}
          >
            {service.name}
          </Text>
          <Text className="text-gray-500 text-sm">
            {formatCurrency(service.price)}
          </Text>
        </View>
        {isSelected ? (
          <QuantityControl
            quantity={quantity}
            onIncrease={onAdd}
            onDecrease={onRemove}
            decreaseColor={COLORS.error}
          />
        ) : (
          <TouchableOpacity
            onPress={onAdd}
            className="bg-blue-500 rounded-lg px-4 py-2"
          >
            <Text className="text-white font-semibold">Add</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }
);

ServiceItem.displayName = "ServiceItem";
