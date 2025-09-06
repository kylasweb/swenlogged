import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';

interface GlobalData {
  // Site Settings
  siteSettings: {
    siteName: string;
    tagline: string;
    logo: string;
    favicon: string;
    theme: 'light' | 'dark' | 'auto';
    language: string;
  };
  
  // Contact Information
  contactInfo: {
    phone: string;
    email: string;
    address: string;
    businessHours: string;
    socialMedia: {
      facebook?: string;
      twitter?: string;
      linkedin?: string;
      instagram?: string;
    };
  };

  // Hero Section
  hero: {
    title: string;
    subtitle: string;
    description: string;
    backgroundImage: string;
    ctaText: string;
    ctaLink: string;
  };

  // About Section
  about: {
    title: string;
    description: string;
    image: string;
    stats: Array<{
      label: string;
      value: string;
    }>;
  };

  // Services
  services: Array<{
    id: string;
    title: string;
    description: string;
    icon: string;
    image?: string;
    features?: string[];
  }>;

  // CTA Settings
  cta: {
    enabled: boolean;
    text: string;
    link: string;
    position: 'header' | 'footer' | 'floating';
  };

  // Forms
  forms: Array<{
    id: string;
    name: string;
    title: string;
    fields: any[];
    active: boolean;
  }>;

  // Media Library
  media: Array<{
    id: string;
    name: string;
    url: string;
    alt: string;
    type: string;
  }>;

  // Pages
  pages: Array<{
    id: string;
    title: string;
    slug: string;
    content: string;
    published: boolean;
    seo: {
      metaTitle?: string;
      metaDescription?: string;
      keywords?: string[];
    };
  }>;
}

interface GlobalDataContextType {
  data: GlobalData;
  updateData: (section: keyof GlobalData, newData: any) => void;
  syncData: () => void;
}

const defaultGlobalData: GlobalData = {
  siteSettings: {
    siteName: 'SWENLOG',
    tagline: 'Your Trusted Logistics Partner',
    logo: '/logo.png',
    favicon: '/favicon.ico',
    theme: 'light',
    language: 'en'
  },
  contactInfo: {
    phone: '+91 80476 97802',
    email: 'info@swenlog.com',
    address: 'No.2, 2nd Floor, Kodambakkam High Road, Nungambakkam, Chennai - 600034, Tamil Nadu, India',
    businessHours: 'Mon-Fri: 9AM-6PM, Sat: 9AM-1PM',
    socialMedia: {
      facebook: 'https://facebook.com/swenlog',
      twitter: 'https://twitter.com/swenlog',
      linkedin: 'https://linkedin.com/company/swenlog',
      instagram: 'https://instagram.com/swenlog'
    }
  },
  hero: {
    title: 'Global Logistics Solutions',
    subtitle: 'Connecting Your Business to the World',
    description: 'Streamline your supply chain with our comprehensive logistics services. From air freight to warehousing, we handle it all.',
    backgroundImage: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?ixlib=rb-4.0.3',
    ctaText: 'Get Started',
    ctaLink: '/contact'
  },
  about: {
    title: 'About SWENLOG',
    description: 'With over 20 years of experience in the logistics industry, SWENLOG has established itself as a trusted partner for businesses worldwide.',
    image: 'https://images.unsplash.com/photo-1611095970692-3ab74cc8b9f1?ixlib=rb-4.0.3',
    stats: [
      { label: 'Years of Experience', value: '20+' },
      { label: 'Global Partners', value: '500+' },
      { label: 'Countries Served', value: '200+' },
      { label: 'Satisfied Clients', value: '10,000+' }
    ]
  },
  services: [
    {
      id: '1',
      title: 'Air Freight',
      description: 'Fast and reliable air cargo services worldwide',
      icon: 'plane',
      features: ['Express delivery', '24/7 tracking', 'Custom clearance', 'Temperature controlled']
    },
    {
      id: '2',
      title: 'Ocean Freight',
      description: 'Cost-effective sea freight solutions',
      icon: 'ship',
      features: ['FCL & LCL options', 'Port-to-port delivery', 'Cargo insurance', 'Documentation']
    },
    {
      id: '3',
      title: 'Ground Transportation',
      description: 'Reliable land transport services',
      icon: 'truck',
      features: ['Last-mile delivery', 'Cross-border transport', 'Fleet management', 'Real-time tracking']
    }
  ],
  cta: {
    enabled: true,
    text: 'Ready to streamline your logistics? Get a free quote today!',
    link: '/contact',
    position: 'floating'
  },
  forms: [],
  media: [],
  pages: []
};

const GlobalDataContext = createContext<GlobalDataContextType | undefined>(undefined);

export const GlobalDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [heroData, setHeroData] = useLocalStorage('heroData', defaultGlobalData.hero);
  const [aboutData, setAboutData] = useLocalStorage('aboutData', defaultGlobalData.about);
  const [servicesData, setServicesData] = useLocalStorage('servicesData', defaultGlobalData.services);
  const [ctaData, setCTAData] = useLocalStorage('ctaData', defaultGlobalData.cta);
  const [formsData, setFormsData] = useLocalStorage('formsData', []);
  const [mediaData, setMediaData] = useLocalStorage('mediaData', []);
  const [pagesData, setPagesData] = useLocalStorage('pagesData', []);
  const [siteSettings, setSiteSettings] = useLocalStorage('siteSettings', defaultGlobalData.siteSettings);
  const [contactInfo, setContactInfo] = useLocalStorage('contactInfo', defaultGlobalData.contactInfo);

  const [data, setData] = useState<GlobalData>(defaultGlobalData);

  // Sync all data whenever any part changes
  useEffect(() => {
    const syncedData: GlobalData = {
      siteSettings,
      contactInfo,
      hero: heroData,
      about: aboutData,
      services: servicesData,
      cta: ctaData,
      forms: formsData,
      media: mediaData,
      pages: pagesData
    };
    setData(syncedData);
  }, [heroData, aboutData, servicesData, ctaData, formsData, mediaData, pagesData, siteSettings, contactInfo]);

  const updateData = (section: keyof GlobalData, newData: any) => {
    switch (section) {
      case 'hero':
        setHeroData(newData);
        break;
      case 'about':
        setAboutData(newData);
        break;
      case 'services':
        setServicesData(newData);
        break;
      case 'cta':
        setCTAData(newData);
        break;
      case 'forms':
        setFormsData(newData);
        break;
      case 'media':
        setMediaData(newData);
        break;
      case 'pages':
        setPagesData(newData);
        break;
      case 'siteSettings':
        setSiteSettings(newData);
        break;
      case 'contactInfo':
        setContactInfo(newData);
        break;
    }
  };

  const syncData = () => {
    // Force re-sync by updating state
    const currentData = { ...data };
    setData(currentData);
  };

  return (
    <GlobalDataContext.Provider value={{ data, updateData, syncData }}>
      {children}
    </GlobalDataContext.Provider>
  );
};

export const useGlobalData = () => {
  const context = useContext(GlobalDataContext);
  if (!context) {
    throw new Error('useGlobalData must be used within a GlobalDataProvider');
  }
  return context;
};