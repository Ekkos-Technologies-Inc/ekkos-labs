# ekkOS_Labs Typography

**Official Typography System**

---

## Primary Font

### Inter

**Source:** Google Fonts (via `next/font/google`)

**Weights:**
- 400 — Regular (body text)
- 500 — Medium (emphasis)
- 600 — Semi-bold (subheadings)
- 700 — Bold (section headings)
- 800 — Extra-bold (page titles)
- 900 — Black (hero headings)

**Usage:**
- All headings
- All body text
- All UI elements

---

## Typography Scale

### Headings

**Hero (H1)**
- Size: `text-5xl` (3rem / 48px) or `text-6xl` (3.75rem / 60px)
- Weight: 800 or 900
- Line height: `leading-tight` (1.1-1.2)
- Usage: Home page hero, major page titles

**Page Title (H1)**
- Size: `text-4xl` (2.25rem / 36px)
- Weight: 800
- Line height: `leading-tight`
- Usage: Page titles, major sections

**Section Title (H2)**
- Size: `text-3xl` (1.875rem / 30px) or `text-2xl` (1.5rem / 24px)
- Weight: 700
- Line height: `leading-tight`
- Usage: Section headings, card titles

**Subsection (H3)**
- Size: `text-xl` (1.25rem / 20px) or `text-lg` (1.125rem / 18px)
- Weight: 600
- Line height: `leading-snug`
- Usage: Subsections, component titles

### Body Text

**Large Body**
- Size: `text-lg` (1.125rem / 18px)
- Weight: 400
- Line height: `leading-relaxed` (1.75)
- Usage: Important paragraphs, introductions

**Body**
- Size: `text-base` (1rem / 16px)
- Weight: 400
- Line height: `leading-relaxed` (1.75)
- Usage: Standard paragraphs, content

**Small Body**
- Size: `text-sm` (0.875rem / 14px)
- Weight: 400
- Line height: `leading-normal` (1.5)
- Usage: Captions, metadata, fine print

### Code/Technical

**Monospace**
- Font: System monospace (Menlo, Monaco, Consolas, etc.)
- Size: `text-sm` (0.875rem / 14px)
- Weight: 400
- Background: `bg-black/40`
- Usage: Code blocks, technical terms

---

## Usage Examples

### Hero Section
```tsx
<h1 className="text-5xl font-extrabold leading-tight text-white lg:text-6xl">
  Researching the cognitive substrate for intelligent agents.
</h1>
```

### Page Title
```tsx
<h1 className="text-4xl font-bold text-white">
  About ekkOS_Labs
</h1>
```

### Section Heading
```tsx
<h2 className="text-3xl font-bold text-white">
  Research Focus Areas
</h2>
```

### Body Text
```tsx
<p className="text-lg leading-relaxed text-white/70">
  ekkOS_Labs drives the underlying cognitive research...
</p>
```

### Code Block
```tsx
<pre className="rounded-lg bg-black/40 p-4">
  <code className="text-sm">CREATE TABLE episode_links...</code>
</pre>
```

---

## Font Loading

### Next.js Implementation

```tsx
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});
```

### CSS Variable

```css
font-family: var(--font-inter), system-ui, sans-serif;
```

---

## Best Practices

### Readability
- Maintain high contrast (white text on dark backgrounds)
- Use generous line height (1.5-1.75 for body text)
- Limit line length (max 75-80 characters)

### Hierarchy
- Use weight and size to establish clear hierarchy
- Don't skip heading levels (H1 → H2 → H3)
- Maintain consistent spacing between headings and content

### Emphasis
- Use **bold** (700) for strong emphasis
- Use *medium* (500) for subtle emphasis
- Avoid underlining (reserved for links)

---

**Last Updated:** January 12, 2025




















































































































































































































