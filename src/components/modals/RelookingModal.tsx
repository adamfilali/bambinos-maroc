import React, { useState } from 'react';
import { Sparkles, X } from 'lucide-react';

export const RelookingModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Bouton Fixe Flottant en Bas à Gauche avec Animation Pulsante & Effet Survol Fluid */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 z-40 flex items-center gap-2.5 bg-gradient-to-r from-[#7C3AED] to-[#4F46E5] hover:from-purple-700 hover:to-indigo-700 text-white font-extrabold py-3 px-5 rounded-full shadow-2xl border border-purple-300/30 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 group"
        title="Ouvrir le Studio Relooking IA Bambinos"
      >
        <Sparkles className="w-5 h-5 text-cyan-300 animate-pulse group-hover:rotate-12 transition-transform" />
        <span className="tracking-wide text-xs sm:text-sm font-black uppercase">RELOOKING IA</span>
      </button>

      {/* Modal Centrée Studio Relooking BAMBINOS */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in"
          onClick={() => setIsOpen(false)}
        >
          <div 
            className="relative bg-white rounded-3xl p-8 max-w-md w-full text-center shadow-2xl border border-gray-100"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Bouton Fermer (Croix) */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors p-2 rounded-full hover:bg-gray-100"
              aria-label="Fermer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Icône du haut */}
            <div className="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-5 text-indigo-600 shadow-inner">
              <Sparkles className="w-7 h-7 text-indigo-600" />
            </div>

            {/* Titre */}
            <h2 className="text-2xl font-black text-slate-900 tracking-wide uppercase mb-3 leading-snug font-serif">
              Studio Relooking<br />Bambinos
            </h2>

            {/* Description */}
            <p className="text-gray-600 text-sm mb-6 leading-relaxed">
              Coloriez et personnalisez vos meubles en direct grâce à notre intelligence artificielle avant d'acheter votre création sur-mesure !
            </p>

            {/* Badge Teaser */}
            <div className="inline-flex items-center justify-center bg-amber-50 text-amber-800 text-xs font-bold px-4 py-1.5 rounded-full mb-6 border border-amber-200/80 shadow-sm">
              ✨ ARRIVE TRÈS PROCHAINEMENT (APRÈS)
            </div>

            {/* Action Fermer */}
            <div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-2xl transition-colors shadow-md shadow-blue-500/20 text-sm tracking-wide"
              >
                FERMER LE STUDIO
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
