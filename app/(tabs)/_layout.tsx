import { Link, Redirect, Tabs } from "expo-router";
import React from "react";
import { Image } from "expo-image";

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
        // headerLeft: () => <Image source={user.picture} />,
        headerLeft: () => (
          <Link href="/account" className="ml-1">
            <Image
              source={{ uri: user.picture }}
              className="h-10 w-10 rounded-full"
              // style={{
              //   width: 30,
              //   height: 30,
              //   borderRadius: 15,
              // }}
            />
          </Link>
        ),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "home" : "home-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "code-slash" : "code-slash-outline"}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
