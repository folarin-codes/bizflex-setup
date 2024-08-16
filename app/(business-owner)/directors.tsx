import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import SignUpLayout from "@/layout/SignUpLayout";
import AccountTypeHeader from "@/components/AccountTypeHeader";
import CustomButton from "@/components/CustomButton";
import Icon, { Icons } from "@/components/Icon";
import { COLORS, SIZES } from "@/theme/theme";
import { useRouter } from "expo-router";
import CustomDropDown from "@/components/CustomDropDown";

const Directors = () => {
  const router = useRouter();

  const [value, setValue] = useState<number>(0);

  const handleValueChange = (newValue: number) => {
    setValue(newValue);
  };

  const handleNav = () => {
    if (value) {
      router.push("/(business-owner)/business-directors-main");
    }
  };

  return (
    <SignUpLayout>
      <View style={{ flex: 1 }}>
        <AccountTypeHeader
          title="Business Details"
          des="Profile Verification"
          step={2}
          totalSteps={6}
        />
        <View style={styles.directorsCont}>
          <View style={styles.centerItems}>
            <View>
              <Text style={styles.directorsDes}>
                How many directors does your company have? {"\n"} (
                <Text style={{ fontWeight: "600", fontFamily: "semibold" }}>
                  CAMA
                </Text>{" "}
                allows for a sole director)
              </Text>
              <Text style={[styles.directorsDes, { marginTop: 16 }]}>
                Select 1: if you are the only director (Sole Director).
              </Text>
              <Text style={styles.directorsDes}>
                Select 2: or more if you will have multiple directors.
              </Text>
            </View>

            <CustomDropDown
              label="Directors"
              options={Array.from({ length: 4 }).map((_, index) =>
                (index + 1).toString()
              )}
              value={value}
              onValueChange={handleValueChange}
            />
          </View>

          <CustomButton
            title="Update"
            style={{ marginBottom: "20%" }}
            disabled={!value}
            onPress={handleNav}
          />
        </View>
      </View>
    </SignUpLayout>
  );
};

export default Directors;

const styles = StyleSheet.create({
  directorsCont: {
    width: "100%",
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 18,
  },
  centerItems: {
    position: "relative",
  },
  directorsDes: {
    fontFamily: "regular",
    fontWeight: "400",
    fontSize: 12,
    color: COLORS.text3,
    textAlign: "center",
  },
  formLabel: {
    fontFamily: "medium",
    fontWeight: "500",
    fontSize: 14,
    color: "#07142F",
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
    color: "#D2D2D2",
  },
  dropDownCont: {
    flexDirection: "column",
    gap: 16,
    paddingHorizontal: 16,
    paddingVertical: 20,
    borderWidth: 1,
    borderColor: "#C6D8FF",
  },
  dropDown: {
    //backgroundColor: "",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 8,
  },
  radio: {
    width: 29,
    height: 29,
    borderRadius: 29,
    borderWidth: 1,
    borderColor: "#B7B7B7",
    alignItems: "center",
    justifyContent: "center",
  },
  radioChecked: {
    width: 15,
    height: 15,
    borderRadius: 15,
  },
});
