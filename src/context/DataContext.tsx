import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Product,
  Category,
  Subcategory,
  Catalogue,
  CustomPage,
  MenuItem,
  HomepageData,
  Settings,
  Banner,
  Slider,
  CompanyInfo,
  ContactMessage,
  GalleryItem,
  User,
  HistoryLog
} from '../types';

// Importation directe des fichiers JSON locaux (Vite résout et parse le contenu automatiquement)
import prodRes from '../data/products.json';
import catRes from '../data/categories.json';
import subRes from '../data/subcategories.json';
import catlRes from '../data/catalogues.json';
import pageRes from '../data/pages.json';
import menuRes from '../data/menu.json';
import hpRes from '../data/homepage.json';
import setRes from '../data/settings.json';
import banRes from '../data/banners.json';
import sliRes from '../data/sliders.json';
import compRes from '../data/company.json';
import cntRes from '../data/contacts.json';
import galRes from '../data/gallery.json';
import usrRes from '../data/users.json';
import histRes from '../data/history.json';

interface AuthUser {
  id: string;
  username: string;
  role: string;
  token: string;
}

interface Toast {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}

interface DataContextType {
  products: Product[];
  categories: Category[];
  subcategories: Subcategory[];
  catalogues: Catalogue[];
  pages: CustomPage[];
  menu: MenuItem[];
  homepage: HomepageData | null;
  settings: Settings | null;
  banners: Banner[];
  sliders: Slider[];
  company: CompanyInfo | null;
  contacts: ContactMessage[];
  gallery: GalleryItem[];
  users: User[];
  history: HistoryLog[];
  loading: boolean;
  
  // Auth
  authUser: AuthUser | null;
  login: (u: string, p: string) => Promise<boolean>;
  logout: () => void;

  // Selected state for modals
  selectedProduct: Product | null;
  openProductModal: (prod: Product) => void;
  closeProductModal: () => void;

  activePdfUrl: string | null;
  activePdfTitle: string | null;
  openPdfViewer: (url: string, title?: string) => void;
  closePdfViewer: () => void;

  isQuoteModalOpen: boolean;
  quoteProductRef: string | null;
  openQuoteModal: (productRef?: string) => void;
  closeQuoteModal: () => void;

  isAdminOpen: boolean;
  openAdmin: () => void;
  closeAdmin: () => void;

  // CRUD actions (simulées en mode client pur)
  saveData: (filename: string, data: any, actionName?: string) => Promise<boolean>;
  uploadFile: (file: File, category?: string) => Promise<string | null>;
  sendContactMessage: (form: { name: string; email: string; phone: string; subject: string; message: string; productRef?: string }) => Promise<boolean>;
  
  // Backup & Import
  exportBackup: () => void;
  importBackup: (backupObject: any) => Promise<boolean>;

