import React from 'react';
import { useData } from '../../context/DataContext';
import { BambinosLogo } from '../common/BambinosLogo';
import {
  Phone,
  MessageCircle,
  MapPin,
  Clock,
  Instagram,
  Facebook,
  Youtube,
  FileText,
  Lock,
  Sparkles,
  Share2
} from 'lucide-react';
import { playClassicPhoneRing } from '../../utils/soundEffects';

export const Footer: React.FC = () => {
  const { company, openQuoteModal, openAdmin, authUser } = useData();

  return (
    <footer className="bg-[#001830] text-slate-200 pt-16 pb-8 border-t border-cyan-500/20 font-body">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Brand & Showroom Information Banner */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-12 border-b border-cyan-500/20">
          
          {/* Brand Info */}
          <div className="space-y-3">
            <BambinosLogo variant="white" size="md" />
            <p className="text-xs text-slate-300 leading-relaxed font-body">
              Créateur d'espace sur mesure pour enfants à Casablanca. Mobilier haut de gamme en MDF écologique conçu pour l'éveil, la sécurité et l'harmonie.
            </p>
            <div className="flex items-start gap-2 text-xs text-slate-300 pt-1">
              <MapPin className="w-4 h-4 text-[#38C0E3] shrink-0 mt-0.5" />
              <span>Hermitage Casablanca, 41 Rue des pléiades, Casablanca 20100 🇲🇦</span>
            </div>
          </div>

          {/* Hours & Contact */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-bold text-white tracking-wider uppercase border-b border-cyan-500/30 pb-2">
              Atelier & Showroom
            </h4>
            <div className="text-xs text-slate-300 space-y-2">
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-[#E5E632] shrink-0 mt-0.5" />
                <div>
                  <span className="text-white font-medium block">Horaires d'ouverture :</span>
                  <span>Lundi au Samedi : 09:00 - 20:00</span>
                  <br />
                  <span className="text-[#38C0E3]">Dimanche : Sur rendez-vous uniquement</span>
                </div>
              </div>
              <div className="pt-1">
                <span className="text-white font-medium block">Service client (Casablanca) :</span>
                <a
                  href="tel:+212661750685"
                  onMouseEnter={playClassicPhoneRing}
                  className="font-mono font-bold text-[#E5E632] hover:text-white transition-colors text-xs inline-flex items-center gap-1.5 mt-1 bg-[#002240] px-3 py-1.5 rounded-xl border border-cyan-500/30"
                >
                  <Phone className="w-3.5 h-3.5 text-[#38C0E3]" />
                  <span>+212 661-750-685</span>
                </a>
              </div>
            </div>
          </div>

          {/* Social Community Callout */}
          <div className="bg-[#002240] p-5 rounded-2xl border border-cyan-500/30 space-y-3">
            <h4 className="font-serif text-sm font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#E5E632]" />
              <span>Suivez notre Atelier</span>
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Rejoignez plus de 15 000 parents qui nous font confiance pour la conception d'espaces magiques.
            </p>
            <button
              onClick={() => openQuoteModal()}
              className="w-full bg-[#38C0E3] hover:bg-cyan-300 text-[#002240] font-black text-xs py-2.5 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2"
            >
              <FileText className="w-4 h-4" />
              <span>Demander un devis sur mesure</span>
            </button>
          </div>

        </div>

        {/* 5 Columns Links Section */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 py-12 border-b border-cyan-500/20 text-xs">
          
          {/* Col 1: Entreprise */}
          <div className="space-y-3">
            <h5 className="font-serif text-sm font-bold text-white tracking-wider uppercase border-b border-slate-800 pb-2">
              Entreprise
            </h5>
            <ul className="space-y-2 text-slate-300">
              <li><a href="#presentation" className="hover:text-[#38C0E3] transition-colors">À propos</a></li>
              <li><a href="#realisations" className="hover:text-[#38C0E3] transition-colors">Nos réalisations</a></li>
              <li><a href="#services" className="hover:text-[#38C0E3] transition-colors">Nos services</a></li>
              <li><a href="#contact" className="hover:text-[#38C0E3] transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Col 2: Produits */}
          <div className="space-y-3">
            <h5 className="font-serif text-sm font-bold text-white tracking-wider uppercase border-b border-slate-800 pb-2">
              Produits
            </h5>
            <ul className="space-y-2 text-slate-300">
              <li><a href="#categories" className="hover:text-[#38C0E3] transition-colors">Chambres</a></li>
              <li><a href="#categories" className="hover:text-[#38C0E3] transition-colors">Dressings</a></li>
              <li><a href="#categories" className="hover:text-[#38C0E3] transition-colors">Bibliothèques</a></li>
              <li><a href="#categories" className="hover:text-[#38C0E3] transition-colors">Bureaux</a></li>
              <li><a href="#categories" className="hover:text-[#38C0E3] transition-colors">Décoration</a></li>
            </ul>
          </div>

          {/* Col 3: Services */}
          <div className="space-y-3">
            <h5 className="font-serif text-sm font-bold text-white tracking-wider uppercase border-b border-slate-800 pb-2">
              Services
            </h5>
            <ul className="space-y-2 text-slate-300">
              <li><a href="#services" className="hover:text-[#38C0E3] transition-colors">Étude 3D</a></li>
              <li><a href="#services" className="hover:text-[#38C0E3] transition-colors">Fabrication</a></li>
              <li><a href="#services" className="hover:text-[#38C0E3] transition-colors">Livraison</a></li>
              <li><a href="#services" className="hover:text-[#38C0E3] transition-colors">Installation</a></li>
              <li><a href="#services" className="hover:text-[#38C0E3] transition-colors">Service après-vente</a></li>
            </ul>
          </div>

          {/* Col 4: Informations */}
          <div className="space-y-3">
            <h5 className="font-serif text-sm font-bold text-white tracking-wider uppercase border-b border-slate-800 pb-2">
              Informations
            </h5>
            <ul className="space-y-2 text-slate-300">
              <li><a href="#faq" className="hover:text-[#38C0E3] transition-colors">Conditions générales</a></li>
              <li><a href="#faq" className="hover:text-[#38C0E3] transition-colors">Politique de confidentialité</a></li>
              <li><a href="#faq" className="hover:text-[#38C0E3] transition-colors">Mentions légales</a></li>
            </ul>
          </div>

          {/* Col 5: Réseaux sociaux */}
          <div className="space-y-3 col-span-2 md:col-span-1">
            <h5 className="font-serif text-sm font-bold text-white tracking-wider uppercase border-b border-slate-800 pb-2">
              Réseaux sociaux
            </h5>
            <ul className="space-y-2 text-slate-300">
              <li>
                <a href={company?.socialLinks?.facebook || "https://facebook.com/bambinos.surmesure"} target="_blank" rel="noopener noreferrer" className="hover:text-[#38C0E3] transition-colors flex items-center gap-2">
                  <Facebook className="w-3.5 h-3.5 text-[#38C0E3]" />
                  <span>Facebook</span>
                </a>
              </li>
              <li>
                <a href={company?.socialLinks?.instagram || "https://instagram.com/bambinos_surmesure"} target="_blank" rel="noopener noreferrer" className="hover:text-[#38C0E3] transition-colors flex items-center gap-2">
                  <Instagram className="w-3.5 h-3.5 text-pink-400" />
                  <span>Instagram</span>
                </a>
              </li>
              <li>
                <a href="https://tiktok.com/@bambinos_maroc" target="_blank" rel="noopener noreferrer" className="hover:text-[#38C0E3] transition-colors flex items-center gap-2">
                  <Share2 className="w-3.5 h-3.5 text-cyan-300" />
                  <span>TikTok</span>
                </a>
              </li>
              <li>
                <a href={company?.socialLinks?.youtube || "https://youtube.com/@bambinos_maroc"} target="_blank" rel="noopener noreferrer" className="hover:text-[#38C0E3] transition-colors flex items-center gap-2">
                  <Youtube className="w-3.5 h-3.5 text-rose-500" />
                  <span>YouTube</span>
                </a>
              </li>
              <li>
                <a href={`https://wa.me/${(company?.whatsapp || '+212 661-750-685').replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" className="hover:text-[#38C0E3] transition-colors flex items-center gap-2">
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                  <span>WhatsApp</span>
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Rights & Admin Link */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© {new Date().getFullYear()} BAMBINOS. Tous droits réservés. Fabriqué à Casablanca, Maroc.</p>
          <button
            onClick={openAdmin}
            className="hover:text-[#E5E632] text-slate-300 transition-colors flex items-center gap-1.5 font-semibold bg-[#002240] px-3 py-1.5 rounded-xl border border-cyan-500/30"
          >
            <Lock className="w-3.5 h-3.5 text-[#38C0E3]" />
            <span>{authUser ? `Espace Admin (${authUser.username})` : 'Connexion Admin'}</span>
          </button>
        </div>

      </div>
    </footer>
  );
};
