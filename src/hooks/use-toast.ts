
import { toast as sonnerToast } from "sonner";

// Define our own ToastOptions interface rather than importing it from sonner
interface ToastOptions {
  description?: string;
  variant?: "default" | "destructive" | "success";
  duration?: number;
  action?: React.ReactNode;
  [key: string]: any; // Allow extra properties
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
}

// Create a custom hook for toast functionality
const useToast = () => {
  return { toast };
};

export { useToast, toast };
