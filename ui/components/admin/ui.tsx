import styled, { css } from 'styled-components'
import { Layout } from 'antd'

const { Sider } = Layout

export const AdminCard = styled.div<{
  $variant?: 'default' | 'elevated' | 'outlined' | 'filled'
  $padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
  $hover?: boolean
  $interactive?: boolean
}>`
  background: var(--omf-color-surface);
  border-radius: var(--omf-radius-xl);
  transition: var(--omf-transition);

  ${({ $variant = 'default' }) => {
    switch ($variant) {
      case 'elevated':
        return css`
          box-shadow: var(--omf-shadow);
          border: none;
        `
      case 'outlined':
        return css`
          box-shadow: var(--omf-shadow-sm);
          border: 1px solid var(--omf-color-border);
        `
      case 'filled':
        return css`
          box-shadow: var(--omf-shadow-sm);
          border: 1px solid var(--omf-color-border-muted);
          background: var(--omf-color-surface-secondary);
        `
      default:
        return css`
          box-shadow: var(--omf-shadow-sm);
          border: 1px solid var(--omf-color-border);
        `
    }
  }}

  ${({ $padding = 'md' }) => {
    const paddings = {
      none: '0',
      sm: '16px',
      md: '24px',
      lg: '32px',
      xl: '40px',
    }
    return css`
      padding: ${paddings[$padding]};
    `
  }}

  ${({ $hover, $interactive, $variant }) =>
    ($hover || $interactive) &&
    css`
      cursor: ${$interactive ? 'pointer' : 'default'};

      &:hover {
        transform: translateY(-2px);
        box-shadow: var(--omf-shadow-md);
        border-color: ${$variant === 'outlined' ? 'var(--omf-color-primary-500)' : 'transparent'};
      }
    `}

  ${({ $interactive }) =>
    $interactive &&
    css`
      &:active {
        transform: translateY(0);
        transition: var(--omf-transition-fast);
      }
    `}
`

export const AdminCardHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 20px;
  flex-wrap: wrap;
`

export const AdminCardTitle = styled.h3<{ $withIcon?: boolean }>`
  margin: 0;
  font-size: 18px;
  font-weight: 700;
  color: var(--omf-color-text-primary);
  line-height: 1.3;
  display: flex;
  align-items: center;
  gap: 10px;

  ${({ $withIcon }) =>
    $withIcon &&
    css`
      &::before {
        content: '';
        width: 8px;
        height: 8px;
        border-radius: 2px;
        background: var(--omf-color-primary-600);
      }
    `}
`

export const AdminCardSubtitle = styled.p`
  margin: 4px 0 0;
  font-size: 13px;
  color: var(--omf-color-text-muted);
  line-height: 1.5;
`

export const AdminCardContent = styled.div`
  /* Content wrapper */
`

export const AdminCardFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 20px;
  padding-top: 16px;
  border-top: 1px solid var(--omf-color-border-muted);
`

export const AdminSection = styled.section`
  margin-bottom: 32px;

  &:last-child {
    margin-bottom: 0;
  }
`

export const AdminSectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 20px;
  flex-wrap: wrap;
`

export const AdminSectionTitle = styled.h2`
  margin: 0;
  font-size: 20px;
  font-weight: 700;
  color: var(--omf-color-text-primary);
  line-height: 1.3;
`

export const AdminSectionDescription = styled.p`
  margin: 6px 0 0;
  font-size: 14px;
  color: var(--omf-color-text-secondary);
  line-height: 1.5;
`

export const AdminGrid = styled.div<{
  $columns?: 1 | 2 | 3 | 4 | 'auto'
  $gap?: 'sm' | 'md' | 'lg' | 'xl'
  $responsive?: boolean
}>`
  display: grid;
  gap: ${({ $gap = 'md' }) => {
    const gaps = { sm: '12px', md: '20px', lg: '28px', xl: '36px' }
    return gaps[$gap]
  }};

  ${({ $columns = 3, $responsive = true }) => {
    if ($columns === 'auto') {
      return `
        grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      `
    }
    return `
      grid-template-columns: repeat(${typeof $columns === 'number' ? $columns : 3}, 1fr);

      ${
        $responsive &&
        `
        @media (max-width: 1023px) {
          grid-template-columns: repeat(2, 1fr);
        }
        @media (max-width: 639px) {
          grid-template-columns: 1fr;
        }
      `
      }
    `
  }}
