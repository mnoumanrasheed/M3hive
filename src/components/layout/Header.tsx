import React, { useEffect, useRef, useState } from 'react';
import { gsap } from '../../lib/gsap';
import { NavLink, Link } from 'react-router-dom';
import { X, Menu, ChevronDown, ArrowRight } from 'lucide-react';
import { mainNavItems, serviceNavItems } from '../../data/navigation';
import { BrandLogo } from '../ui/BrandLogo';
import { Button } from '../ui/Button';
import { Container } from '../ui/Container';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

/* ─── Desktop Services Mega-Dropdown ──────────────────────────── */
interface ServicesDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

const ServicesDropdown: React.FC<ServicesDropdownProps> = ({ isOpen, onClose }) => {
  const panelRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className={[
        'absolute top-full left-1/2 -translate-x-1/2 pt-2 z-50',
        isOpen ? 'pointer-events-auto' : 'pointer-events-none'
      ].join(' ')}
    >
      <div
        ref={panelRef}
        role="region"
        aria-label="Services menu"
        className={[
          'w-[640px] max-w-[95vw]',
          'bg-hive-white rounded-2xl border border-hive-border shadow-hive-lg',
          'transition-all duration-200 origin-top overflow-hidden',
          isOpen
            ? 'opacity-100 scale-y-100'
            : 'opacity-0 scale-y-95',
        ].join(' ')}
      >
      {/* Header strip */}
      <div className="px-5 py-3 border-b border-hive-border bg-hive-warm-white flex items-center justify-between">
        <span className="text-xs font-heading font-bold uppercase tracking-widest text-hive-text-muted">
          Services
        </span>
        <Link
          to="/services"
          onClick={onClose}
          className="inline-flex items-center gap-1 text-xs font-semibold text-hive-orange hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hive-yellow rounded"
        >
          All Services
          <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
        </Link>
      </div>

      {/* Grid of services — full card is a NavLink */}
      <div className="p-4 grid grid-cols-2 gap-1">
        {serviceNavItems.map((item) => (
          <NavLink
            key={item.href}
            to={item.href}
            onClick={onClose}
            className={({ isActive }) =>
              [
                'group flex flex-col gap-0.5 px-4 py-3.5 rounded-xl transition-all duration-150',
                isActive
                  ? 'bg-hive-warm-white border border-hive-light-honey'
                  : 'hover:bg-hive-warm-white border border-transparent hover:border-hive-border',
              ].join(' ')
            }
          >
            {({ isActive }) => (
              <>
                <span
                  className={[
                    'text-sm font-heading font-semibold transition-colors duration-150',
                    isActive ? 'text-hive-orange' : 'text-hive-black group-hover:text-hive-orange',
                  ].join(' ')}
                >
                  {item.label}
                </span>
                {item.description && (
                  <span className="text-xs text-hive-text-muted leading-snug line-clamp-2">
                    {item.description}
                  </span>
                )}
              </>
            )}
          </NavLink>
        ))}
      </div>
    </div>
    </div>
  );
};

/* ─── Mobile Drawer ────────────────────────────────────────────── */
interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  reducedMotion: boolean;
}

