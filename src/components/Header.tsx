import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

interface HeaderProps {
  onNavigateSection: (sectionId: string) => void;
  onQuickTopUp: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onNavigateSection, onQuickTopUp }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLinkClick = (sectionId: string) => {
    setMobileMenuOpen(false);
    onNavigateSection(sectionId);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#080A0F]/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-8 px-4 sm:px-6">
        <a
          href="#beranda"
          onClick={(e) => {
            e.preventDefault();
            handleLinkClick('beranda');
          }}
          className="font-display text-2xl font-extrabold tracking-wider text-white whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6] rounded"
        >
          RINZ <span className="text-[#3B82F6]">STORE</span>
        </a>

        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300" aria-label="Navigasi Utama">
          <a
            href="#katalog"
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick('katalog');
            }}
            className="hover:text-white transition-colors duration-150 whitespace-nowrap shrink-0 py-1 border-b border-transparent hover:border-[#3B82F6]"
          >
            Katalog Game
          </a>
          <a
            href="#cek-pesanan"
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick('cek-pesanan');
            }}
            className="hover:text-white transition-colors duration-150 whitespace-nowrap shrink-0 py-1 border-b border-transparent hover:border-[#3B82F6]"
          >
            Cek Pesanan
          </a>
          <a
            href="#cara-topup"
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick('cara-topup');
            }}
            className="hover:text-white transition-colors duration-150 whitespace-nowrap shrink-0 py-1 border-b border-transparent hover:border-[#3B82F6]"
          >
            Cara Top Up
          </a>
          <a
            href="#bantuan"
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick('bantuan');
            }}
            className="hover:text-white transition-colors duration-150 whitespace-nowrap shrink-0 py-1 border-b border-transparent hover:border-[#3B82F6]"
          >
            Bantuan
          </a>
        </nav>

        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen(false);
              onQuickTopUp();
            }}
            className="hidden sm:inline-flex items-center justify-center rounded-lg bg-[#2563EB] px-4 py-2 text-sm font-semibold text-white hover:bg-[#1D4ED8] transition-colors duration-150 whitespace-nowrap shrink-0 min-h-[40px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#60A5FA]"
          >
            Top Up Sekarang
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="md:hidden inline-flex items-center justify-center rounded-lg border border-white/15 bg-[#111622] p-2.5 text-slate-200 hover:bg-white/10 min-w-[44px] min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6]"
            aria-label={mobileMenuOpen ? 'Tutup menu navigasi' : 'Buka menu navigasi'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t border-white/10 bg-[#0B0E16] px-4 py-4 space-y-2">
          <a
            href="#katalog"
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick('katalog');
            }}
            className="block rounded-lg px-3 py-2.5 text-sm font-medium text-slate-200 hover:bg-white/5"
          >
            Katalog Game
          </a>
          <a
            href="#cek-pesanan"
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick('cek-pesanan');
            }}
            className="block rounded-lg px-3 py-2.5 text-sm font-medium text-slate-200 hover:bg-white/5"
          >
            Cek Pesanan
          </a>
          <a
            href="#cara-topup"
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick('cara-topup');
            }}
            className="block rounded-lg px-3 py-2.5 text-sm font-medium text-slate-200 hover:bg-white/5"
          >
            Cara Top Up
          </a>
          <a
            href="#bantuan"
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick('bantuan');
            }}
            className="block rounded-lg px-3 py-2.5 text-sm font-medium text-slate-200 hover:bg-white/5"
          >
            Bantuan
          </a>
          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen(false);
              onQuickTopUp();
            }}
            className="w-full mt-2 rounded-lg bg-[#2563EB] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#1D4ED8] min-h-[44px]"
          >
            Top Up Sekarang
          </button>
        </div>
      )}
    </header>
  );
};
