import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { BambinosLogo } from '../common/BambinosLogo';
import {
  Phone,
  MessageCircle,
  Search,
  Lock,
  Menu as MenuIcon,
  X,
  FileText,
  Sparkles,
  ChevronDown,
  ChevronRight,
  Bed,
  Layers,
  BookOpen,
  Archive,
  Star,
  ArrowRight,
  Tag,
  Grid
} from 'lucide-react';
import { playClassicPhoneRing } from '../../utils/soundEffects';

const renderMenuIcon = (iconName?: string) => {
  if (!iconName) return null;
  switch (iconName.toLowerCase()) {
    case 'bed': return <Bed className="w-3.5 h-3.5 text-[#38C0E3] shrink-0" />;
    case 'layers': return <Layers className="w-3.5 h-3.5 text-[#38C0E3] shrink-0" />;
    case 'archive': return <Archive className="w-3.5 h-3.5 text-[#38C0E3] shrink-0" />;
    case 'book': return <BookOpen className="w-3.5 h-3.5 text-[#E5E632] shrink-0" />;
    case 'grid': return <Grid className="w-3.5 h-3.5 text-[#38C0E3] shrink-0" />;
    case 'sparkles': return <Sparkles className="w-3.5 h-3.5 text-[#E5E632] shrink-0" />;
    case 'star': return <Star className="w-3.5 h-3.5 text-yellow-300 shrink-0" />;
    case 'tag': return <Tag className="w-3.5 h-3.5 text-cyan-400 shrink-0" />;
    default: return null;
  }
};

