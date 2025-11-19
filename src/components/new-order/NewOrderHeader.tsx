import React from "react";
import { View, Text } from "react-native";
import { CustomerSelector } from "./CustomerSelector";
import { TotalAmountCard } from "./TotalAmountCard";
import { ActionButtons } from "./ActionButtons";
import type { Customer } from "@/src/types/order.types";

interface NewOrderHeaderProps {
  selectedCustomer: Customer | null;
  totalAmount: number;
  totalItems: number;
  servicesCount: number;
  onCustomerPress: () => void;
  onCheckout: () => void;
  onClearOrder: () => void;
}

export const NewOrderHeader: React.FC<NewOrderHeaderProps> = ({
  selectedCustomer,
  totalAmount,
  totalItems,
  servicesCount,
  onCustomerPress,
  onCheckout,
  onClearOrder,
}) => {
  return (
    <View className="bg-blue-500 pt-16 pb-6 px-6">
      <Text className="text-white text-lg font-semibold mb-4">New Order</Text>

      <CustomerSelector
        selectedCustomer={selectedCustomer}
        onPress={onCustomerPress}
      />

      <TotalAmountCard
        totalAmount={totalAmount}
        totalItems={totalItems}
        servicesCount={servicesCount}
      />

      <ActionButtons onCheckout={onCheckout} onClearOrder={onClearOrder} />
    </View>
  );
};
