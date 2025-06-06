
import { createContext, useContext, useState, useEffect } from 'react';

type Language = 'fr' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  fr: {
    'app.title': 'Airlogis',
    'dashboard.title': 'Tableau de Bord Ambassadeur',
    'dashboard.subtitle': 'Suivez vos performances et gagnez des récompenses',
    'metrics.ambassadors': 'Ambassadeurs Recrutés',
    'metrics.ambassadors.subtitle': 'Recrutements totaux',
    'metrics.benefits': 'Bénéfices Totaux',
    'metrics.benefits.subtitle': 'Commissions gagnées',
    'metrics.properties': 'Biens Vendus',
    'metrics.properties.subtitle': 'Biens recommandés vendus',
    'metrics.level': 'Niveau d\'expérience',
    'actions.recruit': 'Recruter un Ambassadeur',
    'actions.recommend': 'Recommander un bien',
    'actions.ranking': 'Classement',
    'ranking.title': 'Classement des Ambassadeurs',
    'ranking.tab.xp': 'Par XP',
    'ranking.tab.sales': 'Par Ventes',
    'ranking.tab.commission': 'Par Commission',
    'ranking.position': 'Votre position actuelle',
    'ranking.rank': 'Rang XP',
    'ranking.xp': 'XP Total',
    'ranking.commission': 'Commission',
    'loading': 'Chargement...',
    'loading.profile': 'Chargement de votre profil...',
    'settings.title': 'Paramètres',
    'settings.appearance': 'Apparence',
    'settings.language': 'Langue',
    'settings.logout': 'Se déconnecter',
    'settings.dark': 'Mode sombre',
    'settings.light': 'Mode clair'
  },
  en: {
    'app.title': 'Airlogis',
    'dashboard.title': 'Ambassador Dashboard',
    'dashboard.subtitle': 'Track your performance and earn rewards',
    'metrics.ambassadors': 'Recruited Ambassadors',
    'metrics.ambassadors.subtitle': 'Total recruitments',
    'metrics.benefits': 'Total Benefits',
    'metrics.benefits.subtitle': 'Commissions earned',
    'metrics.properties': 'Properties Sold',
    'metrics.properties.subtitle': 'Recommended properties sold',
    'metrics.level': 'Experience Level',
    'actions.recruit': 'Recruit Ambassador',
    'actions.recommend': 'Recommend Property',
    'actions.ranking': 'Ranking',
    'ranking.title': 'Ambassador Ranking',
    'ranking.tab.xp': 'By XP',
    'ranking.tab.sales': 'By Sales',
    'ranking.tab.commission': 'By Commission',
    'ranking.position': 'Your current position',
    'ranking.rank': 'XP Rank',
    'ranking.xp': 'Total XP',
    'ranking.commission': 'Commission',
    'loading': 'Loading...',
    'loading.profile': 'Loading your profile...',
    'settings.title': 'Settings',
    'settings.appearance': 'Appearance',
    'settings.language': 'Language',
    'settings.logout': 'Logout',
    'settings.dark': 'Dark mode',
    'settings.light': 'Light mode'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('language');
    return (saved as Language) || 'fr';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['fr']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};
