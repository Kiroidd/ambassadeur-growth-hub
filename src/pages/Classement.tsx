
import { ArrowLeft, Award, TrendingUp, Crown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useNavigate } from 'react-router-dom';

const Classement = () => {
  const navigate = useNavigate();

  // Données simulées du classement
  const classementXP = [
    { rang: 1, nom: 'Marie D.', xp: 1250, niveau: 4, commission: 3500 },
    { rang: 2, nom: 'Pierre L.', xp: 980, niveau: 3, commission: 2800 },
    { rang: 3, nom: 'Sophie M.', xp: 750, niveau: 3, commission: 2100 },
    { rang: 4, nom: 'Jean B.', xp: 520, niveau: 2, commission: 1400 },
    { rang: 5, nom: 'Emma R.', xp: 350, niveau: 2, commission: 950 },
    { rang: 6, nom: 'François X. (Vous)', xp: 0, niveau: 1, commission: 0 },
  ];

  const getRankIcon = (rang: number) => {
    if (rang === 1) return <Crown className="h-5 w-5 text-yellow-400" />;
    if (rang === 2) return <Award className="h-5 w-5 text-gray-400" />;
    if (rang === 3) return <Award className="h-5 w-5 text-amber-600" />;
    return <span className="text-slate-400 font-bold">#{rang}</span>;
  };

  const getRankBg = (rang: number, isCurrentUser: boolean) => {
    if (isCurrentUser) return 'bg-blue-600';
    if (rang === 1) return 'bg-gradient-to-r from-yellow-500 to-orange-500';
    if (rang === 2) return 'bg-gradient-to-r from-gray-400 to-gray-500';
    if (rang === 3) return 'bg-gradient-to-r from-amber-600 to-amber-700';
    return 'bg-slate-700';
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="text-white hover:bg-slate-800 mr-4"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="flex items-center space-x-2">
            <Award className="h-6 w-6 text-blue-500" />
            <h1 className="text-2xl font-bold">Classement des Ambassadeurs</h1>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="xp" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-slate-800">
              <TabsTrigger value="xp" className="text-white">Par XP</TabsTrigger>
              <TabsTrigger value="ventes" className="text-white">Par Ventes</TabsTrigger>
              <TabsTrigger value="commission" className="text-white">Par Commission</TabsTrigger>
            </TabsList>
            
            <TabsContent value="xp" className="mt-6">
              <div className="space-y-3">
                {classementXP.map((ambassadeur) => {
                  const isCurrentUser = ambassadeur.nom.includes('(Vous)');
                  return (
                    <div
                      key={ambassadeur.rang}
                      className={`${getRankBg(ambassadeur.rang, isCurrentUser)} rounded-xl p-4 shadow-lg`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center justify-center w-10 h-10">
                            {getRankIcon(ambassadeur.rang)}
                          </div>
                          <div>
                            <h3 className="font-semibold">{ambassadeur.nom}</h3>
                            <p className="text-sm opacity-90">Niveau {ambassadeur.niveau}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center space-x-2">
                            <TrendingUp className="h-4 w-4" />
                            <span className="font-bold">{ambassadeur.xp} XP</span>
                          </div>
                          <p className="text-sm opacity-90">{ambassadeur.commission}€ gagnés</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </TabsContent>

            <TabsContent value="ventes" className="mt-6">
              <div className="bg-slate-800 rounded-xl p-6 text-center">
                <TrendingUp className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Classement par ventes</h3>
                <p className="text-slate-400">Cette section sera disponible prochainement</p>
              </div>
            </TabsContent>

            <TabsContent value="commission" className="mt-6">
              <div className="bg-slate-800 rounded-xl p-6 text-center">
                <Award className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Classement par commission</h3>
                <p className="text-slate-400">Cette section sera disponible prochainement</p>
              </div>
            </TabsContent>
          </Tabs>

          {/* Votre position */}
          <div className="mt-8 bg-blue-600 rounded-xl p-6 text-center">
            <h3 className="text-lg font-semibold mb-2">Votre position actuelle</h3>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <div className="text-2xl font-bold">#6</div>
                <div>Rang XP</div>
              </div>
              <div>
                <div className="text-2xl font-bold">0</div>
                <div>XP Total</div>
              </div>
              <div>
                <div className="text-2xl font-bold">0€</div>
                <div>Commission</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Classement;
