import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  StyleProp,
  ViewStyle,
  KeyboardTypeOptions,
  TextInputProps,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Controller, useForm, UseFormProps } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { COLORS } from "@/theme/theme";

interface CustomTextInputProps extends UseFormProps {
  style?: StyleProp<ViewStyle>;
  name: string;
  control: any;
  rules?: any;
  placeholder?: string;
  secureTextEntry?: boolean;
  showPasswordIcon?: boolean;
  hideErrorMessage?: boolean;
  otherProps?: { [key: string]: any };
  keyboardType?: KeyboardTypeOptions;
  icon?: any;
  maxLength?: number;
  className?: string;
  suffix?: any;
  editable?: boolean;
}

const CustomTextInput: React.FC<CustomTextInputProps> = ({
  style,
  name,
  control,
  rules,
  placeholder,
  secureTextEntry,
  showPasswordIcon,
  hideErrorMessage,
  keyboardType,
  icon,
  maxLength,
  suffix,
  editable,
  ...otherProps
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  return (
    <View style={[styles.inputContainer]}>
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field: { onChange, onBlur, value }, fieldState }) => (
          <>
            <View style={styles.inputWrapper}>
              {icon}
              <TextInput
                style={[styles.input, style, { marginLeft: icon && 14 }]}
                placeholder={placeholder}
                placeholderTextColor={"#CBD2D9"}
                secureTextEntry={secureTextEntry && !isPasswordVisible}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                maxLength={maxLength}
                keyboardType={keyboardType}
                autoCorrect={false}
                editable={editable}
                {...otherProps}
              />
              {secureTextEntry && showPasswordIcon && (
                <TouchableOpacity onPress={togglePasswordVisibility}>
                  <Ionicons
                    name={isPasswordVisible ? "eye-off" : "eye"}
                    size={20}
                    color="#8C8C8C"
                  />
                </TouchableOpacity>
              )}
              {suffix ? suffix : null}
            </View>

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

export default CustomTextInput;

const styles = StyleSheet.create({
  inputContainer: {
    // marginTop: 8,
    width: "100%",
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    borderRadius: 10,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#C6D8FF",
    paddingVertical: 19,
    paddingHorizontal: 20,
  },
  input: {
    flex: 1,
    fontFamily: "regular",
    fontWeight: "400",
    fontSize: 14,
    color: COLORS.textInput,
  },

  errorWarning: {
    // marginTop: 5,
    fontSize: 12,
    fontFamily: "regular",
    fontWeight: "400",
    color: "red",
  },
});
