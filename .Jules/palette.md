## 2024-05-18 - Missing Accessibility Attributes on Custom Controls
**Learning:** Found a pattern of icon-only custom navigation controls (like Swiper next/prev buttons) missing `aria-label`s and visible keyboard focus states. This significantly degrades the experience for screen reader and keyboard-only users.
**Action:** Always ensure that any interactive elements, especially custom navigation buttons containing only icons, have descriptive `aria-label`s and clear `focus-visible` styles.
