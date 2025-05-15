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
 * A wrapper function for the sonner toast that supports both:
 * 1. toast(message: string, options?: ToastOptions)
 * 2. toast({ title: string, description?: string, variant?: string, ... })
 */
function toast(message: string | ToastOptions, options?: ToastOptions) {
  // If first argument is an object with title, treat it as the options object
  if (typeof message === 'object' && message !== null && 'title' in message) {
    const { title, ...restOptions } = message;
    return sonnerToast(title as string, restOptions);
  }
  
  // Otherwise use the traditional method
  return sonnerToast(message as string, options);
};

// Create a custom hook for toast functionality
const useToast = () => {
  return {
    toast
  };
};

export { useToast, toast };
