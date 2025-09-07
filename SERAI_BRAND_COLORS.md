# Serai Brand Color System

## Overview
This document defines the official color palette and usage guidelines for Serai's brand identity. These colors are designed to convey luxury, sophistication, and hospitality while maintaining excellent accessibility and usability.

## Primary Colors

### Red (#660f0f)
- **Purpose**: Anchor, CTA, premium identity
- **Psychology**: Passion, luxury, energy
- **Usage**: Primary action buttons, highlights, premium features
- **Tailwind Class**: `serai-red-500`
- **Gradient**: `from-serai-red-500 to-serai-red-600`

### Deep Navy (#1a1a2e)
- **Purpose**: Sophisticated, digital stability
- **Psychology**: Trust, stability, sophistication
- **Usage**: Headers, navigation, important UI elements
- **Tailwind Class**: `serai-navy-500`
- **Gradient**: `from-serai-navy-500 to-serai-navy-600`

### Warm Gold (#d4af37)
- **Purpose**: Premium accent
- **Psychology**: Luxury, exclusivity, success
- **Usage**: Sparingly for accents, badges, luxury highlights
- **Tailwind Class**: `serai-gold-500`
- **Gradient**: `from-serai-gold-500 to-serai-gold-600`

## Secondary Colors

### Cream (#f5f5dc)
- **Purpose**: Card backgrounds, hospitality warmth accents
- **Psychology**: Warmth, comfort, approachability
- **Usage**: Card backgrounds, subtle accents, hospitality collateral
- **Tailwind Class**: `serai-cream-500`
- **Note**: NOT used for page backgrounds - all pages must have white backgrounds

### Charcoal (#36454f)
- **Purpose**: Text + subtle UI elements
- **Psychology**: Professional, reliable
- **Usage**: Body text, subtle UI elements, secondary information
- **Tailwind Class**: `serai-charcoal-500`

### Forest Green (#6b9e6b)
- **Purpose**: Nature, sustainability touch
- **Psychology**: Nature, sustainability, growth
- **Usage**: Subtly for eco-branding, sustainability features
- **Tailwind Class**: `serai-forest-500`

## Neutrals

### White (#ffffff)
- **Usage**: ALL page backgrounds, primary backgrounds, high contrast text
- **Tailwind Class**: `serai-neutral-50`
- **Rule**: Every page must have a white background

### Light Gray (#f8f9fa)
- **Usage**: Secondary backgrounds, subtle dividers
- **Tailwind Class**: `serai-neutral-100`

### Medium Gray (#6c757d)
- **Usage**: Secondary text, disabled states
- **Tailwind Class**: `serai-neutral-500`

### Dark Gray (#343a40)
- **Usage**: Headers, important text
- **Tailwind Class**: `serai-neutral-800`

## Color Hierarchy & Usage Rules

### 1. Distribution Guidelines
- **60%** Neutrals/White (page backgrounds, cards, room interiors)
- **25%** Primary Red/Navy (headers, CTAs, key UI elements)
- **10%** Gold/Green accents (badges, eco-services, luxury highlights)
- **5%** Other colors for specific use cases

