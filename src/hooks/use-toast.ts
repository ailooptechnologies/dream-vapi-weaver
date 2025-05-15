
import { toast as sonnerToast } from "sonner";

// Define the types for toast parameters based on Sonner API
interface ToastOptions {
  description?: React.ReactNode;
  action?: React.ReactNode;
  variant?: "default" | "destructive";
  duration?: number;
  [key: string]: any;
}

/**
 * A wrapper function for the sonner toast that maintains the same API
 * Title is the first parameter, options object is the second parameter
 */
const toast = (title: string, options?: ToastOptions) => {
  return sonnerToast(title, options);
};

// Create a custom hook for toast functionality
const useToast = () => {
  return {
    toast
  };
};

export { useToast, toast };
