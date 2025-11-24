import React from "react";
import { View, Text, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { FilterChip } from "@/src/components/orders/FilterChip";
import { DateSection } from "@/src/components/orders/DateSection";
import { useOrders } from "@/src/hooks/useOrders";
import type { OrderFilterType, Order } from "@/src/types/order.types";

const Orders = () => {
  const router = useRouter();
  const { groupedOrders, filter, setFilter, filteredOrders } = useOrders();

  const filters: { value: OrderFilterType; label: string }[] = [
    { value: "all", label: "All" },
    { value: "today", label: "Today" },
    { value: "unpaid", label: "Not Paid" },
    { value: "paid", label: "Paid" },
    { value: "not_picked_up", label: "Not Picked Up" },
    { value: "picked_up", label: "Picked Up" },
    { value: "completed", label: "Completed" },
  ];

  const handleOrderPress = (order: Order) => {
    // Navigate to order detail page - pass order data directly
    router.push({
      pathname: "/screens/order-detail",
      params: {
        orderData: JSON.stringify(order),
      },
    } as any);
  };

  const dateKeys = Object.keys(groupedOrders);

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-blue-500 pt-16 pb-6 px-6">
        <Text className="text-white text-2xl font-bold">Orders</Text>
      </View>

      {/* Filters */}
      <View className="bg-white border-b border-gray-200">
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="px-4 py-3"
          contentContainerStyle={{ paddingHorizontal: 16 }}
        >
          {filters.map((f) => (
            <FilterChip
              key={f.value}
              label={f.label}
              isActive={filter === f.value}
              onPress={() => setFilter(f.value)}
            />
          ))}
        </ScrollView>
      </View>

      {/* Orders List */}
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {dateKeys.length === 0 ? (
          <View className="flex-1 items-center justify-center py-20">
            <Text className="text-gray-400 text-lg">No orders found</Text>
          </View>
        ) : (
          <View className="py-4">
            {dateKeys.map((dateKey) => (
              <DateSection
                key={dateKey}
                dateKey={dateKey}
                orders={groupedOrders[dateKey]}
                onOrderPress={handleOrderPress}
              />
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default Orders;
