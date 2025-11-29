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
  cashier?: {
    id: number;
    name: string;
  };
}

export const CustomerInfoCard: React.FC<CustomerInfoCardProps> = ({
  customer,
  createdAt,
  cashier,
}) => {
  return (
    <View className="px-4 mt-6">
      <Text className="text-gray-700 font-semibold text-base mb-3">
        Order Information
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
        <View className="flex-row items-center mb-2">
          <Ionicons name="time" size={20} color="#6B7280" />
          <Text className="text-gray-600 ml-3">
            {formatDate(createdAt)} at {formatTime(createdAt)}
          </Text>
        </View>

        {cashier && (
          <View className="flex-row items-center mt-2 pt-2 border-t border-gray-100">
            <Ionicons name="person-circle" size={20} color="#3B82F6" />
            <Text className="text-gray-600 ml-3">
              Cashier:{" "}
              <Text className="font-medium text-gray-800">{cashier.name}</Text>
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};
