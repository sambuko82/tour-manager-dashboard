
import { Booking, BookingWithDetails, Customer, Financial, Accommodation, Resource } from "../types";

// Generate mock customers
export const customers: Customer[] = [
  {
    id: 1,
    name: "John Smith",
    country: "United States",
    contact: "+1 555-123-4567",
    email: "john.smith@example.com"
  },
  {
    id: 2,
    name: "Emma Johnson",
    country: "United Kingdom",
    contact: "+44 20 1234 5678",
    email: "emma.johnson@example.com"
  },
  {
    id: 3,
    name: "Carlos Rodriguez",
    country: "Spain",
    contact: "+34 612 345 678",
    email: "carlos.rodriguez@example.com"
  },
  {
    id: 4,
    name: "Sophie Dupont",
    country: "France",
    contact: "+33 6 12 34 56 78",
    email: "sophie.dupont@example.com"
  },
  {
    id: 5,
    name: "Hiroshi Tanaka",
    country: "Japan",
    contact: "+81 90 1234 5678",
    email: "hiroshi.tanaka@example.com"
  }
];

// Generate mock bookings
export const bookings: Booking[] = [
  {
    id: 101,
    customer_id: 1,
    tour_package: "Bali Adventure",
    start_date: "2025-08-10",
    end_date: "2025-08-15",
    number_of_participants: 4,
    pickup_info: "Airport, 10:00 AM",
    dropoff_info: "Hotel, 4:00 PM",
    t_shirt_size: "M",
    accommodation_status: "Confirmed",
    resource_status: "Confirmed"
  },
  {
    id: 102,
    customer_id: 2,
    tour_package: "Tokyo Explorer",
    start_date: "2025-07-20",
    end_date: "2025-07-28",
    number_of_participants: 2,
    pickup_info: "Hotel, 9:00 AM",
    dropoff_info: "Airport, 6:00 PM",
    t_shirt_size: "L",
    accommodation_status: "Confirmed",
    resource_status: "Confirmed"
  },
  {
    id: 103,
    customer_id: 3,
    tour_package: "Barcelona Weekend",
    start_date: "2025-06-05",
    end_date: "2025-06-07",
    number_of_participants: 6,
    pickup_info: "Central Station, 11:00 AM",
    dropoff_info: "Airport, 3:00 PM",
    t_shirt_size: "S",
    accommodation_status: "Pending",
    resource_status: "Pending"
  },
  {
    id: 104,
    customer_id: 4,
    tour_package: "Paris Highlights",
    start_date: "2025-09-15",
    end_date: "2025-09-20",
    number_of_participants: 2,
    pickup_info: "Eiffel Tower, 10:00 AM",
    dropoff_info: "Charles de Gaulle Airport, 5:00 PM",
    t_shirt_size: "M",
    accommodation_status: "Not Confirmed",
    resource_status: "Not Confirmed"
  },
  {
    id: 105,
    customer_id: 5,
    tour_package: "Kyoto Traditional",
    start_date: "2025-11-01",
    end_date: "2025-11-07",
    number_of_participants: 3,
    pickup_info: "Kyoto Station, 9:30 AM",
    dropoff_info: "Ryokan, 4:00 PM",
    t_shirt_size: "M",
    accommodation_status: "Confirmed",
    resource_status: "Confirmed"
  }
];

