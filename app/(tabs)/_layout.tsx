import { Link, Redirect, Tabs } from "expo-router";
import React from "react";
import { Image } from "expo-image";
import { Text } from "react-native";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useUserStore } from "@/statemanagement/user";

export default function TabLayout() {
  const user = useUserStore((state) => state);
  const colorScheme = useColorScheme();
 
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: true,
        headerLeft: () => (
          <Link href="/account" className="ml-1">
            <Image
              source={{ uri: user.picture }}
              className="h-8 w-8 rounded-full"
            />
          </Link>
        ),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: new Date().toLocaleString('en-us',{day: "numeric",month:'short', year:'numeric'}),
          tabBarLabel: "Home",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "home" : "home-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="accounts"
        options={{
          title: "Accounts",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "wallet" : "wallet-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="budgets"
        options={{
          title: "Budgets",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "briefcase" : "briefcase-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="transactions"
        options={{
          title: "Transactions",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "bar-chart" : "bar-chart-outline"}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
