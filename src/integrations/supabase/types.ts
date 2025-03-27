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
      accommodations: {
        Row: {
          booking_id: number | null
          check_in_date: string
          check_out_date: string
          created_at: string | null
          day: number
          hotel: string
          id: number
          notes: string | null
          room_type: string | null
        }
        Insert: {
          booking_id?: number | null
          check_in_date: string
          check_out_date: string
          created_at?: string | null
          day: number
          hotel: string
          id?: number
          notes?: string | null
          room_type?: string | null
        }
        Update: {
          booking_id?: number | null
          check_in_date?: string
          check_out_date?: string
          created_at?: string | null
          day?: number
          hotel?: string
          id?: number
          notes?: string | null
          room_type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "accommodations_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
        ]
      }
      bookings: {
        Row: {
          accommodation_status: string | null
          created_at: string | null
          customer_id: number
          dropoff_info: string | null
          end_date: string
          id: number
          number_of_participants: number
          pickup_info: string | null
          resource_status: string | null
          start_date: string
          t_shirt_size: string | null
          tour_package: string
        }
        Insert: {
          accommodation_status?: string | null
          created_at?: string | null
          customer_id: number
          dropoff_info?: string | null
          end_date: string
          id?: number
          number_of_participants: number
          pickup_info?: string | null
          resource_status?: string | null
          start_date: string
          t_shirt_size?: string | null
          tour_package: string
        }
        Update: {
          accommodation_status?: string | null
          created_at?: string | null
          customer_id?: number
          dropoff_info?: string | null
          end_date?: string
          id?: number
          number_of_participants?: number
          pickup_info?: string | null
          resource_status?: string | null
          start_date?: string
          t_shirt_size?: string | null
          tour_package?: string
        }
        Relationships: []
      }
      customers: {
        Row: {
          contact: string | null
          country: string | null
          created_at: string | null
          email: string | null
          id: number
          name: string
        }
        Insert: {
          contact?: string | null
          country?: string | null
          created_at?: string | null
          email?: string | null
          id?: number
          name: string
        }
        Update: {
          contact?: string | null
          country?: string | null
          created_at?: string | null
          email?: string | null
          id?: number
          name?: string
        }
        Relationships: []
      }
      financials: {
        Row: {
          balance_due: number | null
          balance_invoice_number: string | null
          balance_invoice_url: string | null
          balance_payment_method: string | null
          booking_id: number | null
          cost_total: number
          created_at: string | null
          days_to_tour: number | null
          deposit_amount: number | null
          deposit_invoice_number: string | null
          deposit_payment_date: string | null
          deposit_payment_method: string | null
          deposit_receipt_url: string | null
          expenses: number | null
          expenses_details_url: string | null
          final_payment_deadline: string | null
          id: number
          invoice_number: string | null
          last_minute_booking: boolean | null
          net_profit: number | null
          payment_method: string | null
          payment_status: string | null
        }
        Insert: {
          balance_due?: number | null
          balance_invoice_number?: string | null
          balance_invoice_url?: string | null
          balance_payment_method?: string | null
          booking_id?: number | null
          cost_total: number
          created_at?: string | null
          days_to_tour?: number | null
          deposit_amount?: number | null
          deposit_invoice_number?: string | null
          deposit_payment_date?: string | null
          deposit_payment_method?: string | null
          deposit_receipt_url?: string | null
          expenses?: number | null
          expenses_details_url?: string | null
          final_payment_deadline?: string | null
          id?: number
          invoice_number?: string | null
          last_minute_booking?: boolean | null
          net_profit?: number | null
          payment_method?: string | null
          payment_status?: string | null
        }
        Update: {
          balance_due?: number | null
          balance_invoice_number?: string | null
          balance_invoice_url?: string | null
          balance_payment_method?: string | null
          booking_id?: number | null
          cost_total?: number
          created_at?: string | null
          days_to_tour?: number | null
          deposit_amount?: number | null
          deposit_invoice_number?: string | null
          deposit_payment_date?: string | null
          deposit_payment_method?: string | null
          deposit_receipt_url?: string | null
          expenses?: number | null
          expenses_details_url?: string | null
          final_payment_deadline?: string | null
          id?: number
          invoice_number?: string | null
          last_minute_booking?: boolean | null
          net_profit?: number | null
          payment_method?: string | null
          payment_status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "financials_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
        ]
      }
      participants: {
        Row: {
          created_at: string
          dietary_restrictions: string | null
          flight_number: string | null
          full_name: string | null
          gender: string | null
          id: number
          passport_number: string | null
          title: string | null
          tshirt_size: string | null
        }
        Insert: {
          created_at?: string
          dietary_restrictions?: string | null
          flight_number?: string | null
          full_name?: string | null
          gender?: string | null
          id?: number
          passport_number?: string | null
          title?: string | null
          tshirt_size?: string | null
        }
        Update: {
          created_at?: string
          dietary_restrictions?: string | null
          flight_number?: string | null
          full_name?: string | null
          gender?: string | null
          id?: number
          passport_number?: string | null
          title?: string | null
          tshirt_size?: string | null
        }
        Relationships: []
      }
      resources: {
        Row: {
          assigned_date: string
          booking_id: number | null
          created_at: string | null
          driver_id: number | null
          driver_name: string | null
          guide_id: number | null
          guide_name: string | null
          id: number
          vehicle_id: number | null
          vehicle_info: string | null
        }
        Insert: {
          assigned_date: string
          booking_id?: number | null
          created_at?: string | null
          driver_id?: number | null
          driver_name?: string | null
          guide_id?: number | null
          guide_name?: string | null
          id?: number
          vehicle_id?: number | null
          vehicle_info?: string | null
        }
        Update: {
          assigned_date?: string
          booking_id?: number | null
          created_at?: string | null
          driver_id?: number | null
          driver_name?: string | null
          guide_id?: number | null
          guide_name?: string | null
          id?: number
          vehicle_id?: number | null
          vehicle_info?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "resources_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
        ]
      }
      room_arrangements: {
        Row: {
          created_at: string | null
          id: number
          participant_id: number | null
          room_number: number
        }
        Insert: {
          created_at?: string | null
          id?: number
          participant_id?: number | null
          room_number: number
        }
        Update: {
          created_at?: string | null
          id?: number
          participant_id?: number | null
          room_number?: number
        }
        Relationships: [
          {
            foreignKeyName: "room_arrangements_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: true
            referencedRelation: "participants"
            referencedColumns: ["id"]
          },
        ]
      }
      transport_arrangements: {
        Row: {
          bus_number: string
          created_at: string | null
          id: number
          participant_id: number | null
          seat_number: number
        }
        Insert: {
          bus_number: string
          created_at?: string | null
          id?: number
          participant_id?: number | null
          seat_number: number
        }
        Update: {
          bus_number?: string
          created_at?: string | null
          id?: number
          participant_id?: number | null
          seat_number?: number
        }
        Relationships: [
          {
            foreignKeyName: "transport_arrangements_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: true
            referencedRelation: "participants"
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
      [_ in never]: never
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

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
