import { StyleSheet, Text, View } from "react-native";
import React from "react";
import SignUpLayout from "@/layout/SignUpLayout";
import CustomButton from "@/components/CustomButton";
import { COLORS } from "@/theme/theme";
import { router } from "expo-router";

const VerificationComplete = () => {
  return (
    <SignUpLayout>
      <View style={styles.container}>
        <Text style={styles.title}>Success</Text>
        <Text style={styles.des}>
          Account verification complete, Kindly proceed to create a business
          account.
        </Text>
        <CustomButton
          title="Proceed"
          style={{ marginTop: 36 }}
          onPress={() => router.push("/(auth)/create-account")}
        />
      </View>
    </SignUpLayout>
  );
};

export default VerificationComplete;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  title: {
    fontFamily: "semibold",
    fontSize: 24,
    fontWeight: "600",
    color: "#00A825",
    marginBottom: 16,
  },
  des: {
    fontFamily: "medium",
    fontSize: 14,
    fontWeight: "400",
    color: "#444444",
    textAlign: "center",
  },
});
