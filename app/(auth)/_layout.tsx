import { Stack } from "expo-router";

import { StyleSheet, Text, View } from "react-native";
import React from "react";

const AuthStack = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="get-started" />
      <Stack.Screen name="sign-up" />
      <Stack.Screen name="create-password" />
      <Stack.Screen name="verification-code" />
      <Stack.Screen name="verification-complete" />
      <Stack.Screen name="sign-in" />
      <Stack.Screen name="create-account" />
    </Stack>
  );
};

export default AuthStack;

const styles = StyleSheet.create({});
