
import { toast as sonnerToast } from "sonner";

// Create a custom hook for toast functionality
const useToast = () => {
  return {
    toast
  };
};

// Wrapper function for consistent toast API
const toast = (title: string, options?: {
  description?: React.ReactNode;
  action?: React.ReactElement;
  variant?: "default" | "destructive";
  duration?: number;
  [key: string]: any;
}) => {
  // Sonner expects title as first parameter, options as second
  return sonnerToast(title, options);
};

export { useToast, toast };
