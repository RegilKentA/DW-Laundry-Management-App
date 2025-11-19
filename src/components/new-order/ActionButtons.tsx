import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

interface ActionButtonsProps {
  onCheckout: () => void;
  onClearOrder: () => void;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({
  onCheckout,
  onClearOrder,
}) => {
  return (
    <View className="flex-row gap-3">
      <TouchableOpacity
        onPress={onCheckout}
        className="flex-1 bg-white rounded-xl py-3 active:bg-gray-100"
      >
        <Text className="text-blue-600 text-center text-base font-bold">
          Checkout
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={onClearOrder}
        className="flex-1 bg-red-400 rounded-xl py-3 active:bg-red-500"
      >
        <Text className="text-white text-center text-base font-bold">
          Clear Order
        </Text>
      </TouchableOpacity>
    </View>
  );
};
