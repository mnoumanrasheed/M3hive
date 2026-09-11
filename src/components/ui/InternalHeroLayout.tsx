import React, { forwardRef } from 'react';

type InternalHeroSectionProps = React.ComponentPropsWithoutRef<'section'>;
type InternalHeroContentProps = React.ComponentPropsWithoutRef<'div'>;

/**
 * Global geometry for every non-homepage hero.
 *
 * The fixed navigation reaches 90px from the viewport top at its largest
 * breakpoint (16px inset + 74px navigation pill). The responsive top padding
 * matches the homepage hero and includes comfortable clearance below it.
 */
export const InternalHeroSection = forwardRef<HTMLElement, InternalHeroSectionProps>(
  ({ className = '', style, ...props }, ref) => (
    <section
      ref={ref}
      className={`relative z-0 flex min-h-screen w-full flex-col overflow-hidden ${className}`}
      style={{ minHeight: '100svh', ...style }}
      {...props}
    />
  ),
);

InternalHeroSection.displayName = 'InternalHeroSection';

export const InternalHeroContent: React.FC<InternalHeroContentProps> = ({
  className = '',
  ...props
}) => (
  <div
    className={`relative flex w-full flex-1 flex-col justify-center pt-[120px] sm:pt-[108px] ${className}`}
    {...props}
  />
);
