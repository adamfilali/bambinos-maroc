import React from 'react';
import { Sparkles, Compass, ShieldCheck } from 'lucide-react';
import { BambinosLogo } from './BambinosLogo';

export const PremiumLoader: React.FC = () => {
  return (
    <div className="fixed inset-0 z-50 bg-[#001830] flex flex-col items-center justify-center text-white p-6 space-y-6">
      
      {/* Animated Glowing Halo */}
      <div className="relative flex items-center justify-center">
        <div className="absolute w-32 h-32 bg-[#38C0E3]/20 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute w-24 h-24 border border-cyan-400/30 rounded-full animate-ping"></div>
        
        {/* Central Logo Box */}
        <div className="relative w-20 h-20 bg-[#002240] border-2 border-cyan-400/50 rounded-3xl shadow-2xl flex items-center justify-center transform hover:scale-105 transition-transform">
          <BambinosLogo variant="white" size="sm" showText={false} />
        </div>
      </div>

      {/* Brand Text & Status */}
      <div className="text-center space-y-2 max-w-xs">
        <h2 className="font-serif text-2xl font-black text-white tracking-wider flex items-center justify-center gap-2">
          <span>BAMBINOS</span>
          <Sparkles className="w-4 h-4 text-yellow-300 animate-spin" />
        </h2>
        <p className="text-xs text-cyan-300 font-mono tracking-wide">
          Chargement de l'univers Mobilier Enfant Sur-Mesure...
        </p>
      </div>

      {/* Progress Line */}
      <div className="w-48 h-1 bg-[#002240] rounded-full overflow-hidden border border-cyan-500/30 relative">
        <div className="w-1/2 h-full bg-gradient-to-r from-[#38C0E3] to-yellow-300 rounded-full animate-slide-right"></div>
      </div>

      {/* Trust Tagline */}
      <div className="pt-4 flex items-center gap-2 text-[10px] text-slate-400 font-medium uppercase tracking-widest">
        <Compass className="w-3.5 h-3.5 text-cyan-400" />
        <span>Showroom & Atelier Casablanca</span>
      </div>

    </div>
  );
};
