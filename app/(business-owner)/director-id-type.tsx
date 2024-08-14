import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import SignUpLayout from "@/layout/SignUpLayout";
import { COLORS } from "@/theme/theme";
import AccountTypeHeader from "@/components/AccountTypeHeader";
import { useRouter } from "expo-router";
import DropDownField from "@/components/DropDownField";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";

const _IDType = [
  {
    value: "Bvn",
    label: "Bvn",
  },
  {
    value: "International Passporte",
    label: "International Passporte",
  },
  {
    value: "National ID Card",
    label: "National ID Card",
  },
  {
    value: "Voters Card",
    label: "Voters Card",
  },
];

const IDSchema = z.object({
  ID_Type: z.string().trim().min(1, "Please select ID type"),
  ID_Number: z.string().trim().min(1, "Please enter ID number"),
});

type IDSchemaType = z.infer<typeof IDSchema>;

const DirectorIDType = () => {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors, isDirty },
    watch,
    setValue,
  } = useForm({
    defaultValues: {
      ID_Type: "",
      ID_Number: "",
    },
    resolver: zodResolver(IDSchema),
  });

  const onSubmit = async (data: IDSchemaType) => {
    console.log(data);
    router.push("/(business-owner)/business-bvn-verification");
  };

  return (
    <SignUpLayout>
      <View style={{ flex: 1 }}>
        <AccountTypeHeader
          title="Profile Verification"
          des="Bvn Verification"
          step={4}
          totalSteps={6}
        />

        <View style={styles.headerGroup}>
          <Text style={styles.headerDes}>
            Kindly provide Director 1 profile details.
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
            <DropDownField
              label="ID Type"
              name="ID_Type"
              control={control}
              placeholder="Select ID Type"
              data={_IDType}
            />

            <FormField
              label="ID Number"
              control={control}
              name="ID_Number"
              placeholder="Enter ID number"
              rules={{ required: "ID number is required" }}
            />
          </View>

          <CustomButton
            title="Update"
            // disabled={!isDirty}
            style={{ marginBottom: "10%" }}
            onPress={handleSubmit(onSubmit)}
          />
        </View>
      </View>
    </SignUpLayout>
  );
};

export default DirectorIDType;

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
  formLabel: {
    fontFamily: "medium",
    fontWeight: "500",
    fontSize: 14,
    color: COLORS.labelText,
  },
});
