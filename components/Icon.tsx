import React from "react";
import { useColorScheme } from "react-native";
import {
  Ionicons,
  MaterialIcons,
  SimpleLineIcons,
  Octicons,
  Foundation,
  EvilIcons,
  AntDesign,
  FontAwesome,
  FontAwesome5,
  Feather,
  MaterialCommunityIcons,
  Entypo,
} from "@expo/vector-icons";
import { IconsTypes } from "@/constants/global.interface";
import { COLORS } from "@/theme/theme";

export const Icons = {
  MaterialCommunityIcons,
  MaterialIcons,
  Ionicons,
  Feather,
  FontAwesome,
  FontAwesome5,
  AntDesign,
  Entypo,
  SimpleLineIcons,
  Octicons,
  Foundation,
  EvilIcons,
};

const Icon = ({
  type,
  name,
  color,
  size = 24,
  style,

  onPress,
}: IconsTypes) => {
  const Tag = type;
  return (
    <>
      {type && name && (
        <Tag
          name={name}
          size={size}
          color={color}
          style={style}
          onPress={onPress}
        />
      )}
    </>
  );
};

export default Icon;
