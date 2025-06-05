
import { Award } from 'lucide-react';

interface LevelCardProps {
  currentLevel: number;
  currentXP: number;
  nextLevelXP: number;
}

const LevelCard = ({ currentLevel, currentXP, nextLevelXP }: LevelCardProps) => {
  const progressPercentage = (currentXP / nextLevelXP) * 100;

  return (
    <div className="bg-slate-800 rounded-xl p-6 text-white mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
            <User className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold">Niveau {currentLevel}</h2>
            <p className="text-slate-300 text-sm">Ambassadeur Airlogis</p>
          </div>
        </div>
        <Award className="h-8 w-8 text-yellow-400" />
      </div>
      
      <div className="mb-2">
        <div className="flex justify-between text-sm text-slate-300 mb-1">
          <span>Expérience</span>
          <span>{currentXP}/{nextLevelXP} XP</span>
        </div>
        <div className="w-full bg-slate-700 rounded-full h-3">
          <div 
            className="bg-gradient-to-r from-blue-500 to-cyan-400 h-3 rounded-full transition-all duration-500"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
        <p className="text-xs text-slate-400 mt-1">
          {nextLevelXP - currentXP} XP pour le niveau {currentLevel + 1}
        </p>
      </div>
    </div>
  );
};

export default LevelCard;
