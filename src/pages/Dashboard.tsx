
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getBookingsWithDetails } from "@/data/mockData";
import { BookingWithDetails } from "@/types";
import BookingCard from "@/components/BookingCard";
import StatusBadge from "@/components/StatusBadge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, DollarSign, Clock, Users } from "lucide-react";
import { formatDistanceToNow, parseISO, isBefore } from "date-fns";

const Dashboard = () => {
  const [bookings, setBookings] = useState<BookingWithDetails[]>([]);
  const [upcomingTours, setUpcomingTours] = useState<BookingWithDetails[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // In a real app, this would be an API call
        const data = getBookingsWithDetails();
        
        // Filter upcoming tours (next 14 days)
        const today = new Date();
        const upcoming = data.filter(booking => {
          const startDate = parseISO(booking.startDate);
          return isBefore(today, startDate) && 
                 formatDistanceToNow(startDate, { addSuffix: false }) <= '14 days';
        });
        
        setBookings(data);
        setUpcomingTours(upcoming);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const countByStatus = (statusType: 'payment' | 'accommodation' | 'resource') => {
    return bookings.reduce((acc, booking) => {
      let status;
      
      if (statusType === 'payment' && booking.financial) {
        status = booking.financial.paymentStatus;
      } else if (statusType === 'accommodation') {
        status = booking.accommodationStatus;
      } else if (statusType === 'resource') {
        status = booking.resourceStatus;
      }
      
      if (status) {
        acc[status] = (acc[status] || 0) + 1;
      }
      
      return acc;
    }, {} as Record<string, number>);
  };

  const paymentStats = countByStatus('payment');
  const accommodationStats = countByStatus('accommodation');
  const resourceStats = countByStatus('resource');
  
  const totalRevenue = bookings.reduce((sum, booking) => {
    return sum + (booking.financial?.costTotal || 0);
  }, 0);
  
  const totalBookings = bookings.length;
  const totalParticipants = bookings.reduce((sum, booking) => {
    return sum + booking.numberOfParticipants;
  }, 0);

  const navigateToBookingDetails = (id: number) => {
    navigate(`/booking/${id}`);
  };

  if (isLoading) {
    return (
      <div className="container py-10 flex items-center justify-center min-h-[300px]">
        <div className="animate-pulse-opacity text-xl">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="container py-8 space-y-8 mx-auto px-4 md:px-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Monitor all tour operations at a glance</p>
      </div>
      
      {/* Stats overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="glass-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
              }).format(totalRevenue)}
            </div>
            <p className="text-xs text-muted-foreground">From {totalBookings} bookings</p>
          </CardContent>
        </Card>
        
        <Card className="glass-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Tours</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{upcomingTours.length}</div>
            <p className="text-xs text-muted-foreground">In the next 14 days</p>
          </CardContent>
        </Card>
        
        <Card className="glass-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Participants</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalParticipants}</div>
            <p className="text-xs text-muted-foreground">Across all bookings</p>
          </CardContent>
        </Card>
        
        <Card className="glass-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Pending Payments</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{paymentStats["Partial"] || 0}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-red-500 font-medium">{paymentStats["Overdue"] || 0} overdue</span>
            </p>
          </CardContent>
        </Card>
      </div>
      
      {/* Tabs */}
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList className="gap-2">
          <TabsTrigger value="all">All Bookings</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming Tours</TabsTrigger>
          <TabsTrigger value="payment-status">Payment Status</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {bookings.map((booking) => (
              <BookingCard 
                key={booking.id} 
                booking={booking} 
                onClick={() => navigateToBookingDetails(booking.id)}
              />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="upcoming" className="space-y-4">
          {upcomingTours.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {upcomingTours.map((booking) => (
                <BookingCard 
                  key={booking.id} 
                  booking={booking} 
                  onClick={() => navigateToBookingDetails(booking.id)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <p className="text-muted-foreground">No upcoming tours in the next 14 days</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="payment-status" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <StatusBadge status="Paid" /> Fully Paid
                </CardTitle>
                <CardDescription>
                  Bookings with complete payments
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{paymentStats["Paid"] || 0}</div>
              </CardContent>
            </Card>
            
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <StatusBadge status="Partial" /> Partially Paid
                </CardTitle>
                <CardDescription>
                  Bookings with deposits only
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{paymentStats["Partial"] || 0}</div>
              </CardContent>
            </Card>
            
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <StatusBadge status="Overdue" /> Overdue Payments
                </CardTitle>
                <CardDescription>
                  Bookings that require immediate attention
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{paymentStats["Overdue"] || 0}</div>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {bookings.filter(b => b.financial?.paymentStatus === "Overdue").map((booking) => (
              <BookingCard 
                key={booking.id} 
                booking={booking} 
                onClick={() => navigateToBookingDetails(booking.id)}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
