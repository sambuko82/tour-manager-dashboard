
import { BookingWithDetails } from "@/types";
import { formatDistanceToNow, format, parseISO, isBefore } from "date-fns";
import StatusBadge from "./StatusBadge";
import { ArrowUpRight, Calendar, DollarSign, Users } from "lucide-react";
import { cn } from "@/lib/utils";

interface BookingCardProps {
  booking: BookingWithDetails;
  onClick?: () => void;
}

const BookingCard = ({ booking, onClick }: BookingCardProps) => {
  if (!booking || !booking.financial) return null;
  
  const startDate = parseISO(booking.start_date);
  const endDate = parseISO(booking.end_date);
  const depositAmount = booking.financial?.deposit_amount || 0;
  const costTotal = booking.financial?.cost_total || 0;
  const depositPercentage = (depositAmount / costTotal) * 100;
  const paymentStatus = booking.financial?.payment_status;
  
  const today = new Date();
  const isUpcoming = isBefore(today, startDate) && 
                     formatDistanceToNow(startDate, { addSuffix: false }) <= '14 days';
  
  const formattedAmount = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(costTotal);

  return (
    <div 
      onClick={onClick}
      className={cn(
        "glass-card rounded-xl p-5 card-hover cursor-pointer animate-slide-in-bottom",
        isUpcoming ? "ring-2 ring-yellow-400 shadow-md" : ""
      )}
    >
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-semibold text-lg tracking-tight">{booking.tour_package}</h3>
          <p className="text-sm text-muted-foreground">{booking.customer?.name} • {booking.customer?.country}</p>
        </div>
        <StatusBadge status={paymentStatus} />
      </div>

      <div className="flex items-center text-sm mb-3 text-muted-foreground">
        <Calendar className="h-4 w-4 mr-1.5" />
        <span>
          {format(startDate, "MMM d")} - {format(endDate, "MMM d, yyyy")}
        </span>
      </div>
      
      <div className="flex items-center text-sm mb-3 text-muted-foreground">
        <Users className="h-4 w-4 mr-1.5" />
        <span>{booking.number_of_participants} participant{booking.number_of_participants !== 1 ? 's' : ''}</span>
      </div>
      
      <div className="flex items-center text-sm mb-4 font-medium">
        <DollarSign className="h-4 w-4 mr-1.5" />
        <span>{formattedAmount}</span>
      </div>
      
      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-1.5 mb-4">
        <div 
          className={cn(
            "h-1.5 rounded-full",
            paymentStatus === "Paid" ? "bg-green-500" : 
            paymentStatus === "Partial" ? "bg-yellow-500" : 
            "bg-red-500"
          )}
          style={{ width: `${depositPercentage}%` }}
        ></div>
      </div>
      
      <div className="flex justify-between items-center text-xs">
        <div className="flex space-x-2">
          <StatusBadge status={booking.accommodation_status} size="sm" />
          <StatusBadge status={booking.resource_status} size="sm" />
        </div>
        <div className="text-primary text-xs font-medium flex items-center">
          View details
          <ArrowUpRight className="h-3 w-3 ml-1" />
        </div>
      </div>
      
      {isUpcoming && (
        <div className="mt-3 bg-yellow-50 text-yellow-800 p-2 rounded-md text-xs font-medium">
          Upcoming tour: Starts in {formatDistanceToNow(startDate, { addSuffix: false })}
        </div>
      )}
    </div>
  );
};

export default BookingCard;
