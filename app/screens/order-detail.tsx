import React from "react";
import { View, ScrollView } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Stack } from "expo-router";
import { OrderDetailHeader } from "@/src/components/order-detail/OrderDetailHeader";
import { CustomerInfoCard } from "@/src/components/order-detail/CustomerInfoCard";
import { ServicesCard } from "@/src/components/order-detail/ServicesCard";
import { PaymentInfoCard } from "@/src/components/order-detail/PaymentInfoCard";
import { OrderActions } from "@/src/components/order-detail/OrderActions";
import { useOrderDetail } from "@/src/hooks/useOrderDetail";
import type { Order } from "@/src/types/order.types";

// Mock data - replace with actual API call
const MOCK_ORDER: Order = {
  id: 1,
  orderNumber: "ORD-001",
  customer: { id: 1, name: "John Smith", phone: "(555) 123-4567" },
  services: [
    { id: 1, name: "Haircut", price: 25, quantity: 1 },
    { id: 2, name: "Beard Trim", price: 15, quantity: 1 },
    { id: 3, name: "Manicure", price: 35, quantity: 2 },
  ],
  totalAmount: 110,
  paymentStatus: "unpaid",
  paymentMethod: null,
  amountPaid: 0,
  change: 0,
  status: "not_picked_up",
  cashier: { id: 1, name: "Maria Santos" },
  createdAt: new Date().toISOString(),
};

const OrderDetail = () => {
  const router = useRouter();
  const params = useLocalSearchParams();

  // TODO: Fetch order by ID from params.orderId
  const { order, updatePaymentStatus, updateOrderStatus, deleteOrder } =
    useOrderDetail(MOCK_ORDER);

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />

      <View className="flex-1 bg-gray-50">
        <OrderDetailHeader order={order} onBack={() => router.back()} />

        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          <CustomerInfoCard
            customer={order.customer}
            createdAt={order.createdAt}
            cashier={order.cashier}
          />

          <ServicesCard
            services={order.services}
            totalAmount={order.totalAmount}
          />

          {order.paymentStatus === "paid" && order.paymentMethod && (
            <PaymentInfoCard
              paymentMethod={order.paymentMethod}
              amountPaid={order.amountPaid}
              change={order.change}
            />
          )}

          <OrderActions
            order={order}
            onUpdatePaymentStatus={updatePaymentStatus}
            onUpdateOrderStatus={updateOrderStatus}
            onDeleteOrder={() => deleteOrder(() => router.back())}
          />
        </ScrollView>
      </View>
    </>
  );
};

export default OrderDetail;
