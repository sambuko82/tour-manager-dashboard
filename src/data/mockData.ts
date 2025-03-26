
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
    customerID: 1,
    tourPackage: "Bali Adventure",
    startDate: "2025-08-10",
    endDate: "2025-08-15",
    numberOfParticipants: 4,
    pickupInfo: "Airport, 10:00 AM",
    dropoffInfo: "Hotel, 4:00 PM",
    tShirtSize: "M",
    accommodationStatus: "Confirmed",
    resourceStatus: "Confirmed"
  },
  {
    id: 102,
    customerID: 2,
    tourPackage: "Tokyo Explorer",
    startDate: "2025-07-20",
    endDate: "2025-07-28",
    numberOfParticipants: 2,
    pickupInfo: "Hotel, 9:00 AM",
    dropoffInfo: "Airport, 6:00 PM",
    tShirtSize: "L",
    accommodationStatus: "Confirmed",
    resourceStatus: "Confirmed"
  },
  {
    id: 103,
    customerID: 3,
    tourPackage: "Barcelona Weekend",
    startDate: "2025-06-05",
    endDate: "2025-06-07",
    numberOfParticipants: 6,
    pickupInfo: "Central Station, 11:00 AM",
    dropoffInfo: "Airport, 3:00 PM",
    tShirtSize: "S",
    accommodationStatus: "Pending",
    resourceStatus: "Pending"
  },
  {
    id: 104,
    customerID: 4,
    tourPackage: "Paris Highlights",
    startDate: "2025-09-15",
    endDate: "2025-09-20",
    numberOfParticipants: 2,
    pickupInfo: "Eiffel Tower, 10:00 AM",
    dropoffInfo: "Charles de Gaulle Airport, 5:00 PM",
    tShirtSize: "M",
    accommodationStatus: "Not Confirmed",
    resourceStatus: "Not Confirmed"
  },
  {
    id: 105,
    customerID: 5,
    tourPackage: "Kyoto Traditional",
    startDate: "2025-11-01",
    endDate: "2025-11-07",
    numberOfParticipants: 3,
    pickupInfo: "Kyoto Station, 9:30 AM",
    dropoffInfo: "Ryokan, 4:00 PM",
    tShirtSize: "M",
    accommodationStatus: "Confirmed",
    resourceStatus: "Confirmed"
  }
];

