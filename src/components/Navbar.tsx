import React, { useState } from 'react';
import { getConsultationUrl } from '../utils/whatsapp';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const consultationUrl = getConsultationUrl('konsultasi umum');

  const navLinks = [
    { name: 'Koleksi', href: '#koleksi' },
    { name: 'Finishing', href: '#finishing' },
    { name: 'Keunggulan', href: '#keunggulan' },
    { name: 'Tentang MOMO', href: '#tentang' }
  ];

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-zinc-100 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* MOMO Brand Logo */}
        <a href="#" className="flex items-center gap-3 group" aria-label="MOMO Pintu Kayu Beranda">
          <img
            src="/images/momo/logo/logo-momo-red.png"
            alt="MOMO"
            className="h-7 w-auto object-contain transition-transform group-hover:scale-105"
            width="90"
            height="28"
          />
          <div className="h-4 w-px bg-zinc-300"></div>
          <span className="text-[11px] font-bold uppercase tracking-widest text-zinc-500">
            Pintu Kayu
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-9 text-xs tracking-wider uppercase font-semibold text-zinc-600">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="hover:text-momo-red transition-colors"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Desktop CTA Button */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href={consultationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-momo-dark text-white hover:bg-black px-5 py-2.5 rounded-full text-xs font-semibold tracking-wide transition-all shadow-sm"
          >
            <span>Konsultasi</span>
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24">
              <path d="M14 5l7 7m0 0l-7 7m7-7H3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>

        {/* Mobile Menu Toggle Button */}
        <div className="flex md:hidden items-center gap-2">
          <a
            href={consultationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center bg-momo-red text-white text-[11px] font-semibold px-3 py-1.5 rounded-full"
          >
            Konsultasi
          </a>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-zinc-700 hover:text-momo-red hover:bg-zinc-100 transition-colors focus:outline-none focus:ring-2 focus:ring-momo-red"
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-zinc-100 bg-white/98 backdrop-blur-md px-4 pt-3 pb-6 shadow-xl transition-all">
          <nav className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={handleLinkClick}
                className="px-3 py-2 text-sm font-semibold uppercase tracking-wider text-zinc-700 hover:text-momo-red hover:bg-red-50/50 rounded-lg transition-colors"
              >
                {link.name}
              </a>
            ))}
            <div className="pt-2 border-t border-zinc-100">
              <a
                href={consultationUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleLinkClick}
                className="w-full inline-flex items-center justify-center gap-2 bg-momo-dark text-white hover:bg-black px-5 py-3 rounded-full text-xs font-semibold tracking-wide shadow-sm"
              >
                <span>Konsultasi WhatsApp</span>
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24">
                  <path d="M14 5l7 7m0 0l-7 7m7-7H3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
