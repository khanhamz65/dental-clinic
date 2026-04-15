"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  Phone,
  Clock,
  MapPin,
  ArrowRight,
  Instagram,
  Facebook,
  Twitter,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },
    { href: "/services", label: "Services" },
    { href: "/contact", label: "Contact" },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <>
      {/* Top info strip */}
      <div className="hidden md:block bg-foreground text-background/70 text-xs">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 py-2 flex items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <a
              href="tel:0001234567"
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Phone className="w-3 h-3" />
              (000) 123-4567
            </a>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3 h-3" />
              Mon–Fri: 8AM – 6PM &nbsp;|&nbsp; Sat: 9AM – 2PM
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3 h-3" />
            123 Luminous Ave, Suite 400, San Francisco, CA
          </div>
        </div>
      </div>

      {/* Main navbar */}
      <header
        className={`sticky top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-lg shadow-md border-b border-border/60"
            : "bg-white/90 backdrop-blur-sm border-b border-border/40"
        }`}
      >
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex items-center justify-between h-[70px]">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group flex-shrink-0">
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center text-white transition-all duration-300 shadow-md ${
                  isScrolled ? "bg-primary shadow-primary/25" : "bg-primary/90"
                }`}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 2C8.686 2 6 4.686 6 8c0 2.21 1.251 4.134 3.09 5.232C9.045 13.917 9 14.446 9 15c0 1.657 1.343 3 3 3s3-1.343 3-3c0-.554-.045-1.083-.09-1.768C16.749 12.134 18 10.21 18 8c0-3.314-2.686-6-6-6z" />
                  <path d="M10 18v2c0 1.1.9 2 2 2s2-.9 2-2v-2" />
                </svg>
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-[17px] font-serif font-bold text-foreground group-hover:text-primary transition-colors">
                  BrightSmile
                </span>
                <span className="text-[10px] font-medium tracking-widest text-muted-foreground uppercase">
                  Dental
                </span>
              </div>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`nav-link text-sm font-medium px-4 py-2 rounded-lg transition-colors ${
                    isActive(link.href)
                      ? "text-primary active"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center gap-3">
              <a
                href="tel:0001234567"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors font-medium"
              >
                <Phone className="w-4 h-4" />
                <span className="hidden lg:inline">(000) 123-4567</span>
              </a>
              <Link href="/appointment">
                <Button className="rounded-full h-10 px-5 text-sm shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/25 transition-all hover:-translate-y-0.5 group">
                  Book Appointment
                  <ArrowRight className="w-3.5 h-3.5 ml-1.5 group-hover:translate-x-0.5 transition-transform" />
                </Button>
              </Link>
            </div>

            {/* Mobile toggle */}
            <button
              className="md:hidden p-2 rounded-lg text-foreground hover:bg-secondary transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border bg-white shadow-xl animate-in slide-in-from-top-2 duration-200">
            <div className="container mx-auto px-4 py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-base font-medium px-4 py-3 rounded-xl transition-colors ${
                    isActive(link.href)
                      ? "bg-primary/10 text-primary"
                      : "text-foreground hover:bg-secondary"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-3 pt-3 border-t border-border flex flex-col gap-3">
                <a
                  href="tel:0001234567"
                  className="flex items-center gap-2 px-4 py-2 text-sm text-muted-foreground"
                >
                  <Phone className="w-4 h-4 text-primary" />
                  (000) 123-4567
                </a>
                <Link href="/appointment" onClick={() => setMobileMenuOpen(false)}>
                  <Button className="w-full rounded-full">
                    Book Appointment
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}