// Generate mock financials
export const financials: Financial[] = [
  {
    id: 501,
    booking_id: 101,
    invoice_number: "INV-2025-001",
    payment_status: "Partial",
    payment_method: "Bank Transfer",
    cost_total: 2000,
    deposit_invoice_number: "DPT-001",
    deposit_amount: 400,
    deposit_payment_date: "2025-03-01",
    deposit_payment_method: "Credit Card",
    deposit_receipt_url: "https://mytourapp.com/receipts/dpt-001",
    balance_due: 1600,
    balance_invoice_number: "BAL-001",
    balance_payment_method: "Bank Transfer",
    balance_invoice_url: "https://mytourapp.com/invoices/bal-001",
    expenses: 500,
    expenses_details_url: "https://mytourapp.com/expenses/101",
    net_profit: 1100,
    days_to_tour: 70,
    final_payment_deadline: "2025-08-05",
    last_minute_booking: false
  },
  {
    id: 502,
    booking_id: 102,
    invoice_number: "INV-2025-002",
    payment_status: "Paid",
    payment_method: "Credit Card",
    cost_total: 1800,
    deposit_invoice_number: "DPT-002",
    deposit_amount: 1800,
    deposit_payment_date: "2025-02-15",
    deposit_payment_method: "Credit Card",
    deposit_receipt_url: "https://mytourapp.com/receipts/dpt-002",
    balance_due: 0,
    balance_invoice_number: "",
    balance_payment_method: "None",
    balance_invoice_url: "",
    expenses: 600,
    expenses_details_url: "https://mytourapp.com/expenses/102",
    net_profit: 1200,
    days_to_tour: 50,
    final_payment_deadline: "2025-07-15",
    last_minute_booking: false
  },
  {
    id: 503,
    booking_id: 103,
    invoice_number: "INV-2025-003",
    payment_status: "Overdue",
    payment_method: "Bank Transfer",
    cost_total: 1500,
    deposit_invoice_number: "DPT-003",
    deposit_amount: 200,
    deposit_payment_date: "2025-04-10",
    deposit_payment_method: "Bank Transfer",
    deposit_receipt_url: "https://mytourapp.com/receipts/dpt-003",
    balance_due: 1300,
    balance_invoice_number: "BAL-003",
    balance_payment_method: "Bank Transfer",
    balance_invoice_url: "https://mytourapp.com/invoices/bal-003",
    expenses: 400,
    expenses_details_url: "https://mytourapp.com/expenses/103",
    net_profit: 900,
    days_to_tour: 5,
    final_payment_deadline: "2025-05-15",
    last_minute_booking: false
  },
  {
    id: 504,
    booking_id: 104,
    invoice_number: "INV-2025-004",
    payment_status: "None",
    payment_method: "None",
    cost_total: 2200,
    deposit_invoice_number: "",
    deposit_amount: 0,
    deposit_payment_date: "",
    deposit_payment_method: "None",
    deposit_receipt_url: "",
    balance_due: 2200,
    balance_invoice_number: "",
    balance_payment_method: "None",
    balance_invoice_url: "",
    expenses: 700,
    expenses_details_url: "https://mytourapp.com/expenses/104",
    net_profit: 1500,
    days_to_tour: 120,
    final_payment_deadline: "2025-09-10",
    last_minute_booking: false
  },
  {
    id: 505,
    booking_id: 105,
    invoice_number: "INV-2025-005",
    payment_status: "Partial",
    payment_method: "Credit Card",
    cost_total: 2500,
    deposit_invoice_number: "DPT-005",
    deposit_amount: 500,
    deposit_payment_date: "2025-05-05",
    deposit_payment_method: "Credit Card",
    deposit_receipt_url: "https://mytourapp.com/receipts/dpt-005",
    balance_due: 2000,
    balance_invoice_number: "BAL-005",
    balance_payment_method: "Credit Card",
    balance_invoice_url: "https://mytourapp.com/invoices/bal-005",
    expenses: 800,
    expenses_details_url: "https://mytourapp.com/expenses/105",
    net_profit: 1700,
    days_to_tour: 180,
    final_payment_deadline: "2025-10-27",
    last_minute_booking: false
  }
];

