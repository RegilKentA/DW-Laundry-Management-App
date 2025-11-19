import type { Customer, Service } from "@/src/types/order.types";

export const MOCK_CUSTOMERS: Customer[] = [
  { id: 1, name: "John Smith", phone: "(555) 123-4567" },
  { id: 2, name: "Sarah Johnson", phone: "(555) 987-6543" },
  { id: 3, name: "Mike Davis", phone: "(555) 456-7890" },
  { id: 4, name: "Emily Brown", phone: "(555) 234-5678" },
  { id: 5, name: "David Wilson", phone: "(555) 345-6789" },
];

export const MOCK_SERVICES: Service[] = [
  { id: 1, name: "Full Service", price: 170.0, icon: "cut-outline" },
  { id: 2, name: "Hair Coloring", price: 80.0, icon: "color-palette-outline" },
  { id: 3, name: "Beard Trim", price: 15.0, icon: "cut-outline" },
  { id: 4, name: "Shampoo & Blow Dry", price: 30.0, icon: "water-outline" },
  { id: 5, name: "Hair Treatment", price: 50.0, icon: "sparkles-outline" },
  { id: 6, name: "Manicure", price: 35.0, icon: "hand-left-outline" },
  { id: 7, name: "Pedicure", price: 45.0, icon: "footsteps-outline" },
  { id: 8, name: "Facial", price: 60.0, icon: "happy-outline" },
];
