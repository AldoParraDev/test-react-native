import { useRef, useEffect } from "react";
import { Animated } from "react-native";

export function FadeScreen({ children }) {
  const opacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // 🔴 Forzamos el valor después del mount
    opacity.setValue(0);

    Animated.timing(opacity, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, []);

  return <Animated.View style={{ flex: 1, opacity }}>{children}</Animated.View>;
}
