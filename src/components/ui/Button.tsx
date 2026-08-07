import React from 'react';
import { Link } from 'react-router-dom';
import { MagneticHover } from '../animation/MagneticHover';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  isExternal?: boolean;
  target?: string;
  rel?: string;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  fullWidth?: boolean;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: [
    'bg-hive-yellow text-hive-black border border-hive-yellow',
    'hover:bg-hive-orange hover:border-hive-orange hover:text-white',
    'focus-visible:ring-2 focus-visible:ring-hive-yellow focus-visible:ring-offset-2',
    'shadow-hive-sm hover:shadow-hive-md',
  ].join(' '),

  secondary: [
    'bg-hive-black text-white border border-hive-black',
    'hover:bg-neutral-900',
    'focus-visible:ring-2 focus-visible:ring-hive-black focus-visible:ring-offset-2',
    'shadow-hive-sm hover:shadow-hive-md',
  ].join(' '),

  outline: [
    'bg-transparent text-hive-black border border-hive-border',
    'hover:border-hive-yellow hover:bg-hive-warm-white',
    'focus-visible:ring-2 focus-visible:ring-hive-yellow focus-visible:ring-offset-2',
  ].join(' '),

  ghost: [
    'bg-transparent text-hive-black border border-transparent',
    'hover:bg-hive-warm-white hover:text-hive-orange',
    'focus-visible:ring-2 focus-visible:ring-hive-yellow focus-visible:ring-offset-2',
  ].join(' '),
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'text-xs font-semibold px-4 py-2 rounded-lg gap-1.5',
  md: 'text-sm font-semibold px-5 py-2.5 rounded-lg gap-2',
  lg: 'text-sm font-bold px-7 py-3.5 rounded-xl gap-2.5',
};

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  href,
  isExternal = false,
  target,
  rel,
  children,
  className = '',
  disabled = false,
  fullWidth = false,
  ...props
}) => {
  const base = [
    'inline-flex items-center justify-center font-heading',
    'transition-colors duration-200 ease-out-expo', // Use transition-colors so transform isn't overridden by GSAP
    'select-none whitespace-nowrap',
    'disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed',
    fullWidth ? 'w-full' : '',
    variantClasses[variant],
    sizeClasses[size],
    className,
  ].filter(Boolean).join(' ');

  let content;

  if (href && !disabled) {
    const isExt = isExternal || target === '_blank';
    if (isExt) {
      content = (
        <a href={href} target={target ?? '_blank'} rel={rel ?? 'noopener noreferrer'} className={base}>
          {children}
        </a>
      );
    } else {
      content = (
        <Link to={href} className={base}>
          {children}
        </Link>
      );
    }
  } else {
    content = (
      <button className={base} disabled={disabled} {...props}>
        {children}
      </button>
    );
  }

  return (
    <MagneticHover disabled={disabled || fullWidth}>
      {content}
    </MagneticHover>
  );
};
