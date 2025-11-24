import React from "react";
import { View, Text } from "react-native";

interface PaymentInfoCardProps {
  paymentMethod: "cash" | "gcash";
  amountPaid: number;
  change: number;
}

export const PaymentInfoCard: React.FC<PaymentInfoCardProps> = ({
  paymentMethod,
  amountPaid,
  change,
}) => {
  return (
    <View className="px-4 mt-6">
      <Text className="text-gray-700 font-semibold text-base mb-3">
        Payment Information
      </Text>
      <View className="bg-white rounded-2xl p-4 shadow-sm">
        <View className="flex-row justify-between mb-2">
          <Text className="text-gray-600">Payment Method</Text>
          <Text className="text-gray-800 font-medium capitalize">
            {paymentMethod}
          </Text>
        </View>
        <View className="flex-row justify-between mb-2">
          <Text className="text-gray-600">Amount Paid</Text>
          <Text className="text-gray-800 font-medium">
            ₱{amountPaid.toFixed(2)}
          </Text>
        </View>
        <View className="flex-row justify-between">
          <Text className="text-gray-600">Change</Text>
          <Text className="text-green-600 font-medium">
            ₱{change.toFixed(2)}
          </Text>
        </View>
      </View>
    </View>
  );
};
