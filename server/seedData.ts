export const initialCategories = [
  {
    id: "cat-1",
    name: "Chambres sur Mesure",
    slug: "chambres-sur-mesure",
    description: "Conception complète d'espaces de vie raffinés et évolutifs pour bébés, enfants et adolescents.",
    image: "/uploads/images/bambinos_hero_room.jpg",
    icon: "Bed",
    displayOrder: 1
  },
  {
    id: "cat-2",
    name: "Lits Mezzanine & Superposés",
    slug: "lits-mezzanine-superposes",
    description: "Structures intelligentes gain de place, cabanes ludiques et espaces nuit sur-mesure.",
    image: "/uploads/images/bambinos_hero_room.jpg",
    icon: "Layers",
    displayOrder: 2
  },
  {
    id: "cat-3",
    name: "Dressings & Rangements",
    slug: "dressings-rangements",
    description: "Dressings intégrés, armoires modulables et penderies conçues à la hauteur de vos enfants.",
    image: "/uploads/images/bambinos_dressing.jpg",
    icon: "Archive",
    displayOrder: 3
  },
  {
    id: "cat-4",
    name: "Bureaux & Bibliothèques",
    slug: "bureaux-bibliotheques",
    description: "Espaces d'apprentissage ergonomiques, coins lecture et bibliothèques d'éveil.",
    image: "/uploads/images/bambinos_desk.jpg",
    icon: "BookOpen",
    displayOrder: 4
  },
  {
    id: "cat-5",
    name: "Décorations & Accessoires",
    slug: "decorations-accessoires",
    description: "Luminaires doux, miroirs sécurisés, papiers peints poétiques et touches finales.",
    image: "/uploads/images/bambinos_desk.jpg",
    icon: "Sparkles",
    displayOrder: 5
  }
];

export const initialSubcategories = [
  {
    id: "sub-1",
    categoryId: "cat-1",
    name: "Chambre Bébé Évolutive",
    slug: "chambre-bebe",
    description: "Berceaux transformables et mobilier doux pour les tout-petits",
    displayOrder: 1
  },
  {
    id: "sub-2",
    categoryId: "cat-1",
    name: "Chambre Ado & Suite Premium",
    slug: "chambre-ado",
    description: "Suites modernes intégrant espace nuit, dressing et étude",
    displayOrder: 2
  },
  {
    id: "sub-3",
    categoryId: "cat-2",
    name: "Lit Superposé Architectural",
    slug: "lit-superpose",
    description: "Superpositions sur mesure avec escalier coffre et rangements",
    displayOrder: 1
  },
  {
    id: "sub-4",
    categoryId: "cat-3",
    name: "Dressing Intégré LED",
    slug: "dressing-integre",
    description: "Penderies éclairées et étagères ajustables en chêne massif",
    displayOrder: 1
  },
  {
    id: "sub-5",
    categoryId: "cat-4",
    name: "Bureau Ergonomique Sur-Mesure",
    slug: "bureau-ergonomique",
    description: "Bureaux réglables en hauteur avec niches électrifiées",
    displayOrder: 1
  }
];

