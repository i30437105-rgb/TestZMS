# 🎨 DESIGN TOKENS — Готовая палитра

> **Copy-paste ready:** Все токены готовы к использованию. Создай файл `app/styles/tokens.js` и скопируй код ниже.

---

## 📦 КАК ИСПОЛЬЗОВАТЬ

### 1. Создай файл:
```
app/styles/tokens.js
```

### 2. Скопируй весь код из этого документа

### 3. Импортируй где нужно:
```javascript
import { colors, shadows, typography } from '@/styles/tokens'

// Использование
style={{ background: colors.bg.glass }}
```

---

## 🎨 ЦВЕТОВАЯ ПАЛИТРА

### **Backgrounds**

```javascript
export const colors = {
  // ============================================
  // BACKGROUNDS
  // ============================================
  bg: {
    // Основные фоны
    primary: '#0a0a0a',      // Самый тёмный
    secondary: '#111111',    // Немного светлее
    tertiary: '#1a1a1a',     // Карточки

    // Glassmorphism
    glass: 'rgba(255, 255, 255, 0.03)',       // Базовый glass
    glassHover: 'rgba(255, 255, 255, 0.05)',  // Glass на hover
    glassActive: 'rgba(255, 255, 255, 0.08)', // Glass при клике

    // Overlays
    overlay: 'rgba(0, 0, 0, 0.5)',           // Для модалок
    overlayDark: 'rgba(0, 0, 0, 0.7)',       // Тёмный overlay
  },
```

---

### **Success (Зелёный)**

```javascript
  // ============================================
  // SUCCESS / ЗЕЛЁНЫЙ
  // ============================================
  success: {
    // Оттенки (Tailwind Emerald)
    50: '#ecfdf5',
    100: '#d1fae5',
    200: '#a7f3d0',
    300: '#6ee7b7',
    400: '#34d399',
    500: '#10b981',   // Primary
    600: '#059669',
    700: '#047857',
    800: '#065f46',
    900: '#064e3b',

    // Текущие цвета проекта (совместимость)
    primary: '#22c55e',
    darker: '#16a34a',
    light: '#86efac',

    // Специальные
    glow: '#6ee7b7',                      // Для glow эффектов
    shadow: 'rgba(34, 197, 94, 0.25)',    // Цветная тень
    bg: '#dcfce7',                         // Light background
    bgSelected: '#bbf7d0',                 // Selected background
    border: '#86efac',                     // Обводка
    borderSelected: '#22c55e',             // Selected обводка
    text: '#166534',                       // Текст на светлом фоне
  },
```

---

### **Error (Красный)**

```javascript
  // ============================================
  // ERROR / КРАСНЫЙ
  // ============================================
  error: {
    // Оттенки (Tailwind Red)
    50: '#fef2f2',
    100: '#fee2e2',
    200: '#fecaca',
    300: '#fca5a5',
    400: '#f87171',
    500: '#ef4444',   // Primary
    600: '#dc2626',
    700: '#b91c1c',
    800: '#991b1b',
    900: '#7f1d1d',

    // Специальные
    glow: '#fca5a5',
    shadow: 'rgba(239, 68, 68, 0.25)',
    bg: '#fee2e2',
    bgSelected: '#fecaca',
    border: '#fca5a5',
    borderSelected: '#ef4444',
    text: '#991b1b',
  },
```

---

### **Warning (Жёлтый)**

```javascript
  // ============================================
  // WARNING / ЖЁЛТЫЙ
  // ============================================
  warning: {
    // Оттенки (Tailwind Yellow)
    50: '#fefce8',
    100: '#fef9c3',
    200: '#fef08a',
    300: '#fde047',
    400: '#facc15',
    500: '#eab308',   // Primary
    600: '#ca8a04',
    700: '#a16207',
    800: '#854d0e',
    900: '#713f12',

    // Специальные
    glow: '#fde047',
    shadow: 'rgba(234, 179, 8, 0.25)',
    bg: '#fef3c7',
    text: '#78350f',
  },
```

---

### **Sections (Разделы теста)**

```javascript
  // ============================================
  // SECTIONS / РАЗДЕЛЫ
  // ============================================
  strategy: {
    base: '#5B9BD5',       // Текущий синий
    light: '#7BB3E0',
    dark: '#4A8BC5',
    glow: '#9DC9EA',
    shadow: 'rgba(91, 155, 213, 0.25)',
  },

  leadgen: {
    base: '#ED8936',       // Текущий оранжевый
    light: '#F6AD55',
    dark: '#DD7926',
    glow: '#FBD38D',
    shadow: 'rgba(237, 137, 54, 0.25)',
  },

  sales: {
    base: '#48BB78',       // Текущий зелёный
    light: '#68D391',
    dark: '#38AB68',
    glow: '#9AE6B4',
    shadow: 'rgba(72, 187, 120, 0.25)',
  },
```

