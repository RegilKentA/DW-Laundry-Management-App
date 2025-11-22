import React from "react";
import { View, Text } from "react-native";

interface ChangeDisplayProps {
  change: number;
}

export const ChangeDisplay: React.FC<ChangeDisplayProps> = ({ change }) => {
  return (
    <View className="px-4 mt-6">
      <View
        className={`rounded-2xl p-6 ${
          change >= 0 ? "bg-green-50" : "bg-red-50"
        }`}
      >
        <Text className="text-gray-600 text-sm font-medium mb-2">Change</Text>
        <Text
          className={`text-4xl font-bold ${
            change >= 0 ? "text-green-600" : "text-red-600"
          }`}
        >
          ₱{Math.abs(change).toFixed(2)}
        </Text>
        {change < 0 && (
          <Text className="text-red-600 text-sm mt-2">
            Insufficient payment
          </Text>
        )}
      </View>
    </View>
  );
};
