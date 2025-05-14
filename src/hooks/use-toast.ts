
import { Toast, ToastTitle, ToastDescription, ToastProvider, ToastViewport } from '@/components/ui/toast';
import { Toaster as SonnerToaster } from 'sonner';

export { useToast, toast };

type ToastProps = React.ComponentProps<typeof Toast>;
type ToastActionElement = React.ReactElement;

type ToastOptions = {
  title?: string;
  description?: React.ReactNode;
  action?: ToastActionElement;
  variant?: "default" | "destructive";
  duration?: number;
};

const useToast = () => {
  const toasts: any[] = [];
  
  return {
    toasts,
    toast: (options: ToastOptions) => toast(options),
    dismiss: (id: string) => {},
  };
};

const toast = ({
  title,
  description,
  action,
  variant = "default",
  duration = 5000,
  ...props
}: ToastOptions) => {
  // Use the Sonner toast from the sonner package directly
  return window.toast({
    title,
    description,
    action,
    duration,
    ...props,
  });
};
