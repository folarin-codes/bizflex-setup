import Toast, { ToastOptions } from "react-native-toast-message";
import { StyleSheet } from "react-native";

type ToastType = "success" | "danger" | "default";

const useToast = () => {
  const showToast = (
    message: string,
    type: ToastType = "default",
    options?: ToastOptions
  ) => {
    Toast.show({
      type,
      text1: message,
      ...options,
    });
  };

  const showSuccess = (message: string, options?: ToastOptions) => {
    showToast(message, "success", options);
  };

  const showError = (message: string, options?: ToastOptions) => {
    showToast(message, "danger", options);
  };

  return {
    showToast,
    showSuccess,
    showError,
    // styles: StyleSheet.create({
    //   fullScreen: {
    //     width: "100%",
    //     // position: "absolute",
    //     // bottom: 0,
    //   },
    // }),
  };
};

export default useToast;