---

### **Accents (Акценты)**

```javascript
  // ============================================
  // ACCENTS / АКЦЕНТЫ
  // ============================================
  gold: {
    base: '#ffd700',
    light: '#ffed4e',
    dark: '#ccac00',
    glow: '#ffe44d',
    shadow: 'rgba(255, 215, 0, 0.3)',
  },

  blue: {
    base: '#4299e1',
    light: '#63b3ed',
    dark: '#3182ce',
    glow: '#90cdf4',
    shadow: 'rgba(66, 153, 225, 0.25)',
  },

  purple: {
    base: '#a855f7',
    light: '#c084fc',
    dark: '#9333ea',
    glow: '#d8b4fe',
    shadow: 'rgba(168, 85, 247, 0.25)',
  },
```

---

### **Neutrals (Нейтральные)**

```javascript
  // ============================================
  // NEUTRALS / НЕЙТРАЛЬНЫЕ
  // ============================================
  neutral: {
    50: '#fafafa',
    100: '#f5f5f5',
    200: '#e5e5e5',
    300: '#d4d4d4',
    400: '#a3a3a3',
    500: '#737373',
    600: '#525252',
    700: '#404040',
    800: '#262626',
    900: '#171717',
  },

  white: '#ffffff',
  black: '#000000',
}
```

---

## 🌑 SHADOWS (Тени)

```javascript
export const shadows = {
  // ============================================
  // STANDARD SHADOWS
  // ============================================

  // Размеры
  none: 'none',
  xs: '0 1px 2px rgba(0, 0, 0, 0.05)',
  sm: '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)',
  md: '0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px rgba(0, 0, 0, 0.1), 0 10px 10px rgba(0, 0, 0, 0.04)',
  '2xl': '0 25px 50px rgba(0, 0, 0, 0.25)',

  // ============================================
  // COLORED SHADOWS (Цветные тени)
  // ============================================

  success: `
    0 2px 4px rgba(34, 197, 94, 0.15),
    0 8px 16px rgba(34, 197, 94, 0.1),
    0 16px 32px rgba(34, 197, 94, 0.05)
  `,

  error: `
    0 2px 4px rgba(239, 68, 68, 0.15),
    0 8px 16px rgba(239, 68, 68, 0.1),
    0 16px 32px rgba(239, 68, 68, 0.05)
  `,

  warning: `
    0 2px 4px rgba(234, 179, 8, 0.15),
    0 8px 16px rgba(234, 179, 8, 0.1),
    0 16px 32px rgba(234, 179, 8, 0.05)
  `,

  gold: `
    0 4px 8px rgba(255, 215, 0, 0.2),
    0 12px 24px rgba(255, 215, 0, 0.15),
    0 20px 40px rgba(255, 215, 0, 0.1)
  `,

  // ============================================
  // GLASSMORPHISM SHADOWS
  // ============================================

  glass: `
    0 8px 32px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.05)
  `,

  glassHover: `
    0 12px 48px rgba(0, 0, 0, 0.4),
    inset 0 1px 0 rgba(255, 255, 255, 0.08)
  `,

  // ============================================
  // ELEVATION SYSTEM
  // ============================================

  elevation: {
    0: 'none',
    1: '0 2px 4px rgba(0,0,0,0.1), 0 4px 8px rgba(0,0,0,0.08)',
    2: '0 8px 16px rgba(0,0,0,0.15), 0 16px 32px rgba(0,0,0,0.1)',
    3: '0 16px 32px rgba(0,0,0,0.2), 0 32px 64px rgba(0,0,0,0.15)',
  },
}
```

---

## ✍️ TYPOGRAPHY (Типографика)

