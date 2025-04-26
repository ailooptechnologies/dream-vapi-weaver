
import React from 'react';
import { Upload } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface FileUploadProps {
  onFilesSelected: (files: File[]) => void;
  accept?: string;
  multiple?: boolean;
}

const FileUpload: React.FC<FileUploadProps> = ({ 
  onFilesSelected, 
  accept = ".pdf,.doc,.docx,.txt,image/*,video/*", 
  multiple = true 
}) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      onFilesSelected(Array.from(files));
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Input
        type="file"
        onChange={handleFileChange}
        accept={accept}
        multiple={multiple}
        className="hidden"
        id="file-upload"
      />
      <Button
        type="button"
        variant="outline"
        onClick={() => document.getElementById('file-upload')?.click()}
        className="w-full"
      >
        <Upload className="h-4 w-4 mr-2" />
        Upload Files
      </Button>
    </div>
  );
};

export default FileUpload;
