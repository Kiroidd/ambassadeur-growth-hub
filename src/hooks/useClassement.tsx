
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

interface ClassementEntry {
  id: string;
  nom: string;
  niveau: number;
  xp: number;
  ambassadeurs_recrutes: number;
  benefices_totaux: number;
  biens_vendus: number;
  rang: number;
}

export const useClassement = () => {
  const { user } = useAuth();

  const { data: classement, isLoading, error, refetch } = useQuery({
    queryKey: ['classement'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('classement_view')
        .select('*')
        .order('rang');

      if (error) {
        console.error('Error fetching classement:', error);
        throw error;
      }

      return data as ClassementEntry[];
    },
    enabled: !!user,
  });

  // Trouver la position de l'utilisateur actuel
  const userPosition = classement?.find(entry => entry.id === user?.id);

  return {
    classement,
    userPosition,
    isLoading,
    error,
    refetch
  };
};
