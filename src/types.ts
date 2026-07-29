export interface Product {
  id: string;
  name: string;
  reference: string;
  shortDescription: string;
  fullDescription: string;
  features: string[];
  technicalSpecs: Record<string, string>;
  dimensions: string;
  weight: string;
  materials: string[];
  colors: string[];
  price: number;
  promoPrice?: number;
  images: string[];
  pdfUrl?: string;
  videoUrl?: string;
  availability: 'En stock' | 'Sur commande' | 'Sur mesure' | 'En réapprovisionnement';
  displayOrder: number;
  categoryId: string;
  subcategoryId?: string;
  status: 'active' | 'draft' | 'archived';
  isFeatured?: boolean;
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  icon?: string;
  displayOrder: number;
  metaTitle?: string;
  metaDescription?: string;
}

export interface Subcategory {
  id: string;
  categoryId: string;
  name: string;
  slug: string;
  description?: string;
  displayOrder: number;
}

export interface Catalogue {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  pdfUrl: string;
  pageCount: number;
  year: string;
  isFeatured: boolean;
}

export interface CustomPage {
  id: string;
  title: string;
  slug: string;
  content: string;
  metaTitle?: string;
  metaDescription?: string;
  published: boolean;
  updatedAt: string;
}

export interface MenuItem {
  id: string;
  label: string;
  url: string;
  order: number;
  parentId?: string;
  visible?: boolean;
  visibilityMode?: 'all' | 'desktop' | 'mobile' | 'admin' | 'hidden';
  icon?: string;
  image?: string;
  description?: string;
  badge?: string;
  badgeColor?: string;
  targetType?: 'page' | 'category' | 'catalogue' | 'link';
  targetWindow?: '_self' | '_blank';
  linkType?: 'internal' | 'external' | 'pdf_download';
  children?: MenuItem[];
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  type: 'photo' | 'video' | 'before_after';
  imageBefore?: string;
  imageAfter: string;
  videoUrl?: string;
  description: string;
  date: string;
}

export interface HomepageSections {
  hero: boolean;
  presentation: boolean;
  categories: boolean;
  products: boolean;
  realisations: boolean;
  gallery: boolean;
  services: boolean;
  testimonials: boolean;
  faq: boolean;
  contact: boolean;
}

export interface HomepageData {
  sections?: HomepageSections;
  hero: {
    title: string;
    subtitle: string;
    bgImage: string;
    ctaText: string;
    ctaUrl: string;
    secondaryCtaText: string;
  };
  presentation: {
    title: string;
    subtitle: string;
    text: string;
    image1: string;
    image2: string;
    yearsExperience: number;
    projectsCompleted: number;
    satisfactionRate: number;
  };
  whyUs: Array<{ icon: string; title: string; description: string }>;
  services: Array<{ title: string; description: string; image: string; link: string }>;
  realisations: Array<{ title: string; category: string; image: string; description: string }>;
  testimonials: Array<{ name: string; role: string; comment: string; rating: number; avatar: string }>;
  faqs: Array<{ question: string; answer: string }>;
}

export interface Settings {
  siteName: string;
  tagline: string;
  logoUrl: string;
  faviconUrl: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  ogImage: string;
  themeColor: string;
  adminPassword?: string;
}

export interface Banner {
  id: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  linkUrl?: string;
  buttonText?: string;
  active: boolean;
  location: 'top_bar' | 'hero_slider' | 'catalog_top' | 'popup';
}

export interface Slider {
  id: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  videoUrl?: string;
  ctaText: string;
  ctaLink: string;
  order: number;
  active: boolean;
}

export interface CompanyInfo {
  name: string;
  slogan: string;
  address: string;
  city: string;
  phone: string;
  whatsapp: string;
  email: string;
  workingHours: string;
  mapEmbedUrl?: string;
  socialLinks: {
    instagram?: string;
    facebook?: string;
    tiktok?: string;
    youtube?: string;
    pinterest?: string;
    linkedin?: string;
  };
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  productRef?: string;
  date: string;
  read: boolean;
}

export interface User {
  id: string;
  username: string;
  role: string;
  lastLogin?: string;
}

export interface HistoryLog {
  id: string;
  date: string;
  time: string;
  user: string;
  action: string;
  target: string;
  oldValue?: string;
  newValue?: string;
}
