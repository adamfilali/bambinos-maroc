import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { ChevronDown, HelpCircle } from 'lucide-react';

export const FAQ: React.FC = () => {
  const { homepage } = useData();
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  if (!homepage || !homepage.faqs || homepage.faqs.length === 0) return null;

  const displayFaqs = homepage.faqs.slice(0, 5);

  return (
    <section className="py-10 bg-stone-50/80 border-b border-stone-200">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center mb-6 space-y-1">
          <span className="text-amber-900 text-[10px] font-bold uppercase tracking-widest bg-amber-100 px-2.5 py-0.5 rounded-full inline-flex items-center gap-1">
            <HelpCircle className="w-3 h-3 text-amber-800" />
            Questions Fréquentes
          </span>
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-stone-900">
            Foire Aux Questions
          </h2>
        </div>

        {/* Compact Accordion */}
        <div className="space-y-2">
          {displayFaqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-xl border border-stone-200/80 overflow-hidden transition-all shadow-xs"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full py-3 px-4 text-left flex items-center justify-between gap-3 font-medium text-stone-900 text-xs sm:text-sm hover:text-amber-900 transition-colors"
                >
                  <span className="font-bold">{faq.question}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-amber-800 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-4 pb-3 pt-0 text-xs text-stone-600 leading-relaxed border-t border-stone-100/60 animate-fade-in">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
