import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

interface QuickAmountGridProps {
  amounts: number[];
  selectedAmount: number | null;
  totalAmount: number;
  onSelect: (amount: number) => void;
}

export const QuickAmountGrid: React.FC<QuickAmountGridProps> = ({
  amounts,
  selectedAmount,
  totalAmount,
  onSelect,
}) => {
  return (
    <View className="px-4 mt-6">
      <Text className="text-gray-700 font-semibold text-base mb-3">
        Quick Payment
      </Text>
      <View className="flex-row flex-wrap gap-3">
        {amounts.map((amount) => (
          <TouchableOpacity
            key={amount}
            onPress={() => onSelect(amount)}
            className={`rounded-xl py-3 px-6 border-2 ${
              selectedAmount === amount
                ? "bg-blue-50 border-blue-500"
                : "bg-white border-gray-200"
            }`}
          >
            <Text
              className={`font-bold text-base ${
                selectedAmount === amount ? "text-blue-700" : "text-gray-700"
              }`}
            >
              ₱{amount.toFixed(2)}
            </Text>
            {amount === totalAmount && (
              <Text className="text-xs text-gray-500 mt-1">Exact</Text>
            )}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};
