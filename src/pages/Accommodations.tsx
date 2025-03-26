
import { useState, useEffect } from "react";
import { getBookingsWithDetails } from "@/data/mockData";
import { BookingWithDetails, Accommodation } from "@/types";
import StatusBadge from "@/components/StatusBadge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { format, parseISO } from "date-fns";
import { cn } from "@/lib/utils";

const Accommodations = () => {
  const [bookings, setBookings] = useState<BookingWithDetails[]>([]);
  const [accommodations, setAccommodations] = useState<Accommodation[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // In a real app, this would be an API call
        const data = getBookingsWithDetails();
        
        // Extract all accommodations
        const allAccommodations: Accommodation[] = [];
        data.forEach(booking => {
          booking.accommodations?.forEach(accommodation => {
            allAccommodations.push(accommodation);
          });
        });
        
        setBookings(data);
        setAccommodations(allAccommodations);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Group accommodations by hotel
  const getHotels = () => {
    const hotels = new Set<string>();
    accommodations.forEach(acc => {
      hotels.add(acc.hotel);
    });
    return Array.from(hotels);
  };
  
  const hotels = getHotels();
  
  // Get accommodations for a specific hotel
  const getAccommodationsForHotel = (hotel: string) => {
    return accommodations.filter(acc => acc.hotel === hotel);
  };
  
  // Get booking details by ID
  const getBookingById = (id: number) => {
    return bookings.find(booking => booking.id === id);
  };
  
  // Count number of rooms per hotel
  const countRoomsByHotel = (hotel: string) => {
    return getAccommodationsForHotel(hotel).length;
  };

  if (isLoading) {
    return (
      <div className="container py-10 flex items-center justify-center min-h-[300px]">
        <div className="animate-pulse-opacity text-xl">Loading accommodations...</div>
      </div>
    );
  }

  return (
    <div className="container py-8 space-y-6 mx-auto px-4 md:px-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Accommodation Planner</h1>
        <p className="text-muted-foreground">Manage daily accommodations for all bookings</p>
      </div>
      
      <Tabs defaultValue="daily" className="space-y-4">
        <TabsList>
          <TabsTrigger value="daily">Daily Planner</TabsTrigger>
          <TabsTrigger value="hotels">Hotels Summary</TabsTrigger>
        </TabsList>
        
        <TabsContent value="daily" className="space-y-4">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Daily Accommodation Schedule</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Booking</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Day</TableHead>
                    <TableHead>Hotel</TableHead>
                    <TableHead>Room Type</TableHead>
                    <TableHead>Check-In</TableHead>
                    <TableHead>Check-Out</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {accommodations.map((accommodation) => {
                    const booking = getBookingById(accommodation.bookingID);
                    if (!booking) return null;
                    
                    return (
                      <TableRow key={accommodation.id} className="animate-fade-in">
                        <TableCell className="font-medium">{booking.tourPackage}</TableCell>
                        <TableCell>{booking.customer?.name}</TableCell>
                        <TableCell>Day {accommodation.day}</TableCell>
                        <TableCell>{accommodation.hotel}</TableCell>
                        <TableCell>{accommodation.roomType}</TableCell>
                        <TableCell>{format(parseISO(accommodation.checkInDate), "MMM d, yyyy")}</TableCell>
                        <TableCell>{format(parseISO(accommodation.checkOutDate), "MMM d, yyyy")}</TableCell>
                        <TableCell>
                          <StatusBadge status={booking.accommodationStatus} size="sm" />
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="hotels" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {hotels.map(hotel => (
              <Card key={hotel} className="glass-card">
                <CardHeader>
                  <CardTitle className="text-lg">{hotel}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold mb-2">
                    {countRoomsByHotel(hotel)} rooms
                  </div>
                  
                  <div className="space-y-2">
                    {getAccommodationsForHotel(hotel).map(acc => {
                      const booking = getBookingById(acc.bookingID);
                      if (!booking) return null;
                      
                      return (
                        <div 
                          key={acc.id} 
                          className={cn(
                            "p-2 rounded-md text-sm",
                            booking.accommodationStatus === "Confirmed" ? "bg-green-50 dark:bg-green-900/20" :
                            booking.accommodationStatus === "Pending" ? "bg-yellow-50 dark:bg-yellow-900/20" :
                            "bg-red-50 dark:bg-red-900/20"
                          )}
                        >
                          <div className="flex justify-between items-center">
                            <span className="font-medium">{booking.tourPackage}</span>
                            <StatusBadge status={booking.accommodationStatus} size="sm" />
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">
                            {format(parseISO(acc.checkInDate), "MMM d")} - {format(parseISO(acc.checkOutDate), "MMM d")}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {acc.roomType} • {booking.numberOfParticipants} guests
                          </div>
                          {acc.notes && (
                            <div className="text-xs italic mt-1 text-muted-foreground">
                              Note: {acc.notes}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
      
      {/* Summary */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle>Accommodation Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="flex items-center">
              <div className="w-4 h-4 rounded-full bg-green-500 mr-2"></div>
              <div>
                <div className="text-sm font-medium">Confirmed</div>
                <div className="text-2xl font-bold">
                  {bookings.filter(b => b.accommodationStatus === "Confirmed").length}
                </div>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="w-4 h-4 rounded-full bg-yellow-500 mr-2"></div>
              <div>
                <div className="text-sm font-medium">Pending</div>
                <div className="text-2xl font-bold">
                  {bookings.filter(b => b.accommodationStatus === "Pending").length}
                </div>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="w-4 h-4 rounded-full bg-red-500 mr-2"></div>
              <div>
                <div className="text-sm font-medium">Not Confirmed</div>
                <div className="text-2xl font-bold">
                  {bookings.filter(b => b.accommodationStatus === "Not Confirmed").length}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Accommodations;
