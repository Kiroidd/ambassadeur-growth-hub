
import { useState } from 'react';
import { ArrowLeft, User, Copy, Share2, QrCode } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';
import { useUserProfile } from '@/hooks/useUserProfile';

const RecruterAmbassadeur = () => {
  const navigate = useNavigate();
  const { profile } = useUserProfile();
  
  const referralCode = profile?.code_parrain || 'LOADING...';
  const referralLink = `${window.location.origin}/auth?ref=${referralCode}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink);
    toast({
      title: "Lien copié !",
      description: "Le lien de parrainage a été copié dans le presse-papiers.",
    });
  };

  const shareViaWhatsApp = () => {
    const message = `Rejoins-moi sur Airlogis et deviens ambassadeur ! 🏠✨ ${referralLink}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
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
            <User className="h-6 w-6 text-cyan-500" />
            <h1 className="text-2xl font-bold">Recruter un Ambassadeur</h1>
          </div>
        </div>

        <div className="max-w-2xl mx-auto space-y-6">
          {/* Bénéfices du recrutement */}
          <div className="bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl p-6 text-center">
            <h2 className="text-xl font-bold mb-2">Gagnez des récompenses !</h2>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <div className="text-2xl font-bold">+20 XP</div>
                <div>Par recrutement</div>
              </div>
              <div>
                <div className="text-2xl font-bold">+30 XP</div>
                <div>Par vente de votre filleul</div>
              </div>
            </div>
          </div>

          {/* Lien de parrainage */}
          <div className="bg-slate-800 rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4">Votre lien de parrainage</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-slate-300 mb-2">Code ambassadeur</label>
                <div className="flex items-center space-x-2">
                  <Input
                    value={referralCode}
                    readOnly
                    className="bg-slate-700 border-slate-600 text-white font-mono"
                  />
                  <Button
                    onClick={copyToClipboard}
                    variant="outline"
                    size="sm"
                    className="border-slate-600 text-white hover:bg-slate-700"
                    disabled={referralCode === 'LOADING...'}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div>
                <label className="block text-sm text-slate-300 mb-2">Lien complet</label>
                <div className="flex items-center space-x-2">
                  <Input
                    value={referralLink}
                    readOnly
                    className="bg-slate-700 border-slate-600 text-white font-mono text-sm"
                  />
                  <Button
                    onClick={copyToClipboard}
                    variant="outline"
                    size="sm"
                    className="border-slate-600 text-white hover:bg-slate-700"
                    disabled={referralCode === 'LOADING...'}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Actions de partage */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button
              onClick={shareViaWhatsApp}
              className="bg-green-600 hover:bg-green-700 text-white py-3"
              disabled={referralCode === 'LOADING...'}
            >
              <Share2 className="h-4 w-4 mr-2" />
              WhatsApp
            </Button>
            
            <Button
              onClick={copyToClipboard}
              variant="outline"
              className="border-slate-600 text-white hover:bg-slate-700 py-3"
              disabled={referralCode === 'LOADING...'}
            >
              <Copy className="h-4 w-4 mr-2" />
              Copier le lien
            </Button>
            
            <Button
              variant="outline"
              className="border-slate-600 text-white hover:bg-slate-700 py-3"
            >
              <QrCode className="h-4 w-4 mr-2" />
              QR Code
            </Button>
          </div>

          {/* Instructions */}
          <div className="bg-slate-800 rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4">Comment ça marche ?</h3>
            <ol className="list-decimal list-inside space-y-2 text-slate-300">
              <li>Partagez votre lien de parrainage unique</li>
              <li>Votre filleul s'inscrit via votre lien</li>
              <li>Vous gagnez immédiatement +20 XP</li>
              <li>À chaque vente de votre filleul, vous gagnez +30 XP supplémentaires</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecruterAmbassadeur;
