import { View, StyleSheet, Animated, Dimensions } from "react-native";
import { useEffect, useRef } from "react";

const { width } = Dimensions.get("window");

export default function TravelCardSkeleton() {
  const shimmerAnim = useRef(new Animated.Value(-width)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(shimmerAnim, {
        toValue: width,
        duration: 1200,
        useNativeDriver: true,
      })
    ).start();
  }, [shimmerAnim]);

  return (
    <View style={styles.card}>
      <View style={styles.lineLarge} />
      <View style={styles.lineSmall} />

      <View style={styles.row}>
        <View style={styles.icon} />
        <View style={styles.lineMedium} />
      </View>

      <View style={styles.row}>
        <View style={styles.icon} />
        <View style={styles.lineMedium} />
      </View>

      {/* SHIMMER */}
      <Animated.View
        pointerEvents="none"
        style={[
          styles.shimmer,
          {
            transform: [{ translateX: shimmerAnim }],
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 14,
    marginBottom: 12,
    elevation: 2,
    overflow: "hidden",
  },
  lineLarge: {
    height: 16,
    width: "90%",
    backgroundColor: "#e5e7eb",
    borderRadius: 6,
    marginBottom: 8,
  },
  lineSmall: {
    height: 12,
    width: "55%",
    backgroundColor: "#e5e7eb",
    borderRadius: 6,
    marginBottom: 12,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    gap: 8,
  },
  icon: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: "#e5e7eb",
  },
  lineMedium: {
    height: 14,
    width: "60%",
    backgroundColor: "#e5e7eb",
    borderRadius: 6,
  },
  shimmer: {
    position: "absolute",
    top: 0,
    left: -100,
    height: "100%",
    width: 100,
    backgroundColor: "rgba(255,255,255,0.35)",
  },
});
