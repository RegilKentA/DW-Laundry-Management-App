import React from "react";
import { TouchableOpacity, Text } from "react-native";

interface FilterChipProps {
  label: string;
  isActive: boolean;
  onPress: () => void;
  count?: number;
}

export const FilterChip: React.FC<FilterChipProps> = ({
  label,
  isActive,
  onPress,
  count,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`px-4 py-2 rounded-full mr-2 border-2 ${
        isActive ? "bg-blue-500 border-blue-500" : "bg-white border-gray-200"
      }`}
    >
      <Text
        className={`font-semibold text-sm ${
          isActive ? "text-white" : "text-gray-700"
        }`}
      >
        {label}
        {count !== undefined && ` (${count})`}
      </Text>
    </TouchableOpacity>
  );
};