export const initialProducts = [
  {
    id: "prod-1",
    name: "Chambre Concept Nuage & Chêne Massif",
    reference: "BAM-2026-NUA",
    shortDescription: "Aménagement complet sur mesure combinant lit cabane surélevé, bureau ergonomique et dressing intégré.",
    fullDescription: "Inspirée de la douceur des intérieurs scandinaves et de l'exigence de l'artisanat haut de gamme, la suite 'Concept Nuage' offre une symphonie visuelle entre le chêne naturel blond et des finitions laquées écologiques. Cet aménagement optimise chaque centimètre carré : l'escalier latéral abrite des tiroirs à fermeture amortie, la niche sous-lit dissimule un espace étude rétroéclairé et le dressing attenant propose une penderie télescopique accessible aux enfants.",
    features: [
      "Bois de chêne certifié FSC et laque hydro à zéro COV",
      "Escalier coffre de rangement à fermetures freinées",
      "Éclairage LED 3000K encastré à variateur d'intensité",
      "Fabrication artisanale sur mesure sous 4 à 6 semaines",
      "Garantie 10 ans sur la structure"
    ],
    technicalSpecs: {
      "Structure": "Chêne massif de Bourgogne & MDF haute densité (19mm)",
      "Finitions": "Vernis mat écologique à l'eau (Norme EN 71-3)",
      "Quincaillerie": "Blum Motion à amortissement intégré",
      "Capacité Lit": "Jusqu'à 150 kg"
    },
    dimensions: "Longueur: 285 cm x Profondeur: 140 cm x Hauteur: 210 cm (Adaptable)",
    weight: "210 kg (Poids total assemblé)",
    materials: ["Chêne massif", "MDF Écologique FSC", "Peinture laquée hydro", "Inox brossé"],
    colors: ["Chêne Blond", "Beige Lin", "Blanc Coton", "Vert Sauge"],
    price: 34500,
    promoPrice: 31900,
    images: [
      "/uploads/images/bambinos_hero_room.jpg",
      "/uploads/images/bambinos_dressing.jpg",
      "/uploads/images/bambinos_desk.jpg"
    ],
    pdfUrl: "/uploads/pdf/fiche_technique_concept_nuage.pdf",
    videoUrl: "",
    availability: "Sur mesure",
    displayOrder: 1,
    categoryId: "cat-1",
    subcategoryId: "sub-2",
    status: "active",
    isFeatured: true,
    createdAt: "2026-01-15T10:00:00Z",
    updatedAt: "2026-07-28T07:00:00Z"
  },
  {
    id: "prod-2",
    name: "Dressing Panoramique Sur-Mesure 'Horizon'",
    reference: "BAM-2026-HOR",
    shortDescription: "Dressing d'angle pour enfant et adolescent avec éclairage automatique LED et miroir biseauté.",
    fullDescription: "Le dressing Horizon redéfinit le rangement pour enfants avec une approche architecturale élégante. Conçu pour favoriser l'autonomie dès le plus jeune âge, il combine des tringles escamotables à hauteur réglable, des tiroirs vitrés pour les accessoires et un espace à chaussures ventilé. Ses façades aux lignes cannelées et ses poignées en laiton massif apportent une touche de luxe intemporel.",
    features: [
      "Façades cannelées réalisées à la main",
      "Capteurs de présence pour allumage automatique des LED",
      "Portes amorties avec charnières invisibles 110°",
      "Miroir de sécurité anti-éclats intégré",
      "Configuration intérieure 100% personnalisable"
    ],
    technicalSpecs: {
      "Façades": "Medium MDF laqué mat ou placage Chêne naturel",
      "Intérieur": "Mélaminé haute densité anti-rayures texturé textile",
      "LED": "Bandeaux LED COB 24V extra-mats intégrés"
    },
    dimensions: "Largeur: 240 cm x Profondeur: 60 cm x Hauteur: 245 cm",
    weight: "185 kg",
    materials: ["Placage Chêne", "MDF Laqué", "Verre Trempé", "Laiton Brossé"],
    colors: ["Chêne Naturel", "Blanc Casse", "Gris Cashmere"],
    price: 28900,
    promoPrice: 26500,
    images: [
      "/uploads/images/bambinos_dressing.jpg",
      "/uploads/images/bambinos_hero_room.jpg"
    ],
    pdfUrl: "/uploads/pdf/fiche_technique_horizon.pdf",
    availability: "Sur mesure",
    displayOrder: 2,
    categoryId: "cat-3",
    subcategoryId: "sub-4",
    status: "active",
    isFeatured: true,
    createdAt: "2026-02-10T11:00:00Z",
    updatedAt: "2026-07-28T07:00:00Z"
  },
  {
    id: "prod-3",
    name: "Bureau d'Étude & Bibliothèque 'Atelier Éveil'",
    reference: "BAM-2026-ATE",
    shortDescription: "Espace de travail ergonomique réglable avec rangements muraux suspendus et connectique dissimulée.",
    fullDescription: "Créé pour soutenir la concentration et la créativité de votre enfant de ses 6 ans à l'adolescence. L'Atelier Éveil comprend un plateau spacieux en chêne massif traité anti-taches, des passe-câbles intégrés avec passe-fil en silicone et des étagères alvéolaires ajustables sans outils.",
    features: [
      "Plateau ergonomique avec bords doux adoucis",
      "Niche passe-câbles dissimulée sous le plateau",
      "Étagères modulables sur crémaillères invisibles",
      "Support tablette/livre intégré au plateau",
      "Traitement de surface ultra-résistant aux rayures"
    ],
    technicalSpecs: {
      "Plateau": "Chêne massif épaisseur 32mm",
      "Piètement": "Acier thermolaqué ou Chêne massif",
      "Charge Max": "80 kg répartis"
    },
    dimensions: "Largeur: 160 cm x Profondeur: 65 cm x Hauteur bureau: 75 cm (Hauteur totale 200 cm)",
    weight: "75 kg",
    materials: ["Chêne massif", "Acier Poudré", "Laiton"],
    colors: ["Chêne Naturel", "Beige Rosé", "Terrazzo Vert"],
    price: 16800,
    images: [
      "/uploads/images/bambinos_desk.jpg",
      "/uploads/images/bambinos_hero_room.jpg"
    ],
    pdfUrl: "/uploads/pdf/fiche_technique_atelier_eveil.pdf",
    availability: "Sur commande",
    displayOrder: 3,
    categoryId: "cat-4",
    subcategoryId: "sub-5",
    status: "active",
    isFeatured: true,
    createdAt: "2026-03-01T09:30:00Z",
    updatedAt: "2026-07-28T07:00:00Z"
  },
  {
    id: "prod-4",
    name: "Lit Superposé Sculptural 'Duetto'",
    reference: "BAM-2026-DUE",
    shortDescription: "Lit superposé pour fratrie avec niches de chevet individuelles et escalier sécurisé.",
    fullDescription: "Duetto est la solution ultime pour les chambres partagées élégantes. Chaque couchette dispose de sa propre liseuse orientable à commande tactile, d'une prise USB intégrée et d'une petite étagère pour les livres du soir. Les barrières de sécurité aux formes organiques évitent tout sentiment de confinement tout en assurant une sécurité absolue.",
    features: [
      "Deux lits de dimension 90x200 cm (ou sur-mesure)",
      "Liseuses LED individuelles à variateur tactile",
      "Marches larges antidérapantes avec tiroirs intégrés",
      "Panneaux acoustiques rembourrés en lin naturel en option",
      "Sommiers à lattes en hêtre multiplis inclus"
    ],
    technicalSpecs: {
      "Structure": "Hêtre et Chêne massif certifiés PEFC",
      "Hauteur sous plafond requise": "230 cm minimum",
      "Sécurité": "Conforme à la norme NF EN 747-1+A1"
    },
    dimensions: "Longueur: 250 cm x Largeur: 100 cm x Hauteur: 185 cm",
    weight: "190 kg",
    materials: ["Hêtre massif", "Chêne", "Lin Écologique", "Acier"],
    colors: ["Blanc Lin", "Chêne Miel", "Bleu Fjord"],
    price: 32000,
    promoPrice: 29800,
    images: [
      "/uploads/images/bambinos_hero_room.jpg"
    ],
    availability: "Sur mesure",
    displayOrder: 4,
    categoryId: "cat-2",
    subcategoryId: "sub-3",
    status: "active",
    isFeatured: false,
    createdAt: "2026-03-15T14:00:00Z",
    updatedAt: "2026-07-28T07:00:00Z"
  }
];

