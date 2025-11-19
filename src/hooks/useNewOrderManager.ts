import { useState, useMemo, useCallback } from "react";
import { Alert } from "react-native";
import type { Service, ServiceItem } from "@/src/types/order.types";

export const useNewOrderManager = () => {
  const [selectedServices, setSelectedServices] = useState<ServiceItem[]>([]);

  const addService = useCallback((service: Service | ServiceItem) => {
    setSelectedServices((prev) => {
      const existing = prev.find((s) => s.id === service.id);
      if (existing) {
        return prev.map((s) =>
          s.id === service.id ? { ...s, quantity: s.quantity + 1 } : s
        );
      }
      return [...prev, { ...service, quantity: 1 }];
    });
  }, []);

  const removeService = useCallback((serviceId: number) => {
    setSelectedServices((prev) => {
      const existing = prev.find((s) => s.id === serviceId);
      if (!existing) return prev;

      if (existing.quantity > 1) {
        return prev.map((s) =>
          s.id === serviceId ? { ...s, quantity: s.quantity - 1 } : s
        );
      }
      return prev.filter((s) => s.id !== serviceId);
    });
  }, []);

  const clearServices = useCallback(() => {
    setSelectedServices([]);
  }, []);

  const confirmClearServices = useCallback(
    (onConfirm?: () => void) => {
      Alert.alert(
        "Clear Order",
        "Are you sure you want to clear the current order?",
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "Clear",
            style: "destructive",
            onPress: () => {
              clearServices();
              onConfirm?.(); // ✅ Call additional cleanup if provided
            },
          },
        ]
      );
    },
    [clearServices]
  );

  const totalAmount = useMemo(
    () => selectedServices.reduce((sum, s) => sum + s.price * s.quantity, 0),
    [selectedServices]
  );

  const totalItems = useMemo(
    () => selectedServices.reduce((sum, s) => sum + s.quantity, 0),
    [selectedServices]
  );

  return {
    selectedServices,
    addService,
    removeService,
    clearServices,
    confirmClearServices,
    totalAmount,
    totalItems,
  };
};
