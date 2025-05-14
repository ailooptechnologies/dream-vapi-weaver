
import { toast as sonnerToast } from "sonner";

// Create a custom hook for toast functionality
const useToast = () => {
  return {
    toast
  };
};

type ToastOptions = {
  title?: string;
  description?: React.ReactNode;
  action?: React.ReactElement;
  variant?: "default" | "destructive";
  duration?: number;
};

// Wrapper function for consistent toast API
const toast = ({
  title,
  description,
  action,
  variant = "default",
  duration = 5000,
  ...props
}: ToastOptions) => {
  // Sonner expects different parameters format
  return sonnerToast(title as string, {
    description,
    action,
    duration,
    ...props,
  });
};

export { useToast, toast };
