import React from "react";
import { View, Text, TextInput } from "react-native";

interface CustomAmountInputProps {
  value: string;
  onChange: (value: string) => void;
}

export const CustomAmountInput: React.FC<CustomAmountInputProps> = ({
  value,
  onChange,
}) => {
  const handleChange = (text: string) => {
    const cleaned = text.replace(/[^0-9.]/g, "");
    onChange(cleaned);
  };

  return (
    <View className="px-4 mt-6">
      <Text className="text-gray-700 font-semibold text-base mb-3">
        Custom Amount
      </Text>
      <View className="bg-white rounded-xl border-2 border-gray-200 flex-row items-center px-4">
        <Text className="text-gray-600 text-xl font-semibold">₱</Text>
        <TextInput
          value={value}
          onChangeText={handleChange}
          placeholder="Enter amount"
          keyboardType="decimal-pad"
          className="flex-1 py-4 px-3 text-xl font-semibold text-gray-800"
        />
      </View>
    </View>
  );
};