// Generate mock financials
export const financials: Financial[] = [
  {
    id: 501,
    bookingID: 101,
    invoiceNumber: "INV-2025-001",
    paymentStatus: "Partial",
    paymentMethod: "Bank Transfer",
    costTotal: 2000,
    depositPaid: 400,
    depositPaymentDate: "2025-03-01",
    depositPaymentMethod: "Credit Card",
    balanceDue: 1600,
    balancePaymentMethod: "Bank Transfer",
    expenses: 500,
    netProfit: 1100,
    depositInvoiceNumber: "DPT-001",
    depositReceiptURL: "https://mytourapp.com/receipts/dpt-001",
    balanceInvoiceNumber: "BAL-001",
    balanceInvoiceURL: "https://mytourapp.com/invoices/bal-001",
    expensesDetailsURL: "https://mytourapp.com/expenses/101",
    daysToTour: 70,
    finalPaymentDeadline: "2025-08-05",
    lastMinuteBooking: false
  },
  {
    id: 502,
    bookingID: 102,
    invoiceNumber: "INV-2025-002",
    paymentStatus: "Paid",
    paymentMethod: "Credit Card",
    costTotal: 1800,
    depositPaid: 1800,
    depositPaymentDate: "2025-02-15",
    depositPaymentMethod: "Credit Card",
    balanceDue: 0,
    balancePaymentMethod: "None",
    expenses: 600,
    netProfit: 1200,
    depositInvoiceNumber: "DPT-002",
    depositReceiptURL: "https://mytourapp.com/receipts/dpt-002",
    balanceInvoiceNumber: "",
    balanceInvoiceURL: "",
    expensesDetailsURL: "https://mytourapp.com/expenses/102",
    daysToTour: 50,
    finalPaymentDeadline: "2025-07-15",
    lastMinuteBooking: false
  },
  {
    id: 503,
    bookingID: 103,
    invoiceNumber: "INV-2025-003",
    paymentStatus: "Overdue",
    paymentMethod: "Bank Transfer",
    costTotal: 1500,
    depositPaid: 200,
    depositPaymentDate: "2025-04-10",
    depositPaymentMethod: "Bank Transfer",
    balanceDue: 1300,
    balancePaymentMethod: "Bank Transfer",
    expenses: 400,
    netProfit: 900,
    depositInvoiceNumber: "DPT-003",
    depositReceiptURL: "https://mytourapp.com/receipts/dpt-003",
    balanceInvoiceNumber: "BAL-003",
    balanceInvoiceURL: "https://mytourapp.com/invoices/bal-003",
    expensesDetailsURL: "https://mytourapp.com/expenses/103",
    daysToTour: 5,
    finalPaymentDeadline: "2025-05-15",
    lastMinuteBooking: false
  },
  {
    id: 504,
    bookingID: 104,
    invoiceNumber: "INV-2025-004",
    paymentStatus: "None",
    paymentMethod: "None",
    costTotal: 2200,
    depositPaid: 0,
    depositPaymentDate: "",
    depositPaymentMethod: "None",
    balanceDue: 2200,
    balancePaymentMethod: "None",
    expenses: 700,
    netProfit: 1500,
    depositInvoiceNumber: "",
    depositReceiptURL: "",
    balanceInvoiceNumber: "",
    balanceInvoiceURL: "",
    expensesDetailsURL: "https://mytourapp.com/expenses/104",
    daysToTour: 120,
    finalPaymentDeadline: "2025-09-10",
    lastMinuteBooking: false
  },
  {
    id: 505,
    bookingID: 105,
    invoiceNumber: "INV-2025-005",
    paymentStatus: "Partial",
    paymentMethod: "Credit Card",
    costTotal: 2500,
    depositPaid: 500,
    depositPaymentDate: "2025-05-05",
    depositPaymentMethod: "Credit Card",
    balanceDue: 2000,
    balancePaymentMethod: "Credit Card",
    expenses: 800,
    netProfit: 1700,
    depositInvoiceNumber: "DPT-005",
    depositReceiptURL: "https://mytourapp.com/receipts/dpt-005",
    balanceInvoiceNumber: "BAL-005",
    balanceInvoiceURL: "https://mytourapp.com/invoices/bal-005",
    expensesDetailsURL: "https://mytourapp.com/expenses/105",
    daysToTour: 180,
    finalPaymentDeadline: "2025-10-27",
    lastMinuteBooking: false
  }
];

