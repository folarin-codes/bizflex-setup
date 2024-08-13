import React, { useState, useCallback, useEffect, useMemo } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text } from "react-native";
import { generalStyles } from "@/theme/styles";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import Onboarding from "./onboarding/onboarding";
import Toast from "react-native-toast-message";

export default function Page() {
  const [fontsLoaded, fontError] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    regular: require("../assets/fonts/poppins/Poppins-Regular.ttf"),
    medium: require("../assets/fonts/poppins/Poppins-Medium.ttf"),
    bold: require("../assets/fonts/poppins/Poppins-Bold.ttf"),
    thin: require("../assets/fonts/poppins/Poppins-Thin.ttf"),
    semibold: require("../assets/fonts/poppins/Poppins-SemiBold.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }
  return (
    <SafeAreaView style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <Onboarding />
      <Toast />
    </SafeAreaView>
  );
}
