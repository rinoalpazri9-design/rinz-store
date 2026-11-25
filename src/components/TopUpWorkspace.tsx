import React, { useMemo, useState } from 'react';
import { ArrowLeft, Check, Minus, Plus, ShieldCheck, Zap } from 'lucide-react';
import {
  calculatePaymentFee,
  formatRupiah,
  GameProduct,
  OrderRecord,
  PAYMENT_METHODS,
  PaymentMethod,
  PROMO_CODES,
  TopUpPackage,
} from '../data/catalog';
import { GameArtwork } from './GameArtwork';

interface TopUpWorkspaceProps {
  game: GameProduct;
  onBack: () => void;
  onOrderCreated: (order: OrderRecord) => void;
}

export const TopUpWorkspace: React.FC<TopUpWorkspaceProps> = ({
  game,
  onBack,
  onOrderCreated,
}) => {
  const [userId, setUserId] = useState('');
  const [zoneOrServer, setZoneOrServer] = useState(
    game.serverOptions ? game.serverOptions[0] : ''
  );
  const [selectedPkg, setSelectedPkg] = useState<TopUpPackage>(game.packages[0]);
  const [quantity, setQuantity] = useState(1);
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod>(PAYMENT_METHODS[0]);
  const [whatsapp, setWhatsapp] = useState('');
  const [promoInput, setPromoInput] = useState('');
  const [appliedPromoCode, setAppliedPromoCode] = useState<string | null>(null);
  const [promoFeedback, setPromoFeedback] = useState<{ type: 'success' | 'error'; text: string } | null>(
    null
  );
  const [formError, setFormError] = useState<string | null>(null);

  const subtotal = selectedPkg.price * quantity;
  const fee = calculatePaymentFee(subtotal, selectedPayment);

  const discount = useMemo(() => {
    if (!appliedPromoCode) return 0;
    const promo = PROMO_CODES.find((p) => p.code === appliedPromoCode);
    if (!promo || subtotal < promo.minSpend) return 0;
    if (promo.type === 'flat') return promo.value;
    const raw = Math.round((subtotal * promo.value) / 100);
    return promo.maxDiscount ? Math.min(raw, promo.maxDiscount) : raw;
  }, [appliedPromoCode, subtotal]);

  const totalAmount = Math.max(0, subtotal + fee - discount);

  const handleApplyPromo = () => {
    const cleanCode = promoInput.trim().toUpperCase();
    if (!cleanCode) {
      setAppliedPromoCode(null);
      setPromoFeedback({ type: 'error', text: 'Masukkan kode promo terlebih dahulu.' });
      return;
    }
    const found = PROMO_CODES.find((p) => p.code === cleanCode);
    if (!found) {
      setAppliedPromoCode(null);
      setPromoFeedback({
        type: 'error',
        text: 'Kode tidak dikenali. Coba kode RINZBARU atau DIAMOND5.',
      });
      return;
    }
    if (subtotal < found.minSpend) {
      setAppliedPromoCode(null);
      setPromoFeedback({
        type: 'error',
        text: `Minimal transaksi ${formatRupiah(found.minSpend)} untuk memakai kode ${found.code}.`,
      });
      return;
    }
    setAppliedPromoCode(found.code);
    setPromoFeedback({
      type: 'success',
      text: `Kode ${found.code} aktif (${found.description}).`,
    });
  };

  const handleFillExample = () => {
    setUserId(game.exampleId);
    if (game.requiresZone && game.exampleZone) {
      setZoneOrServer(game.exampleZone);
    }
    setFormError(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId.trim()) {
      setFormError(`Mohon isi ${game.idLabel} akun Anda terlebih dahulu.`);
      return;
    }
    if (game.requiresZone && !zoneOrServer.trim()) {
      setFormError(`Mohon isi ${game.zoneLabel || 'Zone ID'} akun Anda.`);
      return;
    }
    const cleanWa = whatsapp.trim();
    if (!cleanWa || cleanWa.length < 9) {
      setFormError('Masukkan nomor WhatsApp aktif untuk pengiriman bukti transaksi.');
      return;
    }

    setFormError(null);
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const now = new Date();
    const dateStamp = `${String(now.getDate()).padStart(2, '0')}${String(
      now.getMonth() + 1
    ).padStart(2, '0')}${String(now.getFullYear()).slice(-2)}`;
    const invoiceId = `RNZ-${dateStamp}-${randomNum}`;
    const formattedDate = now.toLocaleDateString('id-ID', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
    const formattedTime = now.toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit',
    });

    const newOrder: OrderRecord = {
      invoiceId,
      createdAt: `${formattedDate}, ${formattedTime} WIB`,
      gameId: game.id,
      gameTitle: game.title,
      packageName: selectedPkg.name,
      quantity,
      userId: userId.trim(),
      zoneOrServer: game.requiresZone || game.serverOptions ? zoneOrServer.trim() : undefined,
      whatsapp: cleanWa,
      paymentMethodId: selectedPayment.id,
      paymentMethodName: selectedPayment.name,
      paymentCode: `${selectedPayment.accountPrefix}-${randomNum}`,
      subtotal,
      fee,
      discount,
      promoCode: appliedPromoCode && discount > 0 ? appliedPromoCode : undefined,
      total: totalAmount,
      status: 'Menunggu Pembayaran',
    };

    onOrderCreated(newOrder);
  };

  const paymentGroups: Array<PaymentMethod['group']> = [
    'QRIS',
    'E-Wallet',
    'Virtual Account',
    'Gerai Retail',
  ];

  return (
    <section className="mx-auto max-w-6xl px-4 sm:px-6 py-8 sm:py-12">
      <button
        type="button"
        onClick={onBack}
        className="inline-flex items-center gap-2 text-sm font-medium text-slate-300 hover:text-white transition-colors mb-6 min-h-[40px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6] rounded"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        <span>Kembali ke Katalog Game</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
        <aside className="lg:col-span-4 lg:sticky lg:top-24 rounded-2xl border border-white/10 bg-[#111622] overflow-hidden">
          <GameArtwork
            gameId={game.id}
            imageSrc={game.imageSrc}
            accentHex={game.accentHex}
            secondaryHex={game.secondaryHex}
            title={game.title}
            className="w-full aspect-video"
          />
          <div className="p-6 space-y-5">
            <div>
              <p className="text-xs text-slate-400">
                {game.publisher} · {game.category}
              </p>
              <h1 className="mt-1 font-display text-3xl font-bold text-white tracking-tight">
                {game.title}
              </h1>
            </div>

            <div className="space-y-2.5 border-t border-white/10 pt-4 text-sm text-slate-300">
              <div className="flex items-center gap-2.5">
                <Zap className="h-4 w-4 text-[#60A5FA] shrink-0" aria-hidden="true" />
                <span>Proses otomatis {game.processTime}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="h-4 w-4 text-[#60A5FA] shrink-0" aria-hidden="true" />
                <span>Produk resmi bergaransi Rinz Store</span>
              </div>
            </div>

            <div className="border-t border-white/10 pt-4">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                Panduan Menemukan ID
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">{game.guideText}</p>
            </div>
          </div>
        </aside>

        <form onSubmit={handleSubmit} className="lg:col-span-8 space-y-10" noValidate>
          <div className="rounded-2xl border border-white/10 bg-[#111622] p-6 sm:p-8 space-y-10">
            <div>
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <h2 className="font-display text-2xl font-bold text-white">
                  01. Lengkapi Data Akun
                </h2>
                <button
                  type="button"
                  onClick={handleFillExample}
                  className="text-xs font-medium text-[#60A5FA] hover:text-white underline underline-offset-4 transition-colors"
                >
                  Isi Contoh ID
                </button>
              </div>

              <div
                className={`grid grid-cols-1 ${
                  game.requiresZone || game.serverOptions ? 'sm:grid-cols-2' : ''
                } gap-4`}
              >
                <div>
                  <label
                    htmlFor="game-user-id"
                    className="block text-sm font-medium text-slate-200 mb-2"
                  >
                    {game.idLabel}
                  </label>
                  <input
                    id="game-user-id"
                    type="text"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    placeholder={game.idPlaceholder}
                    className="w-full rounded-lg border border-white/15 bg-[#080A0F] px-4 py-2.5 font-mono text-sm text-white placeholder:text-slate-500 focus:border-[#3B82F6] focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/30 min-h-[44px]"
                  />
                </div>

                {game.requiresZone && (
                  <div>
                    <label
                      htmlFor="game-zone-id"
                      className="block text-sm font-medium text-slate-200 mb-2"
                    >
                      {game.zoneLabel || 'Zone ID'}
                    </label>
                    <input
                      id="game-zone-id"
                      type="text"
                      value={zoneOrServer}
                      onChange={(e) => setZoneOrServer(e.target.value)}
                      placeholder={game.zonePlaceholder || 'Contoh: 2941'}
                      className="w-full rounded-lg border border-white/15 bg-[#080A0F] px-4 py-2.5 font-mono text-sm text-white placeholder:text-slate-500 focus:border-[#3B82F6] focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/30 min-h-[44px]"
                    />
                  </div>
                )}

                {game.serverOptions && (
                  <div>
                    <label
                      htmlFor="game-server"
                      className="block text-sm font-medium text-slate-200 mb-2"
                    >
                      Server Akun
                    </label>
                    <select
                      id="game-server"
                      value={zoneOrServer}
                      onChange={(e) => setZoneOrServer(e.target.value)}
                      className="w-full rounded-lg border border-white/15 bg-[#080A0F] px-4 py-2.5 text-sm text-white focus:border-[#3B82F6] focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/30 min-h-[44px]"
                    >
                      {game.serverOptions.map((srv) => (
                        <option key={srv} value={srv}>
                          {srv}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
            </div>

            <div className="border-t border-white/10 pt-8">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                <h2 className="font-display text-2xl font-bold text-white">
                  02. Pilih Nominal {game.currencyName}
                </h2>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400">Jumlah:</span>
                  <div className="inline-flex items-center rounded-lg border border-white/15 bg-[#080A0F]">
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      aria-label="Kurangi jumlah"
                      className="p-2 text-slate-300 hover:text-white disabled:opacity-40 min-w-[36px] min-h-[36px] flex items-center justify-center"
                      disabled={quantity <= 1}
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <span className="w-8 text-center font-mono text-sm font-semibold text-white tabular-nums">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => Math.min(10, q + 1))}
                      aria-label="Tambah jumlah"
                      className="p-2 text-slate-300 hover:text-white disabled:opacity-40 min-w-[36px] min-h-[36px] flex items-center justify-center"
                      disabled={quantity >= 10}
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {game.packages.map((pkg) => {
                  const isSelected = selectedPkg.id === pkg.id;
                  return (
                    <button
                      key={pkg.id}
                      type="button"
                      onClick={() => setSelectedPkg(pkg)}
                      aria-pressed={isSelected}
                      className={`relative text-left rounded-xl border p-4 transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6] ${
                        isSelected
                          ? 'border-[#3B82F6] bg-[#2563EB]/15'
                          : 'border-white/10 bg-[#080A0F] hover:border-white/25'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span className="text-sm font-semibold text-white leading-snug">
                          {pkg.name}
                        </span>
                        {isSelected && (
                          <Check
                            className="h-4 w-4 text-[#60A5FA] shrink-0 mt-0.5"
                            aria-hidden="true"
                          />
                        )}
                      </div>
                      <p className="mt-1 text-xs text-slate-400">
                        {pkg.currencyAmount}
                        {pkg.bonus ? ` · ${pkg.bonus}` : ''}
                      </p>
                      <div className="mt-3 flex items-baseline justify-between gap-2">
                        <span className="font-mono text-sm font-semibold text-white tabular-nums">
                          {formatRupiah(pkg.price)}
                        </span>
                        {pkg.tag && (
                          <span className="text-[11px] font-medium text-[#60A5FA]">
                            {pkg.tag}
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="border-t border-white/10 pt-8">
              <h2 className="font-display text-2xl font-bold text-white mb-4">
                03. Pilih Metode Pembayaran
              </h2>

              <div className="space-y-6">
                {paymentGroups.map((groupName) => {
                  const methods = PAYMENT_METHODS.filter((m) => m.group === groupName);
                  return (
                    <div key={groupName}>
                      <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2.5">
                        {groupName}
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {methods.map((method) => {
                          const isSelected = selectedPayment.id === method.id;
                          const methodFee = calculatePaymentFee(subtotal, method);
                          const methodTotal = Math.max(0, subtotal + methodFee - discount);
                          return (
                            <button
                              key={method.id}
                              type="button"
                              onClick={() => setSelectedPayment(method)}
                              aria-pressed={isSelected}
                              className={`text-left rounded-xl border px-4 py-3.5 transition-all duration-150 flex items-center justify-between gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6] ${
                                isSelected
                                  ? 'border-[#3B82F6] bg-[#2563EB]/15'
                                  : 'border-white/10 bg-[#080A0F] hover:border-white/25'
                              }`}
                            >
                              <div className="min-w-0">
                                <p className="text-sm font-medium text-white truncate">
                                  {method.name}
                                </p>
                                <p className="text-xs text-slate-400 mt-0.5 tabular-nums">
                                  Biaya layanan {formatRupiah(methodFee)}
                                </p>
                              </div>
                              <span className="font-mono text-sm font-semibold text-white tabular-nums shrink-0">
                                {formatRupiah(methodTotal)}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="border-t border-white/10 pt-8">
              <h2 className="font-display text-2xl font-bold text-white mb-4">
                04. Kontak &amp; Kode Promo
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div>
                  <label
                    htmlFor="buyer-whatsapp"
                    className="block text-sm font-medium text-slate-200 mb-2"
                  >
                    Nomor WhatsApp (untuk bukti transaksi)
                  </label>
                  <input
                    id="buyer-whatsapp"
                    type="tel"
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    placeholder="Contoh: 081234567890"
                    className="w-full rounded-lg border border-white/15 bg-[#080A0F] px-4 py-2.5 font-mono text-sm text-white placeholder:text-slate-500 focus:border-[#3B82F6] focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/30 min-h-[44px]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="promo-code"
                    className="block text-sm font-medium text-slate-200 mb-2"
                  >
                    Kode Promo (opsional · coba: RINZBARU)
                  </label>
                  <div className="flex gap-2">
                    <input
                      id="promo-code"
                      type="text"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      placeholder="Masukkan kode"
                      className="w-full rounded-lg border border-white/15 bg-[#080A0F] px-4 py-2.5 font-mono text-sm uppercase text-white placeholder:text-slate-500 placeholder:normal-case focus:border-[#3B82F6] focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/30 min-h-[44px]"
                    />
                    <button
                      type="button"
                      onClick={handleApplyPromo}
                      className="rounded-lg border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-white hover:bg-white/10 transition-colors whitespace-nowrap shrink-0 min-h-[44px]"
                    >
                      Pakai
                    </button>
                  </div>
                  {promoFeedback && (
                    <p
                      className={`mt-1.5 text-xs ${
                        promoFeedback.type === 'success' ? 'text-emerald-400' : 'text-amber-400'
                      }`}
                    >
                      {promoFeedback.text}
                    </p>
                  )}
                </div>
              </div>

              <div className="border-t border-white/10 pt-6 space-y-2.5 text-sm">
                <div className="flex items-center justify-between text-slate-300">
                  <span>
                    {selectedPkg.name} ({quantity}x)
                  </span>
                  <span className="font-mono tabular-nums">{formatRupiah(subtotal)}</span>
                </div>
                <div className="flex items-center justify-between text-slate-300">
                  <span>Biaya Layanan ({selectedPayment.group})</span>
                  <span className="font-mono tabular-nums">{formatRupiah(fee)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex items-center justify-between text-emerald-400">
                    <span>Diskon Promo ({appliedPromoCode})</span>
                    <span className="font-mono tabular-nums">- {formatRupiah(discount)}</span>
                  </div>
                )}
                <div className="flex items-center justify-between border-t border-white/10 pt-3 text-base font-semibold text-white">
                  <span>Total Pembayaran</span>
                  <span className="font-mono text-xl text-[#60A5FA] tabular-nums">
                    {formatRupiah(totalAmount)}
                  </span>
                </div>
              </div>

              {formError && (
                <div
                  role="alert"
                  className="mt-4 rounded-lg border border-rose-500/40 bg-rose-500/10 px-4 py-3 text-sm text-rose-200"
                >
                  {formError}
                </div>
              )}

              <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <p className="text-xs text-slate-400">
                  Pastikan User ID sudah benar. Item terkirim otomatis setelah pembayaran terverifikasi.
                </p>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center rounded-lg bg-[#2563EB] px-7 py-3 text-sm font-semibold text-white hover:bg-[#1D4ED8] transition-colors duration-150 whitespace-nowrap shrink-0 min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#60A5FA]"
                >
                  Bayar Sekarang
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};
