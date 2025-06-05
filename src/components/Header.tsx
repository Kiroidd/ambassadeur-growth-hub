
import { useState } from 'react';
import { User, Settings as SettingsIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import Settings from '@/components/Settings';

const Header = () => {
  const { user } = useAuth();
  const [showSettings, setShowSettings] = useState(false);

  // Extraire le nom d'utilisateur depuis les métadonnées ou utiliser l'email
  const userName = user?.user_metadata?.nom || user?.email?.split('@')[0] || 'Utilisateur';

  return (
    <>
      <header className="bg-slate-900 text-white p-4 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
              <span className="text-sm font-bold">A</span>
            </div>
            <h1 className="text-xl font-semibold">Airlogis</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-white hover:bg-slate-800"
              onClick={() => setShowSettings(true)}
            >
              <SettingsIcon className="h-4 w-4" />
            </Button>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <User className="h-4 w-4" />
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
