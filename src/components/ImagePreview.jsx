import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ImagePreview = ({ image, onRemove }) => {
  return (
    <div className="relative w-full max-w-md mx-auto">
      <div className="relative rounded-2xl overflow-hidden border border-border/50 shadow-lg">
        <img 
          src={image} 
          alt="Uploaded plant" 
          className="w-full h-auto max-h-[400px] object-contain bg-card"
        />
        
        {/* Scanning overlay effect */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-primary/10" />
        </div>
      </div>

      {onRemove && (
        <Button
          variant="outline"
          size="icon"
          onClick={onRemove}
          className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-background border-border hover:bg-destructive hover:text-destructive-foreground"
        >
          <X className="w-4 h-4" />
        </Button>
      )}
    </div>
  );
};

export default ImagePreview;
