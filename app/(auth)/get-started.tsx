import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "@/theme/theme";
import { Image } from "expo-image";
import { width, height } from "@/utils/Constants";
import CustomButton from "@/components/CustomButton";
import { useRouter } from "expo-router";

const GetStarted = () => {
  const router = useRouter();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imgCont}>
        <Image
          source={require("../../assets/images/onboarding3.png")}
          contentFit="cover"
          transition={1000}
          style={{ width: "100%", height: "100%" }}
        />
      </View>
      <View style={styles.bottomGroup}>
        <View style={styles.textGroup}>
          <Text style={styles.title}>One App To Rule {" \n"} Them All</Text>
          <Text style={styles.des}>
            All in one financial services for {" \n"} SME’s & Freelancers
          </Text>
        </View>
        <View style={{ width: "70%", marginTop: 20 }}>
          <CustomButton
            title={"Create Account"}
            style={{}}
            onPress={() => router.push("/home")}
          />
        </View>
      </View>
      <Text style={styles.loginText}>
        Already have an account?{" "}
        <Text
          style={{
            color: COLORS.primary,
            fontFamily: "medium",
            fontWeight: "500",
          }}
          onPress={() => router.push("/(auth)/sign-in")}
        >
          Log in
        </Text>
      </Text>
    </SafeAreaView>
  );
};

export default GetStarted;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.screenBackground,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  imgCont: {
    width: width,
    height: height * 0.5,
  },
  bottomGroup: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  textGroup: {
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontFamily: "semibold",
    fontSize: 24,
    fontWeight: "600",
    color: COLORS.primary,
    textAlign: "center",
  },
  des: {
    fontSize: 16,
    fontFamily: "regular",
    fontWeight: "400",
    color: COLORS.text,
    textAlign: "center",
    marginTop: 4,
  },
  loginText: {
    fontSize: 14,
    fontFamily: "regular",
    fontWeight: "400",
    color: COLORS.text,
    textAlign: "center",
    marginTop: 52,
  },
});
