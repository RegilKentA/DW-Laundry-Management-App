import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import type { PaymentStatus } from "@/src/types/checkout.types";

interface PaymentStatusSelectorProps {
  selectedStatus: PaymentStatus;
  onSelect: (status: PaymentStatus) => void;
}

export const PaymentStatusSelector: React.FC<PaymentStatusSelectorProps> = ({
  selectedStatus,
  onSelect,
}) => {
  return (
    <View className="px-4 mt-6">
      <Text className="text-gray-700 font-semibold text-lg mb-3">
        Payment Status
      </Text>
      <View className="flex-row gap-3">
        <TouchableOpacity
          onPress={() => onSelect("paid")}
          className={`flex-1 rounded-xl py-5 border-2 ${
            selectedStatus === "paid"
              ? "bg-green-50 border-green-500"
              : "bg-white border-gray-200"
          }`}
        >
          <View className="items-center">
            <Ionicons
              name="checkmark-circle"
              size={40}
              color={selectedStatus === "paid" ? "#22C55E" : "#9CA3AF"}
            />
            <Text
              className={`mt-2 font-bold text-base ${
                selectedStatus === "paid" ? "text-green-700" : "text-gray-600"
              }`}
            >
              Paid
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => onSelect("unpaid")}
          className={`flex-1 rounded-xl py-5 border-2 ${
            selectedStatus === "unpaid"
              ? "bg-yellow-50 border-yellow-500"
              : "bg-white border-gray-200"
          }`}
        >
          <View className="items-center">
            <Ionicons
              name="time"
              size={40}
              color={selectedStatus === "unpaid" ? "#EAB308" : "#9CA3AF"}
            />
            <Text
              className={`mt-2 font-bold text-base ${
                selectedStatus === "unpaid"
                  ? "text-yellow-700"
                  : "text-gray-600"
              }`}
            >
              Unpaid
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};