export function Footer() {
  return (
    <footer className="bg-foreground text-white/70">
      {/* CTA strip */}
      <div
        style={{
          background:
            "linear-gradient(135deg, hsl(214 82% 48%) 0%, hsl(196 80% 38%) 100%)",
        }}
        className="py-12"
      >
        <div className="container mx-auto px-4 md:px-6 lg:px-8 text-center">
          <h3 className="text-2xl md:text-3xl font-serif font-bold text-white mb-3">
            Ready to transform your smile?
          </h3>
          <p className="text-white/80 mb-6 max-w-xl mx-auto">
            Join over 2,400 patients who trust BrightSmile for their dental care.
          </p>
          <Link href="/appointment">
            <Button className="rounded-full bg-white text-primary hover:bg-white/90 px-8 h-12 text-sm font-semibold shadow-xl hover:-translate-y-0.5 transition-all">
              Book Your Appointment
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Main footer */}
      <div className="py-16">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2.5 mb-5">
                <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 2C8.686 2 6 4.686 6 8c0 2.21 1.251 4.134 3.09 5.232C9.045 13.917 9 14.446 9 15c0 1.657 1.343 3 3 3s3-1.343 3-3c0-.554-.045-1.083-.09-1.768C16.749 12.134 18 10.21 18 8c0-3.314-2.686-6-6-6z" />
                    <path d="M10 18v2c0 1.1.9 2 2 2s2-.9 2-2v-2" />
                  </svg>
                </div>
                <div className="flex flex-col leading-none">
                  <span className="text-[17px] font-serif font-bold text-white">
                    BrightSmile
                  </span>
                  <span className="text-[10px] font-medium tracking-widest text-white/40 uppercase">
                    Dental
                  </span>
                </div>
              </div>
              <p className="text-sm leading-relaxed mb-6">
                Premium dental care in a calm, modern environment. Clinical
                excellence meets genuine hospitality.
              </p>
              <div className="flex items-center gap-3">
                {[Facebook, Instagram, Twitter].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary hover:text-white transition-all"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-sm font-semibold text-white uppercase tracking-widest mb-5">
                Quick Links
              </h4>
              <ul className="space-y-3 text-sm">
                {[
                  { href: "/", label: "Home" },
                  { href: "/about", label: "About Us" },
                  { href: "/services", label: "Services" },
                  { href: "/contact", label: "Contact" },
                  { href: "/appointment", label: "Book Appointment" },
                ].map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="hover:text-white transition-colors flex items-center gap-1.5 group"
                    >
                      <ChevronDown className="w-3 h-3 -rotate-90 text-primary/60 group-hover:text-primary transition-colors" />
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-sm font-semibold text-white uppercase tracking-widest mb-5">
                Contact
              </h4>
              <ul className="space-y-4 text-sm">
                <li className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <span>
                    123 Luminous Ave, Suite 400
                    <br />
                    San Francisco, CA 94107
                  </span>
                </li>
                <li>
                  <a
                    href="tel:0001234567"
                    className="flex items-center gap-3 hover:text-white transition-colors"
                  >
                    <Phone className="w-4 h-4 text-primary shrink-0" />
                    (000) 123-4567
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:hello@brightsmile.com"
                    className="flex items-center gap-3 hover:text-white transition-colors"
                  >
                    <svg
                      className="w-4 h-4 text-primary shrink-0"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect width="20" height="16" x="2" y="4" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                    hello@brightsmile.com
                  </a>
                </li>
              </ul>
            </div>

            {/* Hours */}
            <div>
              <h4 className="text-sm font-semibold text-white uppercase tracking-widest mb-5">
                Office Hours
              </h4>
              <ul className="space-y-3 text-sm">
                {[
                  { day: "Mon – Thu", hours: "8:00 AM – 6:00 PM" },
                  { day: "Friday", hours: "8:00 AM – 4:00 PM" },
                  { day: "Saturday", hours: "9:00 AM – 2:00 PM" },
                  { day: "Sunday", hours: "Closed" },
                ].map((h) => (
                  <li key={h.day} className="flex items-center justify-between gap-4">
                    <span>{h.day}</span>
                    <span
                      className={
                        h.hours === "Closed"
                          ? "text-white/30"
                          : "text-white/90 font-medium"
                      }
                    >
                      {h.hours}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-14 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/30">
            <p>
              © {new Date().getFullYear()} BrightSmile Dental. All rights
              reserved.
            </p>
            <div className="flex gap-5">
              <a href="#" className="hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Terms of Service
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Accessibility
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
