import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const STEPS = [
  {
    number: '01.',
    title: 'Pilih Game & Masukkan ID',
    description:
      'Pilih judul game di katalog Rinz Store lalu masukkan User ID serta Zone ID atau Server akun Anda dengan tepat.',
  },
  {
    number: '02.',
    title: 'Tentukan Nominal & Pembayaran',
    description:
      'Pilih paket diamond, UC, VP, atau voucher yang diinginkan, lalu bayar melalui QRIS, E-Wallet, Virtual Account, atau Gerai Retail.',
  },
  {
    number: '03.',
    title: 'Item Masuk Otomatis',
    description:
      'Setelah pembayaran terkonfirmasi, pesanan diproses otomatis dalam 1–3 detik dan masuk langsung ke akun game Anda.',
  },
];

const FAQS = [
  {
    question: 'Apakah top up di Rinz Store aman dan legal?',
    answer:
      'Ya. Seluruh produk top up dan voucher game di Rinz Store bersumber dari jalur distribusi resmi sehingga aman untuk akun Anda dan bebas risiko minus atau banned.',
  },
  {
    question: 'Berapa lama proses pengiriman diamond atau voucher?',
    answer:
      'Pesanan diproses otomatis oleh sistem dalam 1–3 detik setelah pembayaran terverifikasi. Pada kondisi maintenance server publisher, proses maksimal memakan waktu beberapa menit.',
  },
  {
    question: 'Bagaimana jika salah memasukkan User ID atau Zone ID?',
    answer:
      'Pastikan Anda memeriksa ulang User ID dan Zone ID sebelum menekan Bayar Sekarang. Jika transaksi sudah berhasil terkirim ke ID yang dimasukkan, pesanan tidak dapat dibatalkan.',
  },
  {
    question: 'Kode promo apa yang bisa digunakan saat checkout?',
    answer:
      'Anda dapat mencoba kode RINZBARU untuk potongan Rp 3.000 (minimal belanja Rp 20.000) atau DIAMOND5 untuk diskon 5% hingga Rp 10.000 (minimal belanja Rp 50.000).',
  },
];

export const HowItWorks: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="cara-topup" className="border-t border-white/10 bg-[#080A0F]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12 sm:py-16 space-y-16">
        <div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Cara Top Up di Rinz Store
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-400 max-w-2xl">
            Tiga langkah ringkas tanpa perlu registrasi akun maupun kata sandi game Anda.
          </p>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            {STEPS.map((step) => (
              <div
                key={step.number}
                className="rounded-2xl border border-white/10 bg-[#111622] p-6"
              >
                <span className="font-display text-2xl font-bold text-[#60A5FA] tabular-nums">
                  {step.number}
                </span>
                <h3 className="mt-2 text-lg font-semibold text-white">{step.title}</h3>
                <p className="mt-2 text-sm text-slate-400 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div id="bantuan" className="border-t border-white/10 pt-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-4">
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
                Pertanyaan Umum
              </h2>
              <p className="mt-2 text-sm sm:text-base text-slate-400 leading-relaxed">
                Informasi seputar keamanan akun, kecepatan proses, dan dukungan pelanggan Rinz Store.
              </p>
            </div>

            <div className="lg:col-span-8 divide-y divide-white/10 border-y border-white/10">
              {FAQS.map((faq, idx) => {
                const isOpen = openIndex === idx;
                return (
                  <div key={faq.question}>
                    <button
                      type="button"
                      onClick={() => setOpenIndex(isOpen ? null : idx)}
                      aria-expanded={isOpen}
                      className="w-full flex items-center justify-between gap-4 py-4 text-left text-sm sm:text-base font-medium text-white hover:text-[#60A5FA] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6]"
                    >
                      <span>{faq.question}</span>
                      <ChevronDown
                        className={`h-4 w-4 text-slate-400 shrink-0 transition-transform duration-150 ${
                          isOpen ? 'rotate-180 text-[#60A5FA]' : ''
                        }`}
                        aria-hidden="true"
                      />
                    </button>
                    {isOpen && (
                      <p className="pb-4 text-sm text-slate-400 leading-relaxed max-w-2xl">
                        {faq.answer}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
