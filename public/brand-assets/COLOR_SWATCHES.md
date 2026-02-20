# ekkOS_Labs Color Swatches

**Official Color Palette**

---

## Primary Colors

### Tech Blue (Primary)
- **Hex:** `#00D9FF`
- **RGB:** `rgb(0, 217, 255)`
- **HSL:** `hsl(188, 100%, 50%)`
- **Usage:** Headings, CTAs, primary accents, links
- **Dark Variant:** `#0099CC` (hover states)

### Indigo (Secondary)
- **Hex:** `#6366F1`
- **RGB:** `rgb(99, 102, 241)`
- **HSL:** `hsl(238, 86%, 66%)`
- **Usage:** Secondary accents, badges, highlights
- **Dark Variant:** `#4F46E5` (hover states)

### Emerald (Accent)
- **Hex:** `#10B981`
- **RGB:** `rgb(16, 185, 129)`
- **HSL:** `hsl(160, 84%, 39%)`
- **Usage:** Success states, positive metrics, accent highlights
- **Dark Variant:** `#059669` (hover states)

---

## Neutral Colors

### Background
- **Hex:** `#0a0a0a`
- **RGB:** `rgb(10, 10, 10)`
- **HSL:** `hsl(0, 0%, 4%)`
- **Usage:** Primary background, hero sections

### Foreground
- **Hex:** `#ffffff`
- **RGB:** `rgb(255, 255, 255)`
- **HSL:** `hsl(0, 0%, 100%)`
- **Usage:** Primary text, headings

### Glass Effects
- **Light Glass:** `rgba(255, 255, 255, 0.1)`
- **Medium Glass:** `rgba(255, 255, 255, 0.05)`
- **Border Glass:** `rgba(255, 255, 255, 0.08)`
- **Hover Glass:** `rgba(255, 255, 255, 0.15)`

---

## Usage Guidelines

### Primary (Tech Blue)
- Use for: Main CTAs, primary links, key highlights
- Avoid: Large background blocks, body text

### Secondary (Indigo)
- Use for: Secondary CTAs, badges, supporting elements
- Avoid: Primary actions, critical information

### Accent (Emerald)
- Use for: Success states, positive metrics, confirmations
- Avoid: Primary actions, error states

### Background
- Always use deep charcoal/black for main backgrounds
- Maintain high contrast for readability

---

## Accessibility

### Contrast Ratios
- Primary text on background: 19.5:1 (AAA)
- Primary blue on background: 8.2:1 (AA)
- Secondary indigo on background: 6.8:1 (AA)
- Accent emerald on background: 7.1:1 (AA)

All color combinations meet WCAG AA standards.

---

## Tailwind Configuration

```typescript
colors: {
  primary: {
    DEFAULT: "#00D9FF",
    dark: "#0099CC",
  },
  secondary: {
    DEFAULT: "#6366F1",
    dark: "#4F46E5",
  },
  accent: {
    DEFAULT: "#10B981",
    dark: "#059669",
  },
}
```

---

**Last Updated:** January 12, 2025




















































































































































































































