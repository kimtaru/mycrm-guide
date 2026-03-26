# Design System Specification: The Architectural Minimalist

## 1. Overview & Creative North Star
The Creative North Star for this design system is **"The Digital Architect."** 

Moving beyond the generic "SaaS dashboard" look, this system treats UI as a series of intentional, structural layers. We avoid the "boxed-in" feeling of traditional grids by prioritizing **Tonal Depth** over lines. The goal is an editorial-grade experience that feels authoritative yet breathable. We achieve this through:
*   **Intentional Asymmetry:** Using varying gutter widths and off-center alignments to guide the eye.
*   **Atmospheric Space:** Utilizing the larger end of our spacing scale to create a sense of premium "luxury" in a technical environment.
*   **Structural Clarity:** Defining hierarchy through background shifts rather than decorative borders.

## 2. Color Strategy & Surface Logic
The palette is rooted in a "Tech-Focused Blue" ecosystem, but its strength lies in the neutral "Surface" tiers.

### The "No-Line" Rule
Standard 1px solid borders are strictly prohibited for sectioning. To define a sidebar, card, or header, use **Surface Transitions**. 
*   *Example:* Place a `surface_container_lowest` (#ffffff) card on top of a `surface_container_low` (#f2f4f6) section. The contrast creates the boundary naturally.

### Surface Hierarchy & Nesting
Treat the UI as a physical stack of paper. Use these tokens to create depth:
*   **Level 0 (Base):** `surface` (#f7f9fb) – The canvas.
*   **Level 1 (Sections):** `surface_container_low` (#f2f4f6) – For sidebars or secondary content areas.
*   **Level 2 (Interactive):** `surface_container_highest` (#e0e3e5) – For subtle hover states or inset code blocks.
*   **Level 3 (Elevated):** `surface_container_lowest` (#ffffff) – Reserved for the highest priority content, like primary cards or modals.

### The "Glass & Gradient" Rule
To inject "soul" into the developer experience, use **Glassmorphism** for floating navigation and tooltips.
*   **Token:** `surface_container_lowest` at 80% opacity + `backdrop-filter: blur(12px)`.
*   **Gradients:** Use a subtle linear gradient from `primary` (#0050cb) to `primary_container` (#0066ff) for main CTAs to prevent them from looking flat.

## 3. Typography
We utilize **Inter** across all levels to maintain a singular, cohesive voice. The hierarchy is driven by dramatic scale shifts rather than font-family mixing.

*   **Display (Display-LG to SM):** Used for marketing hero sections or high-level dashboard metrics. Tracking should be set to `-0.02em` for a tighter, premium feel.
*   **Headlines (Headline-LG to SM):** The "Architectural" anchors. Use `on_surface` (#191c1e) with a medium weight (500-600) to command attention.
*   **Body (Body-LG to SM):** Optimized for long-form documentation or CRM data. Use `on_surface_variant` (#424656) for secondary body text to reduce eye strain.
*   **Labels (Label-MD to SM):** Always uppercase with `+0.05em` letter spacing when used for metadata or category tags.

## 4. Elevation & Depth
In this system, elevation is an atmospheric effect, not a structural one.

*   **The Layering Principle:** Depth is achieved by stacking. A `surface_container_lowest` component sitting on a `surface` background provides all the "lift" needed.
*   **Ambient Shadows:** If a component must "float" (e.g., a Modal or Popover), use an ultra-diffused shadow.
    *   *Spec:* `0 20px 40px -12px rgba(25, 28, 30, 0.08)`. The shadow color is a low-opacity version of `on_surface`.
*   **The "Ghost Border" Fallback:** If a border is required for accessibility (e.g., in high-contrast mode), use `outline_variant` (#c2c6d8) at **20% opacity**. Never use a 100% opaque border.

## 5. Components

### Buttons
*   **Primary:** Gradient of `primary` to `primary_container`. White text. Roundedness: `md` (0.75rem).
*   **Secondary:** `surface_container_high` background with `on_secondary_container` text. No border.
*   **Tertiary:** No background. `primary` text. Use for low-emphasis actions.

### Cards & Lists
*   **Rule:** Forbid divider lines.
*   **Layout:** Use Spacing Scale `4` (1.4rem) between list items. Use background color shifts (`surface_container_low`) on hover to define the list item boundaries.
*   **Corner Radius:** Cards should always use `lg` (1rem) for a soft, modern feel.

### Input Fields
*   **Base State:** `surface_container_lowest` background with a "Ghost Border" (10% `outline`).
*   **Focus State:** Border becomes 2px `primary`, no "glow" shadow—just a clean, sharp color shift.
*   **Typography:** Labels use `label-md` seated 0.5rem above the input.

### Code Blocks (Developer-Specific)
*   **Background:** `inverse_surface` (#2d3133).
*   **Text:** `inverse_on_surface` (#eff1f3).
*   **Padding:** Spacing Scale `5` (1.7rem) for an expansive, readable feel.
*   **Radius:** `md` (0.75rem).

### Status Chips
*   **Action Chips:** Semi-transparent `secondary_container` with `on_secondary_container` text. 
*   **Shape:** Always `full` (9999px) roundedness to contrast against the `md` roundedness of buttons.

## 6. Do's and Don'ts

### Do
*   **Do** use white space as a separator. If you think you need a line, try adding `1.5rem` of space instead.
*   **Do** nest containers using the Surface Hierarchy (Low -> Lowest) to create natural focus.
*   **Do** use `body-md` for the majority of UI text to maintain a "tight," professional developer-tool aesthetic.

### Don't
*   **Don't** use pure black (#000000). Use `on_surface` (#191c1e) for all "black" text.
*   **Don't** use 1px solid borders to separate the header from the content. Use a subtle background shift or a "Ghost Border."
*   **Don't** use standard "drop shadows." Use Ambient Shadows or Tonal Layering.
*   **Don't** crowd the interface. This system thrives on the Spacing Scale. If a layout feels "cheap," increase the padding.