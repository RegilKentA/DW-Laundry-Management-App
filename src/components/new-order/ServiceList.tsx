import React from "react";
import { View, Text } from "react-native";
import { ServiceItem } from "./ServiceItem";
import type {
  Service,
  ServiceItem as ServiceItemType,
} from "@/src/types/order.types";

interface ServiceListProps {
  services: Service[];
  selectedServices: ServiceItemType[];
  onAdd: (service: Service) => void;
  onRemove: (serviceId: number) => void;
}

export const ServiceList: React.FC<ServiceListProps> = ({
  services,
  selectedServices,
  onAdd,
  onRemove,
}) => {
  const getServiceQuantity = (serviceId: number): number => {
    return selectedServices.find((s) => s.id === serviceId)?.quantity || 0;
  };

  return (
    <View className="px-4 mt-6 mb-8">
      <Text className="text-gray-700 font-semibold text-base mb-3">
        Available Services
      </Text>
      <View className="bg-white rounded-2xl overflow-hidden shadow-sm">
        {services.map((service, index) => (
          <ServiceItem
            key={service.id}
            service={service}
            quantity={getServiceQuantity(service.id)}
            onAdd={() => onAdd(service)}
            onRemove={() => onRemove(service.id)}
            isLast={index === services.length - 1}
          />
        ))}
      </View>
    </View>
  );
};
