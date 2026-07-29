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

  // CRUD actions that post to /api/data/:filename
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

  const fetchAllData = async () => {
    setLoading(true);
    try {
      const [
        prodRes, catRes, subRes, catlRes, pageRes, menuRes,
        hpRes, setRes, banRes, sliRes, compRes, cntRes, galRes, usrRes, histRes
      ] = await Promise.all([
        fetch('/api/data/products').then((r) => r.json()),
        fetch('/api/data/categories').then((r) => r.json()),
        fetch('/api/data/subcategories').then((r) => r.json()),
        fetch('/api/data/catalogues').then((r) => r.json()),
        fetch('/api/data/pages').then((r) => r.json()),
        fetch('/api/data/menu').then((r) => r.json()),
        fetch('/api/data/homepage').then((r) => r.json()),
        fetch('/api/data/settings').then((r) => r.json()),
        fetch('/api/data/banners').then((r) => r.json()),
        fetch('/api/data/sliders').then((r) => r.json()),
        fetch('/api/data/company').then((r) => r.json()),
        fetch('/api/data/contacts').then((r) => r.json()),
        fetch('/api/data/gallery').then((r) => r.json()),
        fetch('/api/data/users').then((r) => r.json()),
        fetch('/api/data/history').then((r) => r.json())
      ]);

      if (Array.isArray(prodRes)) setProducts(prodRes);
      if (Array.isArray(catRes)) setCategories(catRes);
      if (Array.isArray(subRes)) setSubcategories(subRes);
      if (Array.isArray(catlRes)) setCatalogues(catlRes);
      if (Array.isArray(pageRes)) setPages(pageRes);
      if (Array.isArray(menuRes)) setMenu(menuRes);
      if (hpRes && typeof hpRes === 'object') setHomepage(hpRes);
      if (setRes && typeof setRes === 'object') setSettings(setRes);
      if (Array.isArray(banRes)) setBanners(banRes);
      if (Array.isArray(sliRes)) setSliders(sliRes);
      if (compRes && typeof compRes === 'object') setCompany(compRes);
      if (Array.isArray(cntRes)) setContacts(cntRes);
      if (Array.isArray(galRes)) setGallery(galRes);
      if (Array.isArray(usrRes)) setUsers(usrRes);
      if (Array.isArray(histRes)) setHistory(histRes);
    } catch (err) {
      console.error('Failed to load Bambinos data:', err);
      showToast('Erreur de chargement des données', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();
      if (data.success && data.user) {
        setAuthUser(data.user);
        localStorage.setItem('bambinos_auth_user', JSON.stringify(data.user));
        showToast('Connexion réussie', 'success');
        return true;
      } else {
        showToast(data.message || 'Identifiants invalides', 'error');
        return false;
      }
    } catch (err) {
      showToast('Erreur de connexion au serveur', 'error');
      return false;
    }
  };

  const logout = () => {
    setAuthUser(null);
    localStorage.removeItem('bambinos_auth_user');
    setIsAdminOpen(false);
    showToast('Déconnexion réussie', 'info');
  };

  const saveData = async (filename: string, data: any, actionName?: string): Promise<boolean> => {
    try {
      const res = await fetch(`/api/data/${filename}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          data,
          user: authUser?.username || 'admin',
          actionName: actionName || `UPDATE_${filename.toUpperCase()}`
        })
      });
      const json = await res.json();
      if (json.success) {
        showToast(`Modifications enregistrées (${filename})`, 'success');
        fetchAllData();
        return true;
      } else {
        showToast('Erreur lors de l\'enregistrement', 'error');
        return false;
      }
    } catch (err) {
      showToast('Erreur réseau lors de la sauvegarde', 'error');
      return false;
    }
  };

  const uploadFile = async (file: File, category: string = 'images'): Promise<string | null> => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('category', category);
      formData.append('user', authUser?.username || 'admin');

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });
      const json = await res.json();
      if (json.success && json.url) {
        showToast(`Fichier importé avec succès: ${json.filename}`, 'success');
        return json.url;
      } else {
        showToast('Échec de l\'importation du fichier', 'error');
        return null;
      }
    } catch (err) {
      showToast('Erreur lors du transfert du fichier', 'error');
      return null;
    }
  };

  const sendContactMessage = async (form: {
    name: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
    productRef?: string;
  }): Promise<boolean> => {
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const json = await res.json();
      if (json.success) {
        showToast(json.message || 'Message envoyé avec succès !', 'success');
        fetchAllData();
        return true;
      } else {
        showToast(json.error || 'Erreur lors de l\'envoi du message', 'error');
        return false;
      }
    } catch (err) {
      showToast('Erreur réseau lors de l\'envoi', 'error');
      return false;
    }
  };

  const exportBackup = () => {
    window.open('/api/backup/export', '_blank');
    showToast('Exportation du backup initialisée...', 'info');
  };

  const importBackup = async (backupObject: any): Promise<boolean> => {
    try {
      const res = await fetch('/api/backup/import', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(backupObject)
      });
      const json = await res.json();
      if (json.success) {
        showToast('Sauvegarde restaurée avec succès !', 'success');
        fetchAllData();
        return true;
      } else {
        showToast(json.error || 'Échec de la restauration', 'error');
        return false;
      }
    } catch (err) {
      showToast('Erreur réseau lors de la restauration', 'error');
      return false;
    }
  };

  const openProductModal = (prod: Product) => {
    setSelectedProduct(prod);
  };

  const closeProductModal = () => {
    setSelectedProduct(null);
  };

  const openPdfViewer = (url: string, title?: string) => {
    setActivePdfUrl(url);
    setActivePdfTitle(title || 'Document PDF Bambinos');
  };

  const closePdfViewer = () => {
    setActivePdfUrl(null);
    setActivePdfTitle(null);
  };

  const openQuoteModal = (productRef?: string) => {
    setQuoteProductRef(productRef || null);
    setIsQuoteModalOpen(true);
  };

  const closeQuoteModal = () => {
    setIsQuoteModalOpen(false);
    setQuoteProductRef(null);
  };

  const openAdmin = () => setIsAdminOpen(true);
  const closeAdmin = () => setIsAdminOpen(false);

  return (
    <DataContext.Provider
      value={{
        products,
        categories,
        subcategories,
        catalogues,
        pages,
        menu,
        homepage,
        settings,
        banners,
        sliders,
        company,
        contacts,
        gallery,
        users,
        history,
        loading,
        authUser,
        login,
        logout,
        selectedProduct,
        openProductModal,
        closeProductModal,
        activePdfUrl,
        activePdfTitle,
        openPdfViewer,
        closePdfViewer,
        isQuoteModalOpen,
        quoteProductRef,
        openQuoteModal,
        closeQuoteModal,
        isAdminOpen,
        openAdmin,
        closeAdmin,
        saveData,
        uploadFile,
        sendContactMessage,
        exportBackup,
        importBackup,
        toasts,
        showToast
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
