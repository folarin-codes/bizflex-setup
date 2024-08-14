import React from "react";
import { StyleSheet, Text, View, StyleProp, ViewStyle } from "react-native";
import { Controller } from "react-hook-form";
import { Dropdown } from "react-native-element-dropdown";
import { COLORS } from "@/theme/theme";

interface DropDownProps {
  label: string;
  style?: StyleProp<ViewStyle>;
  name: string;
  control: any;
  rules?: any;
  placeholder?: string;
  hideErrorMessage?: boolean;
  data: { value: string; label: string }[];
}

const DropDownField: React.FC<DropDownProps> = ({
  label,
  style,
  name,
  control,
  rules,
  placeholder = "Select an option",
  hideErrorMessage,
  data,
}) => {
  return (
    <View style={[styles.inputContainer, style]}>
      <Text style={styles.formLabel}>{label}</Text>
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field: { onChange, value, onBlur }, fieldState }) => (
          <>
            <Dropdown
              style={styles.dropdown}
              selectedTextStyle={styles.selectedTextStyle}
              itemTextStyle={styles.itemTextStyle}
              placeholderStyle={styles.placeholderStyle}
              placeholder={placeholder}
              data={data}
              labelField="label"
              valueField="value"
              value={value}
              onChange={(item: any) => {
                onChange(item.value);
              }}
            />
            {fieldState.error && !hideErrorMessage && (
              <Text style={styles.errorWarning}>
                {fieldState.error.message}
              </Text>
            )}
          </>
        )}
      />
    </View>
  );
};

export default DropDownField;

const styles = StyleSheet.create({
  inputContainer: {
    width: "100%",
  },
  formLabel: {
    marginBottom: 10,
    fontFamily: "medium",
    fontSize: 14,
    color: "#07142F",
  },
  dropdown: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#C6D8FF",
    borderRadius: 10,
    paddingVertical: 19,
    paddingHorizontal: 20,
  },
  selectedTextStyle: {
    color: COLORS.textInput,
    fontSize: 14,
    fontWeight: "400",
    fontFamily: "regular",
  },
  itemTextStyle: {
    textTransform: "capitalize",
    color: COLORS.textInput,
    fontSize: 14,
  },
  placeholderStyle: {
    color: "#D2D2D2",
    fontSize: 14,
    fontWeight: "400",
  },
  errorWarning: {
    fontSize: 12,
    fontFamily: "regular",
    fontWeight: "400",
    color: "red",
  },
});
