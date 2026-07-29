import React from 'react';
import { useData } from '../../context/DataContext';
import { Camera, Sparkles } from 'lucide-react';

export const RealisationsGallery: React.FC = () => {
  const { homepage } = useData();

  if (!homepage || !homepage.realisations) return null;

  return (
    <section id="realisations" className="py-20 bg-stone-900 text-stone-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <span className="text-amber-400 text-xs font-semibold uppercase tracking-widest bg-amber-950/80 px-3.5 py-1 rounded-full border border-amber-800/60">
            <Camera className="w-3.5 h-3.5 inline mr-1.5" />
            Portfolio Projets
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">
            Réalisations & Aménagements Chez nos Clients
          </h2>
          <p className="text-stone-400 text-sm sm:text-base">
            Découvrez nos dernières réalisations sur mesure installées dans des appartements et villas d'exception.
          </p>
        </div>

        {/* Realisations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {homepage.realisations.map((item, index) => (
            <div
              key={index}
              className="group relative bg-stone-800 rounded-3xl overflow-hidden shadow-2xl border border-stone-700/80"
            >
              <div className="h-80 overflow-hidden relative">
                <img
                  src={item.image || "/uploads/images/bambinos_hero_room.jpg"}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/30 to-transparent" />
                
                <span className="absolute top-4 left-4 bg-amber-500 text-stone-950 font-semibold text-[10px] uppercase px-3 py-1 rounded-full">
                  {item.category}
                </span>

                <div className="absolute bottom-4 left-4 right-4 space-y-1">
                  <h3 className="font-serif text-lg font-bold text-white group-hover:text-amber-300 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-stone-300 line-clamp-2">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
