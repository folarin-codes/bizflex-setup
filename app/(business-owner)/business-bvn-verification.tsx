import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import SignUpLayout from "@/layout/SignUpLayout";
import AccountTypeHeader from "@/components/AccountTypeHeader";
import FormField from "@/components/FormField";
import { COLORS } from "@/theme/theme";
import CustomButton from "@/components/CustomButton";

const bvnSchema = z.object({
  bvn: z.string().refine(
    (val) => {
      return val.length === 11 && /^\d+$/.test(val);
    },
    { message: "BVN must be a string with 11 digits" }
  ),
});

type bvnSchemaType = z.infer<typeof bvnSchema>;

const BusinessBvnVerification = () => {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors, isDirty },
    watch,
    setValue,
  } = useForm({
    defaultValues: {
      bvn: "",
    },
    resolver: zodResolver(bvnSchema),
    mode: "onBlur",
  });

  const onSubmit = async (data: bvnSchemaType) => {
    console.log(data);
    router.push("/(business-owner)/bvn-confirmation");
  };
  return (
    <SignUpLayout>
      <View style={{ flex: 1 }}>
        <AccountTypeHeader
          title="Business Verification"
          des="Profile Verification"
          step={3}
          totalSteps={6}
        />

        <View style={styles.headerGroup}>
          <Text style={styles.headerDes}>
            Kindly provide directors details, the person registering the account
            automatically becomes the Director 1.
          </Text>
        </View>

        <View
          style={{
            flex: 1,
            width: "100%",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View style={styles.formContainer}>
            <FormField
              label="BVN"
              control={control}
              name="bvn"
              placeholder="Enter Bvn"
              rules={{ required: "Bvn is required" }}
              // keyboardType=""
            />
          </View>

          <CustomButton
            title="Update"
            disabled={!isDirty}
            style={{ marginBottom: "10%" }}
            onPress={handleSubmit(onSubmit)}
          />
        </View>
      </View>
    </SignUpLayout>
  );
};

export default BusinessBvnVerification;

const styles = StyleSheet.create({
  headerGroup: {
    marginTop: 18,
  },
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
    width: "100%",
    marginTop: 28,
    flexDirection: "column",
    gap: 22,
  },
});
