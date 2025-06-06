
import { User, TrendingUp, Award, Home } from 'lucide-react';
import Header from '@/components/Header';
import LevelCard from '@/components/LevelCard';
import MetricCard from '@/components/MetricCard';
import ActionButton from '@/components/ActionButton';
import { useNavigate } from 'react-router-dom';
import { useUserProfile } from '@/hooks/useUserProfile';
import { useLanguage } from '@/hooks/useLanguage';

const Dashboard = () => {
  const navigate = useNavigate();
  const { profile, isLoading } = useUserProfile();
  const { t } = useLanguage();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
        <Header />
        <div className="container mx-auto px-4 py-8 text-center">
          <div className="text-gray-900 dark:text-white text-lg">{t('loading.profile')}</div>
        </div>
      </div>
    );
  }

  // Données par défaut si le profil n'est pas encore chargé
  const userData = {
    currentLevel: profile?.niveau || 1,
    currentXP: profile?.xp || 0,
    nextLevelXP: (profile?.niveau || 1) * 100,
    ambassadeursRecrutes: profile?.ambassadeurs_recrutes || 0,
    beneficesTotaux: profile?.benefices_totaux || 0,
    biensVendus: profile?.biens_vendus || 0
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {t('dashboard.title')}
          </h1>
          <p className="text-gray-600 dark:text-slate-400">
            {t('dashboard.subtitle')}
          </p>
        </div>

        <LevelCard 
          currentLevel={userData.currentLevel}
          currentXP={userData.currentXP}
          nextLevelXP={userData.nextLevelXP}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title={t('metrics.benefits')}
            value={`${userData.beneficesTotaux}€`}
            subtitle={t('metrics.benefits.subtitle')}
            icon={<span className="text-2xl">€</span>}
            gradient="bg-gradient-to-br from-green-500 to-green-600"
          />
          
          <MetricCard
            title={t('metrics.ambassadors')}
            value={userData.ambassadeursRecrutes}
            subtitle={t('metrics.ambassadors.subtitle')}
            icon={<User className="h-8 w-8" />}
            gradient="bg-gradient-to-br from-blue-500 to-blue-600"
          />
          
          <MetricCard
            title={t('metrics.properties')}
            value={userData.biensVendus}
            subtitle={t('metrics.properties.subtitle')}
            icon={<Home className="h-8 w-8" />}
            gradient="bg-gradient-to-br from-purple-500 to-purple-600"
          />
          
          <MetricCard
            title={t('metrics.level')}
            value={`Niveau ${userData.currentLevel}`}
            subtitle={`${userData.currentXP} XP total`}
            icon={<TrendingUp className="h-8 w-8" />}
            gradient="bg-gradient-to-br from-orange-500 to-orange-600"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <ActionButton
            icon={<User className="h-5 w-5" />}
            title={t('actions.recruit')}
            gradient="bg-gradient-to-r from-cyan-500 to-blue-500"
            onClick={() => navigate('/recruter')}
          />
          
          <ActionButton
            icon={<Home className="h-5 w-5" />}
            title={t('actions.recommend')}
            gradient="bg-gradient-to-r from-green-500 to-green-600"
            onClick={() => navigate('/recommander')}
          />
          
          <ActionButton
            icon={<Award className="h-5 w-5" />}
            title={t('actions.ranking')}
            gradient="bg-gradient-to-r from-blue-500 to-blue-600"
            onClick={() => navigate('/classement')}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
