import React from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { formatDate, formatTime } from "@/src/utils/dateUtils";

interface CustomerInfoCardProps {
  customer: {
    name: string;
    phone: string;
  };
  createdAt: string;
}

export const CustomerInfoCard: React.FC<CustomerInfoCardProps> = ({
  customer,
  createdAt,
}) => {
  return (
    <View className="px-4 mt-6">
      <Text className="text-gray-700 font-semibold text-base mb-3">
        Customer Information
      </Text>
      <View className="bg-white rounded-2xl p-4 shadow-sm">
        <View className="flex-row items-center mb-2">
          <Ionicons name="person" size={20} color="#6B7280" />
          <Text className="text-gray-800 font-medium ml-3">
            {customer.name}
          </Text>
        </View>
        <View className="flex-row items-center mb-2">
          <Ionicons name="call" size={20} color="#6B7280" />
          <Text className="text-gray-600 ml-3">{customer.phone}</Text>
        </View>
        <View className="flex-row items-center">
          <Ionicons name="time" size={20} color="#6B7280" />
          <Text className="text-gray-600 ml-3">
            {formatDate(createdAt)} at {formatTime(createdAt)}
          </Text>
        </View>
      </View>
    </View>
  );
};
