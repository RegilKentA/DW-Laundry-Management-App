import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface ActionButtonProps {
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  color: "green" | "yellow" | "blue" | "purple" | "red";
  onPress: () => void;
}

export const ActionButton: React.FC<ActionButtonProps> = ({
  label,
  icon,
  color,
  onPress,
}) => {
  const colorClasses = {
    green: "bg-green-500",
    yellow: "bg-yellow-500",
    blue: "bg-blue-500",
    purple: "bg-purple-500",
    red: "bg-red-400",
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      className={`${colorClasses[color]} rounded-2xl py-4 mb-3 flex-row items-center justify-center`}
    >
      <Ionicons name={icon} size={24} color="white" />
      <Text className="text-white font-bold text-base ml-2">{label}</Text>
    </TouchableOpacity>
  );
};
