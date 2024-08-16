import React, { ReactNode } from "react";
import {
  View,
  Modal,
  StyleSheet,
  Dimensions,
  Text,
  Button,
  StyleProp,
  ViewStyle,
  TouchableWithoutFeedback,
  useColorScheme,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import CustomButton from "./CustomButton";

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

interface CustomModalProps {
  visible: boolean;
  closeModal: () => void;
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  title?: string;
  description?: string;
  onPress?: () => void;
}

const CustomModal: React.FC<CustomModalProps> = ({
  visible,
  closeModal,
  children,
  style,
  title,
  description,
  onPress,
  contentStyle,
}) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={closeModal}
    >
      <TouchableWithoutFeedback onPress={closeModal}>
        <View style={styles.modalOverlay}>
          <TouchableWithoutFeedback>
            <View style={[styles.modalContainer, style]}>
              <View style={[styles.modalContent, contentStyle]}>
                {children}
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    width: deviceWidth * 0.9,
    borderRadius: 20,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    justifyContent: "center",
  },
  approvedOuter: {
    width: 80,
    height: 80,
    backgroundColor: "#B6F485",
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  approvedInner: {
    width: 56,
    height: 56,
    borderRadius: 50,
    backgroundColor: "#082C25",
    alignItems: "center",
    justifyContent: "center",
  },
  verifiedEmail: {
    fontWeight: "500",
    fontSize: 20,
    color: "#082C25",
    marginBottom: 8,
  },
  verifiedEmailDes: {
    fontWeight: "300",
    fontSize: 14,
    color: "#082C25",
    textAlign: "center",
  },
});

export default CustomModal;
