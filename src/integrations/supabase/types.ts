export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      paiements: {
        Row: {
          date_paiement: string | null
          id: number
          montant: number
          recommandation_id: number | null
          user_id: number | null
        }
        Insert: {
          date_paiement?: string | null
          id?: number
          montant: number
          recommandation_id?: number | null
          user_id?: number | null
        }
        Update: {
          date_paiement?: string | null
          id?: number
          montant?: number
          recommandation_id?: number | null
          user_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "paiements_recommandation_id_fkey"
            columns: ["recommandation_id"]
            isOneToOne: false
            referencedRelation: "recommandations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "paiements_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "classement"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "paiements_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      recommandations: {
        Row: {
          code_postal: string
          commentaire: string | null
          date_recommandation: string | null
          id: number
          nom_vendeur: string
          statut: string | null
          telephone_vendeur: string
          type_bien: string | null
          user_id: number | null
          ville: string
        }
        Insert: {
          code_postal: string
          commentaire?: string | null
          date_recommandation?: string | null
          id?: number
          nom_vendeur: string
          statut?: string | null
          telephone_vendeur: string
          type_bien?: string | null
          user_id?: number | null
          ville: string
        }
        Update: {
          code_postal?: string
          commentaire?: string | null
          date_recommandation?: string | null
          id?: number
          nom_vendeur?: string
          statut?: string | null
          telephone_vendeur?: string
          type_bien?: string | null
          user_id?: number | null
          ville?: string
        }
        Relationships: [
          {
            foreignKeyName: "recommandations_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "classement"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "recommandations_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      recrutements: {
        Row: {
          date_recrutement: string | null
          filleul_id: number | null
          id: number
          parrain_id: number | null
        }
        Insert: {
          date_recrutement?: string | null
          filleul_id?: number | null
          id?: number
          parrain_id?: number | null
        }
        Update: {
          date_recrutement?: string | null
          filleul_id?: number | null
          id?: number
          parrain_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "recrutements_filleul_id_fkey"
            columns: ["filleul_id"]
            isOneToOne: false
            referencedRelation: "classement"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "recrutements_filleul_id_fkey"
            columns: ["filleul_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "recrutements_parrain_id_fkey"
            columns: ["parrain_id"]
            isOneToOne: false
            referencedRelation: "classement"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "recrutements_parrain_id_fkey"
            columns: ["parrain_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          code_parrain: string | null
          cree_le: string | null
          email: string
          id: number
          niveau: number | null
          nom: string
          telephone: string
          xp: number | null
        }
        Insert: {
          code_parrain?: string | null
          cree_le?: string | null
          email: string
          id?: number
          niveau?: number | null
          nom: string
          telephone: string
          xp?: number | null
        }
        Update: {
          code_parrain?: string | null
          cree_le?: string | null
          email?: string
          id?: number
          niveau?: number | null
          nom?: string
          telephone?: string
          xp?: number | null
        }
        Relationships: []
      }
    }
    Views: {
      classement: {
        Row: {
          ambassadeurs_recrutés: number | null
          biens_vendus: number | null
          commissions_totales: number | null
          niveau: number | null
          nom: string | null
          user_id: number | null
          xp: number | null
        }
        Relationships: []
      }
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
