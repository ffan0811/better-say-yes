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
      contents: {
        Row: {
          after_yes_button_link: string | null
          after_yes_button_text: string | null
          after_yes_description: string | null
          after_yes_title: string | null
          alert_after_yes: string | null
          background_color: string | null
          created_at: string
          font_family: string | null
          id: string
          name: string | null
          question: string | null
          secret_code: string | null
          status: Database["public"]["Enums"]["status_content"]
          theme_color: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          after_yes_button_link?: string | null
          after_yes_button_text?: string | null
          after_yes_description?: string | null
          after_yes_title?: string | null
          alert_after_yes?: string | null
          background_color?: string | null
          created_at?: string
          font_family?: string | null
          id?: string
          name?: string | null
          question?: string | null
          secret_code?: string | null
          status?: Database["public"]["Enums"]["status_content"]
          theme_color?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          after_yes_button_link?: string | null
          after_yes_button_text?: string | null
          after_yes_description?: string | null
          after_yes_title?: string | null
          alert_after_yes?: string | null
          background_color?: string | null
          created_at?: string
          font_family?: string | null
          id?: string
          name?: string | null
          question?: string | null
          secret_code?: string | null
          status?: Database["public"]["Enums"]["status_content"]
          theme_color?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "contents_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      payments: {
        Row: {
          amount: number
          created_at: string
          currency: Database["public"]["Enums"]["currencies"]
          id: string
          stripe_id: string
        }
        Insert: {
          amount: number
          created_at?: string
          currency?: Database["public"]["Enums"]["currencies"]
          id?: string
          stripe_id: string
        }
        Update: {
          amount?: number
          created_at?: string
          currency?: Database["public"]["Enums"]["currencies"]
          id?: string
          stripe_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          id: string
          is_email_subscribed: boolean | null
          updated_at: string | null
          username: string | null
        }
        Insert: {
          id: string
          is_email_subscribed?: boolean | null
          updated_at?: string | null
          username?: string | null
        }
        Update: {
          id?: string
          is_email_subscribed?: boolean | null
          updated_at?: string | null
          username?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      templates: {
        Row: {
          after_yes_button_link: string | null
          after_yes_button_text: string | null
          after_yes_description: string | null
          after_yes_title: string | null
          alert_after_yes: string | null
          background_color: string | null
          created_at: string
          font_family: string | null
          id: string
          name: string | null
          question: string | null
          secret_code: string | null
          status: Database["public"]["Enums"]["status_content"]
          theme_color: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          after_yes_button_link?: string | null
          after_yes_button_text?: string | null
          after_yes_description?: string | null
          after_yes_title?: string | null
          alert_after_yes?: string | null
          background_color?: string | null
          created_at?: string
          font_family?: string | null
          id?: string
          name?: string | null
          question?: string | null
          secret_code?: string | null
          status?: Database["public"]["Enums"]["status_content"]
          theme_color?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          after_yes_button_link?: string | null
          after_yes_button_text?: string | null
          after_yes_description?: string | null
          after_yes_title?: string | null
          alert_after_yes?: string | null
          background_color?: string | null
          created_at?: string
          font_family?: string | null
          id?: string
          name?: string | null
          question?: string | null
          secret_code?: string | null
          status?: Database["public"]["Enums"]["status_content"]
          theme_color?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "templates_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      content_status:
        | "draft"
        | "pending"
        | "blocked"
        | "active"
        | "inactive"
        | "."
      currencies: "$"
      status_content: "in_progress" | "pending" | "blocked" | "active"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
