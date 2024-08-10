import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import SignUpLayout from "@/layout/SignUpLayout";
import CustomTextInput from "@/components/CustomTextInput";
import { COLORS } from "@/theme/theme";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomButton from "@/components/CustomButton";
import CheckBox from "@/assets/svgs/CheckBox";
import { useRouter } from "expo-router";
import MyCheckbox from "@/components/MyCheckbox";

const signUpSchema = z.object({
  firstName: z.string().trim().min(1, "Please enter your first name"),
  middleName: z
    .string()
    .trim()
    .min(0, "Please enter your middle name")
    .optional(),
  surname: z.string().trim().min(1, "Please enter your last name"),
  //   phoneNumber: z
  //     .string()
  //     .min(11, "Please enter your phone number")
  //     .regex(/^(?:(?:\+?234)|0)?[789][01]\d{8}$/, {
  //       message: "Phone Number is invalid",
  //     }),
  email: z.string().trim().email("Please enter your email"),
  referralCode: z.string().optional(),
});

type signUpType = z.infer<typeof signUpSchema>;

const SignUp = () => {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors, isDirty },
    watch,
  } = useForm({
    defaultValues: {
      firstName: "",
      middleName: "",
      surname: "",
      //phoneNumber: "",
      email: "",
      referralCode: "",
    },
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data: signUpType) => {
    console.log(data);
    router.push("/(auth)/create-password");
  };

  return (
    <SignUpLayout>
      <View style={{ flex: 1 }}>
        <View style={styles.headerGroup}>
          <Text style={styles.headerTitle}>SignUp</Text>
          <Text style={styles.headerDes}>
            Kindly fill the form with accurate business details
          </Text>
        </View>

        <View style={styles.formContainer}>
          {/* first name */}
          <View style={styles.formItem}>
            <Text style={styles.formLabel}>First Name</Text>
            <CustomTextInput
              control={control}
              name="firstName"
              placeholder="Enter First Name"
              rules={{ required: "Please enter your first name" }}
            />
          </View>
          {/* middle name */}
          <View style={styles.formItem}>
            <Text style={styles.formLabel}>Middle Name</Text>
            <CustomTextInput
              control={control}
              name="middleName"
              placeholder="Enter middle Name (Optional)"
              rules={{ required: "Please enter your middle name" }}
            />
          </View>
          {/* last name */}
          <View style={styles.formItem}>
            <Text style={styles.formLabel}>Surname Name</Text>
            <CustomTextInput
              control={control}
              name="surname"
              placeholder="Enter Surname (Family Name)"
              rules={{ required: "Please enter your surname name" }}
            />
          </View>
          {/* email */}
          <View style={styles.formItem}>
            <Text style={styles.formLabel}>Email</Text>
            <CustomTextInput
              control={control}
              name="email"
              placeholder="Enter Email"
              rules={{ required: "Please enter your email" }}
            />
          </View>
          {/* referral code */}
          <View style={styles.formItem}>
            <Text style={styles.formLabel}>Referral Code</Text>
            <CustomTextInput
              control={control}
              name="referralCode"
              placeholder="Enter referral code"
            />
          </View>
        </View>

        <View style={styles.termsCont}>
          {/* <View style={styles.checkBox}>
           
            <CheckBox />
          </View> */}
          <MyCheckbox />
          <Text style={styles.terms}>
            I agree with{" "}
            <Text style={{ color: COLORS.primary }}>Terms & Conditions</Text>
          </Text>
        </View>

        <CustomButton
          title="Continue"
          style={{ marginVertical: 28 }}
          disabled={!isDirty}
          onPress={handleSubmit(onSubmit)}
        />
      </View>
    </SignUpLayout>
  );
};

export default SignUp;

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
  termsCont: {
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: 44,
  },
  checkBox: {
    width: 24,
    height: 24,
    borderWidth: 1.5,
    borderColor: "#292D32",
    borderRadius: 4,
    //backgroundColor: COLORS.primary,
    alignSelf: "center",
  },
  terms: {
    fontFamily: "regular",
    fontSize: 12,
    fontWeight: "400",
    color: "#8E949A",
  },
});
