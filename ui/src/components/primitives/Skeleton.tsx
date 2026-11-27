import React from 'react';
import styled, { keyframes } from 'styled-components';

export interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  borderRadius?: string;
  variant?: 'text' | 'circular' | 'rectangular';
  lines?: number;
  animated?: boolean;
}

const shimmer = keyframes`
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
`;

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
`;

const SkeletonWrapper = styled.div<{ $animated: boolean; $borderRadius?: string; $width?: string | number; $height?: string | number }>`
  background: linear-gradient(
    90deg,
    var(--omf-colors-background-tertiary) 25%,
    var(--omf-colors-border-muted) 50%,
    var(--omf-colors-background-tertiary) 75%
  );
  background-size: 200% 100%;
  border-radius: ${({ $borderRadius }) => $borderRadius || 'var(--omf-borderRadius-md)'};
  width: ${({ $width }) => (typeof $width === 'number' ? `${$width}px` : $width || '100%')};
  height: ${({ $height }) => (typeof $height === 'number' ? `${$height}px` : $height || '16px')};
  animation: ${({ $animated }) => ($animated ? shimmer : 'none')} 1.5s infinite ease-in-out;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    background: var(--omf-colors-border-muted);
  }
`;

const TextLine = styled.div<{ $width?: string | number }>`
  height: 1rem;
  border-radius: var(--omf-borderRadius-sm);
  background: linear-gradient(
    90deg,
    var(--omf-colors-background-tertiary) 25%,
    var(--omf-colors-border-muted) 50%,
    var(--omf-colors-background-tertiary) 75%
  );
  background-size: 200% 100%;
  width: ${({ $width }) => (typeof $width === 'number' ? `${$width}px` : $width || '100%')};
  margin-bottom: var(--omf-spacing-2);
  animation: ${shimmer} 1.5s infinite ease-in-out;

  &:last-child {
    margin-bottom: 0;
    width: ${({ $width }) => (typeof $width === 'number' ? `${$width * 0.6}px` : '60%')};
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    background: var(--omf-colors-border-muted);
  }
`;

const CircularSkeleton = styled.div<{ $size?: string | number; $animated?: boolean }>`
  width: ${({ $size }) => (typeof $size === 'number' ? `${$size}px` : $size || '40px')};
  height: ${({ $size }) => (typeof $size === 'number' ? `${$size}px` : $size || '40px')};
  border-radius: var(--omf-borderRadius-full);
  background: linear-gradient(
    90deg,
    var(--omf-colors-background-tertiary) 25%,
    var(--omf-colors-border-muted) 50%,
    var(--omf-colors-background-tertiary) 75%
  );
  background-size: 200% 100%;
  animation: ${({ $animated }) => ($animated ? shimmer : 'none')} 1.5s infinite ease-in-out;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    background: var(--omf-colors-border-muted);
  }
`;

export function Skeleton({
  width = '100%',
  height = '16px',
  borderRadius,
  variant = 'text',
  lines = 3,
  animated = true,
}: SkeletonProps) {
  if (variant === 'circular') {
    return <CircularSkeleton $size={width} $animated={animated} />;
  }

  if (variant === 'rectangular') {
    return <SkeletonWrapper $width={width} $height={height} $borderRadius={borderRadius} $animated={animated} />;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--omf-spacing-2)' }}>
      {Array.from({ length: lines }).map((_, i) => (
        <TextLine key={i} $width={i === lines - 1 ? (typeof width === 'number' ? width * 0.6 : '60%') : width} />
      ))}
    </div>
  );
}

export interface SkeletonCardProps {
  variant?: 'default' | 'profile' | 'list' | 'table';
  count?: number;
}

const CardSkeletonWrapper = styled.div`
  background: var(--omf-colors-background-primary);
  border: 1px solid var(--omf-colors-border);
  border-radius: var(--omf-borderRadius-xl);
  padding: var(--omf-spacing-6);
`;

const CardSkeletonHeader = styled.div`
  display: flex;
  align-items: center;
  gap: var(--omf-spacing-4);
  margin-bottom: var(--omf-spacing-6);
`;

const CardSkeletonBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--omf-spacing-3);
`;

const CardSkeletonFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: var(--omf-spacing-2);
  margin-top: var(--omf-spacing-6);
  padding-top: var(--omf-spacing-4);
  border-top: 1px solid var(--omf-colors-border-muted);
