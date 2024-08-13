import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS } from "@/theme/theme";

interface AccountTypeHeaderProps {
  title: string;
  des: string;
  step: number;
  totalSteps: number;
}

const AccountTypeHeader: React.FC<AccountTypeHeaderProps> = ({
  title,
  des,
  step,
  totalSteps,
}) => {
  return (
    <View style={styles.headerWrapper}>
      <View style={styles.stepCont}>
        <Text style={styles.stepText}>Step</Text>
        <Text style={styles.stepText}>
          {step}/{totalSteps}
        </Text>
      </View>
      <View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.des}>Next: {des}</Text>
      </View>
    </View>
  );
};
export default AccountTypeHeader;

const styles = StyleSheet.create({
  headerWrapper: {
    width: "100%",
    backgroundColor: COLORS.primary,
    borderRadius: 16,
    borderWidth: 5,
    borderColor: "#E2EBFF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 16,
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  stepCont: {
    width: 50,
    height: 50,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#FF9D16",
    alignItems: "center",
    justifyContent: "center",
  },
  stepText: {
    fontFamily: "regular",
    fontWeight: "400",
    fontSize: 10,
    color: "white",
  },
  title: {
    fontFamily: "semibold",
    fontWeight: "600",
    fontSize: 20,
    color: "white",
  },
  des: {
    fontFamily: "medium",
    fontWeight: "500",
    fontSize: 11,
    color: "white",
  },
});
