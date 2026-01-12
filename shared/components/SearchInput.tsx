import { View, TextInput, StyleSheet, Pressable } from "react-native";
import { Feather } from "@expo/vector-icons";

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
  return (
    <View style={styles.container}>
      <Feather name="search" size={18} color="#9ca3af" />

      <TextInput
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
        placeholderTextColor="#9ca3af"
        style={styles.input}
        returnKeyType="search"
        clearButtonMode="while-editing" // iOS
      />

      {value.length > 0 && (
        <Pressable onPress={() => onChange("")}>
          <Feather name="x" size={18} color="#9ca3af" />
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    marginBottom: 16,
  },

  input: {
    flex: 1,
    fontSize: 15,
    color: "#111827",
  },
});
