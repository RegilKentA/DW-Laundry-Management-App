import React, { useMemo } from "react";
import { View, Text, TouchableOpacity, ScrollView, Alert } from "react-native";
import { useRouter, useLocalSearchParams, Stack } from "expo-router";
import { CheckoutHeader } from "@/src/components/checkout/CheckoutHeader";
import { PaymentStatusSelector } from "@/src/components/checkout/PaymentStatusSelector";
import { PaymentMethodSelector } from "@/src/components/checkout/PaymentMethodSelector";
import { QuickAmountGrid } from "@/src/components/checkout/QuickAmountGrid";
import { CustomAmountInput } from "@/src/components/checkout/CustomAmountInput";
import { useCheckout } from "@/src/hooks/useCheckout";

const Checkout = () => {
  const router = useRouter();
  const params = useLocalSearchParams();

  const checkoutData = useMemo(() => {
    try {
      return JSON.parse(params.data as string);
    } catch {
      return null;
    }
  }, [params]);

  const {
    paymentStatus,
    setPaymentStatus,
    paymentMethod,
    setPaymentMethod,
    customAmount,
    selectedQuickAmount,
    quickAmounts,
    amountPaid,
    change,
    handleQuickAmountSelect,
    handleCustomAmountChange,
    validate,
  } = useCheckout(checkoutData?.totalAmount || 0);

  const handlePlaceOrder = () => {
    const validation = validate();
    if (!validation.valid) {
      Alert.alert("Error", validation.message);
      return;
    }

    const order = {
      ...checkoutData,
      paymentStatus,
      paymentMethod: paymentStatus === "paid" ? paymentMethod : null,
      amountPaid: paymentStatus === "paid" ? amountPaid : 0,
      change: paymentStatus === "paid" ? change : 0,
      createdAt: new Date().toISOString(),
    };

    console.log("Order placed:", order);

    Alert.alert("Success", "Order placed successfully!", [
      {
        text: "OK",
        onPress: () => router.back(),
      },
    ]);
  };

  if (!checkoutData) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-50">
        <Text className="text-gray-600">Invalid checkout data</Text>
      </View>
    );
  }

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />

      <View className="flex-1 bg-gray-50">
        <CheckoutHeader
          totalAmount={checkoutData.totalAmount}
          customerName={checkoutData.customer.name}
          change={paymentStatus === "paid" && amountPaid > 0 ? change : null}
          services={checkoutData.services}
          onBack={() => router.back()}
        />

        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          <PaymentStatusSelector
            selectedStatus={paymentStatus}
            onSelect={setPaymentStatus}
          />

          {paymentStatus === "paid" && (
            <>
              <PaymentMethodSelector
                selectedMethod={paymentMethod}
                onSelect={setPaymentMethod}
              />

              {paymentMethod === "cash" && (
                <>
                  <QuickAmountGrid
                    amounts={quickAmounts}
                    selectedAmount={selectedQuickAmount}
                    totalAmount={checkoutData.totalAmount}
                    onSelect={handleQuickAmountSelect}
                  />

                  <CustomAmountInput
                    value={customAmount}
                    onChange={handleCustomAmountChange}
                  />
                </>
              )}
            </>
          )}
        </ScrollView>

        <View className="px-4 pb-6 pt-4 bg-white border-t border-gray-200">
          <TouchableOpacity
            onPress={handlePlaceOrder}
            className="bg-blue-500 rounded-2xl py-4 active:bg-blue-600"
          >
            <Text className="text-white text-center text-lg font-bold">
              Place Order
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default Checkout;
