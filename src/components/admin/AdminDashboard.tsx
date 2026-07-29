import React, { useState, useEffect } from 'react';
import { useData } from '../../context/DataContext';
import { Product, Category, Catalogue, Banner, Slider, GalleryItem } from '../../types';
import { BambinosLogo } from '../common/BambinosLogo';
import { FileManager } from './FileManager';
import { MenuManager } from './MenuManager';
import {
  Lock,
  LogOut,
  X,
  Plus,
  Edit,
  Trash2,
  Upload,
  Save,
  CheckCircle,
  FileText,
  Clock,
  Layers,
  Bed,
  Image as ImageIcon,
  FolderPlus,
  BookOpen,
  Settings as SettingsIcon,
  MessageSquare,
  History,
  ShieldCheck,
  Search,
  Download,
  Eye,
  Globe,
  SlidersHorizontal,
  LayoutTemplate,
  Phone,
  MessageCircle,
  MapPin,
  GitBranch,
  Video,
  Folder,
  Menu as MenuIcon
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const {
    isAdminOpen,
    closeAdmin,
    authUser,
    login,
    logout,
    products,
    categories,
    catalogues,
    pages,
    homepage,
    settings,
    banners,
    sliders,
    company,
    contacts,
    gallery,
    history,
    saveData,
    uploadFile,
    exportBackup,
    importBackup,
    showToast
  } = useData();

  // Login state
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState(false);

  // Active Admin Tab
  const [activeTab, setActiveTab] = useState<
    | 'dashboard'
    | 'products'
    | 'categories'
    | 'menu'
    | 'files'
    | 'catalogues'
    | 'homepage'
    | 'banners'
    | 'company'
    | 'backup'
  >('dashboard');

  // Modals state
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);

  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);

  const [editingCatalogue, setEditingCatalogue] = useState<Catalogue | null>(null);
  const [isCatalogueModalOpen, setIsCatalogueModalOpen] = useState(false);

  const [editingBanner, setEditingBanner] = useState<Banner | null>(null);
  const [isBannerModalOpen, setIsBannerModalOpen] = useState(false);

  // Search in admin lists
  const [adminSearch, setAdminSearch] = useState('');

  // Company Form State
  const [companyForm, setCompanyForm] = useState({
    name: company?.name || 'BAMBINOS',
    slogan: company?.slogan || "Créateur d'Espaces Enfants & Nurseries Sur Mesure",
    address: company?.address || 'Boulevard d\'Anfa, Mâarif',
    city: company?.city || 'Casablanca, Maroc',
    phone: company?.phone || '+212 6 61 00 00 00',
    whatsapp: company?.whatsapp || '212661000000',
    email: company?.email || 'devis@bambinos.ma',
    workingHours: company?.workingHours || 'Lun - Sam: 09:00 - 19:30',
    mapEmbedUrl: company?.mapEmbedUrl || '',
    instagram: company?.socialLinks?.instagram || 'https://instagram.com/bambinos.ma',
    facebook: company?.socialLinks?.facebook || 'https://facebook.com/bambinos.ma',
    tiktok: company?.socialLinks?.tiktok || '',
    youtube: company?.socialLinks?.youtube || ''
  });

  useEffect(() => {
    if (company) {
      setCompanyForm({
        name: company.name || 'BAMBINOS',
        slogan: company.slogan || "Créateur d'Espaces Enfants & Nurseries Sur Mesure",
        address: company.address || 'Boulevard d\'Anfa, Mâarif',
        city: company.city || 'Casablanca, Maroc',
        phone: company.phone || '+212 6 61 00 00 00',
        whatsapp: company.whatsapp || '212661000000',
        email: company.email || 'devis@bambinos.ma',
        workingHours: company.workingHours || 'Lun - Sam: 09:00 - 19:30',
        mapEmbedUrl: company.mapEmbedUrl || '',
        instagram: company.socialLinks?.instagram || 'https://instagram.com/bambinos.ma',
        facebook: company.socialLinks?.facebook || 'https://facebook.com/bambinos.ma',
        tiktok: company.socialLinks?.tiktok || '',
        youtube: company.socialLinks?.youtube || ''
      });
    }
  }, [company]);

  // Hero & Homepage Form State
  const [heroForm, setHeroForm] = useState({
    title: homepage?.hero?.title || '',
    subtitle: homepage?.hero?.subtitle || '',
    eyebrow: homepage?.hero?.eyebrow || "BAMBINOS — Créateur d'Espace Sur Mesure",
    bgImage: homepage?.hero?.bgImage || '/uploads/images/bambinos_hero_room_ban.jpg',
    bgVideo: homepage?.hero?.bgVideo || '',
    ctaText: homepage?.hero?.ctaText || 'Découvrir',
    ctaUrl: homepage?.hero?.ctaUrl || '#catalogue',
    secondaryCtaText: homepage?.hero?.secondaryCtaText || 'Demander un devis',
    overlayOpacity: homepage?.hero?.overlayOpacity !== undefined ? homepage?.hero?.overlayOpacity : 0.55
  });

  useEffect(() => {
    if (homepage?.hero) {
      setHeroForm({
        title: homepage.hero.title || '',
        subtitle: homepage.hero.subtitle || '',
        eyebrow: homepage.hero.eyebrow || "BAMBINOS — Créateur d'Espace Sur Mesure",
        bgImage: homepage.hero.bgImage || '/uploads/images/banner_promo_ban.jpg',
        bgVideo: homepage.hero.bgVideo || '',
        ctaText: homepage.hero.ctaText || 'Découvrir',
        ctaUrl: homepage.hero.ctaUrl || '#catalogue',
        secondaryCtaText: homepage.hero.secondaryCtaText || 'Demander un devis',
        overlayOpacity: homepage.hero.overlayOpacity !== undefined ? homepage.hero.overlayOpacity : 0.55
      });
    }
  }, [homepage]);

  if (!isAdminOpen) return null;

  const handleSaveHero = async (e: React.FormEvent) => {
    e.preventDefault();
    const updatedHomepage = {
      ...(homepage || {}),
      hero: heroForm
    };
    const ok = await saveData('homepage', updatedHomepage, 'UPDATE_HERO');
    if (ok) {
      showToast('Section Hero mise à jour dans /data/homepage.json !', 'success');
    }
  };

  const handleRestoreDefaultHero = () => {
    if (!confirm('Restaurer les textes et visuels du Hero par défaut ?')) return;
    setHeroForm({
      title: "Créateur d'espaces d'exception pour vos enfants",
      subtitle: "Du mobilier haut de gamme fabriqué sur-mesure à Casablanca : chambres féeriques, lits cabanes, dressings et bureaux d'étude.",
      eyebrow: "BAMBINOS — Créateur d'Espace Sur Mesure",
      bgImage: "/uploads/images/banner_promo_ban.jpg",
      bgVideo: "",
      ctaText: "Découvrir la Collection",
      ctaUrl: "#catalogue",
      secondaryCtaText: "Demander une étude 3D",
      overlayOpacity: 0.55
    });
  };

  const handleHeroFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, mediaType: 'image' | 'video') => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    const url = await uploadFile(file, mediaType === 'video' ? 'videos' : 'hero');
    if (url) {
      if (mediaType === 'video') {
        setHeroForm((prev) => ({ ...prev, bgVideo: url }));
        showToast('Vidéo de fond appliquée au Hero !', 'success');
      } else {
        setHeroForm((prev) => ({ ...prev, bgImage: url }));
        showToast('Image de fond appliquée au Hero !', 'success');
      }
    }
  };

  // Handle Login
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const ok = await login(usernameInput, passwordInput);
    if (!ok) {
      setLoginError(true);
    } else {
      setLoginError(false);
    }
  };

  // --- PRODUCT ACTIONS ---
  const handleCreateProduct = () => {
    const newProd: Product = {
      id: `prod-${Date.now()}`,
      name: 'Nouveau Modèle Sur Mesure',
      reference: `BAM-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`,
      shortDescription: 'Description courte du nouveau modèle.',
      fullDescription: 'Description détaillée complète du modèle.',
      features: ['Bois de hêtre massif FSC', 'Peinture à l\'eau 100% écologique', 'Garantie 5 ans'],
      technicalSpecs: { Structure: 'Chêne massif / Hêtre', Finition: 'Vernis mat écologique' },
      dimensions: 'Longueur: 200 cm x Largeur: 100 cm x Hauteur: 160 cm',
      weight: '85 kg',
      materials: ['Bois massif FSC', 'MDF haute densité'],
      colors: ['Chêne Naturel', 'Blanc Pur', 'Gris Doux'],
      price: 18500,
      images: ['/uploads/images/bambinos_hero_room01.jpg'],
      availability: 'Sur mesure',
      displayOrder: products.length + 1,
      categoryId: categories[0]?.id || 'cat-1',
      status: 'active',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setEditingProduct(newProd);
    setIsProductModalOpen(true);
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;

    let updatedList = [...products];
    const index = updatedList.findIndex((p) => p.id === editingProduct.id);
    if (index >= 0) {
      updatedList[index] = { ...editingProduct, updatedAt: new Date().toISOString() };
    } else {
      updatedList.unshift(editingProduct);
    }

    const ok = await saveData('products', updatedList, `EDIT_PRODUCT_${editingProduct.reference}`);
    if (ok) {
      setIsProductModalOpen(false);
      setEditingProduct(null);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) return;
    const updated = products.filter((p) => p.id !== id);
    await saveData('products', updated, `DELETE_PRODUCT_${id}`);
  };

  const handleProductFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, targetField: 'image' | 'pdf') => {
    if (!e.target.files || e.target.files.length === 0 || !editingProduct) return;
    const file = e.target.files[0];
    const folder = targetField === 'pdf' ? 'pdf' : 'products';
    const uploadedUrl = await uploadFile(file, folder);

    if (uploadedUrl) {
      if (targetField === 'image') {
        setEditingProduct({
          ...editingProduct,
          images: [uploadedUrl, ...editingProduct.images]
        });
      } else {
        setEditingProduct({
          ...editingProduct,
          pdfUrl: uploadedUrl
        });
      }
    }
  };

  // --- CATEGORY ACTIONS ---
  const handleCreateCategory = () => {
    const newCat: Category = {
      id: `cat-${Date.now()}`,
      name: 'Nouvelle Catégorie',
      slug: `categorie-${Date.now()}`,
      description: 'Description de la catégorie.',
      image: '/uploads/images/bambinos_hero_room06.jpg',
      displayOrder: categories.length + 1
    };
    setEditingCategory(newCat);
    setIsCategoryModalOpen(true);
  };

  const handleSaveCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCategory) return;
    let updated = [...categories];
    const index = updated.findIndex((c) => c.id === editingCategory.id);
    if (index >= 0) {
      updated[index] = editingCategory;
    } else {
      updated.push(editingCategory);
    }
    const ok = await saveData('categories', updated, `EDIT_CATEGORY_${editingCategory.slug}`);
    if (ok) {
      setIsCategoryModalOpen(false);
      setEditingCategory(null);
    }
  };

  const handleDeleteCategory = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette catégorie ?')) return;
    const updated = categories.filter((c) => c.id !== id);
    await saveData('categories', updated, `DELETE_CATEGORY_${id}`);
  };

  // --- CATALOGUE ACTIONS ---
  const handleCreateCatalogue = () => {
    const newCat: Catalogue = {
      id: `catl-${Date.now()}`,
      title: 'Nouveau Catalogue PDF 2026',
      description: 'Feuilletez le nouveau catalogue Bambinos.',
      coverImage: '/uploads/images/couverture.jpg',
      pdfUrl: '/uploads/pdf/catalogue_bambinos_2026.pdf',
      pageCount: 24,
      year: '2026',
      isFeatured: true
    };
    setEditingCatalogue(newCat);
    setIsCatalogueModalOpen(true);
  };

  const handleSaveCatalogue = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCatalogue) return;
    let updated = [...catalogues];
    const index = updated.findIndex((c) => c.id === editingCatalogue.id);
    if (index >= 0) {
      updated[index] = editingCatalogue;
    } else {
      updated.push(editingCatalogue);
    }
    const ok = await saveData('catalogues', updated, `EDIT_CATALOGUE_${editingCatalogue.id}`);
    if (ok) {
      setIsCatalogueModalOpen(false);
      setEditingCatalogue(null);
    }
  };

  const handleDeleteCatalogue = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce catalogue PDF ?')) return;
    const updated = catalogues.filter((c) => c.id !== id);
    await saveData('catalogues', updated, `DELETE_CATALOGUE_${id}`);
  };

  // --- BANNER ACTIONS ---
  const handleCreateBanner = () => {
    const newBan: Banner = {
      id: `ban-${Date.now()}`,
      title: 'Bannière Promo Bambinos',
      subtitle: 'Offres exclusives sur la collection sur mesure.',
      imageUrl: '/uploads/images/bambinos_hero_room.jpg',
      linkUrl: '#catalogue',
      buttonText: 'Profiter des offres',
      active: true,
      location: 'top_bar'
    };
    setEditingBanner(newBan);
    setIsBannerModalOpen(true);
  };

  const handleSaveBanner = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBanner) return;
    let updated = [...banners];
    const index = updated.findIndex((b) => b.id === editingBanner.id);
    if (index >= 0) {
      updated[index] = editingBanner;
    } else {
      updated.push(editingBanner);
    }
    const ok = await saveData('banners', updated, `EDIT_BANNER_${editingBanner.id}`);
    if (ok) {
      setIsBannerModalOpen(false);
      setEditingBanner(null);
    }
  };

  const handleDeleteBanner = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette bannière ?')) return;
    const updated = banners.filter((b) => b.id !== id);
    await saveData('banners', updated, `DELETE_BANNER_${id}`);
  };

  // --- COMPANY SAVE ACTION ---
  const handleSaveCompany = async (e: React.FormEvent) => {
    e.preventDefault();
    const updatedCompany = {
      name: companyForm.name,
      slogan: companyForm.slogan,
      address: companyForm.address,
      city: companyForm.city,
      phone: companyForm.phone,
      whatsapp: companyForm.whatsapp,
      email: companyForm.email,
      workingHours: companyForm.workingHours,
      mapEmbedUrl: companyForm.mapEmbedUrl,
      socialLinks: {
        instagram: companyForm.instagram,
        facebook: companyForm.facebook,
        tiktok: companyForm.tiktok,
        youtube: companyForm.youtube
      }
    };
    await saveData('company', updatedCompany, 'UPDATE_COMPANY');
  };

  // --- IMPORT BACKUP FILE ---
  const handleImportBackupFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const content = event.target?.result as string;
        const parsed = JSON.parse(content);
        await importBackup(parsed);
      } catch (err) {
        showToast('Fichier de sauvegarde invalide (erreur JSON)', 'error');
      }
    };
    reader.readAsText(file);
  };

  // If not logged in, display Login Screen
  if (!authUser) {
    return (
      <div className="fixed inset-0 z-50 bg-[#001830]/90 backdrop-blur-md flex items-center justify-center p-4">
        <div className="bg-[#002240] border border-cyan-500/30 text-white rounded-3xl p-8 max-w-md w-full shadow-2xl relative">
          <button
            onClick={closeAdmin}
            className="absolute top-4 right-4 text-slate-400 hover:text-white p-1"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="text-center space-y-3 mb-6">
            <BambinosLogo variant="white" size="lg" className="justify-center" />
            <h3 className="font-serif text-2xl font-bold text-white pt-2">
              Espace Administration Local
            </h3>
            <p className="text-xs text-slate-300">
              Veuillez saisir vos identifiants administrateur pour configurer BAMBINOS.
            </p>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-4 text-xs">
            {loginError && (
              <div className="p-3 rounded-xl bg-rose-950/80 border border-rose-800 text-rose-300 text-xs font-semibold text-center">
                Nom d'utilisateur ou mot de passe incorrect.
              </div>
            )}

            <div>
              <label className="block text-slate-200 font-bold mb-1">
                Utilisateur
              </label>
              <input
                type="text"
                value={usernameInput}
                onChange={(e) => setUsernameInput(e.target.value)}
                placeholder="admin"
                className="w-full px-4 py-3 rounded-xl bg-[#001830] border border-slate-700 focus:outline-none focus:ring-2 focus:ring-[#38C0E3] text-white"
                required
              />
            </div>

            <div>
              <label className="block text-slate-200 font-bold mb-1">
                Mot de passe
              </label>
              <input
                type="password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="nejjari"
                className="w-full px-4 py-3 rounded-xl bg-[#001830] border border-slate-700 focus:outline-none focus:ring-2 focus:ring-[#38C0E3] text-white"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#38C0E3] hover:bg-cyan-300 text-[#002240] font-black py-3.5 rounded-xl text-xs uppercase tracking-wider transition-all shadow-lg mt-2"
            >
              Se Connecter
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-slate-800 text-[11px] text-slate-400 text-center">
            Identifiants par défaut : <span className="font-mono text-yellow-300">admin</span> / <span className="font-mono text-yellow-300"></span>
          </div>
        </div>
      </div>
    );
  }

  // Filtered list for products
  const filteredProductsList = products.filter(
    (p) =>
      p.name.toLowerCase().includes(adminSearch.toLowerCase()) ||
      p.reference.toLowerCase().includes(adminSearch.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 bg-[#001830]/95 backdrop-blur-md flex flex-col text-slate-100 overflow-hidden">
      
      {/* Top Admin Navigation Header */}
      <div className="px-6 py-4 bg-[#002240] border-b border-cyan-500/20 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <BambinosLogo variant="white" size="sm" />
          <span className="text-[10px] bg-sky-950 text-cyan-300 border border-cyan-500/40 px-2 py-0.5 rounded-full font-mono">
            LOCAL CMS v2.0
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={exportBackup}
            className="px-3 py-1.5 rounded-xl bg-[#003E73] hover:bg-sky-700 text-yellow-300 text-xs font-bold flex items-center gap-1.5 border border-cyan-400/30"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Sauvegarder JSON</span>
          </button>

          <button
            onClick={logout}
            className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-rose-950 text-slate-300 hover:text-rose-300 text-xs font-bold flex items-center gap-1.5 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Déconnexion</span>
          </button>

          <button
            onClick={closeAdmin}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Admin Content Body */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Sidebar Nav */}
        <div className="w-64 bg-[#002240] border-r border-cyan-500/20 p-3 space-y-1 overflow-y-auto shrink-0 text-xs font-bold">
          
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`w-full px-3 py-2.5 rounded-xl flex items-center gap-2.5 transition-colors ${
              activeTab === 'dashboard' ? 'bg-[#38C0E3] text-[#002240] font-black' : 'text-slate-200 hover:bg-slate-800'
            }`}
          >
            <LayoutTemplate className="w-4 h-4" />
            <span>Vue d'ensemble</span>
          </button>

          <button
            onClick={() => setActiveTab('products')}
            className={`w-full px-3 py-2.5 rounded-xl flex items-center justify-between transition-colors ${
              activeTab === 'products' ? 'bg-[#38C0E3] text-[#002240] font-black' : 'text-slate-200 hover:bg-slate-800'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Bed className="w-4 h-4" />
              <span>Produits</span>
            </div>
            <span className="opacity-80 font-mono">({products.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('categories')}
            className={`w-full px-3 py-2.5 rounded-xl flex items-center justify-between transition-colors ${
              activeTab === 'categories' ? 'bg-[#38C0E3] text-[#002240] font-black' : 'text-slate-200 hover:bg-slate-800'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Layers className="w-4 h-4" />
              <span>Catégories</span>
            </div>
            <span className="opacity-80 font-mono">({categories.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('menu')}
            className={`w-full px-3 py-2.5 rounded-xl flex items-center justify-between transition-colors ${
              activeTab === 'menu' ? 'bg-[#38C0E3] text-[#002240] font-black' : 'text-slate-200 hover:bg-slate-800'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <MenuIcon className="w-4 h-4 text-yellow-300" />
              <span>Menu Dynamique</span>
            </div>
            <span className="text-[10px] bg-cyan-900 text-cyan-200 px-1.5 py-0.5 rounded-md font-mono">JSON</span>
          </button>

          <button
            onClick={() => setActiveTab('files')}
            className={`w-full px-3 py-2.5 rounded-xl flex items-center justify-between transition-colors ${
              activeTab === 'files' ? 'bg-[#38C0E3] text-[#002240] font-black' : 'text-slate-200 hover:bg-slate-800'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Folder className="w-4 h-4 text-[#38C0E3]" />
              <span>Gestionnaire Fichiers</span>
            </div>
            <span className="text-[10px] bg-emerald-900 text-emerald-300 px-1.5 py-0.5 rounded-md font-mono">Uploads</span>
          </button>

          <button
            onClick={() => setActiveTab('catalogues')}
            className={`w-full px-3 py-2.5 rounded-xl flex items-center justify-between transition-colors ${
              activeTab === 'catalogues' ? 'bg-[#38C0E3] text-[#002240] font-black' : 'text-slate-200 hover:bg-slate-800'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <BookOpen className="w-4 h-4" />
              <span>Catalogues PDF</span>
            </div>
            <span className="opacity-80 font-mono">({catalogues.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('homepage')}
            className={`w-full px-3 py-2.5 rounded-xl flex items-center gap-2.5 transition-colors ${
              activeTab === 'homepage' ? 'bg-[#38C0E3] text-[#002240] font-black' : 'text-slate-200 hover:bg-slate-800'
            }`}
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>Hero & Homepage</span>
          </button>

          <button
            onClick={() => setActiveTab('banners')}
            className={`w-full px-3 py-2.5 rounded-xl flex items-center gap-2.5 transition-colors ${
              activeTab === 'banners' ? 'bg-[#38C0E3] text-[#002240] font-black' : 'text-slate-200 hover:bg-slate-800'
            }`}
          >
            <FolderPlus className="w-4 h-4" />
            <span>Bannières & Sliders</span>
          </button>

          <button
            onClick={() => setActiveTab('company')}
            className={`w-full px-3 py-2.5 rounded-xl flex items-center gap-2.5 transition-colors ${
              activeTab === 'company' ? 'bg-[#38C0E3] text-[#002240] font-black' : 'text-slate-200 hover:bg-slate-800'
            }`}
          >
            <Phone className="w-4 h-4" />
            <span>Coordonnées & WhatsApp</span>
          </button>

          <button
            onClick={() => setActiveTab('backup')}
            className={`w-full px-3 py-2.5 rounded-xl flex items-center gap-2.5 transition-colors ${
              activeTab === 'backup' ? 'bg-[#38C0E3] text-[#002240] font-black' : 'text-slate-200 hover:bg-slate-800'
            }`}
          >
            <Download className="w-4 h-4 text-yellow-300" />
            <span>Sauvegarde & Import</span>
          </button>

          <button
            onClick={() => setActiveTab('vercel')}
            className={`w-full px-3 py-2.5 rounded-xl flex items-center gap-2.5 transition-colors ${
              activeTab === 'vercel' ? 'bg-[#38C0E3] text-[#002240] font-black' : 'text-slate-200 hover:bg-slate-800'
            }`}
          >
            <GitBranch className="w-4 h-4 text-emerald-400" />
            <span>Déploiement Vercel</span>
          </button>

        </div>

        {/* Tab Content Panel */}
        <div className="flex-1 bg-[#001830] p-6 overflow-y-auto">
          
          {/* TAB 0: DASHBOARD */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              <div className="bg-[#002240] p-6 rounded-3xl border border-cyan-500/30 flex items-center justify-between">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-white">
                    Bienvenue dans le CMS Bambinos
                  </h3>
                  <p className="text-xs text-slate-300 pt-1">
                    Gestion en local des produits, sous-dossiers uploads, catalogues et sauvegardes JSON.
                  </p>
                </div>
                <BambinosLogo variant="white" size="md" />
              </div>

              {/* Stat Cards Grid - 7 Key Performance Indicators */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-[#002240] p-5 rounded-2xl border border-cyan-500/20 hover:border-cyan-400/40 transition-all">
                  <div className="flex items-center justify-between text-slate-400 text-xs">
                    <span>Modèles Sur Mesure</span>
                    <Bed className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div className="text-3xl font-black text-white mt-2">{products.length}</div>
                  <span className="text-[10px] text-emerald-400">Fichiers `.json` autonomes</span>
                </div>

                <div className="bg-[#002240] p-5 rounded-2xl border border-cyan-500/20 hover:border-cyan-400/40 transition-all">
                  <div className="flex items-center justify-between text-slate-400 text-xs">
                    <span>Catalogues PDF HD</span>
                    <BookOpen className="w-5 h-5 text-yellow-300" />
                  </div>
                  <div className="text-3xl font-black text-white mt-2">{catalogues.length}</div>
                  <span className="text-[10px] text-slate-400">Visionneuse Feuilletable HD</span>
                </div>

                <div className="bg-[#002240] p-5 rounded-2xl border border-cyan-500/20 hover:border-cyan-400/40 transition-all">
                  <div className="flex items-center justify-between text-slate-400 text-xs">
                    <span>Projets & Visuels Médias</span>
                    <ImageIcon className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div className="text-3xl font-black text-white mt-2">{gallery.length + products.length * 3}</div>
                  <span className="text-[10px] text-slate-400">Stockés sous /public/uploads</span>
                </div>

                <div className="bg-[#002240] p-5 rounded-2xl border border-cyan-500/20 hover:border-cyan-400/40 transition-all">
                  <div className="flex items-center justify-between text-slate-400 text-xs">
                    <span>Fiches PDF & Devis</span>
                    <FileText className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div className="text-3xl font-black text-white mt-2">{products.filter((p) => p.pdfUrl).length + 2}</div>
                  <span className="text-[10px] text-emerald-400">Téléchargeables & Imprimables</span>
                </div>
              </div>

              {/* Quick Actions & Workflow Banner */}
              <div className="bg-[#002240] p-6 rounded-3xl border border-cyan-500/20 space-y-4">
                <h4 className="font-serif font-bold text-white text-base">
                  Procédure d'administration & Publication Vercel
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-300">
                  <div className="p-4 bg-[#001830] rounded-2xl border border-slate-800 space-y-1">
                    <strong className="text-yellow-300 block">1. Édition en Local</strong>
                    <p>Toutes les modifications créent directement des fichiers individuels `.json` dans le dossier `/data`.</p>
                  </div>
                  <div className="p-4 bg-[#001830] rounded-2xl border border-slate-800 space-y-1">
                    <strong className="text-cyan-300 block">2. Téléversement Médias</strong>
                    <p>Les images et PDF sont automatiquement classés dans `/public/uploads/products/`, `catalogues/`, etc.</p>
                  </div>
                  <div className="p-4 bg-[#001830] rounded-2xl border border-slate-800 space-y-1">
                    <strong className="text-emerald-400 block">3. Git Commit & Push</strong>
                    <p>Un simple `git push` vers GitHub déclenche la mise à jour automatique en production sur Vercel.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 1: PRODUCTS MANAGER */}
          {activeTab === 'products' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[#002240] p-4 rounded-2xl border border-cyan-500/20">
                <div>
                  <h3 className="font-serif text-lg font-bold text-white">
                    Catalogue Produits ({products.length})
                  </h3>
                  <p className="text-xs text-slate-300">
                    Chaque produit est sauvegardé sous forme de fichier JSON modulaire dans `/data/products/{'{slug}'}.json`.
                  </p>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <div className="relative flex-1 sm:w-64">
                    <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                    <input
                      type="text"
                      value={adminSearch}
                      onChange={(e) => setAdminSearch(e.target.value)}
                      placeholder="Filtrer nom ou référence..."
                      className="w-full bg-[#001830] border border-slate-700 pl-9 pr-3 py-2 rounded-xl text-xs text-white focus:outline-none"
                    />
                  </div>

                  <button
                    onClick={handleCreateProduct}
                    className="bg-[#38C0E3] hover:bg-cyan-300 text-[#002240] font-black px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 transition-colors shrink-0"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Nouveau Produit</span>
                  </button>
                </div>
              </div>

              {/* Products Table */}
              <div className="bg-[#002240] rounded-2xl border border-cyan-500/20 overflow-hidden">
                <table className="w-full text-left text-xs text-slate-200">
                  <thead className="bg-[#001830] text-slate-400 uppercase font-mono text-[10px] border-b border-slate-800">
                    <tr>
                      <th className="p-3.5">Visuel</th>
                      <th className="p-3.5">Référence & Nom</th>
                      <th className="p-3.5">Catégorie</th>
                      <th className="p-3.5">Prix (MAD)</th>
                      <th className="p-3.5">Disponibilité</th>
                      <th className="p-3.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {filteredProductsList.map((p) => {
                      const catName = categories.find((c) => c.id === p.categoryId)?.name || 'Sur mesure';
                      return (
                        <tr key={p.id} className="hover:bg-slate-800/40 transition-colors">
                          <td className="p-3.5">
                            <img
                              src={p.images[0] || "/uploads/images/bambinos_hero_room02.jpg"}
                              alt={p.name}
                              className="w-12 h-10 rounded-lg object-cover border border-slate-700"
                            />
                          </td>
                          <td className="p-3.5">
                            <strong className="text-white block font-serif text-sm">{p.name}</strong>
                            <span className="font-mono text-cyan-300 text-[11px]">{p.reference}</span>
                          </td>
                          <td className="p-3.5 text-slate-300">
                            {catName}
                          </td>
                          <td className="p-3.5 font-black text-yellow-300">
                            {p.price.toLocaleString('fr-FR')} MAD
                          </td>
                          <td className="p-3.5">
                            <span className="bg-[#001830] text-emerald-400 border border-emerald-800 px-2.5 py-1 rounded-full text-[10px] font-bold">
                              {p.availability}
                            </span>
                          </td>
                          <td className="p-3.5 text-right space-x-2">
                            <button
                              onClick={() => {
                                setEditingProduct(p);
                                setIsProductModalOpen(true);
                              }}
                              className="p-1.5 rounded-lg bg-slate-800 hover:bg-sky-900 text-slate-200 hover:text-cyan-200 transition-colors"
                              title="Éditer"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteProduct(p.id)}
                              className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-950 text-slate-200 hover:text-rose-300 transition-colors"
                              title="Supprimer"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB MENU MANAGER */}
          {activeTab === 'menu' && <MenuManager />}

          {/* TAB FILE MANAGER */}
          {activeTab === 'files' && <FileManager />}

          {/* TAB CATEGORIES */}
          {activeTab === 'categories' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between bg-[#002240] p-4 rounded-2xl border border-cyan-500/20">
                <div>
                  <h3 className="font-serif text-lg font-bold text-white">
                    Gestion des Catégories ({categories.length})
                  </h3>
                  <p className="text-xs text-slate-300">
                    Gérez les univers de la marque Bambinos (Sauvegardé dans `/data/categories.json`).
                  </p>
                </div>
                <button
                  onClick={handleCreateCategory}
                  className="bg-[#38C0E3] hover:bg-cyan-300 text-[#002240] font-black px-4 py-2 rounded-xl text-xs flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>Nouvelle Catégorie</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {categories.map((cat) => (
                  <div key={cat.id} className="bg-[#002240] p-4 rounded-2xl border border-cyan-500/20 space-y-3">
                    <img src={cat.image || "/uploads/images/bambinos_hero_room07.jpg"} alt={cat.name} className="w-full h-32 object-cover rounded-xl border border-slate-700" />
                    <div className="flex items-center justify-between">
                      <h4 className="font-serif font-bold text-white text-base">{cat.name}</h4>
                      <span className="font-mono text-[10px] text-cyan-300 bg-sky-950 px-2 py-0.5 rounded-md">{cat.slug}</span>
                    </div>
                    <p className="text-xs text-slate-300 line-clamp-2">{cat.description}</p>
                    <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
                      <button
                        onClick={() => { setEditingCategory(cat); setIsCategoryModalOpen(true); }}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-sky-900 text-slate-200"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteCategory(cat.id)}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-950 text-slate-200"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB CATALOGUES PDF */}
          {activeTab === 'catalogues' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between bg-[#002240] p-4 rounded-2xl border border-cyan-500/20">
                <div>
                  <h3 className="font-serif text-lg font-bold text-white">
                    Catalogues PDF Interactifs ({catalogues.length})
                  </h3>
                  <p className="text-xs text-slate-300">
                    Ajoutez et gérez les magazines et catalogues PDF téléchargeables (Sauvegardé dans `/data/catalogues.json`).
                  </p>
                </div>
                <button
                  onClick={handleCreateCatalogue}
                  className="bg-[#38C0E3] hover:bg-cyan-300 text-[#002240] font-black px-4 py-2 rounded-xl text-xs flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>Nouveau Catalogue PDF</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {catalogues.map((catl) => (
                  <div key={catl.id} className="bg-[#002240] p-4 rounded-2xl border border-cyan-500/20 space-y-3">
                    <img src={catl.coverImage || "/uploads/images/bambinos_hero_room80.jpg"} alt={catl.title} className="w-full h-40 object-cover rounded-xl border border-slate-700" />
                    <h4 className="font-serif font-bold text-white text-base">{catl.title}</h4>
                    <p className="text-xs text-slate-300">{catl.description}</p>
                    <div className="flex items-center justify-between text-[11px] font-mono text-cyan-300">
                      <span>Année: {catl.year}</span>
                      <span>Pages: {catl.pageCount}</span>
                    </div>
                    <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
                      <button
                        onClick={() => { setEditingCatalogue(catl); setIsCatalogueModalOpen(true); }}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-sky-900 text-slate-200"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteCatalogue(catl.id)}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-950 text-slate-200"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB BANNERS & SLIDERS */}
          {activeTab === 'banners' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between bg-[#002240] p-4 rounded-2xl border border-cyan-500/20">
                <div>
                  <h3 className="font-serif text-lg font-bold text-white">
                    Bannières & Sliders Promos ({banners.length})
                  </h3>
                  <p className="text-xs text-slate-300">
                    Gérez les visuels promotionnels et bannières du site (Sauvegardé dans `/data/banners.json`).
                  </p>
                </div>
                <button
                  onClick={handleCreateBanner}
                  className="bg-[#38C0E3] hover:bg-cyan-300 text-[#002240] font-black px-4 py-2 rounded-xl text-xs flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>Nouvelle Bannière</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {banners.map((ban) => (
                  <div key={ban.id} className="bg-[#002240] p-4 rounded-2xl border border-cyan-500/20 space-y-3">
                    <img src={ban.imageUrl} alt={ban.title} className="w-full h-32 object-cover rounded-xl border border-slate-700" />
                    <div className="flex items-center justify-between">
                      <h4 className="font-serif font-bold text-white text-base">{ban.title}</h4>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${ban.active ? 'bg-emerald-950 text-emerald-300' : 'bg-slate-800 text-slate-400'}`}>
                        {ban.active ? 'Actif' : 'Inactif'}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300">{ban.subtitle}</p>
                    <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
                      <button
                        onClick={() => { setEditingBanner(ban); setIsBannerModalOpen(true); }}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-sky-900 text-slate-200"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteBanner(ban.id)}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-950 text-slate-200"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB COMPANY COORDINATES */}
          {activeTab === 'company' && (
            <div className="space-y-6">
              <div className="bg-[#002240] p-6 rounded-3xl border border-cyan-500/20 space-y-6">
                <div className="border-b border-slate-800 pb-4">
                  <h3 className="font-serif text-xl font-bold text-white flex items-center gap-2">
                    <Phone className="w-5 h-5 text-[#38C0E3]" />
                    <span>Coordonnées & Informations Officielle Bambinos</span>
                  </h3>
                  <p className="text-xs text-slate-300 pt-1">
                    Gérez l'adresse du showroom, téléphones, WhatsApp, réseaux sociaux et horaires (Sauvegardé dans `/data/company.json`).
                  </p>
                </div>

                <form onSubmit={handleSaveCompany} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-200 font-bold mb-1">Nom de la Marque</label>
                      <input
                        type="text"
                        value={companyForm.name}
                        onChange={(e) => setCompanyForm({ ...companyForm, name: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-xl bg-[#001830] border border-slate-700 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-200 font-bold mb-1">Slogan Principal</label>
                      <input
                        type="text"
                        value={companyForm.slogan}
                        onChange={(e) => setCompanyForm({ ...companyForm, slogan: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-xl bg-[#001830] border border-slate-700 text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-slate-200 font-bold mb-1">Téléphone Showroom</label>
                      <input
                        type="text"
                        value={companyForm.phone}
                        onChange={(e) => setCompanyForm({ ...companyForm, phone: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-xl bg-[#001830] border border-slate-700 text-white font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-emerald-400 font-bold mb-1">WhatsApp Direct (Format Int.) *</label>
                      <input
                        type="text"
                        value={companyForm.whatsapp}
                        onChange={(e) => setCompanyForm({ ...companyForm, whatsapp: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-xl bg-[#001830] border border-slate-700 text-emerald-300 font-mono font-bold"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-200 font-bold mb-1">Email Officiel Devis</label>
                      <input
                        type="email"
                        value={companyForm.email}
                        onChange={(e) => setCompanyForm({ ...companyForm, email: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-xl bg-[#001830] border border-slate-700 text-white font-mono"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-slate-200 font-bold mb-1">Adresse Showroom</label>
                      <input
                        type="text"
                        value={companyForm.address}
                        onChange={(e) => setCompanyForm({ ...companyForm, address: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-xl bg-[#001830] border border-slate-700 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-200 font-bold mb-1">Ville & Pays</label>
                      <input
                        type="text"
                        value={companyForm.city}
                        onChange={(e) => setCompanyForm({ ...companyForm, city: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-xl bg-[#001830] border border-slate-700 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-200 font-bold mb-1">Horaires d'ouverture</label>
                      <input
                        type="text"
                        value={companyForm.workingHours}
                        onChange={(e) => setCompanyForm({ ...companyForm, workingHours: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-xl bg-[#001830] border border-slate-700 text-white"
                      />
                    </div>
                  </div>

                  <div className="p-4 bg-[#001830] rounded-2xl border border-slate-800 space-y-3">
                    <span className="text-yellow-300 font-bold block">Liens Réseaux Sociaux</span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-slate-300 text-[11px] mb-1">Instagram URL</label>
                        <input
                          type="text"
                          value={companyForm.instagram}
                          onChange={(e) => setCompanyForm({ ...companyForm, instagram: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-[#002240] border border-slate-700 text-white font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-300 text-[11px] mb-1">Facebook URL</label>
                        <input
                          type="text"
                          value={companyForm.facebook}
                          onChange={(e) => setCompanyForm({ ...companyForm, facebook: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-[#002240] border border-slate-700 text-white font-mono"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end pt-3 border-t border-slate-800">
                    <button
                      type="submit"
                      className="bg-[#38C0E3] hover:bg-cyan-300 text-[#002240] font-black px-6 py-3 rounded-2xl text-xs tracking-wider uppercase shadow-xl flex items-center gap-2"
                    >
                      <Save className="w-4 h-4" /> Enregistrer les Coordonnées (/data/company.json)
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* TAB HOMEPAGE / HERO EDITOR */}
          {activeTab === 'homepage' && (
            <div className="space-y-6">
              <div className="bg-[#002240] p-6 rounded-3xl border border-cyan-500/20 space-y-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                  <div>
                    <h3 className="font-serif text-xl font-bold text-white flex items-center gap-2">
                      <SlidersHorizontal className="w-5 h-5 text-[#38C0E3]" />
                      <span>Administration du Hero & Section Principale</span>
                    </h3>
                    <p className="text-xs text-slate-300 pt-1">
                      Personnalisez les titres, sous-titres, vidéos, images de fond, boutons et effets sans écrire une seule ligne de code. Sauvegardé sous `/data/homepage.json`.
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleRestoreDefaultHero}
                      className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold"
                    >
                      Restaurer Défaut
                    </button>
                    <a
                      href="#"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-cyan-300 rounded-xl text-xs font-bold flex items-center gap-1"
                    >
                      <Eye className="w-3.5 h-3.5" /> Prévisualiser Site
                    </a>
                  </div>
                </div>

                <form onSubmit={handleSaveHero} className="space-y-5 text-xs">
                  
                  {/* Eyebrow & Title */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-slate-200 font-bold mb-1">Badge Supérieur (Eyebrow)</label>
                      <input
                        type="text"
                        value={heroForm.eyebrow}
                        onChange={(e) => setHeroForm({ ...heroForm, eyebrow: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-xl bg-[#001830] border border-slate-700 text-white font-mono"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-slate-200 font-bold mb-1">Titre Principal H1 *</label>
                      <input
                        type="text"
                        required
                        value={heroForm.title}
                        onChange={(e) => setHeroForm({ ...heroForm, title: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-xl bg-[#001830] border border-slate-700 text-white font-serif text-sm font-bold"
                      />
                    </div>
                  </div>

                  {/* Subtitle */}
                  <div>
                    <label className="block text-slate-200 font-bold mb-1">Sous-titre Descriptif</label>
                    <textarea
                      rows={3}
                      value={heroForm.subtitle}
                      onChange={(e) => setHeroForm({ ...heroForm, subtitle: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl bg-[#001830] border border-slate-700 text-white leading-relaxed"
                    ></textarea>
                  </div>

                  {/* CTA Buttons Text & Link */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4 bg-[#001830] rounded-2xl border border-slate-800">
                    <div>
                      <label className="block text-cyan-300 font-bold mb-1">Bouton Principal (Texte)</label>
                      <input
                        type="text"
                        value={heroForm.ctaText}
                        onChange={(e) => setHeroForm({ ...heroForm, ctaText: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-[#002240] border border-slate-700 text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-cyan-300 font-bold mb-1">Lien Cible CTA</label>
                      <input
                        type="text"
                        value={heroForm.ctaUrl}
                        onChange={(e) => setHeroForm({ ...heroForm, ctaUrl: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-[#002240] border border-slate-700 text-white font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-yellow-300 font-bold mb-1">Bouton Secondaire (Texte)</label>
                      <input
                        type="text"
                        value={heroForm.secondaryCtaText}
                        onChange={(e) => setHeroForm({ ...heroForm, secondaryCtaText: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-[#002240] border border-slate-700 text-white"
                      />
                    </div>
                  </div>

                  {/* Media Controls: Image / Video Background & Overlay Opacity */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-[#001830] rounded-2xl border border-slate-800 space-y-3">
                      <div className="flex items-center justify-between">
                        <label className="text-slate-200 font-bold block">Image de fond HD (`/uploads/banners/`)</label>
                        {heroForm.bgImage && (
                          <button
                            type="button"
                            onClick={() => setHeroForm({ ...heroForm, bgImage: '' })}
                            className="text-rose-400 hover:underline text-[11px]"
                          >
                            Supprimer
                          </button>
                        )}
                      </div>
                      <input
                        type="text"
                        value={heroForm.bgImage}
                        onChange={(e) => setHeroForm({ ...heroForm, bgImage: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-[#002240] border border-slate-700 text-white font-mono text-[11px]"
                      />
                      <div className="flex items-center gap-2 pt-1">
                        <label className="bg-[#38C0E3] hover:bg-cyan-300 text-[#002240] px-3 py-1.5 rounded-lg font-black text-xs cursor-pointer inline-flex items-center gap-1">
                          <Upload className="w-3.5 h-3.5" /> Importer Nouvelle Image
                          <input type="file" accept="image/*" onChange={(e) => handleHeroFileUpload(e, 'image')} className="hidden" />
                        </label>
                      </div>
                    </div>

                    <div className="p-4 bg-[#001830] rounded-2xl border border-slate-800 space-y-3">
                      <div className="flex items-center justify-between">
                        <label className="text-slate-200 font-bold block">Vidéo MP4 de fond (Optionnel)</label>
                        {heroForm.bgVideo && (
                          <button
                            type="button"
                            onClick={() => setHeroForm({ ...heroForm, bgVideo: '' })}
                            className="text-rose-400 hover:underline text-[11px]"
                          >
                            Supprimer
                          </button>
                        )}
                      </div>
                      <input
                        type="text"
                        placeholder="/uploads/videos/hero_loop.mp4"
                        value={heroForm.bgVideo}
                        onChange={(e) => setHeroForm({ ...heroForm, bgVideo: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-[#002240] border border-slate-700 text-white font-mono text-[11px]"
                      />
                      <div className="flex items-center gap-2 pt-1">
                        <label className="bg-yellow-400 hover:bg-yellow-300 text-[#002240] px-3 py-1.5 rounded-lg font-black text-xs cursor-pointer inline-flex items-center gap-1">
                          <Upload className="w-3.5 h-3.5" /> Importer Vidéo MP4
                          <input type="file" accept="video/mp4,video/webm" onChange={(e) => handleHeroFileUpload(e, 'video')} className="hidden" />
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Overlay Opacity Slider */}
                  <div className="p-4 bg-[#001830] rounded-2xl border border-slate-800 flex items-center justify-between gap-4">
                    <div>
                      <label className="text-slate-200 font-bold block">Opacité du Voile Sombre sur le Fond : {(heroForm.overlayOpacity * 100).toFixed(0)}%</label>
                      <span className="text-[10px] text-slate-400">Ajustez la lisibilité du texte par rapport au visuel arrière.</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.05"
                      value={heroForm.overlayOpacity}
                      onChange={(e) => setHeroForm({ ...heroForm, overlayOpacity: Number(e.target.value) })}
                      className="w-48 accent-[#38C0E3]"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="flex justify-end pt-3 border-t border-slate-800">
                    <button
                      type="submit"
                      className="bg-[#38C0E3] hover:bg-cyan-300 text-[#002240] font-black px-6 py-3 rounded-2xl text-xs tracking-wider uppercase shadow-xl flex items-center gap-2"
                    >
                      <Save className="w-4 h-4" /> Enregistrer le Hero dans /data/homepage.json
                    </button>
                  </div>

                </form>
              </div>
            </div>
          )}

          {/* TAB 8: BACKUP & RESTORE */}
          {activeTab === 'backup' && (
            <div className="space-y-6">
              <div className="bg-[#002240] p-6 rounded-3xl border border-cyan-500/20 space-y-4">
                <h3 className="font-serif text-xl font-bold text-white flex items-center gap-2">
                  <Download className="w-5 h-5 text-yellow-300" />
                  <span>Gestion des Sauvegardes & Restauration du Projet</span>
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Exportez une sauvegarde complète en 1 clic au format JSON contenant tous vos produits, réglages, historiques et contacts. Vous pouvez réimporter ce fichier à tout moment pour tout restaurer.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                  <div className="bg-[#001830] p-5 rounded-2xl border border-slate-800 space-y-3">
                    <h4 className="font-serif font-bold text-white text-sm">1. Exporter Sauvegarde Complexe</h4>
                    <p className="text-xs text-slate-400">Génère un fichier `bambinos_backup_timestamp.json` complet.</p>
                    <button
                      onClick={exportBackup}
                      className="bg-[#38C0E3] hover:bg-cyan-300 text-[#002240] font-black px-4 py-2.5 rounded-xl text-xs flex items-center gap-2"
                    >
                      <Download className="w-4 h-4" />
                      <span>Télécharger Sauvegarde JSON</span>
                    </button>
                  </div>

                  <div className="bg-[#001830] p-5 rounded-2xl border border-slate-800 space-y-3">
                    <h4 className="font-serif font-bold text-white text-sm">2. Restaurer depuis Fichier Backup</h4>
                    <p className="text-xs text-slate-400">Sélectionnez votre fichier JSON pour réécrire la base local.</p>
                    <label className="bg-yellow-400 hover:bg-yellow-300 text-[#002240] font-black px-4 py-2.5 rounded-xl text-xs flex items-center gap-2 inline-block cursor-pointer">
                      <Upload className="w-4 h-4" />
                      <span>Choisir Fichier Backup JSON</span>
                      <input type="file" accept=".json" onChange={handleImportBackupFile} className="hidden" />
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB VERCEL: GIT DEPLOYMENT INSTRUCTIONS */}
          {activeTab === 'vercel' && (
            <div className="space-y-6">
              <div className="bg-[#002240] p-6 rounded-3xl border border-cyan-500/20 space-y-4">
                <h3 className="font-serif text-xl font-bold text-white flex items-center gap-2">
                  <GitBranch className="w-5 h-5 text-emerald-400" />
                  <span>Workflow de Déploiement Vercel & GitHub</span>
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Khir-Eddine NEJJARI.
                </p>

                <div className="p-4 bg-[#001830] rounded-2xl border border-slate-800 space-y-3 font-mono text-xs text-slate-300">
                  <span className="text-yellow-300 font-bold font-sans block">Commandes pour publier vos modifications sur Vercel :</span>
                  <div className="bg-black/60 p-3 rounded-xl border border-slate-800 text-cyan-300">
                    <p># 1. Vérifier les fichiers JSON modifiés dans /data</p>
                    <p>git status</p>
                    <br />
                    <p># 2. Ajouter les modifications au dépôt</p>
                    <p>git add .</p>
                    <br />
                    <p># 3. Effectuer le commit</p>
                    <p>git commit -m "Mise à jour catalogue et contenus Bambinos"</p>
                    <br />
                    <p># 4. Envoyer sur GitHub (déclenche le build Vercel automatique)</p>
                    <p>git push origin main</p>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>

      {/* PRODUCT EDIT MODAL */}
      {isProductModalOpen && editingProduct && (
        <div className="fixed inset-0 z-50 bg-[#001830]/90 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#002240] border border-cyan-500/30 text-white rounded-3xl p-6 max-w-2xl w-full shadow-2xl my-auto space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-serif font-bold text-lg text-white">
                {editingProduct.id.startsWith('prod-new') ? 'Créer Produit' : 'Éditer Produit'} : {editingProduct.name}
              </h3>
              <button
                onClick={() => setIsProductModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-200 font-bold mb-1">Nom Produit *</label>
                  <input
                    type="text"
                    required
                    value={editingProduct.name}
                    onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#001830] border border-slate-700 text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-200 font-bold mb-1">Référence *</label>
                  <input
                    type="text"
                    required
                    value={editingProduct.reference}
                    onChange={(e) => setEditingProduct({ ...editingProduct, reference: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#001830] border border-slate-700 text-white font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-200 font-bold mb-1">Prix (MAD) *</label>
                  <input
                    type="number"
                    required
                    value={editingProduct.price}
                    onChange={(e) => setEditingProduct({ ...editingProduct, price: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl bg-[#001830] border border-slate-700 text-white font-mono"
                  />
                </div>

                <div>
                  <label className="block text-slate-200 font-bold mb-1">Prix Promo (MAD)</label>
                  <input
                    type="number"
                    value={editingProduct.promoPrice || ''}
                    onChange={(e) => setEditingProduct({ ...editingProduct, promoPrice: e.target.value ? Number(e.target.value) : undefined })}
                    className="w-full px-3 py-2 rounded-xl bg-[#001830] border border-slate-700 text-white font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-200 font-bold mb-1">Description courte</label>
                <input
                  type="text"
                  value={editingProduct.shortDescription}
                  onChange={(e) => setEditingProduct({ ...editingProduct, shortDescription: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[#001830] border border-slate-700 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-200 font-bold mb-1">Dimensions</label>
                <input
                  type="text"
                  value={editingProduct.dimensions}
                  onChange={(e) => setEditingProduct({ ...editingProduct, dimensions: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[#001830] border border-slate-700 text-white"
                />
              </div>

              {/* Upload Image */}
              <div className="p-3 bg-[#001830] rounded-xl border border-slate-700 flex items-center justify-between">
                <div>
                  <span className="block font-bold text-cyan-300">Importer Image Produit</span>
                  <span className="text-[10px] text-slate-400">Classé dans /public/uploads/products/</span>
                </div>
                <label className="bg-[#38C0E3] text-[#002240] px-3 py-1.5 rounded-lg font-black text-xs cursor-pointer hover:bg-cyan-300">
                  <Upload className="w-3.5 h-3.5 inline mr-1" /> Choisir Image
                  <input type="file" accept="image/*" onChange={(e) => handleProductFileUpload(e, 'image')} className="hidden" />
                </label>
              </div>

              <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl font-bold"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#38C0E3] text-[#002240] font-black rounded-xl flex items-center gap-1.5"
                >
                  <Save className="w-4 h-4" /> Enregistrer Produit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CATEGORY EDIT MODAL */}
      {isCategoryModalOpen && editingCategory && (
        <div className="fixed inset-0 z-50 bg-[#001830]/90 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#002240] border border-cyan-500/30 text-white rounded-3xl p-6 max-w-lg w-full shadow-2xl my-auto space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-serif font-bold text-lg text-white">Éditer Catégorie</h3>
              <button onClick={() => setIsCategoryModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveCategory} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-200 font-bold mb-1">Nom de la Catégorie *</label>
                <input
                  type="text"
                  required
                  value={editingCategory.name}
                  onChange={(e) => setEditingCategory({ ...editingCategory, name: e.target.value, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') })}
                  className="w-full px-3 py-2 rounded-xl bg-[#001830] border border-slate-700 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-200 font-bold mb-1">Slug URL</label>
                <input
                  type="text"
                  required
                  value={editingCategory.slug}
                  onChange={(e) => setEditingCategory({ ...editingCategory, slug: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[#001830] border border-slate-700 text-white font-mono"
                />
              </div>

              <div>
                <label className="block text-slate-200 font-bold mb-1">Description</label>
                <textarea
                  rows={2}
                  value={editingCategory.description}
                  onChange={(e) => setEditingCategory({ ...editingCategory, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[#001830] border border-slate-700 text-white"
                ></textarea>
              </div>

              <div>
                <label className="block text-slate-200 font-bold mb-1">Image URL</label>
                <input
                  type="text"
                  value={editingCategory.image}
                  onChange={(e) => setEditingCategory({ ...editingCategory, image: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[#001830] border border-slate-700 text-white font-mono"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsCategoryModalOpen(false)}
                  className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl font-bold"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#38C0E3] text-[#002240] font-black rounded-xl flex items-center gap-1.5"
                >
                  <Save className="w-4 h-4" /> Enregistrer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CATALOGUE EDIT MODAL */}
      {isCatalogueModalOpen && editingCatalogue && (
        <div className="fixed inset-0 z-50 bg-[#001830]/90 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#002240] border border-cyan-500/30 text-white rounded-3xl p-6 max-w-lg w-full shadow-2xl my-auto space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-serif font-bold text-lg text-white">Éditer Catalogue PDF</h3>
              <button onClick={() => setIsCatalogueModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveCatalogue} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-200 font-bold mb-1">Titre du Catalogue *</label>
                <input
                  type="text"
                  required
                  value={editingCatalogue.title}
                  onChange={(e) => setEditingCatalogue({ ...editingCatalogue, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[#001830] border border-slate-700 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-200 font-bold mb-1">Description</label>
                <textarea
                  rows={2}
                  value={editingCatalogue.description}
                  onChange={(e) => setEditingCatalogue({ ...editingCatalogue, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[#001830] border border-slate-700 text-white"
                ></textarea>
              </div>

              <div>
                <label className="block text-slate-200 font-bold mb-1">Image de couverture URL</label>
                <input
                  type="text"
                  value={editingCatalogue.coverImage}
                  onChange={(e) => setEditingCatalogue({ ...editingCatalogue, coverImage: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[#001830] border border-slate-700 text-white font-mono"
                />
              </div>

              <div>
                <label className="block text-slate-200 font-bold mb-1">Fichier PDF URL</label>
                <input
                  type="text"
                  value={editingCatalogue.pdfUrl}
                  onChange={(e) => setEditingCatalogue({ ...editingCatalogue, pdfUrl: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[#001830] border border-slate-700 text-white font-mono"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsCatalogueModalOpen(false)}
                  className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl font-bold"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#38C0E3] text-[#002240] font-black rounded-xl flex items-center gap-1.5"
                >
                  <Save className="w-4 h-4" /> Enregistrer Catalogue
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* BANNER EDIT MODAL */}
      {isBannerModalOpen && editingBanner && (
        <div className="fixed inset-0 z-50 bg-[#001830]/90 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#002240] border border-cyan-500/30 text-white rounded-3xl p-6 max-w-lg w-full shadow-2xl my-auto space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-serif font-bold text-lg text-white">Éditer Bannière</h3>
              <button onClick={() => setIsBannerModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveBanner} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-200 font-bold mb-1">Titre de la Bannière *</label>
                <input
                  type="text"
                  required
                  value={editingBanner.title}
                  onChange={(e) => setEditingBanner({ ...editingBanner, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[#001830] border border-slate-700 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-200 font-bold mb-1">Sous-titre</label>
                <input
                  type="text"
                  value={editingBanner.subtitle}
                  onChange={(e) => setEditingBanner({ ...editingBanner, subtitle: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[#001830] border border-slate-700 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-200 font-bold mb-1">Visuel URL</label>
                <input
                  type="text"
                  value={editingBanner.imageUrl}
                  onChange={(e) => setEditingBanner({ ...editingBanner, imageUrl: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[#001830] border border-slate-700 text-white font-mono"
                />
              </div>

              <div>
                <label className="block text-slate-200 font-bold mb-1">Lien Cible</label>
                <input
                  type="text"
                  value={editingBanner.linkUrl}
                  onChange={(e) => setEditingBanner({ ...editingBanner, linkUrl: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[#001830] border border-slate-700 text-white font-mono"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="bannerActive"
                  checked={editingBanner.active}
                  onChange={(e) => setEditingBanner({ ...editingBanner, active: e.target.checked })}
                  className="rounded text-[#38C0E3]"
                />
                <label htmlFor="bannerActive" className="text-slate-200 font-bold">Activer cette bannière</label>
              </div>

              <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsBannerModalOpen(false)}
                  className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl font-bold"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#38C0E3] text-[#002240] font-black rounded-xl flex items-center gap-1.5"
                >
                  <Save className="w-4 h-4" /> Enregistrer Bannière
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
