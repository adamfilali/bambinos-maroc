import React from 'react';
import { useData } from '../../context/DataContext';
import { Award, CheckCircle, Hammer, HeartHandshake } from 'lucide-react';

export const Presentation: React.FC = () => {
  const { homepage } = useData();

  if (!homepage) return null;

  const { presentation } = homepage;

  return (
    <section id="presentation" className="py-20 bg-stone-100 text-stone-900 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Images Layout Stack */}
          <div className="relative">
            <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
              <img
                src={presentation.image1 || "/uploads/images/bambinos_hero_room06.jpg"}
                alt="Chambre enfant sur mesure Bambinos"
                className="w-full h-[400px] sm:h-[480px] object-cover"
              />
            </div>
            
            {/* Secondary Floating Image */}
            <div className="absolute -bottom-8 -right-6 z-20 w-3/5 rounded-2xl overflow-hidden shadow-2xl border-4 border-white hidden sm:block">
              <img
                src={presentation.image2 || "/uploads/images/bambinos_dressing11.jpg"}
                alt="Dressing enfant sur mesure"
                className="w-full h-48 sm:h-56 object-cover"
              />
            </div>

            {/* Experience Floating Badge */}
            <div className="absolute top-6 left-6 z-30 bg-stone-900/90 backdrop-blur-md text-amber-300 p-4 rounded-2xl shadow-xl border border-amber-500/30">
              <span className="font-serif text-3xl font-extrabold block">
                {presentation.yearsExperience || 15}+
              </span>
              <span className="text-[11px] font-medium uppercase tracking-wider text-stone-300 block">
                Années d'Excellence
              </span>
            </div>
          </div>

          {/* Text Content */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-semibold uppercase tracking-widest">
              <Award className="w-3.5 h-3.5 text-amber-700" />
              <span>Savoir-Faire Artisan</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 leading-tight">
              {presentation.title || "L'Excellence du Sur-Mesure Enfant"}
            </h2>

            <p className="font-serif italic text-lg text-amber-900 font-medium">
              "{presentation.subtitle || "Harmonie, sécurité et poésie au cœur de chaque création."}"
            </p>

            <p className="text-stone-600 leading-relaxed text-sm sm:text-base">
              {presentation.text || "Chez BAMBINOS, nous croyons qu'une chambre d'enfant n'est pas seulement une pièce, mais un sanctuaire d'éveil, de jeu et d'apprentissage. Nous concevons chaque meuble avec la précision de la haute ébénisterie et la bienveillance qu'exige le monde de l'enfance."}
            </p>

            {/* Statistics Row */}
            <div className="pt-4 grid grid-cols-3 gap-4 border-t border-stone-200">
              <div>
                <span className="font-serif text-3xl font-bold text-amber-900 block">
                  {presentation.yearsExperience || 15}+
                </span>
                <span className="text-xs text-stone-500">Ans d'expérience</span>
              </div>
              <div>
                <span className="font-serif text-3xl font-bold text-amber-900 block">
                  {presentation.projectsCompleted || 850}+
                </span>
                <span className="text-xs text-stone-500">Projets réalisés</span>
              </div>
              <div>
                <span className="font-serif text-3xl font-bold text-amber-900 block">
                  {presentation.satisfactionRate || 99}%
                </span>
                <span className="text-xs text-stone-500">Clients satisfaits</span>
              </div>
            </div>

            {/* Commitments List */}
            <div className="space-y-2 pt-2">
              <div className="flex items-center gap-2.5 text-xs sm:text-sm text-stone-800 font-medium">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Fabrication personnalisée en bois noble sans produits toxiques</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs sm:text-sm text-stone-800 font-medium">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Plans 3D photoréalistes validés avant toute découpe</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs sm:text-sm text-stone-800 font-medium">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Pose soignée à domicile par nos compagnons menuisiers</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
