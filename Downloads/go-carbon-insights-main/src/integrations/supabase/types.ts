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
      audit_logs: {
        Row: {
          action: string
          company_id: string | null
          created_at: string | null
          id: string
          ip_address: unknown | null
          new_values: Json | null
          old_values: Json | null
          record_id: string | null
          table_name: string
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          action: string
          company_id?: string | null
          created_at?: string | null
          id?: string
          ip_address?: unknown | null
          new_values?: Json | null
          old_values?: Json | null
          record_id?: string | null
          table_name: string
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          action?: string
          company_id?: string | null
          created_at?: string | null
          id?: string
          ip_address?: unknown | null
          new_values?: Json | null
          old_values?: Json | null
          record_id?: string | null
          table_name?: string
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "audit_logs_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "audit_logs_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "public_company_data"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "audit_logs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      carbon_strategies: {
        Row: {
          company_id: string | null
          created_at: string | null
          description: string | null
          expected_reduction: number | null
          id: string
          implementation_year: number | null
          status: string | null
          strategy_type: string
        }
        Insert: {
          company_id?: string | null
          created_at?: string | null
          description?: string | null
          expected_reduction?: number | null
          id?: string
          implementation_year?: number | null
          status?: string | null
          strategy_type: string
        }
        Update: {
          company_id?: string | null
          created_at?: string | null
          description?: string | null
          expected_reduction?: number | null
          id?: string
          implementation_year?: number | null
          status?: string | null
          strategy_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "carbon_strategies_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "carbon_strategies_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "public_company_data"
            referencedColumns: ["id"]
          },
        ]
      }
      companies: {
        Row: {
          carbon_footprint: number
          created_at: string | null
          description: string | null
          energy_consumption: number
          id: string
          industry: string | null
          name: string
          renewable_energy_percentage: number | null
          sector: string | null
          top_carbon_footprints: string[] | null
          updated_at: string | null
          waste_generated: number
        }
        Insert: {
          carbon_footprint?: number
          created_at?: string | null
          description?: string | null
          energy_consumption?: number
          id: string
          industry?: string | null
          name: string
          renewable_energy_percentage?: number | null
          sector?: string | null
          top_carbon_footprints?: string[] | null
          updated_at?: string | null
          waste_generated?: number
        }
        Update: {
          carbon_footprint?: number
          created_at?: string | null
          description?: string | null
          energy_consumption?: number
          id?: string
          industry?: string | null
          name?: string
          renewable_energy_percentage?: number | null
          sector?: string | null
          top_carbon_footprints?: string[] | null
          updated_at?: string | null
          waste_generated?: number
        }
        Relationships: []
      }
      company_benchmarks: {
        Row: {
          benchmark_year: number
          company_id: string | null
          created_at: string | null
          emissions_per_employee: number | null
          emissions_per_revenue: number | null
          employee_range: string | null
          id: string
          industry: string
          is_public_data: boolean | null
          revenue_range: string | null
          sbti_status: string | null
          sector: string | null
          total_emissions: number
          updated_at: string | null
        }
        Insert: {
          benchmark_year: number
          company_id?: string | null
          created_at?: string | null
          emissions_per_employee?: number | null
          emissions_per_revenue?: number | null
          employee_range?: string | null
          id?: string
          industry: string
          is_public_data?: boolean | null
          revenue_range?: string | null
          sbti_status?: string | null
          sector?: string | null
          total_emissions: number
          updated_at?: string | null
        }
        Update: {
          benchmark_year?: number
          company_id?: string | null
          created_at?: string | null
          emissions_per_employee?: number | null
          emissions_per_revenue?: number | null
          employee_range?: string | null
          id?: string
          industry?: string
          is_public_data?: boolean | null
          revenue_range?: string | null
          sbti_status?: string | null
          sector?: string | null
          total_emissions?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "company_benchmarks_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "company_benchmarks_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "public_company_data"
            referencedColumns: ["id"]
          },
        ]
      }
      emissions_data: {
        Row: {
          company_id: string | null
          created_at: string | null
          id: string
          scope1: number
          scope2: number
          scope3: number
          year: number
        }
        Insert: {
          company_id?: string | null
          created_at?: string | null
          id?: string
          scope1?: number
          scope2?: number
          scope3?: number
          year: number
        }
        Update: {
          company_id?: string | null
          created_at?: string | null
          id?: string
          scope1?: number
          scope2?: number
          scope3?: number
          year?: number
        }
        Relationships: [
          {
            foreignKeyName: "emissions_data_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "emissions_data_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "public_company_data"
            referencedColumns: ["id"]
          },
        ]
      }
      frameworks_compliance: {
        Row: {
          company_id: string | null
          created_at: string | null
          description: string | null
          framework_name: string
          id: string
          last_updated: string | null
          status: string
        }
        Insert: {
          company_id?: string | null
          created_at?: string | null
          description?: string | null
          framework_name: string
          id?: string
          last_updated?: string | null
          status: string
        }
        Update: {
          company_id?: string | null
          created_at?: string | null
          description?: string | null
          framework_name?: string
          id?: string
          last_updated?: string | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "frameworks_compliance_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "frameworks_compliance_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "public_company_data"
            referencedColumns: ["id"]
          },
        ]
      }
      sbti_pathway_data: {
        Row: {
          actual_emissions: number | null
          company_id: string | null
          created_at: string | null
          id: string
          target_emissions: number | null
          year: number
        }
        Insert: {
          actual_emissions?: number | null
          company_id?: string | null
          created_at?: string | null
          id?: string
          target_emissions?: number | null
          year: number
        }
        Update: {
          actual_emissions?: number | null
          company_id?: string | null
          created_at?: string | null
          id?: string
          target_emissions?: number | null
          year?: number
        }
        Relationships: [
          {
            foreignKeyName: "sbti_pathway_data_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sbti_pathway_data_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "public_company_data"
            referencedColumns: ["id"]
          },
        ]
      }
      sbti_targets: {
        Row: {
          baseline_year: number | null
          company_id: string | null
          created_at: string | null
          current_progress_scope1_2: number
          current_progress_scope3: number
          description: string | null
          id: string
          long_term_target: string | null
          near_term_2030_scope1_2: number
          near_term_2030_scope3: number
          near_term_target: string | null
          progress_percentage: number | null
          status: string | null
          target_year: number | null
        }
        Insert: {
          baseline_year?: number | null
          company_id?: string | null
          created_at?: string | null
          current_progress_scope1_2: number
          current_progress_scope3: number
          description?: string | null
          id?: string
          long_term_target?: string | null
          near_term_2030_scope1_2: number
          near_term_2030_scope3: number
          near_term_target?: string | null
          progress_percentage?: number | null
          status?: string | null
          target_year?: number | null
        }
        Update: {
          baseline_year?: number | null
          company_id?: string | null
          created_at?: string | null
          current_progress_scope1_2?: number
          current_progress_scope3?: number
          description?: string | null
          id?: string
          long_term_target?: string | null
          near_term_2030_scope1_2?: number
          near_term_2030_scope3?: number
          near_term_target?: string | null
          progress_percentage?: number | null
          status?: string | null
          target_year?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "sbti_targets_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sbti_targets_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "public_company_data"
            referencedColumns: ["id"]
          },
        ]
      }
      scope1_emissions: {
        Row: {
          company_id: string | null
          created_at: string | null
          emissions_by_source: number
          id: string
          source: string
          total_emissions: number
          year: number
        }
        Insert: {
          company_id?: string | null
          created_at?: string | null
          emissions_by_source: number
          id?: string
          source: string
          total_emissions: number
          year: number
        }
        Update: {
          company_id?: string | null
          created_at?: string | null
          emissions_by_source?: number
          id?: string
          source?: string
          total_emissions?: number
          year?: number
        }
        Relationships: [
          {
            foreignKeyName: "scope1_emissions_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "scope1_emissions_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "public_company_data"
            referencedColumns: ["id"]
          },
        ]
      }
      scope2_emissions: {
        Row: {
          company_id: string | null
          created_at: string | null
          emissions_by_source: number
          id: string
          location: string | null
          percentage: string | null
          source: string
          total_emissions: number
          year: number
        }
        Insert: {
          company_id?: string | null
          created_at?: string | null
          emissions_by_source: number
          id?: string
          location?: string | null
          percentage?: string | null
          source: string
          total_emissions: number
          year: number
        }
        Update: {
          company_id?: string | null
          created_at?: string | null
          emissions_by_source?: number
          id?: string
          location?: string | null
          percentage?: string | null
          source?: string
          total_emissions?: number
          year?: number
        }
        Relationships: [
          {
            foreignKeyName: "scope2_emissions_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "scope2_emissions_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "public_company_data"
            referencedColumns: ["id"]
          },
        ]
      }
      scope3_emissions: {
        Row: {
          category: string
          company_id: string | null
          created_at: string | null
          emissions_by_category: number
          id: string
          influence_factors: string | null
          insights: string | null
          total_emissions: number
          year: number
        }
        Insert: {
          category: string
          company_id?: string | null
          created_at?: string | null
          emissions_by_category: number
          id?: string
          influence_factors?: string | null
          insights?: string | null
          total_emissions: number
          year: number
        }
        Update: {
          category?: string
          company_id?: string | null
          created_at?: string | null
          emissions_by_category?: number
          id?: string
          influence_factors?: string | null
          insights?: string | null
          total_emissions?: number
          year?: number
        }
        Relationships: [
          {
            foreignKeyName: "scope3_emissions_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "scope3_emissions_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "public_company_data"
            referencedColumns: ["id"]
          },
        ]
      }
      user_company_access: {
        Row: {
          access_level: string
          company_id: string | null
          expires_at: string | null
          granted_at: string | null
          granted_by: string | null
          id: string
          is_active: boolean | null
          user_id: string | null
        }
        Insert: {
          access_level: string
          company_id?: string | null
          expires_at?: string | null
          granted_at?: string | null
          granted_by?: string | null
          id?: string
          is_active?: boolean | null
          user_id?: string | null
        }
        Update: {
          access_level?: string
          company_id?: string | null
          expires_at?: string | null
          granted_at?: string | null
          granted_by?: string | null
          id?: string
          is_active?: boolean | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_company_access_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_company_access_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "public_company_data"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_company_access_granted_by_fkey"
            columns: ["granted_by"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_company_access_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_profiles: {
        Row: {
          created_at: string | null
          email: string
          email_verified: boolean | null
          full_name: string | null
          id: string
          is_active: boolean | null
          role: string
          updated_at: string | null
          username: string
        }
        Insert: {
          created_at?: string | null
          email: string
          email_verified?: boolean | null
          full_name?: string | null
          id: string
          is_active?: boolean | null
          role?: string
          updated_at?: string | null
          username: string
        }
        Update: {
          created_at?: string | null
          email?: string
          email_verified?: boolean | null
          full_name?: string | null
          id?: string
          is_active?: boolean | null
          role?: string
          updated_at?: string | null
          username?: string
        }
        Relationships: []
      }
    }
    Views: {
      public_company_data: {
        Row: {
          benchmark_year: number | null
          description: string | null
          id: string | null
          industry: string | null
          name: string | null
          sbti_status: string | null
          sector: string | null
          total_emissions: number | null
        }
        Relationships: []
      }
    }
    Functions: {
      bulk_insert_companies: {
        Args: { company_data: Json }
        Returns: Json
      }
      check_rate_limit: {
        Args: { user_uuid: string; operation_type: string }
        Returns: boolean
      }
      detect_suspicious_activity: {
        Args: Record<PropertyKey, never>
        Returns: {
          user_id: string
          activity_count: number
          distinct_companies: number
          risk_level: string
        }[]
      }
      get_user_role: {
        Args: { user_uuid: string }
        Returns: string
      }
      test_view_security: {
        Args: Record<PropertyKey, never>
        Returns: {
          test_name: string
          result: string
          details: string
        }[]
      }
      user_has_company_access: {
        Args: { user_uuid: string; company_text: string }
        Returns: boolean
      }
      user_has_company_access_level: {
        Args: {
          user_uuid: string
          company_text: string
          required_level: string
        }
        Returns: boolean
      }
      user_is_company_admin: {
        Args: { user_uuid: string; company_text: string }
        Returns: boolean
      }
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
