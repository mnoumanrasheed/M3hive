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
    'text-hive-orange';

  const linkClass =
    'text-hive-black hover:text-hive-orange';

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
          w-[min(360px,100vw)]
          flex-col
          bg-hive-white
          shadow-hive-lg
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
              text-hive-text-muted
              transition-all
              duration-150
              hover:border-hive-yellow
              hover:text-hive-black
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-hive-yellow
            "
          >
            <X
              className="h-4.5 w-4.5"
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
                  'px-4',
                  'py-3',
                  'font-heading',
                  'text-sm',
                  'font-semibold',
                  'transition-colors',
                  'duration-150',
                  'hover:bg-hive-warm-white',

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
            Start a Conversation

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
          'bg-hive-white',
          'transition-shadow',
          'duration-300',

          scrolled
            ? 'border-b border-hive-border shadow-hive-md'
            : 'border-b border-transparent',
        ].join(' ')}
      >
        <Container size="lg">
          <div
            className="
              flex
              h-16
              items-center
              justify-between
              lg:h-[70px]
            "
          >
            {/* Logo */}

            <BrandLogo
              imgClassName="
                h-8
                w-auto
                object-contain
                sm:h-9
                lg:h-10
              "
            />

            {/* ==================================================
                DESKTOP NAVIGATION
            ================================================== */}

            <nav
              className="
                hidden
                items-center
                gap-0.5
                xl:gap-1
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
                      'rounded-xl',
                      'px-2.5',
                      'xl:px-3.5',
                      'py-2',
                      'font-heading',
                      'text-[13px]',
                      'xl:text-sm',
                      'font-medium',
                      'transition-colors',
                      'duration-150',
                      'hover:bg-hive-warm-white',
                      'hover:text-hive-orange',
                      'focus-visible:outline-none',
                      'focus-visible:ring-2',
                      'focus-visible:ring-hive-yellow',

                      isActive
                        ? 'font-semibold text-hive-orange'
                        : 'text-hive-black',
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
                  className="text-[13px] xl:text-sm px-4 xl:px-5"
                >
                  Start a Conversation

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
                  rounded-xl
                  border
                  border-hive-border
                  text-hive-text-muted
                  transition-all
                  duration-150
                  hover:border-hive-yellow
                  hover:text-hive-black
                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-hive-yellow
                  md:hidden
                "
              >
                <Menu
                  className="h-4.5 w-4.5"
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