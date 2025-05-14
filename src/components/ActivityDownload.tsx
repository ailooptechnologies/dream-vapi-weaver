
import React from 'react';
import { Button } from './ui/button';
import { DownloadIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ActivityDownloadProps {
  activityId: string;
  fileName?: string;
  onDownload?: (id: string) => void;
}

const ActivityDownload = ({ activityId, fileName, onDownload }: ActivityDownloadProps) => {
  const { toast } = useToast();

  const handleDownload = () => {
    if (onDownload) {
      onDownload(activityId);
    } else {
      // Default download behavior - create a demo CSV file
      const csvContent = `Activity ID,Date,Type,Status,Details
${activityId},${new Date().toISOString()},Export,Completed,Activity export data`;
      
      // Create blob and download link
      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName || `activity-${activityId}.csv`;
      document.body.appendChild(a);
      a.click();
      URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      toast({
        title: "Download Started",
        description: `Activity data is being downloaded.`
      });
    }
  };

  return (
    <Button onClick={handleDownload} size="sm" variant="outline">
      <DownloadIcon className="h-4 w-4 mr-1" />
      Download
    </Button>
  );
};

export default ActivityDownload;
