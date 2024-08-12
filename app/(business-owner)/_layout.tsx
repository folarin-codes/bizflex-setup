import { Stack } from "expo-router";

import { StyleSheet, Text, View } from "react-native";
import React from "react";

const BusinessOwnerStack = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="registered-business" />
    </Stack>
  );
};

export default BusinessOwnerStack;

const styles = StyleSheet.create({});
