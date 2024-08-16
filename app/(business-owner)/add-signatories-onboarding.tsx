import {
  FlatList,
  StyleSheet,
  Text,
  View,
  FlatList as FlatListType,
  TouchableOpacity,
  Pressable,
} from "react-native";
import React, { useRef, useState } from "react";
import CustomButton from "@/components/CustomButton";
import { COLORS, SIZES } from "@/theme/theme";
import { Image } from "expo-image";
import { width } from "@/utils/Constants";
import { useRouter } from "expo-router";
import Icon, { Icons } from "@/components/Icon";
import SignUpLayout from "@/layout/SignUpLayout";
import { SafeAreaView } from "react-native-safe-area-context";
import GoBack from "@/assets/svgs/GoBack";

const signatoriesData = [
  {
    id: 0,
    title: "Add Multiple Signatories",
    des: "Distribute access and control with additional signatories for added protection against unauthorized transactions",
    img: require("../../assets/images/signatories1.png"),
  },
  {
    id: 1,
    title: "Peace of mind",
    des: "Share account responsibility with a trusted partner, ensuring both parties have visibility and approval over transactions",
    img: require("../../assets/images/signatories2.png"),
  },
  {
    id: 2,
    title: "Convenience",
    des: "Simplify financial management - Both signatories can access account details and initiate transactions from anywhere in the world",
    img: require("../../assets/images/signatories3.png"),
  },
];

const AddSignatoriesOnboarding = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const flatListRef = useRef<FlatListType<any> | null>(null);
  const router = useRouter();

  const scrollToNext = () => {
    if (flatListRef.current) {
      const nextIndex = activeIndex + 1;
      if (nextIndex < signatoriesData.length) {
        flatListRef.current.scrollToIndex({
          index: nextIndex,
          animated: true,
        });
        setActiveIndex(nextIndex);
      } else {
        router.push("/(business-owner)/add-signatories");
      }
    }
  };

  const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
    if (viewableItems && viewableItems.length > 0) {
      setActiveIndex(viewableItems[0].index || 0);
    }
  }).current;

  return (
    <SafeAreaView style={styles.container}>
      <Pressable
        style={{ paddingHorizontal: 24 }}
        onPress={() => router.back()}
      >
        <GoBack />
      </Pressable>

      <FlatList
        ref={flatListRef}
        data={signatoriesData}
        renderItem={({ item }) => {
          return (
            <View style={styles.signatoriesCont}>
              <View style={styles.imgCont}>
                <Image
                  source={item.img}
                  contentFit="cover"
                  transition={1000}
                  style={{ width: "100%", height: "100%" }}
                />
              </View>
              <View style={styles.titleGroup}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.des}>{item.des}</Text>
              </View>
              <View style={styles.swipeCont}>
                {signatoriesData.map((_, i) => (
                  <View
                    key={i}
                    style={{
                      width: activeIndex === i ? 42 : 9,
                      height: 4,
                      backgroundColor:
                        activeIndex === i ? "#FF9D16" : "#4F5962",
                      borderRadius: 2,
                    }}
                  />
                ))}
              </View>
              <View style={styles.btnStartedCont}>
                {activeIndex === signatoriesData.length - 1 ? (
                  <>
                    <CustomButton
                      title="Proceed"
                      style={{
                        borderWidth: 0,
                      }}
                      onPress={scrollToNext}
                    />
                    <CustomButton
                      title="Skip"
                      style={{
                        backgroundColor: "white",
                        borderWidth: 1,
                        borderColor: "#0F172B",
                      }}
                      btnText={{ color: "#0F172B" }}
                      onPress={scrollToNext}
                    />
                  </>
                ) : (
                  <CustomButton
                    title="Next"
                    style={{
                      width: "100%",
                      borderWidth: 0,
                    }}
                    onPress={scrollToNext}
                  />
                )}
              </View>
            </View>
          );
        }}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
      />
    </SafeAreaView>
  );
};

export default AddSignatoriesOnboarding;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
  },
  onboardingCont: {
    width: "100%",
    backgroundColor: "red",
  },
  signatoriesCont: {
    width: width,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 30,
  },
  imgCont: {
    width: "100%",
    height: "40%",
    marginTop: "10%",
  },
  titleGroup: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 36,
  },
  title: {
    fontFamily: "semibold",
    fontSize: 24,
    fontWeight: "600",
    color: COLORS.primary,
  },
  des: {
    fontSize: 14,
    fontFamily: "regular",
    fontWeight: "400",
    color: COLORS.text,
    textAlign: "center",
    marginTop: 4,
  },
  swipeCont: {
    width: "100%",
    marginTop: 24,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    marginBottom: "15%",
  },

  btnStartedCont: {
    width: "100%",
    flexDirection: "column",
    gap: 14,
  },
});
