import { Ionicons } from "@expo/vector-icons";

export interface Customer {
  id: number;
  name: string;
  phone: string;
}

export interface Service {
  id: number;
  name: string;
  price: number;
  icon: keyof typeof Ionicons.glyphMap;
}

export interface ServiceItem extends Service {
  quantity: number;
}
