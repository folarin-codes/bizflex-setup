import React, { useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Icon, { Icons } from "@/components/Icon";
import { COLORS } from "@/theme/theme";

interface CustomDropDownProps {
  label: string;
  options: string[];
  value: number | string;
  onValueChange: (value: any) => void;
}

const CustomDropDown: React.FC<CustomDropDownProps> = ({
  label,
  options,
  value,
  onValueChange,
}) => {
  const [displayDropDown, setDisplayDropDown] = useState(false);

  return (
    <View style={{ marginTop: "10%" }}>
      <Text style={styles.formLabel}>{label}</Text>

      <Pressable
        style={styles.dropDownStyle}
        onPress={() => setDisplayDropDown(!displayDropDown)}
      >
        <Text
          style={[styles.placeholder, { color: value ? "#0F172B" : "#D2D2D2" }]}
        >
          {value ? value : `Select ${label}`}
        </Text>
        <Icon
          type={Icons.MaterialIcons}
          name="keyboard-arrow-down"
          color="#8E8E8E"
          size={24}
        />
      </Pressable>

      {displayDropDown && (
        <View style={styles.dropDownCont}>
          {options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={styles.dropDown}
              onPress={() => {
                onValueChange(index + 1);
                setDisplayDropDown(false);
              }}
            >
              <View style={styles.radio}>
                <View
                  style={[
                    styles.radioChecked,
                    value === index + 1 && {
                      backgroundColor: COLORS.primary,
                    },
                  ]}
                />
              </View>
              <Text
                style={{
                  fontFamily: "regular",
                  fontWeight: "400",
                  fontSize: 18,
                  color: COLORS.text3,
                }}
              >
                {index + 1}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  formLabel: {
    fontFamily: "medium",
    fontWeight: "500",
    fontSize: 14,
    color: COLORS.labelText,
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

export default CustomDropDown;
