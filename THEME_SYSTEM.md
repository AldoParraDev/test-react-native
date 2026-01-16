# Sistema de Tema Oscuro/Claro

Este proyecto incluye un sistema completo de tema oscuro y claro implementado con Zustand y React Native.

## Características

✅ Soporte para tema **Light**, **Dark** y **System** (sigue preferencia del sistema operativo)  
✅ Persistencia automática con AsyncStorage  
✅ Hook personalizado `useTheme()` para fácil acceso a colores  
✅ Componente `ThemeSwitcher` para cambiar el tema  
✅ Paleta de colores centralizada y consistente

## Archivos Creados

### Configuración de Colores

- **`config/colors.ts`** - Paleta de colores para tema light y dark

### Store de Zustand

- **`domains/theme/theme.store.ts`** - Estado global del tema
- **`domains/theme/theme.types.ts`** - Tipos TypeScript para el tema

### Hooks

- **`shared/hooks/useTheme.ts`** - Hook personalizado para usar el tema

### Componentes

- **`shared/components/ThemeSwitcher.tsx`** - Selector de tema (light/dark/system)

## Cómo Usar

### 1. Usar el hook `useTheme()` en cualquier componente

```tsx
import { useTheme } from "@/shared/hooks/useTheme";

export default function MyComponent() {
  const { colors, isDark, theme, setTheme } = useTheme();

  return (
    <View style={{ backgroundColor: colors.background }}>
      <Text style={{ color: colors.text }}>Hola Mundo</Text>
    </View>
  );
}
```

### 2. Acceder a los colores disponibles

La paleta de colores incluye:

```typescript
colors.primary; // Color principal de la app
colors.primaryDark; // Variante oscura del primario
colors.background; // Fondo principal
colors.surface; // Superficies secundarias
colors.text; // Texto principal
colors.textSecondary; // Texto secundario
colors.textTertiary; // Texto terciario (muted)
colors.border; // Bordes
colors.success; // Color de éxito
colors.successLight; // Fondo claro para éxito
colors.iconPrimary; // Iconos primarios
colors.iconSecondary; // Iconos secundarios
colors.overlay; // Overlay semitransparente
```

### 3. Cambiar el tema

```tsx
import { useTheme } from "@/shared/hooks/useTheme";

export default function SettingsComponent() {
  const { setTheme, theme } = useTheme();

  const handleThemeChange = (newTheme: "light" | "dark" | "system") => {
    setTheme(newTheme);
  };

  return (
    <TouchableOpacity onPress={() => handleThemeChange("dark")}>
      <Text>Cambiar a Oscuro</Text>
    </TouchableOpacity>
  );
}
```

### 4. Usar el componente ThemeSwitcher

El componente `ThemeSwitcher` está integrado en el menú de usuario (UserDropdown):

```tsx
import { ThemeSwitcher } from "@/shared/components/ThemeSwitcher";

export default function MyModal() {
  return (
    <Modal>
      <ThemeSwitcher onClose={() => setModalOpen(false)} />
    </Modal>
  );
}
```

## Paleta de Colores

### Tema Light

- Background: `#fff` (blanco)
- Surface: `#f8fafc` (gris muy claro)
- Text: `#000` (negro)
- Primary: `#2563eb` (azul)

### Tema Dark

- Background: `#0f172a` (azul muy oscuro)
- Surface: `#1e293b` (azul oscuro)
- Text: `#f1f5f9` (blanco/gris muy claro)
- Primary: `#3b82f6` (azul claro)

## Persistencia

El tema seleccionado se guarda automáticamente en AsyncStorage con la clave `theme-store`.

## Componentes Actualizados

Los siguientes componentes ya han sido actualizados para usar el nuevo sistema:

✅ `shared/components/PrimaryButton.tsx`  
✅ `shared/components/SearchInput.tsx`  
✅ `domains/boarding/components/UserDropdown.tsx`  
✅ `domains/boarding/components/BoardingHeader.tsx`  
✅ `domains/boarding/components/TravelCard.tsx`  
✅ `app/(auth)/login.js`  
✅ `app/(app)/boarding.js`  
✅ `app/(app)/boarding/[travelId].tsx`

## Para Actualizar Otros Componentes

Si tienes más componentes que necesitan el tema, sigue estos pasos:

1. Importa el hook:

```tsx
import { useTheme } from "@/shared/hooks/useTheme";
```

2. Usa el hook en tu componente:

```tsx
const { colors } = useTheme();
```

3. Reemplaza los colores hardcodeados con `colors.<propertyName>`

Ejemplo:

```tsx
// Antes
<View style={{ backgroundColor: '#2563eb' }}>

// Después
<View style={{ backgroundColor: colors.primary }}>
```

## Personalización

Para modificar los colores, edita `config/colors.ts`:

```typescript
export const colors = {
  light: {
    primary: "#2563eb", // ← Cambiar aquí
    // ... otros colores
  },
  dark: {
    primary: "#3b82f6", // ← O aquí
    // ... otros colores
  },
};
```

Los cambios se aplicarán automáticamente a toda la aplicación.
