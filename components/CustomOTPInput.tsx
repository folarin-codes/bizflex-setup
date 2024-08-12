import { COLORS } from "@/theme/theme";
import React, { useState, type RefObject } from "react";
import { TextInput, View, StyleSheet } from "react-native";

interface OTPInputProps {
  codes: string[];
  refs: RefObject<TextInput>[];
  errorMessages: string[] | undefined;
  onChangeCode: (text: string, index: number) => void;
}

const CustomOTPInput = ({
  codes,
  refs,
  errorMessages,
  onChangeCode,
}: OTPInputProps) => {
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

  const handleFocus = (index: number) => setFocusedIndex(index);
  const handleBlur = () => setFocusedIndex(null);

  const maskValue = (value: string) => {
    return value.replace(/./g, "*");
  };

  return (
    <View style={styles.container}>
      {codes.map((code, index) => (
        <TextInput
          key={index}
          autoComplete="one-time-code"
          enterKeyHint="next"
          style={[
            styles.input,
            {
              backgroundColor:
                focusedIndex === index ? "white" : "rgba(164, 169, 174, 0.15)",
              borderWidth: focusedIndex === index ? 1.12 : 0,
            },
            errorMessages && styles.errorInput,
          ]}
          inputMode="numeric"
          onChangeText={(text) => onChangeCode(text, index)}
          value={maskValue(code)}
          onFocus={() => handleFocus(index)}
          onBlur={handleBlur}
          maxLength={1}
          ref={refs[index]}
          onKeyPress={({ nativeEvent: { key } }) => {
            if (key === "Backspace" && index > 0) {
              onChangeCode("", index - 1);
              refs[index - 1]!.current!.focus();
            }
          }}
        />
      ))}
    </View>
  );
};

export default CustomOTPInput;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },
  input: {
    fontSize: 33,
    height: 64,
    width: 64,
    borderRadius: 5.6,
    color: "#23303B",
    borderColor: COLORS.primary,
    textAlign: "center",
  },
  errorInput: {
    borderColor: "red",
    color: "red",
  },
});
