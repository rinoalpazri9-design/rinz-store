/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import {
  GameCategory,
  GameProduct,
  GAMES_CATALOG,
  INITIAL_ORDERS,
  OrderRecord,
  OrderStatus,
} from './data/catalog';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { GameCatalog } from './components/GameCatalog';
import { TopUpWorkspace } from './components/TopUpWorkspace';
import { OrderTracker } from './components/OrderTracker';
import { HowItWorks } from './components/HowItWorks';
import { Footer } from './components/Footer';
import { PaymentModal } from './components/PaymentModal';

const STORAGE_KEY = 'rinz_store_orders_v1';

export default function App() {
  const [selectedGame, setSelectedGame] = useState<GameProduct | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'Semua' | GameCategory>('Semua');

  const [orders, setOrders] = useState<OrderRecord[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // Ignore storage read errors
    }
    return INITIAL_ORDERS;
  });

  const [activeInvoice, setActiveInvoice] = useState<OrderRecord | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
    } catch {
      // Ignore storage write errors
    }
  }, [orders]);

  const scrollToSection = (sectionId: string) => {
    if (selectedGame && sectionId !== 'cek-pesanan' && sectionId !== 'cara-topup' && sectionId !== 'bantuan') {
      setSelectedGame(null);
      requestAnimationFrame(() => {
        const el = document.getElementById(sectionId);
        el?.scrollIntoView({ behavior: 'smooth' });
      });
      return;
    }
    const el = document.getElementById(sectionId);
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSelectGame = (game: GameProduct) => {
    setSelectedGame(game);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleQuickSearch = (query: string) => {
    setSelectedGame(null);
    setSelectedCategory('Semua');
    setSearchQuery(query);
    requestAnimationFrame(() => {
      document.getElementById('katalog')?.scrollIntoView({ behavior: 'smooth' });
    });
  };

  const handleOrderCreated = (order: OrderRecord) => {
    setOrders((prev) => [order, ...prev]);
    setActiveInvoice(order);
  };

  const handleUpdateOrderStatus = (
    invoiceId: string,
    nextStatus: OrderStatus,
    voucherPin?: string
  ) => {
    setOrders((prev) =>
      prev.map((item) =>
        item.invoiceId === invoiceId
          ? { ...item, status: nextStatus, ...(voucherPin ? { voucherPin } : {}) }
          : item
      )
    );
    setActiveInvoice((current) =>
      current && current.invoiceId === invoiceId
        ? { ...current, status: nextStatus, ...(voucherPin ? { voucherPin } : {}) }
        : current
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#080A0F] text-[#F4F6FA]">
      <Header
        onNavigateSection={scrollToSection}
        onQuickTopUp={() => scrollToSection('katalog')}
      />

      <main className="flex-1">
        {selectedGame ? (
          <TopUpWorkspace
            game={selectedGame}
            onBack={() => setSelectedGame(null)}
            onOrderCreated={handleOrderCreated}
          />
        ) : (
          <>
            <HeroSection
              onExploreCatalog={() => scrollToSection('katalog')}
              onTrackOrder={() => scrollToSection('cek-pesanan')}
              onQuickSearch={handleQuickSearch}
            />

            <GameCatalog
              games={GAMES_CATALOG}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              onSelectGame={handleSelectGame}
            />
          </>
        )}

        <OrderTracker
          orders={orders}
          onInspectOrder={(order) => setActiveInvoice(order)}
        />

        <HowItWorks />
      </main>

      <Footer onNavigateSection={scrollToSection} />

      <PaymentModal
        order={activeInvoice}
        onClose={() => setActiveInvoice(null)}
        onUpdateStatus={handleUpdateOrderStatus}
      />
    </div>
  );
}
