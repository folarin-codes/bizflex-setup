import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import SignUpLayout from "@/layout/SignUpLayout";
import AccountTypeHeader from "@/components/AccountTypeHeader";
import FormField from "@/components/FormField";
import { COLORS } from "@/theme/theme";
import { z } from "zod";
import { Controller, useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomButton from "@/components/CustomButton";
import { useRouter } from "expo-router";
import DropDownField from "@/components/DropDownField";
import UploadDocSvg from "@/assets/svgs/UploadDocSvg";
import * as DocumentPicker from "expo-document-picker";

const signUpOtherDirectorsSchema = z.object({
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
  address: z.string().trim().min(1, "Please enter your business name"),
  city: z.string().trim().min(1, "Please enter your business type"),
  state: z.string().trim().min(1, "Please enter select your state"),
  country: z.string().trim().min(1, "Please enter your office address"),
  bvn: z.string().refine(
    (val) => {
      return val.length === 11 && /^\d+$/.test(val);
    },
    { message: "BVN must be 11 digits" }
  ),
  nin: z
    .string()
    .refine((val) => val.length === 11 && /^\d+$/.test(val), {
      message: "NIN must be 11 digits",
    })
    .transform((val) => parseInt(val, 10)),
  utilityBill: z
    .any()
    .refine(
      (value) => value !== null && value !== undefined,
      "Utility Bill is required"
    ),

  // noteQuantity: z.coerce
  //   .number()
  //   .min(1, "Minimum beels note is 1")
  //   .max(500, "Maximum beels note is 500"),
});

type signUpOtherDirectorsType = z.infer<typeof signUpOtherDirectorsSchema>;

const BusinessDirectorsOthers = () => {
  const router = useRouter();

  const [documents, setDocuments] = useState<any>({
    Utility: null,
  });

  const {
    control,
    handleSubmit,
    formState: { errors, isDirty },
    watch,
    setValue,
  } = useForm({
    defaultValues: {
      firstName: "",
      middleName: "",
      surname: "",
      phoneNumber: "",
      email: "",
      address: "",
      city: "",
      state: "",
      country: "",
      bvn: "",
      nin: "",
      utilityBill: "",
    },
    resolver: zodResolver(signUpOtherDirectorsSchema),
  });

  const pickDocument = async (description: string) => {
    try {
      let result = await DocumentPicker.getDocumentAsync({
        type: ["image/*", "application/pdf"],
      });
      if (result?.assets && result.assets.length > 0) {
        const file = result.assets[0];
        const fileSizeInMB = file.size / (1024 * 1024);
        console.log("File size in MB:", fileSizeInMB);

        if (fileSizeInMB <= 2) {
          const updatedDocuments = {
            ...documents,
            [description]: file,
          };
          setDocuments(updatedDocuments);
          setValue("utilityBill", file.uri);
        } else {
          console.log("File size exceeds 2MB"); //call use toast
        }
      } else {
        setDocuments((prevDocuments: DocumentType) => ({
          ...prevDocuments,
          [description]: null,
        }));
        setValue("utilityBill", "");
      }
    } catch (error) {
      console.error("Error selecting document:", error);
    }
  };

  // const onSubmit = async (data: signUpOtherDirectorsType) => {
  //   console.log(data);
  //   router.push("/(business-owner)/bvn-confirmation");
  // };

  const onSubmit: SubmitHandler<signUpOtherDirectorsType> = async (data) => {
    console.log(data);
    router.push("/(business-owner)/bvn-confirmation");
  };

  return (
    <SignUpLayout>
      <View style={{ flex: 1 }}>
        <AccountTypeHeader
          title="Business Directors"
          des="Signatories"
          step={3}
          totalSteps={6}
        />

        <Text style={styles.headerDes}>Director 2</Text>
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
            label="Address"
            control={control}
            name="address"
            placeholder="Enter full address"
            rules={{ required: "Address is required" }}
          />
          <FormField
            label="City"
            control={control}
            name="city"
            placeholder="Enter city"
            rules={{ required: "City is required" }}
          />
          <DropDownField
            label="State"
            name="state"
            control={control}
            placeholder="Select State"
            data={[
              { value: "1", label: "State 1" },
              { value: "2", label: "State 2" },
            ]}
          />
          <DropDownField
            label="Country"
            name="country"
            control={control}
            placeholder="Select Country"
            data={[
              { value: "1", label: "State 1" },
              { value: "2", label: "State 2" },
            ]}
          />

          <FormField
            label="BVN"
            control={control}
            name="bvn"
            placeholder="Enter Bvn"
            rules={{ required: "Bvn is required" }}
            // keyboardType=""
          />
          <FormField
            label="NIN"
            control={control}
            name="nin"
            placeholder="Enter NIN"
            rules={{ required: "NIN is required" }}
            // keyboardType=""
          />
        </View>

        <View style={styles.uploadGroup}>
          <View>
            <Controller
              control={control}
              name="utilityBill"
              render={({ field: { onChange, value } }) => (
                <TouchableOpacity
                  activeOpacity={0.6}
                  style={styles.uploadCAC}
                  onPress={() => pickDocument("Utility")}
                >
                  <UploadDocSvg />
                  <View style={styles.uploadTextGroup}>
                    <Text style={styles.uploadTitle}>Upload Director 1</Text>
                    <Text style={[styles.uploadTitle, { fontSize: 10 }]}>
                      Utility Bill (Max. 2MB)
                    </Text>
                    <Text style={styles.uploadDes}>
                      File type: JPEG, PNG, PDF.
                    </Text>
                  </View>
                </TouchableOpacity>
              )}
            />
            {documents?.Utility && (
              <Text style={styles.fileName}>{documents.Utility?.name}</Text>
            )}

            {errors.utilityBill && (
              <Text style={styles.errorWarning}>
                {errors?.utilityBill?.message}
              </Text>
            )}
          </View>
        </View>

        <CustomButton
          title="Update"
          style={{ marginTop: 34 }}
          // disabled={!isDirty}
          onPress={handleSubmit(onSubmit)}
        />
      </View>
    </SignUpLayout>
  );
};

export default BusinessDirectorsOthers;

const styles = StyleSheet.create({
  headerDes: {
    fontFamily: "regular",
    fontSize: 12,
    fontWeight: "400",
    color: "#8E8E8E",
    marginTop: 14,
    fontStyle: "italic",
  },
  formContainer: {
    marginTop: 28,
    flexDirection: "column",
    gap: 22,
  },
  uploadGroup: {
    marginTop: 29,
    flexDirection: "column",
    gap: 16,
  },
  uploadCAC: {
    width: "100%",
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "rgba(15, 23, 43, 0.3)",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: "white",
    paddingVertical: 16,
    borderRadius: 10,
  },
  uploadTextGroup: {
    alignItems: "center",
    justifyContent: "center",
  },
  uploadTitle: {
    fontFamily: "regular",
    fontWeight: "400",
    fontSize: 12,
    color: COLORS.primary,
  },
  uploadDes: {
    fontFamily: "regular",
    fontWeight: "400",
    fontSize: 10,
    color: "#828282",
  },
  fileName: {
    fontSize: 12,
    fontFamily: "regular",
    fontWeight: "400",
    color: COLORS.primary,
  },
  errorWarning: {
    fontSize: 12,
    fontFamily: "regular",
    fontWeight: "400",
    color: "red",
  },
});
