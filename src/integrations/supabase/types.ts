export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      application_processes: {
        Row: {
          created_at: string
          description: string | null
          form_schema: Json
          id: string
          is_active: boolean
          job_id: string | null
          name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          form_schema?: Json
          id?: string
          is_active?: boolean
          job_id?: string | null
          name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          form_schema?: Json
          id?: string
          is_active?: boolean
          job_id?: string | null
          name?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "application_processes_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "jobs"
            referencedColumns: ["id"]
          },
        ]
      }
      client_shipments: {
        Row: {
          description: string | null
          destination: string
          eta: string | null
          id: string
          last_update: string | null
          origin: string
          status: string
          tracking_number: string
          user_id: string
        }
        Insert: {
          description?: string | null
          destination: string
          eta?: string | null
          id?: string
          last_update?: string | null
          origin: string
          status?: string
          tracking_number: string
          user_id: string
        }
        Update: {
          description?: string | null
          destination?: string
          eta?: string | null
          id?: string
          last_update?: string | null
          origin?: string
          status?: string
          tracking_number?: string
          user_id?: string
        }
        Relationships: []
      }
      crm_activities: {
        Row: {
          activity_type: string
          assigned_to: string | null
          completed_at: string | null
          contact_id: string | null
          created_at: string
          description: string | null
          due_date: string | null
          id: string
          lead_id: string | null
          opportunity_id: string | null
          priority: string | null
          status: string
          subject: string
          updated_at: string
        }
        Insert: {
          activity_type: string
          assigned_to?: string | null
          completed_at?: string | null
          contact_id?: string | null
          created_at?: string
          description?: string | null
          due_date?: string | null
          id?: string
          lead_id?: string | null
          opportunity_id?: string | null
          priority?: string | null
          status?: string
          subject: string
          updated_at?: string
        }
        Update: {
          activity_type?: string
          assigned_to?: string | null
          completed_at?: string | null
          contact_id?: string | null
          created_at?: string
          description?: string | null
          due_date?: string | null
          id?: string
          lead_id?: string | null
          opportunity_id?: string | null
          priority?: string | null
          status?: string
          subject?: string
          updated_at?: string
        }
        Relationships: []
      }
      crm_contacts: {
        Row: {
          created_at: string | null
          id: string
          last_contacted: string | null
          name: string
          phone: string | null
          status: string | null
          tags: string[] | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          last_contacted?: string | null
          name: string
          phone?: string | null
          status?: string | null
          tags?: string[] | null
        }
        Update: {
          created_at?: string | null
          id?: string
          last_contacted?: string | null
          name?: string
          phone?: string | null
          status?: string | null
          tags?: string[] | null
        }
        Relationships: []
      }
      crm_leads: {
        Row: {
          assigned_to: string | null
          created_at: string | null
          email: string | null
          id: string
          name: string
          source: string | null
          status: string | null
        }
        Insert: {
          assigned_to?: string | null
          created_at?: string | null
          email?: string | null
          id?: string
          name: string
          source?: string | null
          status?: string | null
        }
        Update: {
          assigned_to?: string | null
          created_at?: string | null
          email?: string | null
          id?: string
          name?: string
          source?: string | null
          status?: string | null
        }
        Relationships: []
      }
      crm_opportunities: {
        Row: {
          close_date: string | null
          contact_id: string | null
          created_at: string | null
          id: string
          name: string
          stage: string | null
          value: number | null
        }
        Insert: {
          close_date?: string | null
          contact_id?: string | null
          created_at?: string | null
          id?: string
          name: string
          stage?: string | null
          value?: number | null
        }
        Update: {
          close_date?: string | null
          contact_id?: string | null
          created_at?: string | null
          id?: string
          name?: string
          stage?: string | null
          value?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "crm_opportunities_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "crm_contacts"
            referencedColumns: ["id"]
          },
        ]
      }
      cta_forms: {
        Row: {
          button_text: string
          created_at: string
          description: string | null
          form_fields: Json
          id: string
          is_active: boolean
          redirect_url: string | null
          success_message: string | null
          title: string
          updated_at: string
        }
        Insert: {
          button_text?: string
          created_at?: string
          description?: string | null
          form_fields?: Json
          id?: string
          is_active?: boolean
          redirect_url?: string | null
          success_message?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          button_text?: string
          created_at?: string
          description?: string | null
          form_fields?: Json
          id?: string
          is_active?: boolean
          redirect_url?: string | null
          success_message?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      departments: {
        Row: {
          budget: number | null
          created_at: string
          description: string | null
          id: string
          manager_id: string | null
          name: string
          updated_at: string
        }
        Insert: {
          budget?: number | null
          created_at?: string
          description?: string | null
          id?: string
          manager_id?: string | null
          name: string
          updated_at?: string
        }
        Update: {
          budget?: number | null
          created_at?: string
          description?: string | null
          id?: string
          manager_id?: string | null
          name?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_departments_manager"
            columns: ["manager_id"]
            isOneToOne: false
            referencedRelation: "team_members"
            referencedColumns: ["id"]
          },
        ]
      }
      feature_toggles: {
        Row: {
          category: string | null
          created_at: string
          dependencies: string[] | null
          description: string | null
          feature_key: string
          id: string
          is_enabled: boolean
          priority: number | null
          updated_at: string
        }
        Insert: {
          category?: string | null
          created_at?: string
          dependencies?: string[] | null
          description?: string | null
          feature_key: string
          id?: string
          is_enabled?: boolean
          priority?: number | null
          updated_at?: string
        }
        Update: {
          category?: string | null
          created_at?: string
          dependencies?: string[] | null
          description?: string | null
          feature_key?: string
          id?: string
          is_enabled?: boolean
          priority?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      form_submissions: {
        Row: {
          created_at: string
          data: Json
          form_id: string
          form_type: string
          id: string
          ip_address: string | null
          user_agent: string | null
        }
        Insert: {
          created_at?: string
          data: Json
          form_id: string
          form_type?: string
          id?: string
          ip_address?: string | null
          user_agent?: string | null
        }
        Update: {
          created_at?: string
          data?: Json
          form_id?: string
          form_type?: string
          id?: string
          ip_address?: string | null
          user_agent?: string | null
        }
        Relationships: []
      }
      header_settings: {
        Row: {
          created_at: string
          favicon_url: string | null
          id: string
          logo_url: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          favicon_url?: string | null
          id?: string
          logo_url?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          favicon_url?: string | null
          id?: string
          logo_url?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      job_applications: {
        Row: {
          additional_info: string | null
          applicant_email: string
          applicant_name: string
          applicant_phone: string | null
          availability_date: string | null
          cover_letter: string | null
          created_at: string
          current_company: string | null
          current_position: string | null
          experience_years: number | null
          id: string
          job_id: string
          linkedin_url: string | null
          notes: string | null
          portfolio_url: string | null
          resume_url: string | null
          reviewed_at: string | null
          reviewed_by: string | null
          salary_expectation: string | null
          status: string
          updated_at: string
        }
        Insert: {
          additional_info?: string | null
          applicant_email: string
          applicant_name: string
          applicant_phone?: string | null
          availability_date?: string | null
          cover_letter?: string | null
          created_at?: string
          current_company?: string | null
          current_position?: string | null
          experience_years?: number | null
          id?: string
          job_id: string
          linkedin_url?: string | null
          notes?: string | null
          portfolio_url?: string | null
          resume_url?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          salary_expectation?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          additional_info?: string | null
          applicant_email?: string
          applicant_name?: string
          applicant_phone?: string | null
          availability_date?: string | null
          cover_letter?: string | null
          created_at?: string
          current_company?: string | null
          current_position?: string | null
          experience_years?: number | null
          id?: string
          job_id?: string
          linkedin_url?: string | null
          notes?: string | null
          portfolio_url?: string | null
          resume_url?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          salary_expectation?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "job_applications_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "jobs"
            referencedColumns: ["id"]
          },
        ]
      }
      jobs: {
        Row: {
          application_deadline: string | null
          benefits: string[] | null
          category: string
          created_at: string
          department: string
          description: string
          employment_type: string
          experience_level: string
          id: string
          is_active: boolean
          location: string
          posted_by: string | null
          requirements: string[]
          responsibilities: string[]
          salary_range: string | null
          title: string
          updated_at: string
        }
        Insert: {
          application_deadline?: string | null
          benefits?: string[] | null
          category?: string
          created_at?: string
          department: string
          description: string
          employment_type?: string
          experience_level?: string
          id?: string
          is_active?: boolean
          location: string
          posted_by?: string | null
          requirements?: string[]
          responsibilities?: string[]
          salary_range?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          application_deadline?: string | null
          benefits?: string[] | null
          category?: string
          created_at?: string
          department?: string
          description?: string
          employment_type?: string
          experience_level?: string
          id?: string
          is_active?: boolean
          location?: string
          posted_by?: string | null
          requirements?: string[]
          responsibilities?: string[]
          salary_range?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      leave_requests: {
        Row: {
          approved_at: string | null
          approved_by: string | null
          created_at: string
          days_requested: number
          employee_id: string
          end_date: string
          id: string
          leave_type: string
          reason: string | null
          start_date: string
          status: string
          updated_at: string
        }
        Insert: {
          approved_at?: string | null
          approved_by?: string | null
          created_at?: string
          days_requested: number
          employee_id: string
          end_date: string
          id?: string
          leave_type: string
          reason?: string | null
          start_date: string
          status?: string
          updated_at?: string
        }
        Update: {
          approved_at?: string | null
          approved_by?: string | null
          created_at?: string
          days_requested?: number
          employee_id?: string
          end_date?: string
          id?: string
          leave_type?: string
          reason?: string | null
          start_date?: string
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      media_items: {
        Row: {
          alt: string | null
          created_at: string | null
          id: string
          name: string
          url: string
        }
        Insert: {
          alt?: string | null
          created_at?: string | null
          id?: string
          name: string
          url: string
        }
        Update: {
          alt?: string | null
          created_at?: string | null
          id?: string
          name?: string
          url?: string
        }
        Relationships: []
      }
      page_content: {
        Row: {
          content: Json | null
          key: string
          updated_at: string | null
        }
        Insert: {
          content?: Json | null
          key: string
          updated_at?: string | null
        }
        Update: {
          content?: Json | null
          key?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      performance_reviews: {
        Row: {
          areas_for_improvement: string | null
          comments: string | null
          created_at: string
          employee_id: string
          goals_achievement: string | null
          id: string
          overall_rating: number | null
          review_period_end: string
          review_period_start: string
          reviewer_id: string
          status: string
          strengths: string | null
          updated_at: string
        }
        Insert: {
          areas_for_improvement?: string | null
          comments?: string | null
          created_at?: string
          employee_id: string
          goals_achievement?: string | null
          id?: string
          overall_rating?: number | null
          review_period_end: string
          review_period_start: string
          reviewer_id: string
          status?: string
          strengths?: string | null
          updated_at?: string
        }
        Update: {
          areas_for_improvement?: string | null
          comments?: string | null
          created_at?: string
          employee_id?: string
          goals_achievement?: string | null
          id?: string
          overall_rating?: number | null
          review_period_end?: string
          review_period_start?: string
          reviewer_id?: string
          status?: string
          strengths?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          full_name: string | null
          id: string
          updated_at: string | null
          website: string | null
        }
        Insert: {
          avatar_url?: string | null
          full_name?: string | null
          id: string
          updated_at?: string | null
          website?: string | null
        }
        Update: {
          avatar_url?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string | null
          website?: string | null
        }
        Relationships: []
      }
      resource_configurations: {
        Row: {
          configuration: Json | null
          created_at: string
          id: string
          is_enabled: boolean
          resource_key: string
          updated_at: string
        }
        Insert: {
          configuration?: Json | null
          created_at?: string
          id?: string
          is_enabled?: boolean
          resource_key: string
          updated_at?: string
        }
        Update: {
          configuration?: Json | null
          created_at?: string
          id?: string
          is_enabled?: boolean
          resource_key?: string
          updated_at?: string
        }
        Relationships: []
      }
      sidebars: {
        Row: {
          auto_hide_breakpoint: string | null
          content: string | null
          created_at: string | null
          id: string
          is_floating: boolean | null
          name: string
          position: string
        }
        Insert: {
          auto_hide_breakpoint?: string | null
          content?: string | null
          created_at?: string | null
          id?: string
          is_floating?: boolean | null
          name: string
          position?: string
        }
        Update: {
          auto_hide_breakpoint?: string | null
          content?: string | null
          created_at?: string | null
          id?: string
          is_floating?: boolean | null
          name?: string
          position?: string
        }
        Relationships: []
      }
      site_settings: {
        Row: {
          id: string
          setting_key: string
          setting_value: Json | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          setting_key: string
          setting_value?: Json | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          setting_key?: string
          setting_value?: Json | null
          updated_at?: string | null
        }
        Relationships: []
      }
      tasks: {
        Row: {
          assigned_to: string | null
          created_at: string
          created_by: string | null
          description: string | null
          due_date: string | null
          id: string
          priority: string
          status: string
          title: string
          updated_at: string
        }
        Insert: {
          assigned_to?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          due_date?: string | null
          id?: string
          priority?: string
          status?: string
          title: string
          updated_at?: string
        }
        Update: {
          assigned_to?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          due_date?: string | null
          id?: string
          priority?: string
          status?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      team_chat_messages: {
        Row: {
          attachments: Json | null
          channel_id: string
          created_at: string
          id: string
          message: string
          message_type: string | null
          sender_id: string
        }
        Insert: {
          attachments?: Json | null
          channel_id?: string
          created_at?: string
          id?: string
          message: string
          message_type?: string | null
          sender_id: string
        }
        Update: {
          attachments?: Json | null
          channel_id?: string
          created_at?: string
          id?: string
          message?: string
          message_type?: string | null
          sender_id?: string
        }
        Relationships: []
      }
      team_members: {
        Row: {
          created_at: string
          department: string | null
          hire_date: string | null
          id: string
          is_active: boolean
          manager_id: string | null
          permissions: string[] | null
          role: string
          salary: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          department?: string | null
          hire_date?: string | null
          id?: string
          is_active?: boolean
          manager_id?: string | null
          permissions?: string[] | null
          role: string
          salary?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          department?: string | null
          hire_date?: string | null
          id?: string
          is_active?: boolean
          manager_id?: string | null
          permissions?: string[] | null
          role?: string
          salary?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_team_members_manager"
            columns: ["manager_id"]
            isOneToOne: false
            referencedRelation: "team_members"
            referencedColumns: ["id"]
          },
        ]
      }
      user_role_assignments: {
        Row: {
          assigned_at: string
          assigned_by: string | null
          id: string
          is_active: boolean
          notes: string | null
          role: Database["public"]["Enums"]["app_role"]
          user_id: string | null
        }
        Insert: {
          assigned_at?: string
          assigned_by?: string | null
          id?: string
          is_active?: boolean
          notes?: string | null
          role: Database["public"]["Enums"]["app_role"]
          user_id?: string | null
        }
        Update: {
          assigned_at?: string
          assigned_by?: string | null
          id?: string
          is_active?: boolean
          notes?: string | null
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      whatsapp_contacts: {
        Row: {
          created_at: string
          id: string
          is_blocked: boolean | null
          last_seen: string | null
          name: string
          notes: string | null
          phone_number: string
          profile_picture_url: string | null
          tags: string[] | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_blocked?: boolean | null
          last_seen?: string | null
          name: string
          notes?: string | null
          phone_number: string
          profile_picture_url?: string | null
          tags?: string[] | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          is_blocked?: boolean | null
          last_seen?: string | null
          name?: string
          notes?: string | null
          phone_number?: string
          profile_picture_url?: string | null
          tags?: string[] | null
          updated_at?: string
        }
        Relationships: []
      }
      whatsapp_flows: {
        Row: {
          created_at: string | null
          id: string
          name: string
          steps: Json | null
          trigger: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          name: string
          steps?: Json | null
          trigger?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string
          steps?: Json | null
          trigger?: string | null
        }
        Relationships: []
      }
      whatsapp_messages: {
        Row: {
          contact_id: string
          created_at: string
          id: string
          is_outgoing: boolean
          is_read: boolean | null
          media_url: string | null
          message_text: string | null
          message_type: string | null
          timestamp: string
        }
        Insert: {
          contact_id: string
          created_at?: string
          id?: string
          is_outgoing: boolean
          is_read?: boolean | null
          media_url?: string | null
          message_text?: string | null
          message_type?: string | null
          timestamp?: string
        }
        Update: {
          contact_id?: string
          created_at?: string
          id?: string
          is_outgoing?: boolean
          is_read?: boolean | null
          media_url?: string | null
          message_text?: string | null
          message_type?: string | null
          timestamp?: string
        }
        Relationships: [
          {
            foreignKeyName: "whatsapp_messages_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "whatsapp_contacts"
            referencedColumns: ["id"]
          },
        ]
      }
      whatsapp_settings: {
        Row: {
          id: number
          is_connected: boolean
        }
        Insert: {
          id: number
          is_connected?: boolean
        }
        Update: {
          id?: number
          is_connected?: boolean
        }
        Relationships: []
      }
      whatsapp_templates: {
        Row: {
          content: string | null
          created_at: string | null
          id: string
          name: string
        }
        Insert: {
          content?: string | null
          created_at?: string | null
          id?: string
          name: string
        }
        Update: {
          content?: string | null
          created_at?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: { _role: Database["public"]["Enums"]["app_role"] }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "user"],
    },
  },
} as const
