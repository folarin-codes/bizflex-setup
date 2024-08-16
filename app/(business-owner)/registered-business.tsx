import { StyleSheet, Text, TouchableOpacity, View, Button } from "react-native";
import React, { useEffect, useState } from "react";
import SignUpLayout from "@/layout/SignUpLayout";
import { COLORS } from "@/theme/theme";
import AccountTypeHeader from "@/components/AccountTypeHeader";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import FormField from "@/components/FormField";
import UploadDocSvg from "@/assets/svgs/UploadDocSvg";
import DropDownField from "@/components/DropDownField";
import CustomButton from "@/components/CustomButton";
import * as DocumentPicker from "expo-document-picker";

const businessDetailsSchema = z.object({
  businessName: z.string().trim().min(1, "Please enter your business name"),
  businessType: z.string().trim().min(1, "Please enter your business type"),
  //officeNumber: z.string().trim().min(1, "Please enter a valid office number"),
  officeNumber: z.coerce.number().min(1, "Please enter a valid office number"),
  officeAddress: z.string().trim().min(1, "Please enter your office address"),
  cacNumber: z.string().trim().min(1, "Please enter your CAC number"),
  tinNumber: z.string().trim().min(1, "Please enter your TIN number"),
  cacDocument: z
    .any()
    .refine(
      (value) => value !== null && value !== undefined,
      "CAC Document is required"
    ),
  utilityBill: z
    .any()
    .refine(
      (value) => value !== null && value !== undefined,
      "Utility Bill is required"
    ),
  memart: z
    .any()
    .refine(
      (value) => value !== null && value !== undefined,
      "Memart Document is required"
    ),
  // cacDocument: z.string().min(1, "CAC Document is required"),
  // utilityBill: z.string().min(1, "Utility Bill is required"),
  // memart: z.string().min(1, "Memart Document is required"),
});

type DocumentType = {
  "CAC Certificate": null;
  Utility: null;
  Memart: null;
};

type BusinessDetailsSchemaType = z.infer<typeof businessDetailsSchema>;

