import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, UI } from "@/src/constants/ui.constants";

interface QuantityControlProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  size?: "small" | "medium";
  decreaseColor?: string;
}

export const QuantityControl: React.FC<QuantityControlProps> = ({
  quantity,
  onIncrease,
  onDecrease,
  size = "medium",
  decreaseColor = COLORS.gray,
}) => {
  const isSmall = size === "small";
  const iconSize = isSmall ? UI.ICON_SIZE_SMALL : UI.ICON_SIZE_MEDIUM;
  const padding = isSmall ? "px-3 py-1" : "px-3 py-2";

  return (
    <View className="flex-row items-center bg-white rounded-lg shadow-sm">
      <TouchableOpacity onPress={onDecrease} className={padding}>
        <Ionicons name="remove" size={iconSize} color={decreaseColor} />
      </TouchableOpacity>
      <Text
        className={`text-gray-800 font-bold px-2 min-w-[30px] text-center ${
          isSmall ? "text-sm" : ""
        }`}
      >
        {quantity}
      </Text>
      <TouchableOpacity onPress={onIncrease} className={padding}>
        <Ionicons name="add" size={iconSize} color={COLORS.primary} />
      </TouchableOpacity>
    </View>
  );
};
