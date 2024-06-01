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
      style={{ flex: 1, backgroundColor: "white" }}
      edges={["right", "bottom", "left"]}
    >
      <View
        style={{
          flex: 1,
          alignItems: "center",
          alignContent: "flex-end",
          alignSelf: "stretch",
          backgroundColor: "lime",
        }}
      >
        <View style={{ marginTop: "auto" }}>
          <Image
            source={require("@/assets/images/coriander.png")}
            style={{ height: 100, width: 100, marginBottom: 20 }}
          />
        </View>
        <Animated.View
          style={{
            height,
            width: "100%",
            backgroundColor: "white",
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          }}
        >
          <View
            style={{
              margin: "auto",
              alignItems: "center",
            }}
          >
            <H2>
              Welcome to{" "}
              <H2 color="darkgreen" fontWeight="bold">
                Cilantro!
              </H2>
            </H2>
            {expanded ? (
              <Pressable
                onPress={handleLoginWithGoogle}
                style={{
                  height: 70,
                  width: "80%",
                  paddingVertical: 10,
                  paddingHorizontal: 32,
                  borderRadius: 20,
                  elevation: 3,
                  backgroundColor: "black",
                  justifyContent: "center",
                }}
              >
                <H3 color="white" style={{ justifyContent: "space-between" }}>
                  <FontAwesome
                    name="google"
                    size={22}
                    color="white"
                    style={{ margin: 10 }}
                  />
                  Login with Google
                </H3>
              </Pressable>
            ) : (
              <Pressable
                onPress={handlePress}
                style={{
                  height: 70,
                  width: "80%",
                  paddingVertical: 10,
                  paddingHorizontal: 32,
                  borderRadius: 20,
                  elevation: 3,
                  backgroundColor: "black",
                  justifyContent: "center",
                }}
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