export const Navbar: React.FC = () => {
  const {
    settings,
    company,
    banners,
    menu,
    products,
    categories,
    catalogues,
    openQuoteModal,
    openProductModal,
    openAdmin,
    authUser
  } = useData();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
  const [hoveredSubItem, setHoveredSubItem] = useState<string | null>(null);

  const activeTopBanner = banners.find((b) => b.active && b.location === 'top_bar');

  // Predictive Smart Search Filter Logic
  const trimmedQuery = searchQuery.trim().toLowerCase();

  const matchedProducts = trimmedQuery
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(trimmedQuery) ||
          p.reference.toLowerCase().includes(trimmedQuery) ||
          p.shortDescription.toLowerCase().includes(trimmedQuery)
      )
    : [];

  const matchedCategories = trimmedQuery
    ? categories.filter((c) => c.name.toLowerCase().includes(trimmedQuery))
    : [];

  const matchedCatalogues = trimmedQuery
    ? catalogues.filter(
        (cat) =>
          cat.title.toLowerCase().includes(trimmedQuery) ||
          cat.description.toLowerCase().includes(trimmedQuery)
      )
    : [];

  const phoneNum = company?.phone || '+212 661-750-685';

  return (
    <>
      {/* Top Bar Announcement Banner */}
      {activeTopBanner && (
        <div className="bg-[#002240] text-white text-xs py-2 px-4 text-center font-medium tracking-wide flex items-center justify-center gap-2 border-b border-cyan-500/30">
          <Sparkles className="w-3.5 h-3.5 text-yellow-300 animate-pulse" />
          <span>
            <strong className="text-yellow-300">{activeTopBanner.title}</strong> — {activeTopBanner.subtitle}
          </span>
          {activeTopBanner.buttonText && (
            <button
              onClick={() => openQuoteModal()}
              className="ml-2 bg-[#38C0E3] hover:bg-cyan-300 text-[#002240] px-3 py-0.5 rounded-full text-[11px] font-black transition-colors"
            >
              {activeTopBanner.buttonText}
            </button>
          )}
        </div>
      )}

      {/* Top Bar Announcement & Info Bar */}
      <div className="bg-[#001830] text-slate-300 text-xs py-1.5 px-4 border-b border-cyan-500/20 font-body">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Top Bar Left: Phone Number */}
          <a
            href="tel:+212661750685"
            onMouseEnter={playClassicPhoneRing}
            onClick={playClassicPhoneRing}
            className="flex items-center gap-1.5 text-xs font-mono font-bold text-[#38C0E3] hover:text-[#E5E632] transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-[#38C0E3] animate-bounce" />
            <span>+212 661-750-685</span>
          </a>

          {/* Top Bar Right: Language & Admin Login */}
          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1 font-semibold text-slate-300 cursor-pointer hover:text-white">
              <span>FR</span>
              <ChevronDown className="w-3 h-3 text-cyan-400" />
            </div>

            <button
              onClick={openAdmin}
              className="flex items-center gap-1 text-slate-300 hover:text-[#E5E632] font-semibold transition-colors"
            >
              <Lock className="w-3.5 h-3.5 text-[#38C0E3]" />
              <span>{authUser ? `Admin (${authUser.username})` : 'Admin'}</span>
            </button>
          </div>

        </div>
      </div>

      {/* Primary Navigation Header */}
      <header className="sticky top-0 z-40 bg-[#001830]/95 backdrop-blur-md border-b border-cyan-500/20 shadow-xl text-white font-body">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-3 relative">
          
          {/* Official Bambinos Brand Logo */}
          <a href="#" className="flex items-center shrink-0 group">
            <BambinosLogo variant="white" size="md" />
          </a>

          {/* Dynamic Desktop Navigation Links with IKEA / Roche Bobois Style Mega Menu */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2.5">
            {menu
              .filter((item) => item.visible !== false)
              .sort((a, b) => (a.order || 0) - (b.order || 0))
              .map((item, idx, arr) => {
                const hasChildren = item.children && item.children.filter((c) => c.visible !== false).length > 0;
                const visibleChildren = hasChildren ? item.children!.filter((c) => c.visible !== false) : [];
                const isRightAligned = idx >= arr.length - 2;

                return (
                  <div
                    key={item.id}
                    className="relative py-2 group"
                    onMouseEnter={() => setActiveMegaMenu(item.id)}
                    onMouseLeave={() => {
                      setActiveMegaMenu(null);
                      setHoveredSubItem(null);
                    }}
                  >
                    <a
                      href={item.url || '#'}
                      className={`text-[11px] uppercase font-bold tracking-wider py-1.5 px-2.5 rounded-lg transition-colors whitespace-nowrap flex items-center gap-1 ${
                        item.label.toUpperCase() === 'CATALOGUE' || item.label.toUpperCase() === 'CATALOGUES'
                          ? 'text-[#E5E632] hover:text-white font-black'
                          : 'text-slate-100 hover:text-[#38C0E3]'
                      }`}
                    >
                      {item.icon ? (
                        renderMenuIcon(item.icon)
                      ) : item.label.toUpperCase() === 'CATALOGUE' || item.label.toUpperCase() === 'CATALOGUES' ? (
                        <BookOpen className="w-3.5 h-3.5 text-[#38C0E3] shrink-0" />
                      ) : null}
                      <span>{item.label}</span>
                      {hasChildren && (
                        <ChevronDown className="w-3 h-3 text-cyan-400 group-hover:rotate-180 transition-transform shrink-0" />
                      )}
                    </a>

                    {/* Compact & Bounded Mega Menu */}
                    {hasChildren && activeMegaMenu === item.id && (
                      <div
                        className={`absolute top-full bg-[#001d36]/98 border border-cyan-500/40 rounded-xl shadow-2xl p-3 z-50 animate-fade-in backdrop-blur-2xl w-[360px] max-w-[calc(100vw-2rem)] flex gap-3 overflow-hidden ${
                          isRightAligned ? 'right-0 left-auto' : 'left-0 right-auto'
                        }`}
                      >
                        {/* Left: Small Portrait 4:5 Vertical Collection Cover */}
                        <div className="w-28 shrink-0 relative rounded-lg overflow-hidden border border-cyan-500/30 group/banner flex flex-col justify-end p-2 bg-[#001224] aspect-[4/5]">
                          <img
                            src={item.image || "/uploads/images/bambinos_hero_room_ban.jpg"}
                            alt={item.label}
                            className="absolute inset-0 w-full h-full object-cover group-hover/banner:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#001224] via-[#001224]/50 to-transparent" />
                          <div className="relative z-10 space-y-0.5">
                            <span className="text-[7px] uppercase font-black text-[#001830] bg-[#38C0E3] px-1 py-0.2 rounded tracking-wider inline-block">
                              {item.label}
                            </span>
                            <h4 className="font-serif text-[10px] font-bold text-white leading-tight">
                              Collection Bambinos
                            </h4>
                          </div>
                        </div>

                        {/* Right: Clean List of Subcategories & Action Button */}
                        <div className="flex-1 min-w-0 flex flex-col justify-between space-y-2">
                          <div className="border-b border-slate-800 pb-1 text-[9px] uppercase font-bold text-[#38C0E3] tracking-wider flex items-center justify-between">
                            <span className="truncate">{item.label}</span>
                            <Sparkles className="w-2.5 h-2.5 text-[#E5E632] shrink-0" />
                          </div>

                          <div className="space-y-0.5 max-h-[160px] overflow-y-auto pr-0.5">
                            {visibleChildren.map((sub) => (
                              <a
                                key={sub.id}
                                href={sub.url || '#'}
                                target={sub.targetWindow || '_self'}
                                onClick={() => setActiveMegaMenu(null)}
                                className="p-1 rounded-md hover:bg-[#001224] hover:text-[#38C0E3] transition-colors flex items-center justify-between gap-1 text-[11px] font-medium text-slate-200 group/sub"
                              >
                                <div className="flex items-center gap-1 truncate">
                                  {sub.icon ? renderMenuIcon(sub.icon) : <ChevronRight className="w-2.5 h-2.5 text-cyan-400 group-hover/sub:translate-x-0.5 transition-transform shrink-0" />}
                                  <span className="truncate">{sub.label}</span>
                                </div>
                                {sub.badge && (
                                  <span className={`text-[7px] font-bold uppercase px-1 py-0.2 rounded border shrink-0 ${
                                    sub.badgeColor === 'emerald' ? 'bg-emerald-950/80 text-emerald-400 border-emerald-500/40' :
                                    sub.badgeColor === 'rose' ? 'bg-rose-950/80 text-rose-400 border-rose-500/40' :
                                    sub.badgeColor === 'amber' ? 'bg-amber-950/80 text-amber-400 border-amber-500/40' :
                                    'bg-cyan-950/80 text-cyan-300 border-cyan-500/40'
                                  }`}>
                                    {sub.badge}
                                  </span>
                                )}
                              </a>
                            ))}
                          </div>

                          <a
                            href={item.url || '#catalogue'}
                            onClick={() => setActiveMegaMenu(null)}
                            className="w-full py-1.5 px-2 rounded-lg bg-[#38C0E3] hover:bg-cyan-300 text-[#001830] font-black text-[10px] uppercase tracking-wider flex items-center justify-center gap-1 transition-all"
                          >
                            <span>Voir tous les produits</span>
                            <ChevronRight className="w-3 h-3" />
                          </a>
                        </div>

                      </div>
                    )}
                  </div>
                );
              })}
          </nav>

          {/* Right Header Toolbar Items matching reference */}
          <div className="hidden lg:flex items-center gap-2 xl:gap-3 shrink-0">
            
            {/* Catégories Filter Button */}
            <a
              href="#categories"
              className="px-3 py-1.5 rounded-full bg-[#002240] hover:bg-[#003E73] text-slate-200 hover:text-[#38C0E3] text-[11px] font-bold border border-cyan-500/30 flex items-center gap-1 transition-all whitespace-nowrap"
            >
              <span>Catégories</span>
              <ChevronDown className="w-3 h-3 text-cyan-400" />
            </a>

            {/* Prix Min-Max Button */}
            <a
              href="#catalogue"
              className="w-9 h-9 rounded-full bg-[#002240] hover:bg-[#003E73] text-slate-200 hover:text-[#E5E632] border border-cyan-500/30 flex flex-col items-center justify-center text-[9px] font-bold leading-tight transition-all"
              title="Filtrer par Prix Min-Max"
            >
              <span>Prix</span>
              <span>Min</span>
            </a>

            {/* Search Bar Input with Instant Predictive Search Dropdown */}
            <div className="relative">
              <input
                type="text"
                placeholder="Rechercher..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setSearchOpen(true)}
                className="w-32 xl:w-44 bg-[#002240] border border-cyan-500/30 rounded-full pl-3 pr-8 py-1.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#38C0E3] transition-all"
              />
              <Search className="w-3.5 h-3.5 text-cyan-400 absolute right-3 top-1/2 -translate-y-1/2" />

              {/* Live Instant Predictive Suggestions Overlay */}
              {trimmedQuery.length > 0 && (
                <div className="absolute top-full right-0 mt-2 w-80 bg-[#002240] border border-cyan-500/40 rounded-2xl shadow-2xl p-3 z-50 text-xs space-y-3 animate-fade-in backdrop-blur-xl max-h-96 overflow-y-auto">
                  
                  {/* Category Matches */}
                  {matchedCategories.length > 0 && (
                    <div className="space-y-1">
                      <span className="text-[10px] uppercase font-bold text-[#38C0E3] tracking-wider block border-b border-slate-800 pb-1">
                        Catégories ({matchedCategories.length})
                      </span>
                      {matchedCategories.map((cat) => (
                        <a
                          key={cat.id}
                          href="#catalogue"
                          onClick={() => setSearchQuery('')}
                          className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-[#001830] text-slate-200 hover:text-white"
                        >
                          <Grid className="w-3.5 h-3.5 text-yellow-300 shrink-0" />
                          <span className="font-semibold">{cat.name}</span>
                        </a>
                      ))}
                    </div>
                  )}

                  {/* Product Matches */}
                  {matchedProducts.length > 0 ? (
                    <div className="space-y-1">
                      <span className="text-[10px] uppercase font-bold text-[#38C0E3] tracking-wider block border-b border-slate-800 pb-1">
                        Produits ({matchedProducts.length})
                      </span>
                      {matchedProducts.slice(0, 4).map((p) => (
                        <div
                          key={p.id}
                          onClick={() => {
                            setSearchQuery('');
                            openProductModal(p);
                          }}
                          className="flex items-center gap-2.5 p-1.5 rounded-xl hover:bg-[#001830] cursor-pointer group/search"
                        >
                          <img
                            src={p.images[0] || "/uploads/images/bambinos_hero_room02.jpg"}
                            alt={p.name}
                            className="w-10 h-10 rounded-lg object-cover border border-slate-700"
                          />
                          <div className="flex-1 min-w-0">
                            <h5 className="font-serif font-bold text-white text-xs truncate group-hover/search:text-cyan-300">
                              {p.name}
                            </h5>
                            <span className="text-[10px] text-cyan-400 font-mono block">
                              {p.reference}
                            </span>
                          </div>
                          <span className="text-yellow-300 font-bold font-mono text-[11px]">
                            {(p.promoPrice || p.price).toLocaleString('fr-FR')} MAD
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : matchedCategories.length === 0 && (
                    <div className="py-4 text-center text-slate-400 text-xs">
                      Aucun modèle ou catégorie trouvé pour "{searchQuery}"
                    </div>
                  )}

                  {/* Catalogues Matches */}
                  {matchedCatalogues.length > 0 && (
                    <div className="space-y-1 pt-1 border-t border-slate-800">
                      <span className="text-[10px] uppercase font-bold text-[#E5E632] tracking-wider block">
                        Catalogues ({matchedCatalogues.length})
                      </span>
                      {matchedCatalogues.map((cat) => (
                        <div
                          key={cat.id}
                          onClick={() => {
                            setSearchQuery('');
                            useData().openPdfViewer(cat.pdfUrl, cat.title);
                          }}
                          className="flex items-center justify-between p-1.5 rounded-lg hover:bg-[#001830] text-slate-200 cursor-pointer"
                        >
                          <span className="font-semibold text-xs truncate">{cat.title}</span>
                          <BookOpen className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                        </div>
                      ))}
                    </div>
                  )}

                </div>
              )}

            </div>

            {/* Premium Animated Call Button with Sound Effect (Replaces full phone text) */}
            <a
              href="tel:+212661750685"
              onMouseEnter={playClassicPhoneRing}
              onClick={playClassicPhoneRing}
              className="relative group p-2.5 rounded-full bg-gradient-to-r from-[#38C0E3] to-[#003E73] text-white shadow-lg transition-all hover:scale-110 active:scale-95 border border-cyan-300/40"
              title="Appeler Service Client (+212 661-750-685)"
            >
              <Phone className="w-4 h-4 text-white animate-pulse group-hover:rotate-12 transition-transform" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#E5E632] rounded-full animate-ping" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#E5E632] rounded-full" />
            </a>

          </div>

          {/* Mobile Navigation Toggle */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2 rounded-xl text-slate-200 hover:bg-[#002240]"
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-100 hover:bg-[#002240]"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#002240] border-b border-cyan-500/30 px-4 pt-3 pb-6 space-y-4 text-white">
            <div className="space-y-1">
              {menu
                .filter((item) => item.visible !== false)
                .sort((a, b) => (a.order || 0) - (b.order || 0))
                .map((item) => {
                  const hasChildren = item.children && item.children.filter((c) => c.visible !== false).length > 0;
                  const visibleChildren = hasChildren ? item.children!.filter((c) => c.visible !== false) : [];

                  return (
                    <div key={item.id} className="space-y-1">
                      <a
                        href={item.url || '#'}
                        onClick={() => setMobileMenuOpen(false)}
                        className="block px-3 py-2.5 rounded-xl text-sm font-bold text-slate-200 hover:bg-[#001830] hover:text-cyan-300 transition-colors"
                      >
                        {item.label}
                      </a>
                      {hasChildren && (
                        <div className="pl-4 space-y-1 border-l-2 border-cyan-500/30 ml-3">
                          {visibleChildren.map((sub) => (
                            <a
                              key={sub.id}
                              href={sub.url || '#'}
                              onClick={() => setMobileMenuOpen(false)}
                              className="block px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-[#38C0E3] transition-colors"
                            >
                              • {sub.label}
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
            </div>

            <div className="pt-3 border-t border-slate-800 space-y-2.5">
              <a
                href={`tel:${phoneNum.replace(/\s+/g, '')}`}
                onMouseEnter={playClassicPhoneRing}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-[#001830] text-cyan-300 font-bold text-sm border border-cyan-500/30"
              >
                <Phone className="w-4 h-4 text-[#38C0E3]" />
                <span>Service client: {phoneNum}</span>
              </a>

              <a
                href={`https://wa.me/${(company?.whatsapp || '+212 661-750-685').replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={playClassicPhoneRing}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-sm shadow-md"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Discuter sur WhatsApp</span>
              </a>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openQuoteModal();
                }}
                className="w-full bg-[#38C0E3] text-[#002240] py-3 rounded-xl text-sm font-black text-center flex items-center justify-center gap-2"
              >
                <FileText className="w-4 h-4" />
                <span>Demander un Devis 3D</span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openAdmin();
                }}
                className="w-full text-slate-300 py-2.5 text-xs text-center flex items-center justify-center gap-2 border border-slate-700 rounded-xl bg-[#001830]"
              >
                <Lock className="w-3.5 h-3.5 text-yellow-300" />
                <span>Administration ({authUser ? authUser.username : 'Espace admin'})</span>
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Global Search Drawer Modal */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 bg-[#001830]/80 backdrop-blur-md flex items-start justify-center pt-16 px-4">
          <div className="bg-[#002240] w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden border border-cyan-500/30 text-white">
            <div className="p-4 border-b border-slate-800 flex items-center gap-3 bg-[#001830]">
              <Search className="w-5 h-5 text-cyan-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Rechercher une chambre, dressing, bureau, lit superposé..."
                className="w-full bg-transparent text-white text-base focus:outline-none placeholder:text-slate-500"
                autoFocus
              />
              <button
                onClick={() => setSearchOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 max-h-[60vh] overflow-y-auto divide-y divide-slate-800">
              {searchQuery.trim() === '' ? (
                <div className="py-6 text-center text-slate-400 text-sm space-y-2">
                  <p>Tapez le nom d'un modèle, une référence ou une catégorie.</p>
                  <div className="flex flex-wrap gap-2 justify-center pt-2">
                    {categories.map((c) => (
                      <button
                        key={c.id}
                        onClick={() => setSearchQuery(c.name)}
                        className="px-3 py-1 bg-[#001830] hover:bg-[#38C0E3] hover:text-[#002240] text-slate-200 text-xs rounded-full transition-colors border border-slate-700"
                      >
                        {c.name}
                      </button>
                    ))}
                  </div>
                </div>
              ) : matchedProducts.length === 0 ? (
                <div className="py-8 text-center text-slate-400 text-sm">
                  Aucun résultat trouvé pour "{searchQuery}".
                </div>
              ) : (
                matchedProducts.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => {
                      setSearchOpen(false);
                      openProductModal(p);
                    }}
                    className="py-3 flex items-center justify-between hover:bg-[#001830] px-3 rounded-xl cursor-pointer transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={p.images[0] || "/uploads/images/bambinos_hero_room02.jpg"}
                        alt={p.name}
                        className="w-12 h-12 rounded-lg object-cover border border-slate-700"
                      />
                      <div>
                        <h4 className="font-serif font-bold text-white text-sm group-hover:text-cyan-300">
                          {p.name}
                        </h4>
                        <p className="text-xs text-slate-400 flex items-center gap-2">
                          <span className="font-mono text-cyan-300 font-bold">{p.reference}</span>
                          <span>•</span>
                          <span>{p.dimensions}</span>
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-bold text-yellow-300 block font-mono">
                        {(p.promoPrice || p.price).toLocaleString('fr-FR')} MAD
                      </span>
                      <span className="text-[10px] text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded-full font-bold">
                        {p.availability}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
