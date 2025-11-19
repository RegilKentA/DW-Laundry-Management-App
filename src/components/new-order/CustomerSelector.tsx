import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import type { Customer } from "@/src/types/order.types";

interface CustomerSelectorProps {
  selectedCustomer: Customer | null;
  onPress: () => void;
}

export const CustomerSelector: React.FC<CustomerSelectorProps> = ({
  selectedCustomer,
  onPress,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="bg-white/20 rounded-xl p-4 mb-4 flex-row items-center justify-between"
    >
      <View className="flex-1">
        <Text className="text-white/80 text-xs font-medium mb-1">Customer</Text>
        {selectedCustomer ? (
          <View>
            <Text className="text-white font-semibold text-base">
              {selectedCustomer.name}
            </Text>
            <Text className="text-white/70 text-xs">
              {selectedCustomer.phone}
            </Text>
          </View>
        ) : (
          <Text className="text-white text-base">Select a customer</Text>
        )}
      </View>
      <Ionicons name="chevron-down" size={24} color="white" />
    </TouchableOpacity>
  );
};
