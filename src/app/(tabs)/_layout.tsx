import React, { useContext } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Redirect, Tabs } from "expo-router";
import { ActivityIndicator, Pressable, StyleSheet } from "react-native";

import Colors from "@/src/constants/Colors";
import { useColorScheme } from "@/src/components/useColorScheme";
import { useClientOnlyValue } from "@/src/components/useClientOnlyValue";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthContext, useAuth } from "@/src/providers/auth-provider";

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return (
    <FontAwesome
      size={28}
      style={{ marginBottom: -3, color: "#1BC464" }}
      {...props}
    />
  );
}

export default function TabLayout() {
  const { session, mounting } = useAuth();
  if (mounting) return <ActivityIndicator />;
  if (session) return <Redirect href={"/auth"} />;

  return (
    <SafeAreaView edges={["top"]} style={styles.safeArea}>
      <Tabs>
        <Tabs.Screen
          name="index"
          options={{
            headerShown: false,
            title: "Shop",
            tabBarIcon(props) {
              return <TabBarIcon name="shopping-cart" {...props} />;
            },
          }}
        />
        <Tabs.Screen
          name="orders"
          options={{
            headerShown: false,
            title: "Orders",
            tabBarIcon(props) {
              return <TabBarIcon name="book" {...props} />;
            },
          }}
        />
      </Tabs>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
});
