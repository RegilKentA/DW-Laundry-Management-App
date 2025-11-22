import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface CheckoutHeaderProps {
  totalAmount: number;
  customerName: string;
  change: number | null;
  services: Array<{
    id: number;
    name: string;
    price: number;
    quantity: number;
  }>;
  onBack: () => void;
}

export const CheckoutHeader: React.FC<CheckoutHeaderProps> = ({
  totalAmount,
  customerName,
  change,
  services,
  onBack,
}) => {
  const showChange = change !== null && change !== 0;

  return (
    <View className="bg-blue-500 pt-16 pb-6 px-6">
      {/* Top Bar with Back Button */}
      <View className="flex-row items-center mb-4">
        <TouchableOpacity onPress={onBack} className="mr-4">
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text className="text-white text-lg font-semibold flex-1">
          Checkout
        </Text>
      </View>

      {/* Total and Change Row */}
      <View className="flex-row gap-3 mb-4">
        {/* Total Amount Card */}
        <View
          className={`bg-white/20 rounded-2xl p-4 ${
            showChange ? "flex-1" : "flex-1"
          }`}
        >
          <Text className="text-white/80 text-xs font-medium mb-1">
            Total Amount
          </Text>
          <Text className="text-white text-3xl font-bold">
            ₱{totalAmount.toFixed(2)}
          </Text>
          <Text className="text-white/70 text-xs mt-2">{customerName}</Text>
        </View>

        {/* Change Card - Only show if change is calculated */}
        {showChange && (
          <View
            className={`rounded-2xl p-4 flex-1 ${
              change >= 0 ? "bg-green-500/30" : "bg-red-500/30"
            }`}
          >
            <Text className="text-white/80 text-xs font-medium mb-1">
              Change
            </Text>
            <Text
              className={`text-3xl font-bold ${
                change >= 0 ? "text-white" : "text-red-100"
              }`}
            >
              ₱{Math.abs(change).toFixed(2)}
            </Text>
            {change < 0 && (
              <Text className="text-red-100 text-xs mt-2">Insufficient</Text>
            )}
          </View>
        )}
      </View>

      {/* Order Summary */}
      <View className="bg-white/20 rounded-2xl p-4">
        <Text className="text-white/90 text-sm font-semibold mb-2">
          Order Summary
        </Text>
        <ScrollView className="max-h-32" showsVerticalScrollIndicator={false}>
          {services.map((service, index) => (
            <View
              key={service.id}
              className={`flex-row justify-between py-1.5 ${
                index !== services.length - 1 ? "border-b border-white/10" : ""
              }`}
            >
              <Text className="text-white/90 text-sm flex-1" numberOfLines={1}>
                {service.name} × {service.quantity}
              </Text>
              <Text className="text-white font-semibold text-sm ml-2">
                ₱{(service.price * service.quantity).toFixed(2)}
              </Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};