```javascript
export const typography = {
  // ============================================
  // FONT FAMILIES
  // ============================================

  fontFamily: {
    heading: 'var(--font-manrope), -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    body: 'var(--font-inter), -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    mono: 'ui-monospace, "Cascadia Code", "Source Code Pro", Menlo, Monaco, "Courier New", monospace',
  },

  // ============================================
  // FONT SIZES
  // ============================================

  fontSize: {
    xs: '11px',
    sm: '13px',
    base: '15px',
    lg: '18px',
    xl: '24px',
    '2xl': '32px',
    '3xl': '42px',
    '4xl': '56px',
  },

  // ============================================
  // FONT WEIGHTS
  // ============================================

  fontWeight: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
  },

  // ============================================
  // LETTER SPACING
  // ============================================

  letterSpacing: {
    tighter: '-0.05em',  // Для очень крупных заголовков
    tight: '-0.03em',    // Для заголовков
    normal: '-0.01em',   // Для body text
    wide: '0.02em',      // Для мелкого текста
    wider: '0.05em',     // Для uppercase labels
    widest: '0.1em',     // Для акцентов
  },

  // ============================================
  // LINE HEIGHT
  // ============================================

  lineHeight: {
    none: 1,
    tight: 1.1,
    snug: 1.3,
    normal: 1.5,
    relaxed: 1.6,
    loose: 1.8,
  },
}
```

---

## 📏 SPACING (Отступы)

```javascript
export const spacing = {
  px: '1px',
  0: '0',
  0.5: '2px',
  1: '4px',
  1.5: '6px',
  2: '8px',
  2.5: '10px',
  3: '12px',
  3.5: '14px',
  4: '16px',
  5: '20px',
  6: '24px',
  7: '28px',
  8: '32px',
  9: '36px',
  10: '40px',
  12: '48px',
  14: '56px',
  16: '64px',
  20: '80px',
  24: '96px',
}
```

---

## 🔲 BORDER RADIUS (Скругления)

```javascript
export const borderRadius = {
  none: '0',
  sm: '4px',
  base: '8px',
  md: '12px',
  lg: '16px',
  xl: '20px',
  '2xl': '24px',
  '3xl': '32px',
  full: '9999px',
}
```

---

## ⏱️ TRANSITIONS (Переходы)

```javascript
export const transitions = {
  // Duration
  fast: '150ms',
  base: '200ms',
  slow: '300ms',
  slower: '500ms',
  slowest: '1000ms',

  // Easing
  ease: {
    linear: 'linear',
    in: 'cubic-bezier(0.4, 0, 1, 1)',
    out: 'cubic-bezier(0, 0, 0.2, 1)',
    inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },

  // Готовые комбинации
  default: '200ms cubic-bezier(0, 0, 0.2, 1)',
  smooth: '300ms cubic-bezier(0.4, 0, 0.2, 1)',
  spring: '600ms cubic-bezier(0.34, 1.56, 0.64, 1)',
}
```

---

## 🎬 ANIMATIONS (CSS Keyframes)

```javascript
export const animations = {
  // ============================================
  // CSS KEYFRAMES (для inline styles нужно добавить в <style> tag)
  // ============================================

  // Shimmer effect (для loading)
  shimmer: `
@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}
  `,

  // Float (для gradient mesh)
  float: `
@keyframes float {
  0%, 100% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(30px, -30px) scale(1.1); }
  66% { transform: translate(-20px, 20px) scale(0.9); }
}
  `,

  // Pulse (для badges)
  pulse: `
@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.8; transform: scale(1.05); }
}
  `,

  // Spin (для loaders)
  spin: `
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
  `,

  // Fade in
  fadeIn: `
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
  `,

  // Slide up
  slideUp: `
