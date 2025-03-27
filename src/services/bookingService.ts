
import { supabase } from "@/integrations/supabase/client";
import { BookingWithDetails, Customer, Financial, Accommodation, Resource } from "@/types";

export async function getBookingsWithDetails(): Promise<BookingWithDetails[]> {
  try {
    // Fetch bookings
    const { data: bookings, error: bookingsError } = await supabase
      .from('bookings')
      .select('*');
    
    if (bookingsError) throw bookingsError;
    if (!bookings) return [];

    // Fetch all related data in parallel
    const [
      { data: customers }, 
      { data: financials }, 
      { data: accommodations }, 
      { data: resources }
    ] = await Promise.all([
      supabase.from('customers').select('*'),
      supabase.from('financials').select('*'),
      supabase.from('accommodations').select('*'),
      supabase.from('resources').select('*')
    ]);

    // Map bookings to BookingWithDetails
    return bookings.map(booking => {
      const bookingCustomer = customers?.find(c => c.id === booking.customer_id);
      const bookingFinancial = financials?.find(f => f.booking_id === booking.id);
      const bookingAccommodations = accommodations?.filter(a => a.booking_id === booking.id) || [];
      const bookingResources = resources?.filter(r => r.booking_id === booking.id) || [];

      // Convert database snake_case to camelCase for frontend consistency
      const formattedBooking: BookingWithDetails = {
        id: booking.id,
        customer_id: booking.customer_id,
        tour_package: booking.tour_package,
        start_date: booking.start_date,
        end_date: booking.end_date,
        number_of_participants: booking.number_of_participants,
        pickup_info: booking.pickup_info || "",
        dropoff_info: booking.dropoff_info || "",
        t_shirt_size: booking.t_shirt_size || "",
        accommodation_status: booking.accommodation_status as any,
        resource_status: booking.resource_status as any,
        customer: bookingCustomer as Customer,
        financial: bookingFinancial as Financial,
        accommodations: bookingAccommodations as Accommodation[],
        resources: bookingResources as Resource[]
      };

      return formattedBooking;
    });
  } catch (error) {
    console.error("Error fetching bookings with details:", error);
    return [];
  }
}
