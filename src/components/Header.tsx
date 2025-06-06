
import { useState } from 'react';
import { User, Settings as SettingsIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { useLanguage } from '@/hooks/useLanguage';
import Settings from '@/components/Settings';

const AirlogisLogo = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Maison principale */}
    <path 
      d="M16 4L26 12V26H20V18H12V26H6V12L16 4Z" 
      fill="currentColor" 
      className="text-blue-500"
    />
    {/* Toit */}
    <path 
      d="M16 4L26 12H6L16 4Z" 
      fill="currentColor" 
      className="text-blue-600"
    />
    {/* Fenêtre */}
    <rect x="14" y="8" width="4" height="4" fill="white" rx="0.5"/>
    {/* Porte */}
    <rect x="14" y="18" width="4" height="8" fill="white" rx="0.5"/>
    {/* Poignée de porte */}
    <circle cx="17" cy="22" r="0.5" fill="currentColor" className="text-blue-500"/>
    {/* Étoiles représentant les ambassadeurs */}
    <circle cx="8" cy="8" r="1" fill="currentColor" className="text-yellow-400"/>
    <circle cx="24" cy="8" r="1" fill="currentColor" className="text-yellow-400"/>
    <circle cx="4" cy="16" r="1" fill="currentColor" className="text-yellow-400"/>
    <circle cx="28" cy="16" r="1" fill="currentColor" className="text-yellow-400"/>
  </svg>
);

const Header = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [showSettings, setShowSettings] = useState(false);

  // Extraire le nom d'utilisateur depuis les métadonnées ou utiliser l'email
  const userName = user?.user_metadata?.nom || user?.email?.split('@')[0] || 'Utilisateur';

  return (
    <>
      <header className="bg-background border-b border-border shadow-sm">
        <div className="container mx-auto flex justify-between items-center p-4">
          <div className="flex items-center space-x-3">
            <AirlogisLogo />
            <h1 className="text-xl font-semibold text-foreground">{t('app.title')}</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-muted-foreground hover:text-foreground hover:bg-accent"
              onClick={() => setShowSettings(true)}
            >
              <SettingsIcon className="h-4 w-4" />
            </Button>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <User className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="text-sm text-foreground">{userName}</span>
            </div>
          </div>
        </div>
      </header>

      {showSettings && (
        <Settings onClose={() => setShowSettings(false)} />
      )}
    </>
  );
};

export default Header;
