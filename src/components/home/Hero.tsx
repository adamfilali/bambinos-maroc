import React, { useState, useEffect } from 'react';
import { useData } from '../../context/DataContext';
import { ArrowRight, Sparkles, ShieldCheck, Compass, Award, Search, ChevronDown } from 'lucide-react';

export const Hero: React.FC = () => {
  const { homepage, openQuoteModal, products, openProductModal } = useData();
  const [searchQuery, setSearchQuery] = useState('');
  const [parallaxOffset, setParallaxOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 15;
      const y = (e.clientY / innerHeight - 0.5) * 15;
      setParallaxOffset({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  if (!homepage) return null;

  const { hero } = homepage;

  const filteredProducts = searchQuery.trim()
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.reference.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <section className="relative h-screen min-h-[680px] max-h-[1080px] flex flex-col items-center justify-center overflow-hidden bg-[#001830] text-white">
      
      {/* Background Hero Image or Video with Soft Parallax Motion */}
      <div
        className="absolute inset-0 z-0 transition-transform duration-700 ease-out scale-105"
        style={{
          transform: `translate3d(${parallaxOffset.x}px, ${parallaxOffset.y}px, 0px) scale(1.08)`
        }}
      >
        {hero.bgVideo ? (
          <video
            src={hero.bgVideo}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover object-center"
          />
        ) : (
          <img
            src={hero.bgImage || "/uploads/images/banner_promo_ban.jpg"}
            alt="Bambinos Aménagement sur mesure"
            className="w-full h-full object-cover object-center"
          />
        )}

        {/* Soft Dark Brand Overlay & Light Glow */}
        <div
          className="absolute inset-0 bg-black/55 backdrop-brightness-90 transition-opacity"
          style={{ opacity: hero.overlayOpacity !== undefined ? hero.overlayOpacity : 0.55 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#001830] via-black/30 to-[#001830]/70" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#38C0E3]/15 rounded-full blur-3xl pointer-events-none animate-pulse" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center flex flex-col items-center justify-center space-y-6">
        
        {/* Eyebrow badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#002240]/80 border border-cyan-400/40 text-cyan-300 text-xs font-bold tracking-widest uppercase backdrop-blur-md shadow-lg animate-fade-in">
          <Sparkles className="w-3.5 h-3.5 text-[#E5E632] animate-spin-slow" />
          <span>{hero.eyebrow || "BAMBINOS — Créateur d'Espace Sur Mesure"}</span>
        </div>

        {/* Centered Title */}
        <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.1] max-w-4xl drop-shadow-lg">
          {hero.title || "Créateur d'espaces d'exception pour vos enfants"}
        </h1>

        {/* Subtitle */}
        <p className="font-subheading text-lg sm:text-2xl text-slate-200 font-normal max-w-2xl leading-relaxed italic drop-shadow">
          {hero.subtitle || "Du mobilier haut de gamme fabriqué sur-mesure à Casablanca : chambres féeriques, lits cabanes, dressings et bureaux d'étude."}
        </p>

        {/* Two Buttons: Découvrir & Demander un devis */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md">
          <a
            href={hero.ctaUrl || "#catalogue"}
            className="w-full sm:w-auto bg-[#38C0E3] hover:bg-cyan-300 text-[#001830] font-black px-8 py-4 rounded-2xl text-sm tracking-wider uppercase shadow-2xl transition-all hover:scale-105 flex items-center justify-center gap-2 group border-2 border-cyan-200"
          >
            <span>{hero.ctaText || "Découvrir"}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>

          <button
            onClick={() => openQuoteModal()}
            className="w-full sm:w-auto bg-[#002240]/90 hover:bg-[#003E73] text-white border-2 border-cyan-400/50 px-8 py-4 rounded-2xl text-sm font-black tracking-wider uppercase backdrop-blur-md transition-all hover:scale-105 shadow-2xl flex items-center justify-center gap-2"
          >
            <Compass className="w-4 h-4 text-[#E5E632]" />
            <span>{hero.secondaryCtaText || "Demander un devis"}</span>
          </button>
        </div>

        {/* Search Bar Directly Below Buttons */}
        <div className="pt-4 w-full max-w-xl relative">
          <div className="relative flex items-center">
            <Search className="w-5 h-5 absolute left-4 text-cyan-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher un modèle, lit cabane, dressing, bureau..."
              className="w-full bg-[#001830]/90 border-2 border-cyan-500/40 focus:border-[#38C0E3] text-white placeholder-slate-400 text-sm pl-12 pr-4 py-3.5 rounded-2xl shadow-2xl focus:outline-none backdrop-blur-md transition-all font-body"
            />
          </div>

          {/* Search Dropdown Results */}
          {searchQuery.trim() !== '' && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-[#002240] border border-cyan-500/30 rounded-2xl shadow-2xl overflow-hidden z-50 text-left max-h-60 overflow-y-auto divide-y divide-slate-800">
              {filteredProducts.length === 0 ? (
                <div className="p-3 text-xs text-slate-400 text-center">Aucun modèle trouvé pour "{searchQuery}"</div>
              ) : (
                filteredProducts.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => {
                      openProductModal(p);
                      setSearchQuery('');
                    }}
                    className="p-3 flex items-center gap-3 hover:bg-[#001830] cursor-pointer transition-colors"
                  >
                    <img src={p.images[0] || "/uploads/images/bambinos_hero_room01.jpg"} alt={p.name} className="w-10 h-10 rounded-lg object-cover" />
                    <div>
                      <h5 className="font-bold text-white text-xs">{p.name}</h5>
                      <span className="text-[10px] text-cyan-300 font-mono">{p.reference} • {p.price.toLocaleString('fr-FR')} MAD</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {/* Trust Guarantees Bar */}
        <div className="pt-4 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-300 font-medium">
          <div className="flex items-center gap-2 bg-[#002240]/60 px-3.5 py-1.5 rounded-full border border-cyan-500/20">
            <ShieldCheck className="w-4 h-4 text-[#38C0E3]" />
            <span>Fabrication 100% MDF Écologique</span>
          </div>
          <div className="flex items-center gap-2 bg-[#002240]/60 px-3.5 py-1.5 rounded-full border border-cyan-500/20">
            <Award className="w-4 h-4 text-[#E5E632]" />
            <span>Garantie 10 Ans & Pose Casablanca</span>
          </div>
        </div>

        {/* Animated Scroll Indicator */}
        <a
          href="#catalogue"
          className="pt-2 text-slate-400 hover:text-cyan-300 transition-colors inline-flex flex-col items-center gap-1 group"
        >
          <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 group-hover:text-cyan-300">
            Défiler vers le catalogue
          </span>
          <ChevronDown className="w-5 h-5 text-[#38C0E3] animate-bounce" />
        </a>

      </div>
    </section>
  );
};
