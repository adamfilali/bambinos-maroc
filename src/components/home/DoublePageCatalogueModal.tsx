import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Product } from '../../types';
import {
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  FileText,
  Phone,
  MessageCircle,
  ShoppingBag,
  CheckCircle,
  Sparkles,
  Ruler,
  Weight,
  Layers,
  Palette,
  Info,
  BookOpen,
  Share2,
  Printer,
  Download,
  Home,
  Bed
} from 'lucide-react';
import { playClassicPhoneRing } from '../../utils/soundEffects';

export const DoublePageCatalogueModal: React.FC = () => {
  const {
    selectedProduct,
    closeProductModal,
    openQuoteModal,
    openPdfViewer,
    company,
    products,
    categories,
    showToast
  } = useData();

  if (!selectedProduct) return null;

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  // Find index of current product to support previous/next flipping
  const activeProductsList = products.filter((p) => p.status === 'active' || p.status === 'Publié');
  const currentIndex = activeProductsList.findIndex((p) => p.id === selectedProduct.id);

  const prevProduct = currentIndex > 0 ? activeProductsList[currentIndex - 1] : null;
  const nextProduct = currentIndex < activeProductsList.length - 1 ? activeProductsList[currentIndex + 1] : null;

  const categoryObj = categories.find((c) => c.id === selectedProduct.categoryId);
  const categoryName = categoryObj?.name || 'Mobilier Enfant Sur Mesure';

  // Related products from same category or collection
  const relatedProducts = activeProductsList
    .filter((p) => p.id !== selectedProduct.id && (p.categoryId === selectedProduct.categoryId || true))
    .slice(0, 4);

  const handleWhatsApp = () => {
    const phoneNum = company?.whatsapp || company?.phone || '+212 661-750-685';
    const cleanNum = phoneNum.replace(/[^0-9]/g, '');
    const msg = `Bonjour Bambinos, je suis intéressé(e) par le modèle sur mesure "${selectedProduct.name}" (Réf: ${selectedProduct.reference}). Pouvez-vous me recontacter ?`;
    window.open(`https://wa.me/${cleanNum}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const handlePhoneCall = () => {
    const phoneNum = company?.phone || '+212 661-750-685';
    window.location.href = `tel:${phoneNum.replace(/\s+/g, '')}`;
  };

  const handleShare = () => {
    const shareUrl = window.location.href;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareUrl);
      showToast('Lien de la fiche produit copié dans le presse-papier !', 'success');
    } else {
      showToast('Partage : ' + shareUrl, 'info');
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = () => {
    if (selectedProduct.pdfUrl) {
      openPdfViewer(selectedProduct.pdfUrl, `Fiche Technique - ${selectedProduct.name}`);
    } else {
      openPdfViewer('/uploads/pdf/catalogue_bambinos_2026.pdf', `Fiche Catalogue - ${selectedProduct.name}`);
    }
  };

  const activeImage = selectedProduct.images[activeImageIndex] || selectedProduct.images[0] || "/uploads/images/bambinos_hero_room30.jpg";

  return (
    <div className="fixed inset-0 z-50 bg-[#001830]/90 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 lg:p-6 overflow-y-auto animate-fade-in">
      
      {/* Catalogue Book Envelope Container */}
      <div className="relative bg-[#002240] border border-cyan-500/30 rounded-3xl shadow-2xl w-full max-w-7xl overflow-hidden my-auto flex flex-col text-slate-100">
        
        {/* Top Book Header Bar */}
        <div className="px-6 py-4 bg-[#001830] border-b border-cyan-500/20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#38C0E3] text-[#002240] font-serif font-black text-lg flex items-center justify-center shadow-md">
              B
            </div>
            <div>
              <span className="font-serif font-bold text-white text-sm tracking-wide block">
                CATALOGUE DOUBLE PAGE BAMBINOS
              </span>
              <span className="text-[10px] text-cyan-300 font-mono">
                {selectedProduct.reference} • {categoryName}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Flip Page Navigation Controls */}
            <div className="flex items-center gap-1 bg-[#002240] rounded-xl p-1 text-xs border border-slate-700">
              <button
                disabled={!prevProduct}
                onClick={() => {
                  if (prevProduct) {
                    setActiveImageIndex(0);
                    useData().openProductModal(prevProduct);
                  }
                }}
                className="px-2.5 py-1 rounded-lg text-slate-300 hover:text-cyan-300 disabled:opacity-30 disabled:hover:text-slate-300 flex items-center gap-1 transition-colors"
                title="Page Précédente"
              >
                <ChevronLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Modèle Précédent</span>
              </button>
              <span className="text-slate-700 px-1">|</span>
              <button
                disabled={!nextProduct}
                onClick={() => {
                  if (nextProduct) {
                    setActiveImageIndex(0);
                    useData().openProductModal(nextProduct);
                  }
                }}
                className="px-2.5 py-1 rounded-lg text-slate-300 hover:text-cyan-300 disabled:opacity-30 disabled:hover:text-slate-300 flex items-center gap-1 transition-colors"
                title="Page Suivante"
              >
                <span className="hidden sm:inline">Modèle Suivant</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Close Button */}
            <button
              onClick={closeProductModal}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Double Page Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-cyan-500/20 bg-[#001830] min-h-[600px]">
          
          {/* ================= PAGE GAUCHE : FICHE TECHNIQUE & DÉTAILS ================= */}
          <div className="p-6 sm:p-8 space-y-6 overflow-y-auto max-h-[700px] bg-[#002240]/60">
            
            {/* Breadcrumbs Trail */}
            <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-semibold border-b border-slate-800 pb-3 flex-wrap">
              <a href="#" onClick={closeProductModal} className="hover:text-cyan-300 flex items-center gap-1">
                <Home className="w-3 h-3 text-[#38C0E3]" />
                <span>Accueil</span>
              </a>
              <ChevronRight className="w-3 h-3 text-slate-600" />
              <a href="#categories" onClick={closeProductModal} className="hover:text-cyan-300">
                <span>{categoryName}</span>
              </a>
              <ChevronRight className="w-3 h-3 text-slate-600" />
              <span className="text-yellow-300 font-bold">{selectedProduct.name}</span>
            </div>

            {/* Header info */}
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="px-3 py-1 rounded-full bg-[#001830] text-cyan-300 text-xs font-bold border border-cyan-500/40">
                  {categoryName}
                </span>
                <span className="text-xs text-emerald-400 bg-emerald-950/80 border border-emerald-800/60 px-3 py-1 rounded-full font-bold">
                  {selectedProduct.availability}
                </span>
              </div>

              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-2">
                {selectedProduct.name}
              </h2>

              <p className="text-xs text-yellow-300 font-mono">
                Référence : {selectedProduct.reference}
              </p>
            </div>

            {/* Quick Document Actions Bar: PDF, Share, Print */}
            <div className="flex items-center gap-2 bg-[#001830] p-2.5 rounded-2xl border border-slate-800">
              <button
                onClick={handleDownloadPDF}
                className="flex-1 py-1.5 px-2 bg-[#002240] hover:bg-[#003E73] text-cyan-300 text-[11px] font-bold rounded-xl flex items-center justify-center gap-1.5 transition-colors border border-cyan-500/20"
                title="Télécharger la fiche technique au format PDF HD"
              >
                <Download className="w-3.5 h-3.5 text-yellow-300" />
                <span>Télécharger PDF</span>
              </button>

              <button
                onClick={handleShare}
                className="py-1.5 px-3 bg-[#002240] hover:bg-[#003E73] text-slate-200 text-[11px] font-bold rounded-xl flex items-center justify-center gap-1.5 transition-colors border border-slate-700"
                title="Partager cette création"
              >
                <Share2 className="w-3.5 h-3.5 text-cyan-400" />
                <span>Partager</span>
              </button>

              <button
                onClick={handlePrint}
                className="py-1.5 px-3 bg-[#002240] hover:bg-[#003E73] text-slate-200 text-[11px] font-bold rounded-xl flex items-center justify-center gap-1.5 transition-colors border border-slate-700"
                title="Imprimer la fiche"
              >
                <Printer className="w-3.5 h-3.5 text-slate-400" />
                <span>Imprimer</span>
              </button>
            </div>

            {/* Price Box */}
            <div className="bg-[#001830] p-4 rounded-2xl border border-cyan-500/20 flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-400 block">Tarif indicatif sur mesure</span>
                <div className="flex items-baseline gap-3">
                  <span className="font-serif text-2xl sm:text-3xl font-black text-yellow-300">
                    {(selectedProduct.promoPrice || selectedProduct.price).toLocaleString('fr-FR')} MAD
                  </span>
                  {selectedProduct.promoPrice && (
                    <span className="text-sm text-slate-500 line-through">
                      {selectedProduct.price.toLocaleString('fr-FR')} MAD
                    </span>
                  )}
                </div>
              </div>
              <span className="text-[11px] text-cyan-300 bg-[#002240] px-3 py-1 rounded-xl border border-cyan-500/30">
                Devis exact selon dimensions
              </span>
            </div>

            {/* Descriptions */}
            <div className="space-y-3 text-xs sm:text-sm text-slate-200 leading-relaxed">
              <p className="font-semibold text-white">
                {selectedProduct.shortDescription}
              </p>
              <p className="text-slate-300">
                {selectedProduct.fullDescription}
              </p>
            </div>

            {/* Features Checklist */}
            {selectedProduct.features && selectedProduct.features.length > 0 && (
              <div className="space-y-2 pt-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-300 flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  <span>Points Forts & Caractéristiques</span>
                </h4>
                <ul className="grid grid-cols-1 gap-1.5 text-xs text-slate-200 pl-2">
                  {selectedProduct.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#38C0E3] mt-1.5 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Technical Specs Table */}
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-300 flex items-center gap-1.5">
                <Info className="w-4 h-4 text-yellow-300" />
                <span>Fiche Technique & Dimensions</span>
              </h4>

              <div className="bg-[#001830] rounded-2xl border border-slate-800 p-3.5 space-y-2 text-xs">
                {selectedProduct.dimensions && (
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                    <span className="text-slate-400 flex items-center gap-1.5">
                      <Ruler className="w-3.5 h-3.5 text-cyan-400" /> Dimensions
                    </span>
                    <span className="font-medium text-white">{selectedProduct.dimensions}</span>
                  </div>
                )}

                {selectedProduct.weight && (
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                    <span className="text-slate-400 flex items-center gap-1.5">
                      <Weight className="w-3.5 h-3.5 text-cyan-400" /> Poids Estimé
                    </span>
                    <span className="font-medium text-white">{selectedProduct.weight}</span>
                  </div>
                )}

                {selectedProduct.materials && selectedProduct.materials.length > 0 && (
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                    <span className="text-slate-400 flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-cyan-400" /> Matériaux
                    </span>
                    <span className="font-medium text-white">{selectedProduct.materials.join(', ')}</span>
                  </div>
                )}

                {selectedProduct.colors && selectedProduct.colors.length > 0 && (
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 flex items-center gap-1.5">
                      <Palette className="w-3.5 h-3.5 text-cyan-400" /> Finitions & Couleurs
                    </span>
                    <span className="font-medium text-white">{selectedProduct.colors.join(', ')}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Direct Action Buttons */}
            <div className="pt-2 grid grid-cols-2 gap-3">
              <button
                onClick={() => {
                  closeProductModal();
                  openQuoteModal(selectedProduct.reference);
                }}
                className="col-span-2 bg-[#38C0E3] hover:bg-cyan-300 text-[#002240] font-black py-3.5 rounded-xl text-xs uppercase tracking-wider transition-all shadow-lg flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Demander mon Devis 3D Personnalisé</span>
              </button>

              <button
                onClick={handleWhatsApp}
                onMouseEnter={playClassicPhoneRing}
                className="bg-emerald-600 hover:bg-emerald-500 text-white py-3 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>WhatsApp Direct</span>
              </button>

              <button
                onClick={handlePhoneCall}
                onMouseEnter={playClassicPhoneRing}
                className="bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-cyan-500/30 py-3 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4" />
                <span>+212 661-750-685</span>
              </button>
            </div>

            {/* Produits Similaires & Même Collection */}
            {relatedProducts.length > 0 && (
              <div className="pt-4 border-t border-slate-800 space-y-2">
                <span className="text-xs font-bold text-cyan-300 uppercase tracking-wider block">
                  Produits Similaires & Même Collection
                </span>
                <div className="grid grid-cols-2 gap-2.5">
                  {relatedProducts.map((rel) => (
                    <div
                      key={rel.id}
                      onClick={() => {
                        setActiveImageIndex(0);
                        useData().openProductModal(rel);
                      }}
                      className="p-2 rounded-xl bg-[#001830] hover:bg-[#002240] border border-slate-800 hover:border-cyan-500/40 cursor-pointer transition-all flex items-center gap-2 group"
                    >
                      <img
                        src={rel.images[0] || "/uploads/images/bambinos_hero_room60.jpg"}
                        alt={rel.name}
                        className="w-10 h-10 rounded-lg object-cover border border-slate-700"
                      />
                      <div className="min-w-0 flex-1">
                        <h6 className="font-serif text-[11px] font-bold text-white truncate group-hover:text-cyan-300">
                          {rel.name}
                        </h6>
                        <span className="text-[10px] text-yellow-300 font-mono block font-bold">
                          {(rel.promoPrice || rel.price).toLocaleString('fr-FR')} MAD
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* ================= PAGE DROITE : IMAGE TAILLE REELLE TOUTE LA PAGE ================= */}
          <div className="relative flex flex-col justify-between p-0 overflow-hidden bg-black group min-h-[500px]">
            
            {/* Full-bleed Single Image taking whole right page */}
            <img
              src={activeImage}
              alt={selectedProduct.name}
              className={`w-full h-full object-cover transition-transform duration-500 ${
                isZoomed ? 'scale-150 cursor-zoom-out' : 'group-hover:scale-105 cursor-zoom-in'
              }`}
              onClick={() => setIsZoomed(!isZoomed)}
            />

            {/* Subtle Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

            {/* Top Right Controls & Badge */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10 pointer-events-none">
              <span className="bg-[#002240]/90 text-cyan-300 text-[10px] font-mono px-3 py-1.5 rounded-full border border-cyan-500/40 backdrop-blur-md">
                PAGE DROITE • VUE PLEINE PAGE ({activeImageIndex + 1}/{selectedProduct.images.length || 1})
              </span>

              <button
                onClick={() => setIsZoomed(!isZoomed)}
                className="pointer-events-auto bg-[#001830]/90 text-yellow-300 p-2.5 rounded-xl backdrop-blur-md border border-yellow-300/30 hover:bg-[#38C0E3] hover:text-[#002240] transition-all shadow-lg"
                title="Agrandir / Zoom"
              >
                {isZoomed ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>
            </div>

            {/* Bottom Caption Overlay */}
            <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-[#001830]/85 border border-cyan-500/30 backdrop-blur-md flex items-center justify-between text-xs z-10">
              <div>
                <span className="font-serif font-bold text-white text-sm block">
                  {selectedProduct.name}
                </span>
                <span className="text-[11px] text-slate-300">
                  Aménagement photo-réaliste • Fabrication MDF Écologique
                </span>
              </div>
              <span className="text-yellow-300 font-mono font-bold text-xs bg-[#002240] px-2.5 py-1 rounded-lg border border-yellow-300/20">
                Atelier Bambinos
              </span>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

