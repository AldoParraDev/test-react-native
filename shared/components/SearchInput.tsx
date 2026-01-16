import { View, TextInput, StyleSheet, Pressable } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "../hooks/useTheme";

type Props = {
  value: string;
  onChange: (text: string) => void;
  placeholder?: string;
};

export default function SearchInput({
  value,
  onChange,
  placeholder = "Buscar viaje...",
}: Props) {
  const { colors } = useTheme();

  const dynamicStyles = StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      backgroundColor: colors.background,
      borderRadius: 12,
      paddingHorizontal: 12,
      paddingVertical: 10,
      borderWidth: 1,
      borderColor: colors.border,
      marginBottom: 16,
    },
    input: {
      flex: 1,
      color: colors.text,
      fontSize: 14,
    },
  });

  return (
    <View style={dynamicStyles.container}>
      <Feather name="search" size={18} color={colors.textTertiary} />

      <TextInput
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
        placeholderTextColor={colors.textTertiary}
        style={dynamicStyles.input}
        returnKeyType="search"
        clearButtonMode="while-editing" // iOS
      />

      {value.length > 0 && (
        <Pressable onPress={() => onChange("")}>
          <Feather name="x" size={18} color={colors.textTertiary} />
        </Pressable>
      )}
    </View>
  );
}
