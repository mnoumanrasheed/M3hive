import React, {
  useCallback,
  useEffect,
  useRef,
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
  ChevronDown,
  Cpu,
  HeartPulse,
  Radio,
  BrainCircuit,
  Code2,
  UsersRound,
  Bot,
  ChartNoAxesCombined,
  Cloud,
  RadioTower,
} from 'lucide-react';

import { mainNavItems, serviceNavItems } from '../../data/navigation';
import { products } from '../../data/products';
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
  const [productsOpen, setProductsOpen] = useState(location.pathname.startsWith('/products'));
  const [servicesOpen, setServicesOpen] = useState(location.pathname.startsWith('/services'));

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
      className="fixed inset-0 z-[100] xl:hidden"
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
      <div className="fixed inset-x-4 top-4 z-[101] max-h-[calc(100svh-2rem)] max-w-md mx-auto overflow-y-auto rounded-2xl border border-hive-border bg-hive-white p-6 shadow-[0_20px_50px_rgba(10,10,10,0.22)] flex flex-col justify-between transition-all duration-300 ease-out">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-5 border-b border-hive-border">
            <BrandLogo imgClassName="h-7 w-auto max-w-[100px] object-contain" />
            <button
              type="button"
              onClick={onClose}
              aria-label="Close navigation menu"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-hive-border bg-hive-white text-hive-black transition-colors duration-200 hover:border-hive-yellow/60 hover:bg-hive-warm-white focus:outline-none focus-visible:ring-2 focus-visible:ring-hive-yellow"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="mt-6 space-y-1" aria-label="Mobile links">
            <MobileAccordion label="Services" open={servicesOpen} onToggle={() => setServicesOpen((open) => !open)} active={location.pathname.startsWith('/services')} items={serviceNavItems} onClose={onClose} />
            <MobileAccordion label="Products" open={productsOpen} onToggle={() => setProductsOpen((open) => !open)} active={location.pathname.startsWith('/products')} items={products.map((product) => ({ label: product.name, href: `/products/${product.id}`, description: product.dropdownDescription }))} onClose={onClose} />
            {mainNavItems.filter((item) => item.href !== '/services').map((item) => {
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
                      ? 'text-hive-black bg-hive-warm-white'
                      : 'text-hive-black/75 hover:text-hive-black hover:bg-hive-gray'
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
        <div className="mt-6 pt-5 border-t border-hive-border">
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

interface DropdownItem { label: string; href: string; description?: string }

const MobileAccordion: React.FC<{ label: string; open: boolean; onToggle: () => void; active: boolean; items: DropdownItem[]; onClose: () => void }> = ({ label, open, onToggle, active, items, onClose }) => <div className="rounded-xl">
  <button type="button" onClick={onToggle} aria-expanded={open} className={`flex w-full items-center justify-between rounded-xl px-3.5 py-3 font-heading text-[15px] font-medium transition-colors duration-200 ${active || open ? 'bg-hive-warm-white text-hive-black' : 'text-hive-black/75 hover:bg-hive-gray hover:text-hive-black'}`}><span>{label}</span><ChevronDown className={`h-4 w-4 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} /></button>
  <div className={`grid transition-[grid-template-rows] duration-300 ease-out ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}><div className="overflow-hidden"><div className="space-y-1 pb-1 pt-1 pl-3">{items.map((item) => <NavLink key={item.href} to={item.href} onClick={onClose} className={({ isActive }) => `block rounded-lg px-3 py-2.5 text-sm transition-colors ${isActive ? 'bg-hive-warm-white text-hive-orange' : 'text-hive-black/75 hover:bg-hive-gray hover:text-hive-black'}`}><span className="block font-heading font-semibold">{item.label}</span><span className="mt-0.5 block text-xs leading-snug text-hive-text-muted">{item.description}</span></NavLink>)}</div></div></div>
</div>;

const productIcons = [Cpu, HeartPulse, Radio];
const serviceIcons = [BrainCircuit, Code2, UsersRound, Bot, ChartNoAxesCombined, Cloud, RadioTower];

const DesktopDropdown: React.FC<{ label: string; active: boolean; items: DropdownItem[]; icons: React.ComponentType<{ className?: string }>[]; columns?: boolean }> = ({ label, active, items, icons, columns = false }) => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => { setOpen(false); }, [location.pathname]);
  useEffect(() => {
    const closeOnOutsideClick = (event: MouseEvent) => { if (menuRef.current && !menuRef.current.contains(event.target as Node)) setOpen(false); };
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === 'Escape') setOpen(false); };
    document.addEventListener('mousedown', closeOnOutsideClick);
    window.addEventListener('keydown', closeOnEscape);
    return () => { document.removeEventListener('mousedown', closeOnOutsideClick); window.removeEventListener('keydown', closeOnEscape); };
  }, []);

  return <div ref={menuRef} className="relative pb-3 -mb-3">
    <button type="button" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-haspopup="menu" className={`group flex items-center gap-1 py-1.5 font-heading text-[14px] font-semibold tracking-[-0.01em] transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-hive-yellow focus-visible:ring-offset-4 ${active ? 'text-hive-black' : 'text-hive-black/80 hover:text-hive-black'}`}>
      {label} <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} /><span className={`absolute bottom-3 left-0 right-0 h-px bg-hive-yellow transition-transform duration-200 ${active || open ? 'scale-x-100' : 'scale-x-0'}`} />
    </button>
    {open && <div role="menu" className={`absolute left-1/2 top-full z-50 w-[390px] -translate-x-1/2 rounded-2xl border border-hive-border bg-white/95 p-2 shadow-[0_18px_45px_rgba(10,10,10,0.15)] backdrop-blur-xl animate-slide-down ${columns ? 'xl:w-[620px]' : ''}`}>
      <div className="px-3 pb-2 pt-2 text-[10px] font-bold uppercase tracking-[0.14em] text-hive-text-muted">M3 Hive {label}</div>
      <div className={columns ? 'grid xl:grid-cols-2 xl:gap-x-1' : ''}>{items.map((item, index) => { const Icon = icons[index]; return <Link key={item.href} to={item.href} role="menuitem" onClick={() => setOpen(false)} className="group flex gap-3 rounded-xl p-3 transition-colors hover:bg-hive-warm-white focus:outline-none focus-visible:ring-2 focus-visible:ring-hive-yellow"><span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-hive-yellow/15 text-hive-black transition-colors group-hover:bg-hive-yellow"><Icon className="h-4 w-4" /></span><span><span className="flex items-center gap-1 font-heading text-sm font-bold text-hive-black">{item.label}<ArrowRight className="h-3.5 w-3.5 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100" /></span><span className="mt-0.5 block text-xs leading-relaxed text-hive-text-muted">{item.description}</span></span></Link>; })}</div>
    </div>}
  </div>;
};

const ProductsMenu: React.FC = () => <DesktopDropdown label="Products" active={useLocation().pathname.startsWith('/products')} items={products.map((product) => ({ label: product.name, href: `/products/${product.id}`, description: product.dropdownDescription }))} icons={productIcons} />;
const ServicesMenu: React.FC = () => <DesktopDropdown label="Services" active={useLocation().pathname.startsWith('/services')} items={serviceNavItems} icons={serviceIcons} columns />;

/* ============================================================
   MAIN NAVBAR (ARCHITECTURAL GLASS CONTAINER)
============================================================ */

export const Header: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const closeMobileMenu = useCallback(() => setMobileOpen(false), []);

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
      <header className="fixed top-0 left-0 right-0 z-50 w-full pt-2 sm:pt-3 px-4 sm:px-6 lg:px-8 pointer-events-none transition-all duration-300 bg-transparent">
        <div className="mx-auto max-w-[1360px]">
          <div
            className={`pointer-events-auto relative grid h-[62px] grid-cols-[1fr_auto] xl:grid-cols-[1fr_auto_1fr] items-center rounded-[14px] pl-5 pr-4 border border-hive-border shadow-[0_8px_30px_rgba(10,10,10,0.12)] transition-all duration-300 ease-out ${
              scrolled
                ? 'bg-white/95 backdrop-blur-[20px] saturate-[140%] shadow-[0_12px_36px_rgba(10,10,10,0.16)]'
                : 'bg-white/85 backdrop-blur-[18px] saturate-[140%]'
            }`}
          >
            {/* ── Left Column: Logo ── */}
            <div className="justify-self-start flex items-center">
              <BrandLogo
                imgClassName="h-7 w-auto max-w-[96px] object-contain transition-opacity duration-200 hover:opacity-90"
              />
            </div>

            {/* ── Center Column: Direct Navigation Links (Visually Centered) ── */}
            <nav
              className="hidden xl:flex justify-self-center items-center gap-8"
              aria-label="Primary navigation"
            >
              <ServicesMenu />
              <ProductsMenu />
              {mainNavItems.filter((item) => item.href !== '/services').map((item) => {
                const isActive =
                  item.href === '/'
                    ? location.pathname === '/'
                    : location.pathname.startsWith(item.href);

                return (
                  <NavLink
                    key={item.href}
                    to={item.href}
                    className={`group relative py-1.5 font-heading text-[14px] font-semibold tracking-[-0.01em] transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-hive-yellow focus-visible:ring-offset-4 focus-visible:ring-offset-transparent ${
                      isActive ? 'text-hive-black' : 'text-hive-black/80 hover:text-hive-black'
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
              <div className="hidden xl:block">
                <Link
                  to="/contact"
                  className="group inline-flex h-10 items-center gap-2 rounded-[9px] bg-hive-yellow px-[18px] font-heading text-[13px] font-semibold text-[#111111] shadow-[0_6px_18px_rgba(255,204,0,0.16)] transition-all duration-200 ease-out hover:-translate-y-[1px] hover:bg-[#fed62c] active:translate-y-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-hive-yellow focus-visible:ring-offset-2 focus-visible:ring-offset-hive-white"
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
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-hive-border bg-hive-white text-hive-black transition-colors duration-200 hover:border-hive-yellow/60 hover:bg-hive-yellow/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-hive-yellow xl:hidden"
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
        onClose={closeMobileMenu}
      />
    </>
  );
};
