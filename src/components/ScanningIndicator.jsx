import { Leaf, Loader2 } from 'lucide-react';

const ScanningIndicator = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      {/* Animated spinner */}
      <div className="relative mb-8">
        <div className="w-24 h-24 rounded-full border-4 border-primary/20 animate-pulse" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-20 h-20 rounded-full border-4 border-transparent border-t-primary animate-spin" />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <Leaf className="w-10 h-10 text-primary animate-pulse" />
        </div>
      </div>

      {/* Text */}
      <h3 className="text-xl font-semibold text-foreground mb-2">Analyzing Your Plant</h3>
      <p className="text-muted-foreground text-center max-w-xs">
        Our AI is examining the image to identify your plant and detect any health issues...
      </p>

      {/* Progress dots */}
      <div className="flex gap-2 mt-6">
        <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0s' }} />
        <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0.2s' }} />
        <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0.4s' }} />
      </div>
    </div>
  );
};

export default ScanningIndicator;