`;

const ListItemSkeleton = styled.div`
  display: flex;
  align-items: center;
  gap: var(--omf-spacing-4);
  padding: var(--omf-spacing-3) 0;
  border-bottom: 1px solid var(--omf-colors-border-muted);

  &:last-child {
    border-bottom: none;
  }
`;

export function SkeletonCard({ variant = 'default', count = 3 }: SkeletonCardProps) {
  const items = Array.from({ length: count }, (_, i) => i);

  switch (variant) {
    case 'profile':
      return (
        <CardSkeletonWrapper>
          <CardSkeletonHeader>
            <CircularSkeleton $size={56} $animated={true} />
            <div style={{ flex: 1 }}>
              <SkeletonWrapper $width="60%" $height="24px" $borderRadius="var(--omf-borderRadius-sm)" $animated={true} />
              <SkeletonWrapper $width="40%" $height="16px" $borderRadius="var(--omf-borderRadius-sm)" $animated={true} style={{ marginTop: 'var(--omf-spacing-2)' }} />
            </div>
          </CardSkeletonHeader>
          <CardSkeletonBody>
            <SkeletonWrapper $width="100%" $height="16px" $animated={true} />
            <SkeletonWrapper $width="80%" $height="16px" $animated={true} />
          </CardSkeletonBody>
          <CardSkeletonFooter>
            <SkeletonWrapper $width="100px" $height="36px" $borderRadius="var(--omf-borderRadius-md)" $animated={true} />
            <SkeletonWrapper $width="120px" $height="36px" $borderRadius="var(--omf-borderRadius-md)" $animated={true} />
          </CardSkeletonFooter>
        </CardSkeletonWrapper>
      );

    case 'list':
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {items.map((_, i) => (
            <ListItemSkeleton key={i}>
              <CircularSkeleton $size={40} $animated={true} />
              <div style={{ flex: 1 }}>
                <SkeletonWrapper $width="70%" $height="18px" $animated={true} />
                <SkeletonWrapper $width="50%" $height="14px" $animated={true} style={{ marginTop: 'var(--omf-spacing-1)' }} />
              </div>
              <SkeletonWrapper $width="80px" $height="24px" $borderRadius="var(--omf-borderRadius-full)" $animated={true} />
            </ListItemSkeleton>
          ))}
        </div>
      );

    case 'table':
      return (
        <CardSkeletonWrapper style={{ padding: 0 }}>
          <div style={{ borderBottom: '1px solid var(--omf-colors-border-muted)', padding: 'var(--omf-spacing-3) var(--omf-spacing-4)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 'var(--omf-spacing-4)' }}>
              {Array.from({ length: 5 }).map((_, i) => (
                <SkeletonWrapper key={i} $width="80%" $height="14px" $borderRadius="var(--omf-borderRadius-sm)" $animated={true} />
              ))}
            </div>
          </div>
          {items.map((_, i) => (
            <div key={i} style={{ padding: 'var(--omf-spacing-3) var(--omf-spacing-4)', borderBottom: i < count - 1 ? '1px solid var(--omf-colors-border-muted)' : 'none' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 'var(--omf-spacing-4)' }}>
                {Array.from({ length: 5 }).map((_, j) => (
                  <SkeletonWrapper key={j} $width="70%" $height="16px" $borderRadius="var(--omf-borderRadius-sm)" $animated={true} />
                ))}
              </div>
            </div>
          ))}
        </CardSkeletonWrapper>
      );

    default:
      return (
        <CardSkeletonWrapper>
          <CardSkeletonHeader>
            <SkeletonWrapper $width="120px" $height="28px" $animated={true} />
            <SkeletonWrapper $width="80px" $height="16px" $animated={true} style={{ marginTop: 'var(--omf-spacing-2)' }} />
          </CardSkeletonHeader>
          <CardSkeletonBody>
            <SkeletonWrapper $width="100%" $height="16px" $animated={true} />
            <SkeletonWrapper $width="100%" $height="16px" $animated={true} />
            <SkeletonWrapper $width="60%" $height="16px" $animated={true} />
          </CardSkeletonBody>
          <CardSkeletonFooter>
            <SkeletonWrapper $width="100px" $height="36px" $borderRadius="var(--omf-borderRadius-md)" $animated={true} />
            <SkeletonWrapper $width="120px" $height="36px" $borderRadius="var(--omf-borderRadius-md)" $animated={true} />
          </CardSkeletonFooter>
        </CardSkeletonWrapper>
      );
  }
}