import { Image, StyleSheet, Platform, ScrollView } from "react-native";
import * as Progress from "react-native-progress";
import AntDesign from "@expo/vector-icons/AntDesign";
import { FontAwesome6 } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { HelloWave } from "@/components/HelloWave";
import { StatusBar } from "expo-status-bar";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useUserStore } from "@/statemanagement/user";
import { H1, H3, H5 } from "tamagui";

const exampleData = [
  {
    title: "Groceries",
    category: "Food",
    amount: 100,
    date: new Date().toLocaleString('en-us',{day: "numeric",month:'short', year:'numeric'}),
  },
  {
    title: "Gas",
    category: "Transportation",
    amount: 50,
    date: new Date().toLocaleString('en-us',{day: "numeric",month:'short', year:'numeric'}),
  },
  {
    title: "Rent",
    category: "Housing",
    amount: 1000,
    date: new Date().toLocaleString('en-us',{day: "numeric",month:'short', year:'numeric'}),
  },
  {
    title: "Utilities",
    category: "Housing",
    amount: 200,
    date: new Date().toLocaleString('en-us',{day: "numeric",month:'short', year:'numeric'}),
  },
  {
    title: "Internet",
    category: "Housing",
    amount: 50,
    date: new Date().toLocaleString('en-us',{day: "numeric",month:'short', year:'numeric'}),
  },
];

const exampleUpcoming = [
  {
    title: "Rent",
    category: "Housing",
    amount: 1000,
    date: new Date("2021-11-05").toLocaleString('en-us',{day: "numeric",month:'short', year:'numeric'}),
  },
  {
    title: "Utilities",
    category: "Housing",
    amount: 200,
    date: new Date("2021-11-05").toLocaleString('en-us',{day: "numeric",month:'short', year:'numeric'}),
  },
  {
    title: "Internet",
    category: "Housing",
    amount: 50,
    date: new Date("2021-11-05").toLocaleString('en-us',{day: "numeric",month:'short', year:'numeric'}),
  },
]

export default function HomeScreen() {
  const user = useUserStore((state) => state);

  const iconMapping = (category: string) => {
    switch (category) {
      case "Food":
        return <FontAwesome6 name="bowl-food" size={20} color={"#052e16"} />;
      case "Transportation":
        return <FontAwesome6 name="car-side" size={20} color={"#052e16"} />;
      case "Housing":
        return <FontAwesome6 name="house" size={20} color={"#052e16"} />;
      default:
        return <AntDesign name="questioncircle" size={20} color={"#052e16"} />;
    }
  };
  return (
    <ScrollView className="bg-[#fff] p-4">
      <ThemedText className="text-2xl font-bold">
        Welcome, {user.name} 🎉
      </ThemedText>
      <ThemedView className="flex-1 items-center align-middle">
        <ThemedView className="w-full rounded-lg bg-green-300 p-5">
          <ThemedText className="text-lg">In this month, you've spent</ThemedText>
          <ThemedText className="text-4xl font-extrabold">
            ${exampleData.reduce((a, b) => a + b.amount, 0)}
          </ThemedText>
          <Progress.Bar
            progress={0.7}
            width={null}
            height={10}
            color="#65a30d"
            unfilledColor="#1a2e05"
            borderWidth={0}
          />
        </ThemedView>
      </ThemedView>
      <ThemedView className="mt-4 flex-1 align-top">
        <ThemedText className="text-xl font-bold">Recent Expenses</ThemedText>
        <ThemedView className="border-1 my-4 flex-1">
          {exampleData.map((item, index) => (
            <ThemedView
              key={index}
              className="flex-row items-center justify-between border-gray-200 border mb-1 rounded-md bg-white p-5"
            >
              <ThemedView className="flex-1 flex-row">
              <ThemedView className="mr-2 flex w-10 items-center justify-center rounded-full bg-green-400 p-2">
                  {iconMapping(item.category)}
                </ThemedView>
                <ThemedView className="flex-1">
                <ThemedText className="text-sm font-semibold">
                    {item.title}
                  </ThemedText>
                  <ThemedText className="text-sm">{item.date}</ThemedText>
                </ThemedView>
              </ThemedView>
              <ThemedText className="text-md font-bold">
                ${item.amount}
              </ThemedText>
            </ThemedView>
          ))}
        </ThemedView>
      </ThemedView>
      <ThemedView className="mt-4 flex-1 align-top">
        <ThemedText className="text-xl font-bold">Upcoming Expenses</ThemedText>
        <ThemedView className="border-1 my-4 flex-1">
          {exampleUpcoming.map((item, index) => (
            <ThemedView
              key={index}
              className="flex-row items-center justify-between border-gray-200 border mb-1 rounded-md bg-white p-5"
            >
              <ThemedView className="flex-1 flex-row">
                <ThemedView className="mr-2 flex w-10 items-center justify-center rounded-full bg-green-400 p-2">
                  {iconMapping(item.category)}
                </ThemedView>
                <ThemedView className="flex-1">
                  <ThemedText className="text-sm font-semibold">
                    {item.title}
                  </ThemedText>
                  <ThemedText className="text-sm">{item.date}</ThemedText>
                </ThemedView>
              </ThemedView>
              <ThemedText className="text-md font-semibold">
                ${item.amount}
              </ThemedText>
            </ThemedView>
          ))}
        </ThemedView>
      </ThemedView>
    </ScrollView>
  );
}
