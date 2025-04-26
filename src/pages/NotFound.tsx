
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import NavigationHeader from "@/components/NavigationHeader";
import Footer from "@/components/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <NavigationHeader />
      
      <div className="flex-1 flex items-center justify-center py-20">
        <div className="text-center px-4">
          <h1 className="text-7xl font-bold text-primary mb-6">404</h1>
          <p className="text-2xl font-semibold text-foreground mb-4">Page Not Found</p>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            The page you are looking for doesn't exist or has been moved.
          </p>
          <Button asChild>
            <a href="/">Return to Home</a>
          </Button>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default NotFound;
