import React from "react";
import { View, Text } from "react-native";

interface CheckoutSummaryProps {
  services: Array<{
    id: number;
    name: string;
    price: number;
    quantity: number;
  }>;
  totalAmount: number;
}

export const CheckoutSummary: React.FC<CheckoutSummaryProps> = ({
  services,
  totalAmount,
}) => {
  return (
    <View className="px-4 mt-6 mb-8">
      <Text className="text-gray-700 font-semibold text-base mb-3">
        Order Summary
      </Text>
      <View className="bg-white rounded-2xl p-4">
        {services.map((service, index) => (
          <View
            key={service.id}
            className={`flex-row justify-between py-2 ${
              index !== services.length - 1 ? "border-b border-gray-100" : ""
            }`}
          >
            <Text className="text-gray-800 flex-1">
              {service.name} × {service.quantity}
            </Text>
            <Text className="text-gray-800 font-semibold">
              ₱{(service.price * service.quantity).toFixed(2)}
            </Text>
          </View>
        ))}
        <View className="flex-row justify-between pt-4 border-t-2 border-gray-200 mt-2">
          <Text className="text-gray-800 font-bold text-lg">Total</Text>
          <Text className="text-blue-600 font-bold text-lg">
            ₱{totalAmount.toFixed(2)}
          </Text>
        </View>
      </View>
    </View>
  );
};
