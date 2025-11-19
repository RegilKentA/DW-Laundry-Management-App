import React from "react";
import { View, Text, TouchableOpacity, ScrollView, Modal } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { getInitials } from "@/src/utils/formatters";
import { COLORS, UI } from "@/src/constants/ui.constants";
import type { Customer } from "@/src/types/order.types";

interface CustomerModalProps {
  visible: boolean;
  customers: Customer[];
  selectedCustomer: Customer | null;
  onSelect: (customer: Customer) => void;
  onClose: () => void;
}

export const CustomerModal: React.FC<CustomerModalProps> = ({
  visible,
  customers,
  selectedCustomer,
  onSelect,
  onClose,
}) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-end bg-black/50">
        <View className="bg-white rounded-t-3xl max-h-[70%]">
          <View className="flex-row items-center justify-between p-6 border-b border-gray-200">
            <Text className="text-xl font-bold text-gray-800">
              Select Customer
            </Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons
                name="close"
                size={UI.ICON_SIZE_XLARGE}
                color={COLORS.gray}
              />
            </TouchableOpacity>
          </View>

          <ScrollView className="px-4 py-2">
            {customers.map((customer) => {
              const isSelected = selectedCustomer?.id === customer.id;
              return (
                <TouchableOpacity
                  key={customer.id}
                  onPress={() => onSelect(customer)}
                  className={`flex-row items-center p-4 rounded-xl mb-2 ${
                    isSelected
                      ? "bg-blue-50 border-2 border-blue-500"
                      : "bg-gray-50"
                  }`}
                >
                  <View
                    className={`w-12 h-12 rounded-full items-center justify-center mr-4 ${
                      isSelected ? "bg-blue-500" : "bg-gray-300"
                    }`}
                  >
                    <Text
                      className={`text-lg font-bold ${
                        isSelected ? "text-white" : "text-gray-600"
                      }`}
                    >
                      {getInitials(customer.name)}
                    </Text>
                  </View>
                  <View className="flex-1">
                    <Text
                      className={`font-semibold text-base ${
                        isSelected ? "text-blue-700" : "text-gray-800"
                      }`}
                    >
                      {customer.name}
                    </Text>
                    <Text className="text-gray-500 text-sm">
                      {customer.phone}
                    </Text>
                  </View>
                  {isSelected && (
                    <Ionicons
                      name="checkmark-circle"
                      size={UI.ICON_SIZE_LARGE}
                      color={COLORS.primary}
                    />
                  )}
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};
