"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CebLogo, VoltpayLogo } from "./Logo";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/easy-pay", label: "Easy Pay" },
  { href: "/contact", label: "Contact Us" }
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link href="/" aria-label="VOLTPAY home">
          <CebLogo />
        </Link>

        <nav className="desktop-nav" aria-label="Main navigation">
          <button className="hamburger" aria-label="Open menu">
            <span />
            <span />
            <span />
          </button>

          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`nav-pill ${pathname === link.href ? "active" : ""}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="header-right">
          <div className="search-box">
            <span>⌕</span>
            <input type="search" placeholder="Search" aria-label="Search" />
          </div>

          <Link href="/login" className="signin-btn">
            <span className="signin-dot">●</span>
            Sign In
          </Link>

          <Link href="/" className="brand-link" aria-label="VOLTPAY">
            <VoltpayLogo />
          </Link>
        </div>
      </div>
    </header>
  );
}
