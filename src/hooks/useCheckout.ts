import { useState, useMemo, useCallback } from "react";
import type { PaymentStatus, PaymentMethod } from "@/src/types/checkout.types";

export const useCheckout = (totalAmount: number) => {
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>("paid");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("cash");
  const [customAmount, setCustomAmount] = useState("");
  const [selectedQuickAmount, setSelectedQuickAmount] = useState<number | null>(
    null
  );

  // Generate quick payment amounts
  const quickAmounts = useMemo(() => {
    const amounts: number[] = [];
    const roundedUp = Math.ceil(totalAmount / 100) * 100;

    amounts.push(totalAmount); // Exact amount
    amounts.push(roundedUp);
    amounts.push(roundedUp + 100);
    amounts.push(roundedUp + 500);
    amounts.push(roundedUp + 1000);

    return amounts.filter(
      (amount, index, self) => self.indexOf(amount) === index
    );
  }, [totalAmount]);

  // Calculate amount paid and change
  const amountPaid = selectedQuickAmount || parseFloat(customAmount) || 0;
  const change = amountPaid - totalAmount;

  const handleQuickAmountSelect = useCallback((amount: number) => {
    setSelectedQuickAmount(amount);
    setCustomAmount("");
  }, []);

  const handleCustomAmountChange = useCallback((value: string) => {
    setCustomAmount(value);
    setSelectedQuickAmount(null);
  }, []);

  const validate = useCallback(() => {
    if (paymentStatus === "paid") {
      if (amountPaid < totalAmount) {
        return {
          valid: false,
          message: "Payment amount cannot be less than total amount",
        };
      }
      if (!paymentMethod) {
        return { valid: false, message: "Please select a payment method" };
      }
    }
    return { valid: true };
  }, [paymentStatus, paymentMethod, amountPaid, totalAmount]);

  return {
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
  };
};
