import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Animated, { useSharedValue, withSpring } from "react-native-reanimated";
import { FontAwesome } from "@expo/vector-icons";
import { View, Image, Pressable } from "react-native";
import { H2, H3 } from "tamagui";
import { useRouter } from "expo-router";
import { useUserStore } from "@/statemanagement/user";

export default function LoginScreen() {
  const [expanded, setExpanded] = useState(false);
  const user = useUserStore((state) => state);
  const router = useRouter();
  const height = useSharedValue(150);

  const handlePress = () => {
    setExpanded((prev) => !prev);
    height.value = withSpring(300);
  };

  const handleLoginWithGoogle = () => {
    user.update({ name: "John Doe", id: "123" });
    // Implement Google login here
    router.replace("/");
  };

  return (
    <SafeAreaView
      className="flex-1 bg-white"
      edges={["right", "bottom", "left"]}
    >
      <View className="flex-1 content-end items-center self-stretch bg-lime-400">
        <View className="mt-auto">
          <Image
            source={require("@/assets/images/coriander.png")}
            className="mb-4 h-[100px] w-[100px]"
          />
        </View>
        <Animated.View
          className="w-full rounded-t-3xl bg-white"
          style={{
            height,
          }}
        >
          <View className="m-auto items-center">
            {expanded ? (
              <H2 className="m-4 transition">Login with:</H2>
            ) : (
              <H2 className="m-4 transition">
                Welcome to{" "}
                <H2 color="darkgreen" fontWeight="bold">
                  Cilantro!
                </H2>
              </H2>
            )}
            {expanded ? (
              <Pressable
                onPress={handleLoginWithGoogle}
                className="h-20 w-20 items-center justify-center rounded-3xl bg-slate-100 px-3 py-3 shadow-sm drop-shadow-md transition"
              >
                <FontAwesome
                  name="google"
                  size={22}
                  color="black"
                  style={{ margin: 10 }}
                />
              </Pressable>
            ) : (
              <Pressable
                onPress={handlePress}
                className="h-20 w-[80%] items-center justify-center rounded-3xl bg-black px-8 py-3 shadow-sm drop-shadow-md transition"
              >
                <H3 color="white">Login</H3>
              </Pressable>
            )}
          </View>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
}
