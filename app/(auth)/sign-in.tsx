import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import SignUpLayout from "@/layout/SignUpLayout";
import { COLORS } from "@/theme/theme";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomTextInput from "@/components/CustomTextInput";
import { useRouter } from "expo-router";
import CustomButton from "@/components/CustomButton";
import BiometricsSvgFailed from "@/assets/svgs/BiometricsSvgFailed";
import BiometricsSvgApproved from "@/assets/svgs/BiometricsSvgApproved";

const signInSchema = z.object({
  email: z.string().trim().email("Please enter your email"),
  password: z.string().min(8, "Please enter your password"),
});

type signInSchemaType = z.infer<typeof signInSchema>;

const SignIn = () => {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors, isDirty },
    watch,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(signInSchema),
  });

  const biometricsSuccessful = true;

  const onSubmit = async (data: signInSchemaType) => {
    console.log(data);
  };

  return (
    <SignUpLayout>
      <View style={styles.container}>
        <View style={{ width: "100%" }}>
          <View style={styles.headerGroup}>
            <Text style={styles.headerTitle}>Welcome Back</Text>
            <Text style={styles.headerDes}>
              Kindly input your Email and Password to Sign in
            </Text>
          </View>

          <View style={styles.formContainer}>
            {/* email */}
            <View style={styles.formItem}>
              <Text style={styles.formLabel}>Password</Text>
              <CustomTextInput
                control={control}
                name="email"
                placeholder="Enter email"
                rules={{ required: "Please enter your email" }}
              />
            </View>
            {/*  password */}
            <View style={styles.formItem}>
              <Text style={styles.formLabel}>Password</Text>
              <CustomTextInput
                control={control}
                name="password"
                placeholder="Enter Password"
                rules={{ required: "Password must be more than six digits" }}
                secureTextEntry={true}
                showPasswordIcon={true}
              />
              <Pressable onPress={() => {}}>
                <Text style={styles.forgotPassword}>Forgot Password ?</Text>
              </Pressable>
            </View>
            <CustomButton
              title="Continue"
              style={{ marginTop: "15%" }}
              disabled={!isDirty}
              onPress={handleSubmit(onSubmit)}
            />

            <TouchableOpacity style={styles.biometrics}>
              {biometricsSuccessful ? (
                <>
                  <BiometricsSvgApproved />
                  <Text style={styles.matched}>Fingerprint matched!</Text>
                </>
              ) : (
                <>
                  <BiometricsSvgFailed />
                  <Text style={[styles.matched, { color: "#FF9D16" }]}>
                    Fingerprint mismatch!
                  </Text>
                </>
              )}
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ width: "100%" }}>
          <Text style={styles.resendText}>
            Didn't get code.{" "}
            <Text
              style={{ color: COLORS.primary }}
              onPress={() => router.push("/(auth)/sign-up")}
            >
              Resend
            </Text>
          </Text>
        </View>
      </View>
    </SignUpLayout>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerGroup: {},
  headerTitle: {
    fontFamily: "medium",
    fontSize: 24,
    fontWeight: "500",
    color: COLORS.primary,
  },
  headerDes: {
    fontFamily: "regular",
    fontSize: 12,
    fontWeight: "400",
    color: "#696969",
  },
  formContainer: {
    marginTop: 28,
    flexDirection: "column",
    gap: 22,
  },
  formItem: {},
  formLabel: {
    marginBottom: 10,
    fontFamily: "medium",
    fontSize: 14,
    color: "#07142F",
  },
  forgotPassword: {
    textAlign: "right",
    marginTop: 10,
    color: COLORS.text,
    fontFamily: "regular",
    fontSize: 12,
    fontWeight: "400",
  },
  biometrics: {
    alignItems: "center",
    justifyContent: "center",
  },
  matched: {
    fontFamily: "regular",
    fontSize: 14,
    fontWeight: "normal",
    color: COLORS.text,
    marginTop: 16,
  },
  resendText: {
    fontFamily: "regular",
    fontSize: 14,
    color: "#828282",
    textAlign: "center",
    marginBottom: 30,
  },
});
