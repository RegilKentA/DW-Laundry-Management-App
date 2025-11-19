import React from "react";
import { View, Text } from "react-native";
import { OrderSummaryItem } from "./NewOrderSummaryItem";
import type { Service, ServiceItem } from "@/src/types/order.types";

interface NewOrderSummaryProps {
  services: ServiceItem[];
  onAdd: (service: Service | ServiceItem) => void;
  onRemove: (serviceId: number) => void;
}

export const NewOrderSummary: React.FC<NewOrderSummaryProps> = ({
  services,
  onAdd,
  onRemove,
}) => {
  if (services.length === 0) return null;

  return (
    <View className="px-4 mt-6">
      <Text className="text-gray-700 font-semibold text-base mb-3">
        Order Summary
      </Text>
      <View className="bg-white rounded-2xl p-4 shadow-sm">
        {services.map((service, index) => (
          <OrderSummaryItem
            key={service.id}
            service={service}
            onAdd={() => onAdd(service)}
            onRemove={() => onRemove(service.id)}
            isLast={index === services.length - 1}
          />
        ))}
      </View>
    </View>
  );
};
