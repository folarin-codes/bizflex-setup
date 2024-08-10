import {
  FlatList,
  StyleSheet,
  Text,
  View,
  FlatList as FlatListType,
  TouchableOpacity,
} from "react-native";
import React, { useRef, useState } from "react";
import CustomButton from "@/components/CustomButton";
import { COLORS, SIZES } from "@/theme/theme";
import { Image } from "expo-image";
import { width } from "@/utils/Constants";
import { useRouter } from "expo-router";
import Icon, { Icons } from "@/components/Icon";

const onboardingData = [
  {
    id: 0,
    title: "Your Money, Your Way",
    des: "Naira or Dollar, Physical or Virtual Cards.  However, Whenever, BizFlex Delivers.",
    img: require("../../assets/images/onboarding1.png"),
  },
  {
    id: 1,
    title: "Register Your Business",
    des: "Let's do the dirty work for you! We'll register your business without any hassle. No delays too!",
    img: require("../../assets/images/onboarding1.png"),
  },
  {
    id: 2,
    title: "Your Money, Your Way",
    des: "Naira or Dollar, Physical or Virtual Cards.  However, Whenever, BizFlex Delivers.",
    img: require("../../assets/images/onboarding2.png"),
  },
];

const onboarding = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const flatListRef = useRef<FlatListType<any> | null>(null);
  const router = useRouter();
  const lastIndex = onboardingData.length - 1;

  const scrollToNext = () => {
    if (flatListRef.current) {
      const nextIndex = activeIndex + 1;
      if (nextIndex < onboardingData.length) {
        flatListRef.current.scrollToIndex({
          index: nextIndex,
          animated: true,
        });
        setActiveIndex(nextIndex);
      } else {
        router.push("/get-started");
      }
    }
  };

  const skipHandler = () => {
    router.push("/get-started");
  };

  const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
    if (viewableItems && viewableItems.length > 0) {
      setActiveIndex(viewableItems[0].index || 0);
    }
  }).current;
  return (
    <View style={styles.container}>
      {/* <View /> */}

      <FlatList
        ref={flatListRef}
        data={onboardingData}
        renderItem={({ item }) => {
          return (
            <View
              style={{
                width: width,
                // borderWidth: 4,
                // borderColor: "red",
                marginTop: 70,
              }}
            >
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
              <View
                style={{
                  width: "100%",
                  marginTop: 25,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 11,
                }}
              >
                {onboardingData.map((_, i) => (
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
            </View>
          );
        }}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
      />

      {activeIndex === onboardingData.length - 1 ? (
        <View style={styles.btnStartedCont}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.getStartedBtnGroup}
            onPress={skipHandler}
          >
            <Text style={styles.startedBtnText}>Get Started</Text>
            <Icon
              type={Icons.Feather}
              name="arrow-up-right"
              color="white"
              size={24}
            />
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.btnGroup}>
          <Text style={styles.skipText} onPress={skipHandler}>
            Skip
          </Text>
          <View style={styles.nextBtn}>
            <CustomButton
              title="Next"
              style={{
                backgroundColor: "rgba(26, 26, 26, 0.08)",
                borderWidth: 0,
              }}
              btnText={{ color: "#132447" }}
              onPress={scrollToNext}
            />
          </View>
        </View>
      )}
    </View>
  );
};

export default onboarding;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  onboardingCont: {
    width: "100%",
    backgroundColor: "red",
  },
  imgCont: {
    width: "100%",
    height: "60%",
  },
  titleGroup: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 72,
    paddingHorizontal: 27.5,
  },
  title: {
    fontFamily: "semibold",
    fontSize: 24,
    fontWeight: "600",
    color: COLORS.primary,
  },
  des: {
    fontSize: 16,
    fontFamily: "regular",
    fontWeight: "400",
    color: COLORS.text,
    textAlign: "center",
    marginTop: 4,
  },
  btnGroup: {
    paddingHorizontal: 27,
    marginBottom: 25,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  skipText: {
    fontSize: 16,
    fontWeight: "400",
    color: "#545B6A",
  },
  nextBtn: {
    width: 120,
    height: 60,
  },
  btnStartedCont: {
    width: "100%",
    paddingHorizontal: 27,
    marginBottom: 25,
  },
  getStartedBtnGroup: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    paddingVertical: 15,
  },
  startedBtnText: {
    fontFamily: "regular",
    fontWeight: "400",
    color: "white",
    textAlign: "center",
    fontSize: 16,
  },
});
