
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/hooks/useAuth';
import { useTheme } from '@/hooks/useTheme';
import { useLanguage } from '@/hooks/useLanguage';
import { toast } from '@/hooks/use-toast';
import { Moon, Sun, Globe, LogOut, X } from 'lucide-react';

interface SettingsProps {
  onClose: () => void;
}

const Settings = ({ onClose }: SettingsProps) => {
  const { signOut } = useAuth();
  const { theme, setTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();

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
    const newTheme = checked ? 'dark' : 'light';
    setTheme(newTheme);
    toast({
      title: "Thème modifié",
      description: checked ? "Mode sombre activé" : "Mode clair activé",
    });
  };

  const handleLanguageChange = (value: string) => {
    setLanguage(value as 'fr' | 'en');
    toast({
      title: "Langue modifiée",
      description: value === 'fr' ? "Français sélectionné" : "English selected",
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-md bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div>
            <CardTitle className="text-gray-900 dark:text-white">{t('settings.title')}</CardTitle>
            <CardDescription className="text-gray-600 dark:text-slate-300">
              Gérez vos préférences
            </CardDescription>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-gray-600 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-slate-700"
          >
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Thème */}
          <div className="space-y-3">
            <Label className="text-gray-900 dark:text-white text-sm font-medium">{t('settings.appearance')}</Label>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {theme === 'dark' ? (
                  <Moon className="h-4 w-4 text-gray-600 dark:text-slate-400" />
                ) : (
                  <Sun className="h-4 w-4 text-yellow-500" />
                )}
                <span className="text-gray-700 dark:text-slate-300 text-sm">
                  {theme === 'dark' ? t('settings.dark') : t('settings.light')}
                </span>
              </div>
              <Switch
                checked={theme === 'dark'}
                onCheckedChange={handleThemeChange}
              />
            </div>
          </div>

          {/* Langue */}
          <div className="space-y-3">
            <Label className="text-gray-900 dark:text-white text-sm font-medium">{t('settings.language')}</Label>
            <div className="flex items-center space-x-2">
              <Globe className="h-4 w-4 text-gray-600 dark:text-slate-400" />
              <Select value={language} onValueChange={handleLanguageChange}>
                <SelectTrigger className="bg-white dark:bg-slate-700 border-gray-300 dark:border-slate-600 text-gray-900 dark:text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-slate-700 border-gray-300 dark:border-slate-600">
                  <SelectItem value="fr" className="text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-slate-600">
                    Français
                  </SelectItem>
                  <SelectItem value="en" className="text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-slate-600">
                    English
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Déconnexion */}
          <div className="pt-4 border-t border-gray-200 dark:border-slate-700">
            <Button
              onClick={handleSignOut}
              variant="outline"
              className="w-full border-red-600 text-red-400 hover:bg-red-600 hover:text-white"
            >
              <LogOut className="h-4 w-4 mr-2" />
              {t('settings.logout')}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;