// Generate mock accommodations
export const accommodations: Accommodation[] = [
  // Accommodations for booking 101
  {
    id: 1001,
    bookingID: 101,
    day: 1,
    hotel: "Bali Beach Resort",
    roomType: "Deluxe Ocean View",
    checkInDate: "2025-08-10",
    checkOutDate: "2025-08-12",
    notes: "Early check-in requested"
  },
  {
    id: 1002,
    bookingID: 101,
    day: 3,
    hotel: "Ubud Jungle Retreat",
    roomType: "Villa with Pool",
    checkInDate: "2025-08-12",
    checkOutDate: "2025-08-15",
    notes: "Dietary restrictions: vegetarian meals"
  },
  
  // Accommodations for booking 102
  {
    id: 1003,
    bookingID: 102,
    day: 1,
    hotel: "Tokyo Sky Hotel",
    roomType: "Executive Suite",
    checkInDate: "2025-07-20",
    checkOutDate: "2025-07-24",
    notes: ""
  },
  {
    id: 1004,
    bookingID: 102,
    day: 5,
    hotel: "Kyoto Traditional Ryokan",
    roomType: "Traditional Room",
    checkInDate: "2025-07-24",
    checkOutDate: "2025-07-28",
    notes: "Traditional breakfast included"
  },
  
  // Accommodations for booking 103
  {
    id: 1005,
    bookingID: 103,
    day: 1,
    hotel: "Barcelona Beachfront Hotel",
    roomType: "Family Room",
    checkInDate: "2025-06-05",
    checkOutDate: "2025-06-07",
    notes: "Late checkout requested"
  },
  
  // Accommodations for booking 104
  {
    id: 1006,
    bookingID: 104,
    day: 1,
    hotel: "Paris Luxury Hotel",
    roomType: "Eiffel Tower View",
    checkInDate: "2025-09-15",
    checkOutDate: "2025-09-18",
    notes: "Honeymoon decoration"
  },
  {
    id: 1007,
    bookingID: 104,
    day: 4,
    hotel: "Loire Valley Chateau",
    roomType: "Deluxe Room",
    checkInDate: "2025-09-18",
    checkOutDate: "2025-09-20",
    notes: "Wine tour booked"
  },
  
  // Accommodations for booking 105
  {
    id: 1008,
    bookingID: 105,
    day: 1,
    hotel: "Kyoto Imperial Hotel",
    roomType: "Japanese Suite",
    checkInDate: "2025-11-01",
    checkOutDate: "2025-11-04",
    notes: ""
  },
  {
    id: 1009,
    bookingID: 105,
    day: 4,
    hotel: "Osaka Modern Hotel",
    roomType: "City View Room",
    checkInDate: "2025-11-04",
    checkOutDate: "2025-11-07",
    notes: "Airport transfer arranged"
  }
];

// Generate mock resources
export const resources: Resource[] = [
  {
    id: 2001,
    bookingID: 101,
    guideID: 1,
    driverID: 11,
    vehicleID: 101,
    guideName: "Maya Wijaya",
    driverName: "Putu Surya",
    vehicleInfo: "Toyota Innova SUV",
    assignedDate: "2025-08-10"
  },
  {
    id: 2002,
    bookingID: 102,
    guideID: 2,
    driverID: 12,
    vehicleID: 102,
    guideName: "Hiroshi Yamamoto",
    driverName: "Takashi Sato",
    vehicleInfo: "Toyota Alphard",
    assignedDate: "2025-07-20"
  },
  {
    id: 2003,
    bookingID: 103,
    guideID: 3,
    driverID: 13,
    vehicleID: 103,
    guideName: "Elena Garcia",
    driverName: "Miguel Rodriguez",
    vehicleInfo: "Mercedes Sprinter Van",
    assignedDate: "2025-06-05"
  },
  {
    id: 2004,
    bookingID: 104,
    guideID: 4,
    driverID: 14,
    vehicleID: 104,
    guideName: "Pierre Dubois",
    driverName: "Jean Dupont",
    vehicleInfo: "Peugeot 5008",
    assignedDate: "2025-09-15"
  },
  {
    id: 2005,
    bookingID: 105,
    guideID: 5,
    driverID: 15,
    vehicleID: 105,
    guideName: "Akiko Suzuki",
    driverName: "Kenji Nakamura",
    vehicleInfo: "Toyota Hiace",
    assignedDate: "2025-11-01"
  }
];

// Combine all data to create bookings with details
export const getBookingsWithDetails = (): BookingWithDetails[] => {
  return bookings.map(booking => {
    const customer = customers.find(c => c.id === booking.customerID);
    const financial = financials.find(f => f.bookingID === booking.id);
    const bookingAccommodations = accommodations.filter(a => a.bookingID === booking.id);
    const bookingResources = resources.filter(r => r.bookingID === booking.id);

    return {
      ...booking,
      customer,
      financial,
      accommodations: bookingAccommodations,
      resources: bookingResources
    };
  });
};
