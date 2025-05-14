
import { toast as sonnerToast, Toast, useToast as useSonnerToast } from '@/components/ui/toast';

export { useToast, toast };

const useToast = useSonnerToast;

type ToastProps = React.ComponentProps<typeof Toast>;
type ToastActionElement = React.ReactElement<typeof Toast['Action']>;

type ToastOptions = {
  title?: string;
  description?: React.ReactNode;
  action?: ToastActionElement;
  variant?: "default" | "destructive";
  duration?: number;
};

const toast = ({
  title,
  description,
  action,
  variant,
  duration = 5000,
  ...props
}: ToastOptions) => {
  return sonnerToast({
    title,
    description,
    action,
    duration,
    ...props,
    variant: variant as "default" | "destructive" | undefined,
  });
};