`

export const AdminFlex = styled.div<{
  $direction?: 'row' | 'column'
  $align?: 'start' | 'center' | 'end' | 'stretch'
  $justify?: 'start' | 'center' | 'end' | 'between' | 'around'
  $gap?: 'sm' | 'md' | 'lg' | 'xl'
  $wrap?: boolean
}>`
  display: flex;
  flex-direction: ${({ $direction = 'row' }) => $direction};
  align-items: ${({ $align = 'stretch' }) => $align};
  justify-content: ${({ $justify = 'start' }) =>
    ({
      between: 'space-between',
      around: 'space-around',
      start: 'flex-start',
      end: 'flex-end',
      center: 'center',
    }[$justify])};
  gap: ${({ $gap = 'md' }) => {
    const gaps = { sm: '8px', md: '16px', lg: '24px', xl: '32px' }
    return gaps[$gap]
  }};
  flex-wrap: ${({ $wrap }) => ($wrap ? 'wrap' : 'nowrap')};
`

export const AdminBadge = styled.span<{
  $variant?: 'default' | 'success' | 'warning' | 'error' | 'info' | 'draft' | 'primary'
  $size?: 'sm' | 'md' | 'lg'
  $dot?: boolean
}>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-weight: 600;
  border-radius: var(--omf-radius-full);
  white-space: nowrap;

  ${({ $size = 'md' }) => {
    const sizes = {
      sm: css`
        padding: 2px 8px;
        font-size: 11px;
        height: 22px;
      `,
      md: css`
        padding: 4px 10px;
        font-size: 12px;
        height: 26px;
      `,
      lg: css`
        padding: 6px 14px;
        font-size: 13px;
        height: 32px;
      `,
    }
    return sizes[$size]
  }}

  ${({ $variant = 'default', $dot }) => {
    const variants = {
      default: css`
        background: var(--omf-color-surface-tertiary);
        color: var(--omf-color-text-secondary);
        border: 1px solid var(--omf-color-border);
      `,
      primary: css`
        background: var(--omf-color-primary-50);
        color: var(--omf-color-primary-700);
        border: 1px solid var(--omf-color-primary-200);
      `,
      success: css`
        background: #ecfdf5;
        color: #065f46;
        border: 1px solid #a7f3d0;
      `,
      warning: css`
        background: #fffbeb;
        color: #92400e;
        border: 1px solid #fde68a;
      `,
      error: css`
        background: #fef2f2;
        color: #991b1b;
        border: 1px solid #fecaca;
      `,
      info: css`
        background: #eff6ff;
        color: #1e40af;
        border: 1px solid #bfdbfe;
      `,
      draft: css`
        background: #f1f5f9;
        color: #64748b;
        border: 1px solid #e2e8f0;
      `,
    }

    const baseStyle = variants[$variant]

    if ($dot) {
      return css`
        ${baseStyle}
        &::before {
          content: '';
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: currentColor;
          flex-shrink: 0;
        }
      `
    }

    return baseStyle
  }}
`

export const AdminAvatar = styled.div<{
  $size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  $src?: string
  $name?: string
}>`
  width: ${({ $size = 'md' }) => {
    const sizes = { xs: '28px', sm: '36px', md: '44px', lg: '56px', xl: '72px' }
    return sizes[$size]
  }};
  height: ${({ $size = 'md' }) => {
    const sizes = { xs: '28px', sm: '36px', md: '44px', lg: '56px', xl: '72px' }
    return sizes[$size]
  }};
  border-radius: var(--omf-radius-full);
  background: ${({ $src }) => ($src ? 'transparent' : 'var(--omf-color-primary-100)')};
  color: ${({ $src }) => ($src ? 'transparent' : 'var(--omf-color-primary-700)')};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: ${({ $size = 'md' }) => {
    const sizes = { xs: '11px', sm: '13px', md: '16px', lg: '20px', xl: '26px' }
    return sizes[$size]
  }};
  overflow: hidden;
  flex-shrink: 0;
  border: 2px solid var(--omf-color-surface);

  ${({ $src }) =>
    $src &&
    css`
      background-image: url(${$src});
      background-size: cover;
      background-position: center;
    `}

  ${({ $name, $src }) =>
    !$src &&
    $name &&
    css`
      &::before {
        content: '${$name.trim().charAt(0).toUpperCase()}';
      }
    `}
`

