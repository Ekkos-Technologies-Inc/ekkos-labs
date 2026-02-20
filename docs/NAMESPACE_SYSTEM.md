# ekkOS_ Namespace System

**Official Documentation**

---

## Overview

The `ekkOS_` namespace system provides a modular, scalable, and semantically clear way to organize the entire ekkOS ecosystem.

Every product, division, and component extends from the core `ekkOS` identity using the underscore separator.

---

## Naming Convention

### Format

```
ekkOS_[Component]
```

### Rules

1. **Core identity:** Always starts with `ekkOS`
2. **Separator:** Always uses underscore `_`
3. **Component:** PascalCase for clarity (e.g., `Labs`, `Robotics`, `Core`)
4. **No spaces:** Underscore replaces spaces
5. **No hyphens:** Underscore is the only separator

### Examples

✅ **Correct:**
- `ekkOS_Labs`
- `ekkOS_Robotics`
- `ekkOS_Core`
- `ekkOS_Agent`
- `ekkOS_Collective`

❌ **Incorrect:**
- `ekkOS Labs` (space)
- `ekkOS-Labs` (hyphen)
- `ekkos_labs` (lowercase)
- `EkkOS_Labs` (mixed case in core)

---

## Official Namespace Registry

### Core Components

| Namespace | Purpose | Status | Domain |
|-----------|---------|--------|--------|
| `ekkOS` | Core platform/product | ✅ Active | ekkos.dev |
| `ekkOS_Core` | Core substrate engine | 🔄 Planned | core.ekkos.dev |
| `ekkOS_Labs` | Research division | ✅ Active | ekkoslabs.com |

### Divisions

| Namespace | Purpose | Status | Domain |
|-----------|---------|--------|--------|
| `ekkOS_Robotics` | Robotics division | 🔄 Planned | robotics.ekkos.dev |
| `ekkOS_Agent` | Agent framework | 🔄 Planned | agent.ekkos.dev |
| `ekkOS_Collective` | Multi-agent systems | 🔄 Planned | collective.ekkos.dev |
| `ekkOS_Edge` | Edge computing | 🔄 Planned | edge.ekkos.dev |
| `ekkOS_Defense` | Defense applications | 🔄 Planned | defense.ekkos.dev |

### Technical Components

| Namespace | Purpose | Status | Package |
|-----------|---------|--------|---------|
| `@ekkos/sdk` | TypeScript SDK | ✅ Active | npm |
| `@ekkos/core` | Core engine | 🔄 Planned | npm |
| `@ekkos/agent` | Agent framework | 🔄 Planned | npm |
| `@ekkos/robotics` | Robotics SDK | 🔄 Planned | npm |

---

## Usage Guidelines

### In Code

```typescript
// Package names
import { Memory } from '@ekkos/sdk';
import { Core } from '@ekkos/core';

// Component names
const EkkOSLabs = () => { ... };
const EkkOSRobotics = () => { ... };
```

### In Documentation

- **Brand name:** Always use `ekkOS_Labs` (with underscore)
- **Display name:** Can use "ekkOS Labs" (with space) for readability
- **Code references:** Always use underscore format

### In URLs

- **Subdomains:** `labs.ekkos.dev`, `robotics.ekkos.dev`
- **Paths:** `/ekkos-labs`, `/ekkos-robotics` (hyphens for URLs)
- **Domains:** `ekkoslabs.com`, `ekkosrobotics.com`

### In Branding

- **Logo:** `ekkOS_Labs` (with underscore)
- **Tagline:** Can use "ekkOS Labs" (with space)
- **Legal:** Use underscore in official names

---

## Domain Strategy

### Primary Domains

- `ekkos.dev` — Main platform
- `ekkoslabs.com` — Research division
- `ekkos.ca` — Corporate site

### Subdomain Pattern

- `labs.ekkos.dev` — Alternative Labs URL
- `robotics.ekkos.dev` — Robotics division
- `api.ekkos.dev` — API documentation
- `sdk.ekkos.dev` — SDK documentation

### Future Domains

- `ekkosrobotics.com` — Robotics division
- `ekkosagent.com` — Agent framework
- `ekkosedge.com` — Edge computing

---

## Package Naming

### NPM Packages

```
@ekkos/[component]
```

Examples:
- `@ekkos/sdk` — TypeScript SDK
- `@ekkos/core` — Core engine
- `@ekkos/agent` — Agent framework
- `@ekkos/robotics` — Robotics SDK
- `@ekkos/mcp` — MCP server

### GitHub Repositories

```
ekkos-[component]
```

Examples:
- `ekkos-platform` — Main platform
- `ekkos-labs` — Research site
- `ekkos-sdk` — SDK repository
- `ekkos-robotics` — Robotics division

---

## Brand Hierarchy

### Level 1: Core Brand
**ekkOS** — The cognitive operating system

### Level 2: Divisions
**ekkOS_Labs** — Research division  
**ekkOS_Robotics** — Robotics division  
**ekkOS_Agent** — Agent framework

### Level 3: Components
**ekkOS_Core** — Core engine  
**ekkOS_Edge** — Edge computing  
**ekkOS_Collective** — Multi-agent systems

### Level 4: Products
**ekkOS_Memory** — Memory substrate  
**ekkOS_Patterns** — Pattern intelligence  
**ekkOS_Reflection** — Meta-learning layer

---

## Visual Identity

### Logo Variations

1. **Full logo:** `ekkOS_Labs` (with underscore)
2. **Wordmark:** `ekkOS Labs` (with space, for readability)
3. **Icon:** `ekkOS` (core logo)

### Typography

- **Primary:** Inter (as used in Labs site)
- **Monospace:** For code/technical contexts
- **Weight:** Bold (800/900) for brand name, Regular (400/500) for body

### Color System

- **Primary:** Tech blue/cyan (`#00D9FF`)
- **Secondary:** Indigo (`#6366F1`)
- **Accent:** Emerald (`#10B981`)
- **Background:** Deep charcoal/black (`#0a0a0a`)

---

## Requesting New Namespaces

To request a new namespace:

1. **Check availability** — Ensure it's not already taken
2. **Define purpose** — Clear use case and scope
3. **Propose domain** — Suggested domain/subdomain
4. **Document usage** — How it fits in the ecosystem

Submit requests via:
- GitHub issue (tagged `namespace-request`)
- Internal documentation update
- Brand team review

---

## Examples in Practice

### Current Usage

**ekkOS_Labs** (Research Division)
- Domain: `ekkoslabs.com`
- Repository: `apps/labs`
- Package: N/A (website)
- Status: ✅ Active

**ekkOS** (Core Platform)
- Domain: `ekkos.dev`
- Repository: `apps/web`
- Package: `@ekkos/sdk`
- Status: ✅ Active

### Future Usage

**ekkOS_Robotics** (Robotics Division)
- Domain: `robotics.ekkos.dev` or `ekkosrobotics.com`
- Repository: `apps/robotics`
- Package: `@ekkos/robotics`
- Status: 🔄 Planned

**ekkOS_Agent** (Agent Framework)
- Domain: `agent.ekkos.dev`
- Repository: `apps/agent`
- Package: `@ekkos/agent`
- Status: 🔄 Planned

---

## Maintenance

This namespace registry is maintained by the ekkOS brand team.

**Last Updated:** January 12, 2025  
**Next Review:** Quarterly

---

## Questions?

For questions about the namespace system:
- See `/docs/BRAND_IDENTITY.md` for brand philosophy
- See `/docs/BRAND_MANIFESTO.md` for brand vision
- Contact brand team for new namespace requests

