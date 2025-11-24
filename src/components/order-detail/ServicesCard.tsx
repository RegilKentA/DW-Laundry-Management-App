import React from "react";
import { View, Text } from "react-native";

interface ServicesCardProps {
  services: Array<{
    id: number;
    name: string;
    price: number;
    quantity: number;
  }>;
  totalAmount: number;
}

export const ServicesCard: React.FC<ServicesCardProps> = ({
  services,
  totalAmount,
}) => {
  return (
    <View className="px-4 mt-6">
      <Text className="text-gray-700 font-semibold text-base mb-3">
        Services
      </Text>
      <View className="bg-white rounded-2xl p-4 shadow-sm">
        {services.map((service, index) => (
          <View
            key={service.id}
            className={`flex-row justify-between py-3 ${
              index !== services.length - 1 ? "border-b border-gray-100" : ""
            }`}
          >
            <View className="flex-1">
              <Text className="text-gray-800 font-medium">{service.name}</Text>
              <Text className="text-gray-500 text-sm mt-1">
                ₱{service.price.toFixed(2)} × {service.quantity}
              </Text>
            </View>
            <Text className="text-gray-800 font-bold">
              ₱{(service.price * service.quantity).toFixed(2)}
            </Text>
          </View>
        ))}

        <View className="flex-row justify-between pt-4 border-t-2 border-gray-200 mt-2">
          <Text className="text-gray-800 font-bold text-lg">Total</Text>
          <Text className="text-blue-600 font-bold text-xl">
            ₱{totalAmount.toFixed(2)}
          </Text>
        </View>
      </View>
    </View>
  );
};
