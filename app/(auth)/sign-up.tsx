import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import SignUpLayout from "@/layout/SignUpLayout";
import { COLORS } from "@/theme/theme";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomButton from "@/components/CustomButton";
import { useRouter } from "expo-router";
import Icon, { Icons } from "@/components/Icon";
import FormField from "@/components/FormField";

const countries = [
  {
    code: "+234",
    shortName: "NGN",
    flagUri: "https://www.example.com/flags/ng.png",
  },
  {
    code: "+27",
    shortName: "ZAR",
    flagUri: "https://www.example.com/flags/za.png",
  },
  {
    code: "+254",
    shortName: "KES",
    flagUri: "https://www.example.com/flags/ke.png",
  },
  {
    code: "+233",
    shortName: "GHS",
    flagUri: "https://www.example.com/flags/gh.png",
  },
  {
    code: "+20",
    shortName: "EGP",
    flagUri: "https://www.example.com/flags/eg.png",
  },
];

const signUpSchema = z.object({
  firstName: z.string().trim().min(1, "Please enter your first name"),
  middleName: z
    .string()
    .trim()
    .min(0, "Please enter your middle name")
    .optional(),
  surname: z.string().trim().min(1, "Please enter your last name"),
  phoneNumber: z
    .string()
    .min(11, "Please enter your phone number")
    .regex(/^(?:(?:\+?234)|0)?[789][01]\d{8}$/, {
      message: "Phone Number is invalid",
    }),
  email: z.string().trim().email("Please enter your email"),
  referralCode: z.string().optional(),
});

type signUpType = z.infer<typeof signUpSchema>;

const SignUp = () => {
  const router = useRouter();
  const [checked, setChecked] = useState(true);

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
      phoneNumber: "",
      email: "",
      referralCode: "",
    },
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data: signUpType) => {
    console.log(data);
    if (data && checked) {
      router.push("/(auth)/create-password");
    }
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
          <FormField
            label="First Name"
            control={control}
            name="firstName"
            placeholder="Enter first name"
            rules={{ required: "Please enter your first name" }}
          />

          <FormField
            label="Middle Name"
            control={control}
            name="middleName"
            placeholder="Enter middle Name (Optional)"
            rules={{ required: "Please enter your middle name" }}
          />

          <FormField
            label="Surname Name"
            control={control}
            name="surname"
            placeholder="Enter Surname (Family Name)"
            rules={{ required: "Please enter your surname name" }}
          />
          <FormField
            label="Phone Number"
            control={control}
            name="phoneNumber"
            placeholder="Enter phone number"
            countryCode={true}
          />

          <FormField
            label="Email"
            control={control}
            name="email"
            placeholder="Enter Email"
            rules={{ required: "Please enter your email" }}
          />
          <FormField
            label="Referral Code"
            control={control}
            name="referralCode"
            placeholder="Enter referral code"
          />
        </View>

        <View style={styles.termsCont}>
          <Pressable
            style={[styles.checkboxBase, checked && styles.checkboxChecked]}
            onPress={() => setChecked(!checked)}
          >
            {checked && (
              <Icon type={Icons.Feather} name="check" color="white" size={24} />
            )}
          </Pressable>

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
  phoneNumberCont: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    // borderWidth: 1,
    // borderColor: "red",
  },
  country: {
    width: "30%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    paddingVertical: 17,
    borderWidth: 1,
    borderColor: "#C6D8FF",
    backgroundColor: "white",
  },

  termsCont: {
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: 44,
  },
  checkboxBase: {
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    // borderWidth: 2,
    // borderColor: "coral",
    //backgroundColor: "transparent",
    backgroundColor: COLORS.primary,
  },
  checkboxChecked: {
    backgroundColor: COLORS.primary,
  },

  terms: {
    fontFamily: "regular",
    fontSize: 12,
    fontWeight: "400",
    color: "#8E949A",
  },

  flag: {
    width: 24,
    height: 24,
    borderRadius: 12,
    // marginRight: 8,
  },

  countryCode: {
    marginLeft: 8,
  },
});
