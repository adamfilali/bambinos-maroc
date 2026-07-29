import React from 'react';
import { useData } from '../../context/DataContext';
import { Star, Quote } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const { homepage } = useData();

  if (!homepage || !homepage.testimonials) return null;

  return (
    <section className="py-20 bg-stone-100/80 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <span className="text-amber-800 text-xs font-semibold uppercase tracking-widest bg-amber-100 px-3 py-1 rounded-full">
            Témoignages Clients
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900">
            Ils Ont Fait Confiance à Bambinos
          </h2>
          <p className="text-stone-600 text-sm sm:text-base">
            Découvrez les retours d'expérience de parents et d'architectes satisfaits.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {homepage.testimonials.map((item, idx) => (
            <div
              key={idx}
              className="bg-white p-8 rounded-3xl shadow-xs border border-stone-200/90 flex flex-col justify-between space-y-6 relative"
            >
              <Quote className="w-10 h-10 text-amber-200/60 absolute top-6 right-6" />

              <div className="space-y-4">
                {/* Rating Stars */}
                <div className="flex items-center gap-1 text-amber-500">
                  {[...Array(item.rating || 5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-serif italic">
                  "{item.comment}"
                </p>
              </div>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-stone-100">
                <img
                  src={item.avatar}
                  alt={item.name}
                  className="w-11 h-11 rounded-full object-cover border border-stone-200"
                />
                <div>
                  <h4 className="font-serif font-bold text-stone-900 text-sm">
                    {item.name}
                  </h4>
                  <span className="text-[11px] text-stone-500">
                    {item.role}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
