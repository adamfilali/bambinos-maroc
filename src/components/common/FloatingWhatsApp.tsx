import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { MessageCircle, Sparkles, X, PhoneCall } from 'lucide-react';
import { playClassicPhoneRing } from '../../utils/soundEffects';

export const FloatingWhatsApp: React.FC = () => {
  const { company } = useData();
  const [isOpen, setIsOpen] = useState(false);

  const phoneNum = company?.whatsapp || company?.phone || '+212 661-750-685';
  const cleanPhone = phoneNum.replace(/[^0-9]/g, '');

  const handleOpenChat = () => {
    const msg = encodeURIComponent("Bonjour BAMBINOS, je souhaite un devis sur-mesure pour mon projet d'aménagement enfant.");
    window.open(`https://wa.me/${cleanPhone}?text=${msg}`, '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 group">
      
      {/* Expanded Tooltip Card */}
      {isOpen && (
        <div className="bg-[#002240] border border-cyan-400/40 text-white rounded-2xl p-4 shadow-2xl max-w-xs w-72 text-xs space-y-3 animate-fade-in relative backdrop-blur-md">
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-2.5 right-2.5 text-slate-400 hover:text-white p-1"
          >
            <X className="w-3.5 h-3.5" />
          </button>

          <div className="flex items-center gap-3 border-b border-cyan-500/20 pb-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center font-serif font-bold text-lg text-white">
                B
              </div>
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-[#002240] rounded-full animate-pulse"></span>
            </div>
            <div>
              <h5 className="font-serif font-bold text-white text-sm">Bambinos Atelier</h5>
              <span className="text-[10px] text-emerald-400 font-medium">En ligne • Casablanca</span>
            </div>
          </div>

          <p className="text-slate-200 text-xs leading-relaxed">
            "Bonjour ! Nous sommes à votre écoute pour concevoir la chambre sur-mesure idéale de votre enfant. Discutez directement avec un conseiller."
          </p>

          <button
            onClick={handleOpenChat}
            onMouseEnter={playClassicPhoneRing}
            className="w-full bg-emerald-500 hover:bg-emerald-400 text-[#001830] font-black py-2.5 rounded-xl flex items-center justify-center gap-2 shadow-lg transition-all"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            <span>Démarrer la discussion</span>
          </button>
        </div>
      )}

      {/* Floating Button with Pulse Effect */}
      <div className="relative">
        <span className="absolute -inset-1.5 rounded-full bg-emerald-500/30 animate-ping pointer-events-none"></span>
        <button
          onClick={() => setIsOpen(!isOpen)}
          onMouseEnter={playClassicPhoneRing}
          className="relative bg-gradient-to-tr from-emerald-600 to-emerald-400 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center justify-center border-2 border-emerald-300"
          title="Discuter sur WhatsApp (+212 661-750-685)"
        >
          <MessageCircle className="w-7 h-7 fill-current" />
          <span className="absolute -top-1 -right-1 bg-yellow-400 text-[#001830] text-[9px] font-black px-1.5 py-0.5 rounded-full border border-[#002240]">
            1
          </span>
        </button>
      </div>

    </div>
  );
};
