import React, { useState } from "react";
import { View, ScrollView, Alert } from "react-native";
import { NewOrderHeader } from "@/src/components/new-order/NewOrderHeader";
import { NewOrderSummary } from "@/src/components/new-order/NewOrderSummary";
import { ServiceList } from "@/src/components/new-order/ServiceList";
import { CustomerModal } from "@/src/components/new-order/CustomerModal";
import { useNewOrderManager } from "@/src/hooks/useNewOrderManager";
import { MOCK_CUSTOMERS, MOCK_SERVICES } from "@/src/constants/mockData";
import { formatCurrency } from "@/src/utils/formatters";
import type { Customer } from "@/src/types/order.types";

const NewOrder = () => {
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null
  );
  const [showCustomerModal, setShowCustomerModal] = useState(false);

  const {
    selectedServices,
    addService,
    removeService,
    clearServices,
    confirmClearServices,
    totalAmount,
    totalItems,
  } = useNewOrderManager();

  const handleClearOrder = () => {
    confirmClearServices();
    setSelectedCustomer(null);
  };

  const handleCheckout = () => {
    if (!selectedCustomer) {
      Alert.alert("Error", "Please select a customer");
      return;
    }
    if (selectedServices.length === 0) {
      Alert.alert("Error", "Please select at least one service");
      return;
    }

    Alert.alert(
      "Success",
      `Order created for ${selectedCustomer.name}\nTotal: ${formatCurrency(
        totalAmount
      )}`
    );

    // Reset order after successful checkout
    clearServices();
    setSelectedCustomer(null);
  };

  return (
    <View className="flex-1 bg-gray-50">
      <NewOrderHeader
        selectedCustomer={selectedCustomer}
        totalAmount={totalAmount}
        totalItems={totalItems}
        servicesCount={selectedServices.length}
        onCustomerPress={() => setShowCustomerModal(true)}
        onCheckout={handleCheckout}
        onClearOrder={handleClearOrder}
      />

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <NewOrderSummary
          services={selectedServices}
          onAdd={addService}
          onRemove={removeService}
        />

        <ServiceList
          services={MOCK_SERVICES}
          selectedServices={selectedServices}
          onAdd={addService}
          onRemove={removeService}
        />
      </ScrollView>

      <CustomerModal
        visible={showCustomerModal}
        customers={MOCK_CUSTOMERS}
        selectedCustomer={selectedCustomer}
        onSelect={(customer) => {
          setSelectedCustomer(customer);
          setShowCustomerModal(false);
        }}
        onClose={() => setShowCustomerModal(false)}
      />
    </View>
  );
};

export default NewOrder;
