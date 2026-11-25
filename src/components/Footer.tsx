import React from 'react';

interface FooterProps {
  onNavigateSection: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateSection }) => {
  return (
    <footer className="border-t border-white/10 bg-[#06080C]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-white/10">
          <div className="md:col-span-5">
            <span className="font-display text-2xl font-extrabold tracking-wider text-white">
              RINZ <span className="text-[#3B82F6]">STORE</span>
            </span>
            <p className="mt-3 text-sm text-slate-400 leading-relaxed max-w-sm">
              Platform top up game online dan voucher digital resmi di Indonesia dengan proses otomatis 24 jam nonstop.
            </p>
          </div>

          <div className="md:col-span-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
              Navigasi
            </h3>
            <ul className="space-y-2 text-sm text-slate-300">
              <li>
                <a
                  href="#katalog"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigateSection('katalog');
                  }}
                  className="hover:text-white transition-colors"
                >
                  Katalog Game
                </a>
              </li>
              <li>
                <a
                  href="#cek-pesanan"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigateSection('cek-pesanan');
                  }}
                  className="hover:text-white transition-colors"
                >
                  Cek Pesanan
                </a>
              </li>
              <li>
                <a
                  href="#cara-topup"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigateSection('cara-topup');
                  }}
                  className="hover:text-white transition-colors"
                >
                  Cara Top Up
                </a>
              </li>
              <li>
                <a
                  href="#bantuan"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigateSection('bantuan');
                  }}
                  className="hover:text-white transition-colors"
                >
                  Pertanyaan Umum
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
              Metode Pembayaran Didukung
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              QRIS · DANA · GoPay · OVO · ShopeePay · BCA Virtual Account · Mandiri Virtual Account · BNI Virtual Account · Alfamart &amp; Indomaret
            </p>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 Rinz Store. Seluruh hak cipta dilindungi.</p>
          <p>Layanan Pelanggan: 08.00 – 23.00 WIB · support@rinzstore.id</p>
        </div>
      </div>
    </footer>
  );
};
