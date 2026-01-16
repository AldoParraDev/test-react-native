/**
 * Ejemplo de implementación del Sistema de Tema
 *
 * Este archivo muestra cómo utilizar el sistema de tema
 * en diferentes tipos de componentes.
 */

import { View, Text, StyleSheet, Pressable } from "react-native";
import { useTheme } from "../hooks/useTheme";
import { useThemeStore } from "../../domains/theme/theme.store";

// ============================================
// 1. COMPONENTE FUNCIONAL CON useTheme
// ============================================

export function ExampleComponent() {
  const { colors, isDark, theme } = useTheme();

  // Los estilos dinámicos se crean basados en el tema actual
  const dynamicStyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      padding: 16,
    },
    card: {
      backgroundColor: colors.surface,
      padding: 16,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: colors.border,
    },
    title: {
      fontSize: 18,
      fontWeight: "700",
      color: colors.text,
      marginBottom: 8,
    },
    subtitle: {
      fontSize: 14,
      color: colors.textSecondary,
      marginBottom: 16,
    },
    button: {
      backgroundColor: colors.primary,
      padding: 12,
      borderRadius: 8,
      alignItems: "center",
    },
    buttonText: {
      color: "#fff",
      fontWeight: "600",
    },
  });

  return (
    <View style={dynamicStyles.container}>
      <View style={dynamicStyles.card}>
        <Text style={dynamicStyles.title}>Tema Actual</Text>
        <Text style={dynamicStyles.subtitle}>
          Modo:{" "}
          {theme === "system"
            ? `Sistema (${isDark ? "oscuro" : "claro"})`
            : theme}
        </Text>

        <Pressable style={dynamicStyles.button}>
          <Text style={dynamicStyles.buttonText}>Presionar botón</Text>
        </Pressable>
      </View>
    </View>
  );
}

// ============================================
// 2. COMPONENTE CON COLORES CONDICIONALES
// ============================================

export function ConditionalColorExample() {
  const { colors, isDark } = useTheme();

  const statusStyles = StyleSheet.create({
    successBox: {
      backgroundColor: colors.successLight,
      padding: 12,
      borderRadius: 8,
      borderLeftWidth: 4,
      borderLeftColor: colors.success,
    },
    successText: {
      color: colors.success,
      fontWeight: "600",
    },
    icon: {
      color: isDark ? colors.iconSecondary : colors.iconPrimary,
    },
  });

  return (
    <View style={statusStyles.successBox}>
      <Text style={statusStyles.successText}>¡Éxito!</Text>
    </View>
  );
}

// ============================================
// 3. COMPONENTE CON CAMBIO DE TEMA
// ============================================

export function ThemeSwitchingComponent() {
  const { colors, setTheme } = useTheme();
  const theme = useThemeStore((state) => state.theme);

  const themeOptions = [
    { label: "Claro", value: "light" as const },
    { label: "Oscuro", value: "dark" as const },
    { label: "Sistema", value: "system" as const },
  ];

  return (
    <View style={{ gap: 8 }}>
      {themeOptions.map((option) => (
        <Pressable
          key={option.value}
          onPress={() => setTheme(option.value)}
          style={{
            padding: 12,
            borderRadius: 8,
            backgroundColor:
              theme === option.value ? colors.primary : colors.surface,
          }}
        >
          <Text
            style={{
              color: theme === option.value ? "#fff" : colors.text,
              fontWeight: "600",
            }}
          >
            {option.label}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}

// ============================================
// 4. COMPONENTE REUTILIZABLE CON TEMA
// ============================================

interface CardProps {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
}

export function ThemedCard({ title, subtitle, children }: CardProps) {
  const { colors } = useTheme();

  const cardStyles = StyleSheet.create({
    container: {
      backgroundColor: colors.surface,
      borderRadius: 12,
      padding: 16,
      borderWidth: 1,
      borderColor: colors.border,
      marginBottom: 12,
    },
    title: {
      fontSize: 16,
      fontWeight: "700",
      color: colors.text,
      marginBottom: subtitle ? 4 : 12,
    },
    subtitle: {
      fontSize: 13,
      color: colors.textSecondary,
      marginBottom: 12,
    },
  });

  return (
    <View style={cardStyles.container}>
      <Text style={cardStyles.title}>{title}</Text>
      {subtitle && <Text style={cardStyles.subtitle}>{subtitle}</Text>}
      {children}
    </View>
  );
}

// Uso:
// <ThemedCard
//   title="Mi Tarjeta"
//   subtitle="Con soporte para tema"
// >
//   <Text>Contenido aquí</Text>
// </ThemedCard>

// ============================================
// 5. COMPOSICIÓN CON MÚLTIPLES COLORES
// ============================================

export function ComplexThemedComponent() {
  const { colors } = useTheme();

  const styles = StyleSheet.create({
    container: {
      backgroundColor: colors.background,
      flex: 1,
    },
    header: {
      backgroundColor: colors.primary,
      padding: 16,
    },
    headerText: {
      color: "#fff",
      fontSize: 18,
      fontWeight: "700",
    },
    content: {
      padding: 16,
    },
    item: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    itemText: {
      flex: 1,
      color: colors.text,
    },
    itemMuted: {
      color: colors.textTertiary,
      fontSize: 12,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Encabezado</Text>
      </View>
      <View style={styles.content}>
        {[1, 2, 3].map((i) => (
          <View key={i} style={styles.item}>
            <View>
              <Text style={styles.itemText}>Elemento {i}</Text>
              <Text style={styles.itemMuted}>Descripción muted</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}
