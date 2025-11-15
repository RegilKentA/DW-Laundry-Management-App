import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Menu = () => {
  // Demo state - replace with actual user data
  const [user, setUser] = useState({
    name: "Regil Kent",
    email: "regilkentantonio@gmail.com",
    role: "admin", // Change to 'user' to see non-admin view
  });

  const isAdmin = user.role === "admin";

  const handlePress = (screen: string) => {
    Alert.alert("Navigation", `Navigate to ${screen}`);
    // Replace with actual navigation: router.push('/settings')
  };

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: () => console.log("Logged out"),
      },
    ]);
  };

  const MenuItem = ({
    icon,
    title,
    onPress,
    adminOnly,
  }: {
    icon: keyof typeof Ionicons.glyphMap;
    title: string;
    onPress: () => void;
    adminOnly?: boolean;
  }) => {
    if (adminOnly && !isAdmin) return null;

    return (
      <TouchableOpacity
        onPress={onPress}
        className="flex-row items-center bg-white px-6 py-4 border-b border-gray-100 active:bg-gray-50"
      >
        <View className="w-10 h-10 rounded-full bg-blue-50 items-center justify-center">
          <Ionicons name={icon} size={22} color="#3B82F6" />
        </View>
        <Text className="flex-1 ml-4 text-base font-medium text-gray-800">
          {title}
        </Text>
        {adminOnly && (
          <View className="bg-purple-100 px-2 py-1 rounded mr-2">
            <Text className="text-xs font-semibold text-purple-600">ADMIN</Text>
          </View>
        )}
        <Ionicons name="chevron-forward" size={20} color="#C7C7CC" />
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView className="flex-1 bg-gray-50">
      {/* Header Section */}
      <View className="bg-blue-500 pt-16 pb-8 px-6">
        <View className="items-center">
          {/* Avatar */}
          <View className="w-24 h-24 rounded-full bg-white items-center justify-center mb-4 shadow-lg">
            <Text className="text-4xl font-bold text-blue-500">
              {user.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </Text>
          </View>

          {/* User Info */}
          <Text className="text-2xl font-bold text-white mb-1">
            {user.name}
          </Text>
          <Text className="text-blue-100 text-sm mb-2">{user.email}</Text>

          {/* Role Badge */}
          <View
            className={`px-4 py-1.5 rounded-full ${
              isAdmin ? "bg-purple-500" : "bg-blue-400"
            }`}
          >
            <Text className="text-white text-xs font-semibold uppercase">
              {user.role}
            </Text>
          </View>
        </View>
      </View>

      {/* Menu Items */}
      <View className="mt-6">
        <Text className="px-6 pb-2 text-xs font-semibold text-gray-500 uppercase tracking-wide">
          General
        </Text>
        <View className="bg-white rounded-2xl mx-4 overflow-hidden shadow-sm">
          <MenuItem
            icon="settings-outline"
            title="Settings"
            onPress={() => handlePress("Settings")}
          />
          <MenuItem
            icon="list-outline"
            title="Customer Lists"
            onPress={() => handlePress("Customer Lists")}
          />
        </View>
      </View>

      {/* Admin Section */}
      {isAdmin && (
        <View className="mt-6">
          <Text className="px-6 pb-2 text-xs font-semibold text-gray-500 uppercase tracking-wide">
            Admin Tools
          </Text>
          <View className="bg-white rounded-2xl mx-4 overflow-hidden shadow-sm">
            <MenuItem
              icon="time-outline"
              title="Shift History"
              onPress={() => handlePress("Shift History")}
              adminOnly
            />
            <MenuItem
              icon="grid-outline"
              title="Service Lists"
              onPress={() => handlePress("Service Lists")}
              adminOnly
            />
            <MenuItem
              icon="people-outline"
              title="User Accounts"
              onPress={() => handlePress("User Accounts")}
              adminOnly
            />
          </View>
        </View>
      )}

      {/* Logout Section */}
      <View className="mt-6 mb-8">
        <View className="rounded-2xl mx-4 overflow-hidden shadow-sm">
          <TouchableOpacity
            onPress={handleLogout}
            className="items-center justify-center px-6 py-3 bg-red-400 active:bg-red-500"
          >
            <Text className="text-lg font-bold text-gray-100">Log out</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Footer */}
      <View className="items-center pb-8 pt-4">
        <Text className="text-gray-400 text-xs">Version 1.0.0</Text>
      </View>
    </ScrollView>
  );
};

export default Menu;
