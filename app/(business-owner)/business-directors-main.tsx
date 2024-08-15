import {
  StyleSheet,
  Text,
  View,
  Pressable,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import SignUpLayout from "@/layout/SignUpLayout";
import AccountTypeHeader from "@/components/AccountTypeHeader";
import { COLORS } from "@/theme/theme";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import FormField from "@/components/FormField";
import DropDownField from "@/components/DropDownField";
import CalendarSvg from "@/assets/svgs/CalendarSvg";
import UploadDocSvg from "@/assets/svgs/UploadDocSvg";
import * as DocumentPicker from "expo-document-picker";
import CustomButton from "@/components/CustomButton";

const directorMainSchema = z.object({
  address: z.string().trim().min(1, "Please enter your business name"),
  city: z.string().trim().min(1, "Please enter your business type"),
  state: z.string().trim().min(1, "Please enter select your state"),
  country: z.string().trim().min(1, "Please enter your office address"),
  dateOfBirth: z
    .string()
    .trim()
    .min(0, "Please enter your date of birth")
    .optional(),
  utilityBill: z
    .any()
    .refine(
      (value) => value !== null && value !== undefined,
      "Utility Bill is required"
    ),
});

type directorSchemaType = z.infer<typeof directorMainSchema>;

type DocumentType = {
  Utility: null;
};

const BusinessDirectorMain = () => {
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
      address: "",
      city: "",
      state: "",
      country: "",
      dateOfBirth: "",
      utilityBill: "",
    },
    resolver: zodResolver(directorMainSchema),
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

  useEffect(() => {
    if (documents?.Utility !== null) {
      setValue("utilityBill", documents?.Utility?.uri || "");
    }
  }, [documents, setValue]);

  console.log("utilityBill", watch("utilityBill"));

  const onSubmit = async (data: directorSchemaType) => {
    console.log(data);
    router.push("/(business-owner)/director-id-type");
  };

  return (
    <SignUpLayout>
      <View style={{ flex: 1 }}>
        <AccountTypeHeader
          title="Business Details"
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

        <View style={styles.formContainer}>
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
            label="Select State"
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
          {/* Date of Birth */}
          <View>
            <Text style={styles.formLabel}>Date of Birth</Text>
            <View>
              <Controller
                control={control}
                name="dateOfBirth"
                render={({ field: { onChange, value } }) => (
                  <Pressable
                    style={styles.dropDownStyle}
                    onPress={() => console.log("select date of birth")}
                  >
                    <Text
                      style={[
                        styles.placeholder,
                        // { color:  ? "#0F172B" : "#D2D2D2" },
                      ]}
                    >
                      Select Date of Birth
                    </Text>
                    <CalendarSvg strokeColor="#8E8E8E" />
                  </Pressable>
                )}
              />

              {errors.dateOfBirth && (
                <Text style={styles.errorWarning}>
                  {errors.dateOfBirth.message}
                </Text>
              )}
            </View>
          </View>
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
          disabled={!isDirty}
          onPress={handleSubmit(onSubmit)}
        />
      </View>
    </SignUpLayout>
  );
};

export default BusinessDirectorMain;

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
  dropDownStyle: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 19,
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#C6D8FF",
    backgroundColor: "#FFFFFF",
  },
  placeholder: {
    fontFamily: "regular",
    fontWeight: "400",
    fontSize: 14,
    color: COLORS.placeHolder,
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
