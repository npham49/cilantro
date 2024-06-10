import { View, Text, SafeAreaView, Pressable } from "react-native";
import { Image } from "expo-image";
import { Link, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { H3 } from "tamagui";
import { useUserStore } from "@/statemanagement/user";
import { useAuthStore } from "@/statemanagement/auth";
import { signOut } from "@/lib/auth/authProvider";
import storage from "@/lib/storage";
export default function Modal() {
  const user = useUserStore((state) => state);
  const auth = useAuthStore((state) => state);
  // If the page was reloaded or navigated to directly, then the modal should be presented as
  // a full screen page. You may need to change the UI to account for this.
  const isPresented = router.canGoBack();

  const pressSignOut = async () => {
    console.log("Signing out...", auth.sessionToken);
    auth.update({ sessionToken: auth.sessionToken, loading: true });
    const response = await signOut(auth.sessionToken).catch((err) => {
      console.error("Error signing out", err);
      return null;
    });
    if (!response) {
      console.error("Error signing out");
      return;
    }
    await storage.deleteItem("session_token");
    console.log("Session token deleted");

    user.update({ name: "", id: "", email: "", picture: "" });
    auth.update({ loading: false, sessionToken: "" });
    router.dismissAll();
    setTimeout(() => {
      router.push("login");
    }, 0);
    // Implement sign out here
  };

  return (
    <SafeAreaView className="flex h-full w-full bg-white align-top">
      {/* Use `../` as a simple way to navigate to the root. This is not analogous to "goBack". */}
      {!isPresented && <Link href="../">Dismiss</Link>}
      {/* Native modals have dark backgrounds on iOS, set the status bar to light content. */}
      <StatusBar style="light" />
      <View className="flex h-full w-full justify-between">
        <View>
          <Image
            source={{ uri: user.picture }}
            className="mx-auto mt-10 h-32 w-32 rounded-full"
          />
          <View className="mx-5 mt-10 items-center">
            <H3>{user.name}</H3>
            <Text>{user.email}</Text>
            <Pressable onPress={pressSignOut} className="mt-5 p-2">
              <H3 className="text-red-500">Sign out</H3>
            </Pressable>
          </View>
        </View>
        <View className="mt-auto flex w-full items-center justify-center align-middle">
          <Link href="../">
            <View className="h-20 items-center justify-center rounded-3xl bg-black px-8 py-3 align-middle shadow-sm drop-shadow-md transition">
              <H3 color="white">Go back</H3>
            </View>
          </Link>
        </View>
      </View>
    </SafeAreaView>
  );
}
