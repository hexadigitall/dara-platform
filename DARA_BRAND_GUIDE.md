# DARA Brand Identity Guide 🌟

## Brand Overview

**DARA** (meaning "Beautiful" in Yoruba) is an AI-powered fashion platform that celebrates global diversity while drawing inspiration from African design traditions.

## Logo System

### Primary Logo
- **File:** `/public/logos/dara-logo.svg`
- **Usage:** Main brand representation, headers, marketing materials
- **Contains:** Full wordmark with African-inspired geometric 'D' symbol

### Logo Mark
- **File:** `/public/logos/dara-mark.svg`  
- **Usage:** Favicons, app icons, social media profiles
- **Contains:** Standalone 'D' symbol with decorative patterns

### Logo Variations
```
📁 /public/logos/
├── dara-logo.svg                 # Primary SVG logo
├── dara-logo-large.png          # 800x240px
├── dara-logo-medium.png         # 400x120px  
├── dara-logo-small.png          # 200x60px
├── dara-mark.svg                # Logo mark SVG
├── dara-mark-512.png           # App icon large
├── dara-mark-256.png           # App icon medium
├── dara-mark-128.png           # App icon small
├── dara-mark-64.png            # Header logo
├── dara-mark-32.png            # Small UI elements
└── dara-mark-16.png            # Tiny icons
```

## Color Palette

### Primary Brand Colors
```css
/* Golden Amber Gradient */
--brand-primary-start: #D97706    /* Amber-600 */
--brand-primary-mid:   #F59E0B    /* Amber-500 */  
--brand-primary-end:   #FBBF24    /* Amber-400 */

/* Accent Colors */
--brand-accent-dark:   #7C2D12    /* Red-900 */
--brand-accent-light:  #DC2626    /* Red-600 */
```

### Supporting Colors
```css
/* Neutrals */
--neutral-900: #171717    /* Text primary */
--neutral-600: #525252    /* Text secondary */
--neutral-400: #A3A3A3    /* Text muted */
--neutral-100: #F5F5F5    /* Background light */

/* Theme Colors */
--theme-color: #F59E0B     /* PWA theme color */
```

## Typography

### Primary Font
- **Font Family:** Inter
- **Weights:** 400 (Regular), 500 (Medium), 600 (Semibold), 700 (Bold)
- **Usage:** All UI text, headings, body content

### Font Scale
```css
/* Headings */
.text-4xl { font-size: 2.25rem; }  /* Page titles */
.text-2xl { font-size: 1.5rem; }   /* Section titles */
.text-xl  { font-size: 1.25rem; }  /* Subsection titles */
.text-lg  { font-size: 1.125rem; } /* Large body text */

/* Body Text */
.text-base { font-size: 1rem; }    /* Default body */
.text-sm   { font-size: 0.875rem; } /* Small body */
.text-xs   { font-size: 0.75rem; }  /* Captions */
```

## Design Elements

### Geometric Patterns
- **Inspiration:** African textile patterns
- **Implementation:** Decorative dots, lines, and geometric shapes
- **Colors:** Primary brand colors with opacity variations

### African-Inspired Elements
```css
/* Example decorative elements */
.african-dots {
  background: radial-gradient(circle, #F59E0B 2px, transparent 2px);
  background-size: 12px 12px;
}

.african-lines {
  background: linear-gradient(45deg, transparent 40%, #FBBF24 40%, #FBBF24 60%, transparent 60%);
}
```

## Cultural Guidelines

### Respectful Usage
- ✅ **DO:** Draw inspiration from African design traditions
- ✅ **DO:** Celebrate global fashion diversity
- ✅ **DO:** Credit cultural influences appropriately
- ❌ **DON'T:** Appropriate sacred or ceremonial elements
- ❌ **DON'T:** Use stereotypical representations

### Brand Voice
- **Tone:** Warm, inclusive, empowering
- **Language:** Accessible, friendly, culturally aware
- **Values:** Beauty, diversity, sustainability, respect

## Implementation Examples

### Header Logo Usage
```jsx
<img 
  src="/logos/dara-mark-64.png" 
  alt="DARA" 
  className="h-8 w-8" 
/>
```

### Footer Logo Usage  
```jsx
<img 
  src="/logos/dara-logo-small.png" 
  alt="DARA" 
  className="h-8 mb-2" 
/>
```

### Meta Tags
```html
<meta name="theme-color" content="#F59E0B" />
<meta property="og:image" content="/logos/dara-logo-large.png" />
```

## Favicon System

### Files Created
```
📁 /public/
├── favicon.ico              # Multi-size ICO (16, 32, 48px)
├── favicon-16x16.png       # Browser tab
├── favicon-32x32.png       # Browser tab
├── apple-touch-icon.png    # iOS home screen (180x180)
├── android-chrome-192x192.png  # Android (192x192)
├── android-chrome-512x512.png  # Android (512x512)
└── manifest.json           # PWA manifest
```

## Brand Applications

### Web Headers
- Use `dara-mark-64.png` for standard navigation
- Pair with "DARA" text in brand font
- Apply golden gradient to text when possible

### Social Media
- Profile images: `dara-mark-512.png`
- Cover photos: `dara-logo-large.png`  
- Post graphics: Include brand colors and patterns

### Marketing Materials
- Primary logo for all branded communications
- Maintain golden color scheme
- Include African-inspired decorative elements

## Technical Implementation

### CSS Variables
```css
:root {
  --brand-gradient: linear-gradient(135deg, #D97706 0%, #F59E0B 50%, #FBBF24 100%);
  --brand-accent: linear-gradient(135deg, #7C2D12 0%, #DC2626 100%);
}
```

### Tailwind Configuration
```js
// Accent colors already configured in tailwind.config.js
theme: {
  extend: {
    colors: {
      accent: {
        400: '#FBBF24',
        500: '#F59E0B', 
        600: '#D97706',
        // ... other shades
      }
    }
  }
}
```

---

**DARA** - Beautiful AI Fashion for Everyone 🌟
*Celebrating global diversity through respectful cultural inspiration*
