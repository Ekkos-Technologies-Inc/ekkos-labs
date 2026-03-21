# ekkOS_Labs Logo Guidelines

**Official Logo Usage**

---

## Logo Format

### Primary Logo

**Text:** `ekkOS_Labs`

**Format:** Underscore separator (always use underscore in branding)

**Typography:**
- Font: Inter
- Weight: Bold (800) or Extra-bold (900)
- Style: Technical, clean, research-grade

**Color:**
- Primary: White (`#ffffff`) on dark backgrounds
- Accent: Primary blue (`#00D9FF`) for highlights

---

## Logo Variations

### 1. Full Logo (Primary)
```
ekkOS_Labs
```
- Use for: Headers, main branding, official materials
- Format: Always with underscore

### 2. Wordmark (Readability)
```
ekkOS Labs
```
- Use for: Body text, descriptions, readability contexts
- Format: Space instead of underscore (for readability only)

### 3. Core Logo
```
ekkOS
```
- Use for: When referencing core platform
- Format: Just "ekkOS" without division suffix

---

## Usage Rules

### ✅ Do

- Use `ekkOS_Labs` (with underscore) in all branding
- Use `ekkOS Labs` (with space) only in body text for readability
- Maintain consistent typography (Inter, bold)
- Use white on dark backgrounds
- Use primary blue for accent/highlight versions

### ❌ Don't

- Don't use hyphens (`ekkOS-Labs`)
- Don't use lowercase (`ekkos_labs`)
- Don't use mixed case in core (`EkkOS_Labs`)
- Don't use different fonts
- Don't add decorative elements
- Don't stretch or distort

---

## Logo Placement

### Header
- Left-aligned
- Top of page
- Sticky positioning
- Size: `text-xl` (1.25rem / 20px)

### Footer
- Left-aligned in footer section
- Size: `text-sm` (0.875rem / 14px)
- Can use wordmark format for readability

### Hero Section
- Can be larger for emphasis
- Size: `text-2xl` (1.5rem / 24px) or larger
- Use badge format if needed

---

## Badge Format

### Badge Usage

When using as a badge (e.g., hero section):

```tsx
<Badge variant="primary" className="mb-4">
  ekkOS_Labs
</Badge>
```

**Styling:**
- Rounded pill shape
- Primary blue background
- White text
- Small padding

---

## Favicon

### Current
- Use simple "e" or "ekkOS" icon
- Monochrome (white on dark)
- Size: 16x16, 32x32, 48x48

### Future
- Create dedicated ekkOS_Labs icon
- Maintain technical, clean aesthetic
- Works at small sizes

---

## Logo Files Needed

### SVG (Vector)
- `ekkOS_Labs.svg` — Full logo, scalable
- `ekkOS_Labs-icon.svg` — Icon only (if separate)

### PNG (Raster)
- `ekkOS_Labs-@2x.png` — High resolution
- `ekkOS_Labs-@3x.png` — Retina resolution

### Favicon
- `favicon.ico` — Multi-size ICO
- `favicon-16x16.png`
- `favicon-32x32.png`
- `apple-touch-icon.png` (180x180)

---

## Implementation

### Current Implementation

```tsx
// SiteHeader.tsx
<Link href="/" className="flex items-center space-x-2">
  <span className="text-xl font-bold text-white">ekkOS_Labs</span>
</Link>
```

### Recommended

```tsx
// Future: Use SVG logo when available
<Link href="/">
  <Image src="/logo/ekkOS_Labs.svg" alt="ekkOS_Labs" width={120} height={32} />
</Link>
```

---

## Brand Consistency

### Across Properties

- **ekkOS** (platform) — `ekkOS` logo
- **ekkOS_Labs** (research) — `ekkOS_Labs` logo
- **ekkOS_Robotics** (future) — `ekkOS_Robotics` logo

All maintain:
- Same font (Inter)
- Same weight (bold)
- Same style (technical, clean)
- Underscore separator

---

**Last Updated:** January 12, 2025




















































































































































































































