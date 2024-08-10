import React, { ReactNode } from "react";
import {
  ActivityIndicator,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
  TextStyle,
} from "react-native";
import { COLORS, SIZES } from "@/theme/theme";

interface ButtonProps {
  disabled?: boolean;
  loading?: boolean;
  onPress?: () => void;
  title?: string;
  icon?: React.ComponentType<any>;
  style?: StyleProp<ViewStyle>;
  btnText?: StyleProp<TextStyle>;
  iconContainerStyle?: StyleProp<ViewStyle>;
  className?: string;
}

const CustomButton: React.FC<ButtonProps> = ({
  disabled,
  loading,
  onPress,
  title,
  icon: IconComponent,
  style,
  btnText,
  iconContainerStyle,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      disabled={disabled || loading}
      onPress={onPress}
      style={[styles.container]}
    >
      <View
        style={[
          styles.view,
          style,
          (disabled || loading) && {
            backgroundColor: COLORS.inactiveBtn,
          },
        ]}
      >
        {IconComponent && (
          <View style={[styles.iconContainer, iconContainerStyle]}>
            <IconComponent />
          </View>
        )}
        <Text
          style={[
            styles.text,
            btnText,
            disabled && {
              color: "white",
            },
          ]}
        >
          {loading ? <ActivityIndicator color={"#082C25"} /> : title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  iconContainer: {
    width: 23,
    height: 23,
  },
  view: {
    width: "100%",
    paddingVertical: 15,
    borderRadius: 8,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
    // borderWidth: 1,
    flexDirection: "row",
    borderColor: COLORS.primary,
  },
  text: {
    fontFamily: "semibold",
    fontWeight: "600",
    color: "white",
    textAlign: "center",
    fontSize: 16,
  },
});
