import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect } from "react";
import Toast from "react-native-toast-message";
import React from "react";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    regular: require("../assets/fonts/poppins/Poppins-Regular.ttf"),
    medium: require("../assets/fonts/poppins/Poppins-Medium.ttf"),
    bold: require("../assets/fonts/poppins/Poppins-Bold.ttf"),
    thin: require("../assets/fonts/poppins/Poppins-Thin.ttf"),
    semibold: require("../assets/fonts/poppins/Poppins-SemiBold.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="(business-owner)" options={{ headerShown: false }} />
      <Stack.Screen
        name="(unregistered-business)"
        options={{ headerShown: false }}
      />
      <Stack.Screen name="(freelancer)" options={{ headerShown: false }} />
      <Stack.Screen name="(cards)" options={{ headerShown: false }} />
      <Stack.Screen name="(invoice)" options={{ headerShown: false }} />
      <Stack.Screen name="(more)" options={{ headerShown: false }} />
      <Stack.Screen name="(savings)" options={{ headerShown: false }} />
      <Stack.Screen name="(home)" options={{ headerShown: false }} />
    </Stack>
  );
}
