
import { useState, useEffect } from "react";
import { getBookingsWithDetails } from "@/data/mockData";
import { BookingWithDetails, Resource } from "@/types";
import StatusBadge from "@/components/StatusBadge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format, parseISO, addDays, eachDayOfInterval, isSameDay } from "date-fns";
import { cn } from "@/lib/utils";

const Resources = () => {
  const [bookings, setBookings] = useState<BookingWithDetails[]>([]);
  const [resources, setResources] = useState<Resource[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [visibleBookingId, setVisibleBookingId] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // In a real app, this would be an API call
        const data = getBookingsWithDetails();
        
        // Extract all resources
        const allResources: Resource[] = [];
        data.forEach(booking => {
          booking.resources?.forEach(resource => {
            allResources.push(resource);
          });
        });
        
        setBookings(data);
        setResources(allResources);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Generate dates for timeline
  const dates = eachDayOfInterval({
    start: new Date(),
    end: addDays(new Date(), 14),
  });

  // Group resources by type
  const guides = Array.from(new Set(resources.map(r => r.guideName)));
  const drivers = Array.from(new Set(resources.map(r => r.driverName)));
  const vehicles = Array.from(new Set(resources.map(r => r.vehicleInfo)));

  const getResourceAssignments = (resourceName: string, type: 'guide' | 'driver' | 'vehicle') => {
    return bookings.filter(booking => {
      return booking.resources?.some(r => {
        if (type === 'guide') return r.guideName === resourceName;
        if (type === 'driver') return r.driverName === resourceName;
        if (type === 'vehicle') return r.vehicleInfo === resourceName;
        return false;
      });
    });
  };
  
  const toggleBookingVisibility = (bookingId: number) => {
    setVisibleBookingId(visibleBookingId === bookingId ? null : bookingId);
  };

  if (isLoading) {
    return (
      <div className="container py-10 flex items-center justify-center min-h-[300px]">
        <div className="animate-pulse-opacity text-xl">Loading resources...</div>
      </div>
    );
  }

  const ResourceTimeline = ({ 
    name, 
    type 
  }: { 
    name: string, 
    type: 'guide' | 'driver' | 'vehicle' 
  }) => {
    const assignments = getResourceAssignments(name, type);
    
    return (
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-medium">{name}</h3>
          <StatusBadge 
            status={assignments.length > 0 ? "Confirmed" : "Not Confirmed"} 
            size="sm" 
          />
        </div>
        
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {dates.map(date => {
            const assignedBookings = assignments.filter(booking => {
              const startDate = parseISO(booking.startDate);
              const endDate = parseISO(booking.endDate);
              
              return date >= startDate && date <= endDate;
            });
            
            const isAssigned = assignedBookings.length > 0;
            const isSelected = isSameDay(date, selectedDate);
            
            return (
              <div 
                key={date.toISOString()}
                className="flex flex-col items-center"
                onClick={() => setSelectedDate(date)}
              >
                <div className="text-xs text-muted-foreground mb-1">
                  {format(date, "MMM d")}
                </div>
                
                <div 
                  className={cn(
                    "w-10 h-10 rounded-md flex items-center justify-center cursor-pointer text-xs",
                    isAssigned ? "bg-primary/20 font-medium" : "bg-secondary",
                    isSelected && "ring-2 ring-primary"
                  )}
                >
                  {isAssigned ? assignedBookings.length : "—"}
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Show assignments for selected date */}
        {assignments.filter(booking => {
          const startDate = parseISO(booking.startDate);
          const endDate = parseISO(booking.endDate);
          return selectedDate >= startDate && selectedDate <= endDate;
        }).map(booking => (
          <div 
            key={booking.id}
            className="mt-2 text-sm p-2 bg-secondary/50 rounded-md animate-fade-in cursor-pointer"
            onClick={() => toggleBookingVisibility(booking.id)}
          >
            <div className="flex justify-between items-center">
              <span className="font-medium">{booking.tourPackage}</span>
              <span className="text-xs text-muted-foreground">
                {format(parseISO(booking.startDate), "MMM d")} - {format(parseISO(booking.endDate), "MMM d")}
              </span>
            </div>
            
            {visibleBookingId === booking.id && (
              <div className="mt-2 text-xs text-muted-foreground space-y-1 animate-fade-in">
                <p>Customer: {booking.customer?.name}</p>
                <p>Participants: {booking.numberOfParticipants}</p>
                <p>Pickup: {booking.pickupInfo}</p>
                {booking.financial && (
                  <div className="flex items-center mt-1">
                    <span>Payment Status: </span>
                    <StatusBadge status={booking.financial.paymentStatus} size="sm" className="ml-1" />
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="container py-8 space-y-6 mx-auto px-4 md:px-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Resource Allocation</h1>
        <p className="text-muted-foreground">Manage guides, drivers, and vehicles</p>
      </div>
      
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">
          Resources for {format(selectedDate, "MMMM d, yyyy")}
        </h2>
      </div>
      
      <Tabs defaultValue="guides" className="space-y-4">
        <TabsList>
          <TabsTrigger value="guides">Guides</TabsTrigger>
          <TabsTrigger value="drivers">Drivers</TabsTrigger>
          <TabsTrigger value="vehicles">Vehicles</TabsTrigger>
        </TabsList>
        
        <TabsContent value="guides" className="space-y-4">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Guides Timeline</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {guides.map(guide => (
                <ResourceTimeline key={guide} name={guide} type="guide" />
              ))}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="drivers" className="space-y-4">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Drivers Timeline</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {drivers.map(driver => (
                <ResourceTimeline key={driver} name={driver} type="driver" />
              ))}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="vehicles" className="space-y-4">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Vehicles Timeline</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {vehicles.map(vehicle => (
                <ResourceTimeline key={vehicle} name={vehicle} type="vehicle" />
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-lg">Available Guides</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {guides.length - getResourceAssignments(guides[0], 'guide').filter(b => {
                const startDate = parseISO(b.startDate);
                const endDate = parseISO(b.endDate);
                return selectedDate >= startDate && selectedDate <= endDate;
              }).length}
              <span className="text-sm text-muted-foreground ml-2">of {guides.length}</span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-lg">Available Drivers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {drivers.length - getResourceAssignments(drivers[0], 'driver').filter(b => {
                const startDate = parseISO(b.startDate);
                const endDate = parseISO(b.endDate);
                return selectedDate >= startDate && selectedDate <= endDate;
              }).length}
              <span className="text-sm text-muted-foreground ml-2">of {drivers.length}</span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-lg">Available Vehicles</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {vehicles.length - getResourceAssignments(vehicles[0], 'vehicle').filter(b => {
                const startDate = parseISO(b.startDate);
                const endDate = parseISO(b.endDate);
                return selectedDate >= startDate && selectedDate <= endDate;
              }).length}
              <span className="text-sm text-muted-foreground ml-2">of {vehicles.length}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Resources;
