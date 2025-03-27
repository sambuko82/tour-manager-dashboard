
import { useState, useEffect } from "react";
import { BookingWithDetails, Financial } from "@/types";
import StatusBadge from "@/components/StatusBadge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format, parseISO, isPast } from "date-fns";
import { ArrowUpRight, Clock, DollarSign } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { getBookingsWithDetails } from "@/services/bookingService";

const Finances = () => {
  const [bookings, setBookings] = useState<BookingWithDetails[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getBookingsWithDetails();
        setBookings(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Financial summaries
  const totalRevenue = bookings.reduce((sum, booking) => {
    return sum + (booking.financial?.cost_total || 0);
  }, 0);
  
  const totalExpenses = bookings.reduce((sum, booking) => {
    return sum + (booking.financial?.expenses || 0);
  }, 0);
  
  const totalProfit = bookings.reduce((sum, booking) => {
    return sum + (booking.financial?.net_profit || 0);
  }, 0);
  
  const pendingPayments = bookings.reduce((sum, booking) => {
    return sum + (booking.financial?.balance_due || 0);
  }, 0);

  // Group bookings by payment status
  const paidBookings = bookings.filter(b => b.financial?.payment_status === "Paid");
  const partialBookings = bookings.filter(b => b.financial?.payment_status === "Partial");
  const overdueBookings = bookings.filter(b => b.financial?.payment_status === "Overdue");
  const noneBookings = bookings.filter(b => b.financial?.payment_status === "None");

  if (isLoading) {
    return (
      <div className="container py-10 flex items-center justify-center min-h-[300px]">
        <div className="animate-pulse-opacity text-xl">Loading financial data...</div>
      </div>
    );
  }

  return (
    <div className="container py-8 space-y-6 mx-auto px-4 md:px-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Financial Overview</h1>
        <p className="text-muted-foreground">Track payments, deposits, and profit margins</p>
      </div>
      
      {/* Financial Summary */}
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
            <p className="text-xs text-muted-foreground">From {bookings.length} bookings</p>
          </CardContent>
        </Card>
        
        <Card className="glass-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
              }).format(totalExpenses)}
            </div>
            <p className="text-xs text-muted-foreground">Operating costs</p>
          </CardContent>
        </Card>
        
        <Card className="glass-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Net Profit</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
              }).format(totalProfit)}
            </div>
            <p className="text-xs text-muted-foreground">
              Margin: {totalRevenue > 0 ? ((totalProfit / totalRevenue) * 100).toFixed(1) : 0}%
            </p>
          </CardContent>
        </Card>
        
        <Card className="glass-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Pending Payments</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
              }).format(pendingPayments)}
            </div>
            <p className="text-xs text-muted-foreground">
              <span className="text-red-500 font-medium">
                {overdueBookings.length} overdue bookings
              </span>
            </p>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Bookings</TabsTrigger>
          <TabsTrigger value="overdue">Overdue ({overdueBookings.length})</TabsTrigger>
          <TabsTrigger value="partial">Partial ({partialBookings.length})</TabsTrigger>
          <TabsTrigger value="paid">Paid ({paidBookings.length})</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>All Financial Records</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Booking</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Invoice #</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Deposit</TableHead>
                    <TableHead>Balance</TableHead>
                    <TableHead>Deadline</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Net Profit</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {bookings.map((booking) => {
                    if (!booking.financial) return null;
                    
                    const isDeadlinePassed = booking.financial.final_payment_deadline && 
                      isPast(parseISO(booking.financial.final_payment_deadline));
                    
                    const depositPercentage = (booking.financial.deposit_amount / booking.financial.cost_total) * 100;
                    
                    return (
                      <TableRow key={booking.id} className="animate-fade-in">
                        <TableCell className="font-medium">{booking.tour_package}</TableCell>
                        <TableCell>{booking.customer?.name}</TableCell>
                        <TableCell>{booking.financial.invoice_number}</TableCell>
                        <TableCell>
                          {new Intl.NumberFormat('en-US', {
                            style: 'currency',
                            currency: 'USD',
                          }).format(booking.financial.cost_total)}
                        </TableCell>
                        <TableCell>
                          {new Intl.NumberFormat('en-US', {
                            style: 'currency',
                            currency: 'USD',
                          }).format(booking.financial.deposit_amount)}
                          <div className="w-full bg-gray-200 rounded-full h-1 mt-1">
                            <div 
                              className={cn(
                                "h-1 rounded-full",
                                depositPercentage >= 20 ? "bg-green-500" :
                                depositPercentage > 0 ? "bg-yellow-500" :
                                "bg-red-500"
                              )}
                              style={{ width: `${depositPercentage}%` }}
                            ></div>
                          </div>
                        </TableCell>
                        <TableCell>
                          {new Intl.NumberFormat('en-US', {
                            style: 'currency',
                            currency: 'USD',
                          }).format(booking.financial.balance_due)}
                        </TableCell>
                        <TableCell className={cn(
                          isDeadlinePassed && booking.financial.payment_status !== "Paid" && "text-red-500 font-medium"
                        )}>
                          {booking.financial.final_payment_deadline ? 
                            format(parseISO(booking.financial.final_payment_deadline), "MMM d, yyyy") :
                            "Not set"}
                        </TableCell>
                        <TableCell>
                          <StatusBadge status={booking.financial.payment_status} />
                        </TableCell>
                        <TableCell>
                          {new Intl.NumberFormat('en-US', {
                            style: 'currency',
                            currency: 'USD',
                          }).format(booking.financial.net_profit)}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="overdue">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Overdue Payments</CardTitle>
              <CardDescription>Bookings requiring immediate attention</CardDescription>
            </CardHeader>
            <CardContent>
              {overdueBookings.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Booking</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Invoice #</TableHead>
                      <TableHead>Balance Due</TableHead>
                      <TableHead>Deadline</TableHead>
                      <TableHead>Days Overdue</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {overdueBookings.map((booking) => {
                      if (!booking.financial) return null;
                      
                      const deadlineDate = parseISO(booking.financial.final_payment_deadline);
                      const today = new Date();
                      const daysOverdue = Math.floor((today.getTime() - deadlineDate.getTime()) / (1000 * 60 * 60 * 24));
                      
                      return (
                        <TableRow key={booking.id} className="animate-fade-in">
                          <TableCell className="font-medium">{booking.tour_package}</TableCell>
                          <TableCell>{booking.customer?.name}</TableCell>
                          <TableCell>{booking.financial.balance_invoice_number}</TableCell>
                          <TableCell className="font-medium">
                            {new Intl.NumberFormat('en-US', {
                              style: 'currency',
                              currency: 'USD',
                            }).format(booking.financial.balance_due)}
                          </TableCell>
                          <TableCell className="text-red-500">
                            {format(deadlineDate, "MMM d, yyyy")}
                          </TableCell>
                          <TableCell className="text-red-500 font-medium">
                            {daysOverdue} {daysOverdue === 1 ? 'day' : 'days'}
                          </TableCell>
                          <TableCell>
                            <a 
                              href={booking.financial.balance_invoice_url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="flex items-center text-primary text-sm font-medium"
                            >
                              View invoice
                              <ArrowUpRight className="h-3 w-3 ml-1" />
                            </a>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              ) : (
                <div className="flex items-center justify-center py-8">
                  <p className="text-muted-foreground">No overdue payments</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="partial">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Partially Paid Bookings</CardTitle>
              <CardDescription>Bookings with deposits paid</CardDescription>
            </CardHeader>
            <CardContent>
              {partialBookings.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Booking</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Deposit #</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Deposit</TableHead>
                      <TableHead>Deposit %</TableHead>
                      <TableHead>Balance Due</TableHead>
                      <TableHead>Final Deadline</TableHead>
                      <TableHead>Receipt</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {partialBookings.map((booking) => {
                      if (!booking.financial) return null;
                      
                      const depositAmount = booking.financial.deposit_amount;
                      const costTotal = booking.financial.cost_total;
                      const depositPercentage = (depositAmount / costTotal) * 100;
                      const deadlineDate = parseISO(booking.financial.final_payment_deadline);
                      const today = new Date();
                      const daysUntilDeadline = Math.floor((deadlineDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
                      
                      return (
                        <TableRow key={booking.id} className="animate-fade-in">
                          <TableCell className="font-medium">{booking.tour_package}</TableCell>
                          <TableCell>{booking.customer?.name}</TableCell>
                          <TableCell>{booking.financial.deposit_invoice_number}</TableCell>
                          <TableCell>
                            {new Intl.NumberFormat('en-US', {
                              style: 'currency',
                              currency: 'USD',
                            }).format(costTotal)}
                          </TableCell>
                          <TableCell>
                            {new Intl.NumberFormat('en-US', {
                              style: 'currency',
                              currency: 'USD',
                            }).format(depositAmount)}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Progress 
                                value={depositPercentage} 
                                className={cn(
                                  "h-2",
                                  depositPercentage >= 20 ? "bg-green-200" : "bg-yellow-200"
                                )}
                                indicatorClassName={
                                  depositPercentage >= 20 ? "bg-green-500" : "bg-yellow-500"
                                }
                              />
                              <span className="text-xs font-medium">
                                {depositPercentage.toFixed(0)}%
                              </span>
                            </div>
                          </TableCell>
                          <TableCell className="font-medium">
                            {new Intl.NumberFormat('en-US', {
                              style: 'currency',
                              currency: 'USD',
                            }).format(booking.financial.balance_due)}
                          </TableCell>
                          <TableCell className={cn(
                            daysUntilDeadline <= 7 && "text-yellow-500 font-medium",
                            daysUntilDeadline <= 3 && "text-red-500 font-medium"
                          )}>
                            {format(deadlineDate, "MMM d, yyyy")}
                            {daysUntilDeadline <= 7 && (
                              <div className="text-xs">
                                {daysUntilDeadline} days left
                              </div>
                            )}
                          </TableCell>
                          <TableCell>
                            {booking.financial.deposit_receipt_url && (
                              <a 
                                href={booking.financial.deposit_receipt_url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="flex items-center text-primary text-sm font-medium"
                              >
                                View receipt
                                <ArrowUpRight className="h-3 w-3 ml-1" />
                              </a>
                            )}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              ) : (
                <div className="flex items-center justify-center py-8">
                  <p className="text-muted-foreground">No partially paid bookings</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="paid">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Fully Paid Bookings</CardTitle>
              <CardDescription>Bookings with complete payments</CardDescription>
            </CardHeader>
            <CardContent>
              {paidBookings.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Booking</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Invoice #</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Payment Method</TableHead>
                      <TableHead>Expenses</TableHead>
                      <TableHead>Net Profit</TableHead>
                      <TableHead>Margin</TableHead>
                      <TableHead>Details</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paidBookings.map((booking) => {
                      if (!booking.financial) return null;
                      
                      const costTotal = booking.financial.cost_total;
                      const expenses = booking.financial.expenses;
                      const netProfit = booking.financial.net_profit;
                      const margin = (netProfit / costTotal) * 100;
                      
                      return (
                        <TableRow key={booking.id} className="animate-fade-in">
                          <TableCell className="font-medium">{booking.tour_package}</TableCell>
                          <TableCell>{booking.customer?.name}</TableCell>
                          <TableCell>{booking.financial.invoice_number}</TableCell>
                          <TableCell>
                            {new Intl.NumberFormat('en-US', {
                              style: 'currency',
                              currency: 'USD',
                            }).format(costTotal)}
                          </TableCell>
                          <TableCell>{booking.financial.payment_method}</TableCell>
                          <TableCell>
                            {new Intl.NumberFormat('en-US', {
                              style: 'currency',
                              currency: 'USD',
                            }).format(expenses)}
                          </TableCell>
                          <TableCell>
                            {new Intl.NumberFormat('en-US', {
                              style: 'currency',
                              currency: 'USD',
                            }).format(netProfit)}
                          </TableCell>
                          <TableCell className={cn(
                            margin >= 40 ? "text-green-500" :
                            margin >= 20 ? "text-yellow-500" :
                            "text-red-500",
                            "font-medium"
                          )}>
                            {margin.toFixed(1)}%
                          </TableCell>
                          <TableCell>
                            {booking.financial.expenses_details_url && (
                              <a 
                                href={booking.financial.expenses_details_url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="flex items-center text-primary text-sm font-medium"
                              >
                                Expense details
                                <ArrowUpRight className="h-3 w-3 ml-1" />
                              </a>
                            )}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              ) : (
                <div className="flex items-center justify-center py-8">
                  <p className="text-muted-foreground">No fully paid bookings</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Finances;