### 1.1. Page Background Rule
- **ALL pages must have white backgrounds** (`bg-white`)
- Cream (#f5f5dc) is reserved for card backgrounds and subtle accents only
- No page should use cream, gray, or any other color as the main background

### 2. Typography Pairing
- **Headers**: Luxury Serif (Playfair Display, Cormorant Garamond)
- **Body**: Modern Sans (Inter, Lato, Neue Haas Grotesk)
- **Creates**: Luxury + modern tech balance

### 3. Gradient Strategy
- Keep gradients minimal
- Use flat fills for most branding
- Reserve gradients for hero images, animations, motion backgrounds

#### Suggested Gradients:
- **Red**: `#660f0f → #991b1b`
- **Navy**: `#1a1a2e → #0e0e1a`
- **Gold**: `#d4af37 → #b8860b`

## Implementation Guidelines

### Primary Actions (CTAs)
```css
/* Main CTA Button */
background: linear-gradient(135deg, #660f0f, #550c0c);
color: #ffffff;
hover: linear-gradient(135deg, #550c0c, #440a0a);

/* Tailwind Classes */
bg-gradient-to-r from-serai-red-500 to-serai-red-600
hover:from-serai-red-600 hover:to-serai-red-700
```

### Headers & Navigation
```css
/* Header Background */
background: #1a1a2e;
color: #ffffff;

/* Tailwind Classes */
bg-serai-navy-500 text-white
```

### Page Backgrounds
```css
/* Page Background - REQUIRED for all pages */
background: #ffffff;

/* Tailwind Classes */
bg-white
```

### Cards & Backgrounds
```css
/* Card Background */
background: #f5f5dc;
border: 1px solid #e9ecef;

/* Tailwind Classes */
bg-serai-cream-500 border-serai-neutral-200
```

### Premium Accents
```css
/* Gold Accent */
background: #d4af37;
color: #ffffff;

/* Tailwind Classes */
bg-serai-gold-500 text-white
```

### Text Hierarchy
```css
/* Primary Text */
color: #343a40; /* serai-neutral-800 */

/* Secondary Text */
color: #6c757d; /* serai-neutral-500 */

/* Muted Text */
color: #adb5bd; /* serai-neutral-400 */
```

## Accessibility Considerations

### Contrast Ratios
- Maintain **4.5:1** contrast ratio for text
- Test with colorblind simulators
- Ensure CTAs remain identifiable with both color + icon/shape

### Color Blindness Support
- Red (#660f0f) has good contrast for most color vision deficiencies
- Navy (#1a1a2e) provides excellent contrast
- Always pair color with other visual cues (icons, shapes, text)

### Testing Tools
- Use WebAIM contrast checker
- Test with colorblind simulators
- Verify with screen readers

## Component-Specific Usage

### Buttons
- **Primary**: `bg-serai-red-500` with `hover:bg-serai-red-600`
- **Secondary**: `bg-serai-navy-500` with `hover:bg-serai-navy-600`
- **Accent**: `bg-serai-gold-500` with `hover:bg-serai-gold-600`

### Cards
- **Background**: `bg-serai-cream-500`
- **Border**: `border-serai-neutral-200`
- **Text**: `text-serai-charcoal-500`

### Headers
- **Background**: `bg-serai-navy-500`
- **Text**: `text-white`
- **Logo**: Use white version on navy backgrounds

### Forms
- **Input Background**: `bg-white`
- **Input Border**: `border-serai-neutral-300`
- **Focus State**: `focus:ring-serai-red-500`

## Brand Consistency

### Do's
- ✅ Use red (#660f0f) for all primary CTAs
- ✅ Use navy (#1a1a2e) for headers and navigation
- ✅ Use gold (#d4af37) sparingly for premium elements
- ✅ Use cream (#f5f5dc) for card backgrounds and subtle accents
- ✅ Use white (#ffffff) for ALL page backgrounds
- ✅ Maintain consistent contrast ratios

### Don'ts
- ❌ Don't use red for non-action elements
- ❌ Don't overuse gold (keep it premium and special)
- ❌ Don't use colors that aren't in the brand palette
- ❌ Don't use cream, gray, or any color other than white for page backgrounds
- ❌ Don't compromise on accessibility for aesthetic reasons

## File Structure
```
frontend/
├── tailwind.config.js          # Color definitions
├── src/
│   ├── app/globals.css         # Global color variables
│   └── components/             # Component implementations
└── SERAI_BRAND_COLORS.md       # This documentation
```

## Updates
- **Last Updated**: [Current Date]
- **Version**: 1.0
- **Next Review**: Quarterly

---

*This color system ensures Serai maintains a consistent, luxurious, and accessible brand identity across all digital touchpoints.*
