import { StyleSheet, Text, View } from "react-native";
import React from "react";
import SignUpLayout from "@/layout/SignUpLayout";
import { COLORS } from "@/theme/theme";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomTextInput from "@/components/CustomTextInput";
import CustomButton from "@/components/CustomButton";
import { useRouter } from "expo-router";

const symbolCheck = /.*[^A-Za-z0-9].*/;
const letterNumberCheck = /^(?=.*[A-Z])(?=.*\d).+$/;

const newPasswordSchema = z
  .object({
    password: z
      .string()
      .trim()
      .min(8, "Password must be at least 8 characters")
      .refine(
        (value) => symbolCheck.test(value) && letterNumberCheck.test(value),
        "Password must contain a symbol, a number, and an upper-case letter"
      ),
    confirmPassword: z
      .string()
      .trim()
      .min(8, "Password must be at least 8 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type newPasswordSchemaType = z.infer<typeof newPasswordSchema>;

const CreatePassword = () => {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
    resolver: zodResolver(newPasswordSchema),
  });

  const onSubmit = async (data: newPasswordSchemaType) => {
    console.log(data);
    router.push("/(auth)/verification-code");
  };
  return (
    <SignUpLayout>
      <View style={{ flex: 1 }}>
        <View style={styles.headerGroup}>
          <Text style={styles.headerTitle}>Create Password</Text>
          <Text style={styles.headerDes}>
            Kindly fill the form with accurate business details
          </Text>
        </View>

        <View style={styles.formContainer}>
          {/* password */}
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
          </View>
          {/* confirm password */}
          <View style={styles.formItem}>
            <Text style={styles.formLabel}>Confirm Password</Text>
            <CustomTextInput
              control={control}
              name="confirmPassword"
              placeholder="Enter Password"
              rules={{ required: "Password must be more than six digits" }}
              secureTextEntry={true}
              showPasswordIcon={true}
            />
          </View>
        </View>

        <CustomButton
          title="Continue"
          style={{ marginVertical: "50%" }}
          disabled={!isDirty}
          onPress={handleSubmit(onSubmit)}
        />
      </View>
    </SignUpLayout>
  );
};

export default CreatePassword;

const styles = StyleSheet.create({
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
});
