
import { ArrowLeft, Award, TrendingUp, Crown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useNavigate } from 'react-router-dom';
import { useClassement } from '@/hooks/useClassement';
import { useLanguage } from '@/hooks/useLanguage';

const Classement = () => {
  const navigate = useNavigate();
  const { classement, userPosition, isLoading } = useClassement();
  const { t } = useLanguage();

  const getRankIcon = (rang: number) => {
    if (rang === 1) return <Crown className="h-5 w-5 text-yellow-400" />;
    if (rang === 2) return <Award className="h-5 w-5 text-gray-400" />;
    if (rang === 3) return <Award className="h-5 w-5 text-amber-600" />;
    return <span className="text-gray-600 dark:text-slate-400 font-bold">#{rang}</span>;
  };

  const getRankBg = (rang: number, isCurrentUser: boolean) => {
    if (isCurrentUser) return 'bg-blue-600';
    if (rang === 1) return 'bg-gradient-to-r from-yellow-500 to-orange-500';
    if (rang === 2) return 'bg-gradient-to-r from-gray-400 to-gray-500';
    if (rang === 3) return 'bg-gradient-to-r from-amber-600 to-amber-700';
    return 'bg-white dark:bg-slate-700 border border-gray-200 dark:border-slate-600';
  };

  const getTextColor = (rang: number, isCurrentUser: boolean) => {
    if (isCurrentUser || rang <= 3) return 'text-white';
    return 'text-gray-900 dark:text-white';
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
        <div className="container mx-auto px-4 py-8 text-center">
          <div className="text-gray-900 dark:text-white text-lg">{t('loading')}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-slate-800 mr-4"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="flex items-center space-x-2">
            <Award className="h-6 w-6 text-blue-500" />
            <h1 className="text-2xl font-bold">{t('ranking.title')}</h1>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="xp" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700">
              <TabsTrigger value="xp" className="text-gray-900 dark:text-white">{t('ranking.tab.xp')}</TabsTrigger>
              <TabsTrigger value="ventes" className="text-gray-900 dark:text-white">{t('ranking.tab.sales')}</TabsTrigger>
              <TabsTrigger value="commission" className="text-gray-900 dark:text-white">{t('ranking.tab.commission')}</TabsTrigger>
            </TabsList>
            
            <TabsContent value="xp" className="mt-6">
              <div className="space-y-3">
                {classement?.map((ambassadeur) => {
                  const isCurrentUser = ambassadeur.id === userPosition?.id;
                  const textColor = getTextColor(ambassadeur.rang, isCurrentUser);
                  
                  return (
                    <div
                      key={ambassadeur.id}
                      className={`${getRankBg(ambassadeur.rang, isCurrentUser)} rounded-xl p-4 shadow-lg`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center justify-center w-10 h-10">
                            {getRankIcon(ambassadeur.rang)}
                          </div>
                          <div>
                            <h3 className={`font-semibold ${textColor}`}>
                              {ambassadeur.nom} {isCurrentUser ? '(Vous)' : ''}
                            </h3>
                            <p className={`text-sm ${textColor} opacity-90`}>Niveau {ambassadeur.niveau}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center space-x-2">
                            <TrendingUp className="h-4 w-4" />
                            <span className={`font-bold ${textColor}`}>{ambassadeur.xp} XP</span>
                          </div>
                          <p className={`text-sm ${textColor} opacity-90`}>{ambassadeur.benefices_totaux}€ gagnés</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </TabsContent>

            <TabsContent value="ventes" className="mt-6">
              <div className="bg-white dark:bg-slate-800 rounded-xl p-6 text-center border border-gray-200 dark:border-slate-700">
                <TrendingUp className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Classement par ventes</h3>
                <p className="text-gray-600 dark:text-slate-400">Cette section sera disponible prochainement</p>
              </div>
            </TabsContent>

            <TabsContent value="commission" className="mt-6">
              <div className="bg-white dark:bg-slate-800 rounded-xl p-6 text-center border border-gray-200 dark:border-slate-700">
                <Award className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Classement par commission</h3>
                <p className="text-gray-600 dark:text-slate-400">Cette section sera disponible prochainement</p>
              </div>
            </TabsContent>
          </Tabs>

          {/* Votre position */}
          {userPosition && (
            <div className="mt-8 bg-blue-600 rounded-xl p-6 text-center text-white">
              <h3 className="text-lg font-semibold mb-2">{t('ranking.position')}</h3>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <div className="text-2xl font-bold">#{userPosition.rang}</div>
                  <div>{t('ranking.rank')}</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">{userPosition.xp}</div>
                  <div>{t('ranking.xp')}</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">{userPosition.benefices_totaux}€</div>
                  <div>{t('ranking.commission')}</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Classement;
