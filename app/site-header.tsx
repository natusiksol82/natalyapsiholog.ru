"use client";

import { useEffect, useRef, useState } from "react";
import type { SiteContent } from "./content";

type HeaderContent = Pick<SiteContent, "brand" | "navigation">;

export function SiteHeader({ page }: { page: HeaderContent }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLElement>(null);
  const wasMenuOpen = useRef(false);

  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    const updateHeader = () => setIsScrolled(window.scrollY > 24);
    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
    return () => window.removeEventListener("scroll", updateHeader);
  }, []);

  useEffect(() => {
    if (!isMenuOpen) {
      if (wasMenuOpen.current) menuButtonRef.current?.focus();
      wasMenuOpen.current = false;
      return;
    }

    wasMenuOpen.current = true;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusFrame = window.requestAnimationFrame(() => {
      menuRef.current?.querySelector<HTMLAnchorElement>("a")?.focus();
    });

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMenu();
        return;
      }

      if (event.key !== "Tab" || !menuRef.current) return;
      const focusableItems = [
        menuButtonRef.current,
        ...menuRef.current.querySelectorAll<HTMLAnchorElement>("a"),
      ].filter((item): item is HTMLElement => item !== null);
      const firstItem = focusableItems[0];
      const lastItem = focusableItems.at(-1);

      if (event.shiftKey && document.activeElement === firstItem) {
        event.preventDefault();
        lastItem?.focus();
      } else if (!event.shiftKey && document.activeElement === lastItem) {
        event.preventDefault();
        firstItem?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMenuOpen]);

  const navigationLinks = [
    { href: "#support", label: page.navigation.support },
    { href: "#about", label: page.navigation.about },
    { href: "#reviews", label: page.navigation.reviews },
    { href: "#prices", label: page.navigation.prices },
  ];

  return (
    <header className={`site-header${isScrolled ? " is-scrolled" : ""}`}>
      <a className="brand" href="#top" aria-label={page.brand.homeLabel}>
        <span className="brand-mark">{page.brand.initial}</span>
        <span>
          <strong>{page.brand.name}</strong>
          <small>{page.brand.role}</small>
        </span>
      </a>

      <nav className="desktop-nav" aria-label={page.navigation.label}>
        {navigationLinks.map((link) => <a href={link.href} key={link.href}>{link.label}</a>)}
      </nav>

      <div className="header-actions">
        <a className="button button-small header-contact" href="#contacts">
          {page.navigation.contact}
        </a>
        <button
          ref={menuButtonRef}
          className={`menu-toggle${isMenuOpen ? " is-open" : ""}`}
          type="button"
          aria-label={isMenuOpen ? page.navigation.closeMenu : page.navigation.openMenu}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
          onClick={() => setIsMenuOpen((current) => !current)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <button
        className={`menu-backdrop${isMenuOpen ? " is-open" : ""}`}
        type="button"
        aria-label={page.navigation.closeMenu}
        tabIndex={isMenuOpen ? 0 : -1}
        onClick={closeMenu}
      />
      <aside
        ref={menuRef}
        className={`mobile-menu${isMenuOpen ? " is-open" : ""}`}
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label={page.navigation.menu}
        aria-hidden={!isMenuOpen}
      >
        <p>{page.navigation.menu}</p>
        <nav aria-label={page.navigation.label}>
          {navigationLinks.map((link, index) => (
            <a href={link.href} key={link.href} onClick={closeMenu} tabIndex={isMenuOpen ? 0 : -1}>
              <span aria-hidden="true">0{index + 1}</span>
              {link.label}
            </a>
          ))}
          <a className="mobile-menu-contact" href="#contacts" onClick={closeMenu} tabIndex={isMenuOpen ? 0 : -1}>
            <span aria-hidden="true">05</span>
            {page.navigation.contact}
          </a>
        </nav>
      </aside>
    </header>
  );
}
