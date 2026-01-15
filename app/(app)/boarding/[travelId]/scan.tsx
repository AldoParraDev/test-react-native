import {
  View,
  Text,
  StyleSheet,
  Modal,
  Pressable,
  Animated,
  Easing,
  ActivityIndicator,
} from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useEffect, useRef, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";

import { Audio } from "expo-av";
import {
  getPassengerById,
  validateQrTransaction,
} from "../../../../domains/boarding/boarding.service";

const SCAN_SIZE = 240;

type ModalType = "success" | "error" | "warning";

interface ModalState {
  type: ModalType;
  title: string;
  message?: string;
  passenger?: any;
}

export default function ScanScreen() {
  const { travelId } = useLocalSearchParams<{ travelId: string }>();

  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [torch, setTorch] = useState(false);
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [modal, setModal] = useState<ModalState | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("Validando código QR...");

  const scanLineAnim = useRef(new Animated.Value(0)).current;

  /* -------------------- Animación scan -------------------- */
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

  /* -------------------- Sonido -------------------- */
  useEffect(() => {
    let mounted = true;

    const loadSound = async () => {
      const { sound } = await Audio.Sound.createAsync(
        require("../../../../assets/sounds/beep-1082.mp3"),
        { shouldPlay: false }
      );

      if (mounted) setSound(sound);
    };

    loadSound();

    return () => {
      mounted = false;
      sound?.unloadAsync();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!permission) return <View />;

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

  /* -------------------- ESCANEO -------------------- */
  const handleBarcodeScanned = async ({ data }: { data: string }) => {
    if (scanned || loading) return;

    setScanned(true);
    setLoadingText("Validando código QR...");
    setLoading(true);

    try {
      const response = await validateQrTransaction(data, travelId);

      if (!response.success) {
        setLoading(false);

        switch (response.error?.code) {
          case "QR_TRAVEL_MISMATCH":
            setModal({
              type: "error",
              title: "QR inválido",
              message: "Este código no pertenece a este viaje",
            });
            break;

          case "ALREADY_ONBOARD":
            setModal({
              type: "warning",
              title: "Pasajero ya abordado",
              message: "Este pasajero ya fue registrado como abordado",
            });
            break;

          default:
            setModal({
              type: "error",
              title: "Error",
              message: "No se pudo validar el código QR",
            });
        }
        return;
      }

      // ✔ QR válido
      setLoadingText("Obteniendo información del pasajero...");

      const passengerResponse = await getPassengerById(
        response.data.data.passenger_id
      );

      console.log("Datos del pasajero::", passengerResponse);

      setLoading(false);

      if (!passengerResponse.success) {
        setModal({
          type: "error",
          title: "Error",
          message: "No se pudo obtener la información del pasajero",
        });
        return;
      }

      setModal({
        type: "success",
        title: "Abordaje exitoso",
        passenger: passengerResponse.data,
      });

      try {
        await sound?.replayAsync();
      } catch {}
    } catch {
      setLoading(false);
      setModal({
        type: "error",
        title: "Error",
        message: "Ocurrió un error inesperado",
      });
    }
  };

  const closeModal = () => {
    setModal(null);
    setTimeout(() => setScanned(false), 400);
  };

  return (
    <>
      <CameraView
        style={StyleSheet.absoluteFillObject}
        barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
        onBarcodeScanned={handleBarcodeScanned}
        enableTorch={torch}
      />

      {/* APP BAR */}
      <View style={styles.appBar}>
        <Pressable onPress={() => router.back()}>
          <Feather name="arrow-left" size={22} color="#374151" />
        </Pressable>

        <Text style={styles.appBarTitle}>Escanear boleto</Text>

        <Pressable onPress={() => setTorch(!torch)}>
          <MaterialCommunityIcons
            name={torch ? "flashlight-off" : "flashlight"}
            size={22}
            color="#374151"
          />
        </Pressable>
      </View>

      {/* OVERLAY */}
      <View style={styles.overlay}>
        <View style={styles.mask} />

        <View style={styles.middleRow}>
          <View style={styles.mask} />
          <View style={styles.scanBox}>
            <View style={styles.scanBorder} />
            <Animated.View
              style={[
                styles.scanLine,
                { transform: [{ translateY: scanLineAnim }] },
              ]}
            />
          </View>
          <View style={styles.mask} />
        </View>

        <View style={styles.mask} />
        <Text style={styles.helperText}>
          Enfoca el código QR dentro del recuadro
        </Text>
      </View>

      {loading && (
        <View style={styles.loaderOverlay}>
          <View style={styles.loaderCard}>
            <ActivityIndicator size="large" color="#22c55e" />
            <Text style={styles.loaderText}>{loadingText}</Text>
          </View>
        </View>
      )}

      {/* MODAL RESULTADO */}
      <Modal visible={!!modal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            {/* ICONO */}
            <View
              style={[
                styles.iconWrapper,
                modal?.type === "success" && styles.iconSuccess,
                modal?.type === "warning" && styles.iconWarning,
                modal?.type === "error" && styles.iconError,
              ]}
            >
              <MaterialCommunityIcons
                name={
                  modal?.type === "success"
                    ? "check"
                    : modal?.type === "warning"
                      ? "alert"
                      : "close"
                }
                size={42}
                color="#fff"
              />
            </View>

            {/* TITULO */}
            <Text style={styles.modalTitle}>{modal?.title}</Text>

            {/* SUBTITULO */}
            <Text style={styles.modalSubtitle}>
              {modal?.type === "success"
                ? "ESCANEO EXITOSO"
                : modal?.type === "warning"
                  ? "YA ABORDADO"
                  : "ESCANEO FALLIDO"}
            </Text>

            {/* PASAJERO */}
            {modal?.passenger && (
              <View style={styles.passengerCard}>
                <Text style={styles.passengerName}>
                  {modal.passenger.full_name}
                </Text>

                <View style={styles.passengerMeta}>
                  {modal.passenger.seat && (
                    <View style={styles.badge}>
                      <Text style={styles.badgeText}>
                        Asiento: {modal.passenger.seat}
                      </Text>
                    </View>
                  )}
                </View>
              </View>
            )}

            {/* MENSAJE ERROR */}
            {modal?.message && (
              <Text style={styles.modalMessage}>{modal.message}</Text>
            )}

            {/* BOTON */}
            <Pressable style={styles.modalBtn} onPress={closeModal}>
              <Text style={styles.modalBtnText}>Aceptar →</Text>
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
    bottom: 150,
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
  appBar: {
    height: 56,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderColor: "#e5e7eb",
    backgroundColor: "#fff",
    zIndex: 10,
  },
  appBarTitle: { fontSize: 16, fontWeight: "600" },
  successBorder: { borderTopWidth: 6, borderTopColor: "#22c55e" },
  errorBorder: { borderTopWidth: 6, borderTopColor: "#ef4444" },
  warningBorder: { borderTopWidth: 6, borderTopColor: "#f59e0b" },
  modalTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 12,
  },
  passengerName: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
  },
  loaderOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.55)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 20,
  },
  loaderCard: {
    backgroundColor: "#fff",
    paddingVertical: 28,
    paddingHorizontal: 32,
    borderRadius: 20,
    alignItems: "center",
    width: 260,
  },
  loaderText: {
    marginTop: 16,
    fontSize: 16,
    fontWeight: "500",
    color: "#374151",
    textAlign: "center",
  },
  modalHeader: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  modalHeaderTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
  },
  iconWrapper: {
    width: 96,
    height: 96,
    borderRadius: 48,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  iconSuccess: {
    backgroundColor: "#22c55e",
  },
  iconWarning: {
    backgroundColor: "#f59e0b",
  },
  iconError: {
    backgroundColor: "#ef4444",
  },
  modalSubtitle: {
    fontSize: 13,
    letterSpacing: 1.2,
    color: "#22c55e",
    marginBottom: 20,
  },
  passengerCard: {
    width: "100%",
    backgroundColor: "#f9fafb",
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
    marginBottom: 16,
  },
  passengerMeta: {
    flexDirection: "row",
    gap: 8,
  },
  badge: {
    backgroundColor: "#dcfce7",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
  },
  badgeText: {
    fontSize: 13,
    fontWeight: "500",
    color: "#166534",
  },
  modalMessage: {
    fontSize: 15,
    textAlign: "center",
    color: "#374151",
    marginBottom: 16,
  },
  modalBtn: {
    marginTop: 8,
    backgroundColor: "#22c55e",
    width: "100%",
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
  },
  modalBtnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});
