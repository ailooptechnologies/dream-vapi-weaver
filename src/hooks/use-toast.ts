
import { toast as sonnerToast } from "sonner";

export { toast };
export { useToast } from "sonner";

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
  return sonnerToast({
    title,
    description,
    action,
    duration,
    ...props,
  });
};
