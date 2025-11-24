import React from "react";
import { View, Text } from "react-native";
import { ActionButton } from "./ActionButton";
import type { Order, OrderStatus } from "@/src/types/order.types";

interface OrderActionsProps {
  order: Order;
  onUpdatePaymentStatus: () => void;
  onUpdateOrderStatus: (status: OrderStatus) => void;
  onDeleteOrder: () => void;
}

export const OrderActions: React.FC<OrderActionsProps> = ({
  order,
  onUpdatePaymentStatus,
  onUpdateOrderStatus,
  onDeleteOrder,
}) => {
  const canMarkAsPickedUp = order.status === "not_picked_up";
  const canMarkAsCompleted =
    order.status === "picked_up" || order.status === "not_picked_up";

  return (
    <View className="px-4 mt-6 mb-8">
      <Text className="text-gray-700 font-semibold text-base mb-3">
        Actions
      </Text>

      {/* Update Payment Status */}
      <ActionButton
        label={
          order.paymentStatus === "paid" ? "Mark as Unpaid" : "Mark as Paid"
        }
        icon={
          order.paymentStatus === "paid" ? "close-circle" : "checkmark-circle"
        }
        color={order.paymentStatus === "paid" ? "yellow" : "green"}
        onPress={onUpdatePaymentStatus}
      />

      {/* Update Order Status */}
      {canMarkAsPickedUp && (
        <ActionButton
          label="Mark as Picked Up"
          icon="cube"
          color="blue"
          onPress={() => onUpdateOrderStatus("picked_up")}
        />
      )}

      {canMarkAsCompleted && (
        <ActionButton
          label="Mark as Completed"
          icon="checkmark-done"
          color="purple"
          onPress={() => onUpdateOrderStatus("completed")}
        />
      )}

      {/* Delete Order */}
      <ActionButton
        label="Delete Order"
        icon="trash"
        color="red"
        onPress={onDeleteOrder}
      />
    </View>
  );
};
