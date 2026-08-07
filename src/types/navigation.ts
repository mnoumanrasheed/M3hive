export interface NavLinkItem {
  label: string;
  href: string;
  description?: string;
}

export interface NavDropdownCategory {
  title: string;
  items: NavLinkItem[];
}

export interface NavItem {
  label: string;
  href: string;
  dropdown?: NavLinkItem[];
}