const MobileDrawer: React.FC<MobileDrawerProps> = ({ isOpen, onClose, reducedMotion }) => {
  const drawerRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const [servicesExpanded, setServicesExpanded] = useState(false);

  useEffect(() => {
    const drawer = drawerRef.current;
    const backdrop = backdropRef.current;
    if (!drawer || !backdrop) return;

    if (reducedMotion) {
      drawer.style.transform = isOpen ? 'translateX(0)' : 'translateX(100%)';
      backdrop.style.opacity = isOpen ? '1' : '0';
      backdrop.style.pointerEvents = isOpen ? 'auto' : 'none';
      return;
    }

    if (isOpen) {
      gsap.to(backdrop, { opacity: 1, pointerEvents: 'auto', duration: 0.25, ease: 'power2.out' });
      gsap.fromTo(drawer,
        { x: '100%' },
        { x: '0%', duration: 0.4, ease: 'power3.out' }
      );
    } else {
      gsap.to(drawer, { x: '100%', duration: 0.3, ease: 'power3.in' });
      gsap.to(backdrop, { opacity: 0, pointerEvents: 'none', duration: 0.25, ease: 'power2.in' });
    }
  }, [isOpen, reducedMotion]);

  /* Keyboard: close on Escape */
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  /* Body scroll lock */
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const activeLinkClass = 'text-hive-orange';
  const linkClass = 'text-hive-black hover:text-hive-orange';

  return (
    <>
      {/* Backdrop */}
      <div
        ref={backdropRef}
        onClick={onClose}
        aria-hidden="true"
        className="fixed inset-0 bg-hive-black/50 backdrop-blur-sm z-40 opacity-0 pointer-events-none"
        style={{ willChange: 'opacity' }}
      />

      {/* Drawer panel */}
      <div
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className="fixed inset-y-0 right-0 w-[min(360px,100vw)] bg-hive-white z-50 flex flex-col shadow-hive-lg"
        style={{ transform: 'translateX(100%)', willChange: 'transform' }}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-hive-border">
          <BrandLogo imgClassName="h-8 w-auto" />
          <button
            onClick={onClose}
            aria-label="Close navigation menu"
            className="w-9 h-9 flex items-center justify-center rounded-xl border border-hive-border text-hive-text-muted hover:text-hive-black hover:border-hive-yellow transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hive-yellow"
          >
            <X className="w-4.5 h-4.5" aria-hidden="true" />
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex-1 overflow-y-auto px-4 py-5 space-y-1" aria-label="Mobile navigation">
          {mainNavItems.map((item) => {
            if (item.dropdown) {
              return (
                <div key={item.label}>
                  {/* Services row: label navigates, chevron toggles */}
                  <div className="flex items-center rounded-xl hover:bg-hive-warm-white transition-colors duration-150">
                    <NavLink
                      to="/services"
                      onClick={onClose}
                      className={({ isActive }) =>
                        [
                          'flex-1 px-4 py-3 text-sm font-heading font-semibold transition-colors duration-150',
                          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hive-yellow rounded-l-xl',
                          isActive ? activeLinkClass : linkClass,
                        ].join(' ')
                      }
                    >
                      {item.label}
                    </NavLink>
                    <button
                      onClick={() => setServicesExpanded((prev) => !prev)}
                      aria-expanded={servicesExpanded}
                      aria-label={servicesExpanded ? 'Collapse services' : 'Expand services'}
                      className="px-3 py-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hive-yellow rounded-r-xl"
                    >
                      <ChevronDown
                        className={[
                          'w-4 h-4 text-hive-text-muted transition-transform duration-200',
                          servicesExpanded ? 'rotate-180 text-hive-orange' : '',
                        ].join(' ')}
                        aria-hidden="true"
                      />
                    </button>
                  </div>

                  {servicesExpanded && (
                    <div className="mt-1 ml-4 pl-3 border-l-2 border-hive-yellow space-y-0.5">
                      <NavLink
                        to="/services"
                        onClick={onClose}
                        className={({ isActive }) =>
                          `block px-3 py-2 rounded-lg text-xs font-heading font-semibold transition-colors ${isActive ? activeLinkClass : linkClass}`
                        }
                      >
                        All Services Overview
                      </NavLink>
                      {serviceNavItems.map((sub) => (
                        <NavLink
                          key={sub.href}
                          to={sub.href}
                          onClick={onClose}
                          className={({ isActive }) =>
                            `block px-3 py-2 rounded-lg text-xs transition-colors ${isActive ? activeLinkClass + ' font-semibold' : linkClass}`
                          }
                        >
                          {sub.label}
                        </NavLink>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            return (
              <NavLink
                key={item.href}
                to={item.href}
                onClick={onClose}
                className={({ isActive }) =>
                  [
                    'block px-4 py-3 rounded-xl text-sm font-heading font-semibold transition-colors duration-150',
                    'hover:bg-hive-warm-white',
                    isActive ? activeLinkClass : linkClass,
                  ].join(' ')
                }
              >
                {item.label}
              </NavLink>
            );
          })}
        </nav>

        {/* Drawer CTA */}
        <div className="px-5 py-5 border-t border-hive-border bg-hive-warm-white">
          <Button href="/contact" variant="primary" fullWidth>
            Start a Conversation
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Button>
        </div>
      </div>
    </>
  );
};

/* ─── Main Header ──────────────────────────────────────────────── */
export const Header: React.FC = () => {
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const servicesRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  /* Scroll shadow */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Global Escape closes dropdown */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setServicesOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  /* Click outside closes dropdown */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (servicesRef.current && !servicesRef.current.contains(e.target as Node)) {
        setServicesOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const closeDropdown = () => setServicesOpen(false);

  return (
    <>
      <header
        className={[
          'sticky top-0 z-40 w-full bg-hive-white transition-shadow duration-300',
          scrolled ? 'shadow-hive-md border-b border-hive-border' : 'border-b border-transparent',
        ].join(' ')}
      >
        <Container size="lg">
          <div className="flex items-center justify-between h-16 lg:h-[70px]">

            {/* Logo */}
            <BrandLogo imgClassName="h-9 lg:h-10 w-auto" />

            {/* Desktop Nav */}
            <nav
              className="hidden lg:flex items-center gap-1"
              aria-label="Primary navigation"
            >
              {mainNavItems.map((item) => {
                if (item.dropdown) {
                  return (
                    <div
                      key={item.label}
                      ref={servicesRef}
                      className="relative"
                      onMouseEnter={() => setServicesOpen(true)}
                      onMouseLeave={() => setServicesOpen(false)}
                    >
                      {/* Services label → navigates to /services */}
                      <div className="flex items-center">
                        <NavLink
                          to="/services"
                          onClick={closeDropdown}
                          className={({ isActive }) =>
                            [
                              'pl-3.5 pr-1 py-2 rounded-l-xl',
                              'text-sm font-heading font-medium transition-colors duration-150',
                              'hover:text-hive-orange hover:bg-hive-warm-white',
                              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hive-yellow',
                              isActive || servicesOpen ? 'text-hive-orange bg-hive-warm-white' : 'text-hive-black',
                            ].join(' ')
                          }
                        >
                          {item.label}
                        </NavLink>
                        {/* Chevron-only button toggles the dropdown */}
                        <button
                          aria-haspopup="true"
                          aria-expanded={servicesOpen}
                          aria-label={servicesOpen ? 'Close services menu' : 'Open services menu'}
                          onClick={(e) => {
                            e.stopPropagation();
                            setServicesOpen((v) => !v);
                          }}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault();
                              setServicesOpen((v) => !v);
                            }
                          }}
                          className={[
                            'pr-2 pl-1 py-2 rounded-r-xl',
                            'text-sm font-heading font-medium transition-colors duration-150',
                            'hover:text-hive-orange hover:bg-hive-warm-white',
                            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hive-yellow',
                            servicesOpen ? 'text-hive-orange bg-hive-warm-white' : 'text-hive-black',
                          ].join(' ')}
                        >
                          <ChevronDown
                            className={[
                              'w-3.5 h-3.5 transition-transform duration-200',
                              servicesOpen ? 'rotate-180 text-hive-orange' : 'text-hive-text-muted',
                            ].join(' ')}
                            aria-hidden="true"
                          />
                        </button>
                      </div>

                      <ServicesDropdown
                        isOpen={servicesOpen}
                        onClose={closeDropdown}
                      />
                    </div>
                  );
                }

                return (
                  <NavLink
                    key={item.href}
                    to={item.href}
                    className={({ isActive }) =>
                      [
                        'px-3.5 py-2 rounded-xl text-sm font-heading font-medium transition-colors duration-150',
                        'hover:text-hive-orange hover:bg-hive-warm-white',
                        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hive-yellow',
                        isActive ? 'text-hive-orange font-semibold' : 'text-hive-black',
                      ].join(' ')
                    }
                  >
                    {item.label}
                  </NavLink>
                );
              })}
            </nav>

            {/* Desktop CTA + Mobile toggle */}
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex">
                <Button href="/contact" variant="primary" size="md">
                  Start a Conversation
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </Button>
              </div>

              <button
                onClick={() => setMobileOpen(true)}
                aria-label="Open navigation menu"
                className={[
                  'lg:hidden w-9 h-9 flex items-center justify-center rounded-xl',
                  'border border-hive-border text-hive-text-muted',
                  'hover:text-hive-black hover:border-hive-yellow transition-all duration-150',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hive-yellow',
                ].join(' ')}
              >
                <Menu className="w-4.5 h-4.5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </Container>
      </header>

      {/* Mobile Drawer */}
      <MobileDrawer
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        reducedMotion={reducedMotion}
      />
    </>
  );
};
