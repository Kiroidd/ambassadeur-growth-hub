
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/hooks/useAuth';
import { toast } from '@/hooks/use-toast';
import { Moon, Sun, Globe, LogOut, X } from 'lucide-react';

interface SettingsProps {
  onClose: () => void;
}

const Settings = ({ onClose }: SettingsProps) => {
  const { signOut } = useAuth();
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [language, setLanguage] = useState('fr');

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: "Déconnexion réussie",
        description: "À bientôt sur Airlogis !",
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de se déconnecter.",
        variant: "destructive",
      });
    }
  };

  const handleThemeChange = (checked: boolean) => {
    setIsDarkMode(checked);
    toast({
      title: "Thème modifié",
      description: checked ? "Mode sombre activé" : "Mode clair activé",
    });
  };

  const handleLanguageChange = (value: string) => {
    setLanguage(value);
    toast({
      title: "Langue modifiée",
      description: value === 'fr' ? "Français sélectionné" : "English selected",
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-md bg-slate-800 border-slate-700">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div>
            <CardTitle className="text-white">Paramètres</CardTitle>
            <CardDescription className="text-slate-300">
              Gérez vos préférences
            </CardDescription>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-slate-400 hover:text-white hover:bg-slate-700"
          >
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Thème */}
          <div className="space-y-3">
            <Label className="text-white text-sm font-medium">Apparence</Label>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {isDarkMode ? (
                  <Moon className="h-4 w-4 text-slate-400" />
                ) : (
                  <Sun className="h-4 w-4 text-yellow-500" />
                )}
                <span className="text-slate-300 text-sm">
                  {isDarkMode ? 'Mode sombre' : 'Mode clair'}
                </span>
              </div>
              <Switch
                checked={isDarkMode}
                onCheckedChange={handleThemeChange}
              />
            </div>
          </div>

          {/* Langue */}
          <div className="space-y-3">
            <Label className="text-white text-sm font-medium">Langue</Label>
            <div className="flex items-center space-x-2">
              <Globe className="h-4 w-4 text-slate-400" />
              <Select value={language} onValueChange={handleLanguageChange}>
                <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-700 border-slate-600">
                  <SelectItem value="fr" className="text-white hover:bg-slate-600">
                    Français
                  </SelectItem>
                  <SelectItem value="en" className="text-white hover:bg-slate-600">
                    English
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Déconnexion */}
          <div className="pt-4 border-t border-slate-700">
            <Button
              onClick={handleSignOut}
              variant="outline"
              className="w-full border-red-600 text-red-400 hover:bg-red-600 hover:text-white"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Se déconnecter
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;
