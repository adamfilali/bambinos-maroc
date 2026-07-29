import React from 'react';
import { useData } from '../../context/DataContext';
import { ShieldCheck, Compass, Hammer, Truck, CheckCircle2 } from 'lucide-react';

export const Services: React.FC = () => {
  const { homepage } = useData();

  if (!homepage) return null;

  const { whyUs } = homepage;

  const getIcon = (name: string) => {
    switch (name) {
      case 'ShieldCheck':
        return <ShieldCheck className="w-4 h-4 text-slate-800" />;
      case 'Compass':
        return <Compass className="w-4 h-4 text-slate-800" />;
      case 'Hammer':
        return <Hammer className="w-4 h-4 text-slate-800" />;
      case 'Truck':
        return <Truck className="w-4 h-4 text-slate-800" />;
      default:
        return <CheckCircle2 className="w-4 h-4 text-slate-800" />;
    }
  };

  return (
    <section className="py-10 bg-stone-50/60 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Why Us Pillars - Minimal Apple Style */}
        <div className="text-center max-w-2xl mx-auto mb-8 space-y-1">
          <span className="text-slate-700 text-[10px] font-bold uppercase tracking-widest bg-stone-200/80 px-2.5 py-0.5 rounded-full inline-block">
            Nos Engagements
          </span>
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-stone-900">
            L'Excellence Sur-Mesure Bambinos
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {whyUs.map((pillar, idx) => (
            <div
              key={idx}
              className="bg-white p-5 rounded-2xl shadow-2xs border border-stone-200/70 hover:border-amber-700/40 transition-all space-y-2 group"
            >
              <div className="w-8 h-8 rounded-xl bg-stone-100 flex items-center justify-center group-hover:bg-amber-100/80 transition-colors">
                {getIcon(pillar.icon)}
              </div>
              <h3 className="font-serif text-sm font-bold text-stone-900">
                {pillar.title}
              </h3>
              <p className="text-[11px] text-stone-600 leading-relaxed">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
