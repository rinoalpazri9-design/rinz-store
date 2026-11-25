import React from 'react';
import { Search, ChevronRight } from 'lucide-react';
import { GameCategory, GameProduct, formatRupiah } from '../data/catalog';
import { GameArtwork } from './GameArtwork';

interface GameCatalogProps {
  games: GameProduct[];
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedCategory: 'Semua' | GameCategory;
  onCategoryChange: (cat: 'Semua' | GameCategory) => void;
  onSelectGame: (game: GameProduct) => void;
}

const CATEGORIES: Array<'Semua' | GameCategory> = ['Semua', 'Mobile', 'PC & Konsol', 'Voucher'];

export const GameCatalog: React.FC<GameCatalogProps> = ({
  games,
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  onSelectGame,
}) => {
  const filteredGames = games.filter((game) => {
    const matchesCategory = selectedCategory === 'Semua' || game.category === selectedCategory;
    const q = searchQuery.trim().toLowerCase();
    const matchesQuery =
      !q ||
      game.title.toLowerCase().includes(q) ||
      game.publisher.toLowerCase().includes(q) ||
      game.currencyName.toLowerCase().includes(q);
    return matchesCategory && matchesQuery;
  });

  return (
    <section id="katalog" className="mx-auto max-w-6xl px-4 sm:px-6 py-12 sm:py-16">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Katalog Game &amp; Voucher
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-400">
            Pilih judul game di bawah untuk melihat daftar nominal dan melakukan top up instan.
          </p>
        </div>

        <div className="relative w-full md:w-80">
          <Search
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400"
            aria-hidden="true"
          />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Cari game atau voucher..."
            aria-label="Cari game atau voucher"
            className="w-full rounded-lg border border-white/15 bg-[#111622] pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-[#3B82F6] focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/30 min-h-[44px]"
          />
        </div>
      </div>

      <div
        className="flex flex-wrap items-center gap-1.5 p-1 bg-[#111622] border border-white/10 rounded-xl w-fit mb-8"
        role="tablist"
        aria-label="Filter kategori game"
      >
        {CATEGORIES.map((category) => {
          const isActive = selectedCategory === category;
          return (
            <button
              key={category}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => onCategoryChange(category)}
              className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 min-h-[40px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6] ${
                isActive
                  ? 'bg-[#2563EB] text-white'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              {category === 'Semua' ? 'Semua Game' : category}
            </button>
          );
        })}
      </div>

      {filteredGames.length === 0 ? (
        <div className="rounded-2xl border border-white/10 bg-[#111622] p-12 text-center">
          <p className="text-base font-semibold text-white">Game tidak ditemukan</p>
          <p className="mt-1.5 text-sm text-slate-400">
            Coba kata kunci lain atau pilih kategori Semua Game.
          </p>
          <button
            type="button"
            onClick={() => {
              onSearchChange('');
              onCategoryChange('Semua');
            }}
            className="mt-5 inline-flex items-center justify-center rounded-lg border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-white hover:bg-white/10 min-h-[40px]"
          >
            Reset Filter
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGames.map((game) => {
            const minPrice = Math.min(...game.packages.map((p) => p.price));
            return (
              <button
                key={game.id}
                type="button"
                onClick={() => onSelectGame(game)}
                className="group text-left flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#111622] hover:border-[#3B82F6]/60 hover:-translate-y-0.5 transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6]"
              >
                <GameArtwork
                  gameId={game.id}
                  imageSrc={game.imageSrc}
                  accentHex={game.accentHex}
                  secondaryHex={game.secondaryHex}
                  title={game.title}
                  className="w-full aspect-video"
                />

                <div className="flex flex-1 flex-col justify-between p-5">
                  <div>
                    <div className="flex items-center justify-between gap-2 text-xs text-slate-400">
                      <span className="truncate">
                        {game.publisher} · {game.category}
                      </span>
                      {game.tag && (
                        <span className="text-[#60A5FA] font-medium whitespace-nowrap shrink-0">
                          {game.tag}
                        </span>
                      )}
                    </div>
                    <h3 className="mt-1.5 text-base font-semibold text-white group-hover:text-[#60A5FA] transition-colors">
                      {game.title}
                    </h3>
                  </div>

                  <div className="mt-4 pt-3.5 border-t border-white/10 flex items-center justify-between gap-3">
                    <div>
                      <span className="block text-[11px] text-slate-400">Mulai dari</span>
                      <span className="font-mono text-sm font-semibold text-white tabular-nums">
                        {formatRupiah(minPrice)}
                      </span>
                    </div>
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#60A5FA] whitespace-nowrap shrink-0">
                      Top Up
                      <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </section>
  );
};
