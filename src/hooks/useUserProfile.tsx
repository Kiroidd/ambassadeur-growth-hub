
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

interface UserProfile {
  id: string;
  nom: string;
  email: string;
  telephone?: string;
  code_parrain: string;
  niveau: number;
  xp: number;
  ambassadeurs_recrutes: number;
  benefices_totaux: number;
  biens_vendus: number;
}

export const useUserProfile = () => {
  const { user } = useAuth();

  const { data: profile, isLoading, error, refetch } = useQuery({
    queryKey: ['userProfile', user?.id],
    queryFn: async () => {
      if (!user?.id) return null;
      
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
        throw error;
      }

      return data as UserProfile;
    },
    enabled: !!user?.id,
  });

  return {
    profile,
    isLoading,
    error,
    refetch
  };
};
