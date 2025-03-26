
import { PaymentStatus, ResourceStatus, AccommodationStatus } from "@/types";
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: PaymentStatus | ResourceStatus | AccommodationStatus;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const StatusBadge = ({ status, size = "md", className }: StatusBadgeProps) => {
  // Determine background and text color based on status
  const getStatusClasses = () => {
    switch (status) {
      case "Paid":
      case "Confirmed":
        return "bg-green-100 text-green-800 border-green-200";
      case "Partial":
      case "Pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Overdue":
      case "Not Confirmed":
      case "None":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case "sm":
        return "text-xs px-2 py-0.5";
      case "lg":
        return "text-sm px-3 py-1";
      case "md":
      default:
        return "text-xs px-2.5 py-0.5";
    }
  };

  return (
    <span
      className={cn(
        "inline-flex items-center font-medium rounded-full border",
        getStatusClasses(),
        getSizeClasses(),
        className
      )}
    >
      <span className={cn(
        "w-1.5 h-1.5 rounded-full mr-1.5",
        status === "Paid" || status === "Confirmed" ? "bg-green-500" : 
        status === "Partial" || status === "Pending" ? "bg-yellow-500" : 
        "bg-red-500"
      )} />
      {status}
    </span>
  );
};

export default StatusBadge;
