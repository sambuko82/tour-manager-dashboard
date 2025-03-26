
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
  customerID: number
  tourPackage: string
  startDate: string
  endDate: string
  numberOfParticipants: number
  pickupInfo: string
  dropoffInfo: string
  tShirtSize: string
  accommodationStatus: AccommodationStatus
  resourceStatus: ResourceStatus
  customer?: Customer
}

export interface Accommodation {
  id: number
  bookingID: number
  day: number
  hotel: string
  roomType: string
  checkInDate: string
  checkOutDate: string
  notes: string
}

export interface Resource {
  id: number
  bookingID: number
  guideID: number
  driverID: number
  vehicleID: number
  guideName: string
  driverName: string
  vehicleInfo: string
  assignedDate: string
}

export interface Financial {
  id: number
  bookingID: number
  invoiceNumber: string
  paymentStatus: PaymentStatus
  paymentMethod: PaymentMethod
  costTotal: number
  depositPaid: number
  depositPaymentDate: string
  depositPaymentMethod: PaymentMethod
  balanceDue: number
  balancePaymentMethod: PaymentMethod
  expenses: number
  netProfit: number
  depositInvoiceNumber: string
  depositReceiptURL: string
  balanceInvoiceNumber: string
  balanceInvoiceURL: string
  expensesDetailsURL: string
  daysToTour: number
  finalPaymentDeadline: string
  lastMinuteBooking: boolean
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
