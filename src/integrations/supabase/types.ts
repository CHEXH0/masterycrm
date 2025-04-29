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
      beneficiaries: {
        Row: {
          contact_info: string | null
          created_at: string
          first_name: string
          id: string
          last_name: string
          percentage: number
          policy_id: string
          relationship: string
          updated_at: string
        }
        Insert: {
          contact_info?: string | null
          created_at?: string
          first_name: string
          id?: string
          last_name: string
          percentage: number
          policy_id: string
          relationship: string
          updated_at?: string
        }
        Update: {
          contact_info?: string | null
          created_at?: string
          first_name?: string
          id?: string
          last_name?: string
          percentage?: number
          policy_id?: string
          relationship?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "beneficiaries_policy_id_fkey"
            columns: ["policy_id"]
            isOneToOne: false
            referencedRelation: "policies"
            referencedColumns: ["id"]
          },
        ]
      }
      claims: {
        Row: {
          amount: number
          claim_number: string
          created_at: string
          description: string | null
          filed_date: string
          id: string
          policy_id: string
          status: string
          updated_at: string
        }
        Insert: {
          amount: number
          claim_number: string
          created_at?: string
          description?: string | null
          filed_date: string
          id?: string
          policy_id: string
          status: string
          updated_at?: string
        }
        Update: {
          amount?: number
          claim_number?: string
          created_at?: string
          description?: string | null
          filed_date?: string
          id?: string
          policy_id?: string
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "claims_policy_id_fkey"
            columns: ["policy_id"]
            isOneToOne: false
            referencedRelation: "policies"
            referencedColumns: ["id"]
          },
        ]
      }
      companies: {
        Row: {
          created_at: string
          employees: string
          id: string
          industry: string
          location: string
          logo: string | null
          name: string
          status: string
          updated_at: string
          website: string
        }
        Insert: {
          created_at?: string
          employees: string
          id?: string
          industry: string
          location: string
          logo?: string | null
          name: string
          status: string
          updated_at?: string
          website: string
        }
        Update: {
          created_at?: string
          employees?: string
          id?: string
          industry?: string
          location?: string
          logo?: string | null
          name?: string
          status?: string
          updated_at?: string
          website?: string
        }
        Relationships: []
      }
      contacts: {
        Row: {
          avatar_url: string | null
          company: string | null
          created_at: string
          email: string | null
          first_name: string
          id: string
          last_name: string
          notes: string | null
          phone: string | null
          position: string | null
          status: string
          type: string
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          company?: string | null
          created_at?: string
          email?: string | null
          first_name: string
          id?: string
          last_name: string
          notes?: string | null
          phone?: string | null
          position?: string | null
          status?: string
          type?: string
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          company?: string | null
          created_at?: string
          email?: string | null
          first_name?: string
          id?: string
          last_name?: string
          notes?: string | null
          phone?: string | null
          position?: string | null
          status?: string
          type?: string
          updated_at?: string
        }
        Relationships: []
      }
      deals: {
        Row: {
          close_date: string
          company: string
          created_at: string
          id: string
          probability: number
          stage: string
          title: string
          updated_at: string
          value: number
        }
        Insert: {
          close_date: string
          company: string
          created_at?: string
          id?: string
          probability: number
          stage: string
          title: string
          updated_at?: string
          value: number
        }
        Update: {
          close_date?: string
          company?: string
          created_at?: string
          id?: string
          probability?: number
          stage?: string
          title?: string
          updated_at?: string
          value?: number
        }
        Relationships: []
      }
      health_profiles: {
        Row: {
          alcohol_use: boolean | null
          allergies: string | null
          blood_type: string | null
          client_id: string
          conditions: string | null
          created_at: string
          family_medical_history: string | null
          height: string | null
          id: string
          medications: string | null
          tobacco_use: boolean | null
          updated_at: string
          weight: string | null
        }
        Insert: {
          alcohol_use?: boolean | null
          allergies?: string | null
          blood_type?: string | null
          client_id: string
          conditions?: string | null
          created_at?: string
          family_medical_history?: string | null
          height?: string | null
          id?: string
          medications?: string | null
          tobacco_use?: boolean | null
          updated_at?: string
          weight?: string | null
        }
        Update: {
          alcohol_use?: boolean | null
          allergies?: string | null
          blood_type?: string | null
          client_id?: string
          conditions?: string | null
          created_at?: string
          family_medical_history?: string | null
          height?: string | null
          id?: string
          medications?: string | null
          tobacco_use?: boolean | null
          updated_at?: string
          weight?: string | null
        }
        Relationships: []
      }
      policies: {
        Row: {
          agent_id: string | null
          client_id: string
          coverage_amount: number
          created_at: string
          effective_date: string
          expiration_date: string | null
          id: string
          policy_number: string
          premium: number
          provider: string
          status: string
          type: string
          updated_at: string
        }
        Insert: {
          agent_id?: string | null
          client_id: string
          coverage_amount: number
          created_at?: string
          effective_date: string
          expiration_date?: string | null
          id?: string
          policy_number: string
          premium: number
          provider: string
          status: string
          type: string
          updated_at?: string
        }
        Update: {
          agent_id?: string | null
          client_id?: string
          coverage_amount?: number
          created_at?: string
          effective_date?: string
          expiration_date?: string | null
          id?: string
          policy_number?: string
          premium?: number
          provider?: string
          status?: string
          type?: string
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
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
