import React, { useState } from 'react';
import { ArrowRight, Search } from 'lucide-react';

interface HeroSectionProps {
  onExploreCatalog: () => void;
  onTrackOrder: () => void;
  onQuickSearch: (query: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreCatalog,
  onTrackOrder,
  onQuickSearch,
}) => {
  const [logoError, setLogoError] = useState(false);

  return (
    <section id="beranda" className="border-b border-white/10 bg-[#080A0F]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 pt-10 pb-12 sm:pt-14 sm:pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          <div className="lg:col-span-7 flex flex-col justify-center">
            <p className="text-sm font-medium text-[#60A5FA] mb-3 tracking-wide">
              Distributor Top Up Game Resmi Indonesia
            </p>
            <h1
              className="font-display font-extrabold tracking-tight text-white leading-[1.05] mb-5 max-w-2xl"
              style={{
                fontSize: 'clamp(2.4rem, 4.2vw, 3.85rem)',
                textWrap: 'balance',
              }}
            >
              Top Up Diamond &amp; Voucher Game Masuk dalam Hitungan Detik
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl mb-8">
              Transaksi otomatis 24 jam tanpa perlu login akun game. Cukup masukkan User ID, pilih nominal, dan bayar lewat QRIS, E-Wallet, atau Virtual Account.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={onExploreCatalog}
                className="inline-flex items-center gap-2 rounded-lg bg-[#2563EB] px-6 py-3 text-sm font-semibold text-white hover:bg-[#1D4ED8] transition-colors duration-150 min-h-[44px] whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#60A5FA]"
              >
                <span>Pilih Game Sekarang</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>

              <button
                type="button"
                onClick={onTrackOrder}
                className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-[#111622] px-5 py-3 text-sm font-medium text-slate-200 hover:bg-white/10 hover:text-white transition-colors duration-150 min-h-[44px] whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6]"
              >
                <Search className="h-4 w-4 text-slate-400" aria-hidden="true" />
                <span>Lacak Pesanan</span>
              </button>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-400">
              <span>Pencarian cepat:</span>
              {['Mobile Legends', 'Free Fire', 'Valorant', 'Genshin Impact'].map((game) => (
                <button
                  key={game}
                  type="button"
                  onClick={() => onQuickSearch(game)}
                  className="text-slate-300 hover:text-[#60A5FA] underline underline-offset-4 decoration-white/20 hover:decoration-[#60A5FA] transition-colors whitespace-nowrap shrink-0"
                >
                  {game}
                </button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 flex items-stretch">
            <div className="relative w-full overflow-hidden rounded-2xl border border-white/10 bg-black flex items-center justify-center min-h-[260px] sm:min-h-[320px] lg:h-full">
              <div
                className="pointer-events-none absolute inset-0 opacity-40"
                style={{
                  background:
                    'radial-gradient(circle at 50% 50%, rgba(37, 99, 235, 0.32), transparent 70%)',
                }}
              />
              {!logoError ? (
                <img
                  src="/assets/aistudio/Neon_RINZ_STORE_Gaming_Logo_bb13dc3e.png"
                  alt="Logo Resmi Rinz Store Gaming Top Up"
                  referrerPolicy="no-referrer"
                  onError={() => setLogoError(true)}
                  className="relative z-10 w-full h-full object-contain p-4 sm:p-6"
                />
              ) : (
                <div className="relative z-10 flex flex-col items-center justify-center p-8 text-center">
                  <span className="font-display text-5xl font-extrabold tracking-wider text-white">
                    RINZ <span className="text-[#3B82F6]">STORE</span>
                  </span>
                  <span className="mt-2 text-sm text-slate-400">
                    Top Up Game Resmi &amp; Instan
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 border-t border-white/10 pt-8">
          <div>
            <p className="font-display text-2xl sm:text-3xl font-bold text-white tabular-nums">
              1–3 Detik
            </p>
            <p className="mt-1 text-sm text-slate-400">
              Rata-rata proses pengiriman otomatis
            </p>
          </div>
          <div>
            <p className="font-display text-2xl sm:text-3xl font-bold text-white tabular-nums">
              24 / 7
            </p>
            <p className="mt-1 text-sm text-slate-400">
              Sistem aktif nonstop setiap hari
            </p>
          </div>
          <div>
            <p className="font-display text-2xl sm:text-3xl font-bold text-white tabular-nums">
              100% Resmi
            </p>
            <p className="mt-1 text-sm text-slate-400">
              Jalur legal bergaransi anti-minus
            </p>
          </div>
          <div>
            <p className="font-display text-2xl sm:text-3xl font-bold text-white tabular-nums">
              9+ Kanal
            </p>
            <p className="mt-1 text-sm text-slate-400">
              QRIS, E-Wallet, Virtual Account &amp; Gerai
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
