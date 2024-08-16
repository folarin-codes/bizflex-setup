import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Pressable,
  FlatList,
  FlatListType,
} from "react-native";
import React, { useState, useRef } from "react";
import SignUpLayout from "@/layout/SignUpLayout";
import AccountTypeHeader from "@/components/AccountTypeHeader";
import FormField from "@/components/FormField";
import { COLORS } from "@/theme/theme";
import { z } from "zod";
import {
  Controller,
  useForm,
  SubmitHandler,
  useFieldArray,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomButton from "@/components/CustomButton";
import { useRouter } from "expo-router";
import DropDownField from "@/components/DropDownField";
import UploadDocSvg from "@/assets/svgs/UploadDocSvg";
import * as DocumentPicker from "expo-document-picker";
import { SafeAreaView } from "react-native-safe-area-context";
import GoBack from "@/assets/svgs/GoBack";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { width } from "@/utils/Constants";
import EditDirectorSvg from "@/assets/svgs/EditDirectorSvg";
import EditDirectorSvg2 from "@/assets/svgs/EditDirectorSvg2";

const BusinessDirectorsOthers = () => {
  const router = useRouter();
  const numOfDirectors = 3;
  const flatListRef = useRef<FlatListType<any> | null>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const [documents, setDocuments] = useState<Array<{ Utility: any }>>(
    Array(numOfDirectors).fill({ Utility: null })
  );

  const signUpOtherDirectorsSchema = z.object({
    directors: z
      .array(
        z.object({
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
          // utilityBill: z
          //   .any()
          //   .refine(
          //     (value) => value !== null && value !== undefined,
          //     "Utility Bill is required"
          //   ),
          utilityBill: z
            .string()
            .refine((val) => val !== "", "Utility Bill is required")
            .optional(),
        })
      )
      .length(numOfDirectors),
  });

  type signUpOtherDirectorsType = z.infer<typeof signUpOtherDirectorsSchema>;

  const {
    control,
    handleSubmit,
    formState: { errors, isDirty, isValid },
    watch,
    setValue,
    getValues,
  } = useForm({
    defaultValues: {
      directors: Array.from({ length: numOfDirectors }, () => ({
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
      })),
    },
    resolver: zodResolver(signUpOtherDirectorsSchema),
  });

  const { fields, insert, remove } = useFieldArray({
    control,
    name: "directors",
  });

  const directorsDetails = watch("directors");

  //console.log("watch", watch("directors"));

  const pickDocument = async (index: number) => {
    try {
      let result = await DocumentPicker.getDocumentAsync({
        type: ["image/*", "application/pdf"],
      });

      if (result.assets && result.assets.length > 0) {
        const file = result.assets[0];
        const fileSizeInMB = file.size / (1024 * 1024);

        if (fileSizeInMB <= 2) {
          const updatedDocuments = [...documents];
          updatedDocuments[index] = { Utility: file };
          setDocuments(updatedDocuments);

          setValue(`directors.${index}.utilityBill`, file.uri);
        } else {
          console.log("File size exceeds 2MB");
        }
      } else {
        const updatedDocuments = [...documents];
        updatedDocuments[index] = { Utility: null };
        setDocuments(updatedDocuments);
        setValue(`directors.${index}.utilityBill`, "");
      }
    } catch (error) {
      console.error("Error selecting document:", error);
    }
  };

  const handleViewableItemsChanged = ({ viewableItems }: any) => {
    if (viewableItems && viewableItems.length > 0) {
      setActiveIndex(viewableItems[0].index || 0);
    }
  };

  const onSubmit: SubmitHandler<any> = async (data) => {
    console.log("Form Data Submitted:", data);
    router.push("/(business-owner)/add-signatories-onboarding");
  };

  // Scroll to the specific form field
  const navigateToFormField = (index: number) => {
    setActiveIndex(index);

    flatListRef.current?.scrollToIndex({
      index,
      animated: true,
    });
  };

  const handleBackPress = () => {
    if (activeIndex === 0) {
      router.back();
    } else {
      // Move to the previous index in the FlatList
      const previousIndex = activeIndex - 1;
      setActiveIndex(previousIndex);
      flatListRef.current?.scrollToIndex({
        index: previousIndex,
        animated: true,
      });
    }
  };

  const renderItem = ({ item, index }: { item: any; index: number }) => (
    <View style={styles.main}>
      <AccountTypeHeader
        title="Business Directors"
        des="Signatories"
        step={3}
        totalSteps={6}
      />

      {numOfDirectors > 1 && activeIndex === numOfDirectors - 1 && (
        <View style={styles.directorCont}>
          {directorsDetails
            ?.slice(0, numOfDirectors - 1)
            ?.map((item: any, index) => (
              <TouchableOpacity
                style={styles.director}
                key={index}
                onPress={() => navigateToFormField(index)}
              >
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: "500",
                    fontFamily: "medium",
                    color: "white",
                  }}
                >
                  {item?.firstName}
                </Text>
                <View style={styles.directorsBottom}>
                  <Text
                    style={{
                      fontSize: 10,
                      fontWeight: "400",
                      fontFamily: "regular",
                      color: "white",
                    }}
                  >
                    Director {index + 1}
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 4,
                    }}
                  >
                    <EditDirectorSvg />

                    <EditDirectorSvg2 />
                  </View>
                </View>
              </TouchableOpacity>
            ))}
        </View>
      )}

      <Text style={styles.headerDes}>Director {index + 1}</Text>
      <View style={styles.formContainer}>
        <FormField
          label="First Name"
          control={control}
          name={`directors.${index}.firstName`}
          placeholder="Enter first name"
          rules={{ required: "Please enter your first name" }}
        />

        <FormField
          label="Middle Name"
          control={control}
          name={`directors.${index}.middleName`}
          placeholder="Enter middle Name (Optional)"
          rules={{ required: "Please enter your middle name" }}
        />

        <FormField
          label="Surname Name"
          control={control}
          name={`directors.${index}.surname`}
          placeholder="Enter Surname (Family Name)"
          rules={{ required: "Please enter your surname name" }}
        />
        <FormField
          label="Phone Number"
          control={control}
          name={`directors.${index}.phoneNumber`}
          placeholder="Enter phone number"
          countryCode={true}
        />

        <FormField
          label="Email"
          control={control}
          name={`directors.${index}.email`}
          placeholder="Enter Email"
          rules={{ required: "Please enter your email" }}
        />
        <FormField
          label="Address"
          control={control}
          name={`directors.${index}.address`}
          placeholder="Enter full address"
          rules={{ required: "Address is required" }}
        />
        <FormField
          label="City"
          control={control}
          name={`directors.${index}.city`}
          placeholder="Enter city"
          rules={{ required: "City is required" }}
        />
        <DropDownField
          label="State"
          name={`directors.${index}.state`}
          control={control}
          placeholder="Select State"
          data={[
            { value: "1", label: "State 1" },
            { value: "2", label: "State 2" },
          ]}
        />
        <DropDownField
          label="Country"
          name={`directors.${index}.country`}
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
          name={`directors.${index}.bvn`}
          placeholder="Enter Bvn"
          rules={{ required: "Bvn is required" }}
        />
        <FormField
          label="NIN"
          control={control}
          name={`directors.${index}.nin`}
          placeholder="Enter NIN"
          rules={{ required: "NIN is required" }}
        />
      </View>

      <View style={styles.uploadGroup}>
        <View>
          <Controller
            control={control}
            name={`directors.${index}.utilityBill`}
            render={({ field: { onChange, value } }) => (
              <TouchableOpacity
                activeOpacity={0.6}
                style={styles.uploadCAC}
                onPress={() => pickDocument(index)}
              >
                <UploadDocSvg />
                <View style={styles.uploadTextGroup}>
                  <Text style={styles.uploadTitle}>
                    Upload Director {index + 1}
                  </Text>
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
          {/* {documents[index]?.Utility && (
            <Text style={styles.fileName}>
              {documents[index]?.Utility?.name}
            </Text>
          )} */}
          {documents[index]?.Utility && (
            <Text style={styles.fileName}>
              {documents[index].Utility?.name}
            </Text>
          )}

          {errors.directors?.[index]?.utilityBill && (
            <Text style={styles.errorWarning}>
              {errors.directors[index].utilityBill?.message}
            </Text>
          )}
        </View>
      </View>

      {activeIndex < numOfDirectors - 1 ? (
        <Pressable
          style={styles.addMoreDirectors}
          onPress={() => {
            if (activeIndex < numOfDirectors - 1) {
              const nextIndex = activeIndex + 1;
              const currentFormData = getValues(`directors.${activeIndex}`);
              const isCurrentFormValid = Object.values(currentFormData).every(
                (val) => val.trim() !== ""
              );

              if (isCurrentFormValid) {
                setActiveIndex(nextIndex);
                flatListRef.current?.scrollToIndex({
                  index: nextIndex,
                  animated: true,
                });
              } else {
                console.log("Please fill all required fields.");
              }
            } else {
              console.log("call me");
              //handleSubmit(onSubmit);
            }
          }}
        >
          <Text style={styles.addMoreDirectorsText}>+ Add More Directors</Text>
        </Pressable>
      ) : null}

      <CustomButton
        title={"Update"}
        disabled={activeIndex < numOfDirectors - 1 || !isDirty}
        style={{ marginTop: activeIndex < numOfDirectors - 1 ? 0 : 32 }}
        onPress={handleSubmit(onSubmit)}
      />
    </View>
  );

  return (
    <SafeAreaView
      style={styles.container}
      edges={["right", "left", "top", "bottom"]}
    >
      <Pressable style={{ paddingHorizontal: 24 }} onPress={handleBackPress}>
        <GoBack />
      </Pressable>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ width: width, flexGrow: 1 }}
      >
        <FlatList
          data={fields}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
          pagingEnabled
          horizontal
          showsHorizontalScrollIndicator={false}
          onViewableItemsChanged={handleViewableItemsChanged}
          ref={flatListRef}
        />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default BusinessDirectorsOthers;

const styles = StyleSheet.create({
  container: {
    width: width,
    flex: 1,
    backgroundColor: COLORS.screenBackground,
  },
  main: {
    width: width,
    paddingHorizontal: 24,
    flex: 1,
    marginTop: 32,
    paddingBottom: 20,
  },
  directorCont: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    flexWrap: "wrap",
    gap: 12,
  },
  director: {
    width: "45%",
    paddingVertical: 8,
    paddingHorizontal: 14,
    backgroundColor: "black",
    marginTop: 32,
    flexDirection: "column",
    gap: 1,
    borderRadius: 4,
  },
  directorsBottom: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
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
  addMoreDirectors: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 32,
  },
  addMoreDirectorsText: {
    fontFamily: "semibold",
    fontWeight: "400",
    fontSize: 16,
    color: COLORS.primary,
  },
});