export const AdminIconWrapper = styled.div<{
  $size?: 'sm' | 'md' | 'lg' | 'xl'
  $variant?: 'primary' | 'success' | 'warning' | 'error' | 'info' | 'purple' | 'default'
}>`
  width: ${({ $size = 'md' }) => {
    const sizes = { sm: '32px', md: '40px', lg: '48px', xl: '56px' }
    return sizes[$size]
  }};
  height: ${({ $size = 'md' }) => {
    const sizes = { sm: '32px', md: '40px', lg: '48px', xl: '56px' }
    return sizes[$size]
  }};
  border-radius: ${({ $size = 'md' }) => {
    const radii = {
      sm: 'var(--omf-radius-sm)',
      md: 'var(--omf-radius-md)',
      lg: 'var(--omf-radius-lg)',
      xl: 'var(--omf-radius-xl)',
    }
    return radii[$size]
  }};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: white;

  ${({ $variant = 'primary' }) => {
    const variants = {
      primary:
        'linear-gradient(135deg, var(--omf-color-primary-600) 0%, var(--omf-color-primary-700) 100%)',
      success: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
      warning: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
      error: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
      info: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
      purple: 'linear-gradient(135deg, #a855f7 0%, #9333ea 100%)',
      default: 'linear-gradient(135deg, #64748b 0%, #475569 100%)',
    }
    return css`
      background: ${variants[$variant]};
      box-shadow: 0 4px 12px
        ${variants[$variant].includes('primary')
          ? 'rgba(16, 185, 129, 0.35)'
          : variants[$variant].includes('success')
          ? 'rgba(16, 185, 129, 0.35)'
          : variants[$variant].includes('warning')
          ? 'rgba(245, 158, 11, 0.35)'
          : variants[$variant].includes('error')
          ? 'rgba(239, 68, 68, 0.35)'
          : variants[$variant].includes('info')
          ? 'rgba(59, 130, 246, 0.35)'
          : variants[$variant].includes('purple')
          ? 'rgba(168, 85, 247, 0.35)'
          : 'rgba(100, 116, 139, 0.35)'};
    `
  }}
`

export const AdminDivider = styled.hr<{ $vertical?: boolean; $dashed?: boolean }>`
  margin: 0;
  border: none;

  ${({ $vertical, $dashed }) =>
    $vertical
      ? css`
          width: 1px;
          height: 100%;
          background: var(--omf-color-border);
        `
      : css`
          height: 1px;
          background: ${$dashed ? 'var(--omf-color-border-muted)' : 'var(--omf-color-border)'};
          border-style: ${$dashed ? 'dashed' : 'solid'};
        `}
`

export const AdminTooltip = styled.div`
  position: relative;
  display: inline-flex;

  &[data-tooltip]::before {
    content: attr(data-tooltip);
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%) translateY(-8px);
    padding: 6px 10px;
    font-size: 12px;
    font-weight: 500;
    color: var(--omf-color-text-inverse);
    background: var(--omf-color-text-primary);
    border-radius: var(--omf-radius-md);
    white-space: nowrap;
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
    transition: var(--omf-transition-fast);
    z-index: var(--omf-zIndex-tooltip);
    box-shadow: var(--omf-shadow-lg);
  }

  &[data-tooltip]::after {
    content: '';
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%) translateY(-2px);
    border: 5px solid transparent;
    border-top-color: var(--omf-color-text-primary);
    opacity: 0;
    visibility: hidden;
    transition: var(--omf-transition-fast);
  }

  &:hover[data-tooltip]::before,
  &:hover[data-tooltip]::after {
    opacity: 1;
    visibility: visible;
    transform: translateX(-50%) translateY(-4px);
  }
`

export const AdminScrollArea = styled.div<{ $horizontal?: boolean }>`
  overflow: ${({ $horizontal }) => ($horizontal ? 'auto' : 'auto')};
  -webkit-overflow-scrolling: touch;
  scrollbar-width: thin;
  scrollbar-color: var(--omf-color-border) transparent;

  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: var(--omf-color-border);
    border-radius: var(--omf-radius-full);
    border: 2px solid transparent;
    background-clip: padding-box;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: var(--omf-color-text-muted);
  }

  &::-webkit-scrollbar-corner {
    background: transparent;
  }
`

export const AdminEmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 64px 24px;
  text-align: center;
  color: var(--omf-color-text-secondary);
`

export const AdminEmptyIcon = styled.div<{ $variant?: 'primary' | 'warning' | 'error' | 'info' }>`
  width: 80px;
  height: 80px;
  border-radius: var(--omf-radius-2xl);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 36px;
  margin-bottom: 20px;
  color: var(--omf-color-primary-600);

  ${({ $variant = 'primary' }) => {
    const variants = {
      primary: 'background: var(--omf-color-primary-50);',
      warning: 'background: #fffbeb; color: #f59e0b;',
      error: 'background: #fef2f2; color: #ef4444;',
      info: 'background: #eff6ff; color: #3b82f6;',
    }
    return variants[$variant]
  }}
