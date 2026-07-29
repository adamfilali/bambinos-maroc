import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { BookOpen, Eye, FileText, Sparkles, Filter, CheckCircle2, SlidersHorizontal } from 'lucide-react';

export const FeaturedProducts: React.FC = () => {
  const { products, categories, openProductModal, openQuoteModal } = useData();

  const [selectedCatId, setSelectedCatId] = useState<string>('all');
  const [minPrice, setMinPrice] = useState<number | ''>('');
  const [maxPrice, setMaxPrice] = useState<number | ''>('');

  const activeProducts = products.filter((p) => p.status === 'active' || p.status === 'Publié');

  const filteredProducts = activeProducts.filter((p) => {
    const matchesCat = selectedCatId === 'all' || p.categoryId === selectedCatId;
    const finalPrice = p.promoPrice || p.price;
    const matchesMin = minPrice === '' || finalPrice >= minPrice;
    const matchesMax = maxPrice === '' || finalPrice <= maxPrice;
    return matchesCat && matchesMin && matchesMax;
  });

  return (
    <section id="catalogue" className="py-16 bg-[#FAFAF8] border-b border-slate-200 font-body">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-2">
          <span className="text-[#38C0E3] text-[11px] font-bold uppercase tracking-widest bg-[#001830] px-3.5 py-1 rounded-full border border-cyan-500/30">
            Collection & Magazine Exclusif
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#003E73]">
            Le Catalogue Bambinos Sur-Mesure
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm">
            Feuilletez nos créations en mode magazine interactif double page ou filtrez par catégorie et budget.
          </p>
        </div>

        {/* Compact Single-Line Filter Toolbar */}
        <div className="bg-white px-3.5 py-2.5 rounded-xl shadow-xs border border-slate-200/90 mb-8 flex items-center justify-between gap-2 text-xs flex-wrap sm:flex-nowrap">
          {/* Category Dropdown */}
          <div className="flex items-center gap-1.5 min-w-0">
            <span className="font-bold text-[#003E73] flex items-center gap-1 shrink-0 uppercase text-[10px] tracking-wider">
              <Filter className="w-3 h-3 text-[#38C0E3]" />
              <span>Catégorie:</span>
            </span>
            <select
              value={selectedCatId}
              onChange={(e) => setSelectedCatId(e.target.value)}
              className="bg-[#FAFAF8] border border-slate-300 rounded-lg px-2.5 py-1 text-xs font-semibold text-[#2B2B2B] focus:outline-none focus:border-[#38C0E3] truncate max-w-[180px]"
            >
              <option value="all">Toutes ({activeProducts.length})</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div className="hidden sm:block h-4 w-px bg-slate-200" />

          {/* Price Range */}
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="font-bold text-[#003E73] flex items-center gap-1 uppercase text-[10px] tracking-wider">
              <SlidersHorizontal className="w-3 h-3 text-[#38C0E3]" />
              <span>Prix:</span>
            </span>
            <input
              type="number"
              placeholder="Min (MAD)"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value ? Number(e.target.value) : '')}
              className="bg-[#FAFAF8] border border-slate-300 rounded-lg px-2 py-1 text-xs font-semibold text-[#2B2B2B] w-20 focus:outline-none focus:border-[#38C0E3]"
            />
            <span className="text-slate-400 font-bold text-xs">-</span>
            <input
              type="number"
              placeholder="Max (MAD)"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value ? Number(e.target.value) : '')}
              className="bg-[#FAFAF8] border border-slate-300 rounded-lg px-2 py-1 text-xs font-semibold text-[#2B2B2B] w-20 focus:outline-none focus:border-[#38C0E3]"
            />
            {(selectedCatId !== 'all' || minPrice !== '' || maxPrice !== '') && (
              <button
                onClick={() => {
                  setSelectedCatId('all');
                  setMinPrice('');
                  setMaxPrice('');
                }}
                className="text-[10px] font-bold text-rose-600 hover:underline ml-1"
              >
                Reset
              </button>
            )}
          </div>
        </div>

        {/* Compact Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredProducts.map((p) => {
            const hasPromo = p.promoPrice && p.promoPrice < p.price;
            const isNew = p.isFeatured;

            return (
              <div
                key={p.id}
                className="bg-white rounded-xl overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 border border-slate-200 flex flex-col justify-between group hover:-translate-y-1"
              >
                {/* Compact Product Image Box */}
                <div
                  onClick={() => openProductModal(p)}
                  className="relative h-48 sm:h-52 overflow-hidden bg-slate-100 cursor-pointer"
                >
                  <img
                    src={p.images[0] || "/uploads/images/bambinos_hero_room.jpg"}
                    alt={p.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  {/* Compact Badges */}
                  <div className="absolute top-2.5 left-2.5 flex items-center gap-1">
                    {hasPromo && (
                      <span className="bg-[#E5E632] text-[#001830] font-black text-[9px] uppercase px-2 py-0.5 rounded-md shadow-xs">
                        Promo
                      </span>
                    )}
                    {isNew && !hasPromo && (
                      <span className="bg-[#38C0E3] text-[#001830] font-black text-[9px] uppercase px-2 py-0.5 rounded-md shadow-xs">
                        Nouveau
                      </span>
                    )}
                  </div>

                  {/* Reference Tag */}
                  <span className="absolute top-2.5 right-2.5 bg-[#001830]/90 text-cyan-300 text-[9px] font-mono px-2 py-0.5 rounded-md border border-cyan-500/30">
                    {p.reference}
                  </span>

                  {/* Quick Overlay Button */}
                  <div className="absolute inset-0 bg-[#001830]/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        openProductModal(p);
                      }}
                      className="bg-[#38C0E3] hover:bg-cyan-300 text-[#001830] font-black text-[10px] px-3.5 py-2 rounded-lg shadow-lg flex items-center gap-1.5 uppercase tracking-wider"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>Catalogue Double Page</span>
                    </button>
                  </div>
                </div>

                {/* Compact Details */}
                <div className="p-3.5 space-y-2 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="text-[10px] font-mono text-[#003E73] font-bold uppercase tracking-wider">
                      {p.reference}
                    </div>
                    <h3
                      onClick={() => openProductModal(p)}
                      className="font-serif text-sm font-bold text-[#2B2B2B] hover:text-[#003E73] cursor-pointer transition-colors leading-tight line-clamp-1"
                    >
                      {p.name}
                    </h3>
                    <p className="text-[11px] text-slate-500 line-clamp-1 leading-normal mt-0.5 font-body">
                      {p.shortDescription}
                    </p>
                  </div>

                  {/* Price & CTA Button Row */}
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                    <div>
                      <div className="flex items-baseline gap-1.5">
                        <span className="font-serif text-base font-bold text-[#003E73]">
                          {(p.promoPrice || p.price).toLocaleString('fr-FR')} MAD
                        </span>
                        {p.promoPrice && p.promoPrice < p.price && (
                          <span className="text-[10px] text-slate-400 line-through">
                            {p.price.toLocaleString('fr-FR')} MAD
                          </span>
                        )}
                      </div>
                    </div>

                    <button
                      onClick={() => openProductModal(p)}
                      className="bg-[#003E73] hover:bg-[#002240] text-white font-bold text-[11px] px-3 py-1.5 rounded-lg transition-all flex items-center gap-1 shrink-0"
                    >
                      <BookOpen className="w-3 h-3 text-[#38C0E3]" />
                      <span>Catalogue</span>
                    </button>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