const RegisteredBusiness = () => {
  const router = useRouter();
  //   const { showSuccess, showError } = useToast();
  const [documents, setDocuments] = useState<DocumentType>({
    "CAC Certificate": null,
    Utility: null,
    Memart: null,
  });

  const {
    control,
    handleSubmit,
    formState: { errors, isDirty },
    watch,
    setValue,
  } = useForm({
    defaultValues: {
      businessName: "",
      businessType: "",
      officeNumber: 0,
      officeAddress: "",
      cacNumber: "",
      tinNumber: "",
      cacDocument: null,
      utilityBill: null,
      memart: null,
    },
    resolver: zodResolver(businessDetailsSchema),
  });

  // console.log("cacDocument", watch("cacDocument"));
  // console.log("utilityBill", watch("utilityBill"));
  // console.log("memart", watch("memart"));

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
        } else {
          console.log("File size exceeds 2MB"); //call use toast
        }
      } else {
        setDocuments((prevDocuments: DocumentType) => ({
          ...prevDocuments,
          [description]: null,
        }));
      }
    } catch (error) {
      console.error("Error selecting document:", error);
    }
  };

  useEffect(() => {
    Object.entries(documents).forEach(([key, document]) => {
      if (document) {
        const fieldName =
          key === "CAC Certificate"
            ? "cacDocument"
            : key === "Utility"
            ? "utilityBill"
            : key === "Memart"
            ? "memart"
            : null;

        if (fieldName) {
          setValue(fieldName, document.uri || "");
        }
      }
    });
  }, [documents, setValue]);

  const onSubmit = async (data: BusinessDetailsSchemaType) => {
    console.log(data);
    router.push("/(business-owner)/directors");
  };

  return (
    <SignUpLayout>
      <View style={{ flex: 1, paddingBottom: 80 }}>
        <AccountTypeHeader
          title="Business Details"
          des="Business Ownership"
          step={1}
          totalSteps={6}
        />

        <View style={styles.formContainer}>
          <FormField
            label="Business Name"
            labelOptional="(As printed on CAC)"
            control={control}
            name="businessName"
            placeholder="Enter Business Name"
            rules={{ required: "Business name is required" }}
          />

          <FormField
            label="Business Type"
            control={control}
            name="businessType"
            placeholder="Enter Business Type"
            rules={{ required: "Business type is required" }}
          />

          <FormField
            label="Office Number"
            control={control}
            name="officeNumber"
            placeholder="Enter office number"
            rules={{ required: "Office number is required" }}
          />
          <FormField
            label="Office Address"
            labelOptional="(Street,Closest Bustop)"
            control={control}
            name="officeAddress"
            placeholder="Enter office address"
            rules={{ required: "Office address is required" }}
          />
          <FormField
            label="CAC Number"
            control={control}
            name="cacNumber"
            placeholder="Enter CAC number"
            rules={{ required: "CAC number is required" }}
          />
          <FormField
            label="TIN Number"
            control={control}
            name="tinNumber"
            placeholder="Enter TIN Number"
            rules={{ required: "Tin number is required" }}
          />

          {/* <DropDownField
            label="Select State"
            name="selectedState"
            control={control}
            placeholder="Select State"
            data={[
              { value: "1", label: "State 1" },
              { value: "2", label: "State 2" },
            ]}
          />
          <DropDownField
            label="Select Country"
            name="country"
            control={control}
            placeholder="Select Country"
            data={[
              { value: "1", label: "Nigeria" },
              { value: "2", label: "Ghana" },
            ]}
          /> */}
        </View>
        <View style={styles.uploadGroup}>
          <View>
            <Controller
              control={control}
              name="cacDocument"
              render={({ field: { onChange, value } }) => (
                <TouchableOpacity
                  activeOpacity={0.6}
                  style={styles.uploadCAC}
                  onPress={() => pickDocument("CAC Certificate")}
                >
                  <UploadDocSvg />
                  <View style={styles.uploadTextGroup}>
                    <Text style={styles.uploadTitle}>Upload CAC</Text>
                    <Text style={[styles.uploadTitle, { fontSize: 10 }]}>
                      Document Bill (Max. 2MB)
                    </Text>
                    <Text style={styles.uploadDes}>
                      File type: JPEG, PNG, PDF.
                    </Text>
                  </View>
                </TouchableOpacity>
              )}
            />
            {documents?.["CAC Certificate"] ? (
              <Text style={styles.fileName}>
                {documents["CAC Certificate"]?.name || null}
              </Text>
            ) : (
              errors.cacDocument && (
                <Text style={styles.errorWarning}>
                  {errors.cacDocument.message}
                </Text>
              )
            )}
          </View>

          <View>
            <View style={styles.memartGroup}>
              <Controller
                control={control}
                name="utilityBill"
                render={({ field: { onChange, value } }) => (
                  <TouchableOpacity
                    activeOpacity={0.6}
                    style={styles.memart}
                    onPress={() => pickDocument("Utility")}
                  >
                    <UploadDocSvg />
                    <View style={styles.uploadTextGroup}>
                      <Text style={styles.uploadTitle}>Upload Business</Text>
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
              <Controller
                control={control}
                name="memart"
                render={({ field: { onChange, value } }) => (
                  <TouchableOpacity
                    activeOpacity={0.6}
                    style={styles.memart}
                    onPress={() => pickDocument("Memart")}
                  >
                    <UploadDocSvg />
                    <View style={styles.uploadTextGroup}>
                      <Text style={styles.uploadTitle}>Upload Memart</Text>
                      <Text style={styles.uploadDes}>
                        File type: JPEG, PNG, PDF.
                      </Text>
                    </View>
                  </TouchableOpacity>
                )}
              />
            </View>
            {(errors?.utilityBill || errors?.memart) && (
              <Text style={styles.errorWarning}>
                {errors.utilityBill?.message || errors.memart?.message}
              </Text>
            )}
            <Text style={styles.fileName}>
              {documents && (documents["Utility"] || documents["Memart"])
                ? documents["Utility"]?.name || documents["Memart"]?.name
                : null}
            </Text>
            <Text style={styles.fileName}>
              {documents && documents["Memart"]
                ? documents["Memart"]?.name
                : null}
            </Text>
          </View>
        </View>

        <CustomButton
          title="Update"
          style={{ marginTop: 64 }}
          onPress={handleSubmit(onSubmit)}
        />
      </View>
    </SignUpLayout>
  );
};

export default RegisteredBusiness;

const styles = StyleSheet.create({
  formContainer: {
    marginTop: 28,
    flexDirection: "column",
    gap: 22,
  },
  formLabel: {
    marginBottom: 10,
    fontFamily: "medium",
    fontWeight: "500",
    fontSize: 14,
    color: "#07142F",
  },
  uploadGroup: {
    marginTop: 75,
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
  memartGroup: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  memart: {
    //width: "45%",
    height: 80,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "rgba(15, 23, 43, 0.3)",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 4,
    //justifyContent: "center",
    backgroundColor: "white",
    // paddingVertical: 16,
    paddingHorizontal: 5,
    borderRadius: 10,
  },
  fileName: {
    fontSize: 12,
    fontFamily: "regular",
    fontWeight: "400",
    color: COLORS.primary,
  },
  errorWarning: {
    // marginTop: 5,
    fontSize: 12,
    fontFamily: "regular",
    fontWeight: "400",
    color: "red",
  },
});
