import React from 'react';
import { useData } from '../../context/DataContext';
import { ArrowRight, Bed, Layers, Archive, BookOpen, Sparkles } from 'lucide-react';

export const CategoriesGrid: React.FC = () => {
  const { categories, products } = useData();

  const getCategoryCount = (catId: string) => {
    return products.filter((p) => p.categoryId === catId && (p.status === 'active' || p.status === 'Publié')).length;
  };

  const getCategoryIcon = (iconName?: string) => {
    switch (iconName) {
      case 'Bed':
        return <Bed className="w-3.5 h-3.5" />;
      case 'Layers':
        return <Layers className="w-3.5 h-3.5" />;
      case 'Archive':
        return <Archive className="w-3.5 h-3.5" />;
      case 'BookOpen':
        return <BookOpen className="w-3.5 h-3.5" />;
      default:
        return <Sparkles className="w-3.5 h-3.5" />;
    }
  };

  return (
    <section id="categories" className="py-12 bg-[#FAFAF8] border-b border-slate-200/80 font-body">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-3">
          <div>
            <span className="text-[#38C0E3] text-[11px] font-bold uppercase tracking-widest bg-[#001830] px-3 py-1 rounded-full border border-cyan-500/30">
              Nos Univers Sur-Mesure
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#003E73] mt-2">
              Explorer les Catégories Bambinos
            </h2>
          </div>
          <p className="text-slate-600 text-xs sm:text-sm max-w-md">
            Découvrez nos collections pour enfants : chambres, dressings, lits cabanes et espaces d'étude sur-mesure à Casablanca.
          </p>
        </div>

        {/* Single Line Horizontal Scrollable Carousel */}
        <div className="flex items-stretch gap-4 overflow-x-auto pb-4 pt-2 no-scrollbar scroll-smooth snap-x">
          {categories.map((cat) => {
            const count = getCategoryCount(cat.id);
            return (
              <a
                key={cat.id}
                href="#catalogue"
                className="snap-start shrink-0 w-64 sm:w-72 bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200 flex flex-col group hover:-translate-y-1"
              >
                {/* Image Showcase */}
                <div className="relative h-36 overflow-hidden bg-slate-100">
                  <img
                    src={cat.image || "/uploads/images/bambinos_hero_room06.jpg"}
                    alt={cat.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#001830]/80 via-transparent to-transparent" />
                  
                  {/* Minimized Category Badge Icon */}
                  <div className="absolute top-2.5 left-2.5 bg-[#001830]/90 backdrop-blur-md text-[#38C0E3] p-1.5 rounded-lg border border-cyan-500/30">
                    {getCategoryIcon(cat.icon)}
                  </div>

                  {/* Product Count Pill */}
                  <span className="absolute top-2.5 right-2.5 bg-[#001830]/90 backdrop-blur-md text-[#E5E632] text-[10px] font-mono px-2.5 py-0.5 rounded-full border border-cyan-500/20">
                    {count} modèle{count > 1 ? 's' : ''}
                  </span>

                  {/* Category Title Overlay */}
                  <div className="absolute bottom-2.5 left-3 right-3 text-white">
                    <h3 className="font-serif text-base font-bold group-hover:text-[#38C0E3] transition-colors truncate">
                      {cat.name}
                    </h3>
                  </div>
                </div>

                {/* Card Description & CTA */}
                <div className="p-3.5 space-y-2 flex-1 flex flex-col justify-between bg-white">
                  <p className="text-[11px] text-slate-600 line-clamp-2 leading-tight">
                    {cat.description}
                  </p>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-[11px] font-bold text-[#003E73] group-hover:text-[#38C0E3] transition-colors">
                    <span>Explorer la collection</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform text-[#38C0E3]" />
                  </div>
                </div>
              </a>
            );
          })}
        </div>

      </div>
    </section>
  );
};

