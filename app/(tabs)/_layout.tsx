import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const _layout = () => {
  const tabs = [
    { name: "home", title: "Home", icon: "home" },
    { name: "orders", title: "Orders", icon: "list" },
    { name: "new-order", title: "New Order", icon: "add-circle" },
    { name: "reports", title: "Reports", icon: "bar-chart" },
    { name: "menu", title: "Menu", icon: "menu" },
  ];

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#FF9B00",
        tabBarInactiveTintColor: "#aaaaadff",
        tabBarStyle: {
          backgroundColor: "#ffffffff",
          borderTopColor: "#E5E5EA",
          borderTopWidth: 1,
          height: 80,
          paddingBottom: 34,
          paddingTop: 5,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
        },
      }}
    >
      {tabs.map((tab) => (
        <Tabs.Screen
          key={tab.name}
          name={tab.name}
          options={{
            title: tab.title,
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Ionicons name={tab.icon as any} size={size} color={color} />
            ),
          }}
        />
      ))}
    </Tabs>
  );
};

export default _layout;
