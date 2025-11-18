import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const NewOrder = () => {
  // Types
  interface Customer {
    id: number;
    name: string;
    phone: string;
  }
  interface ServiceItem {
    id: number;
    name: string;
    price: number;
    icon: keyof typeof Ionicons.glyphMap;
    quantity: number;
  }

  // Sample data
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null
  );
  const [selectedServices, setSelectedServices] = useState<ServiceItem[]>([]);
  const [showCustomerModal, setShowCustomerModal] = useState(false);

  const customers: Customer[] = [
    { id: 1, name: "John Smith", phone: "(555) 123-4567" },
    { id: 2, name: "Sarah Johnson", phone: "(555) 987-6543" },
    { id: 3, name: "Mike Davis", phone: "(555) 456-7890" },
    { id: 4, name: "Emily Brown", phone: "(555) 234-5678" },
    { id: 5, name: "David Wilson", phone: "(555) 345-6789" },
  ];

  const availableServices = [
    { id: 1, name: "Haircut", price: 25.0, icon: "cut-outline" as const },
    {
      id: 2,
      name: "Hair Coloring",
      price: 80.0,
      icon: "color-palette-outline" as const,
    },
    { id: 3, name: "Beard Trim", price: 15.0, icon: "cut-outline" as const },
    {
      id: 4,
      name: "Shampoo & Blow Dry",
      price: 30.0,
      icon: "water-outline" as const,
    },
    {
      id: 5,
      name: "Hair Treatment",
      price: 50.0,
      icon: "sparkles-outline" as const,
    },
    {
      id: 6,
      name: "Manicure",
      price: 35.0,
      icon: "hand-left-outline" as const,
    },
    {
      id: 7,
      name: "Pedicure",
      price: 45.0,
      icon: "footsteps-outline" as const,
    },
    { id: 8, name: "Facial", price: 60.0, icon: "happy-outline" as const },
  ];

  const totalAmount = selectedServices.reduce(
    (sum, service) => sum + service.price * service.quantity,
    0
  );

  const totalItems = selectedServices.reduce(
    (sum, service) => sum + service.quantity,
    0
  );

  const addService = (service: ServiceItem | (typeof availableServices)[0]) => {
    const existingService = selectedServices.find((s) => s.id === service.id);
    if (existingService) {
      setSelectedServices(
        selectedServices.map((s) =>
          s.id === service.id ? { ...s, quantity: s.quantity + 1 } : s
        )
      );
    } else {
      setSelectedServices([...selectedServices, { ...service, quantity: 1 }]);
    }
  };

  const removeService = (serviceId: number) => {
    const existingService = selectedServices.find((s) => s.id === serviceId);
    if (existingService && existingService.quantity > 1) {
      setSelectedServices(
        selectedServices.map((s) =>
          s.id === serviceId ? { ...s, quantity: s.quantity - 1 } : s
        )
      );
    } else {
      setSelectedServices(selectedServices.filter((s) => s.id !== serviceId));
    }
  };

  const clearOrder = () => {
    Alert.alert(
      "Clear Order",
      "Are you sure you want to clear the current order?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Clear",
          style: "destructive",
          onPress: () => {
            setSelectedServices([]);
            setSelectedCustomer(null);
          },
        },
      ]
    );
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
      `Order created for ${
        selectedCustomer.name
      }\nTotal: $${totalAmount.toFixed(2)}`
    );
  };

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header with Total, Customer Selection, and Action Buttons */}
      <View className="bg-blue-500 pt-16 pb-6 px-6">
        <Text className="text-white text-lg font-semibold mb-4">New Order</Text>

        {/* Customer Selection Dropdown */}
        <TouchableOpacity
          onPress={() => setShowCustomerModal(true)}
          className="bg-white/20 rounded-xl p-4 mb-4 flex-row items-center justify-between"
        >
          <View className="flex-1">
            <Text className="text-white/80 text-xs font-medium mb-1">
              Customer
            </Text>
            {selectedCustomer ? (
              <View>
                <Text className="text-white font-semibold text-base">
                  {selectedCustomer.name}
                </Text>
                <Text className="text-white/70 text-xs">
                  {selectedCustomer.phone}
                </Text>
              </View>
            ) : (
              <Text className="text-white text-base">Select a customer</Text>
            )}
          </View>
          <Ionicons name="chevron-down" size={24} color="white" />
        </TouchableOpacity>

        {/* Total Amount */}
        <View className="bg-white/20 rounded-xl p-4 mb-4">
          <Text className="text-white/80 text-xs font-medium mb-1">
            Total Amount
          </Text>
          <Text className="text-white text-3xl font-bold">
            ₱{totalAmount.toFixed(2)}
          </Text>
          <Text className="text-white/70 text-xs mt-1">
            {totalItems} item{totalItems !== 1 ? "s" : ""} •{" "}
            {selectedServices.length} service
            {selectedServices.length !== 1 ? "s" : ""}
          </Text>
        </View>

        {/* Action Buttons */}
        <View className="flex-row gap-3">
          <TouchableOpacity
            onPress={handleCheckout}
            className="flex-1 bg-white rounded-xl py-3 active:bg-gray-100"
          >
            <Text className="text-blue-600 text-center text-base font-bold">
              Checkout
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={clearOrder}
            className="flex-1 bg-red-400 rounded-xl py-3 active:bg-red-500"
          >
            <Text className="text-white text-center text-base font-bold">
              Clear Order
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Selected Services Summary */}
        {selectedServices.length > 0 && (
          <View className="px-4 mt-6">
            <Text className="text-gray-700 font-semibold text-base mb-3">
              Order Summary
            </Text>
            <View className="bg-white rounded-2xl p-4 shadow-sm">
              {selectedServices.map((service, index) => (
                <View
                  key={service.id}
                  className={`flex-row justify-between items-center py-3 ${
                    index !== selectedServices.length - 1
                      ? "border-b border-gray-100"
                      : ""
                  }`}
                >
                  <View className="flex-row items-center flex-1">
                    <View className="w-8 h-8 rounded-full bg-blue-50 items-center justify-center mr-3">
                      <Ionicons name={service.icon} size={16} color="#3B82F6" />
                    </View>
                    <View className="flex-1">
                      <Text className="text-gray-800 font-medium">
                        {service.name}
                      </Text>
                      <Text className="text-gray-500 text-xs">
                        ₱{service.price.toFixed(2)} × {service.quantity}
                      </Text>
                    </View>
                  </View>
                  <View className="flex-row items-center gap-3">
                    <Text className="text-blue-600 font-bold mr-3">
                      ${(service.price * service.quantity).toFixed(2)}
                    </Text>
                    <View className="flex-row items-center bg-gray-100 rounded-lg">
                      <TouchableOpacity
                        onPress={() => removeService(service.id)}
                        className="px-3 py-1"
                      >
                        <Ionicons name="remove" size={18} color="#6B7280" />
                      </TouchableOpacity>
                      <Text className="text-gray-800 font-semibold px-2">
                        {service.quantity}
                      </Text>
                      <TouchableOpacity
                        onPress={() => addService(service)}
                        className="px-3 py-1"
                      >
                        <Ionicons name="add" size={18} color="#3B82F6" />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Available Services List */}
        <View className="px-4 mt-6 mb-8">
          <Text className="text-gray-700 font-semibold text-base mb-3">
            Available Services
          </Text>
          <View className="bg-white rounded-2xl overflow-hidden shadow-sm">
            {availableServices.map((service, index) => {
              const selectedService = selectedServices.find(
                (s) => s.id === service.id
              );
              const quantity = selectedService?.quantity || 0;
              return (
                <View
                  key={service.id}
                  className={`flex-row items-center px-5 py-4 ${
                    index !== availableServices.length - 1
                      ? "border-b border-gray-100"
                      : ""
                  } ${quantity > 0 ? "bg-blue-50" : "bg-white"}`}
                >
                  <View
                    className={`w-12 h-12 rounded-xl items-center justify-center mr-4 ${
                      quantity > 0 ? "bg-blue-500" : "bg-gray-100"
                    }`}
                  >
                    <Ionicons
                      name={service.icon}
                      size={24}
                      color={quantity > 0 ? "#FFFFFF" : "#6B7280"}
                    />
                  </View>
                  <View className="flex-1">
                    <Text
                      className={`font-semibold ${
                        quantity > 0 ? "text-blue-700" : "text-gray-800"
                      }`}
                    >
                      {service.name}
                    </Text>
                    <Text className="text-gray-500 text-sm">
                      ₱{service.price.toFixed(2)}
                    </Text>
                  </View>
                  {quantity > 0 ? (
                    <View className="flex-row items-center bg-white rounded-lg shadow-sm">
                      <TouchableOpacity
                        onPress={() => removeService(service.id)}
                        className="px-3 py-2"
                      >
                        <Ionicons name="remove" size={20} color="#EF4444" />
                      </TouchableOpacity>
                      <Text className="text-gray-800 font-bold px-2 min-w-[30px] text-center">
                        {quantity}
                      </Text>
                      <TouchableOpacity
                        onPress={() => addService(service)}
                        className="px-3 py-2"
                      >
                        <Ionicons name="add" size={20} color="#3B82F6" />
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <TouchableOpacity
                      onPress={() => addService(service)}
                      className="bg-blue-500 rounded-lg px-4 py-2"
                    >
                      <Text className="text-white font-semibold">Add</Text>
                    </TouchableOpacity>
                  )}
                </View>
              );
            })}
          </View>
        </View>
      </ScrollView>

      {/* Customer Selection Modal */}
      <Modal
        visible={showCustomerModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowCustomerModal(false)}
      >
        <View className="flex-1 justify-end bg-black/50">
          <View className="bg-white rounded-t-3xl max-h-[70%]">
            <View className="flex-row items-center justify-between p-6 border-b border-gray-200">
              <Text className="text-xl font-bold text-gray-800">
                Select Customer
              </Text>
              <TouchableOpacity onPress={() => setShowCustomerModal(false)}>
                <Ionicons name="close" size={28} color="#6B7280" />
              </TouchableOpacity>
            </View>
            <ScrollView className="px-4 py-2">
              {customers.map((customer) => (
                <TouchableOpacity
                  key={customer.id}
                  onPress={() => {
                    setSelectedCustomer(customer);
                    setShowCustomerModal(false);
                  }}
                  className={`flex-row items-center p-4 rounded-xl mb-2 ${
                    selectedCustomer?.id === customer.id
                      ? "bg-blue-50 border-2 border-blue-500"
                      : "bg-gray-50"
                  }`}
                >
                  <View
                    className={`w-12 h-12 rounded-full items-center justify-center mr-4 ${
                      selectedCustomer?.id === customer.id
                        ? "bg-blue-500"
                        : "bg-gray-300"
                    }`}
                  >
                    <Text
                      className={`text-lg font-bold ${
                        selectedCustomer?.id === customer.id
                          ? "text-white"
                          : "text-gray-600"
                      }`}
                    >
                      {customer.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </Text>
                  </View>
                  <View className="flex-1">
                    <Text
                      className={`font-semibold text-base ${
                        selectedCustomer?.id === customer.id
                          ? "text-blue-700"
                          : "text-gray-800"
                      }`}
                    >
                      {customer.name}
                    </Text>
                    <Text className="text-gray-500 text-sm">
                      {customer.phone}
                    </Text>
                  </View>
                  {selectedCustomer?.id === customer.id && (
                    <Ionicons
                      name="checkmark-circle"
                      size={24}
                      color="#3B82F6"
                    />
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default NewOrder;
