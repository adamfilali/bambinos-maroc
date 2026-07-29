import React from 'react';
import { DataProvider, useData } from './context/DataContext';
import { SeoHead } from './components/seo/SeoHead';
import { Navbar } from './components/layout/Navbar';
import { Hero } from './components/home/Hero';
import { Presentation } from './components/home/Presentation';
import { CategoriesGrid } from './components/home/CategoriesGrid';
import { FeaturedProducts } from './components/home/FeaturedProducts';
import { RealisationsGallery } from './components/home/RealisationsGallery';
import { Services } from './components/home/Services';
import { FAQ } from './components/home/FAQ';
import { ContactSection } from './components/home/ContactSection';
import { Footer } from './components/layout/Footer';
import { DoublePageCatalogueModal } from './components/home/DoublePageCatalogueModal';
import { QuoteModal } from './components/modals/QuoteModal';
import { PdfViewerModal } from './components/modals/PdfViewerModal';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { FloatingWhatsApp } from './components/common/FloatingWhatsApp';
import { RelookingModal } from './components/modals/RelookingModal';
import { PremiumLoader } from './components/common/PremiumLoader';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';

const ToastContainer: React.FC = () => {
  const { toasts } = useData();

  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="fixed bottom-20 left-5 z-50 space-y-2 pointer-events-none">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`pointer-events-auto px-4 py-3 rounded-xl shadow-2xl text-xs font-semibold flex items-center gap-2.5 transition-all animate-bounce-subtle ${
            t.type === 'success'
              ? 'bg-[#002240] text-cyan-300 border border-cyan-500/40'
              : t.type === 'error'
              ? 'bg-rose-950 text-rose-200 border border-rose-800'
              : 'bg-[#002240] text-slate-100 border border-slate-700'
          }`}
        >
          {t.type === 'success' ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          ) : t.type === 'error' ? (
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
          ) : (
            <Info className="w-4 h-4 text-cyan-400 shrink-0" />
          )}
          <span>{t.message}</span>
        </div>
      ))}
    </div>
  );
};

function MainContent() {
  const { loading, homepage } = useData();

  if (loading) {
    return <PremiumLoader />;
  }

  const sections = homepage?.sections || {
    hero: true,
    presentation: true,
    categories: true,
    products: true,
    realisations: true,
    services: true,
    faq: true,
    contact: true
  };

  return (
    <div className="min-h-screen bg-[#001830] font-sans text-slate-100 selection:bg-[#38C0E3] selection:text-[#002240]">
      <SeoHead />
      <Navbar />
      <main>
        {sections.hero !== false && <Hero />}
        {sections.presentation !== false && <Presentation />}
        {sections.categories !== false && <CategoriesGrid />}
        {sections.products !== false && <FeaturedProducts />}
        {sections.realisations !== false && <RealisationsGallery />}
        {sections.services !== false && <Services />}
        {sections.faq !== false && <FAQ />}
        {sections.contact !== false && <ContactSection />}
      </main>
      <Footer />

      {/* Floating Action WhatsApp & Relooking IA */}
      <FloatingWhatsApp />
      <RelookingModal />

      {/* Modals */}
      <DoublePageCatalogueModal />
      <QuoteModal />
      <PdfViewerModal />
      <AdminDashboard />

      {/* Toast Notifications */}
      <ToastContainer />
    </div>
  );
}

export default function App() {
  return (
    <DataProvider>
      <MainContent />
    </DataProvider>
  );
}