  // Toasts
  toasts: Toast[];
  showToast: (msg: string, type?: 'success' | 'error' | 'info') => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [catalogues, setCatalogues] = useState<Catalogue[]>([]);
  const [pages, setPages] = useState<CustomPage[]>([]);
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [homepage, setHomepage] = useState<HomepageData | null>(null);
  const [settings, setSettings] = useState<Settings | null>(null);
  const [banners, setBanners] = useState<Banner[]>([]);
  const [sliders, setSliders] = useState<Slider[]>([]);
  const [company, setCompany] = useState<CompanyInfo | null>(null);
  const [contacts, setContacts] = useState<ContactMessage[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [history, setHistory] = useState<HistoryLog[]>([]);
  
  const [loading, setLoading] = useState<boolean>(true);
  const [authUser, setAuthUser] = useState<AuthUser | null>(() => {
    const saved = localStorage.getItem('bambinos_auth_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activePdfUrl, setActivePdfUrl] = useState<string | null>(null);
  const [activePdfTitle, setActivePdfTitle] = useState<string | null>(null);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState<boolean>(false);
  const [quoteProductRef, setQuoteProductRef] = useState<string | null>(null);
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);

  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = `t-${Date.now()}-${Math.random()}`;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const fetchAllData = () => {
    setLoading(true);
    try {
      // Chargement direct depuis la mémoire statique compilée (Vite modules)
      if (Array.isArray(prodRes)) setProducts(prodRes as Product[]);
      if (Array.isArray(catRes)) setCategories(catRes as Category[]);
      if (Array.isArray(subRes)) setSubcategories(subRes as Subcategory[]);
      if (Array.isArray(catlRes)) setCatalogues(catlRes as Catalogue[]);
      if (Array.isArray(pageRes)) setPages(pageRes as CustomPage[]);
      if (Array.isArray(menuRes)) setMenu(menuRes as MenuItem[]);
      if (hpRes && typeof hpRes === 'object') setHomepage(hpRes as HomepageData);
      if (setRes && typeof setRes === 'object') setSettings(setRes as Settings);
      if (Array.isArray(banRes)) setBanners(banRes as Banner[]);
      if (Array.isArray(sliRes)) setSliders(sliRes as Slider[]);
      if (compRes && typeof compRes === 'object') setCompany(compRes as CompanyInfo);
      if (Array.isArray(cntRes)) setContacts(cntRes as ContactMessage[]);
      if (Array.isArray(galRes)) setGallery(galRes as GalleryItem[]);
      if (Array.isArray(usrRes)) setUsers(usrRes as User[]);
      if (Array.isArray(histRes)) setHistory(histRes as HistoryLog[]);
    } catch (err) {
      console.error('Failed to parse static Bambinos data:', err);
      showToast('Erreur d\'injection des données statiques', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    // Mode déconnecté : simule une connexion admin pour le site statique
    if (username === 'admin' && password === 'admin') {
      const mockUser = { id: 'usr-admin', username: 'admin', role: 'admin', token: 'static-token' };
      setAuthUser(mockUser);
      localStorage.setItem('bambinos_auth_user', JSON.stringify(mockUser));
      showToast('Connexion réussie (Mode Statique)', 'success');
      return true;
    }
    showToast('Identifiants invalides', 'error');
    return false;
  };

  const logout = () => {
    setAuthUser(null);
    localStorage.removeItem('bambinos_auth_user');
    setIsAdminOpen(false);
    showToast('Déconnexion réussie', 'info');
  };

  const saveData = async (filename: string, data: any, actionName?: string): Promise<boolean> => {
    showToast('Mode statique : l\'écriture de fichier requiert un serveur backend actif.', 'info');
    return true;
  };

  const uploadFile = async (file: File, category?: string): Promise<string | null> => {
    showToast('Mode statique : l\'upload de médias nécessite un système de fichiers serveur.', 'error');
    return null;
  };

  const sendContactMessage = async (form: any): Promise<boolean> => {
    showToast('Message de contact simulé avec succès !', 'success');
    return true;
  };

  const exportBackup = () => {
    showToast('Exportation non disponible en mode autonome.', 'info');
  };

  const importBackup = async (backupObject: any): Promise<boolean> => {
    showToast('Importation non disponible en mode autonome.', 'info');
    return false;
  };

  const openProductModal = (prod: Product) => setSelectedProduct(prod);
  const closeProductModal = () => setSelectedProduct(null);
  const openPdfViewer = (url: string, title?: string) => { setActivePdfUrl(url); if(title) setActivePdfTitle(title); };
  const closePdfViewer = () => { setActivePdfUrl(null); setActivePdfTitle(null); };
  const openQuoteModal = (ref?: string) => { setIsQuoteModalOpen(true); if(ref) setQuoteProductRef(ref); };
  const closeQuoteModal = () => { setIsQuoteModalOpen(false); setQuoteProductRef(null); };
  const openAdmin = () => setIsAdminOpen(true);
  const closeAdmin = () => setIsAdminOpen(false);

  return (
    <DataContext.Provider value={{
      products, categories, subcategories, catalogues, pages, menu, homepage, settings, banners, sliders, company, contacts, gallery, users, history, loading,
      authUser, login, logout, selectedProduct, openProductModal, closeProductModal, activePdfUrl, activePdfTitle, openPdfViewer, closePdfViewer,
      isQuoteModalOpen, quoteProductRef, openQuoteModal, closeQuoteModal, isAdminOpen, openAdmin, closeAdmin, saveData, uploadFile, sendContactMessage, exportBackup, importBackup, toasts, showToast
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) throw new Error('useData must be used within a DataProvider');
  return context;
};
