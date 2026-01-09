import {
  Keyboard,
  KeyboardAvoidingView,
  LayoutAnimation,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  UIManager,
  View,
} from "react-native";
import { useEffect, useState } from "react";
import { useAuthStore } from "../../domains/auth/auth.store";
import { loginSession } from "../../domains/auth/auth.service";
import { router } from "expo-router";
import { showMessage } from "../../shared/utils/showMessage";
import { Feather } from "@expo/vector-icons";
import PrimaryButton from "../../shared/components/PrimaryButton";

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function LoginPage() {
  const login = useAuthStore((s) => s.login);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const showSub = Keyboard.addListener("keyboardWillShow", () => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    });

    const hideSub = Keyboard.addListener("keyboardWillHide", () => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    });

    return () => {
      showSub?.remove();
      hideSub?.remove();
    };
  }, []);

  const handleLogin = async () => {
    if (!username.trim()) {
      showMessage("Debes ingresar usuario");
      return;
    }

    if (!password.trim()) {
      showMessage("Debes ingresar contraseña");
      return;
    }

    if (!username.trim() || !password.trim()) {
      return;
    }

    try {
      setLoading(true);

      const response = await loginSession(username, password);

      if (!response.success) {
        showMessage(response.error, "error");
        return;
      }

      await login(response.token);

      router.replace("/boarding");
    } catch (error) {
      console.log(error);
      showMessage("Usuario o contraseña incorrectos");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
    >
      <Pressable style={{ flex: 1 }} onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="always"
          keyboardDismissMode="on-drag"
        >
          <Text style={styles.title}>Inicio de sesión</Text>

          <TextInput
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
            style={styles.input}
          />

          <View style={styles.passwordContainer}>
            <TextInput
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              style={styles.passwordInput}
            />

            <Pressable
              onPress={() => setShowPassword((prev) => !prev)}
              style={styles.eyeButton}
            >
              <Feather
                name={showPassword ? "eye" : "eye-off"}
                size={18}
                color={showPassword ? "#2563eb" : "#666"}
              />
            </Pressable>
          </View>

          <PrimaryButton
            title="Iniciar sesión"
            onPress={handleLogin}
            loading={loading}
            disabled={
              username.trim().length === 0 || password.trim().length === 0
            }
          />
        </ScrollView>
      </Pressable>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1, // Cambia de flex:1 a flexGrow:1
    padding: 24,
    justifyContent: "center",
    paddingBottom: 40, // Espacio extra abajo
  },
  title: {
    fontSize: 24,
    marginBottom: 24,
    textAlign: "center",
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 14,
    marginBottom: 12,
  },
  passwordContainer: {
    position: "relative",
    marginBottom: 12,
  },
  passwordInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    paddingRight: 44, // espacio para el icono
    borderRadius: 14,
  },
  eyeButton: {
    position: "absolute",
    right: 12,
    top: 0,
    bottom: 0,
    justifyContent: "center",
  },
});
