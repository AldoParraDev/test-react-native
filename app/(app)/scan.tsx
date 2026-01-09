import {
  View,
  Text,
  StyleSheet,
  Modal,
  Pressable,
  Animated,
  Easing,
} from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useEffect, useRef, useState } from "react";
import { router } from "expo-router";
import { Feather } from "@expo/vector-icons";

import { Audio } from "expo-av";

const SCAN_SIZE = 240;

export default function ScanScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [qrData, setQrData] = useState<string | null>(null);

  const [torch, setTorch] = useState(false);

  const [sound, setSound] = useState<Audio.Sound | null>(null);

  const scanLineAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scanLineAnim, {
          toValue: SCAN_SIZE - 4,
          duration: 1800,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(scanLineAnim, {
          toValue: 0,
          duration: 1800,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ])
    ).start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let mounted = true;

    const loadSound = async () => {
      const { sound } = await Audio.Sound.createAsync(
        require("../../assets/sounds/beep-1082.mp3"),
        { shouldPlay: false }
      );

      if (mounted) {
        setSound(sound);
      }
    };

    loadSound();

    return () => {
      mounted = false;
      sound?.unloadAsync();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.center}>
        <Text style={{ marginBottom: 12 }}>
          Necesitamos permiso para usar la cámara
        </Text>
        <Pressable style={styles.permissionBtn} onPress={requestPermission}>
          <Text style={{ color: "#fff" }}>Dar permiso</Text>
        </Pressable>
      </View>
    );
  }

  const handleBarcodeScanned = async ({ data }) => {
    if (scanned || qrData) return;

    setScanned(true);
    setQrData(data);

    try {
      await sound?.replayAsync();
    } catch (e) {
      // fail silencioso (nunca romper escaneo)
      console.log("Error reproduciendo sonido:", e);
    }
  };

  return (
    <>
      <CameraView
        style={StyleSheet.absoluteFillObject}
        barcodeScannerSettings={{
          barcodeTypes: ["qr"],
        }}
        onBarcodeScanned={handleBarcodeScanned}
        enableTorch={torch}
      />

      {/* CAPA DE OVERLAY */}
      <View style={styles.overlay}>
        <View style={styles.mask} />

        <View style={styles.middleRow}>
          <View style={styles.mask} />

          {/* SCAN BOX */}
          <View style={styles.scanBox}>
            <View style={styles.scanBorder} />

            {/* SCAN LINE */}
            <Animated.View
              style={[
                styles.scanLine,
                {
                  transform: [{ translateY: scanLineAnim }],
                },
              ]}
            />
          </View>

          <View style={styles.mask} />
        </View>

        <View style={styles.mask} />

        <Text style={styles.helperText}>
          Enfoca el código QR dentro del recuadro
        </Text>

        <Pressable onPress={() => router.back()} style={styles.btnClose}>
          <Text style={styles.actionText}>
            <Feather name="x" size={28} color="#fff" />
          </Text>
        </Pressable>

        <Pressable onPress={() => setTorch(!torch)} style={styles.btnTorch}>
          <Text style={styles.actionText}>
            {torch ? "Apagar linterna" : "Encender linterna"}
          </Text>
        </Pressable>
      </View>

      <Modal visible={!!qrData} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.title}>✅ Usuario verificado</Text>
            <Text style={styles.subtitle}>Código: {qrData}</Text>

            <Pressable
              style={styles.confirmBtn}
              onPress={async () => {
                // 1. Aquí irá la llamada a la API
                // await confirmBoarding(qrData);

                // 2. Cerramos modal
                setQrData(null);

                // 3. Rehabilitamos escaneo (con pequeño delay)
                setTimeout(() => {
                  setScanned(false);
                }, 500);
              }}
            >
              <Text style={styles.confirmText}>Confirmar abordaje</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },

  permissionBtn: {
    backgroundColor: "#22c55e",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "space-between",
  },

  mask: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
  },

  middleRow: {
    flexDirection: "row",
  },

  scanBox: {
    width: SCAN_SIZE,
    height: SCAN_SIZE,
    position: "relative",
  },

  scanBorder: {
    ...StyleSheet.absoluteFillObject,
    borderWidth: 2,
    borderColor: "#22c55e",
  },

  scanLine: {
    position: "absolute",
    left: 8,
    right: 8,
    height: 2,
    backgroundColor: "#22c55e",
    opacity: 0.8,
  },

  helperText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
    marginBottom: 16,
    position: "absolute",
    bottom: 100,
    left: 16,
    right: 16,
  },

  btnClose: {
    position: "absolute",
    top: 20,
    right: 20,
  },

  btnTorch: {
    position: "absolute",
    bottom: 50,
    left: "50%",
    transform: [{ translateX: "-50%" }],
    backgroundColor: "rgba(255,255,255,0.2)",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },

  actionText: {
    color: "#fff",
    fontSize: 16,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
  },

  modalCard: {
    width: "85%",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 24,
    alignItems: "center",
  },

  title: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 12,
  },

  subtitle: {
    fontSize: 16,
    marginBottom: 24,
  },

  confirmBtn: {
    backgroundColor: "#22c55e",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
  },

  confirmText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