export const initialCatalogues = [
  {
    id: "cat-pdf-1",
    title: "Collection Exclusive Bambinos 2026",
    description: "Le catalogue complet de nos créations d'espaces sur mesure pour enfants, incluant chambres, lits cabanes et dressings.",
    coverImage: "/uploads/images/bambinos_hero_room.jpg",
    pdfUrl: "/uploads/pdf/catalogue_bambinos_2026.pdf",
    pageCount: 48,
    year: "2026",
    isFeatured: true
  },
  {
    id: "cat-pdf-2",
    title: "Guide des Matériaux & Finitions Écologiques",
    description: "Découvrez notre sélection de bois nobles, laques végétales et textiles certifiés Oeko-Tex.",
    coverImage: "/uploads/images/bambinos_dressing.jpg",
    pdfUrl: "/uploads/pdf/guide_materiaux_bambinos.pdf",
    pageCount: 24,
    year: "2026",
    isFeatured: false
  }
];

export const initialPages = [
  {
    id: "page-1",
    title: "À Propos de Bambinos",
    slug: "a-propos",
    content: "Depuis plus de 15 ans, Bambinos imagine et fabrique des espaces d'exception dédiés à l'univers de l'enfant. Nos ateliers réunissent architectes d'intérieur, artisans ébénistes et designers pour créer des meubles uniques, durables et adaptés au développement de chaque enfant.",
    metaTitle: "À Propos | Bambinos – Créateur d'espaces sur mesure",
    metaDescription: "Découvrez l'histoire de Bambinos, nos ateliers de fabrication et notre engagement pour le mobilier enfant haut de gamme.",
    published: true,
    updatedAt: "2026-07-28T07:00:00Z"
  },
  {
    id: "page-2",
    title: "Notre Démarche Sur-Mesure",
    slug: "sur-mesure",
    content: "Chaque projet Bambinos commence par une écoute attentive. Nous modélisons votre pièce en 3D, sélectionnons les plus belles essences de bois et réalisons la fabrication sur mesure avant de procéder à l'installation à votre domicile par nos propres menuisiers.",
    metaTitle: "Processus Sur-Mesure | Bambinos",
    metaDescription: "De la conception 3D à la pose finale chez vous, découvrez comment nous réalisons la chambre sur-mesure de vos rêves.",
    published: true,
    updatedAt: "2026-07-28T07:00:00Z"
  }
];

