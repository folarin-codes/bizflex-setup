import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import SignUpLayout from "@/layout/SignUpLayout";
import { COLORS } from "@/theme/theme";
import ArrowUpSvg from "@/assets/svgs/ArrowUpSvg";

import { useRouter, Href } from "expo-router";

const accountType = [
  {
    id: 0,
    title: "Registered Business",
    des: "I have a CAC registered company",
    screen: "registered-business",
  },
  {
    id: 1,
    title: "Unregistered Business",
    des: "My business is not yet registered, I would like to Register with CAC",
    screen: "unregistered-business",
  },
  {
    id: 2,
    title: "Personal/Freelancer",
    des: "I’m a freelancer, I do my business in my personal name",
    screen: "freelancer",
  },
];

const CreateAccount = () => {
  const router = useRouter();
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const handlePress = (id: number, screen: string) => {
    setSelectedId(id);
    router.push(screen as Href);
  };
  return (
    <SignUpLayout>
      <View style={styles.container}>
        <View style={styles.headerGroup}>
          <Text style={styles.headerTitle}>Create An Account</Text>
          <Text style={styles.headerDes}>
            Kindly select a category that best fits
          </Text>
        </View>

        <View style={styles.accounts}>
          {accountType.map((item, index) => (
            <TouchableOpacity
              key={item.id}
              onPress={() => handlePress(item.id, item.screen)}
              style={[
                styles.accountTypeCont,
                {
                  borderWidth: item.id === selectedId ? 1 : 0,
                  borderColor:
                    item.id === selectedId ? COLORS.primary : "transparent",
                },
              ]}
            >
              <View style={styles.accountTypeTexts}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.des}>{item.des}</Text>
              </View>
              <View>
                <ArrowUpSvg />
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </SignUpLayout>
  );
};

export default CreateAccount;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerGroup: {},
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
  },
  accounts: {
    marginTop: 58,
    flexDirection: "column",
    gap: 22,
  },
  accountTypeCont: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 24,
    borderRadius: 8,
    backgroundColor: "white",
    shadowColor: "#000000",
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 5,
  },
  accountTypeTexts: {
    width: "90%",
  },
  title: {
    fontFamily: "medium",
    fontSize: 20,
    fontWeight: "500",
    color: COLORS.primary,
  },
  des: {
    fontFamily: "regular",
    fontSize: 12,
    fontWeight: "400",
    color: "#696969",
  },
});