// Generate mock accommodations
export const accommodations: Accommodation[] = [
  // Accommodations for booking 101
  {
    id: 1001,
    booking_id: 101,
    day: 1,
    hotel: "Bali Beach Resort",
    room_type: "Deluxe Ocean View",
    check_in_date: "2025-08-10",
    check_out_date: "2025-08-12",
    notes: "Early check-in requested"
  },
  {
    id: 1002,
    booking_id: 101,
    day: 3,
    hotel: "Ubud Jungle Retreat",
    room_type: "Villa with Pool",
    check_in_date: "2025-08-12",
    check_out_date: "2025-08-15",
    notes: "Dietary restrictions: vegetarian meals"
  },
  
  // Accommodations for booking 102
  {
    id: 1003,
    booking_id: 102,
    day: 1,
    hotel: "Tokyo Sky Hotel",
    room_type: "Executive Suite",
    check_in_date: "2025-07-20",
    check_out_date: "2025-07-24",
    notes: ""
  },
  {
    id: 1004,
    booking_id: 102,
    day: 5,
    hotel: "Kyoto Traditional Ryokan",
    room_type: "Traditional Room",
    check_in_date: "2025-07-24",
    check_out_date: "2025-07-28",
    notes: "Traditional breakfast included"
  },
  
  // Accommodations for booking 103
  {
    id: 1005,
    booking_id: 103,
    day: 1,
    hotel: "Barcelona Beachfront Hotel",
    room_type: "Family Room",
    check_in_date: "2025-06-05",
    check_out_date: "2025-06-07",
    notes: "Late checkout requested"
  },
  
  // Accommodations for booking 104
  {
    id: 1006,
    booking_id: 104,
    day: 1,
    hotel: "Paris Luxury Hotel",
    room_type: "Eiffel Tower View",
    check_in_date: "2025-09-15",
    check_out_date: "2025-09-18",
    notes: "Honeymoon decoration"
  },
  {
    id: 1007,
    booking_id: 104,
    day: 4,
    hotel: "Loire Valley Chateau",
    room_type: "Deluxe Room",
    check_in_date: "2025-09-18",
    check_out_date: "2025-09-20",
    notes: "Wine tour booked"
  },
  
  // Accommodations for booking 105
  {
    id: 1008,
    booking_id: 105,
    day: 1,
    hotel: "Kyoto Imperial Hotel",
    room_type: "Japanese Suite",
    check_in_date: "2025-11-01",
    check_out_date: "2025-11-04",
    notes: ""
  },
  {
    id: 1009,
    booking_id: 105,
    day: 4,
    hotel: "Osaka Modern Hotel",
    room_type: "City View Room",
    check_in_date: "2025-11-04",
    check_out_date: "2025-11-07",
    notes: "Airport transfer arranged"
  }
];

// Generate mock resources
export const resources: Resource[] = [
  {
    id: 2001,
    booking_id: 101,
    guide_id: 1,
    driver_id: 11,
    vehicle_id: 101,
    guide_name: "Maya Wijaya",
    driver_name: "Putu Surya",
    vehicle_info: "Toyota Innova SUV",
    assigned_date: "2025-08-10"
  },
  {
    id: 2002,
    booking_id: 102,
    guide_id: 2,
    driver_id: 12,
    vehicle_id: 102,
    guide_name: "Hiroshi Yamamoto",
    driver_name: "Takashi Sato",
    vehicle_info: "Toyota Alphard",
    assigned_date: "2025-07-20"
  },
  {
    id: 2003,
    booking_id: 103,
    guide_id: 3,
    driver_id: 13,
    vehicle_id: 103,
    guide_name: "Elena Garcia",
    driver_name: "Miguel Rodriguez",
    vehicle_info: "Mercedes Sprinter Van",
    assigned_date: "2025-06-05"
  },
  {
    id: 2004,
    booking_id: 104,
    guide_id: 4,
    driver_id: 14,
    vehicle_id: 104,
    guide_name: "Pierre Dubois",
    driver_name: "Jean Dupont",
    vehicle_info: "Peugeot 5008",
    assigned_date: "2025-09-15"
  },
  {
    id: 2005,
    booking_id: 105,
    guide_id: 5,
    driver_id: 15,
    vehicle_id: 105,
    guide_name: "Akiko Suzuki",
    driver_name: "Kenji Nakamura",
    vehicle_info: "Toyota Hiace",
    assigned_date: "2025-11-01"
  }
];

// Combine all data to create bookings with details
export const getBookingsWithDetails = (): BookingWithDetails[] => {
  return bookings.map(booking => {
    const customer = customers.find(c => c.id === booking.customer_id);
    const financial = financials.find(f => f.booking_id === booking.id);
    const bookingAccommodations = accommodations.filter(a => a.booking_id === booking.id);
    const bookingResources = resources.filter(r => r.booking_id === booking.id);

    return {
      ...booking,
      customer,
      financial,
      accommodations: bookingAccommodations,
      resources: bookingResources
    };
  });
};