@keyframes slideUp {
  from { transform: translateY(20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}
  `,
}
```

---

## 🚀 ПРИМЕРЫ ИСПОЛЬЗОВАНИЯ

### 1. Glass Card

```javascript
import { colors, shadows, borderRadius } from '@/styles/tokens'

const glassCardStyle = {
  background: colors.bg.glass,
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)',
  border: `1px solid rgba(255, 255, 255, 0.1)`,
  borderRadius: borderRadius.lg,
  padding: '24px',
  boxShadow: shadows.glass,
}
```

### 2. Premium Button

```javascript
import { colors, shadows, typography } from '@/styles/tokens'

const buttonStyle = {
  background: `linear-gradient(135deg, ${colors.success.primary} 0%, ${colors.success.darker} 100%)`,
  color: colors.white,
  fontFamily: typography.fontFamily.body,
  fontSize: typography.fontSize.base,
  fontWeight: typography.fontWeight.bold,
  letterSpacing: typography.letterSpacing.normal,
  padding: '16px 40px',
  borderRadius: borderRadius.md,
  border: '1px solid rgba(255, 255, 255, 0.1)',
  boxShadow: shadows.success,
  transition: transitions.default,
  cursor: 'pointer',
}
```

### 3. Heading

```javascript
import { typography, colors } from '@/styles/tokens'

const headingStyle = {
  fontFamily: typography.fontFamily.heading,
  fontSize: typography.fontSize['3xl'],
  fontWeight: typography.fontWeight.extrabold,
  letterSpacing: typography.letterSpacing.tight,
  lineHeight: typography.lineHeight.tight,
  color: colors.white,
}
```

### 4. Result Block (Success)

```javascript
import { colors, shadows } from '@/styles/tokens'

const successBlockStyle = {
  background: colors.success.bg,
  border: `2px solid ${colors.success.border}`,
  borderRadius: borderRadius.base,
  padding: '14px 16px',
  color: colors.success.text,
  boxShadow: shadows.sm,
  transition: transitions.default,
}

// На hover
const successBlockHoverStyle = {
  ...successBlockStyle,
  background: colors.success.bgSelected,
  borderColor: colors.success.borderSelected,
  boxShadow: shadows.success,
  transform: 'scale(1.02)',
}
```

---

## 📦 ПОЛНЫЙ КОД ДЛЯ КОПИРОВАНИЯ

**Создай файл:** `app/styles/tokens.js`

```javascript
// ============================================
// DESIGN TOKENS
// Краш-тест маркетинга v11.5
// ============================================

export const colors = {
  // Backgrounds
  bg: {
    primary: '#0a0a0a',
    secondary: '#111111',
    tertiary: '#1a1a1a',
    glass: 'rgba(255, 255, 255, 0.03)',
    glassHover: 'rgba(255, 255, 255, 0.05)',
    glassActive: 'rgba(255, 255, 255, 0.08)',
    overlay: 'rgba(0, 0, 0, 0.5)',
    overlayDark: 'rgba(0, 0, 0, 0.7)',
  },

  // Success / Зелёный
  success: {
    50: '#ecfdf5',
    100: '#d1fae5',
    200: '#a7f3d0',
    300: '#6ee7b7',
    400: '#34d399',
    500: '#10b981',
    600: '#059669',
    700: '#047857',
    800: '#065f46',
    900: '#064e3b',
    primary: '#22c55e',
    darker: '#16a34a',
    light: '#86efac',
    glow: '#6ee7b7',
    shadow: 'rgba(34, 197, 94, 0.25)',
    bg: '#dcfce7',
    bgSelected: '#bbf7d0',
    border: '#86efac',
    borderSelected: '#22c55e',
    text: '#166534',
  },

  // Error / Красный
  error: {
    50: '#fef2f2',
    100: '#fee2e2',
    200: '#fecaca',
    300: '#fca5a5',
    400: '#f87171',
    500: '#ef4444',
    600: '#dc2626',
    700: '#b91c1c',
    800: '#991b1b',
    900: '#7f1d1d',
    glow: '#fca5a5',
    shadow: 'rgba(239, 68, 68, 0.25)',
    bg: '#fee2e2',
    bgSelected: '#fecaca',
    border: '#fca5a5',
    borderSelected: '#ef4444',
    text: '#991b1b',
  },

  // Warning / Жёлтый
  warning: {
    50: '#fefce8',
    100: '#fef9c3',
    200: '#fef08a',
    300: '#fde047',
    400: '#facc15',
    500: '#eab308',
    600: '#ca8a04',
    700: '#a16207',
    800: '#854d0e',
    900: '#713f12',
    glow: '#fde047',
    shadow: 'rgba(234, 179, 8, 0.25)',
    bg: '#fef3c7',
    text: '#78350f',
  },

  // Sections
  strategy: {
    base: '#5B9BD5',
    light: '#7BB3E0',
    dark: '#4A8BC5',
    glow: '#9DC9EA',
    shadow: 'rgba(91, 155, 213, 0.25)',
  },
  leadgen: {
    base: '#ED8936',
    light: '#F6AD55',
    dark: '#DD7926',
    glow: '#FBD38D',
    shadow: 'rgba(237, 137, 54, 0.25)',
  },
  sales: {
    base: '#48BB78',
    light: '#68D391',
    dark: '#38AB68',
    glow: '#9AE6B4',
    shadow: 'rgba(72, 187, 120, 0.25)',
  },

  // Accents
  gold: {
    base: '#ffd700',
    light: '#ffed4e',
    dark: '#ccac00',
    glow: '#ffe44d',
    shadow: 'rgba(255, 215, 0, 0.3)',
  },
  blue: {
    base: '#4299e1',
    light: '#63b3ed',
    dark: '#3182ce',
    glow: '#90cdf4',
    shadow: 'rgba(66, 153, 225, 0.25)',
  },
  purple: {
    base: '#a855f7',
    light: '#c084fc',
    dark: '#9333ea',
    glow: '#d8b4fe',
    shadow: 'rgba(168, 85, 247, 0.25)',
  },

  // Neutrals
  neutral: {
    50: '#fafafa',
    100: '#f5f5f5',
    200: '#e5e5e5',
    300: '#d4d4d4',
    400: '#a3a3a3',
    500: '#737373',
    600: '#525252',
    700: '#404040',
    800: '#262626',
    900: '#171717',
  },

  white: '#ffffff',
  black: '#000000',
}

export const shadows = {
  none: 'none',
  xs: '0 1px 2px rgba(0, 0, 0, 0.05)',
  sm: '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)',
  md: '0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px rgba(0, 0, 0, 0.1), 0 10px 10px rgba(0, 0, 0, 0.04)',
  '2xl': '0 25px 50px rgba(0, 0, 0, 0.25)',

  success: `0 2px 4px rgba(34, 197, 94, 0.15), 0 8px 16px rgba(34, 197, 94, 0.1), 0 16px 32px rgba(34, 197, 94, 0.05)`,
  error: `0 2px 4px rgba(239, 68, 68, 0.15), 0 8px 16px rgba(239, 68, 68, 0.1), 0 16px 32px rgba(239, 68, 68, 0.05)`,
  warning: `0 2px 4px rgba(234, 179, 8, 0.15), 0 8px 16px rgba(234, 179, 8, 0.1), 0 16px 32px rgba(234, 179, 8, 0.05)`,
  gold: `0 4px 8px rgba(255, 215, 0, 0.2), 0 12px 24px rgba(255, 215, 0, 0.15), 0 20px 40px rgba(255, 215, 0, 0.1)`,

  glass: `0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.05)`,
  glassHover: `0 12px 48px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.08)`,

  elevation: {
    0: 'none',
    1: '0 2px 4px rgba(0,0,0,0.1), 0 4px 8px rgba(0,0,0,0.08)',
    2: '0 8px 16px rgba(0,0,0,0.15), 0 16px 32px rgba(0,0,0,0.1)',
    3: '0 16px 32px rgba(0,0,0,0.2), 0 32px 64px rgba(0,0,0,0.15)',
  },
}

export const typography = {
  fontFamily: {
    heading: 'var(--font-manrope), -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    body: 'var(--font-inter), -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    mono: 'ui-monospace, "Cascadia Code", "Source Code Pro", Menlo, Monaco, "Courier New", monospace',
  },

  fontSize: {
    xs: '11px',
    sm: '13px',
    base: '15px',
    lg: '18px',
    xl: '24px',
    '2xl': '32px',
    '3xl': '42px',
    '4xl': '56px',
  },

  fontWeight: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
  },

  letterSpacing: {
    tighter: '-0.05em',
    tight: '-0.03em',
    normal: '-0.01em',
    wide: '0.02em',
    wider: '0.05em',
    widest: '0.1em',
  },

  lineHeight: {
    none: 1,
    tight: 1.1,
    snug: 1.3,
    normal: 1.5,
    relaxed: 1.6,
    loose: 1.8,
  },
}

export const spacing = {
  px: '1px',
  0: '0',
  0.5: '2px',
  1: '4px',
  1.5: '6px',
  2: '8px',
  2.5: '10px',
  3: '12px',
  3.5: '14px',
  4: '16px',
  5: '20px',
  6: '24px',
  7: '28px',
  8: '32px',
  9: '36px',
  10: '40px',
  12: '48px',
  14: '56px',
  16: '64px',
  20: '80px',
  24: '96px',
}

export const borderRadius = {
  none: '0',
  sm: '4px',
  base: '8px',
  md: '12px',
  lg: '16px',
  xl: '20px',
  '2xl': '24px',
  '3xl': '32px',
  full: '9999px',
}

export const transitions = {
  fast: '150ms',
  base: '200ms',
  slow: '300ms',
  slower: '500ms',
  slowest: '1000ms',

  ease: {
    linear: 'linear',
    in: 'cubic-bezier(0.4, 0, 1, 1)',
    out: 'cubic-bezier(0, 0, 0.2, 1)',
    inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },

  default: '200ms cubic-bezier(0, 0, 0.2, 1)',
  smooth: '300ms cubic-bezier(0.4, 0, 0.2, 1)',
  spring: '600ms cubic-bezier(0.34, 1.56, 0.64, 1)',
}
```

---

**Версия:** 1.0
**Дата:** 25.01.2026
