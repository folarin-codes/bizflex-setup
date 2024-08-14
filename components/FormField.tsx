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
import { COLORS } from "@/theme/theme";
import EyeSvg from "@/assets/svgs/EyeSvg";
import EyeOffSvg from "@/assets/svgs/EyeOffSvg";
import { Image } from "expo-image";
import Icon, { Icons } from "./Icon";

interface FormFieldProps extends UseFormProps {
  label: string;
  labelOptional?: string;
  countryCode?: boolean;
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

const FormField: React.FC<FormFieldProps> = ({
  label,
  labelOptional,
  countryCode,
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
  const [isDropdownVisible, setIsDropdownVisible] = useState<boolean>(false);

  const toggleDropdown = () => {
    setIsDropdownVisible((prev) => !prev);
  };
  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  return (
    <View style={styles.inputContainer}>
      <View style={styles.labelGroup}>
        <Text style={styles.formLabel}>{label}</Text>
        {labelOptional && (
          <Text style={styles.labelOptional}>{labelOptional}</Text>
        )}
      </View>
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field: { onChange, onBlur, value }, fieldState }) => (
          <>
            <View style={[styles.inputWrapper, style]}>
              {countryCode && (
                <>
                  <TouchableOpacity
                    style={styles.country}
                    onPress={toggleDropdown}
                  >
                    <Image
                      source={require("../assets/images/flag.png")}
                      contentFit="cover"
                      transition={1000}
                      style={{ width: 24, height: 24, borderRadius: 24 }}
                    />
                    <Text>NGN</Text>
                    <Icon
                      type={Icons.MaterialIcons}
                      name="keyboard-arrow-down"
                      color="#404040"
                      size={24}
                    />
                  </TouchableOpacity>
                  {isDropdownVisible && (
                    <View style={styles.dropdown}>
                      {/* Render your country code dropdown here */}
                      <Text>Dropdown Content Here</Text>
                    </View>
                  )}
                </>
              )}
              <TextInput
                style={[styles.input, { marginLeft: icon && 14 }]}
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
                  {isPasswordVisible ? <EyeSvg /> : <EyeOffSvg />}
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

export default FormField;

const styles = StyleSheet.create({
  inputContainer: {
    width: "100%",
  },
  labelGroup: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginBottom: 10,
  },
  labelOptional: {
    fontFamily: "regular",
    fontWeight: "400",
    fontSize: 14,
    color: "#D2D2D2",
    marginLeft: 4,
  },
  formLabel: {
    fontFamily: "medium",
    fontWeight: "500",
    fontSize: 14,
    color: "#07142F",
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 10,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#C6D8FF",
    paddingVertical: 19,
    paddingHorizontal: 20,
  },

  country: {
    width: "25%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    //paddingVertical: 17,
    // borderWidth: 1,
    // borderColor: "#C6D8FF",
    backgroundColor: "white",
    marginRight: 14,
  },
  dropdown: {
    position: "absolute",
    top: 60, // Adjust as needed
    left: 0,
    right: 0,
    backgroundColor: "white",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#C6D8FF",
    padding: 10,
    zIndex: 1000,
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