export const initialMenu = [
  { id: "m-1", label: "Accueil", url: "/", order: 1 },
  { id: "m-2", label: "Chambres", url: "/#categories", order: 2 },
  { id: "m-3", label: "Catalogue", url: "/#catalogue", order: 3 },
  { id: "m-4", label: "Réalisations", url: "/#realisations", order: 4 },
  { id: "m-5", label: "À Propos", url: "/#presentation", order: 5 },
  { id: "m-6", label: "Contact & Devis", url: "/#contact", order: 6 }
];

export const initialHomepage = {
  hero: {
    title: "Créateur d'espaces d'exception pour vos enfants",
    subtitle: "Du mobilier haut de gamme fabriqué sur-mesure : chambres féeriques, dressings intelligents, bureaux ergonomiques et bibliothèques sur-mesure.",
    bgImage: "/uploads/images/bambinos_hero_room.jpg",
    ctaText: "Découvrir la Collection",
    ctaUrl: "#catalogue",
    secondaryCtaText: "Demander une étude 3D"
  },
  presentation: {
    title: "L'Excellence du Sur-Mesure Enfant",
    subtitle: "Harmonie, sécurité et poésie au cœur de chaque création.",
    text: "Chez BAMBINOS, nous croyons qu'une chambre d'enfant n'est pas seulement une pièce, mais un sanctuaire d'éveil, de jeu et d'apprentissage. Nous concevons chaque meuble avec la précision de la haute ébénisterie et la bienveillance qu'exige le monde de l'enfance.",
    image1: "/uploads/images/bambinos_hero_room.jpg",
    image2: "/uploads/images/bambinos_dressing.jpg",
    yearsExperience: 15,
    projectsCompleted: 850,
    satisfactionRate: 99
  },
  whyUs: [
    { icon: "ShieldCheck", title: "Sécurité & Normes Stricte", description: "Matériaux 100% non toxiques, peintures à l'eau sans COV et coins adoucis pour une sérénité totale." },
    { icon: "Compass", title: "Conception 3D & Sur-Mesure", description: "Modélisation photoréaliste de votre espace avant fabrication pour une projection parfaite." },
    { icon: "Hammer", title: "Ébénisterie Artisanale", description: "Chêne massif, hêtre certifié et assemblage traditionnel pour un mobilier qui dure des générations." },
    { icon: "Truck", title: "Livraison & Pose Premium", description: "Installation minutieuse à domicile effectuée par nos propres artisans spécialistes." }
  ],
  services: [
    { title: "Chambres sur Mesure", description: "Espaces complets pensés de la naissance à l'adolescence.", image: "/uploads/images/bambinos_hero_room.jpg", link: "#catalogue" },
    { title: "Dressings & Penderies", description: "Optimisation de rangement sur-mesure avec éclairage LED.", image: "/uploads/images/bambinos_dressing.jpg", link: "#catalogue" },
    { title: "Bureaux & Bibliothèques", description: "Coins études ergonomiques qui évoluent avec la croissance.", image: "/uploads/images/bambinos_desk.jpg", link: "#catalogue" }
  ],
  realisations: [
    { title: "Suite Parentale & Niche Bébé Chic", category: "Chambre Bébé", image: "/uploads/images/bambinos_hero_room.jpg", description: "Intégration d'un berceau évolutif en chêne dans une suite aux teintes champagne." },
    { title: "Dressing Intégré & Penderie Enfant", category: "Dressing", image: "/uploads/images/bambinos_dressing.jpg", description: "Dressing d'angle sur toute la hauteur sous plafond avec miroirs biseautés." },
    { title: "Espace Étude & Bibliothèque Murale", category: "Bureau", image: "/uploads/images/bambinos_desk.jpg", description: "Espace de travail double avec étagères rétroversées pour frères et sœurs." }
  ],
  testimonials: [
    { name: "SOPHIE & MARC L.", role: "Parents de Gabriel & Rose", comment: "Bambinos a transformé la chambre de nos jumeaux en un véritable havre de paix. Le lit superposé avec escalier coffre est d'une qualité inégalée.", rating: 5, avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80" },
    { name: "AMINE K.", role: "Architecte d'Intérieur", comment: "Je collabore régulièrement avec Bambinos pour mes clients exigeants. Leur finition en chêne naturel et leur réactivité sur le sur-mesure sont irréprochables.", rating: 5, avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80" },
    { name: "CLAIRE D.", role: "Maman de Louis", comment: "Du premier plan 3D à l'installation finale, le niveau de soin et d'attention portée aux détails nous a époustouflés. Bravo à toute l'équipe !", rating: 5, avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80" }
  ],
  faqs: [
    { question: "Combien de temps faut-il pour réaliser une chambre sur-mesure ?", answer: "Entre la validation des plans 3D et la pose à domicile, comptez généralement entre 4 et 6 semaines selon la complexité du projet." },
    { question: "Les matériaux utilisés sont-ils sûrs pour les enfants ?", answer: "Absolument. Nous utilisons uniquement des bois nobles certifiés FSC/PEFC et des laques à l'eau hydrofuges répondant aux normes européennes EN 71-3 pour les jouets et le mobilier enfant." },
    { question: "Proposez-vous un devis et une modélisation 3D gratuits ?", answer: "Oui ! Après une première prise de rendez-vous ou l'envoi de vos cotes, nous réalisons une première étude et un rendu 3D personnalisé sans engagement." },
    { question: "Livrez-vous et installez-vous partout ?", answer: "Oui, notre équipe technique dédiée assure la livraison et la pose directement chez vous avec un niveau d'exigence irréprochable." }
  ]
};

export const initialSettings = {
  siteName: "BAMBINOS",
  tagline: "Créateur d'espaces sur mesure pour enfants",
  logoUrl: "/uploads/logos/logo_bambinos.svg",
  faviconUrl: "/uploads/logos/favicon.ico",
  metaTitle: "BAMBINOS – Créateur d'espaces sur mesure | Mobilier Enfant Haut de Gamme",
  metaDescription: "Spécialiste du mobilier enfant d'exception, chambres sur mesure, lits cabanes, dressings intégrés, bureaux et bibliothèques d'éveil.",
  keywords: "bambinos, chambre enfant sur mesure, dressing enfant, lit superpose luxe, meuble enfant haut de gamme, meuble sur mesure",
  ogImage: "/uploads/images/bambinos_hero_room.jpg",
  themeColor: "#C5A059"
};

export const initialBanners = [
  {
    id: "ban-1",
    title: "Offre Étude 3D Offerte",
    subtitle: "Pour tout projet de chambre sur-mesure validé ce mois-ci",
    imageUrl: "/uploads/banners/banner_3d.jpg",
    linkUrl: "#contact",
    buttonText: "Profiter de l'offre",
    active: true,
    location: "top_bar" as const
  }
];

export const initialSliders = [
  {
    id: "sli-1",
    title: "Chambres d'Enfants Sur-Mesure",
    subtitle: "Un univers poétique façonné autour des rêves de votre enfant",
    imageUrl: "/uploads/images/bambinos_hero_room.jpg",
    ctaText: "Découvrir la Collection",
    ctaLink: "#catalogue",
    order: 1,
    active: true
  },
  {
    id: "sli-2",
    title: "Dressings & Penderies Intelligentes",
    subtitle: "L'art du rangement élégant et accessible dès le plus jeune âge",
    imageUrl: "/uploads/images/bambinos_dressing.jpg",
    ctaText: "Voir les Dressings",
    ctaLink: "#catalogue",
    order: 2,
    active: true
  }
];

export const initialCompany = {
  name: "BAMBINOS – Créateur d'espaces sur mesure",
  slogan: "L'excellence du sur-mesure au service de l'enfance",
  address: "Boulevard d'Anfa, Résidence Les Palms, No 14",
  city: "Casablanca, Maroc",
  phone: "+212 5 22 33 44 55",
  whatsapp: "+212 6 61 23 45 67",
  email: "contact@bambinos-surmesure.ma",
  workingHours: "Lundi - Samedi : 09h30 - 19h30 (Sur rendez-vous)",
  mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3323.513337985835!2d-7.6322!3d33.5898!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzPCsDM1JzIzLjMiTiA3wrAzNyc1NS45Ilc!5e0!3m2!1sfr!2sma!4v1620000000000",
  socialLinks: {
    instagram: "https://instagram.com/bambinos_surmesure",
    facebook: "https://facebook.com/bambinos.surmesure",
    pinterest: "https://pinterest.com/bambinos_design",
    linkedin: "https://linkedin.com/company/bambinos"
  }
};

export const initialContacts = [
  {
    id: "cnt-1",
    name: "Mme Karim",
    email: "karim.sofia@gmail.com",
    phone: "+212 6 62 11 22 33",
    subject: "Demande de Devis Chambre Jumeaux",
    message: "Bonjour, je souhaiterais obtenir un devis pour un lit superposé sur mesure avec bureau et dressing intégré pour une pièce de 18m2.",
    productRef: "BAM-2026-NUA",
    date: "2026-07-28T06:30:00Z",
    read: false
  }
];

export const initialUsers = [
  {
    id: "usr-admin",
    username: "admin",
    role: "Administrator",
    lastLogin: "2026-07-28T07:00:00Z"
  }
];

export const initialHistory = [
  {
    id: "hist-1",
    date: "2026-07-28",
    time: "07:00:00",
    user: "admin",
    action: "SYSTEM_INITIALIZATION",
    target: "Bambinos System",
    oldValue: "N/A",
    newValue: "Système Bambinos initialisé avec succès"
  }
];
