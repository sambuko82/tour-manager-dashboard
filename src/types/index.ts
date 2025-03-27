
export type PaymentStatus = "Paid" | "Partial" | "Overdue" | "None"
export type ResourceStatus = "Confirmed" | "Pending" | "Not Confirmed"
export type AccommodationStatus = "Confirmed" | "Pending" | "Not Confirmed"
export type PaymentMethod = "Credit Card" | "Bank Transfer" | "Cash" | "None"

export interface Customer {
  id: number
  name: string
  country: string
  contact: string
  email: string
}

export interface Booking {
  id: number
  customer_id: number
  tour_package: string
  start_date: string
  end_date: string
  number_of_participants: number
  pickup_info: string
  dropoff_info: string
  t_shirt_size: string
  accommodation_status: AccommodationStatus
  resource_status: ResourceStatus
  customer?: Customer
}

export interface Accommodation {
  id: number
  booking_id: number
  day: number
  hotel: string
  room_type: string
  check_in_date: string
  check_out_date: string
  notes: string
}

export interface Resource {
  id: number
  booking_id: number
  guide_id: number
  driver_id: number
  vehicle_id: number
  guide_name: string
  driver_name: string
  vehicle_info: string
  assigned_date: string
}

export interface Financial {
  id: number
  booking_id: number
  invoice_number: string
  payment_status: PaymentStatus
  payment_method: PaymentMethod
  cost_total: number
  deposit_invoice_number: string
  deposit_amount: number
  deposit_payment_date: string
  deposit_payment_method: PaymentMethod
  deposit_receipt_url: string
  balance_due: number
  balance_invoice_number: string
  balance_payment_method: PaymentMethod
  balance_invoice_url: string
  expenses: number
  expenses_details_url: string
  net_profit: number
  days_to_tour: number
  final_payment_deadline: string
  last_minute_booking: boolean
}

export interface BookingWithDetails extends Booking {
  financial?: Financial
  accommodations?: Accommodation[]
  resources?: Resource[]
}

export interface User {
  id: number
  username: string
  role: "admin" | "staff"
}
