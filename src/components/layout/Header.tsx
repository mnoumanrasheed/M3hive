import React, {
  useEffect,
  useState,
} from 'react';
import {
  NavLink,
  Link,
  useLocation,
} from 'react-router-dom';
import {
  Menu,
  X,
  ArrowRight,
} from 'lucide-react';

import { mainNavItems } from '../../data/navigation';
import { BrandLogo } from '../ui/BrandLogo';

/* ============================================================
   MOBILE NAVIGATION DRAWER
============================================================ */

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileDrawer: React.FC<MobileDrawerProps> = ({ isOpen, onClose }) => {
  const location = useLocation();

  // Close on route change
  useEffect(() => {
    onClose();
  }, [location.pathname, onClose]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] lg:hidden"
      role="dialog"
      aria-modal="true"
      aria-label="Mobile navigation"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/65 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Floating Card Panel */}
      <div className="fixed inset-x-4 top-4 z-[101] max-w-md mx-auto rounded-2xl bg-[rgba(18,27,25,0.97)] border border-white/[0.10] p-6 shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-2xl flex flex-col justify-between transition-all duration-300 ease-out">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-5 border-b border-white/[0.08]">
            <BrandLogo imgClassName="h-7 w-auto max-w-[100px] object-contain" />
            <button
              type="button"
              onClick={onClose}
              aria-label="Close navigation menu"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.12] bg-white/[0.04] text-white/80 transition-colors duration-200 hover:border-white/30 hover:bg-white/[0.08] hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-hive-yellow"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="mt-6 space-y-1" aria-label="Mobile links">
            {mainNavItems.map((item) => {
              const isActive =
                item.href === '/'
                  ? location.pathname === '/'
                  : location.pathname.startsWith(item.href);

              return (
                <NavLink
                  key={item.href}
                  to={item.href}
                  onClick={onClose}
                  className={`flex items-center justify-between py-3 px-3.5 rounded-xl font-heading text-[15px] font-medium transition-colors duration-200 ${
                    isActive
                      ? 'text-white bg-white/[0.07]'
                      : 'text-white/70 hover:text-white hover:bg-white/[0.03]'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="h-1.5 w-1.5 rounded-full bg-hive-yellow" />
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Bottom CTA */}
        <div className="mt-6 pt-5 border-t border-white/[0.08]">
          <Link
            to="/contact"
            onClick={onClose}
            className="group flex h-[46px] w-full items-center justify-center gap-2 rounded-[10px] bg-hive-yellow px-5 font-heading text-[14px] font-semibold text-[#111111] shadow-[0_6px_18px_rgba(255,204,0,0.16)] transition-all duration-200 hover:bg-[#fed62c]"
          >
            <span>Start a Project</span>
            <ArrowRight
              className="h-4 w-4 transition-transform duration-200 ease-out group-hover:translate-x-[3px]"
              aria-hidden="true"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

/* ============================================================
   MAIN NAVBAR (ARCHITECTURAL GLASS CONTAINER)
============================================================ */

export const Header: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 w-full pt-3 sm:pt-4 px-4 sm:px-6 lg:px-8 pointer-events-none transition-all duration-300 bg-transparent">
        <div className="mx-auto max-w-[1360px]">
          <div
            className={`pointer-events-auto relative grid h-[74px] grid-cols-[1fr_auto] lg:grid-cols-[1fr_auto_1fr] items-center rounded-[16px] pl-[26px] pr-[22px] border border-white/[0.08] shadow-[0_8px_30px_rgba(0,0,0,0.18)] transition-all duration-300 ease-out ${
              scrolled
                ? 'bg-[rgba(18,27,25,0.94)] backdrop-blur-[20px] saturate-[140%] shadow-[0_12px_36px_rgba(0,0,0,0.28)]'
                : 'bg-[rgba(18,27,25,0.65)] backdrop-blur-[18px] saturate-[140%]'
            }`}
          >
            {/* ── Left Column: Logo ── */}
            <div className="justify-self-start flex items-center">
              <BrandLogo
                imgClassName="h-8 w-auto max-w-[105px] object-contain transition-opacity duration-200 hover:opacity-90"
              />
            </div>

            {/* ── Center Column: Direct Navigation Links (Visually Centered) ── */}
            <nav
              className="hidden lg:flex justify-self-center items-center gap-[34px] xl:gap-[38px]"
              aria-label="Primary navigation"
            >
              {mainNavItems.map((item) => {
                const isActive =
                  item.href === '/'
                    ? location.pathname === '/'
                    : location.pathname.startsWith(item.href);

                return (
                  <NavLink
                    key={item.href}
                    to={item.href}
                    className={`group relative py-1.5 font-heading text-[14px] font-medium tracking-[-0.01em] transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-hive-yellow focus-visible:ring-offset-4 focus-visible:ring-offset-transparent ${
                      isActive ? 'text-white' : 'text-white/[0.68] hover:text-white'
                    }`}
                  >
                    <span>{item.label}</span>
                    {/* Subtle 1px gold underline animating from center */}
                    <span
                      className={`absolute bottom-0 left-0 right-0 h-[1px] bg-hive-yellow transition-transform duration-[220ms] ease-out origin-center ${
                        isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                      }`}
                      aria-hidden="true"
                    />
                  </NavLink>
                );
              })}
            </nav>

            {/* ── Right Column: Start a Project CTA Button ── */}
            <div className="justify-self-end flex items-center gap-3">
              <div className="hidden lg:block">
                <Link
                  to="/contact"
                  className="group inline-flex h-[46px] items-center gap-2 rounded-[10px] bg-hive-yellow px-[22px] font-heading text-[14px] font-semibold text-[#111111] shadow-[0_6px_18px_rgba(255,204,0,0.16)] transition-all duration-200 ease-out hover:-translate-y-[1px] hover:bg-[#fed62c] active:translate-y-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-hive-yellow focus-visible:ring-offset-2 focus-visible:ring-offset-[#121B19]"
                >
                  <span>Start a Project</span>
                  <ArrowRight
                    className="h-4 w-4 transition-transform duration-200 ease-out group-hover:translate-x-[3px]"
                    aria-hidden="true"
                  />
                </Link>
              </div>

              {/* Mobile Menu Toggle Button */}
              <button
                type="button"
                onClick={() => setMobileOpen(true)}
                aria-label="Open navigation menu"
                aria-expanded={mobileOpen}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.12] bg-white/[0.04] text-white/90 transition-colors duration-200 hover:border-white/30 hover:bg-white/[0.08] hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-hive-yellow lg:hidden"
              >
                <Menu className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <MobileDrawer
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />
    </>
  );
};
