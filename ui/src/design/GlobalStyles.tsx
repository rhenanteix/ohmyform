import { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`


  :root {
    --omf-color-slate-100: var(--omf-colors-slate-100);
    --omf-color-slate-700: var(--omf-colors-slate-700);
    --omf-font-mono: var(--omf-typography-fontFamily-mono);
    --omf-typography-fontSize-md: var(--omf-typography-fontSize-base);
    --omf-border: var(--omf-colors-border);
    --omf-color-primary-50: var(--omf-colors-primary-50);
    --omf-color-primary-100: var(--omf-colors-primary-100);
    --omf-color-primary-200: var(--omf-colors-primary-200);
    --omf-color-primary-300: var(--omf-colors-primary-300);
    --omf-color-primary-400: var(--omf-colors-primary-400);
    --omf-color-primary-500: var(--omf-colors-primary-500);
    --omf-color-primary-600: var(--omf-colors-primary-600);
    --omf-color-primary-700: var(--omf-colors-primary-700);
    --omf-color-primary-800: var(--omf-colors-primary-800);
    --omf-color-primary-900: var(--omf-colors-primary-900);
    --omf-color-primary-950: var(--omf-colors-primary-950);
    --omf-color-text-primary: var(--omf-colors-text-primary);
    --omf-color-text-secondary: var(--omf-colors-text-secondary);
    --omf-color-text-muted: var(--omf-colors-text-muted);
    --omf-color-text-inverse: var(--omf-colors-text-inverse);
    --omf-color-border: var(--omf-colors-border);
    --omf-color-border-muted: var(--omf-colors-border-muted);
    --omf-color-border-strong: var(--omf-colors-border-strong);
    --omf-color-surface: var(--omf-colors-background-primary);
    --omf-color-surface-secondary: var(--omf-colors-background-secondary);
    --omf-color-surface-tertiary: var(--omf-colors-background-tertiary);
    --omf-color-status-success: var(--omf-colors-semantic-success-DEFAULT);
    --omf-color-status-warning: var(--omf-colors-semantic-warning-DEFAULT);
    --omf-color-status-error: var(--omf-colors-semantic-error-DEFAULT);
    --omf-color-status-info: var(--omf-colors-semantic-info-DEFAULT);
    --omf-radius-sm: var(--omf-borderRadius-sm);
    --omf-radius-md: var(--omf-borderRadius-md);
    --omf-radius-lg: var(--omf-borderRadius-lg);
    --omf-radius-xl: var(--omf-borderRadius-xl);
    --omf-radius-2xl: var(--omf-borderRadius-2xl);
    --omf-radius-full: var(--omf-borderRadius-full);
    --omf-shadow-sm: var(--omf-shadows-sm);
    --omf-shadow-md: var(--omf-shadows-md);
    --omf-shadow-lg: var(--omf-shadows-lg);
    --omf-shadow-xl: var(--omf-shadows-xl);
    --omf-transition: var(--omf-transitions-DEFAULT);
    --omf-transition-fast: var(--omf-transitions-fast);
    --omf-gradient: var(--omf-gradients-primary);
    --omf-gradient-text: var(--omf-gradients-primary);
    --omf-shadow: var(--omf-shadows-sm);
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    font-size: 16px;
    scroll-behavior: smooth;
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  @media (prefers-reduced-motion: reduce) {
    html {
      scroll-behavior: auto;
    }
    *,
    *::before,
    *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }

  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    font-size: var(--omf-typography-fontSize-base);
    line-height: var(--omf-typography-lineHeight-normal);
    font-weight: var(--omf-typography-fontWeight-normal);
    color: var(--omf-colors-text-primary);
    background-color: var(--omf-colors-background-primary);
    transition: background-color var(--omf-transitions-DEFAULT), color var(--omf-transitions-DEFAULT);
  }

  #__next {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  a {
    color: var(--omf-colors-text-link);
    text-decoration: none;
    transition: color var(--omf-transitions-fast);
  }

  a:hover {
    color: var(--omf-colors-text-linkHover);
  }

  a:focus-visible,
  button:focus-visible,
  input:focus-visible,
  select:focus-visible,
  textarea:focus-visible,
  [tabindex]:focus-visible {
    outline: 3px solid var(--omf-colors-border-focus);
    outline-offset: 2px;
  }

  ::selection {
    background-color: var(--omf-colors-primary-200);
    color: var(--omf-colors-primary-900);
  }

  [data-theme="dark"] ::selection {
    background-color: var(--omf-colors-primary-800);
    color: var(--omf-colors-primary-50);
  }

  img {
    max-width: 100%;
    height: auto;
    display: block;
  }

  button {
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
    cursor: pointer;
    border: none;
    background: none;
  }

  input,
  select,
  textarea {
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
    color: inherit;
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: var(--omf-typography-fontWeight-extrabold);
    line-height: var(--omf-typography-lineHeight-tight);
    color: var(--omf-colors-text-primary);
  }

  h1 { font-size: var(--omf-typography-fontSize-5xl); letter-spacing: var(--omf-typography-letterSpacing-tighter); }
  h2 { font-size: var(--omf-typography-fontSize-4xl); letter-spacing: var(--omf-typography-letterSpacing-tight); }
  h3 { font-size: var(--omf-typography-fontSize-3xl); letter-spacing: var(--omf-typography-letterSpacing-tight); }
  h4 { font-size: var(--omf-typography-fontSize-2xl); letter-spacing: var(--omf-typography-letterSpacing-normal); }
  h5 { font-size: var(--omf-typography-fontSize-xl); letter-spacing: var(--omf-typography-letterSpacing-normal); }
  h6 { font-size: var(--omf-typography-fontSize-lg); letter-spacing: var(--omf-typography-letterSpacing-normal); }

  p {
    margin-bottom: var(--omf-spacing-4);
    color: var(--omf-colors-text-secondary);
  }

  ul, ol {
    padding-left: var(--omf-spacing-6);
    color: var(--omf-colors-text-secondary);
  }

  li {
    margin-bottom: var(--omf-spacing-2);
  }

  code {
    font-family: var(--omf-typography-fontFamily-mono);
    font-size: 0.9em;
    background-color: var(--omf-colors-background-tertiary);
    padding: 0.125rem 0.375rem;
    border-radius: var(--omf-borderRadius-sm);
  }

  pre {
    font-family: var(--omf-typography-fontFamily-mono);
    font-size: 0.875rem;
    line-height: 1.7;
    background-color: var(--omf-colors-background-inverse);
    color: var(--omf-colors-text-inverse);
    padding: var(--omf-spacing-4);
    border-radius: var(--omf-borderRadius-lg);
    overflow-x: auto;
    margin-bottom: var(--omf-spacing-4);
  }

  pre code {
    background: none;
    padding: 0;
    font-size: inherit;
    color: inherit;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: var(--omf-spacing-6);
  }

  th, td {
    text-align: left;
    padding: var(--omf-spacing-3) var(--omf-spacing-4);
    border-bottom: 1px solid var(--omf-colors-border-muted);
  }

  th {
    font-weight: var(--omf-typography-fontWeight-semibold);
    font-size: var(--omf-typography-fontSize-sm);
    text-transform: uppercase;
    letter-spacing: var(--omf-typography-letterSpacing-wide);
    color: var(--omf-colors-text-muted);
    background-color: var(--omf-colors-background-secondary);
  }

  tr:hover td {
    background-color: var(--omf-colors-background-tertiary);
  }

  hr {
    border: none;
    border-top: 1px solid var(--omf-colors-border-muted);
    margin: var(--omf-spacing-8) 0;
  }

  blockquote {
    border-left: 4px solid var(--omf-colors-primary-500);
    padding-left: var(--omf-spacing-4);
    margin: var(--omf-spacing-6) 0;
    font-style: italic;
    color: var(--omf-colors-text-secondary);
  }

  ::placeholder {
    color: var(--omf-colors-text-muted);
    opacity: 1;
  }

  :-ms-input-placeholder {
    color: var(--omf-colors-text-muted);
  }

  ::-ms-input-placeholder {
    color: var(--omf-colors-text-muted);
  }

  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  .skip-link {
    position: absolute;
    top: -100%;
    left: 50%;
    transform: translateX(-50%);
    padding: var(--omf-spacing-3) var(--omf-spacing-4);
    background: var(--omf-colors-primary-600);
    color: white;
    border-radius: var(--omf-borderRadius-md);
    z-index: var(--omf-zIndex-tooltip);
    transition: top var(--omf-transitions-fast);
  }

  .skip-link:focus {
    top: var(--omf-spacing-4);
  }

  .ant-spin-nested-loading > div > .ant-spin {
    max-height: none;
  }

  .ant-menu-inline .ant-menu-item::after { border-right-color: var(--omf-colors-primary-600); }
  .ant-modal-content,
  .ant-modal-header {
    border-radius: var(--omf-borderRadius-xl) !important;
  }

  .ant-modal-header {
    border-bottom-color: var(--omf-colors-border-muted) !important;
  }

  .ant-alert {
    border-radius: var(--omf-borderRadius-lg) !important;
  }

  .ant-tooltip-inner {
    border-radius: var(--omf-borderRadius-md) !important;
    padding: var(--omf-spacing-2) var(--omf-spacing-3) !important;
    font-size: var(--omf-typography-fontSize-sm) !important;
  }

  .ant-popover {
    border-radius: var(--omf-borderRadius-xl) !important;
    box-shadow: var(--omf-shadows-lg) !important;
  }

  .ant-dropdown-menu {
    border-radius: var(--omf-borderRadius-lg) !important;
    border: 1px solid var(--omf-colors-border) !important;
    box-shadow: var(--omf-shadows-lg) !important;
    padding: var(--omf-spacing-2) !important;
  }

  .ant-dropdown-menu-item {
    border-radius: var(--omf-borderRadius-md) !important;
    padding: var(--omf-spacing-2) var(--omf-spacing-3) !important;
    font-size: var(--omf-typography-fontSize-sm) !important;
    font-weight: 500 !important;
    color: var(--omf-colors-text-primary) !important;
    transition: background-color var(--omf-transitions-fast), color var(--omf-transitions-fast) !important;
  }

  .ant-dropdown-menu-item:hover,
  .ant-dropdown-menu-item-selected {
    background-color: var(--omf-colors-primary-50) !important;
    color: var(--omf-colors-primary-700) !important;
  }

  [data-theme="dark"] .ant-dropdown-menu-item:hover,
  [data-theme="dark"] .ant-dropdown-menu-item-selected {
    background-color: var(--omf-colors-primary-900) !important;
    color: var(--omf-colors-primary-300) !important;
  }

  .ant-dropdown-menu-divider {
    margin: var(--omf-spacing-2) 0 !important;
    border-color: var(--omf-colors-border-muted) !important;
  }

  .ant-select-selector {
    border-radius: var(--omf-borderRadius-md) !important;
    border: 1px solid var(--omf-colors-border) !important;
    background: var(--omf-colors-background-primary) !important;
    transition: border-color var(--omf-transitions-fast), box-shadow var(--omf-transitions-fast) !important;
  }

  .ant-select-selector:hover {
    border-color: var(--omf-colors-primary-400) !important;
  }

  .ant-select-focused .ant-select-selector {
    border-color: var(--omf-colors-border-focus) !important;
    box-shadow: var(--omf-shadows-focus) !important;
  }

  .ant-input,
  .ant-input-affix-wrapper {
    border-radius: var(--omf-borderRadius-md) !important;
    border: 1px solid var(--omf-colors-border) !important;
    background: var(--omf-colors-background-primary) !important;
    transition: border-color var(--omf-transitions-fast), box-shadow var(--omf-transitions-fast) !important;
  }

  .ant-input-affix-wrapper > input.ant-input { border: 0 !important; box-shadow: none !important; border-radius: 0 !important; background: transparent !important; }
  .ant-input:hover,
  .ant-input-affix-wrapper:hover {
    border-color: var(--omf-colors-primary-400) !important;
  }

  .ant-input:focus,
  .ant-input-focused,
  .ant-input-affix-wrapper-focused {
    border-color: var(--omf-colors-border-focus) !important;
    box-shadow: var(--omf-shadows-focus) !important;
  }

  .ant-input[disabled],
  .ant-input-disabled,
  .ant-input-affix-wrapper-disabled {
    background-color: var(--omf-colors-background-tertiary) !important;
    color: var(--omf-colors-text-muted) !important;
  }

  .ant-btn {
    border-radius: var(--omf-borderRadius-md) !important;
    font-weight: var(--omf-typography-fontWeight-semibold) !important;
    transition: all var(--omf-transitions-fast) !important;
    box-shadow: none !important;
  }

  .ant-btn-primary {
    background: var(--omf-gradients-primary) !important;
    border: none !important;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08) !important;
  }

  .ant-btn-primary:hover:not(:disabled) {
    filter: brightness(1.05) !important;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.12) !important;
    transform: translateY(-1px) !important;
  }

  .ant-btn-primary:active:not(:disabled) {
    transform: translateY(0) !important;
  }

  .ant-btn-primary[disabled] {
    background: var(--omf-colors-background-tertiary) !important;
    color: var(--omf-colors-text-muted) !important;
    box-shadow: none !important;
  }

  .ant-btn-default:not(:disabled):hover {
    background-color: var(--omf-colors-background-tertiary) !important;
    border-color: var(--omf-colors-border-strong) !important;
    color: var(--omf-colors-text-primary) !important;
  }

  .ant-btn-text:hover {
    background-color: var(--omf-colors-primary-50) !important;
    color: var(--omf-colors-primary-700) !important;
  }

  [data-theme="dark"] .ant-btn-text:hover {
    background-color: var(--omf-colors-primary-900) !important;
    color: var(--omf-colors-primary-300) !important;
  }

  .ant-card {
    border-radius: var(--omf-borderRadius-xl) !important;
    border: 1px solid var(--omf-colors-border) !important;
    box-shadow: var(--omf-shadows-sm) !important;
    background: var(--omf-colors-background-primary) !important;
    transition: box-shadow var(--omf-transitions-DEFAULT), border-color var(--omf-transitions-DEFAULT), transform var(--omf-transitions-DEFAULT) !important;
  }

  .ant-card:hover {
    box-shadow: var(--omf-shadows-DEFAULT) !important;
  }

  .ant-table-thead > tr > th {
    background: var(--omf-colors-background-secondary) !important;
    color: var(--omf-colors-text-muted) !important;
    font-weight: var(--omf-typography-fontWeight-semibold) !important;
    text-transform: uppercase !important;
    font-size: var(--omf-typography-fontSize-xs) !important;
    letter-spacing: var(--omf-typography-letterSpacing-wide) !important;
    border-bottom: 1px solid var(--omf-colors-border-muted) !important;
    padding: var(--omf-spacing-3) var(--omf-spacing-4) !important;
  }

  .ant-table-tbody > tr > td {
    border-bottom: 1px solid var(--omf-colors-border-muted) !important;
    padding: var(--omf-spacing-3) var(--omf-spacing-4) !important;
    transition: background-color var(--omf-transitions-fast) !important;
  }

  .ant-table-tbody > tr:hover > td {
    background: var(--omf-colors-background-tertiary) !important;
  }

  .ant-tag {
    border-radius: var(--omf-borderRadius-sm) !important;
    padding: 2px var(--omf-spacing-2) !important;
    font-weight: 500 !important;
  }

  .ant-collapse {
    border-radius: var(--omf-borderRadius-lg) !important;
    border-color: var(--omf-colors-border) !important;
    background: var(--omf-colors-background-primary) !important;
  }

  .ant-collapse-header {
    border-radius: var(--omf-borderRadius-md) !important;
  }

  .ant-collapse-content {
    border-radius: var(--omf-borderRadius-md) !important;
  }

  .ant-tabs-nav {
    margin-bottom: var(--omf-spacing-6) !important;
  }

  .ant-tabs-tab {
    padding: var(--omf-spacing-4) var(--omf-spacing-1) !important;
    font-weight: var(--omf-typography-fontWeight-semibold) !important;
    font-size: var(--omf-typography-fontSize-sm) !important;
  }

  .ant-tabs-tab-active .ant-tabs-tab-btn {
    color: var(--omf-colors-primary-600) !important;
  }

  [data-theme="dark"] .ant-tabs-tab-active .ant-tabs-tab-btn {
    color: var(--omf-colors-primary-400) !important;
  }

  .ant-tabs-ink-bar {
    background: var(--omf-colors-primary-600) !important;
  }

  .ant-pagination-item {
    border-radius: var(--omf-borderRadius-md) !important;
    margin: 0 var(--omf-spacing-1) !important;
    border: 1px solid var(--omf-colors-border) !important;
  }

  .ant-pagination-item a {
    color: var(--omf-colors-text-secondary) !important;
    font-weight: 500 !important;
  }

  .ant-pagination-item-active {
    background: var(--omf-colors-primary-600) !important;
    border-color: var(--omf-colors-primary-600) !important;
  }

  .ant-pagination-item-active a {
    color: white !important;
  }

  .ant-pagination-item:hover {
    border-color: var(--omf-colors-primary-400) !important;
  }

  .ant-pagination-item:hover a {
    color: var(--omf-colors-primary-600) !important;
  }

  .ant-switch {
    min-width: 44px !important;
    height: 24px !important;
    border-radius: var(--omf-borderRadius-full) !important;
  }

  .ant-switch-checked {
    background-color: var(--omf-colors-primary-600) !important;
  }

  .ant-switch-inner {
    border-radius: var(--omf-borderRadius-full) !important;
  }

  .ant-form-item-label > label {
    font-weight: var(--omf-typography-fontWeight-semibold) !important;
    color: var(--omf-colors-text-primary) !important;
    font-size: var(--omf-typography-fontSize-sm) !important;
  }

  .ant-form-item-explain-error {
    color: var(--omf-colors-semantic-error-DEFAULT) !important;
    font-size: var(--omf-typography-fontSize-sm) !important;
    margin-top: var(--omf-spacing-1) !important;
  }

  .ant-empty {
    padding: var(--omf-spacing-16) var(--omf-spacing-4) !important;
  }

  .ant-empty-image {
    margin-bottom: var(--omf-spacing-6) !important;
  }

  .ant-empty-description {
    color: var(--omf-colors-text-muted) !important;
    font-size: var(--omf-typography-fontSize-base) !important;
  }

  .ant-skeleton {
    background-color: var(--omf-colors-background-tertiary) !important;
  }

  .ant-skeleton-content {
    background-color: var(--omf-colors-border-muted) !important;
  }

  @keyframes shimmer {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }

  .ant-skeleton-element {
    background: linear-gradient(
      90deg,
      var(--omf-colors-background-tertiary) 25%,
      var(--omf-colors-border-muted) 50%,
      var(--omf-colors-background-tertiary) 75%
    ) !important;
    background-size: 200% 100% !important;
    animation: shimmer 1.5s infinite !important;
  }

  .ant-modal-mask {
    background: rgba(15, 23, 42, 0.5) !important;
    backdrop-filter: blur(2px) !important;
  }
`
