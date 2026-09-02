import React, {
  useEffect,
  useRef,
  useState,
} from 'react';

import { gsap } from '../../lib/gsap';

import {
  NavLink,
} from 'react-router-dom';

import {
  X,
  Menu,
  ArrowRight,
} from 'lucide-react';

import {
  mainNavItems,
} from '../../data/navigation';

import { BrandLogo } from '../ui/BrandLogo';
import { Button } from '../ui/Button';
import { Container } from '../ui/Container';

import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

/* ============================================================
   MOBILE DRAWER
============================================================ */

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  reducedMotion: boolean;
}

const MobileDrawer: React.FC<MobileDrawerProps> = ({
  isOpen,
  onClose,
  reducedMotion,
}) => {
  const drawerRef =
    useRef<HTMLDivElement>(null);

  const backdropRef =
    useRef<HTMLDivElement>(null);

  /* ============================================================
     DRAWER ANIMATION
  ============================================================ */

  useEffect(() => {
    const drawer =
      drawerRef.current;

    const backdrop =
      backdropRef.current;

    if (!drawer || !backdrop) {
      return;
    }

    if (reducedMotion) {
      drawer.style.transform =
        isOpen
          ? 'translateX(0)'
          : 'translateX(100%)';

      backdrop.style.opacity =
        isOpen
          ? '1'
          : '0';

      backdrop.style.pointerEvents =
        isOpen
          ? 'auto'
          : 'none';

      return;
    }

    if (isOpen) {
      gsap.to(
        backdrop,
        {
          opacity: 1,
          pointerEvents: 'auto',
          duration: 0.25,
          ease: 'power2.out',
        },
      );

      gsap.fromTo(
        drawer,
        {
          x: '100%',
        },
        {
          x: '0%',
          duration: 0.4,
          ease: 'power3.out',
        },
      );
    } else {
      gsap.to(
        drawer,
        {
          x: '100%',
          duration: 0.3,
          ease: 'power3.in',
        },
      );

      gsap.to(
        backdrop,
        {
          opacity: 0,
          pointerEvents: 'none',
          duration: 0.25,
          ease: 'power2.in',
        },
      );
    }
  }, [
    isOpen,
    reducedMotion,
  ]);

  /* ============================================================
     ESCAPE KEY
  ============================================================ */

  useEffect(() => {
    const handleKey = (
      event: KeyboardEvent,
    ) => {
      if (
        event.key === 'Escape' &&
        isOpen
      ) {
        onClose();
      }
    };

    window.addEventListener(
      'keydown',
      handleKey,
    );

    return () => {
      window.removeEventListener(
        'keydown',
        handleKey,
      );
    };
  }, [
    isOpen,
    onClose,
  ]);

  /* ============================================================
     BODY SCROLL LOCK
  ============================================================ */

  useEffect(() => {
    document.body.style.overflow =
      isOpen
        ? 'hidden'
        : '';

    return () => {
      document.body.style.overflow =
        '';
    };
  }, [isOpen]);

  const activeLinkClass =
    'border-hive-yellow/40 bg-hive-yellow/15 text-hive-black';

  const linkClass =
    'border-transparent text-neutral-700 hover:border-hive-yellow/30 hover:bg-hive-yellow/10 hover:text-hive-black';

  return (
    <>
      {/* Backdrop */}

      <div
        ref={backdropRef}
        onClick={onClose}
        aria-hidden="true"
        className="
          pointer-events-none
          fixed
          inset-0
          z-40
          bg-hive-black/50
          opacity-0
          backdrop-blur-sm
        "
        style={{
          willChange: 'opacity',
        }}
      />

      {/* Drawer */}

      <div
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className="
          fixed
          inset-y-0
          right-0
          z-50
          flex
          w-[min(380px,calc(100vw-24px))]
          flex-col
          border-l
          border-hive-border
          bg-white
          shadow-[0_24px_70px_rgba(15,15,15,0.18)]
          backdrop-blur-2xl
        "
        style={{
          transform: 'translateX(100%)',
          willChange: 'transform',
        }}
      >
        {/* Drawer header */}

        <div
          className="
            flex
            items-center
            justify-between
            border-b
            border-hive-border
            px-5
            py-4
          "
        >
          <BrandLogo
            imgClassName="h-8 w-auto object-contain"
          />

          <button
            type="button"
            onClick={onClose}
            aria-label="Close navigation menu"
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-xl
              border
              border-hive-border
              bg-hive-warm-white
              text-hive-black
              transition-all
              duration-150
              hover:border-hive-yellow/60
              hover:bg-hive-yellow/10
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-hive-yellow
            "
          >
            <X
              className="h-4 w-4"
              aria-hidden="true"
            />
          </button>
        </div>

        {/* Mobile navigation */}

        <nav
          className="
            flex-1
            space-y-1
            overflow-y-auto
            px-4
            py-5
          "
          aria-label="Mobile navigation"
        >
          {mainNavItems.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              onClick={onClose}
              className={({
                isActive,
              }) =>
                [
                  'block',
                  'rounded-xl',
                  'border',
                  'px-4',
                  'py-3',
                  'font-heading',
                  'text-sm',
                  'font-semibold',
                  'transition-colors',
                  'duration-150',
                  'focus-visible:outline-none',
                  'focus-visible:ring-2',
                  'focus-visible:ring-hive-yellow',

                  isActive
                    ? activeLinkClass
                    : linkClass,
                ].join(' ')
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* CTA */}

        <div
          className="
            border-t
            border-hive-border
            bg-hive-warm-white
            px-5
            py-5
          "
        >
          <Button
            href="/contact"
            variant="primary"
            fullWidth
          >
            Start a Project

            <ArrowRight
              className="h-4 w-4"
              aria-hidden="true"
            />
          </Button>
        </div>
      </div>
    </>
  );
};

/* ============================================================
   MAIN HEADER
============================================================ */

export const Header: React.FC = () => {
  const [
    mobileOpen,
    setMobileOpen,
  ] = useState(false);

  const [
    scrolled,
    setScrolled,
  ] = useState(false);

  const reducedMotion =
    usePrefersReducedMotion();

  /* ============================================================
     SCROLL SHADOW
  ============================================================ */

  useEffect(() => {
    const onScroll = () => {
      setScrolled(
        window.scrollY > 16,
      );
    };

    window.addEventListener(
      'scroll',
      onScroll,
      {
        passive: true,
      },
    );

    return () => {
      window.removeEventListener(
        'scroll',
        onScroll,
      );
    };
  }, []);

  return (
    <>
      <header
        className={[
          'sticky',
          'top-0',
          'z-[60]',
          'w-full',
          'border-b',
          'border-hive-border',
          'transition-[background,border-color,box-shadow,backdrop-filter]',
          'duration-[250ms]',
          'ease-out',
          'supports-[backdrop-filter]:backdrop-blur-[14px]',
          scrolled
            ? 'bg-white/95 shadow-[0_10px_30px_rgba(15,15,15,0.08)] supports-[backdrop-filter]:backdrop-blur-[18px]'
            : 'bg-white/95 shadow-[0_1px_0_rgba(15,15,15,0.04)]',
        ].join(' ')}
      >
        <Container size="lg">
          <div
            className="
              flex
              h-[72px]
              items-center
              justify-between
              lg:h-20
            "
          >
            {/* Logo */}

            <BrandLogo
              imgClassName="
                h-9
                w-auto
                object-contain
                sm:h-10
                lg:h-11
              "
            />

            {/* ==================================================
                DESKTOP NAVIGATION
            ================================================== */}

            <nav
              className="
                hidden
                items-center
                gap-1
                md:flex
              "
              aria-label="Primary navigation"
            >
              {mainNavItems.map((item) => (
                <NavLink
                  key={item.href}
                  to={item.href}
                  className={({
                    isActive,
                  }) =>
                    [
                      'relative',
                      'rounded-full',
                      'px-3.5',
                      'xl:px-4',
                      'py-2.5',
                      'font-heading',
                      'text-[13px]',
                      'xl:text-sm',
                      'font-semibold',
                      'transition-all',
                      'duration-200',
                      'after:absolute',
                      'after:bottom-1.5',
                      'after:left-1/2',
                      'after:h-px',
                      'after:w-5',
                      'after:-translate-x-1/2',
                      'after:scale-x-0',
                      'after:bg-hive-yellow',
                      'after:shadow-[0_0_10px_rgba(253,207,9,0.55)]',
                      'after:transition-transform',
                      'after:duration-200',
                      'hover:bg-hive-warm-white',
                      'hover:text-hive-black',
                      'hover:after:scale-x-100',
                      'focus-visible:outline-none',
                      'focus-visible:ring-2',
                      'focus-visible:ring-hive-yellow',

                      isActive
                        ? 'bg-hive-warm-white text-hive-black after:scale-x-100'
                        : 'text-neutral-700',
                    ].join(' ')
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>

            {/* ==================================================
                CTA + MOBILE BUTTON
            ================================================== */}

            <div
              className="
                flex
                items-center
                gap-2
                xl:gap-3
              "
            >
              <div className="hidden md:flex">
                <Button
                  href="/contact"
                  variant="primary"
                  size="md"
                  className="px-4 text-[13px] shadow-[0_8px_24px_rgba(253,207,9,0.24)] transition-transform hover:-translate-y-px xl:px-5 xl:text-sm"
                >
                  Start a Project

                  <ArrowRight
                    className="h-3.5 w-3.5 xl:h-4 xl:w-4"
                    aria-hidden="true"
                  />
                </Button>
              </div>

              <button
                type="button"
                onClick={() =>
                  setMobileOpen(true)
                }
                aria-label="Open navigation menu"
                className="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-lg
                  border
                  border-hive-border
                  bg-hive-warm-white
                  text-hive-black
                  transition-all
                  duration-150
                  hover:border-hive-yellow/60
                  hover:bg-hive-yellow/10
                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-hive-yellow
                  md:hidden
                "
              >
                <Menu
                  className="h-4 w-4"
                  aria-hidden="true"
                />
              </button>
            </div>
          </div>
        </Container>
      </header>

      {/* Mobile Drawer */}

      <MobileDrawer
        isOpen={mobileOpen}
        onClose={() =>
          setMobileOpen(false)
        }
        reducedMotion={
          reducedMotion
        }
      />
    </>
  );
};
