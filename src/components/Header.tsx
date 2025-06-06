
import { useState } from 'react';
import { User, Settings as SettingsIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { useLanguage } from '@/hooks/useLanguage';
import Settings from '@/components/Settings';

const Header = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [showSettings, setShowSettings] = useState(false);

  // Extraire le nom d'utilisateur depuis les métadonnées ou utiliser l'email
  const userName = user?.user_metadata?.nom || user?.email?.split('@')[0] || 'Utilisateur';

  return (
    <>
      <header className="bg-white dark:bg-slate-900 text-gray-900 dark:text-white p-4 shadow-lg border-b border-gray-200 dark:border-slate-700">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
              <span className="text-sm font-bold text-white">A</span>
            </div>
            <h1 className="text-xl font-semibold">{t('app.title')}</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-gray-600 dark:text-white hover:bg-gray-100 dark:hover:bg-slate-800"
              onClick={() => setShowSettings(true)}
            >
              <SettingsIcon className="h-4 w-4" />
            </Button>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <User className="h-4 w-4 text-white" />
              </div>
              <span className="text-sm">{userName}</span>
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
