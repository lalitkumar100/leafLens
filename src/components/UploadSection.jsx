import { useState, useCallback } from 'react';
import { Upload, Image, AlertCircle } from 'lucide-react';

const UploadSection = ({ onImageSelected, isLoading }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [error, setError] = useState(null);

  const validateFile = (file) => {
    const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!validTypes.includes(file.type)) {
      return 'Please upload a JPG, PNG, or WebP image.';
    }
    if (file.size > maxSize) {
      return 'Image size must be under 5MB.';
    }
    return null;
  };

  const handleFile = useCallback((file) => {
    const validationError = validateFile(file);
    if (validationError) {
      setError(validationError);
      return;
    }
    setError(null);
    onImageSelected(file);
  }, [onImageSelected]);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }, [handleFile]);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleInputChange = useCallback((e) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  }, [handleFile]);

  return (
    <div className="w-full max-w-2xl mx-auto">
      <label
        className={`upload-zone flex flex-col items-center justify-center min-h-[300px] sm:min-h-[400px] ${
          isDragOver ? 'drag-over' : ''
        } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={handleInputChange}
          className="hidden"
          disabled={isLoading}
        />
        
        <div className="text-center">
          <div className="inline-flex p-6 bg-primary/10 rounded-full mb-6">
            {isDragOver ? (
              <Image className="w-12 h-12 text-primary animate-pulse" />
            ) : (
              <Upload className="w-12 h-12 text-primary" />
            )}
          </div>
          
          <h3 className="text-xl font-semibold text-foreground mb-2">
            {isDragOver ? 'Drop your image here' : 'Upload Plant Image'}
          </h3>
          <p className="text-muted-foreground mb-4">
            Drag and drop your plant image here, or click to browse
          </p>
          <p className="text-sm text-muted-foreground/70">
            Supports JPG, PNG, WebP • Max 5MB
          </p>
        </div>
      </label>

      {error && (
        <div className="mt-4 p-4 bg-destructive/10 border border-destructive/20 rounded-lg flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-destructive shrink-0" />
          <p className="text-sm text-destructive">{error}</p>
        </div>
      )}
    </div>
  );
};

export default UploadSection;
