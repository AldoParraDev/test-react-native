# Guía Rápida - Sistema de Tema Oscuro/Claro

## 🎯 ¿Qué se ha implementado?

Se ha creado un sistema completo de **tema oscuro/claro** con las siguientes características:

✅ **3 modos de tema**: Light (Claro), Dark (Oscuro), System (Del sistema)  
✅ **Persistencia**: La preferencia se guarda automáticamente  
✅ **Detección automática**: Sigue el tema del SO cuando está en modo "System"  
✅ **Paleta centralizada**: Un archivo con todos los colores  
✅ **Hook fácil de usar**: `useTheme()` para acceder a colores  
✅ **Componente selector**: Integrado en el menú de usuario

## 📦 Archivos Nuevos

```
config/
├── colors.ts                          # 📊 Paleta de colores

domains/theme/
├── theme.store.ts                     # 🏪 Store con Zustand
├── theme.types.ts                     # 📝 Tipos TypeScript

shared/
├── hooks/
│   └── useTheme.ts                    # 🎣 Hook personalizado
├── components/
│   └── ThemeSwitcher.tsx              # 🎛️ Selector de tema
└── examples/
    └── ThemeExample.tsx               # 💡 Ejemplos de uso

Documentación:
├── THEME_SYSTEM.md                    # 📖 Guía completa
└── IMPLEMENTATION_SUMMARY.md          # 📋 Resumen de cambios
```

## ⚡ Cómo Usar (TL;DR)

### 1. En cualquier componente:

```tsx
import { useTheme } from "@/shared/hooks/useTheme";

export default function MiComponente() {
  const { colors } = useTheme();

  return (
    <View style={{ backgroundColor: colors.background }}>
      <Text style={{ color: colors.text }}>Hola!</Text>
    </View>
  );
}
```

### 2. Para cambiar el tema:

```tsx
const { setTheme } = useTheme();

setTheme("dark"); // Cambiar a oscuro
setTheme("light"); // Cambiar a claro
setTheme("system"); // Usar preferencia del SO
```

### 3. El selector está en el menú de usuario:

Toca el ícono de usuario en la esquina superior derecha → "Tema" → selecciona una opción

## 🎨 Colores Disponibles

```typescript
colors.primary; // Azul principal
colors.background; // Fondo principal
colors.surface; // Superficies secundarias
colors.text; // Texto principal
colors.textSecondary; // Texto gris
colors.textTertiary; // Texto muy claro
colors.border; // Bordes
colors.success; // Verde de éxito
colors.successLight; // Verde claro de fondo
colors.iconPrimary; // Iconos principales
colors.iconSecondary; // Iconos secundarios
colors.overlay; // Overlay semi-transparente
```

## 🔧 Componentes Actualizados

Los siguientes componentes **ya están adaptados** al nuevo sistema:

- ✅ Login (pantalla de inicio de sesión)
- ✅ Boarding (lista de viajes)
- ✅ Travel Detail (detalles del viaje)
- ✅ PrimaryButton (botones)
- ✅ SearchInput (búsqueda)
- ✅ UserDropdown (menú de usuario)
- ✅ BoardingHeader (encabezado)
- ✅ TravelCard (tarjeta de viaje)

## 🚀 Testeo Rápido

1. **Ejecuta la app**:

   ```bash
   npm run android
   # o
   npm run ios
   ```

2. **Abre el menú de usuario**:
   - Toca el ícono de usuario en la esquina superior derecha

3. **Verifica que aparezca "Tema"** con opciones: Claro, Oscuro, Sistema

4. **Selecciona "Oscuro"** y verifica que:
   - El fondo se pone oscuro
   - El texto se pone claro
   - Los colores se adaptan

5. **Cierra la app** y vuelve a abrir - el tema debe mantenerse

## 📖 Documentación Completa

Para más detalles, lee:

- [`THEME_SYSTEM.md`](THEME_SYSTEM.md) - Guía completa con ejemplos
- [`IMPLEMENTATION_SUMMARY.md`](IMPLEMENTATION_SUMMARY.md) - Resumen técnico

## 💡 Ejemplos de Código

Ver [`shared/examples/ThemeExample.tsx`](shared/examples/ThemeExample.tsx) para:

- Componentes con colores dinámicos
- Componentes reutilizables
- Composición de componentes
- Colores condicionales

## 🎓 Conceptos Clave

### Hook `useTheme()`

Proporciona:

- `colors` - Objeto con todos los colores
- `isDark` - Boolean (true si tema oscuro)
- `theme` - Tema actual ('light'|'dark'|'system')
- `setTheme()` - Función para cambiar tema

### Store Zustand (`useThemeStore`)

Gestiona:

- Tema seleccionado
- Tema del sistema detectado
- Persistencia en AsyncStorage

### Paleta de Colores (`config/colors.ts`)

Define:

- Colores para modo Light
- Colores para modo Dark
- Tipos TypeScript

## ❓ Preguntas Frecuentes

**P: ¿Cómo agrego más componentes con tema?**  
R: Importa `useTheme`, obtén `colors` y úsalos en StyleSheet

**P: ¿Puedo cambiar los colores?**  
R: Sí, edita `config/colors.ts`

**P: ¿Se guarda el tema?**  
R: Sí, automáticamente en AsyncStorage

**P: ¿Funciona con "System"?**  
R: Sí, detecta el tema del dispositivo

**P: ¿Necesito actualizar todos mis componentes?**  
R: Solo los que quieras que cambien de color. Los principales ya están hechos.

## 🔗 Estructura del Store

```
useThemeStore
├── theme: 'light' | 'dark' | 'system'
├── systemTheme: 'light' | 'dark'
├── setTheme(theme)
├── setSystemTheme(theme)
└── getCurrentTheme() → 'light' | 'dark'
```

## 📱 Compatibilidad

- ✅ React Native 0.81.5
- ✅ Expo 54.0
- ✅ iOS 13+
- ✅ Android 5.0+ (sistema automático desde Android 10)

---

**¿Listo para empezar?** 🚀

1. Abre la app
2. Prueba cambiar el tema
3. ¡Disfruta del modo oscuro!

Para dudas técnicas, ver la documentación completa en [`THEME_SYSTEM.md`](THEME_SYSTEM.md)
