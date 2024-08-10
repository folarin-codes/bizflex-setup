import { StyleSheet, Text, View, Pressable } from "react-native";
import React, { ReactNode } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon, { Icons } from "@/components/Icon";
import GoBack from "@/assets/svgs/GoBack";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useRouter } from "expo-router";
import { COLORS } from "@/theme/theme";

interface SignUpLayoutProps {
  children: ReactNode;
}

const SignUpLayout = ({ children }: SignUpLayoutProps) => {
  const router = useRouter();
  return (
    <SafeAreaView style={styles.container}>
      <Pressable onPress={() => router.back()}>
        <GoBack />
      </Pressable>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View style={styles.main}>{children}</View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default SignUpLayout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    backgroundColor: COLORS.screenBackground,
  },
  main: {
    flex: 1,
    width: "100%",
    marginTop: 32,
  },
});
