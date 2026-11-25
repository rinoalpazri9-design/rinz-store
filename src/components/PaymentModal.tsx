import React, { useState } from 'react';
import { CheckCircle2, Clock, Copy, Check, Loader2, X } from 'lucide-react';
import { formatRupiah, OrderRecord, OrderStatus } from '../data/catalog';

interface PaymentModalProps {
  order: OrderRecord | null;
  onClose: () => void;
  onUpdateStatus: (invoiceId: string, nextStatus: OrderStatus, voucherPin?: string) => void;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({
  order,
  onClose,
  onUpdateStatus,
}) => {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);

  if (!order) return null;

  const handleCopy = (value: string, field: string) => {
    navigator.clipboard?.writeText(value).catch(() => {});
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 1800);
  };

  const handleSimulatePayment = () => {
    if (order.status !== 'Menunggu Pembayaran' || isSimulating) return;
    setIsSimulating(true);
    onUpdateStatus(order.invoiceId, 'Diproses');

    setTimeout(() => {
      const isVoucher = order.gameId === 'roblox' || order.gameId === 'steam-wallet';
      const pin = isVoucher
        ? `RNZ-${order.gameId === 'roblox' ? 'RBX' : 'STM'}-${Math.random()
            .toString(36)
            .substring(2, 6)
            .toUpperCase()}-${order.invoiceId.slice(-4)}`
        : undefined;
      onUpdateStatus(order.invoiceId, 'Berhasil Dikirim', pin);
      setIsSimulating(false);
    }, 1100);
  };

  const renderStatusIndicator = () => {
    if (order.status === 'Berhasil Dikirim') {
      return (
        <div className="flex items-center gap-2 text-emerald-400 text-sm font-semibold">
          <CheckCircle2 className="h-4 w-4 shrink-0" aria-hidden="true" />
          <span>Berhasil Dikirim</span>
        </div>
      );
    }
    if (order.status === 'Diproses') {
      return (
        <div className="flex items-center gap-2 text-[#60A5FA] text-sm font-semibold">
          <Loader2 className="h-4 w-4 animate-spin shrink-0" aria-hidden="true" />
          <span>Sedang Diproses</span>
        </div>
      );
    }
    return (
      <div className="flex items-center gap-2 text-amber-400 text-sm font-semibold">
        <Clock className="h-4 w-4 shrink-0" aria-hidden="true" />
        <span>Menunggu Pembayaran</span>
      </div>
    );
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="invoice-modal-title"
    >
      <div className="relative w-full max-w-lg max-h-[92vh] overflow-y-auto rounded-2xl border border-white/15 bg-[#111622] p-6 sm:p-7 shadow-2xl">
        <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <p className="text-xs text-slate-400">Invoice Transaksi</p>
            <div className="mt-1 flex items-center gap-2">
              <h2
                id="invoice-modal-title"
                className="font-mono text-base sm:text-lg font-semibold text-white"
              >
                {order.invoiceId}
              </h2>
              <button
                type="button"
                onClick={() => handleCopy(order.invoiceId, 'invoice')}
                aria-label="Salin nomor invoice"
                className="rounded p-1.5 text-slate-400 hover:bg-white/10 hover:text-white transition-colors"
              >
                {copiedField === 'invoice' ? (
                  <Check className="h-3.5 w-3.5 text-emerald-400" />
                ) : (
                  <Copy className="h-3.5 w-3.5" />
                )}
              </button>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup jendela invoice"
            className="rounded-lg p-2 text-slate-400 hover:bg-white/10 hover:text-white min-w-[40px] min-h-[40px] flex items-center justify-center"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="py-5 space-y-5">
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-400">Status Pesanan</span>
            {renderStatusIndicator()}
          </div>

          {order.status === 'Menunggu Pembayaran' && (
            <div className="rounded-xl border border-white/10 bg-[#080A0F] p-5 space-y-4">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs text-slate-400">Metode Pembayaran</p>
                  <p className="text-sm font-semibold text-white mt-0.5">
                    {order.paymentMethodName}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-slate-400">Total Tagihan</p>
                  <p className="font-mono text-lg font-bold text-[#60A5FA] tabular-nums">
                    {formatRupiah(order.total)}
                  </p>
                </div>
              </div>

              {order.paymentMethodId === 'qris' ? (
                <div className="flex flex-col items-center justify-center rounded-xl bg-white p-4">
                  <svg
                    viewBox="0 0 120 120"
                    className="w-36 h-36 text-slate-950"
                    aria-label="Kode QRIS Rinz Store"
                  >
                    <rect x="6" y="6" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="6" />
                    <rect x="14" y="14" width="16" height="16" fill="currentColor" />
                    <rect x="82" y="6" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="6" />
                    <rect x="90" y="14" width="16" height="16" fill="currentColor" />
                    <rect x="6" y="82" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="6" />
                    <rect x="14" y="90" width="16" height="16" fill="currentColor" />
                    <rect x="48" y="10" width="8" height="8" fill="currentColor" />
                    <rect x="64" y="10" width="8" height="8" fill="currentColor" />
                    <rect x="48" y="26" width="16" height="8" fill="currentColor" />
                    <rect x="10" y="48" width="14" height="8" fill="currentColor" />
                    <rect x="34" y="48" width="22" height="14" fill="currentColor" />
                    <rect x="64" y="48" width="16" height="8" fill="currentColor" />
                    <rect x="88" y="48" width="22" height="16" fill="currentColor" />
                    <rect x="10" y="66" width="8" height="8" fill="currentColor" />
                    <rect x="26" y="66" width="16" height="8" fill="currentColor" />
                    <rect x="52" y="66" width="14" height="16" fill="currentColor" />
                    <rect x="76" y="66" width="12" height="12" fill="currentColor" />
                    <rect x="48" y="90" width="16" height="14" fill="currentColor" />
                    <rect x="74" y="86" width="14" height="8" fill="currentColor" />
                    <rect x="96" y="86" width="14" height="24" fill="currentColor" />
                    <rect x="74" y="102" width="16" height="8" fill="currentColor" />
                  </svg>
                  <p className="mt-2 font-mono text-[11px] font-semibold text-slate-800">
                    NMID: ID1026000491827 · RINZ STORE
                  </p>
                </div>
              ) : (
                <div className="flex items-center justify-between gap-3 rounded-lg border border-white/10 bg-[#111622] px-4 py-3">
                  <div>
                    <p className="text-xs text-slate-400">Kode Pembayaran / Virtual Account</p>
                    <p className="font-mono text-base font-semibold text-white mt-0.5 tabular-nums">
                      {order.paymentCode}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopy(order.paymentCode, 'paycode')}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-medium text-white hover:bg-white/10"
                  >
                    {copiedField === 'paycode' ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-emerald-400" />
                        <span>Disalin</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" />
                        <span>Salin</span>
                      </>
                    )}
                  </button>
                </div>
              )}

              <button
                type="button"
                onClick={handleSimulatePayment}
                disabled={isSimulating}
                className="w-full rounded-lg bg-[#2563EB] px-4 py-3 text-sm font-semibold text-white hover:bg-[#1D4ED8] transition-colors min-h-[44px]"
              >
                Konfirmasi Pembayaran Sekarang
              </button>
            </div>
          )}

          {order.status === 'Berhasil Dikirim' && order.voucherPin && (
            <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 flex items-center justify-between gap-3">
              <div>
                <p className="text-xs text-emerald-300">Kode Voucher Digital Anda</p>
                <p className="font-mono text-sm sm:text-base font-semibold text-white mt-0.5">
                  {order.voucherPin}
                </p>
              </div>
              <button
                type="button"
                onClick={() => handleCopy(order.voucherPin!, 'pin')}
                className="rounded-lg border border-emerald-400/30 bg-emerald-500/20 px-3 py-1.5 text-xs font-medium text-emerald-100 hover:bg-emerald-500/30"
              >
                {copiedField === 'pin' ? 'Disalin' : 'Salin Kode'}
              </button>
            </div>
          )}

          <div className="space-y-2.5 border-t border-white/10 pt-4 text-sm">
            <div className="flex justify-between gap-4">
              <span className="text-slate-400">Produk</span>
              <span className="text-white font-medium text-right">
                {order.gameTitle} — {order.packageName} ({order.quantity}x)
              </span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-slate-400">Data Akun</span>
              <span className="font-mono text-white text-right">
                {order.userId}
                {order.zoneOrServer ? ` (${order.zoneOrServer})` : ''}
              </span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-slate-400">Waktu Transaksi</span>
              <span className="text-slate-300 text-right">{order.createdAt}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-slate-400">Subtotal &amp; Biaya</span>
              <span className="font-mono text-slate-200 tabular-nums">
                {formatRupiah(order.subtotal + order.fee)}
              </span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between gap-4 text-emerald-400">
                <span>Diskon ({order.promoCode})</span>
                <span className="font-mono tabular-nums">- {formatRupiah(order.discount)}</span>
              </div>
            )}
            <div className="flex justify-between gap-4 border-t border-white/10 pt-3 font-semibold text-white">
              <span>Total Dibayar</span>
              <span className="font-mono text-base tabular-nums">{formatRupiah(order.total)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
