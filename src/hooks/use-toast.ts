
import { toast as sonnerToast } from "sonner";

type ToastVariant = "default" | "destructive";

// Define the types for toast parameters based on Sonner API
interface ToastOptions {
  description?: React.ReactNode;
  action?: React.ReactElement;
  variant?: ToastVariant;
  duration?: number;
  [key: string]: any;
}

// Create a custom hook for toast functionality
const useToast = () => {
  return {
    toast
  };
};

// Wrapper function for consistent toast API that matches Sonner's API
const toast = (title: string, options?: ToastOptions) => {
  // Sonner expects title as first parameter, options as second
  return sonnerToast(title, options);
};

export { useToast, toast };
