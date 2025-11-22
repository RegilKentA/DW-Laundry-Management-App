import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import type { PaymentMethod } from "@/src/types/checkout.types";

interface PaymentMethodSelectorProps {
  selectedMethod: PaymentMethod;
  onSelect: (method: PaymentMethod) => void;
}

export const PaymentMethodSelector: React.FC<PaymentMethodSelectorProps> = ({
  selectedMethod,
  onSelect,
}) => {
  return (
    <View className="px-4 mt-6">
      <Text className="text-gray-700 font-semibold text-base mb-3">
        Payment Method
      </Text>
      <View className="flex-row gap-3">
        <TouchableOpacity
          onPress={() => onSelect("cash")}
          className={`flex-1 rounded-xl py-4 border-2 ${
            selectedMethod === "cash"
              ? "bg-blue-50 border-blue-500"
              : "bg-white border-gray-200"
          }`}
        >
          <View className="items-center">
            <Ionicons
              name="cash"
              size={32}
              color={selectedMethod === "cash" ? "#3B82F6" : "#9CA3AF"}
            />
            <Text
              className={`mt-2 font-semibold ${
                selectedMethod === "cash" ? "text-blue-700" : "text-gray-600"
              }`}
            >
              Cash
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => onSelect("gcash")}
          className={`flex-1 rounded-xl py-4 border-2 ${
            selectedMethod === "gcash"
              ? "bg-blue-50 border-blue-500"
              : "bg-white border-gray-200"
          }`}
        >
          <View className="items-center">
            <Ionicons
              name="phone-portrait"
              size={32}
              color={selectedMethod === "gcash" ? "#3B82F6" : "#9CA3AF"}
            />
            <Text
              className={`mt-2 font-semibold ${
                selectedMethod === "gcash" ? "text-blue-700" : "text-gray-600"
              }`}
            >
              GCash
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};
