/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface NavbarProps {
  theme: "dark" | "light";
  toggleTheme: () => void;
  onOpenInbox: () => void;
}

export default function Navbar({
  theme,
  toggleTheme,
  onOpenInbox,
}: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const navLinks = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "portfolio", label: "Portfolio" },
    { id: "stories", label: "Stories" },
    { id: "services", label: "Services" },
    { id: "contact", label: "Contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Simple active link tracking
      const scrollPosition = window.scrollY + 120;
      for (const link of navLinks) {
        const el = document.getElementById(link.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(link.id);
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = (id: string) => {
    setIsMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setActiveSection(id);
    }
  };

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 ${
        isScrolled
          ? "py-4 bg-neutral-950/85 dark:bg-neutral-950/85 light:bg-stone-50/85 backdrop-blur-md border-b border-white/[0.06] shadow-sm"
          : "py-6 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Brand Logo */}
        <button
          onClick={() => handleLinkClick("home")}
          className="text-left font-montserrat text-lg md:text-xl tracking-[0.2em] font-semibold uppercase focus:outline-none cursor-pointer"
          id="navbar-logo"
        >
          MOMENT <span className="font-light text-neutral-400">MAKERZ</span>
        </button>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center gap-8" id="desktop-nav">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleLinkClick(link.id)}
              className={`font-sans text-xs tracking-[0.2em] uppercase transition-colors relative py-1 focus:outline-none cursor-pointer ${
                activeSection === link.id
                  ? "text-white dark:text-white light:text-neutral-900 font-medium"
                  : "text-neutral-400 dark:text-neutral-400 light:text-neutral-500 hover:text-white dark:hover:text-white light:hover:text-neutral-900"
              }`}
            >
              {link.label}
              {activeSection === link.id && (
                <motion.span
                  layoutId="activeNavLine"
                  className="absolute bottom-0 left-0 w-full h-[1px] bg-white dark:bg-white light:bg-neutral-900"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </button>
          ))}
        </nav>

        {/* Navigation CTAs / Tools */}
        <div className="flex items-center gap-4">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full border border-white/10 dark:border-white/10 light:border-neutral-200 hover:bg-white/5 dark:hover:bg-white/5 light:hover:bg-neutral-100 transition-all cursor-pointer focus:outline-none"
            title={`Switch to ${theme === "dark" ? "Light" : "Dark"} Mode`}
            aria-label="Toggle Theme"
            id="theme-toggle"
          >
            {theme === "dark" ? (
              <Sun className="w-4 h-4 text-neutral-300" />
            ) : (
              <Moon className="w-4 h-4 text-neutral-600" />
            )}
          </button>

          {/* Quick Enquiries Button for Admins */}
          <button
            onClick={onOpenInbox}
            className="hidden sm:inline-flex px-4 py-1.5 border border-neutral-700 hover:border-neutral-400 dark:border-neutral-700 dark:hover:border-neutral-400 light:border-neutral-300 light:hover:border-neutral-500 rounded-full text-[10px] tracking-widest uppercase text-neutral-300 dark:text-neutral-300 light:text-neutral-600 transition-all cursor-pointer focus:outline-none"
            id="inbox-quick-btn"
          >
            Enquiries
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-full border border-white/10 dark:border-white/10 light:border-neutral-200 hover:bg-white/5 transition-all cursor-pointer focus:outline-none"
            aria-label="Toggle Mobile Menu"
            id="mobile-menu-toggle"
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5 text-neutral-300 dark:text-neutral-300 light:text-neutral-600" />
            ) : (
              <Menu className="w-5 h-5 text-neutral-300 dark:text-neutral-300 light:text-neutral-600" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-drawer"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden w-full bg-neutral-950 dark:bg-neutral-950 light:bg-stone-100 border-b border-white/[0.06] overflow-hidden"
          >
            <div className="px-6 py-8 flex flex-col gap-6">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className={`text-left font-serif text-lg tracking-widest uppercase transition-colors py-2 border-b border-neutral-850 focus:outline-none cursor-pointer ${
                    activeSection === link.id
                      ? "text-white dark:text-white light:text-neutral-900 font-medium pl-2"
                      : "text-neutral-400 dark:text-neutral-400 light:text-neutral-500"
                  }`}
                >
                  {link.label}
                </button>
              ))}

              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenInbox();
                }}
                className="w-full mt-4 py-3 bg-neutral-900 dark:bg-neutral-900 light:bg-neutral-200 text-center rounded-lg text-xs tracking-widest uppercase font-semibold text-neutral-300 dark:text-neutral-300 light:text-neutral-700"
              >
                Inquiry Inbox
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
