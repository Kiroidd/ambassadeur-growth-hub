
import { useState } from 'react';
import { ArrowLeft, Home, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

const RecommenderBien = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nomVendeur: '',
    telephone: '',
    ville: '',
    codePostal: '',
    typeBien: '',
    commentaire: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulation de l'envoi des données
    console.log('Recommandation envoyée:', formData);
    
    toast({
      title: "Recommandation envoyée !",
      description: "Vous avez gagné +10 XP pour cette recommandation.",
    });
    
    // Réinitialiser le formulaire
    setFormData({
      nomVendeur: '',
      telephone: '',
      ville: '',
      codePostal: '',
      typeBien: '',
      commentaire: ''
    });
    
    // Retourner au dashboard après 2 secondes
    setTimeout(() => {
      navigate('/');
    }, 2000);
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
            <Home className="h-6 w-6 text-green-500" />
            <h1 className="text-2xl font-bold">Recommander un bien</h1>
          </div>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="bg-slate-800 rounded-xl p-6 shadow-lg">
            <p className="text-slate-300 mb-6">
              Recommandez un vendeur et gagnez 10 XP immédiatement, plus 50 XP si la vente se concrétise !
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="nomVendeur" className="text-white">Nom du vendeur *</Label>
                  <Input
                    id="nomVendeur"
                    value={formData.nomVendeur}
                    onChange={(e) => setFormData({...formData, nomVendeur: e.target.value})}
                    required
                    className="bg-slate-700 border-slate-600 text-white"
                    placeholder="Nom et prénom"
                  />
                </div>

                <div>
                  <Label htmlFor="telephone" className="text-white">Téléphone *</Label>
                  <Input
                    id="telephone"
                    type="tel"
                    value={formData.telephone}
                    onChange={(e) => setFormData({...formData, telephone: e.target.value})}
                    required
                    className="bg-slate-700 border-slate-600 text-white"
                    placeholder="06 12 34 56 78"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="ville" className="text-white">Ville *</Label>
                  <Input
                    id="ville"
                    value={formData.ville}
                    onChange={(e) => setFormData({...formData, ville: e.target.value})}
                    required
                    className="bg-slate-700 border-slate-600 text-white"
                    placeholder="Ville"
                  />
                </div>

                <div>
                  <Label htmlFor="codePostal" className="text-white">Code postal *</Label>
                  <Input
                    id="codePostal"
                    value={formData.codePostal}
                    onChange={(e) => setFormData({...formData, codePostal: e.target.value})}
                    required
                    className="bg-slate-700 border-slate-600 text-white"
                    placeholder="75001"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="typeBien" className="text-white">Type de bien *</Label>
                <Select onValueChange={(value) => setFormData({...formData, typeBien: value})}>
                  <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                    <SelectValue placeholder="Sélectionnez le type de bien" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-700 border-slate-600">
                    <SelectItem value="appartement">Appartement</SelectItem>
                    <SelectItem value="maison">Maison</SelectItem>
                    <SelectItem value="terrain">Terrain</SelectItem>
                    <SelectItem value="local-commercial">Local commercial</SelectItem>
                    <SelectItem value="autre">Autre</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="commentaire" className="text-white">Commentaire (optionnel)</Label>
                <Textarea
                  id="commentaire"
                  value={formData.commentaire}
                  onChange={(e) => setFormData({...formData, commentaire: e.target.value})}
                  className="bg-slate-700 border-slate-600 text-white"
                  placeholder="Informations complémentaires..."
                  rows={3}
                />
              </div>

              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-3 rounded-lg"
              >
                <Send className="h-4 w-4 mr-2" />
                Envoyer la recommandation
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecommenderBien;
