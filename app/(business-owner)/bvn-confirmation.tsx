import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TextInput,
} from "react-native";
import React, { useState, useRef, RefObject } from "react";
import SignUpLayout from "@/layout/SignUpLayout";
import CustomOTPInput from "@/components/CustomOTPInput";
import { COLORS } from "@/theme/theme";
import { useRouter } from "expo-router";
import CustomButton from "@/components/CustomButton";

const BvnConfirmation = () => {
  const [codes, setCodes] = useState<string[]>(Array(4).fill(""));
  const [errorMessages, setErrorMessages] = useState<string[]>();
  const router = useRouter();

  const refs: RefObject<TextInput>[] = [
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
  ];

  const onChangeCode = (text: string, index: number) => {
    if (text.length > 1) {
      setErrorMessages(undefined);
      const newCodes = text.split("");
      setCodes(newCodes);
      refs[5]!.current?.focus();
      return;
    }
    setErrorMessages(undefined);
    const newCodes = [...codes!];
    newCodes[index] = text;
    setCodes(newCodes);
    if (text !== "" && index < 3) {
      refs[index + 1]!.current?.focus();
    }
  };

  const isButtonDisabled = () => {
    return codes.some((code) => code.trim() === "");
  };

  async function verifyPhoneNumberAndProgress() {
    const fullCode = codes!.join("");
    console.log(fullCode);
    router.push("/(business-owner)/business-directors-others");
    try {
      //LOG
    } catch (err: unknown) {
      // handle the error
    }
  }

  return (
    <SignUpLayout>
      <View style={{ flex: 1 }}>
        <View style={styles.headerGroup}>
          <Text style={styles.headerTitle}>BVN Confirmation</Text>
          <Text style={styles.headerDes}>
            Kindly input the OTP code sent to the mobile number {"\n"} attached
            to your BVN to proceed.
          </Text>
        </View>

        <KeyboardAvoidingView style={{ marginTop: 48 }}>
          <CustomOTPInput
            codes={codes!}
            errorMessages={errorMessages}
            onChangeCode={onChangeCode}
            refs={refs}
          />
        </KeyboardAvoidingView>

        <CustomButton
          title="Proceed"
          style={{ marginTop: "30%", marginBottom: 28 }}
          disabled={isButtonDisabled()}
          onPress={verifyPhoneNumberAndProgress}
        />

        <View
          style={{
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={styles.resendText}>
            Didn't get code.{" "}
            <Text
              style={{ color: COLORS.primary }}
              onPress={() => console.log("resend")}
            >
              Resend
            </Text>
          </Text>
        </View>
      </View>
    </SignUpLayout>
  );
};

export default BvnConfirmation;

const styles = StyleSheet.create({
  headerGroup: {
    alignItems: "center",
    justifyContent: "center",
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
    textAlign: "center",
  },
  resendText: {
    textAlign: "left",
    fontFamily: "regular",
    fontSize: 14,
    color: "#828282",
  },
});