`

export const AdminEmptyTitle = styled.h3`
  margin: 0 0 8px;
  font-size: 18px;
  font-weight: 700;
  color: var(--omf-color-text-primary);
`

export const AdminEmptyDescription = styled.p`
  margin: 0 0 24px;
  font-size: 14px;
  color: var(--omf-color-text-muted);
  max-width: 320px;
  line-height: 1.6;
`

export const AdminLoadingSkeleton = styled.div<{
  $width?: string
  $height?: string
  $radius?: string
}>`
  width: ${({ $width = '100%' }) => $width};
  height: ${({ $height = '16px' }) => $height};
  border-radius: ${({ $radius = 'var(--omf-radius-md)' }) => $radius};
  background: linear-gradient(
    90deg,
    var(--omf-color-surface-tertiary) 25%,
    var(--omf-color-border-muted) 50%,
    var(--omf-color-surface-tertiary) 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;

  @keyframes shimmer {
    0% {
      background-position: 200% 0;
    }
    100% {
      background-position: -200% 0;
    }
  }
`

export const AdminPageHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 24px;
  margin-bottom: 32px;
  flex-wrap: wrap;
`

export const AdminPageHeaderContent = styled.div`
  flex: 1;
  min-width: 0;
`

export const AdminPageHeaderTitle = styled.h1`
  margin: 0 0 4px;
  font-size: 28px;
  font-weight: 800;
  color: var(--omf-color-text-primary);
  letter-spacing: -0.02em;
  line-height: 1.2;
`

export const AdminPageHeaderSubtitle = styled.p`
  margin: 0;
  font-size: 15px;
  color: var(--omf-color-text-secondary);
  line-height: 1.5;
`

export const AdminPageHeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;
  flex-wrap: wrap;
`

export const AdminRoot = styled.div<{ sidebarOpen: boolean }>`
  display: flex;
  flex-direction: column;
  height: 100vh;
  height: calc(var(--vh, 1vh) * 100);
  background: var(--omf-color-surface-secondary);
  position: relative;
  transition: var(--omf-transition);

  @media (min-width: 768px) {
    display: grid;
    grid-template-columns: 224px minmax(0, 1fr);
    grid-template-rows: 64px minmax(0, 1fr);
  }
`

export const AdminHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
  padding: 0 24px;
  background: var(--omf-color-surface);
  color: var(--omf-color-text-primary);
  border-bottom: 1px solid var(--omf-color-border);
  position: sticky;
  top: 0;
  z-index: 40;
  flex-shrink: 0;

  @media (min-width: 768px) {
    grid-column: 1 / -1;
    height: 64px;
  }
`

export const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
`

export const SidebarToggle = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border: none;
  border-radius: var(--omf-radius-md);
  background: var(--omf-color-surface-secondary);
  color: var(--omf-color-text-secondary);
  cursor: pointer;
  transition: var(--omf-transition);

  &:hover {
    background: var(--omf-color-border-muted);
    color: var(--omf-color-primary-600);
  }

  @media (min-width: 768px) {
    display: none;
  }
`

export const Brand = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`

export const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`

export const AdminSider = styled(Sider)<{ $sidebarOpen?: boolean }>`
  background: var(--omf-color-surface) !important;
  border-right: 1px solid var(--omf-color-border);
  box-shadow: none;
  flex-shrink: 0;
  width: 224px !important;
  min-width: 224px !important;
  max-width: 224px !important;
  overflow-y: auto;

  .ant-layout-sider-children {
    display: flex;
    flex-direction: column;
    height: 100%;
    padding-top: 8px;

    .language-selector {
      padding-left: 12px !important;
      margin-top: auto;
      padding-bottom: 24px;
    }
  }

  .ant-menu {
    background: transparent !important;
    border-right: none !important;
  }

  .ant-menu-item,
  .ant-menu-sub-title {
    border-radius: var(--omf-radius-md) !important;
    margin: 0 10px 6px !important;
    width: calc(100% - 20px);
    color: var(--omf-color-text-secondary) !important;
    font-weight: 600 !important;
    font-size: 13px !important;
    transition: var(--omf-transition);
  }

  .ant-menu-item-selected,
  .ant-menu-item:hover,
  .ant-menu-sub-title:hover,
  .ant-menu-sub-selected {
    background: var(--omf-color-primary-50) !important;
    color: var(--omf-color-primary-700) !important;
  }

  .ant-menu-item-selected {
    border-left: none !important;
    box-shadow: none;
  }

  .ant-menu-sub-title {
    color: var(--omf-color-text-muted) !important;
    text-transform: uppercase;
    font-size: 11px !important;
    font-weight: 800 !important;
    letter-spacing: 0.12em !important;
    padding: 12px 24px !important;
    margin: 0 10px 10px !important;
  }

  @media (max-width: 767px) {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    width: 280px;
    z-index: 50;
    transform: translateX(${(props) => (props.$sidebarOpen ? '0' : '-100%')});
    transition: transform 0.25s ease;
    box-shadow: 6px 0 24px rgba(15, 23, 42, 0.12);
  }
`

export const SiderSpacer = styled.div`
  flex: 1;
`

export const MobileBackdrop = styled.div<{ visible: boolean }>`
  display: block;
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.4);
  z-index: 45;
  backdrop-filter: blur(2px);
  opacity: ${(props) => (props.visible ? 1 : 0)};
  pointer-events: ${(props) => (props.visible ? 'auto' : 'none')};
  transition: opacity 0.25s ease;

  @media (min-width: 768px) {
    display: none !important;
  }
`

export const AdminContent = styled.main<{ padded?: boolean }>`
  flex: 1;
  padding: 28px 32px;
  overflow-y: auto;
  min-width: 0;
  min-height: 0;
  background: var(--omf-color-surface-secondary);

  @media (max-width: 767px) {
    padding: 16px;
  }
`

export const PageWrapper = styled.div`
  max-width: 1240px;
  margin: 0 auto;
`

export const BrandText = styled.div`
  font-size: 18px;
  font-weight: 700;
  color: var(--omf-color-text-primary);
  letter-spacing: -0.02em;
  background: var(--omf-gradient-text);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`

export {
  AdminCard as Card,
  AdminCardHeader as CardHeader,
  AdminCardTitle as CardTitle,
  AdminCardSubtitle as CardSubtitle,
  AdminCardContent as CardContent,
  AdminCardFooter as CardFooter,
  AdminSection as Section,
  AdminSectionHeader as SectionHeader,
  AdminSectionTitle as SectionTitle,
  AdminSectionDescription as SectionDescription,
  AdminGrid as Grid,
  AdminFlex as Flex,
  AdminBadge as Badge,
  AdminAvatar as Avatar,
  AdminIconWrapper as IconWrapper,
  AdminDivider as Divider,
  AdminTooltip as Tooltip,
  AdminScrollArea as ScrollArea,
  AdminEmptyState as EmptyState,
  AdminEmptyIcon as EmptyIcon,
  AdminEmptyTitle as EmptyTitle,
  AdminEmptyDescription as EmptyDescription,
  AdminLoadingSkeleton as LoadingSkeleton,
  AdminPageHeader as PageHeader,
  AdminPageHeaderContent as PageHeaderContent,
  AdminPageHeaderTitle as PageHeaderTitle,
  AdminPageHeaderSubtitle as PageHeaderSubtitle,
  AdminPageHeaderActions as PageHeaderActions,
}

export default {
  Card: AdminCard,
  CardHeader: AdminCardHeader,
  CardTitle: AdminCardTitle,
  CardSubtitle: AdminCardSubtitle,
  CardContent: AdminCardContent,
  CardFooter: AdminCardFooter,
  Section: AdminSection,
  SectionHeader: AdminSectionHeader,
  SectionTitle: AdminSectionTitle,
  SectionDescription: AdminSectionDescription,
  Grid: AdminGrid,
  Flex: AdminFlex,
  Badge: AdminBadge,
  Avatar: AdminAvatar,
  IconWrapper: AdminIconWrapper,
  Divider: AdminDivider,
  Tooltip: AdminTooltip,
  ScrollArea: AdminScrollArea,
  EmptyState: AdminEmptyState,
  EmptyIcon: AdminEmptyIcon,
  EmptyTitle: AdminEmptyTitle,
  EmptyDescription: AdminEmptyDescription,
  LoadingSkeleton: AdminLoadingSkeleton,
  PageHeader: AdminPageHeader,
  PageHeaderContent: AdminPageHeaderContent,
  PageHeaderTitle: AdminPageHeaderTitle,
  PageHeaderSubtitle: AdminPageHeaderSubtitle,
  PageHeaderActions: AdminPageHeaderActions,
}
