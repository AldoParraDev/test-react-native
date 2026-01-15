import { Alert, Platform, ToastAndroid } from "react-native";

export const showMessage = (message: string): void => {
  if (Platform.OS === "android") {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  } else {
    Alert.alert("Aviso", message);
  }
};
