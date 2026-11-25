import React, { useState } from 'react';
import { CheckCircle2, Clock, Loader2, Search } from 'lucide-react';
import { formatRupiah, OrderRecord, OrderStatus } from '../data/catalog';

interface OrderTrackerProps {
  orders: OrderRecord[];
  onInspectOrder: (order: OrderRecord) => void;
}

export const OrderTracker: React.FC<OrderTrackerProps> = ({ orders, onInspectOrder }) => {
  const [invoiceQuery, setInvoiceQuery] = useState('');
  const [searchedInvoice, setSearchedInvoice] = useState<string | null>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchedInvoice(invoiceQuery.trim().toUpperCase());
  };

  const matchedOrder = searchedInvoice
    ? orders.find((o) => o.invoiceId.toUpperCase() === searchedInvoice)
    : null;

  const renderStatus = (status: OrderStatus) => {
    if (status === 'Berhasil Dikirim') {
      return (
        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-400 whitespace-nowrap">
          <CheckCircle2 className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          Berhasil Dikirim
        </span>
      );
    }
    if (status === 'Diproses') {
      return (
        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-[#60A5FA] whitespace-nowrap">
          <Loader2 className="h-3.5 w-3.5 animate-spin shrink-0" aria-hidden="true" />
          Diproses
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 text-xs font-medium text-amber-400 whitespace-nowrap">
        <Clock className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
        Menunggu Pembayaran
      </span>
    );
  };

  return (
    <section id="cek-pesanan" className="border-t border-white/10 bg-[#0B0E16]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Cek Status Pesanan
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-400 leading-relaxed">
              Masukkan nomor invoice Anda (contoh: <span className="font-mono text-slate-300">RNZ-261124-8841</span>) untuk melihat detail pembayaran dan pengiriman item.
            </p>

            <form onSubmit={handleSearch} className="mt-5 flex gap-2">
              <div className="relative flex-1">
                <Search
                  className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400"
                  aria-hidden="true"
                />
                <input
                  type="text"
                  value={invoiceQuery}
                  onChange={(e) => setInvoiceQuery(e.target.value)}
                  placeholder="Masukkan nomor invoice RNZ-..."
                  aria-label="Nomor Invoice"
                  className="w-full rounded-lg border border-white/15 bg-[#111622] pl-10 pr-4 py-2.5 font-mono text-sm uppercase text-white placeholder:text-slate-500 placeholder:normal-case focus:border-[#3B82F6] focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/30 min-h-[44px]"
                />
              </div>
              <button
                type="submit"
                className="rounded-lg bg-[#2563EB] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#1D4ED8] transition-colors whitespace-nowrap shrink-0 min-h-[44px]"
              >
                Lacak
              </button>
            </form>

            {searchedInvoice && (
              <div className="mt-4 rounded-xl border border-white/10 bg-[#111622] p-4">
                {matchedOrder ? (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-3">
                      <span className="font-mono text-sm font-semibold text-white">
                        {matchedOrder.invoiceId}
                      </span>
                      {renderStatus(matchedOrder.status)}
                    </div>
                    <p className="text-sm text-slate-300">
                      {matchedOrder.gameTitle} · {matchedOrder.packageName}
                    </p>
                    <div className="flex items-center justify-between pt-2 border-t border-white/10">
                      <span className="font-mono text-sm text-white tabular-nums">
                        {formatRupiah(matchedOrder.total)}
                      </span>
                      <button
                        type="button"
                        onClick={() => onInspectOrder(matchedOrder)}
                        className="text-xs font-semibold text-[#60A5FA] hover:text-white"
                      >
                        Lihat Invoice Lengkap
                      </button>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-slate-400">
                    Invoice <span className="font-mono text-white">{searchedInvoice}</span> tidak ditemukan. Periksa kembali penulisan nomor invoice Anda.
                  </p>
                )}
              </div>
            )}
          </div>

          <div className="lg:col-span-7">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-slate-200">
                Riwayat Transaksi Terbaru
              </h3>
              <span className="text-xs text-slate-400">Klik baris untuk detail</span>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-white/10 bg-[#111622]">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/10 text-xs text-slate-400">
                    <th className="py-3 px-4 font-medium">Invoice</th>
                    <th className="py-3 px-4 font-medium">Produk</th>
                    <th className="py-3 px-4 font-medium">Total</th>
                    <th className="py-3 px-4 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10 text-sm">
                  {orders.slice(0, 6).map((order) => (
                    <tr
                      key={order.invoiceId}
                      onClick={() => onInspectOrder(order)}
                      className="cursor-pointer hover:bg-white/5 transition-colors"
                    >
                      <td className="py-3.5 px-4 font-mono text-xs sm:text-sm text-white whitespace-nowrap">
                        {order.invoiceId}
                      </td>
                      <td className="py-3.5 px-4 text-slate-300">
                        <span className="block font-medium text-white truncate max-w-[180px]">
                          {order.gameTitle}
                        </span>
                        <span className="block text-xs text-slate-400 truncate max-w-[180px]">
                          {order.packageName}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 font-mono text-slate-200 tabular-nums whitespace-nowrap">
                        {formatRupiah(order.total)}
                      </td>
                      <td className="py-3.5 px-4">{renderStatus(order.status)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
