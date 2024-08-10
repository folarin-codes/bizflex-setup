// FormItem.tsx

import React from "react";
import { View, Text, StyleSheet } from "react-native";
import {
  Control,
  Controller,
  FieldValues,
  RegisterOptions,
} from "react-hook-form";
import CustomTextInput from "@/components/CustomTextInput";

interface FormItemProps<T extends FieldValues> {
  control: Control<T>;
  name: keyof T;
  placeholder: string;
  rules?: RegisterOptions;
  label: string;
}

const FormItem = <T extends FieldValues>({
  control,
  name,
  placeholder,
  rules,
  label,
}: FormItemProps<T>) => {
  return (
    <View style={styles.formItem}>
      <Text style={styles.formItemTitle}>{label}</Text>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, onBlur, value } }) => (
          <CustomTextInput
            onChangeText={onChange}
            onBlur={onBlur}
            value={value}
            placeholder={placeholder}
            rules={rules}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  formItem: {
    marginBottom: 16,
  },
  formItemTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
});

export default FormItem;
